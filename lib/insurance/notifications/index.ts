import { getInsuranceConfig } from "@/lib/insurance/config";
import { EmailNotificationProvider } from "@/lib/insurance/notifications/EmailNotificationProvider";
import type {
  FamilyStatusChangeParams,
  NewVerificationNotificationParams,
  NotificationProvider,
} from "@/lib/insurance/notifications/NotificationProvider";
import { SlackNotificationProvider } from "@/lib/insurance/notifications/SlackNotificationProvider";

function getEnabledNotificationProviders(): NotificationProvider[] {
  const { notificationChannels } = getInsuranceConfig();
  const channels = notificationChannels
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const providers: NotificationProvider[] = [];

  if (channels.includes("email") || channels.includes("both")) {
    providers.push(new EmailNotificationProvider());
  }

  if (channels.includes("slack") || channels.includes("both")) {
    providers.push(new SlackNotificationProvider());
  }

  if (providers.length === 0) {
    providers.push(new EmailNotificationProvider());
  }

  return providers;
}

export async function notifyNewVerificationRequest(
  params: NewVerificationNotificationParams,
): Promise<{ results: Array<{ provider: string; sent: boolean; reason?: string }> }> {
  const providers = getEnabledNotificationProviders();
  const results: Array<{ provider: string; sent: boolean; reason?: string }> = [];

  for (const provider of providers) {
    const result = await provider.notifyNewVerificationRequest(params);
    results.push({
      provider: provider.name,
      sent: result.sent,
      reason: result.reason,
    });
  }

  return { results };
}

export async function notifyFamilyStatusChange(
  params: FamilyStatusChangeParams,
): Promise<{ results: Array<{ provider: string; sent: boolean; reason?: string }> }> {
  const providers = getEnabledNotificationProviders();
  const results: Array<{ provider: string; sent: boolean; reason?: string }> = [];

  for (const provider of providers) {
    const result = await provider.notifyFamilyStatusChange(params);
    results.push({
      provider: provider.name,
      sent: result.sent,
      reason: result.reason,
    });
  }

  return { results };
}
