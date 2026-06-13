"use client";

import dynamic from "next/dynamic";

const EdenChatWidget = dynamic(() => import("@/components/EdenChatWidget"), {
  ssr: false,
});

export default function EdenChatWidgetLoader() {
  return <EdenChatWidget />;
}
