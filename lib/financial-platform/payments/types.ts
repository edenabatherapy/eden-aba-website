export type PaymentProviderId = "stripe" | "paypal" | "apple_pay" | "google_pay" | "ach";

export type PaymentIntentRequest = {
  donationId: string;
  amountCents: number;
  currency: string;
  donorEmail?: string;
  metadata?: Record<string, string>;
};

export type PaymentIntentResult = {
  provider: PaymentProviderId;
  ready: boolean;
  clientSecret?: string;
  redirectUrl?: string;
  message: string;
};

export interface PaymentProvider {
  id: PaymentProviderId;
  isConfigured(): boolean;
  createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResult>;
}
