import { readFileSync, existsSync } from "fs";
import path from "path";
import { homedir } from "node:os";
import { cwd } from "node:process";
import { JWT, GoogleAuth } from "google-auth-library";

export type GoogleSheetsAuthMethod = "env_private_key" | "json_key" | "adc";

export type GoogleServiceAccountCredentials = {
  clientEmail: string;
  privateKey: string;
  source: "env" | "key-file";
};

type ServiceAccountKeyJson = {
  client_email?: string;
  private_key?: string;
};

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function normalizePrivateKey(raw: string): string {
  return raw.replace(/\\n/g, "\n");
}

function resolveKeyFilePath(): string | null {
  const configured = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim();
  if (configured) {
    const resolved = path.isAbsolute(configured) ? configured : path.resolve(cwd(), configured);
    return existsSync(resolved) ? resolved : null;
  }

  const defaultPath = path.resolve(cwd(), "secrets/google-sheets-service-account.json");
  return existsSync(defaultPath) ? defaultPath : null;
}

function loadFromKeyFile(filePath: string): GoogleServiceAccountCredentials | null {
  try {
    const parsed = JSON.parse(readFileSync(filePath, "utf8")) as ServiceAccountKeyJson;
    const clientEmail = parsed.client_email?.trim();
    const privateKey = normalizePrivateKey(parsed.private_key?.trim() || "");

    if (!clientEmail || !privateKey) {
      return null;
    }

    return { clientEmail, privateKey, source: "key-file" };
  } catch {
    return null;
  }
}

function loadFromEnv(): GoogleServiceAccountCredentials | null {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim() || "");

  if (!clientEmail || !privateKey) {
    return null;
  }

  return { clientEmail, privateKey, source: "env" };
}

function defaultGcloudAdcPath(): string | null {
  const home = process.env.HOME?.trim() || homedir();
  if (!home) {
    return null;
  }

  const adcPath = path.join(home, ".config", "gcloud", "application_default_credentials.json");
  return existsSync(adcPath) ? adcPath : null;
}

function isGcpRuntimeWithMetadataAdc(): boolean {
  return Boolean(
    process.env.K_SERVICE ||
      process.env.GAE_ENV ||
      process.env.GCE_METADATA_HOST ||
      process.env.CLOUD_RUN_JOB,
  );
}

export function isAdcPotentiallyAvailable(): boolean {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (credentialsPath) {
    return existsSync(
      path.isAbsolute(credentialsPath) ? credentialsPath : path.resolve(cwd(), credentialsPath),
    );
  }

  if (defaultGcloudAdcPath()) {
    return true;
  }

  return isGcpRuntimeWithMetadataAdc();
}

export function resolveGoogleSheetsAuthMethod(): GoogleSheetsAuthMethod | null {
  if (loadFromEnv()) {
    return "env_private_key";
  }

  const keyFilePath = resolveKeyFilePath();
  if (keyFilePath && loadFromKeyFile(keyFilePath)) {
    return "json_key";
  }

  if (isAdcPotentiallyAvailable()) {
    return "adc";
  }

  return null;
}

export function getGoogleServiceAccountCredentials(): GoogleServiceAccountCredentials | null {
  const fromEnv = loadFromEnv();
  if (fromEnv) {
    return fromEnv;
  }

  const keyFilePath = resolveKeyFilePath();
  if (!keyFilePath) {
    return null;
  }

  return loadFromKeyFile(keyFilePath);
}

export function getGoogleServiceAccountEmail(): string | null {
  return getGoogleServiceAccountCredentials()?.clientEmail ?? null;
}

export function getGoogleSheetsAuthIdentity(): string {
  const serviceAccountEmail = getGoogleServiceAccountEmail();
  if (serviceAccountEmail) {
    return serviceAccountEmail;
  }

  if (resolveGoogleSheetsAuthMethod() === "adc") {
    const adcPath =
      process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim() || defaultGcloudAdcPath() || "metadata-server";
    return `(Application Default Credentials via ${adcPath})`;
  }

  return "(not configured)";
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() && resolveGoogleSheetsAuthMethod(),
  );
}

function authMethodLogContext(method: GoogleSheetsAuthMethod): Record<string, string> {
  if (method === "env_private_key") {
    return {
      authMethod: method,
      clientEmail: getGoogleServiceAccountEmail() || "(unknown)",
    };
  }

  if (method === "json_key") {
    const keyFilePath = resolveKeyFilePath();
    return {
      authMethod: method,
      clientEmail: getGoogleServiceAccountEmail() || "(unknown)",
      keyFile: keyFilePath || "(unknown)",
    };
  }

  const adcPath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  return {
    authMethod: method,
    adcSource: adcPath || defaultGcloudAdcPath() || "gcp-metadata",
  };
}

export async function getGoogleSheetsAccessToken(): Promise<{
  token: string;
  authMethod: GoogleSheetsAuthMethod;
}> {
  const authMethod = resolveGoogleSheetsAuthMethod();

  if (!authMethod) {
    throw new Error(
      "Google Sheets authentication is not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, place a service account JSON key file, or run gcloud auth application-default login.",
    );
  }

  console.info("[intake-sheets] authenticating", authMethodLogContext(authMethod));

  if (authMethod === "env_private_key" || authMethod === "json_key") {
    const credentials = getGoogleServiceAccountCredentials();
    if (!credentials) {
      throw new Error("Service account credentials could not be loaded.");
    }

    const client = new JWT({
      email: credentials.clientEmail,
      key: credentials.privateKey,
      scopes: [SHEETS_SCOPE],
    });

    const tokenResponse = await client.getAccessToken();
    const token = typeof tokenResponse === "string" ? tokenResponse : tokenResponse?.token;

    if (!token) {
      throw new Error("Unable to obtain Google Sheets access token from service account JWT.");
    }

    return { token, authMethod };
  }

  const auth = new GoogleAuth({ scopes: [SHEETS_SCOPE] });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = typeof tokenResponse === "string" ? tokenResponse : tokenResponse?.token;

  if (!token) {
    throw new Error("Unable to obtain Google Sheets access token from Application Default Credentials.");
  }

  return { token, authMethod: "adc" };
}
