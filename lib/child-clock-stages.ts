export type ChildClockStage = {
  id: string;
  label: string;
  title: string;
  description: string;
  color: string;
};

export const CHILD_CLOCK_STAGES: ChildClockStage[] = [
  {
    id: "birth",
    label: "Birth",
    title: "Birth",
    description: "Early development begins. Every milestone matters.",
    color: "#14b8a6",
  },
  {
    id: "9m",
    label: "9m",
    title: "9 Months",
    description: "Watch for eye contact, sounds, gestures, and social connection.",
    color: "#06b6d4",
  },
  {
    id: "18m",
    label: "18m",
    title: "18 Months",
    description: "Communication, play, and interaction become important signs.",
    color: "#22c55e",
  },
  {
    id: "24m",
    label: "24m",
    title: "24 Months",
    description: "Early screening can help identify support needs sooner.",
    color: "#facc15",
  },
  {
    id: "care",
    label: "Care",
    title: "Care",
    description: "Compassionate support helps families understand the next step.",
    color: "#ec4899",
  },
  {
    id: "dx",
    label: "Dx",
    title: "Diagnosis",
    description: "A professional evaluation can guide services and care planning.",
    color: "#8b5cf6",
  },
  {
    id: "alert",
    label: "Alert",
    title: "Early Alert",
    description: "Early signs deserve attention, support, and action.",
    color: "#f97316",
  },
];

export function childClockNoteTextColor(color: string) {
  return color.toLowerCase() === "#facc15" || color.toLowerCase() === "#ca8a04" ? "#0f172a" : "#ffffff";
}
