"use client";

import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";

export default function ProviderReferralForm() {
  const {
    recaptchaRef,
    recaptchaError,
    handleTokenChange,
    handleExpired,
  } = useReCaptchaV2();

  return (
    <form className="eden-providers-form" aria-label="Provider referral form">
      <p className="eden-providers-form__notice">
        This secure provider referral workflow is being prepared. For now, please contact Eden using the
        channels listed or ask the family to begin the intake form when appropriate.
      </p>

      <div className="eden-providers-form__grid">
        <label>
          Referring provider name
          <input type="text" name="providerName" autoComplete="name" placeholder="Dr. Jane Smith" />
        </label>
        <label>
          Organization / practice
          <input type="text" name="organization" placeholder="Practice or clinic name" />
        </label>
        <label>
          Provider phone
          <input type="tel" name="providerPhone" autoComplete="tel" placeholder="(703) 555-0100" />
        </label>
        <label>
          Provider email
          <input type="email" name="providerEmail" autoComplete="email" placeholder="provider@clinic.com" />
        </label>
      </div>

      <div className="eden-providers-form__grid">
        <label>
          Child first name (optional)
          <input type="text" name="childFirstName" placeholder="First name only if permitted" />
        </label>
        <label>
          Child age or date of birth (optional)
          <input type="text" name="childAge" placeholder="Age or DOB if known" />
        </label>
      </div>

      <label>
        Parent / caregiver contact (optional)
        <input type="text" name="caregiverContact" placeholder="Name and phone or email if available" />
      </label>

      <label>
        Reason for referral
        <select name="referralReason" defaultValue="">
          <option value="" disabled>
            Select a reason
          </option>
          <option value="autism-concerns">Autism-related concerns</option>
          <option value="aba-services">ABA services inquiry</option>
          <option value="school-support">School / IEP support</option>
          <option value="evaluation">Screening or evaluation support</option>
          <option value="other">Other clinical or developmental concern</option>
        </select>
      </label>

      <label>
        Additional notes
        <textarea name="notes" placeholder="Share any information you are authorized to provide." />
      </label>

      <ReCaptchaVerification
        ref={recaptchaRef}
        onTokenChange={handleTokenChange}
        onExpired={handleExpired}
        error={recaptchaError}
        noticeAlign="left"
        showNotice
        className="mt-6"
      />

      <button type="button" className="eden-providers-btn eden-providers-btn--primary mt-6" disabled>
        Submit referral (coming soon)
      </button>

      <p className="eden-providers-form__notice">
        Submitting this form will not guarantee acceptance, diagnosis, authorization, or immediate
        availability. Eligibility may vary by plan and service area.
      </p>
    </form>
  );
}
