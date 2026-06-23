import type { Metadata } from "next";
import { getMeta, getTranslation } from "@/lib/i18n";
import { pickLocalized, type LocalizedRecord } from "@/lib/localize";

export type PageMeta = {
  title: string;
  description: string;
  keywords?: readonly string[];
};

type RouteMetaEntry = LocalizedRecord<PageMeta> & {
  path: string;
};

const ROUTE_METADATA: RouteMetaEntry[] = [
  {
    path: "/",
    en: {
      title: "Eden ABA Therapy | ABA Therapy, Autism Support & Insurance Help in Northern Virginia",
      description:
        "Eden ABA Therapy provides compassionate ABA therapy, autism support, insurance verification, intake forms, parent resources, and location support for families in Northern Virginia.",
    },
    vi: {
      title: "Eden ABA Therapy | Liệu pháp ABA, Hỗ trợ Tự kỷ & Bảo hiểm tại Bắc Virginia",
      description:
        "Eden ABA Therapy cung cấp liệu pháp ABA tận tâm, hỗ trợ tự kỷ, xác minh bảo hiểm, mẫu intake, tài nguyên phụ huynh và hỗ trợ địa điểm cho gia đình tại Bắc Virginia.",
    },
  },
  {
    path: "/aba-therapy/what-is-aba-therapy",
    en: {
      title: "What Is ABA Therapy? | Eden ABA Therapy",
      description:
        "A family-friendly guide to Applied Behavior Analysis (ABA), how it works, who can benefit, and how Eden ABA Therapy supports children with autism through individualized, evidence-based care.",
    },
    vi: {
      title: "ABA Therapy là gì? | Eden ABA Therapy",
      description:
        "Hướng dẫn thân thiện với gia đình về Phân tích Hành vi Ứng dụng (ABA), cách hoạt động, ai có thể hưởng lợi và cách Eden ABA Therapy hỗ trợ trẻ tự kỷ bằng chăm sóc cá nhân hóa, dựa trên bằng chứng.",
    },
  },
  {
    path: "/aba-therapy/parent-training",
    en: {
      title: "Parent Training & Family Support | Eden ABA Therapy",
      description:
        "Learn how Eden ABA Therapy supports families with parent training, caregiver coaching, practical home strategies, guides, and resources for meaningful progress beyond therapy sessions.",
    },
    vi: {
      title: "Đào tạo Phụ huynh & Hỗ trợ Gia đình | Eden ABA Therapy",
      description:
        "Tìm hiểu cách Eden ABA Therapy hỗ trợ gia đình qua đào tạo phụ huynh, huấn luyện người chăm sóc, chiến lược thực tế tại nhà và tài nguyên giúp trẻ tiến bộ ngoài buổi trị liệu.",
    },
  },
  {
    path: "/getting-started",
    en: {
      title: "Getting Started with Eden | Eden ABA Therapy",
      description:
        "Family resource hub for starting ABA therapy with Eden ABA Therapy—Medicaid, insurance, evaluations, provider credentials, documents, and next steps in Northern Virginia.",
    },
    vi: {
      title: "Bắt đầu với Eden | Eden ABA Therapy",
      description:
        "Trung tâm tài nguyên cho gia đình bắt đầu liệu pháp ABA với Eden ABA Therapy—Medicaid, bảo hiểm, đánh giá, chứng chỉ nhà cung cấp, hồ sơ và các bước tiếp theo tại Bắc Virginia.",
    },
  },
  {
    path: "/services/evaluations-diagnosis/screening-evaluation",
    en: {
      title: "Autism Screening & Evaluation | Eden ABA Therapy",
      description:
        "Learn about autism screening, M-CHAT-R, ADOS-2, evaluation steps, early signs of autism, and next steps for ABA therapy with Eden ABA Therapy.",
    },
    vi: {
      title: "Sàng lọc & Đánh giá Tự kỷ | Eden ABA Therapy",
      description:
        "Tìm hiểu về sàng lọc tự kỷ, M-CHAT-R, ADOS-2, các bước đánh giá, dấu hiệu sớm và các bước tiếp theo cho liệu pháp ABA với Eden ABA Therapy.",
    },
  },
  {
    path: "/services/school-based-aba-therapy",
    en: {
      title: "School-Based ABA Therapy | Eden ABA Therapy",
      description:
        "Learn how school-based ABA therapy supports communication, behavior, social skills, classroom success, IEP goals, and student independence through evidence-based interventions.",
    },
    vi: {
      title: "Liệu pháp ABA Tại trường | Eden ABA Therapy",
      description:
        "Tìm hiểu cách liệu pháp ABA tại trường hỗ trợ giao tiếp, hành vi, kỹ năng xã hội, thành công trong lớp học, mục tiêu IEP và sự tự lập của học sinh.",
    },
  },
  {
    path: "/about/our-story",
    en: {
      title: "Our Story | Eden ABA Therapy",
      description:
        "Learn about Eden ABA Therapy's mission, values, clinical approach, and commitment to helping children with autism achieve meaningful growth through evidence-based ABA therapy.",
    },
    vi: {
      title: "Câu chuyện của chúng tôi | Eden ABA Therapy",
      description:
        "Tìm hiểu sứ mệnh, giá trị, phương pháp lâm sàng và cam kết của Eden ABA Therapy trong việc giúp trẻ tự kỷ phát triển ý nghĩa qua liệu pháp ABA dựa trên bằng chứng.",
    },
  },
  {
    path: "/about/our-mission-values",
    en: {
      title: "Our Mission & Values | Eden ABA Therapy",
      description:
        "Learn about Eden ABA Therapy's mission, vision, values, and commitment to helping autistic children grow through compassionate, evidence-based ABA therapy and family-centered support.",
    },
    vi: {
      title: "Sứ mệnh & Giá trị | Eden ABA Therapy",
      description:
        "Tìm hiểu sứ mệnh, tầm nhìn, giá trị và cam kết của Eden ABA Therapy trong việc giúp trẻ tự kỷ phát triển qua liệu pháp ABA tận tâm, lấy gia đình làm trung tâm.",
    },
  },
  {
    path: "/about/our-approach",
    en: {
      title: "Our Approach | Eden ABA Therapy",
      description:
        "Explore Eden ABA Therapy's child-centered, family-focused approach to ABA therapy, including individualized treatment plans, positive reinforcement, parent collaboration, and evidence-based autism support.",
    },
    vi: {
      title: "Phương pháp của chúng tôi | Eden ABA Therapy",
      description:
        "Khám phá cách tiếp cận lấy trẻ và gia đình làm trung tâm của Eden ABA Therapy, gồm kế hoạch điều trị cá nhân hóa, củng cố tích cực, hợp tác với phụ huynh và hỗ trợ tự kỷ dựa trên bằng chứng.",
    },
  },
  {
    path: "/about/our-team",
    en: {
      title: "Our Team | Eden ABA Therapy",
      description:
        "Meet the leadership behind Eden ABA Therapy and learn about our commitment to building an exceptional team of ABA professionals dedicated to helping children and families thrive.",
    },
    vi: {
      title: "Đội ngũ của chúng tôi | Eden ABA Therapy",
      description:
        "Gặp gỡ ban lãnh đạo Eden ABA Therapy và cam kết xây dựng đội ngũ chuyên gia ABA xuất sắc, tận tâm giúp trẻ và gia đình phát triển.",
    },
  },
  {
    path: "/about/clinical-quality",
    en: {
      title: "Clinical Quality | Eden ABA Therapy",
      description:
        "Explore Eden ABA Therapy's clinical standards, BCBA-led supervision, evidence-based ABA care, quality assurance, and ethical treatment commitment for families across Virginia.",
    },
    vi: {
      title: "Chất lượng Lâm sàng | Eden ABA Therapy",
      description:
        "Khám phá tiêu chuẩn lâm sàng, giám sát BCBA, chăm sóc ABA dựa trên bằng chứng, đảm bảo chất lượng và cam kết điều trị đạo đức của Eden ABA Therapy.",
    },
  },
  {
    path: "/about/community-impact",
    en: {
      title: "Community Impact | Eden ABA Therapy",
      description:
        "Discover how Eden ABA Therapy supports Northern Virginia families through autism awareness, school partnerships, community events, advocacy, and volunteer programs.",
    },
    vi: {
      title: "Tác động Cộng đồng | Eden ABA Therapy",
      description:
        "Khám phá cách Eden ABA Therapy hỗ trợ gia đình Bắc Virginia qua nâng cao nhận thức về tự kỷ, hợp tác trường học, sự kiện cộng đồng, vận động và chương trình tình nguyện.",
    },
  },
  {
    path: "/about/contact-us",
    en: {
      title: "Contact Us | Eden ABA Therapy",
      description:
        "Contact Eden ABA Therapy for family intake, professional referrals, client support, and careers. Visit our Annandale clinic or reach us at (703) 587-5238.",
    },
    vi: {
      title: "Liên hệ | Eden ABA Therapy",
      description:
        "Liên hệ Eden ABA Therapy về intake gia đình, giới thiệu chuyên môn, hỗ trợ khách hàng và tuyển dụng. Ghé phòng khám Annandale hoặc gọi (703) 587-5238.",
    },
  },
  {
    path: "/careers",
    en: {
      title: "Careers | Eden ABA Therapy — Annandale, Virginia",
      description:
        "Explore ABA therapy careers at Eden ABA Therapy in Annandale, Virginia. Join our team of RBTs, BCBAs, clinical leaders, and support professionals.",
    },
    vi: {
      title: "Nghề nghiệp | Eden ABA Therapy — Annandale, Virginia",
      description:
        "Khám phá cơ hội nghề nghiệp liệu pháp ABA tại Eden ABA Therapy ở Annandale, Virginia. Gia nhập đội ngũ RBT, BCBA, lãnh đạo lâm sàng và chuyên viên hỗ trợ.",
    },
  },
  {
    path: "/careers/open-roles",
    en: {
      title: "Search Open Roles | Eden ABA Therapy Careers",
      description: "Search current clinical, administrative, and support job openings at Eden ABA Therapy in Northern Virginia.",
    },
    vi: {
      title: "Tìm vị trí đang tuyển | Eden ABA Therapy Careers",
      description: "Tìm các vị trí lâm sàng, hành chính và hỗ trợ đang tuyển tại Eden ABA Therapy ở Bắc Virginia.",
    },
  },
  {
    path: "/careers/behavior-technician-careers",
    en: {
      title: "Behavior Technician Careers (BT & RBT) | Eden ABA Therapy",
      description:
        "Learn about Behavior Technician (BT) and Registered Behavior Technician (RBT) careers at Eden ABA Therapy in Annandale and Northern Virginia.",
    },
    vi: {
      title: "Nghề nghiệp Kỹ thuật viên Hành vi (BT & RBT) | Eden ABA Therapy",
      description:
        "Tìm hiểu nghề nghiệp Kỹ thuật viên Hành vi (BT) và RBT tại Eden ABA Therapy ở Annandale và Bắc Virginia.",
    },
  },
  {
    path: "/careers/bcba",
    en: {
      title: "BCBA Careers | Eden ABA Therapy",
      description:
        "Explore Board Certified Behavior Analyst careers at Eden ABA Therapy. Learn about BCBA responsibilities, supervision, and open roles in Northern Virginia.",
    },
    vi: {
      title: "Nghề nghiệp BCBA | Eden ABA Therapy",
      description:
        "Khám phá nghề nghiệp BCBA tại Eden ABA Therapy. Tìm hiểu trách nhiệm, giám sát và vị trí đang tuyển ở Bắc Virginia.",
    },
  },
  {
    path: "/careers/benefits-compensation",
    en: {
      title: "Benefits & Compensation | Eden ABA Therapy Careers",
      description:
        "Explore benefits and compensation at Eden ABA Therapy—health and wellness, PTO, professional development, competitive pay, and FAQs.",
    },
    vi: {
      title: "Phúc lợi & Lương thưởng | Eden ABA Therapy Careers",
      description:
        "Khám phá phúc lợi và lương thưởng tại Eden ABA Therapy—sức khỏe, nghỉ phép, phát triển nghề nghiệp, mức lương cạnh tranh và câu hỏi thường gặp.",
    },
  },
  {
    path: "/careers/life-at-eden",
    en: {
      title: "Life at Eden | Eden ABA Therapy Careers",
      description:
        "Discover life at Eden ABA Therapy—collaborative culture, mentorship, recognition, diversity and inclusion, and community impact.",
    },
    vi: {
      title: "Cuộc sống tại Eden | Eden ABA Therapy Careers",
      description:
        "Khám phá cuộc sống tại Eden ABA Therapy—văn hóa hợp tác, cố vấn, ghi nhận, đa dạng & hòa nhập và tác động cộng đồng.",
    },
  },
  {
    path: "/careers/career-growth-pathways",
    en: {
      title: "Career Growth Pathways | Eden ABA Therapy Careers",
      description:
        "Explore Eden ABA Therapy career growth pathways from BT through BCBA—including mentorship and long-term career planning.",
    },
    vi: {
      title: "Lộ trình Phát triển Nghề nghiệp | Eden ABA Therapy Careers",
      description:
        "Khám phá lộ trình phát triển từ BT đến BCBA tại Eden ABA Therapy—gồm cố vấn và kế hoạch nghề nghiệp dài hạn.",
    },
  },
];

const ROUTE_META_MAP = new Map(ROUTE_METADATA.map((entry) => [entry.path, entry]));

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
}

export function getRouteMetadata(pathname: string, language: string): PageMeta | null {
  const path = normalizePath(pathname);
  const entry = ROUTE_META_MAP.get(path);
  if (entry) return pickLocalized(entry, language);

  const t = getTranslation(language);
  return {
    title: t.meta?.title || getMeta(language).title,
    description: t.meta?.description || getMeta(language).description,
  };
}

export function toNextMetadata(meta: PageMeta, path: string, language: string): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords ? [...meta.keywords] : undefined,
    alternates: {
      canonical: path,
      languages: {
        en: path,
        vi: path,
        "x-default": path,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: language === "vi" ? "vi_VN" : "en_US",
      alternateLocale: language === "vi" ? ["en_US"] : ["vi_VN"],
    },
  };
}
