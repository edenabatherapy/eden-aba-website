"use client";

import { motion } from "framer-motion";

const svgClass = "h-full w-full";

export function TelehealthHeroIllustration({ ariaLabel, className = "" }) {
  return (
    <motion.svg
      viewBox="0 0 480 420"
      className={`${svgClass} ${className}`}
      role="img"
      aria-label={ariaLabel}
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <rect width="480" height="420" rx="32" fill="#ddf4f4" />
      <rect x="24" y="28" width="432" height="364" rx="24" fill="#fff8df" />
      <rect x="48" y="52" width="200" height="140" rx="16" fill="#128c8c" opacity="0.12" />
      <rect x="64" y="210" width="160" height="12" rx="6" fill="#0b4f4f" opacity="0.15" />
      <rect x="64" y="232" width="120" height="12" rx="6" fill="#0b4f4f" opacity="0.1" />
      <circle cx="120" cy="130" r="36" fill="#f7c72f" opacity="0.35" />
      <circle cx="155" cy="118" r="28" fill="#128c8c" opacity="0.25" />
      <rect x="280" y="64" width="152" height="108" rx="12" fill="#0b4f4f" />
      <rect x="288" y="72" width="136" height="84" rx="8" fill="#1a6b6b" />
      <circle cx="356" cy="108" r="22" fill="#f7c72f" opacity="0.85" />
      <rect x="332" y="132" width="48" height="8" rx="4" fill="#ddf4f4" opacity="0.6" />
      <motion.circle
        cx="392"
        cy="78"
        r="6"
        fill="#ef4444"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <text x="404" y="82" fill="white" fontSize="9" fontWeight="700">LIVE</text>
      <rect x="280" y="188" width="152" height="180" rx="16" fill="white" stroke="#128c8c" strokeWidth="3" />
      <rect x="296" y="204" width="120" height="88" rx="8" fill="#eef9f4" />
      <circle cx="356" cy="240" r="20" fill="#128c8c" opacity="0.3" />
      <rect x="312" y="304" width="88" height="10" rx="5" fill="#0b4f4f" opacity="0.12" />
      <rect x="312" y="322" width="64" height="10" rx="5" fill="#0b4f4f" opacity="0.08" />
      <rect x="48" y="280" width="200" height="96" rx="14" fill="white" stroke="#1f7a2e" strokeWidth="2" />
      <rect x="64" y="296" width="80" height="64" rx="8" fill="#128c8c" opacity="0.15" />
      <circle cx="180" cy="328" r="18" fill="#f7c72f" opacity="0.5" />
      <rect x="100" y="318" width="60" height="8" rx="4" fill="#0b4f4f" opacity="0.2" />
      <rect x="360" y="368" width="88" height="24" rx="12" fill="#1f7a2e" />
      <text x="378" y="384" fill="white" fontSize="10" fontWeight="700">Secure</text>
    </motion.svg>
  );
}

export function VirtualVsInPersonIllustration({ ariaLabel, className = "" }) {
  return (
    <svg viewBox="0 0 440 320" className={`${svgClass} ${className}`} role="img" aria-label={ariaLabel}>
      <rect width="440" height="320" rx="24" fill="#eef9f4" />
      <text x="32" y="36" fill="#0b4f4f" fontSize="13" fontWeight="800">Virtual</text>
      <rect x="24" y="48" width="188" height="248" rx="16" fill="white" stroke="#128c8c" strokeWidth="2" />
      <rect x="40" y="64" width="156" height="100" rx="10" fill="#0b4f4f" />
      <rect x="48" y="72" width="140" height="76" rx="6" fill="#1a6b6b" />
      <circle cx="118" cy="108" r="18" fill="#f7c72f" opacity="0.8" />
      <rect x="40" y="176" width="156" height="8" rx="4" fill="#128c8c" opacity="0.3" />
      <rect x="40" y="192" width="120" height="8" rx="4" fill="#128c8c" opacity="0.2" />
      <rect x="40" y="216" width="156" height="32" rx="8" fill="#ddf4f4" />
      <text x="56" y="236" fill="#0b4f4f" fontSize="10" fontWeight="600">Home environment</text>
      <text x="240" y="36" fill="#0b4f4f" fontSize="13" fontWeight="800">In-Person</text>
      <rect x="228" y="48" width="188" height="248" rx="16" fill="white" stroke="#0b4f4f" strokeWidth="2" />
      <rect x="244" y="64" width="72" height="72" rx="10" fill="#128c8c" opacity="0.15" />
      <rect x="328" y="64" width="72" height="72" rx="10" fill="#f7c72f" opacity="0.2" />
      <rect x="244" y="148" width="156" height="56" rx="10" fill="#0b4f4f" opacity="0.08" />
      <circle cx="272" cy="176" r="12" fill="#128c8c" opacity="0.4" />
      <circle cx="308" cy="176" r="12" fill="#128c8c" opacity="0.4" />
      <circle cx="344" cy="176" r="12" fill="#128c8c" opacity="0.4" />
      <rect x="244" y="216" width="156" height="32" rx="8" fill="#fff8df" />
      <text x="258" y="236" fill="#0b4f4f" fontSize="10" fontWeight="600">Clinic / center</text>
    </svg>
  );
}

export function FamilyCoachingIllustration({ ariaLabel, className = "" }) {
  return (
    <svg viewBox="0 0 440 340" className={`${svgClass} ${className}`} role="img" aria-label={ariaLabel}>
      <rect width="440" height="340" rx="28" fill="#fff8df" />
      <rect x="32" y="200" width="376" height="16" rx="4" fill="#128c8c" opacity="0.15" />
      <rect x="80" y="160" width="280" height="48" rx="8" fill="#ddf4f4" />
      <rect x="120" y="100" width="200" height="120" rx="12" fill="white" stroke="#1f7a2e" strokeWidth="2" />
      <rect x="132" y="112" width="176" height="88" rx="8" fill="#0b4f4f" opacity="0.9" />
      <circle cx="220" cy="148" r="16" fill="#f7c72f" />
      <rect x="168" y="172" width="104" height="8" rx="4" fill="#ddf4f4" opacity="0.5" />
      <circle cx="100" cy="148" r="32" fill="#128c8c" opacity="0.25" />
      <circle cx="340" cy="132" r="24" fill="#f7c72f" opacity="0.35" />
      <rect x="60" y="228" width="120" height="72" rx="12" fill="#eef9f4" stroke="#128c8c" strokeWidth="1.5" />
      <text x="78" y="258" fill="#0b4f4f" fontSize="11" fontWeight="700">Coaching tips</text>
      <rect x="72" y="268" width="96" height="6" rx="3" fill="#128c8c" opacity="0.3" />
      <rect x="72" y="280" width="72" height="6" rx="3" fill="#128c8c" opacity="0.2" />
    </svg>
  );
}

export function VirtualProgressDashboardIllustration({ ariaLabel, className = "" }) {
  return (
    <motion.svg
      viewBox="0 0 400 280"
      className={`${svgClass} ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <rect width="400" height="280" rx="20" fill="white" stroke="#128c8c" strokeWidth="2" />
      <rect x="20" y="20" width="360" height="40" rx="10" fill="#0b4f4f" />
      <text x="36" y="46" fill="white" fontSize="14" fontWeight="800">Eden Family Portal</text>
      <circle cx="100" cy="140" r="48" fill="none" stroke="#ddf4f4" strokeWidth="10" />
      <motion.circle
        cx="100"
        cy="140"
        r="48"
        fill="none"
        stroke="#1f7a2e"
        strokeWidth="10"
        strokeDasharray="220 302"
        strokeLinecap="round"
        transform="rotate(-90 100 140)"
        animate={{ strokeDasharray: ["180 302", "220 302", "180 302"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="82" y="146" fill="#0b4f4f" fontSize="16" fontWeight="800">72%</text>
      <rect x="180" y="88" width="180" height="28" rx="8" fill="#eef9f4" />
      <text x="192" y="106" fill="#0b4f4f" fontSize="11" fontWeight="700">Communication goals</text>
      <rect x="180" y="128" width="180" height="28" rx="8" fill="#fff8df" />
      <text x="192" y="146" fill="#0b4f4f" fontSize="11" fontWeight="700">Daily routines</text>
      <rect x="180" y="168" width="180" height="28" rx="8" fill="#ddf4f4" />
      <text x="192" y="186" fill="#0b4f4f" fontSize="11" fontWeight="700">Behavior support</text>
      <rect x="180" y="208" width="120" height="24" rx="12" fill="#1f7a2e" />
      <text x="196" y="224" fill="white" fontSize="10" fontWeight="700">View progress</text>
    </motion.svg>
  );
}

export function TelehealthInsuranceIllustration({ ariaLabel, className = "" }) {
  return (
    <svg viewBox="0 0 360 280" className={`${svgClass} ${className}`} role="img" aria-label={ariaLabel}>
      <rect width="360" height="280" rx="24" fill="#eef9f4" />
      <path
        d="M180 48 L220 68 L220 120 C220 160 180 200 180 200 C180 200 140 160 140 120 L140 68 Z"
        fill="#128c8c"
        opacity="0.85"
      />
      <rect x="88" y="120" width="184" height="128" rx="12" fill="white" stroke="#0b4f4f" strokeWidth="2" />
      <rect x="108" y="140" width="144" height="12" rx="4" fill="#0b4f4f" opacity="0.15" />
      <rect x="108" y="162" width="112" height="12" rx="4" fill="#0b4f4f" opacity="0.1" />
      <rect x="108" y="184" width="128" height="12" rx="4" fill="#0b4f4f" opacity="0.1" />
      <circle cx="128" cy="220" r="10" fill="#1f7a2e" />
      <path d="M124 220 L127 223 L133 216" stroke="white" strokeWidth="2" fill="none" />
      <text x="148" y="224" fill="#0b4f4f" fontSize="11" fontWeight="700">Telehealth eligible</text>
    </svg>
  );
}

export function TelehealthDecorCircles({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="80" cy="80" r="64" fill="#128c8c" opacity="0.2" />
      <circle cx="140" cy="120" r="40" fill="#f7c72f" opacity="0.25" />
      <circle cx="100" cy="140" r="28" fill="none" stroke="#128c8c" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
