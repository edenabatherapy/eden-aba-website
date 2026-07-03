/**
 * Auto-translate careers English strings to Vietnamese.
 * Used by generate-vi-careers-overlays.mjs to build the string map.
 */

const PRESERVE = [
  "Eden ABA Therapy",
  "Northern Virginia",
  "Board Certified Behavior Analyst",
  "Registered Behavior Technician",
  "Behavior Technician",
  "Board Certified Assistant Behavior Analyst",
  "Behavior Analyst Certification Board",
  "Annandale",
  "Fairfax",
  "Falls Church",
  "Springfield",
  "Alexandria",
  "Arlington",
  "Tysons",
  "Vienna",
  "McLean",
  "Woodbridge",
  "Manassas",
  "BCBA",
  "RBT",
  "BT",
  "BACB",
  "BCaBA",
  "HIPAA",
  "Medicaid",
  "DBHDS",
  "ABA",
  "info@edenabatherapy.com",
  "STAR",
  "PTO",
  "CEU",
  "Virginia",
  "Mid-Atlantic",
];

const EXACT = {
  "Now Hiring in Annandale, Virginia": "Đang tuyển tại Annandale, Virginia",
  "Annandale, VA": "Annandale, VA",
  "Build a Meaningful Career in Autism Care":
    "Xây dựng sự nghiệp ý nghĩa trong chăm sóc tự kỷ",
  "Join Eden ABA Therapy and help children, families, and communities thrive through compassionate, evidence-based ABA services.":
    "Gia nhập Eden ABA Therapy và giúp trẻ em, gia đình và cộng đồng phát triển qua dịch vụ ABA nhân văn, dựa trên bằng chứng.",
  "Current Opportunities in Annandale": "Cơ hội hiện tại tại Annandale",
  "Eden ABA Therapy is actively building a team of passionate professionals committed to improving the lives of children with autism and their families.":
    "Eden ABA Therapy đang xây dựng đội ngũ chuyên gia đam mê, cam kết cải thiện cuộc sống của trẻ tự kỷ và gia đình họ.",
  "Search, filter, and explore roles across our Virginia service areas.":
    "Tìm kiếm, lọc và khám phá vai trò trên các khu vực phục vụ của chúng tôi tại Virginia.",
  "Growing Across Virginia": "Mở rộng khắp Virginia",
  "While Annandale is currently our primary service area, Eden ABA Therapy plans to expand throughout Virginia as we continue building our clinical team and supporting more families.":
    "Trong khi Annandale hiện là khu vực phục vụ chính, Eden ABA Therapy dự định mở rộng khắp Virginia khi chúng tôi tiếp tục xây dựng đội lâm sàng và hỗ trợ thêm gia đình.",
  "Don't See the Right Position?": "Không thấy vị trí phù hợp?",
  "Join our talent network and we'll reach out when a matching role becomes available in your preferred location.":
    "Gia nhập mạng lưới nhân tài của chúng tôi và chúng tôi sẽ liên hệ khi có vai trò phù hợp tại địa điểm bạn mong muốn.",
  "Submit Interest": "Gửi quan tâm",
  "Contact Recruiting": "Liên hệ Tuyển dụng",
  "Search by role, credential, department, or keyword":
    "Tìm theo vai trò, chứng chỉ, phòng ban hoặc từ khóa",
  "Clear search": "Xóa tìm kiếm",
  Showing: "Hiển thị",
  of: "trên",
  roles: "vai trò",
  "Clear all filters": "Xóa tất cả bộ lọc",
  "No roles match your filters yet.": "Chưa có vai trò nào khớp với bộ lọc của bạn.",
  "Try adjusting your search or submit your resume for future opportunities.":
    "Thử điều chỉnh tìm kiếm hoặc gửi hồ sơ cho các cơ hội trong tương lai.",
  "Clear Filters": "Xóa bộ lọc",
  "Submit Resume": "Gửi hồ sơ",
  "Apply Now": "Ứng tuyển ngay",
  "View Details": "Xem chi tiết",
  "Save Job": "Lưu việc làm",
  Saved: "Đã lưu",
  "Share Job": "Chia sẻ việc làm",
  "Job link copied.": "Đã sao chép liên kết việc làm.",
  "Saved Jobs": "Việc làm đã lưu",
  "You have not saved any roles yet.": "Bạn chưa lưu vai trò nào.",
  "Browse Open Roles": "Duyệt vị trí đang tuyển",
  "Back to Careers": "Quay lại Tuyển dụng",
  "Job Application": "Đơn ứng tuyển",
  "Submit Application": "Gửi đơn ứng tuyển",
  "Thank you for applying. Eden ABA Therapy will review your application and contact you soon.":
    "Cảm ơn bạn đã ứng tuyển. Eden ABA Therapy sẽ xem xét đơn của bạn và liên hệ sớm.",
  "You may also email your resume to": "Bạn cũng có thể gửi hồ sơ qua email đến",
  "Join talent network": "Gia nhập mạng lưới nhân tài",
  "Future growth area": "Khu vực mở rộng tương lai",
  "All Roles": "Tất cả vai trò",
  "Clinical Roles": "Vai trò lâm sàng",
  Leadership: "Lãnh đạo",
  Operations: "Vận hành",
  "Entry Level": "Cấp đầu vào",
  "Future Locations": "Địa điểm tương lai",
  "Most Relevant": "Liên quan nhất",
  Newest: "Mới nhất",
  "Job Title A-Z": "Tên việc làm A-Z",
  "Department A-Z": "Phòng ban A-Z",
  "Leadership First": "Lãnh đạo trước",
  "Entry Level First": "Cấp đầu vào trước",
  Location: "Địa điểm",
  Department: "Phòng ban",
  Employment: "Hình thức",
  Experience: "Kinh nghiệm",
  Credential: "Chứng chỉ",
  Setting: "Bối cảnh",
  Schedule: "Lịch trình",
  Status: "Trạng thái",
  "Full-Time": "Toàn thời gian",
  "Part-Time": "Bán thời gian",
  "Full-Time / Part-Time": "Toàn thời gian / Bán thời gian",
  Contract: "Hợp đồng",
  Internship: "Thực tập",
  "Mid Level": "Cấp trung",
  "Senior Level": "Cấp cao",
  "No Credential Required": "Không yêu cầu chứng chỉ",
  "RBT Preferred": "Ưu tiên RBT",
  "RBT Required": "Yêu cầu RBT",
  "BCBA Required": "Yêu cầu BCBA",
  "BCaBA Preferred": "Ưu tiên BCaBA",
  "In-Home": "Tại nhà",
  "Center-Based": "Tại trung tâm",
  "School-Based": "Tại trường",
  "Community-Based": "Trong cộng đồng",
  Hybrid: "Kết hợp",
  Morning: "Buổi sáng",
  Afternoon: "Buổi chiều",
  Evening: "Buổi tối",
  Flexible: "Linh hoạt",
  "Weekend Availability": "Có thể làm cuối tuần",
  "Now Hiring": "Đang tuyển",
  "Urgent Hiring": "Tuyển gấp",
  "Leadership Position": "Vị trí lãnh đạo",
  "Future Opening": "Cơ hội tương lai",
  "Clinical Services": "Dịch vụ lâm sàng",
  "Clinical Leadership": "Lãnh đạo lâm sàng",
  "Training & Development": "Đào tạo & Phát triển",
  "Client Experience": "Trải nghiệm khách hàng",
  Administration: "Hành chính",
  Apply: "Ứng tuyển",
  Interview: "Phỏng vấn",
  Onboarding: "Onboarding",
  "Supervised Care": "Chăm sóc có giám sát",
  "Growth Path": "Lộ trình phát triển",
  "Current hiring hub": "Trung tâm tuyển dụng hiện tại",
  "Future growth area": "Khu vực mở rộng tương lai",
  CAREERS: "TUYỂN DỤNG",
  BENEFITS: "PHÚC LỢI",
  "Find Open Roles": "Tìm Vị trí Đang tuyển",
  "Behavior Technician (BT)": "Behavior Technician (BT)",
  "Registered Behavior Technician (RBT)": "Registered Behavior Technician (RBT)",
  "Board Certified Behavior Analyst (BCBA)": "Board Certified Behavior Analyst (BCBA)",
  "Board Certified Assistant Behavior Analyst (BCaBA)":
    "Board Certified Assistant Behavior Analyst (BCaBA)",
};

const SKIP_RE = [
  /^$/,
  /^\/[\w\-./?=&%]+$/,
  /^\/images\//,
  /^https?:\/\//,
  /^[\d]{4}-\d{2}-\d{2}$/,
  /^[\d]+:[\d]+$/,
  /^[\d]+(\.[\d]+)?%?$/,
  /^[A-Z]{1,2}$/,
  /^info@/,
  /^ days$/,
  /^ hrs$/,
  /^%$/,
  /^BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA$/,
];

export function shouldSkipTranslation(value) {
  if (typeof value !== "string") return true;
  return SKIP_RE.some((re) => re.test(value));
}

function protectTerms(text) {
  const tokens = [];
  let result = text;
  PRESERVE.forEach((term, i) => {
    const token = `__P${i}__`;
    if (result.includes(term)) {
      tokens.push([token, term]);
      result = result.split(term).join(token);
    }
  });
  return { result, tokens };
}

function restoreTerms(text, tokens) {
  let result = text;
  for (const [token, term] of tokens) {
    result = result.split(token).join(term);
  }
  return result;
}

const PHRASE_RULES = [
  ["family-centered", "lấy gia đình làm trung tâm"],
  ["Family-centered", "Lấy gia đình làm trung tâm"],
  ["clinical mentorship", "cố vấn lâm sàng"],
  ["Clinical mentorship", "Cố vấn lâm sàng"],
  ["treatment integrity", "tính toàn vẹn điều trị"],
  ["Treatment integrity", "Tính toàn vẹn điều trị"],
  ["caregiver partnership", "hợp tác với người chăm sóc"],
  ["Caregiver partnership", "Hợp tác với người chăm sóc"],
  ["competitive compensation", "lương thưởng cạnh tranh"],
  ["Competitive compensation", "Lương thưởng cạnh tranh"],
  ["continuing education", "đào tạo liên tục"],
  ["Continuing education", "Đào tạo liên tục"],
  ["professional development", "phát triển chuyên môn"],
  ["Professional development", "Phát triển chuyên môn"],
  ["quality assurance", "đảm bảo chất lượng"],
  ["Quality assurance", "Đảm bảo chất lượng"],
  ["in-home", "tại nhà"],
  ["In-home", "Tại nhà"],
  ["open roles", "vị trí đang tuyển"],
  ["Open roles", "Vị trí đang tuyển"],
  ["talent network", "mạng lưới nhân tài"],
  ["Talent network", "Mạng lưới nhân tài"],
  ["hiring process", "quy trình tuyển dụng"],
  ["Hiring process", "Quy trình tuyển dụng"],
  ["growth path", "lộ trình phát triển"],
  ["Growth path", "Lộ trình phát triển"],
  ["best fit", "phù hợp nhất"],
  ["Best fit", "Phù hợp nhất"],
  ["learn more", "tìm hiểu thêm"],
  ["Learn more", "Tìm hiểu thêm"],
  ["view openings", "xem vị trí đang tuyển"],
  ["View openings", "Xem vị trí đang tuyển"],
];

export function autoTranslateCareersString(value, exactMap = {}) {
  const merged = { ...EXACT, ...exactMap };
  if (shouldSkipTranslation(value)) return value;
  if (merged[value]) return merged[value];

  const { result: protectedText, tokens } = protectTerms(value);
  let translated = protectedText;

  for (const [en, vi] of PHRASE_RULES) {
    translated = translated.replaceAll(en, vi);
  }

  translated = restoreTerms(translated, tokens);

  // If unchanged after rules, return original (verify script will flag)
  return translated === value ? value : translated;
}

export function buildStringMap(uniqueStrings, extraExact = {}) {
  const map = { ...EXACT, ...extraExact };
  for (const s of uniqueStrings) {
    if (map[s] || shouldSkipTranslation(s)) continue;
    const translated = autoTranslateCareersString(s, map);
    if (translated !== s) map[s] = translated;
  }
  return map;
}
