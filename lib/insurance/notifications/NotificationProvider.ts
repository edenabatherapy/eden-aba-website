export type NewVerificationNotificationParams = {
  requestId: string;
  submittedAt: string;
  verificationType: string;
  insuranceProvider: string;
  status: string;
};

export type FamilyStatusChangeParams = {
  requestId: string;
  recipientEmail: string;
  memberFirstName?: string;
  previousStatus: string;
  newStatus: string;
  portalUrl: string;
};

export type NotificationSendResult = {
  sent: boolean;
  reason?: string;
};

export interface NotificationProvider {
  readonly name: string;
  notifyNewVerificationRequest(
    params: NewVerificationNotificationParams,
  ): Promise<NotificationSendResult>;
  notifyFamilyStatusChange(
    params: FamilyStatusChangeParams,
  ): Promise<NotificationSendResult>;
}
