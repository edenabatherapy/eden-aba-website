import { getAppBaseUrl, getPayPalApiBase, isPayPalConfigured } from "./config";
import {
  completeAutismCareDonation,
  createPendingAutismCareDonation,
  getDonationById,
  updateDonationPaymentIntent,
} from "./donations";
import type { DonationPaymentInput } from "./schema";

type PayPalAccessTokenResponse = {
  access_token?: string;
  error?: string;
};

type PayPalOrderResponse = {
  id?: string;
  status?: string;
  links?: Array<{ rel: string; href: string }>;
  purchase_units?: Array<{
    custom_id?: string;
    payments?: {
      captures?: Array<{
        id?: string;
        amount?: { value?: string; currency_code?: string };
        status?: string;
      }>;
    };
  }>;
};

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${getPayPalApiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = (await response.json()) as PayPalAccessTokenResponse;
  if (!response.ok || !data.access_token) {
    throw new Error(data.error || "Unable to authenticate with PayPal");
  }

  return data.access_token;
}

function formatPayPalAmount(amountCents: number): string {
  return (amountCents / 100).toFixed(2);
}

export async function createPayPalOrderForDonation(input: DonationPaymentInput) {
  if (!isPayPalConfigured()) {
    return {
      ok: false as const,
      status: 503,
      message: "PayPal payments are not configured yet. Please contact Eden ABA Therapy.",
    };
  }

  const pending = await createPendingAutismCareDonation(input, "paypal");
  if (pending.ok === false) {
    return pending;
  }

  const accessToken = await getPayPalAccessToken();
  const baseUrl = getAppBaseUrl();

  const response = await fetch(`${getPayPalApiBase()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: pending.donationId,
          description: "Eden Autism Care Fund contribution",
          amount: {
            currency_code: "USD",
            value: formatPayPalAmount(input.amountCents),
          },
        },
      ],
      application_context: {
        brand_name: "Eden ABA Therapy",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${baseUrl}/resources/financial-assistance/thank-you?donation_id=${pending.donationId}&provider=paypal`,
        cancel_url: `${baseUrl}/resources/financial-assistance#autism-care-fund`,
      },
    }),
  });

  const order = (await response.json()) as PayPalOrderResponse;
  if (!response.ok || !order.id) {
    return {
      ok: false as const,
      status: 503,
      message: "Unable to start PayPal checkout. Please try again.",
    };
  }

  const approvalUrl = order.links?.find((link) => link.rel === "approve")?.href;
  if (!approvalUrl) {
    return {
      ok: false as const,
      status: 503,
      message: "PayPal approval link was not returned. Please try again.",
    };
  }

  await updateDonationPaymentIntent(pending.donationId, order.id);

  return {
    ok: true as const,
    donationId: pending.donationId,
    orderId: order.id,
    approvalUrl,
  };
}

export async function capturePayPalDonation(input: { orderId: string; donationId: string }) {
  if (!isPayPalConfigured()) {
    return { ok: false as const, reason: "paypal-not-configured" };
  }

  const donation = await getDonationById(input.donationId);
  if (!donation) {
    return { ok: false as const, reason: "donation-not-found" };
  }

  if (donation.status === "completed") {
    return { ok: true as const, alreadyCompleted: true };
  }

  const accessToken = await getPayPalAccessToken();
  const response = await fetch(
    `${getPayPalApiBase()}/v2/checkout/orders/${encodeURIComponent(input.orderId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const capture = (await response.json()) as PayPalOrderResponse;
  if (!response.ok || capture.status !== "COMPLETED") {
    return { ok: false as const, reason: "capture-failed" };
  }

  const purchaseUnit = capture.purchase_units?.[0];
  const customId = purchaseUnit?.custom_id;
  if (customId && customId !== input.donationId) {
    return { ok: false as const, reason: "donation-mismatch" };
  }

  const paymentCapture = purchaseUnit?.payments?.captures?.[0];
  const capturedValue = paymentCapture?.amount?.value;
  const amountCents = capturedValue ? Math.round(Number(capturedValue) * 100) : 0;

  if (!amountCents || amountCents < 500) {
    return { ok: false as const, reason: "invalid-amount" };
  }

  if (donation.amount_cents !== amountCents) {
    return { ok: false as const, reason: "amount-mismatch" };
  }

  const paymentIntentId = paymentCapture?.id || input.orderId;

  return completeAutismCareDonation({
    donationId: input.donationId,
    paymentProvider: "paypal",
    paymentIntentId,
    amountCents,
    rawPayload: capture as unknown as Record<string, unknown>,
  });
}
