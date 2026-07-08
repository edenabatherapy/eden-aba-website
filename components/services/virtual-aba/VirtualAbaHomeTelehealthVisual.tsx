"use client";

import { motion, useReducedMotion } from "framer-motion";

type VirtualAbaHomeTelehealthVisualProps = {
  className?: string;
};

export default function VirtualAbaHomeTelehealthVisual({ className = "" }: VirtualAbaHomeTelehealthVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 640 420"
        className="h-full w-full drop-shadow-xl"
        role="img"
        aria-label="Illustration of a parent and child at home connecting with a BCBA through secure virtual ABA therapy, with progress tracking and scheduling elements"
      >
        <defs>
          <linearGradient id="vaba-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8f8f2" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="vaba-screen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e5a8a" />
            <stop offset="100%" stopColor="#0b4f4f" />
          </linearGradient>
        </defs>
        <rect width="640" height="420" rx="28" fill="url(#vaba-bg)" />
        {/* Home scene */}
        <rect x="32" y="48" width="280" height="200" rx="16" fill="#fff" stroke="#bae6fd" strokeWidth="2" />
        <circle cx="120" cy="140" r="28" fill="#facc15" opacity="0.35" />
        <circle cx="180" cy="155" r="22" fill="#0e6b4f" opacity="0.2" />
        <rect x="90" y="175" width="80" height="50" rx="10" fill="#128c8c" opacity="0.15" />
        <text x="48" y="72" fill="#0b4f4f" fontSize="11" fontWeight="800">
          Home
        </text>
        {/* Laptop */}
        <rect x="200" y="120" width="100" height="68" rx="8" fill="#334155" />
        <rect x="206" y="126" width="88" height="52" rx="4" fill="url(#vaba-screen)" />
        <circle cx="250" cy="152" r="14" fill="#facc15" opacity="0.85" />
        <rect x="235" y="168" width="30" height="6" rx="3" fill="#fff" opacity="0.5" />
        <rect x="215" y="192" width="70" height="8" rx="4" fill="#64748b" />
        {/* Connection lines */}
        <motion.path
          d="M300 152 Q380 120 420 100"
          fill="none"
          stroke="#49b8c8"
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, 20] }}
          transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M300 168 Q390 180 430 200"
          fill="none"
          stroke="#0e6b4f"
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={reduceMotion ? undefined : { strokeDashoffset: [20, 0] }}
          transition={reduceMotion ? undefined : { duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        {/* BCBA on screen card */}
        <rect x="420" y="72" width="180" height="120" rx="14" fill="#fff" stroke="#0e6b4f" strokeWidth="2" />
        <text x="436" y="96" fill="#0b4f4f" fontSize="10" fontWeight="800">
          BCBA Consultation
        </text>
        <circle cx="510" cy="130" r="22" fill="#128c8c" opacity="0.25" />
        <rect x="440" y="158" width="100" height="8" rx="4" fill="#0b4f4f" opacity="0.12" />
        <rect x="440" y="172" width="72" height="8" rx="4" fill="#0b4f4f" opacity="0.08" />
        {/* Shield */}
        <rect x="420" y="210" width="88" height="72" rx="12" fill="#fff" stroke="#10b981" strokeWidth="2" />
        <path d="M464 228 L464 258 Q464 272 464 272 Q464 272 428 258 L428 228 Q464 218 464 228" fill="#10b981" opacity="0.2" />
        <text x="432" y="278" fill="#0b4f4f" fontSize="9" fontWeight="700">
          Secure
        </text>
        {/* Progress chart */}
        <rect x="524" y="210" width="88" height="72" rx="12" fill="#fff" stroke="#1e5a8a" strokeWidth="2" />
        <rect x="538" y="248" width="12" height="22" rx="3" fill="#128c8c" opacity="0.5" />
        <rect x="556" y="238" width="12" height="32" rx="3" fill="#0e6b4f" opacity="0.6" />
        <rect x="574" y="228" width="12" height="42" rx="3" fill="#1e5a8a" opacity="0.7" />
        <text x="532" y="226" fill="#0b4f4f" fontSize="9" fontWeight="700">
          Progress
        </text>
        {/* Calendar */}
        <rect x="32" y="268" width="120" height="80" rx="12" fill="#fff" stroke="#facc15" strokeWidth="2" />
        <rect x="32" y="268" width="120" height="22" rx="12" fill="#facc15" opacity="0.35" />
        <text x="48" y="284" fill="#0b4f4f" fontSize="9" fontWeight="800">
          Reminder
        </text>
        <circle cx="68" cy="318" r="6" fill="#0e6b4f" opacity="0.4" />
        <circle cx="92" cy="318" r="6" fill="#0e6b4f" opacity="0.25" />
        <circle cx="116" cy="318" r="6" fill="#128c8c" opacity="0.5" />
        {/* Digital care card */}
        <rect x="168" y="268" width="144" height="80" rx="12" fill="#fff" stroke="#49b8c8" strokeWidth="2" />
        <text x="184" y="292" fill="#0b4f4f" fontSize="9" fontWeight="800">
          Digital Care
        </text>
        <rect x="184" y="302" width="96" height="8" rx="4" fill="#0b4f4f" opacity="0.1" />
        <rect x="184" y="318" width="72" height="8" rx="4" fill="#0b4f4f" opacity="0.08" />
        {/* Wi-Fi icon area */}
        <motion.g
          animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={reduceMotion ? undefined : { duration: 2.5, repeat: Infinity }}
        >
          <path d="M340 320 Q360 300 380 320" fill="none" stroke="#49b8c8" strokeWidth="2" />
          <path d="M330 330 Q360 305 390 330" fill="none" stroke="#49b8c8" strokeWidth="2" />
          <circle cx="360" cy="338" r="4" fill="#0e6b4f" />
        </motion.g>
      </svg>
    </div>
  );
}
