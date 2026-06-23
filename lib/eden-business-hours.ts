export const EDEN_WEEKDAY_HOURS_DISPLAY = "8:00 AM – 7:00 PM" as const;
export const EDEN_SATURDAY_HOURS_DISPLAY = "Closed" as const;
export const EDEN_SUNDAY_HOURS_DISPLAY = "Closed" as const;

export type EdenHoursTuple = [day: string, hours: string];

/** Locale-style tuples used in `edenBusinessInfo.hours` and location cards. */
export const EDEN_BUSINESS_HOURS_TUPLES: EdenHoursTuple[] = [
  ["Monday", EDEN_WEEKDAY_HOURS_DISPLAY],
  ["Tuesday", EDEN_WEEKDAY_HOURS_DISPLAY],
  ["Wednesday", EDEN_WEEKDAY_HOURS_DISPLAY],
  ["Thursday", EDEN_WEEKDAY_HOURS_DISPLAY],
  ["Friday", EDEN_WEEKDAY_HOURS_DISPLAY],
  ["Saturday", EDEN_SATURDAY_HOURS_DISPLAY],
  ["Sunday", EDEN_SUNDAY_HOURS_DISPLAY],
];

export type EdenBusinessHoursRow = {
  day: string;
  hours: string;
};

/** Row format for contact and location UI components. */
export const EDEN_BUSINESS_HOURS_ROWS: EdenBusinessHoursRow[] = EDEN_BUSINESS_HOURS_TUPLES.map(
  ([day, hours]) => ({ day, hours }),
);

/** schema.org OpeningHoursSpecification for LocalBusiness structured data. */
export const EDEN_OPENING_HOURS_SPECIFICATION = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "19:00",
  },
] as const;

/** Human-readable summary for knowledge base and assistant content. */
export const EDEN_OFFICE_HOURS_SUMMARY = `Monday: ${EDEN_WEEKDAY_HOURS_DISPLAY}
Tuesday: ${EDEN_WEEKDAY_HOURS_DISPLAY}
Wednesday: ${EDEN_WEEKDAY_HOURS_DISPLAY}
Thursday: ${EDEN_WEEKDAY_HOURS_DISPLAY}
Friday: ${EDEN_WEEKDAY_HOURS_DISPLAY}
Saturday: ${EDEN_SATURDAY_HOURS_DISPLAY}
Sunday: ${EDEN_SUNDAY_HOURS_DISPLAY}`;

/** Half-hour appointment slots aligned with weekday office hours (8:00 AM – 7:00 PM). */
export const EDEN_APPOINTMENT_TIME_SLOTS = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
] as const;
