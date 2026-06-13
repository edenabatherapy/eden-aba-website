import { readFileSync, writeFileSync } from "fs";

const screenerFaqsEn = {
  meta: {
    title: "Autism Screening & Evaluation FAQs | Eden ABA Therapy",
    description:
      "Find answers to common questions about autism screeners, autism evaluations, M-CHAT-R, CAST, ADOS-2, IDE evaluations, ABA therapy, insurance, and next steps for families.",
  },
  hero: {
    breadcrumb: ["Autism Evaluation", "FAQs"],
    badge: "Parent Resource Center",
    title: "Autism Screening & Evaluation FAQs",
    subtitle:
      "Find answers to common questions about autism signs, online screeners, diagnostic evaluations, ABA therapy, insurance, and next steps for your child.",
    findCareButton: "Find Care",
    viewLocationsButton: "View Locations",
    imageAlt: "Parent and young child engaging in a warm, play-based learning activity",
  },
  faqSection: {
    title: "FAQs About Autism Screening, Evaluation, and ABA Therapy",
    searchPlaceholder: 'Try searching: "ABA"',
    emptyState: "No FAQs found. Try removing a filter or changing your search.",
    resultsLabel: "Showing {count} FAQs",
  },
  newsletter: {
    title: "Stay Connected With Our Family Newsletter",
    intro: "Get helpful autism resources, therapy tips, family guidance, and Eden ABA updates in your inbox.",
    fields: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
    },
    typeLabel: "Newsletter sign-up type",
    types: {
      parent: "Parent / Caregiver",
      professional: "Professional / Provider",
    },
    consent:
      "By subscribing, you agree to receive emails from Eden ABA Therapy. You can unsubscribe anytime. We respect your privacy.",
    submit: "Join Family Newsletter",
    success: "Thank you for subscribing to the Eden ABA Therapy family newsletter.",
  },
  cta: {
    title: "Your Child Is Accepted Here",
    intro:
      "At Eden ABA Therapy, we provide compassionate, evidence-based ABA therapy for children with autism. Our programs are designed to help children build communication, independence, social, and daily living skills while supporting the whole family.",
    autismButton: "Learn More About Autism",
    abaButton: "What Is ABA Therapy?",
    imageAlt: "Child smiling while playing and learning in a supportive therapy setting",
  },
  linkLabels: {
    mchat: "Take the M-CHAT-R screener",
    cast: "Take the CAST screener",
    ados: "Learn about ADOS-2",
    ide: "Learn about IDE evaluations",
    insurance: "Insurance & financial assistance",
    locations: "View Eden ABA locations",
    aba: "What is ABA therapy?",
    autism: "Learn about autism",
    intake: "Get started with Eden ABA",
  },
};

const screenerFaqsVi = structuredClone(screenerFaqsEn);
screenerFaqsVi.meta = {
  title: "FAQ Sàng lọc & Đánh giá Tự kỷ | Eden ABA Therapy",
  description:
    "Tìm câu trả lời về sàng lọc tự kỷ, đánh giá, M-CHAT-R, CAST, ADOS-2, IDE, liệu pháp ABA, bảo hiểm và các bước tiếp theo cho gia đình.",
};
screenerFaqsVi.hero = {
  breadcrumb: ["Đánh giá Tự kỷ", "FAQ"],
  badge: "Trung tâm Tài nguyên Phụ huynh",
  title: "FAQ Sàng lọc & Đánh giá Tự kỷ",
  subtitle:
    "Tìm câu trả lời về dấu hiệu tự kỷ, sàng lọc trực tuyến, đánh giá chẩn đoán, liệu pháp ABA, bảo hiểm và các bước tiếp theo cho con bạn.",
  findCareButton: "Tìm Dịch vụ",
  viewLocationsButton: "Xem Cơ sở",
  imageAlt: "Phụ huynh và trẻ nhỏ tham gia hoạt động học tập ấm áp",
};
screenerFaqsVi.faqSection.title = "FAQ về Sàng lọc, Đánh giá và Liệu pháp ABA";
screenerFaqsVi.faqSection.searchPlaceholder = 'Thử tìm: "ABA"';
screenerFaqsVi.faqSection.emptyState = "Không tìm thấy FAQ. Hãy bỏ bớt bộ lọc hoặc thay đổi từ khóa tìm kiếm.";
screenerFaqsVi.newsletter.title = "Kết nối với Bản tin Gia đình";
screenerFaqsVi.newsletter.submit = "Tham gia Bản tin";
screenerFaqsVi.cta.title = "Con bạn được chào đón ở đây";
screenerFaqsVi.cta.autismButton = "Tìm hiểu về Tự kỷ";
screenerFaqsVi.cta.abaButton = "Liệu pháp ABA là gì?";

for (const [file, data] of [
  ["locales/en.json", screenerFaqsEn],
  ["locales/vi.json", screenerFaqsVi],
]) {
  const locale = JSON.parse(readFileSync(file, "utf8"));
  locale.pages["autismScreenerFaqs"] = data;
  if (locale.menu?.groups) {
    for (const group of locale.menu.groups) {
      if (group.columns) {
        for (const col of group.columns) {
          if (col.title && (col.title.includes("Screening") || col.title.includes("Sàng lọc"))) {
            col.links = [
              "M-CHAT-R Online Screener",
              "CAST Online Screener",
              "ADOS-2 Assessment",
              "IDE Evaluation",
              "Autism Screener FAQs"
            ];
          }
        }
      }
    }
  }
  writeFileSync(file, JSON.stringify(locale, null, 2) + "\n");
}

console.log("Patched autismScreenerFaqs locales and menu order");
