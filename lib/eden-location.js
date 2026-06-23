import { EDEN_BUSINESS_HOURS_TUPLES } from "@/lib/eden-business-hours";

export const EDEN_ANNANDALE_ADDRESS =
  "7700 Little River Turnpike, Suite 304, Annandale, VA 22003, United States";

export const EDEN_ANNANDALE_SHORT_ADDRESS =
  "7700 Little River Turnpike, Suite 304, Annandale, VA 22003";

/** Annandale office — 7700 Little River Turnpike (Suite 304). Pin at building centroid. */
export const EDEN_ANNANDALE_CENTER = {
  lat: 38.8335824,
  lng: -77.2111802,
};

export const EDEN_CLINIC_NAME = "Eden ABA Therapy";
export const EDEN_ANNANDALE_LOCATION_NAME = "Eden ABA Therapy - Annandale";
export const EDEN_ANNANDALE_PHONE = "(703) 587-5238";
export const EDEN_ANNANDALE_PHONE_TEL = "7035875238";

export const EDEN_BUSINESS_HOURS = EDEN_BUSINESS_HOURS_TUPLES;

/** @param {string} [address] */
export function getEdenMapLocation(address = EDEN_ANNANDALE_ADDRESS) {
  return {
    address,
    shortAddress: EDEN_ANNANDALE_SHORT_ADDRESS,
    center: EDEN_ANNANDALE_CENTER,
    name: EDEN_ANNANDALE_LOCATION_NAME,
    phone: EDEN_ANNANDALE_PHONE,
    phoneTel: EDEN_ANNANDALE_PHONE_TEL,
  };
}

/** @param {string} [address] */
export function getDirectionsUrl(address = EDEN_ANNANDALE_ADDRESS) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

/** @param {string} [address] */
export function getGoogleMapsPlaceUrl(address = EDEN_ANNANDALE_ADDRESS) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
