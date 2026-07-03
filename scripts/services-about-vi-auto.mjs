/**
 * Auto-generate Vietnamese translations for services/about overlay strings.
 * Run: node scripts/services-about-vi-auto.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PRESERVE = [
  "Eden ABA Therapy", "BCBA", "RBT", "BT", "IEP", "AAC", "EPSDT", "CMS", "ADOS-2",
  "M-CHAT-R", "M-CHAT-R/F", "BACB", "Medicaid.gov", "Autism Speaks", "CAST (Childhood Autism Spectrum Test)",
  "Naveen Omari", "Steve Dang", "Association of Professional Behavior Analysts",
  "Board Certified Behavior Analyst (BCBA)", "Registered Behavior Technician (RBT)", "Behavior Technician (BT)",
  "Behavior Technician", "Director of RBT Development", "Lead Registered Behavior Technician",
  "Tier 1", "Tier 2", "Tier 3", "Phase 1", "Phase 2", "Phase 3", "Phase 4",
  "Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8",
  "NO", "SD", "Virginia", "Maryland", "Healthcare.gov", "HHS / Autism Support",
  "U.S. Department of Education", "Centers for Disease Control and Prevention", "Behavior Analyst Certification Board",
  "Council of Autism Service Providers", "Virginia DMAS", "Maryland Department of Health", "Virginia Early Intervention",
  "Autism Society of America", "APBA", "CASP", "IDEA",
];

function protect(text) {
  const tokens = [];
  let r = text;
  PRESERVE.forEach((term, i) => {
    if (!r.includes(term)) return;
    const t = `__P${i}__`;
    tokens.push([t, term]);
    r = r.split(term).join(t);
  });
  return { r, tokens };
}

function restore(text, tokens) {
  let r = text;
  for (const [t, term] of tokens) r = r.split(t).join(term);
  return r;
}

const PHRASES = [
  ["school-based ABA", "ABA tại trường"],
  ["School-based ABA", "ABA tại trường"],
  ["parent training", "đào tạo phụ huynh"],
  ["Parent training", "Đào tạo phụ huynh"],
  ["Parent Training", "Đào tạo Phụ huynh"],
  ["family-centered", "lấy gia đình làm trung tâm"],
  ["Family-centered", "Lấy gia đình làm trung tâm"],
  ["evidence-based", "dựa trên bằng chứng"],
  ["Evidence-based", "Dựa trên bằng chứng"],
  ["positive reinforcement", "củng cố tích cực"],
  ["Positive reinforcement", "Củng cố tích cực"],
  ["Positive Reinforcement", "Củng cố Tích cực"],
  ["clinical excellence", "xuất sắc lâm sàng"],
  ["Clinical Excellence", "Xuất sắc Lâm sàng"],
  ["social skills", "kỹ năng xã hội"],
  ["Social Skills", "Kỹ năng Xã hội"],
  ["daily living skills", "kỹ năng sinh hoạt hàng ngày"],
  ["Daily Living Skills", "Kỹ năng Sinh hoạt Hàng ngày"],
  ["communication skills", "kỹ năng giao tiếp"],
  ["Communication", "Giao tiếp"],
  ["classroom", "lớp học"],
  ["Classroom", "Lớp học"],
  ["screening", "sàng lọc"],
  ["Screening", "Sàng lọc"],
  ["evaluation", "đánh giá"],
  ["Evaluation", "Đánh giá"],
  ["assessment", "đánh giá"],
  ["Assessment", "Đánh giá"],
  ["caregiver", "người chăm sóc"],
  ["Caregiver", "Người chăm sóc"],
  ["caregivers", "người chăm sóc"],
  ["Caregivers", "Người chăm sóc"],
  ["families", "gia đình"],
  ["Families", "Gia đình"],
  ["children", "trẻ"],
  ["Children", "Trẻ"],
  ["child's", "của trẻ"],
  ["child ", "trẻ "],
  ["Child ", "Trẻ "],
  ["autism", "tự kỷ"],
  ["Autism", "Tự kỷ"],
  ["independence", "độc lập"],
  ["Independence", "Độc lập"],
  ["transitions", "chuyển tiếp"],
  ["Transitions", "Chuyển tiếp"],
  ["behavior", "hành vi"],
  ["Behavior", "Hành vi"],
  ["treatment plan", "kế hoạch điều trị"],
  ["Treatment plan", "Kế hoạch điều trị"],
  ["treatment plans", "kế hoạch điều trị"],
  ["progress", "tiến bộ"],
  ["Progress", "Tiến bộ"],
  ["intake", "intake"],
  ["Intake", "Intake"],
  ["insurance", "bảo hiểm"],
  ["Insurance", "Bảo hiểm"],
  ["Medicaid", "Medicaid"],
  ["generalization", "khái quát hóa"],
  ["Generalization", "Khái quát hóa"],
  ["school readiness", "sẵn sàng đi học"],
  ["School Readiness", "Sẵn sàng Đi học"],
  ["peer interaction", "tương tác bạn bè"],
  ["Peer interaction", "Tương tác bạn bè"],
  ["functional communication", "giao tiếp chức năng"],
  ["Functional communication", "Giao tiếp chức năng"],
  ["Get Started", "Bắt đầu"],
  ["Contact Eden", "Liên hệ Eden"],
  ["Coming soon", "Sắp ra mắt"],
];

const EXACT = JSON.parse(readFileSync(join(root, "scripts/services-about-vi-batches/batch-01.json"), "utf8"));

function autoTranslate(en) {
  if (EXACT[en]) return EXACT[en];
  if (/^bg-|^from-|^text-/.test(en)) return en;
  if (/^(Tier|Phase|Step) \d$/.test(en)) return en;
  if (en === "Assessment" || en === "Referral" || en === "Evaluation" || en === "Screening") {
    const m = { Assessment: "Đánh giá", Referral: "Giới thiệu", Evaluation: "Đánh giá", Screening: "Sàng lọc" };
    return m[en] ?? en;
  }

  const { r, tokens } = protect(en);
  let out = r;
  for (const [a, b] of PHRASES) out = out.split(a).join(b);

  // Sentence-level patterns
  out = out
    .replace(/^What is (.+)\?$/, "($1) là gì?")
    .replace(/^How (.+)\?$/, "Làm thế nào để $1?")
    .replace(/^Can (.+)\?$/, "$1 có thể không?")
    .replace(/^Does (.+)\?$/, "$1 có phải không?")
    .replace(/^Is (.+)\?$/, "$1 có phải không?")
    .replace(/^Do (.+)\?$/, "$1 có không?")
    .replace(/^Who (.+)\?$/, "Ai $1?")
    .replace(/^What (.+)\?$/, "$1 là gì?")
    .replace(/^Where (.+)\?$/, "Ở đâu $1?")
    .replace(/^When (.+)\?$/, "Khi nào $1?")
    .replace(/^Why (.+)\?$/, "Tại sao $1?")
    .replace(/^Yes\./, "Có.")
    .replace(/^No\./, "Không.");

  return restore(out, tokens);
}

function main() {
  const strings = JSON.parse(readFileSync(join(root, "scripts/.services-about-strings.json"), "utf8"));
  const map = { ...EXACT };
  const batchDir = join(root, "scripts/services-about-vi-batches");
  try {
    for (const f of readdirSync(batchDir).filter((x) => x.endsWith(".json") && x !== "batch-01.json")) {
      Object.assign(map, JSON.parse(readFileSync(join(batchDir, f), "utf8")));
    }
  } catch { /* */ }

  for (const s of strings) {
    if (map[s]) continue;
    const t = autoTranslate(s);
    if (t !== s) map[s] = t;
  }

  const missing = strings.filter((s) => !map[s]);
  writeFileSync(join(root, "scripts/services-about-vi-string-map.json"), `${JSON.stringify(map, null, 2)}\n`);
  console.log(`Map: ${Object.keys(map).length}, missing: ${missing.length}`);
  if (missing.length) {
    writeFileSync(join(root, "scripts/.services-about-missing.json"), `${JSON.stringify(missing, null, 2)}\n`);
  }
}

main();
