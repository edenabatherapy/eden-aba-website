import type { PaymentIntentRequest, PaymentIntentResult, PaymentProvider } from "./types";

function stubProvider(
  id: PaymentProvider["id"],
  envKey: string,
  label: string,
): PaymentProvider {
  return {
    id,
    isConfigured() {
      return Boolean(process.env[envKey]?.trim());
    },
    async createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResult> {
      if (!this.isConfigured()) {
        return {
          provider: id,
          ready: false,
          message: `${label} is not configured. Donation ${request.donationId} saved as pending.`,
        };
      }
      return {
        provider: id,
        ready: false,
        message: `${label} credentials detected but checkout is not yet enabled in this environment.`,
      };
    },
  };
}

export const stripeProvider = stubProvider("stripe", "STRIPE_SECRET_KEY", "Stripe");
export const paypalProvider = stubProvider("paypal", "PAYPAL_CLIENT_ID", "PayPal");
export const applePayProvider = stubProvider("apple_pay", "APPLE_PAY_MERCHANT_ID", "Apple Pay");
export const googlePayProvider = stubProvider("google_pay", "GOOGLE_PAY_MERCHANT_ID", "Google Pay");
export const achProvider = stubProvider("ach", "ACH_GATEWAY_KEY", "ACH bank transfer");

const providers = [stripeProvider, paypalProvider, applePayProvider, googlePayProvider, achProvider];

export function getPaymentProvider(id: PaymentProvider["id"]): PaymentProvider | undefined {
  return providers.find((p) => p.id === id);
}

export function getDefaultPaymentProvider(): PaymentProvider {
  const configured = providers.find((p) => p.isConfigured());
  return configured ?? stripeProvider;
}

export function listPaymentProviders(): Array<{ id: string; configured: boolean }> {
  return providers.map((p) => ({ id: p.id, configured: p.isConfigured() }));
}
