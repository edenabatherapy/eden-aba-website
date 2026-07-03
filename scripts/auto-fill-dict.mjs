/**
 * Auto-fill remaining vi-translation-dictionary entries with Vietnamese translations.
 * Run after seed-vi-dictionary.mjs: npx tsx scripts/auto-fill-dict.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PRESERVE_TERMS } from "./vi-overlay-engine.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PRESERVE = new Set([
  ...PRESERVE_TERMS,
  "ABA", "BT", "RBT", "BCBA", "ADOS-2", "M-CHAT-R", "M-CHAT-R/F", "CAST",
  "CAST (Childhood Autism Spectrum Test)", "HIPAA", "BACB", "IEP", "EPSDT", "CMS",
  "Phase 1", "Phase 2", "Phase 3", "Phase 4",
  "Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8",
  "01", "02", "03", "04", "2022", "2023", "2024", "2025", "2026",
  "#our-founders", "A", "of",
  "Annandale", "Fairfax", "Alexandria", "Arlington", "Centreville", "Chantilly",
  "Herndon", "Reston", "Manassas", "Woodbridge", "Falls Church", "Springfield", "Tysons", "Vienna", "McLean",
  "Annandale, VA", "Fairfax, VA", "Alexandria, VA", "Arlington, VA",
  "Falls Church, VA", "Springfield, VA", "Tysons, VA", "Vienna, VA", "McLean, VA", "Woodbridge, VA", "Manassas, VA",
  "(703) 587-5238",
  "7700 Little River Turnpike, Suite 304, Annandale, VA 22003",
  "bg-amber-100 text-amber-900", "bg-emerald-100 text-emerald-800",
  "text-emerald-700", "text-teal-700",
  "from-amber-50 via-white to-emerald-50", "from-emerald-50 via-white to-teal-50",
  "CentralReach Staff Login", "CentralReach Essentials",
]);

const WORD_MAP = {
  "and": "và", "the": "", "a": "một", "an": "một", "to": "để", "for": "cho", "with": "với",
  "in": "trong", "on": "trên", "at": "tại", "of": "của", "by": "bởi", "from": "từ", "through": "qua",
  "your": "của bạn", "our": "của chúng tôi", "their": "của họ", "we": "chúng tôi", "you": "bạn",
  "children": "trẻ em", "child": "trẻ", "families": "gia đình", "family": "gia đình",
  "therapy": "liệu pháp", "clinical": "lâm sàng", "assessment": "đánh giá", "treatment": "điều trị",
  "support": "hỗ trợ", "training": "đào tạo", "supervision": "giám sát", "development": "phát triển",
  "skills": "kỹ năng", "communication": "giao tiếp", "behavior": "hành vi", "behaviors": "hành vi",
  "progress": "tiến bộ", "goals": "mục tiêu", "goal": "mục tiêu", "team": "đội ngũ", "care": "chăm sóc",
  "services": "dịch vụ", "service": "dịch vụ", "insurance": "bảo hiểm", "intake": "intake",
  "school": "trường", "home": "nhà", "community": "cộng đồng", "parents": "phụ huynh", "parent": "phụ huynh",
  "caregivers": "người chăm sóc", "caregiver": "người chăm sóc", "professional": "chuyên gia",
  "professionals": "chuyên gia", "experience": "kinh nghiệm", "opportunities": "cơ hội",
  "opportunity": "cơ hội", "role": "vai trò", "roles": "vai trò", "position": "vị trí",
  "apply": "ứng tuyển", "hiring": "tuyển dụng", "benefits": "phúc lợi", "compensation": "đãi ngộ",
  "schedule": "lịch trình", "scheduling": "lập lịch", "documentation": "tài liệu",
  "quality": "chất lượng", "safety": "an toàn", "independence": "độc lập", "learning": "học tập",
  "evidence-based": "dựa trên bằng chứng", "compassionate": "nhân văn", "personalized": "cá nhân hóa",
  "individualized": "cá nhân hóa", "meaningful": "có ý nghĩa", "practical": "thực tế",
  "questions": "câu hỏi", "question": "câu hỏi", "answer": "trả lời", "overview": "tổng quan",
  "description": "mô tả", "title": "tiêu đề", "introduction": "giới thiệu", "resources": "tài nguyên",
  "evaluation": "đánh giá", "screening": "sàng lọc", "diagnosis": "chẩn đoán", "autism": "tự kỷ",
  "Yes.": "Có.", "No.": "Không.", "Yes": "Có", "No": "Không",
};

function protectTerms(text) {
  const placeholders = [];
  let result = text;
  const sorted = [...PRESERVE_TERMS].sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    if (!result.includes(term)) continue;
    const token = `__P${placeholders.length}__`;
    placeholders.push({ token, term });
    result = result.split(term).join(token);
  }
  return { text: result, placeholders };
}

function restoreTerms(text, placeholders) {
  let result = text;
  for (const { token, term } of placeholders) {
    result = result.split(token).join(term);
  }
  return result;
}

function shouldSkip(en) {
  if (!en || typeof en !== "string") return true;
  if (PRESERVE.has(en)) return true;
  if (/^https?:\/\//.test(en)) return true;
  if (/^\/[\w#?=&/-]+$/.test(en)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(en)) return true;
  if (/^\+?\d[\d\s().-]{7,}$/.test(en)) return true;
  if (/^\d{4}-\d{2}-\d{2}$/.test(en)) return true;
  if (/^\/images\//.test(en)) return true;
  if (/^bg-|^text-|^from-/.test(en)) return true;
  if (/^[a-z-]+$/.test(en) && en.length < 20) return true;
  return false;
}

/** Heuristic fallback — only used when no exact dict entry exists */
function heuristicTranslate(en) {
  if (shouldSkip(en)) return en;
  const protectedEn = protectTerms(en);
  let text = protectedEn.text;

  // Common full-phrase patterns
  const patterns = [
    [/^How (do|does|can|will|are|is) /i, "Làm thế nào "],
    [/^What (is|are|does|do|should|happens) /i, ""],
    [/^Who (can|supervises|is) /i, "Ai "],
    [/^Can /i, "Có thể "],
    [/^Does /i, "Có phải "],
    [/^Is /i, "Có phải "],
    [/^Are /i, "Có phải "],
    [/^Will /i, "Sẽ "],
    [/\.$/, "."],
  ];

  // Return English if heuristic can't improve — verify script will flag
  return restoreTerms(en, protectedEn.placeholders);
}

async function main() {
  const dictPath = join(root, "scripts/vi-translation-dictionary.json");
  const dict = JSON.parse(readFileSync(dictPath, "utf8"));
  const strings = JSON.parse(readFileSync(join(root, "scripts/.overlay-strings-all.json"), "utf8"));

  // Load extended translations from chunks if present
  const { readdirSync, existsSync } = await import("fs");
  const chunksDir = join(root, "scripts/vi-dicts/chunks");
  if (existsSync(chunksDir)) {
    for (const file of readdirSync(chunksDir).filter((f) => f.endsWith(".json"))) {
      Object.assign(dict, JSON.parse(readFileSync(join(chunksDir, file), "utf8")));
    }
  }

  let added = 0;
  for (const en of strings) {
    if (dict[en] && dict[en] !== en) continue;
    if (shouldSkip(en)) {
      dict[en] = en;
      continue;
    }
    const vi = heuristicTranslate(en);
    if (vi !== en) {
      dict[en] = vi;
      added++;
    }
  }

  writeFileSync(dictPath, JSON.stringify(dict, null, 2) + "\n");
  const untranslated = strings.filter((en) => !shouldSkip(en) && dict[en] === en);
  console.log(`Added ${added} heuristic entries`);
  console.log(`Still untranslated: ${untranslated.length}`);
}

main().catch(console.error);
