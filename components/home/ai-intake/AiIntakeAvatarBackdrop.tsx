import { EDEN_AI_INTAKE_OFFICE_BG_PATH } from "./ai-intake-brand";

/** Permanent Eden office backdrop behind the LiveAvatar chroma-key layer. */
export default function AiIntakeAvatarBackdrop() {
  return (
    <div className="eden-ai-video__avatar-bg" aria-hidden="true">
      <img
        src={EDEN_AI_INTAKE_OFFICE_BG_PATH}
        alt=""
        className="eden-ai-video__avatar-bg-image"
      />
      <div className="eden-ai-video__avatar-bg-overlay" />
    </div>
  );
}
