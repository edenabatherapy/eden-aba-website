"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import AiReceptionistPlaceholderPanel from "./AiReceptionistPlaceholderPanel";

const LiveAvatarReceptionistPanel = dynamic(() => import("./LiveAvatarReceptionistPanel"), {
  ssr: false,
  loading: () => <AiReceptionistPlaceholderPanel active={false} />,
});

type AiReceptionistVideoPanelProps = {
  active?: boolean;
};

export default function AiReceptionistVideoPanel({ active = true }: AiReceptionistVideoPanelProps) {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return <AiReceptionistPlaceholderPanel active={active} />;
  }

  return (
    <LiveAvatarReceptionistPanel active={active} onFallback={() => setUseFallback(true)} />
  );
}
