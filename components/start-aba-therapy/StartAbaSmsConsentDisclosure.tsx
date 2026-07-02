const linkClassName = "text-emerald-700 underline underline-offset-2 hover:text-emerald-800";

export default function StartAbaSmsConsentDisclosure() {
  return (
    <>
      I consent to receive customer care text messages from Eden ABA Therapy LLC. Reply STOP to opt out; Reply HELP
      for support; Message and data rates may apply; Messaging frequency may vary. Visit{" "}
      <a
        href="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        https://www.edenabatherapy.com/privacy-policy
      </a>{" "}
      for our Privacy Policy and{" "}
      <a
        href="/terms-of-service"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        https://www.edenabatherapy.com/terms-of-service
      </a>{" "}
      for our Terms of Service.
    </>
  );
}
