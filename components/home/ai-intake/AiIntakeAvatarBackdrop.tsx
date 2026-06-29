"use client";

import { useState } from "react";
import {
  EDEN_AI_INTAKE_LOGO_PATH,
  EDEN_AI_INTAKE_OFFICE_BG_PATH,
} from "./ai-intake-brand";

export default function AiIntakeAvatarBackdrop() {
  const [officeImageAvailable, setOfficeImageAvailable] = useState(true);

  return (
    <div className="eden-ai-video__avatar-bg" aria-hidden="true">
      {officeImageAvailable ? (
        <img
          src={EDEN_AI_INTAKE_OFFICE_BG_PATH}
          alt=""
          className="eden-ai-video__avatar-bg-image"
          onError={() => setOfficeImageAvailable(false)}
        />
      ) : (
        <div className="eden-ai-video__avatar-bg-clinic">
          <img
            src={EDEN_AI_INTAKE_LOGO_PATH}
            alt=""
            className="eden-ai-video__avatar-bg-logo"
          />
        </div>
      )}
    </div>
  );
}
