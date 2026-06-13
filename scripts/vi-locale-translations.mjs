/** Remaining Vietnamese translations for locales/vi.json */

import {
  applyIntakeSchedulerFooter,
  applyWhatIsAutismPage,
} from "./vi-locale-translations-part2.mjs";
import { applyAbaTherapyPage } from "./vi-locale-translations-part3.mjs";

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

export function applyRemainingTranslations(vi) {
  vi.menu = [
    {
      label: "Đánh giá tự kỷ",
      type: "evaluation",
      highlightTitle: "Đánh giá tự kỷ",
      highlightText:
        "Sàng lọc và hỗ trợ đánh giá tự kỷ sớm cho gia đình tại Bắc Virginia.",
      columns: [
        {
          title: "Công cụ sàng lọc trực tuyến",
          links: [
            "Công cụ sàng lọc M-CHAT-R trực tuyến",
            "Công cụ sàng lọc CAST trực tuyến",
          ],
        },
        {
          title: "Hỗ trợ đánh giá",
          links: [
            "Đánh giá ADOS-2",
            "Hướng dẫn chẩn đoán",
            "Tư vấn phụ huynh",
            "Hỗ trợ bảo hiểm",
          ],
        },
      ],
    },
    {
      label: "Liệu pháp ABA",
      type: "simple",
      columns: [
        {
          title: "Liệu pháp ABA",
          links: [
            "ABA tại nhà",
            "ABA tại phòng khám",
            "Đào tạo phụ huynh",
            "Hỗ trợ trường học",
          ],
        },
        {
          title: "Tài nguyên gia đình",
          links: [
            "Tự kỷ là gì?",
            "Liệu pháp ABA là gì?",
            "Phạm vi bảo hiểm",
            "Thông tin tiếp nhận",
          ],
        },
      ],
    },
    {
      label: "Địa điểm",
      type: "locations",
      columns: [
        {
          title: "Địa điểm Eden",
          links: [
            "Fairfax",
            "Centreville",
            "Chantilly",
            "Reston",
            "Herndon",
          ],
        },
        {
          title: "Khu vực khác",
          links: [
            "Alexandria",
            "Arlington",
            "Manassas",
            "Woodbridge",
            "Xem tất cả địa điểm",
          ],
        },
      ],
    },
    {
      label: "Tài nguyên",
      type: "simple",
      columns: [
        {
          title: "Tài nguyên gia đình",
          links: [
            "ABA là gì?",
            "Hướng dẫn người chăm sóc",
            "Blog",
            "Câu hỏi thường gặp",
          ],
        },
        {
          title: "Hỗ trợ",
          links: [
            "Phạm vi bảo hiểm",
            "Đào tạo phụ huynh",
            "Thông tin tiếp nhận",
            "Thực hành quyền riêng tư",
          ],
        },
      ],
    },
    {
      label: "Về Eden",
      type: "compact",
      columns: [
        {
          title: "Về Eden",
          links: [
            "Câu chuyện của chúng tôi",
            "Đội ngũ",
            "Chất lượng lâm sàng",
            "Về chúng tôi",
            "Liên hệ",
          ],
        },
      ],
    },
    {
      label: "Tuyển dụng",
      type: "compact",
      columns: [
        {
          title: "Tuyển dụng",
          links: [
            "Tìm vị trí đang tuyển",
            "Nghề nghiệp RBT",
            "Nghề nghiệp BCBA",
            "Hướng dẫn phỏng vấn",
            "Tài nguyên nghề nghiệp",
          ],
        },
      ],
    },
  ];

  vi.jobs = [
    {
      role: "Kỹ thuật viên Hành vi Đăng ký (RBT)",
      type: "Toàn thời gian / Bán thời gian",
      location: "Fairfax, VA",
      dept: "Lâm sàng",
    },
    {
      role: "Nhà phân tích Hành vi được Chứng nhận (BCBA)",
      type: "Toàn thời gian",
      location: "Bắc Virginia",
      dept: "Lâm sàng",
    },
    {
      role: "Điều phối viên Intake",
      type: "Toàn thời gian",
      location: "Làm việc kết hợp",
      dept: "Vận hành",
    },
    {
      role: "Giám sát viên Lâm sàng",
      type: "Toàn thời gian",
      location: "Fairfax, VA",
      dept: "Lãnh đạo",
    },
  ];

  vi.serviceData = [
    {
      tag: "Nhà",
      title: "Liệu pháp ABA tại nhà",
      age: "2–18",
      text: "Hỗ trợ trong môi trường hằng ngày của trẻ với huấn luyện người chăm sóc và khái quát hóa kỹ năng.",
      features: [
        "Thói quen hằng ngày",
        "Giao tiếp",
        "Giảm hành vi",
        "Đào tạo gia đình",
      ],
    },
    {
      tag: "Phòng khám",
      title: "ABA tại phòng khám",
      age: "2–12",
      text: "Môi trường học tập có cấu trúc cho sẵn sàng đi học, kỹ năng xã hội và điều trị chuyên sâu.",
      features: [
        "Buổi 1:1",
        "Thực hành với bạn đồng trang lứa",
        "Giám sát BCBA",
        "Xem xét tiến bộ",
      ],
    },
    {
      tag: "Trường học",
      title: "Phối hợp trường học",
      age: "3–18",
      text: "Phối hợp với giáo viên và đội ngũ để hỗ trợ mục tiêu tại trường và cộng đồng.",
      features: [
        "Hỗ trợ IEP",
        "Chuyển tiếp",
        "Mục tiêu lớp học",
        "Phối hợp giáo viên",
      ],
    },
    {
      tag: "Gia đình",
      title: "Đào tạo phụ huynh",
      age: "Tất cả",
      text: "Huấn luyện thực tế để người chăm sóc phản hồi tự tin và duy trì tiến bộ tại nhà.",
      features: [
        "Mục tiêu người chăm sóc",
        "Kế hoạch tại nhà",
        "Phòng ngừa khủng hoảng",
        "Nhất quán",
      ],
    },
  ];

  vi.intakeSteps = [
    { title: "Yêu cầu gia đình", status: "Biểu mẫu bảo mật" },
    { title: "Kiểm tra bảo hiểm", status: "Xem xét quyền lợi" },
    { title: "Đồng ý & Tải lên", status: "Tài liệu" },
    { title: "Intake lâm sàng", status: "Tiền sử chăm sóc" },
    { title: "Đánh giá", status: "Xem xét BCBA" },
    { title: "Bắt đầu trị liệu", status: "Chăm sóc bắt đầu" },
  ];

  const dayVi = {
    Monday: "Thứ Hai",
    Tuesday: "Thứ Ba",
    Wednesday: "Thứ Tư",
    Thursday: "Thứ Năm",
    Friday: "Thứ Sáu",
    Saturday: "Thứ Bảy",
    Sunday: "Chủ Nhật",
    Closed: "Đóng cửa",
  };

  function translateHours(hours) {
    return hours.map(([day, time]) => [
      dayVi[day] || day,
      time === "Closed" ? dayVi.Closed : time,
    ]);
  }

  vi.edenLocations = vi.edenLocations.map((loc, i) => {
    if (i === 0) {
      return {
        ...loc,
        name: "Eden ABA Therapy - Annandale",
        hours: translateHours(loc.hours),
      };
    }
    const city = loc.city;
    return {
      ...loc,
      name: loc.name,
      address: `Phục vụ ${city}, Virginia`,
    };
  });

  vi.edenBusinessInfo = {
    ...vi.edenBusinessInfo,
    hours: translateHours(vi.edenBusinessInfo.hours),
  };

  vi.hero = {
    animatedWords: ["phát triển", "mỉm cười", "đạt được", "kết nối", "thăng hoa"],
    line1: "Con đường tươi sáng cho trẻ em",
    line2: "lớn lên, học hỏi và",
    line3Prefix: "",
    subtitle:
      "Eden ABA Therapy cung cấp hỗ trợ ABA ấm áp, lấy gia đình làm trung tâm, với sự chăm sóc tận tâm, hướng dẫn rõ ràng và trải nghiệm trị liệu thân thiện với trẻ.",
  };

  applyPagesTranslations(vi);
  applyInsuranceFormTranslations(vi);
}

function applyInsuranceFormTranslations(vi) {
  vi.insuranceForm = {
    secureEyebrow: "Yêu cầu bảo hiểm bảo mật",
    title: "Chuẩn bị cho tương lai tươi sáng với liệu pháp ABA",
    intro:
      "Hoàn tất biểu mẫu bảo mật bên dưới và đội ngũ của chúng tôi sẽ liên hệ về quyền lợi bảo hiểm và các bước tiếp theo.",
    placeholders: {
      parentFirstName: "Tên phụ huynh/người giám hộ *",
      parentLastName: "Họ phụ huynh/người giám hộ *",
      email: "Email *",
      phone: "Số điện thoại *",
      childFullName: "Họ tên đầy đủ của trẻ *",
      childDob: "Ngày sinh của trẻ MM/DD/YYYY *",
      zipCode: "Mã ZIP *",
      insuranceProvider: "Nhà cung cấp bảo hiểm *",
      medicaidIdRequired: "Mã Medicaid *",
      medicaidIdOptional: "Mã Medicaid, nếu có",
    },
    insuranceOptions: [
      "Virginia Medicaid / Cardinal Care",
      "Bảo hiểm tư nhân",
      "TRICARE",
      "Khác",
    ],
    ssnNotice:
      "SSN không được thu thập tại đây. Chỉ thêm SSN nếu được pháp luật và tuân thủ cho phép.",
    consent:
      "Tôi đồng ý được Eden ABA Therapy liên hệ về xác minh bảo hiểm và dịch vụ.",
    errors: {
      incomplete: "Vui lòng hoàn tất tất cả trường bắt buộc trước khi gửi.",
      submitFailed: "Không thể gửi yêu cầu bảo hiểm.",
      submitRetry: "Không thể gửi yêu cầu bảo hiểm. Vui lòng thử lại.",
    },
    submitLoading: "Đang gửi yêu cầu bảo hiểm của bạn...",
    submitButton: "Gửi yêu cầu bảo hiểm",
    successMessage:
      "Yêu cầu bảo hiểm đã được gửi. Eden ABA Therapy sẽ xem xét quyền lợi và phạm vi bảo hiểm một cách bảo mật.",
    scheduleAppointment: "Đặt lịch hẹn",
    returnHome: "Về trang chủ",
  };
}

function applyPagesTranslations(vi) {
  deepMerge(vi.pages, {
    autismAwareness: {
      title: "Bộ đếm Nhận thức về Tự kỷ",
      cdcBadge: "Ước tính CDC: 1 trong 31 trẻ được xác định có tự kỷ",
      intro:
        "Ước tính giáo dục trực tiếp được tạo ra để thúc đẩy nhận thức về tự kỷ, hỗ trợ sớm và chăm sóc tận tâm cho trẻ em và gia đình.",
      tagline: "Eden ABA Therapy | Nhận thức, Hướng dẫn và Hỗ trợ Lấy gia đình làm trung tâm",
      currentTimePrefix: "Thời gian hiện tại:",
      stats: {
        birthsToday: {
          label: "Trẻ sinh ra tại Mỹ hôm nay",
          note: "Ước tính số đếm trực tiếp từ nửa đêm",
        },
        prevalence: {
          label: "Tỷ lệ mắc tự kỷ ước tính trong tương lai",
          note: "Dựa trên ước tính tỷ lệ 1 trong 31",
        },
        birthsPerMinute: {
          label: "Ước tính số sinh trong phút này",
          value: "7",
          note: "Trung bình quốc gia xấp xỉ mỗi phút",
        },
        earlySupport: {
          label: "Hỗ trợ sớm có thể cải thiện",
          value: "Tiến bộ có ý nghĩa",
          items: [
            "Giao tiếp",
            "Kỹ năng sinh hoạt hằng ngày",
            "Tương tác xã hội",
            "Thói quen gia đình",
          ],
        },
      },
      dayProgress: "Tiến độ trong ngày",
      dayProgressSuffix: "% ngày đã hoàn thành",
      factTitle: "Sự thật về Nhận thức Tự kỷ",
      factText:
        "Nhận thức về tự kỷ giúp giảm kỳ thị và thúc đẩy hòa nhập tại trường học và cộng đồng.",
      imageAlts: {
        childActivity: "Trẻ tham gia hoạt động trị liệu",
        therapistSupport: "Nhà trị liệu hỗ trợ trẻ",
      },
    },
    insurancePayment: {
      eyebrow: "Hỗ trợ bảo hiểm",
      title: "Chi trả liệu pháp ABA không nhất thiết phải căng thẳng.",
      intro:
        "Là phụ huynh, bạn phải đảm nhận rất nhiều việc. Hãy để Eden ABA Therapy giúp bạn điều hướng khía cạnh tài chính của việc chăm sóc con. Hầu hết các gói bảo hiểm lớn có thể chi trả liệu pháp ABA, và đội ngũ của chúng tôi có thể giúp xác minh quyền lợi, giải thích phạm vi bảo hiểm và phối hợp chi tiết bảo hiểm thay mặt bạn.",
      providersHeading: "Chúng tôi có thể giúp xem xét các nhà cung cấp bảo hiểm lớn, bao gồm:",
      providers: [
        "Aetna",
        "Anthem",
        "Blue Cross Blue Shield",
        "Optum",
        "UMR",
        "UnitedHealthcare",
        "Cigna",
        "Virginia Medicaid",
        "Thêm",
      ],
      verifyInsurance: "Xác minh bảo hiểm",
      contactLearnMore: "Liên hệ để tìm hiểu thêm",
      sidebarTitle: "Hỗ trợ bảo hiểm cho gia đình Virginia",
      sidebarItems: [
        "Xem xét quyền lợi",
        "Hướng dẫn khấu trừ, đồng thanh toán và đồng chi trả",
        "Hỗ trợ ủy quyền trước",
        "Giải thích trong mạng và ngoài mạng",
        "Lập kế hoạch bước tiếp theo rõ ràng",
      ],
    },
    parentResources: {
      eyebrow: "Tài nguyên phụ huynh",
      title: "Tài nguyên tự kỷ và hỗ trợ sàng lọc cho gia đình",
      intro:
        "Công cụ hữu ích cho gia đình tìm hiểu hỗ trợ tự kỷ, liệu pháp ABA, phạm vi bảo hiểm và quy trình intake.",
      cards: [
        [
          "Công cụ sàng lọc tự kỷ",
          "Lộ trình sàng lọc M-CHAT-R và CAST thân thiện với phụ huynh cho câu hỏi sớm và bước tiếp theo.",
        ],
        [
          "Hướng dẫn người chăm sóc",
          "Hướng dẫn đơn giản về thói quen, giao tiếp, hỗ trợ hành vi, bảo hiểm và chuẩn bị tài liệu.",
        ],
        [
          "Xác minh bảo hiểm",
          "Quy trình rõ ràng để kiểm tra quyền lợi, ủy quyền và tài liệu cần thiết trước khi bắt đầu ABA.",
        ],
        [
          "Hỗ trợ phụ huynh",
          "Trò chuyện trực tiếp, yêu cầu lịch hẹn và hướng dẫn intake để gia đình biết phải làm gì tiếp theo.",
        ],
      ],
      cta: "Bắt đầu với mẫu intake",
    },
    clientReviews: {
      badge: "Phản hồi mẫu từ gia đình",
      title: "Gia đình tin tưởng Eden ABA Therapy",
      intro:
        "Trải nghiệm tích cực từ các gia đình đánh giá cao hỗ trợ ABA tận tâm và cá nhân hóa.",
      reviews: [
        "Eden ABA Therapy giúp quy trình intake đơn giản và hỗ trợ.",
        "Đội ngũ giúp chúng tôi cảm thấy được thấu hiểu ngay từ cuộc gọi đầu tiên.",
        "Con chúng tôi đang xây dựng kỹ năng giao tiếp với nhiều tự tin hơn.",
        "Hướng dẫn dành cho phụ huynh đã giúp thói quen tại nhà của chúng tôi.",
        "Chúng tôi cảm thấy được tôn trọng, lắng nghe và hỗ trợ trong suốt quá trình.",
        "Các nhà trị liệu kiên nhẫn, tử tế và thực sự lấy trẻ làm trung tâm.",
        "Eden giúp chúng tôi hiểu ABA một cách rõ ràng.",
        "Gia đình chúng tôi nhận thấy tiến bộ có ý nghĩa trong kỹ năng sinh hoạt hằng ngày.",
        "Đội chăm sóc giải thích từng bước với sự tận tâm.",
        "Lên lịch và giao tiếp đều dễ dàng và chuyên nghiệp.",
        "Con chúng tôi mong chờ được học cùng đội trị liệu.",
        "Chúng tôi đánh giá cao sự tập trung vào mục tiêu gia đình và tiến bộ thực tế.",
        "Đội ngũ giúp bảo hiểm và các bước tiếp theo bớt căng thẳng.",
        "Eden ABA Therapy mang lại cảm giác ấm áp, có tổ chức và đáng tin cậy.",
        "Hỗ trợ đã giúp con chúng tôi với tương tác xã hội.",
        "Chúng tôi yêu cách đội ngũ ăn mừng những chiến thắng nhỏ.",
        "Phương pháp điều trị cảm thấy được cá nhân hóa cho con chúng tôi.",
        "Đào tạo phụ huynh giúp chúng tôi tự tin hơn tại nhà.",
        "Đội ngũ phản hồi nhanh, quan tâm và chuyên nghiệp.",
        "Chúng tôi biết ơn sự hướng dẫn và khích lệ.",
        "Con chúng tôi đang học các kỹ năng quan trọng theo cách tích cực.",
        "Nhân viên giúp chúng tôi thoải mái khi đặt câu hỏi.",
        "Cách tiếp cận của Eden cảm thấy tận tâm và lấy gia đình làm trung tâm.",
        "Chúng tôi được hỗ trợ từ đánh giá đến lập kế hoạch chăm sóc.",
      ],
      cardLabels: [
        "Phản hồi mẫu từ gia đình",
        "Điểm nổi bật trải nghiệm phụ huynh",
        "Trải nghiệm chăm sóc",
        "Phản hồi gia đình",
      ],
      parentReview: "Đánh giá phụ huynh",
      startABA: "Bắt đầu liệu pháp ABA",
      verifyInsurance: "Xác minh bảo hiểm",
    },
  });

  applyAboutAndAssessmentPages(vi);
  applyMchatPages(vi);
  applyInsurancePage(vi);
  applyIntakeSchedulerFooter(vi);
  applyWhatIsAutismPage(vi);
  applyAbaTherapyPage(vi);
}

function applyAboutAndAssessmentPages(vi) {
  deepMerge(vi.pages, {
    aboutEden: {
      eyebrow: "Về Eden ABA Therapy",
      title: "Về Eden ABA Therapy",
      subtitle: "Chăm sóc tự kỷ tận tâm được thiết kế xoay quanh từng trẻ và gia đình.",
      heroIntro:
        "Tại Eden ABA Therapy, chúng tôi tin rằng mọi trẻ đều xứng đáng được hỗ trợ cá nhân, tôn trọng và đầy hy vọng. Đội ngũ cung cấp dịch vụ liệu pháp ABA cá nhân hóa giúp trẻ xây dựng kỹ năng có ý nghĩa tại nhà, phòng khám và cuộc sống hằng ngày.",
      startABA: "Bắt đầu liệu pháp ABA",
      findCare: "Tìm liệu pháp ABA gần tôi",
      heroImageAlt: "Nhà trị liệu hỗ trợ trẻ trong buổi trị liệu",
      whoWeAre: {
        eyebrow: "Chúng tôi là ai",
        title: "Chúng tôi là ai",
        text: "Eden ABA Therapy cung cấp dịch vụ phân tích hành vi ứng dụng cho trẻ tự kỷ và nhu cầu phát triển. Cách tiếp cận kết hợp chất lượng lâm sàng, đối tác gia đình và chăm sóc tận tâm. Mỗi kế hoạch điều trị được xây dựng xoay quanh điểm mạnh, mục tiêu, phong cách giao tiếp và thói quen hằng ngày của trẻ.",
      },
      mission: {
        title: "Sứ mệnh của chúng tôi",
        cards: [
          [
            "Chăm sóc tận tâm",
            "Chúng tôi tạo môi trường hỗ trợ nơi trẻ cảm thấy an toàn, được khích lệ và được thấu hiểu.",
          ],
          [
            "ABA dựa trên bằng chứng",
            "Trị liệu được hướng dẫn bởi dữ liệu, mục tiêu cá nhân hóa và chiến lược ABA đã được chứng minh hỗ trợ tiến bộ thực tế.",
          ],
          [
            "Đối tác gia đình",
            "Chúng tôi làm việc chặt chẽ với phụ huynh và người chăm sóc để tiến bộ tiếp tục ngoài buổi trị liệu.",
          ],
        ],
      },
      different: {
        title: "Điều gì làm Eden khác biệt?",
        text: "Eden ABA Therapy khác biệt vì chúng tôi tập trung vào toàn bộ đứa trẻ, không chỉ chẩn đoán. Chúng tôi xem xét giao tiếp, độc lập, hành vi, thói quen hằng ngày, vui chơi, kỹ năng xã hội và mục tiêu gia đình cùng nhau. Đội ngũ theo dõi tiến bộ đo lường được trong khi giữ chăm sóc ấm áp, linh hoạt và nhân văn.",
        imageAlt: "Trẻ và nhà trị liệu học cùng nhau",
        bullets: [
          "Kế hoạch điều trị cá nhân hóa",
          "Đào tạo phụ huynh và hỗ trợ người chăm sóc",
          "Xây dựng kỹ năng cho cuộc sống hằng ngày",
          "Hỗ trợ giao tiếp và phát triển xã hội",
          "Quyết định lâm sàng dựa trên dữ liệu",
          "Trị liệu tôn trọng, lấy trẻ làm trung tâm",
        ],
      },
      approach: {
        title: "Cách tiếp cận chăm sóc",
        cards: [
          [
            "Đánh giá & Lập kế hoạch mục tiêu",
            "Chúng tôi tìm hiểu điểm mạnh, thói quen và mục tiêu của từng trẻ trước khi tạo kế hoạch.",
          ],
          [
            "Liệu pháp ABA một-một",
            "Buổi trị liệu cá nhân hóa tập trung giao tiếp, hành vi, độc lập, kỹ năng xã hội và phát triển sinh hoạt hằng ngày.",
          ],
          [
            "Hỗ trợ phụ huynh",
            "Gia đình nhận huấn luyện thực tế và công cụ để củng cố tiến bộ tại nhà và cộng đồng.",
          ],
          [
            "Theo dõi tiến bộ",
            "Đội ngũ xem xét dữ liệu, ăn mừng tiến bộ và điều chỉnh chiến lược để hỗ trợ tăng trưởng liên tục.",
          ],
        ],
      },
      whoWeServe: {
        title: "Chúng tôi phục vụ ai",
        intro:
          "Eden ABA Therapy hỗ trợ trẻ tự kỷ và chậm phát triển cần giúp đỡ về giao tiếp, hành vi, tương tác xã hội, kỹ năng vui chơi, thói quen hằng ngày, sẵn sàng đi học và độc lập.",
        cards: [
          [
            "Trẻ học sớm",
            "Giúp trẻ nhỏ xây dựng nền tảng giao tiếp, vui chơi và kỹ năng học tập.",
          ],
          [
            "Trẻ độ tuổi đi học",
            "Hỗ trợ phát triển xã hội, hành vi, độc lập và sẵn sàng đi học.",
          ],
          [
            "Gia đình tìm hỗ trợ tự kỷ",
            "Cung cấp hướng dẫn, giáo dục và đối tác trong hành trình chăm sóc.",
          ],
        ],
      },
      quality: {
        title: "Cam kết chất lượng chăm sóc ABA",
        text: "Đội ngũ cam kết liệu pháp ABA đạo đức, tôn trọng và có hướng dẫn lâm sàng. Chúng tôi dùng dữ liệu tiến bộ để hiểu điều gì hiệu quả, điều chỉnh điều trị khi cần và ăn mừng mỗi bước tiến có ý nghĩa.",
      },
      cta: {
        title: "Sẵn sàng tìm hiểu thêm về Eden ABA Therapy?",
        text: "Đội ngũ sẵn sàng hướng dẫn gia đình bạn qua bước tiếp theo với sự chăm sóc, rõ ràng và tận tâm.",
        startABA: "Bắt đầu liệu pháp ABA",
        contactEden: "Liên hệ Eden ABA",
        findLocation: "Tìm địa điểm",
      },
    },
    autismAssessment: {
      eyebrow: "Hỗ trợ đánh giá tự kỷ",
      title: "Lên lịch đánh giá tự kỷ gần bạn",
      intro:
        "Eden ABA Therapy có thể giúp gia đình hiểu các bước tiếp theo cho đánh giá tự kỷ và dịch vụ ABA. Đội ngũ cung cấp hướng dẫn thân thiện với phụ huynh, hỗ trợ sàng lọc, phối hợp intake và xem xét bảo hiểm để gia đình biết cần chuẩn bị gì trước khi bắt đầu chăm sóc.",
      getDiagnosticSupport: "Nhận hỗ trợ chẩn đoán",
      takeMchat: "Làm M-CHAT-R",
      exploreCast: "Khám phá công cụ sàng lọc CAST",
      heroImageAlt: "Trẻ tham gia hoạt động phát triển hỗ trợ",
      howItWorks: {
        eyebrow: "Cách hoạt động",
        title: "Lộ trình rõ ràng từ câu hỏi đến bước tiếp theo",
        steps: [
          [
            "Chia sẻ mối quan tâm",
            "Cho chúng tôi biết về giao tiếp, tương tác xã hội, vui chơi, hành vi và câu hỏi phát triển của con bạn.",
          ],
          [
            "Xem xét tài liệu hữu ích",
            "Nếu có, hãy thu thập báo cáo đánh giá, tài liệu trường học, ghi chú nhi khoa hoặc thông tin trị liệu trước đó.",
          ],
          [
            "Lên lịch hỗ trợ đánh giá",
            "Đội ngũ có thể giúp phối hợp bước phù hợp tiếp theo cho đánh giá tự kỷ hoặc dịch vụ ABA.",
          ],
          [
            "Lập kế hoạch bước tiếp theo",
            "Gia đình nhận hướng dẫn rõ ràng về sàng lọc, hỗ trợ chẩn đoán, xem xét bảo hiểm và lựa chọn dịch vụ.",
          ],
        ],
      },
      ages: {
        title: "Hỗ trợ cho các độ tuổi và nhu cầu khác nhau",
        intro:
          "Sàng lọc và lập kế hoạch đánh giá tự kỷ nên phù hợp với tuổi, tiền sử phát triển, triệu chứng và mối quan tâm của gia đình. Công cụ sàng lọc có thể hữu ích nhưng không chẩn đoán tự kỷ. Gia đình nên trao đổi với bác sĩ nhi hoặc chuyên gia có đủ năng lực khi mối quan tâm tiếp tục.",
        cards: [
          [
            "Dành cho trẻ nhỏ",
            "Gia đình có trẻ nhỏ hơn có thể bắt đầu với công cụ sàng lọc M-CHAT-R do phụ huynh hoàn thành rồi thảo luận kết quả với chuyên gia có đủ năng lực.",
          ],
          [
            "Dành cho trẻ lớn hơn",
            "Trẻ lớn hơn có thể cần công cụ sàng lọc khác, xem xét tài liệu trường học hoặc hướng dẫn chẩn đoán chuyên môn.",
          ],
          [
            "Hướng dẫn bảo hiểm",
            "Eden ABA Therapy có thể giúp gia đình hiểu tài liệu nào có thể hữu ích cho xem xét quyền lợi và bước ủy quyền.",
          ],
        ],
      },
      cta: {
        title: "Sẵn sàng nhận hướng dẫn đánh giá?",
        text: "Chia sẻ câu hỏi của gia đình và đội ngũ sẽ giúp bạn hiểu bước tiếp theo cho đánh giá tự kỷ, liệu pháp ABA, tài liệu và xem xét bảo hiểm.",
        getDiagnosticSupport: "Nhận hỗ trợ chẩn đoán",
        startMchat: "Bắt đầu M-CHAT-R",
      },
    },
    mchatScreener: {
      breadcrumb: "Công cụ sàng lọc › M-CHAT-R",
      title: "Công cụ sàng lọc tự kỷ M-CHAT-R trực tuyến",
      intro:
        "Công cụ sàng lọc thân thiện với phụ huynh giúp xác định các mẫu phát triển có thể cần theo dõi thêm. M-CHAT-R thường được dùng cho trẻ khoảng 16–30 tháng và có thể giúp gia đình quyết định có nên thảo luận mối quan tâm với bác sĩ nhi hoặc chuyên gia có đủ năng lực.",
      importantPrefix: "Quan trọng:",
      importantText:
        "M-CHAT-R chỉ là công cụ sàng lọc. Nó không chẩn đoán tự kỷ hay bất kỳ tình trạng y khoa nào.",
      startScreener: "Bắt đầu sàng lọc M-CHAT-R",
      learnScoring: "Tìm hiểu cách chấm điểm",
      heroImageAlt: "Phụ huynh và trẻ hoàn thành hoạt động sàng lọc phát triển",
      scoring: {
        eyebrow: "Chấm điểm",
        title: "Hiểu các khoảng điểm",
        intro:
          "Mỗi câu trả lời khớp với phản hồi rủi ro được tính một điểm. Tổng điểm từ 0 đến 20 nhằm hướng dẫn theo dõi, không phải đưa ra chẩn đoán.",
        ranges: [
          [
            "0–2",
            "Mức quan tâm thấp",
            "Tiếp tục theo dõi phát triển và trao đổi với bác sĩ nhi nếu mối quan tâm tiếp tục.",
          ],
          [
            "3–7",
            "Mức quan tâm trung bình",
            "Thảo luận kết quả với bác sĩ nhi hoặc chuyên gia phát triển có đủ năng lực.",
          ],
          [
            "8–20",
            "Mức quan tâm cao",
            "Khuyến nghị đánh giá phát triển chuyên môn.",
          ],
        ],
      },
      faqTitle: "Câu hỏi thường gặp",
      faqs: [
        [
          "Mục đích của M-CHAT-R là gì?",
          "M-CHAT-R giúp gia đình xác định các mẫu phát triển có thể cần theo dõi thêm. Nó có thể hỗ trợ cuộc trò chuyện với bác sĩ nhi hoặc chuyên gia có đủ năng lực.",
        ],
        [
          "M-CHAT-R có phải chẩn đoán không?",
          "Không. M-CHAT-R là công cụ sàng lọc, không phải đánh giá chẩn đoán. Điểm số không thể xác nhận hay loại trừ tự kỷ.",
        ],
        [
          "Dùng cho độ tuổi nào?",
          "Thường dùng cho trẻ khoảng 16 đến 30 tháng. Trẻ ngoài khoảng tuổi này có thể cần lộ trình sàng lọc khác.",
        ],
        [
          "Tôi nên làm gì sau điểm cao?",
          "Điểm cao hơn có nghĩa khuyến nghị theo dõi chuyên môn. Hãy trao đổi với bác sĩ nhi hoặc chuyên gia phát triển có đủ năng lực của con bạn.",
        ],
        [
          "Tôi có thể làm lại không?",
          "Có. Gia đình có thể sàng lọc lại sau nếu mối quan tâm thay đổi hoặc bác sĩ khuyên làm vậy.",
        ],
        [
          "Tôi có nên nói chuyện với bác sĩ nhi không?",
          "Có. Nếu bạn lo ngại về giao tiếp, vui chơi, tương tác xã hội, hành vi hoặc phát triển, hãy trao đổi với bác sĩ nhi.",
        ],
      ],
      disclaimerTitle: "Tuyên bố miễn trừ y khoa",
      disclaimerText:
        "M-CHAT-R chỉ là công cụ sàng lọc. Nó không chẩn đoán tự kỷ hay bất kỳ tình trạng y khoa nào. Kết quả nên được xem xét với bác sĩ nhi hoặc chuyên gia có đủ năng lực.",
      startABA: "Bắt đầu liệu pháp ABA",
      exploreCast: "Khám phá công cụ sàng lọc CAST",
    },
  });
}

function applyMchatPages(vi) {
  const mchatQuestionsVi = [
    [1, "Nếu bạn chỉ vào vật gì đó ở xa trong phòng, con bạn có nhìn theo không?", "Không"],
    [2, "Bạn có từng tự hỏi liệu con mình có thể bị điếc không?", "Có"],
    [3, "Con bạn có chơi giả vờ hoặc tưởng tượng không?", "Không"],
    [4, "Con bạn có thích leo trèo lên đồ vật không?", "Không"],
    [5, "Con bạn có làm cử động ngón tay bất thường gần mắt không?", "Có"],
    [6, "Con bạn có chỉ bằng một ngón tay để xin thứ gì đó hoặc nhờ giúp không?", "Không"],
    [7, "Con bạn có chỉ bằng một ngón tay để cho bạn xem điều thú vị không?", "Không"],
    [8, "Con bạn có quan tâm đến trẻ khác không?", "Không"],
    [9, "Con bạn có cho bạn xem đồ vật bằng cách mang đến hoặc giơ lên không?", "Không"],
    [10, "Con bạn có phản hồi khi bạn gọi tên không?", "Không"],
    [11, "Khi bạn mỉm cười với con, con có mỉm cười lại không?", "Không"],
    [12, "Con bạn có khó chịu vì tiếng ồn hằng ngày không?", "Có"],
    [13, "Con bạn có đi bộ không?", "Không"],
    [14, "Con bạn có nhìn mắt bạn khi nói chuyện, chơi hoặc giúp con không?", "Không"],
    [15, "Con bạn có cố bắt chước những gì bạn làm không?", "Không"],
    [16, "Nếu bạn quay đầu nhìn vật gì đó, con bạn có nhìn theo xem bạn đang nhìn gì không?", "Không"],
    [17, "Con bạn có cố để bạn xem con không?", "Không"],
    [18, "Con bạn có hiểu khi bạn bảo con làm gì đó không?", "Không"],
    [19, "Khi có điều mới xảy ra, con bạn có nhìn mặt bạn để xem bạn cảm thấy thế nào không?", "Không"],
    [20, "Con bạn có thích các hoạt động vận động không?", "Không"],
  ];

  deepMerge(vi.pages, {
    mchatQuestionnaire: {
      questions: mchatQuestionsVi,
      followUpAreas: [
        "Chú ý chung và chỉ tay",
        "Tương tác xã hội và phản hồi",
        "Vui chơi giả vờ, bắt chước và sẵn sàng học",
        "Phản ứng cảm giác và hành vi lặp lại",
        "Vận động và tham gia vận động",
      ],
      disclaimer:
        "M-CHAT-R chỉ là công cụ sàng lọc. Nó không chẩn đoán tự kỷ hay bất kỳ tình trạng y khoa nào. Kết quả nên được xem xét với bác sĩ nhi hoặc chuyên gia có đủ năng lực.",
      results: {
        lower: [
          "Mức quan tâm thấp",
          "Câu trả lời của bạn thuộc khoảng quan tâm thấp. Tiếp tục theo dõi phát triển và trao đổi với bác sĩ nhi nếu mối quan tâm tiếp tục.",
        ],
        moderate: [
          "Mức quan tâm trung bình",
          "Câu trả lời của bạn gợi ý nên theo dõi thêm. Hãy cân nhắc chia sẻ kết quả với bác sĩ nhi hoặc chuyên gia phát triển có đủ năng lực của con bạn.",
        ],
        elevated: [
          "Mức quan tâm cao",
          "Câu trả lời của bạn thuộc khoảng quan tâm cao. Khuyến nghị đánh giá phát triển chuyên môn.",
        ],
        nextSteps: {
          lower:
            "Quan tâm thấp: tiếp tục theo dõi phát triển và thảo luận mối quan tâm với bác sĩ nhi nếu cần.",
          moderate:
            "Quan tâm trung bình: cân nhắc theo dõi nhi khoa hoặc xem xét sàng lọc phát triển bổ sung.",
          elevated: "Quan tâm cao: khuyến nghị đánh giá phát triển chuyên môn.",
        },
      },
      form: {
        eyebrow: "Bắt đầu tại đây",
        title: "Công cụ sàng lọc tự kỷ M-CHAT-R",
        intro:
          "Hoàn tất thông tin phụ huynh và trẻ bên dưới trước khi bắt đầu bộ 20 câu hỏi sàng lọc.",
        placeholders: {
          parentFirstName: "Tên phụ huynh/người giám hộ *",
          parentLastName: "Họ phụ huynh/người giám hộ *",
          email: "Email *",
          phone: "Số điện thoại *",
          childFirstName: "Tên trẻ *",
          zipCode: "Mã ZIP *",
          preferredLocation: "Địa điểm ưu tiên *",
        },
        locationOptions: [
          "Annandale",
          "Fairfax",
          "Centreville / Chantilly",
          "Alexandria / Arlington",
          "Chưa chắc",
        ],
        consent:
          "Tôi đồng ý được Eden ABA Therapy liên hệ về hỗ trợ sàng lọc và các bước tiếp theo. Tôi hiểu công cụ sàng lọc này không phải chẩn đoán.",
        validationError:
          "Vui lòng hoàn tất tất cả trường bắt buộc, nhập email hợp lệ và đánh dấu ô đồng ý.",
        submit: "Gửi & Bắt đầu sàng lọc",
      },
      questionsStage: {
        label: "M-CHAT-R: Câu hỏi",
        of: "trên",
        answers: ["Không", "Có"],
        previous: "Trước",
        answered: "trên 20 đã trả lời",
        seeResults: "Xem kết quả",
        next: "Tiếp",
      },
      resultsStage: {
        eyebrow: "Hoàn tất sàng lọc",
        title: "Tóm tắt M-CHAT-R của bạn",
        totalScore: "Tổng điểm",
        percentageScore: "Điểm phần trăm:",
        whatThisMeans: "Ý nghĩa",
        sendSuccess:
          "Kết quả đã sẵn sàng cho Eden ABA Therapy. Kết nối nút này với email intake/API endpoint của bạn.",
        retake: "Làm lại sàng lọc",
        printResults: "In kết quả",
        sendToEden: "Gửi kết quả đến văn phòng Eden",
        contactEden: "Liên hệ Eden ABA Therapy",
      },
      report: {
        printTitle: "Báo cáo sàng lọc M-CHAT-R",
        printButton: "In báo cáo này",
        backToResults: "Quay lại kết quả",
        brandLabel: "Eden ABA Therapy",
        title: "Báo cáo sàng lọc M-CHAT-R",
        generatedOn: "Tạo lúc",
        screeningResult: "Kết quả sàng lọc",
        familyInformation: "Thông tin gia đình",
        scoreSummary: "Tóm tắt điểm",
        riskPercentageLabel: "điểm rủi ro",
        totalScoreLabel: "Tổng điểm",
        severityMeter: "Thang đo mức độ mã màu",
        severityRanges: ["0–2 Thấp", "3–7 Trung bình", "8–20 Cao"],
        totalQuestions: "Tổng câu hỏi đã trả lời",
        riskScoredAnswers: "Câu trả lời tính rủi ro",
        nonRiskAnswers: "Câu trả lời không tính rủi ro",
        riskPercentage: "Phần trăm rủi ro",
        parentResponseReview: "Xem xét phản hồi phụ huynh",
        parentResponseIntro:
          "Mỗi mục bên dưới hiển thị câu trả lời của phụ huynh và liệu nó có khớp với phản hồi tính rủi ro M-CHAT-R cho câu hỏi đó.",
        questionPrefix: "Câu hỏi",
        riskScored: "Tính rủi ro",
        nonRisk: "Không tính rủi ro",
        parentAnswer: "Câu trả lời phụ huynh:",
        riskScoredResponse: "Phản hồi tính rủi ro:",
        yes: "Có",
        no: "Không",
        staffNotes: "Ghi chú hữu ích cho xem xét RBT/BCBA",
        staffNotesItems: [
          "Số phản hồi tính rủi ro:",
          "trên 20.",
          "Mức rủi ro:",
          "Các lĩnh vực có thể cần theo dõi:",
          "Không xác định cụm rủi ro cao từ mẫu sàng lọc này.",
          "Báo cáo này không phải chẩn đoán và không thay thế phán đoán lâm sàng.",
          "Xem xét mối quan tâm với bác sĩ nhi, chuyên gia phát triển, BCBA hoặc đội intake phù hợp.",
        ],
        suggestedNextSteps: "Bước tiếp theo đề xuất",
        nextStepsShare:
          "Gia đình có thể chia sẻ báo cáo này với bác sĩ nhi, chuyên gia phát triển, đội intake Eden ABA Therapy, RBT, BCBA hoặc nhà cung cấp có đủ năng lực khác để hỗ trợ cuộc trò chuyện theo dõi.",
        medicalDisclaimer: "Tuyên bố miễn trừ y khoa",
        staffSignature: "Chữ ký / Ghi chú nhân viên",
        reviewedBy: "Xem xét bởi",
        date: "Ngày",
        notes: "Ghi chú",
        reportFields: [
          "Tên phụ huynh",
          "Tên trẻ",
          "Ngày sinh trẻ",
          "Email",
          "Số điện thoại",
          "Mã ZIP",
          "Địa điểm ưu tiên",
          "Ngày/giờ tạo",
        ],
      },
    },
  });
}

function applyInsurancePage(vi) {
  deepMerge(vi.pages, {
    insurance: {
      submitted: {
        title: "Thông tin bảo hiểm của bạn đã được gửi thành công!",
        intro:
          "Cảm ơn bạn đã chọn Eden ABA Therapy. Đội xác minh bảo hiểm đã nhận thông tin và sẽ bắt đầu xem xét quyền lợi. Chúng tôi đam mê giúp gia đình tiếp cận liệu pháp ABA tận tâm, hiệu quả với ít căng thẳng và nhiều rõ ràng hơn.",
        followUp:
          "Thành viên đội ngũ sẽ liên hệ sớm để giải thích phạm vi bảo hiểm, trả lời câu hỏi và hướng dẫn bước tiếp theo để bắt đầu dịch vụ.",
        scheduleAppointment: "Đặt lịch hẹn",
        returnHome: "Về trang chủ",
      },
      hero: {
        eyebrow: "Phạm vi bảo hiểm",
        title: "Phạm vi bảo hiểm cho liệu pháp ABA",
        intro:
          "Eden ABA Therapy hiện chỉ phục vụ gia đình Virginia. Chúng tôi giúp gia đình xem xét quyền lợi liệu pháp ABA, yêu cầu ủy quyền và chi phí gia đình có thể phải chịu với hướng dẫn rõ ràng, tận tâm.",
        verifyInsurance: "Xác minh bảo hiểm",
        startABA: "Bắt đầu liệu pháp ABA",
        supportTitle: "Hỗ trợ bảo hiểm Virginia cho liệu pháp ABA",
        supportText:
          "Eden ABA Therapy giúp gia đình hiểu quyền lợi bảo hiểm, yêu cầu ủy quyền trước, câu hỏi phạm vi Medicaid/DMAS và chi phí tự trả có thể trước khi bắt đầu chăm sóc.",
        supportItems: [
          "Hướng dẫn xác minh quyền lợi",
          "Hỗ trợ ủy quyền trước",
          "Lập kế hoạch bước tiếp theo rõ ràng cho gia đình Virginia",
        ],
        imageAlt: "Gia đình xem xét hỗ trợ bảo hiểm trị liệu",
      },
      virginia: {
        badge: "Chỉ gia đình Virginia",
        title: "Phạm vi bảo hiểm liệu pháp ABA tại Virginia",
        intro:
          "Phạm vi liệu pháp ABA tại Virginia có thể phụ thuộc chẩn đoán của trẻ, tính cần thiết y khoa, loại gói bảo hiểm, đủ điều kiện Medicaid, ủy quyền trước, khấu trừ, đồng thanh toán và mức tối đa tự trả.",
        prepareTitle: "Gia đình nên chuẩn bị",
        prepareItems: [
          "Tài liệu chẩn đoán hoặc đánh giá của trẻ, nếu có",
          "Thẻ bảo hiểm",
          "Mã thành viên và số nhóm",
          "Thông tin liên hệ phụ huynh/người giám hộ",
          "Thông tin bác sĩ nhi hoặc giấy giới thiệu, nếu có",
          "Tài liệu trị liệu hoặc hỗ trợ trường học trước đó",
        ],
        cards: [
          [
            "Virginia Medicaid / DMAS",
            "Virginia Medicaid có thể chi trả dịch vụ trị liệu hành vi liên quan ABA cần thiết y khoa cho trẻ đủ điều kiện theo EPSDT. Có thể cần ủy quyền trước và tài liệu lâm sàng. Eden ABA Therapy có thể giúp gia đình hiểu thông tin có thể cần trước khi bắt đầu dịch vụ.",
          ],
          [
            "Bảo hiểm tư nhân tại Virginia",
            "Nhiều gói bảo hiểm tư nhân được quy định tại Virginia bao gồm phạm vi liên quan tự kỷ, gồm liệu pháp ABA, khi cần thiết y khoa. Phạm vi có thể khác theo gói chủ lao động, gói cá nhân, trạng thái mạng, khấu trừ, đồng thanh toán và quy tắc ủy quyền.",
          ],
          [
            "Ủy quyền trước tại Virginia",
            "Một số gói Virginia Medicaid và bảo hiểm tư nhân có thể yêu cầu ủy quyền trước khi liệu pháp ABA bắt đầu. Quy trình thường gồm thông tin chẩn đoán, khuyến nghị lâm sàng, mục tiêu điều trị và giờ dịch vụ yêu cầu.",
          ],
        ],
        helpTitle: "Eden ABA Therapy hỗ trợ như thế nào",
        helpItems: [
          "Xác minh quyền lợi",
          "Xem xét chi tiết trong mạng hoặc ngoài mạng",
          "Giải thích chi phí gia đình có thể phải chịu",
          "Hỗ trợ các bước ủy quyền",
          "Hướng dẫn gia đình qua bước tiếp theo hướng tới liệu pháp ABA",
        ],
        plansTitle: "Gói bảo hiểm chúng tôi có thể giúp xem xét tại Virginia",
        plansIntro:
          "Nếu gói của bạn không có trong danh sách, hãy gửi biểu mẫu và đội ngũ vẫn có thể xem xét quyền lợi.",
        providers: [
          "Aetna",
          "Anthem HealthKeepers Plus",
          "Blue Cross Blue Shield",
          "CareFirst",
          "Cigna",
          "Optum",
          "UnitedHealthcare",
          "UMR",
          "Virginia Medicaid",
          "Molina",
          "Kaiser Permanente",
          "TRICARE",
          "Humana",
          "Magellan",
          "Gói khác",
        ],
        showMore: "Xem thêm",
        showLess: "Thu gọn",
      },
      priorAuth: {
        badge: "Hỗ trợ ủy quyền trước",
        title: "Nếu bảo hiểm của tôi yêu cầu ủy quyền trước thì sao?",
        intro:
          "Một số gói Virginia Medicaid và bảo hiểm tư nhân có thể yêu cầu phê duyệt trước khi liệu pháp ABA bắt đầu. Xem xét này giúp gói bảo hiểm hiểu nhu cầu lâm sàng, giờ trị liệu đề xuất và mục tiêu điều trị của con bạn trước khi dịch vụ bắt đầu.",
        steps: [
          [
            "Đánh giá lâm sàng",
            "Clinician xem xét điểm mạnh, nhu cầu, mối quan tâm an toàn và mục tiêu gia đình của con bạn.",
          ],
          [
            "Giờ trị liệu đề xuất",
            "Đội chăm sóc xác định mức hỗ trợ có thể phù hợp về mặt lâm sàng.",
          ],
          [
            "Nộp tài liệu",
            "Biểu mẫu bảo hiểm, chi tiết chẩn đoán, mục tiêu và yêu cầu dịch vụ có thể được gửi để xem xét.",
          ],
          [
            "Phê duyệt hoặc hỗ trợ bước tiếp theo",
            "Nếu cần thêm thông tin, Eden giúp gia đình hiểu bước tiếp theo.",
          ],
        ],
        disclaimer:
          "Eden ABA Therapy không thể đảm bảo ủy quyền hay phạm vi bảo hiểm, nhưng đội ngũ có thể giúp gia đình thu thập thông tin, hiểu yêu cầu của gói và đi qua quy trình với ít căng thẳng hơn.",
        cta: "Nhận hỗ trợ bảo hiểm",
        imageAlt: "Trẻ và người chăm sóc trong môi trường trị liệu lâm sàng hỗ trợ",
      },
      faqTitle: "Câu hỏi thường gặp về phạm vi bảo hiểm liệu pháp ABA",
      faqs: [
        [
          "Bảo hiểm có chi trả liệu pháp ABA tại Virginia không?",
          "Liệu pháp ABA có thể được chi trả tại Virginia khi cần thiết y khoa và trẻ đáp ứng yêu cầu của gói. Phạm vi có thể phụ thuộc chẩn đoán, tài liệu tính cần thiết y khoa, ủy quyền trước, trạng thái mạng, đủ điều kiện Medicaid, loại gói chủ lao động, khấu trừ, đồng thanh toán và đồng chi trả. Virginia Medicaid và gói bảo hiểm tư nhân được quy định tại Virginia có thể có quy tắc khác nhau. Eden ABA Therapy có thể giúp xem xét quyền lợi gia đình và giải thích nội dung gói trước khi bắt đầu dịch vụ.",
        ],
        [
          "Tôi có cần chẩn đoán tự kỷ tại Virginia không?",
          "Nhiều gói Virginia Medicaid và bảo hiểm tư nhân có thể yêu cầu chẩn đoán tự kỷ hoặc tài liệu đánh giá trước khi liệu pháp ABA được ủy quyền. Một số gói cũng có thể yêu cầu khuyến nghị lâm sàng, mục tiêu điều trị và hồ sơ chứng minh tính cần thiết y khoa. Nếu con bạn vẫn đang được đánh giá, Eden ABA Therapy có thể giúp hiểu tài liệu nào hữu ích cho quy trình xem xét bảo hiểm. Chúng tôi không thể đảm bảo phê duyệt, nhưng có thể giúp gia đình chuẩn bị thông tin thường được yêu cầu.",
        ],
        [
          "Ủy quyền trước tại Virginia là gì?",
          "Ủy quyền trước là bước xem xét mà một số gói Virginia Medicaid và bảo hiểm tư nhân có thể yêu cầu trước khi liệu pháp ABA bắt đầu. Gói có thể yêu cầu thông tin chẩn đoán, kết quả đánh giá, khuyến nghị điều trị, giờ dịch vụ và mục tiêu đo lường được. Gói bảo hiểm xem xét thông tin đó trước khi quyết định dịch vụ có được phê duyệt theo chính sách hay không. Eden ABA Therapy có thể giúp gia đình hiểu thông tin có thể cần và hướng dẫn các bước tiếp theo.",
        ],
        [
          "Eden ABA Therapy có xác minh bảo hiểm Virginia của tôi không?",
          "Có. Eden ABA Therapy có thể thu thập thông tin bảo hiểm và xem xét quyền lợi cho gia đình Virginia tìm liệu pháp ABA. Đội ngũ có thể giúp giải thích đủ điều kiện, khấu trừ, đồng thanh toán, đồng chi trả, trạng thái mạng, yêu cầu ủy quyền và bước tiếp theo có thể. Xác minh cung cấp thông tin hữu ích trước khi bắt đầu chăm sóc, nhưng quyết định cuối cùng do gói bảo hiểm đưa ra.",
        ],
        [
          "Xác minh có đảm bảo phạm vi bảo hiểm không?",
          "Không. Xác minh bảo hiểm không đảm bảo thanh toán, phê duyệt hay phạm vi liên tục tại Virginia. Đó là ước tính dựa trên thông tin có sẵn từ gói bảo hiểm tại thời điểm xem xét. Phạm vi vẫn có thể phụ thuộc đủ điều kiện, chẩn đoán, tính cần thiết y khoa, ủy quyền trước, loại trừ gói, trạng thái mạng nhà cung cấp và trách nhiệm chia sẻ chi phí của gia đình. Eden ABA Therapy có thể giúp giải thích thông tin thu được và các bước có thể tiếp theo.",
        ],
        [
          "Nếu bảo hiểm của tôi không có trong danh sách thì sao?",
          "Nếu gói bảo hiểm Virginia của bạn không có trong danh sách, bạn vẫn có thể gửi biểu mẫu để xem xét. Một số gói dùng tên mạng khác, quản trị viên bên thứ ba, tổ chức quản lý chăm sóc Medicaid hoặc quy tắc quyền lợi theo chủ lao động. Đội ngũ có thể xem xét thông tin trên thẻ bảo hiểm và giúp xác định câu hỏi cần hỏi gói. Nếu quyền lợi ABA hạn chế hoặc không có, chúng tôi vẫn có thể thảo luận bước tiếp theo và lựa chọn hỗ trợ.",
        ],
      ],
    },
    locations: {
      breadcrumbSuffix: "Địa điểm",
      brandLabel: "Eden ABA Therapy",
      annandaleMapTitle: "Bản đồ Google Eden ABA Therapy Annandale",
    },
  });
}
