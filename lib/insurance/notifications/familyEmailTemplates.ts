export type FamilyEmailTemplateParams = {
  requestId: string;
  portalUrl: string;
  memberFirstName?: string;
};

export function buildCoverageActiveEmail(params: FamilyEmailTemplateParams) {
  const greeting = params.memberFirstName
    ? `Hello ${params.memberFirstName},`
    : "Hello,";

  const subject = "Your insurance eligibility has been reviewed — Eden ABA Therapy";
  const text = [
    greeting,
    "",
    "Your insurance eligibility has been reviewed.",
    "",
    "Eden ABA Therapy staff have confirmed your coverage details. You can view your verification status and next steps in your secure family portal:",
    params.portalUrl,
    "",
    `Reference ID: ${params.requestId}`,
    "",
    "If you have questions, contact Eden ABA Therapy intake staff.",
    "",
    "This message does not include Medicaid ID, SSN, or other sensitive identifiers.",
  ].join("\n");

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; color: #0b4f4f;">
      <p>${greeting}</p>
      <p><strong>Your insurance eligibility has been reviewed.</strong></p>
      <p>Eden ABA Therapy staff have confirmed your coverage details. View your status and next steps in your secure family portal:</p>
      <p><a href="${params.portalUrl}" style="color: #128c8c; font-weight: 700;">Open Family Portal</a></p>
      <p style="font-size: 13px; color: #64748b;">Reference ID: ${params.requestId}</p>
      <p style="font-size: 13px; color: #64748b;">This message does not include Medicaid ID, SSN, or other sensitive identifiers.</p>
    </div>
  `.trim();

  return { subject, text, html };
}

export function buildUnableToVerifyEmail(params: FamilyEmailTemplateParams) {
  const greeting = params.memberFirstName
    ? `Hello ${params.memberFirstName},`
    : "Hello,";

  const subject = "Our team needs additional information — Eden ABA Therapy";
  const text = [
    greeting,
    "",
    "Our team needs additional information to complete your insurance verification.",
    "",
    "Please visit your secure family portal to update contact details or upload supporting documents:",
    params.portalUrl,
    "",
    `Reference ID: ${params.requestId}`,
    "",
    "Eden ABA Therapy intake staff may also reach out to help complete verification.",
    "",
    "This message does not include Medicaid ID, SSN, or other sensitive identifiers.",
  ].join("\n");

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; color: #0b4f4f;">
      <p>${greeting}</p>
      <p><strong>Our team needs additional information.</strong></p>
      <p>Please visit your secure family portal to update contact details or upload supporting documents:</p>
      <p><a href="${params.portalUrl}" style="color: #128c8c; font-weight: 700;">Open Family Portal</a></p>
      <p style="font-size: 13px; color: #64748b;">Reference ID: ${params.requestId}</p>
      <p style="font-size: 13px; color: #64748b;">This message does not include Medicaid ID, SSN, or other sensitive identifiers.</p>
    </div>
  `.trim();

  return { subject, text, html };
}
