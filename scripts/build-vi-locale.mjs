/**
 * Generates locales/vi.json from locales/en.json with Vietnamese translations.
 * Run: node scripts/build-vi-locale.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { applyRemainingTranslations } from "./vi-locale-translations.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const en = JSON.parse(readFileSync(join(root, "locales/en.json"), "utf8"));

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
  return target;
}

/** Full Vietnamese catalog – mirrors en.json structure */
const vi = structuredClone(en);

// ── meta ──
vi.meta = {
  title: "Eden ABA Therapy | Liệu pháp ABA, Hỗ trợ Tự kỷ & Bảo hiểm tại Bắc Virginia",
  description:
    "Eden ABA Therapy cung cấp liệu pháp ABA tận tâm, hỗ trợ tự kỷ, xác minh bảo hiểm, mẫu intake, tài nguyên phụ huynh và hỗ trợ địa điểm cho gia đình tại Bắc Virginia.",
};

// ── common (from page.js translations.vi + nested sections) ──
deepMerge(vi.common, {
  english: "English",
  vietnamese: "Tiếng Việt",
  brandName: "Eden ABA Therapy",
  brandTagline: "Chăm sóc tự kỷ tận tâm",
  navAutismEvaluation: "Đánh giá tự kỷ",
  navABATherapy: "Liệu pháp ABA",
  navLocations: "Địa điểm",
  locationsPageTitle: "Tìm địa điểm Eden ABA Therapy gần bạn.",
  locationsIntro:
    "Tìm dịch vụ chăm sóc của Eden ABA Therapy và xem địa điểm Annandale, giờ làm việc, chỉ đường và lựa chọn đặt lịch.",
  currentlyUsingLocation: "Tìm theo mã ZIP, thành phố hoặc địa chỉ",
  listView: "Danh sách",
  mapView: "Bản đồ",
  filters: "Bộ lọc",
  locationDetails: "Chi tiết địa điểm",
  getDirections: "Chỉ đường",
  suggestHours: "Đề xuất giờ mới",
  distanceLabel: "Khoảng cách",
  hours: "Giờ làm việc",
  navResources: "Tài nguyên",
  navAboutEden: "Về Eden",
  navCareers: "Tuyển dụng",
  startABA: "Bắt đầu liệu pháp ABA",
  darkMode: "Chế độ tối",
  lightMode: "Chế độ sáng",
  heroTitle: "Con đường tươi sáng để trẻ lớn lên, học hỏi và phát triển.",
  heroSubtitle:
    "Eden ABA Therapy cung cấp hỗ trợ ABA ấm áp, lấy gia đình làm trung tâm, với sự chăm sóc tận tâm, hướng dẫn rõ ràng và trải nghiệm trị liệu thân thiện với trẻ.",
  finderTitle: "Tìm liệu pháp ABA gần bạn",
  finderPlaceholder: "Mã ZIP, thành phố hoặc tên trung tâm",
  findCare: "Tìm dịch vụ",
  abaRightForMe: "Liệu pháp ABA có phù hợp với con tôi không?",
  asdSupport: "Nhận hỗ trợ đánh giá ASD",
  call: "Gọi",
  serviceHeadline: "Hãy cùng tìm hiểu về liệu pháp ABA.",
  serviceSubtitle:
    "Đội ngũ của chúng tôi cung cấp liệu pháp ABA được cá nhân hóa theo nhu cầu riêng của từng trẻ. Từ kỹ năng giao tiếp, kỹ năng xã hội đến thói quen hằng ngày và hành vi tích cực, Eden ABA Therapy xây dựng kế hoạch chăm sóc hỗ trợ trẻ phát triển một cách tự tin.",
  services: [
    [
      "Dịch vụ ABA hỗ trợ tại trường học",
      "Phối hợp với gia đình và nhà trường để hỗ trợ sẵn sàng lớp học, giao tiếp, thói quen và chiến lược hành vi tích cực.",
    ],
    [
      "Liệu pháp ABA tại nhà",
      "Liệu pháp ABA cá nhân hóa trong môi trường sống tự nhiên của trẻ nhằm củng cố thói quen hằng ngày, giao tiếp và tính độc lập.",
    ],
    [
      "Liệu pháp ABA tại trung tâm",
      "Trị liệu trong môi trường lâm sàng hỗ trợ, tập trung vào xây dựng kỹ năng, vui chơi, giao tiếp xã hội và phát triển.",
    ],
    [
      "Can thiệp sớm ABA",
      "Hỗ trợ sớm cho trẻ nhỏ để xây dựng giao tiếp, bắt chước, vui chơi, kỹ năng sinh hoạt và thói quen học tập tích cực.",
    ],
    [
      "Đánh giá hành vi",
      "Xem xét chi tiết các mẫu hành vi, yếu tố kích hoạt, nhu cầu giao tiếp, an toàn và ưu tiên gia đình trước khi lập kế hoạch điều trị.",
    ],
    [
      "Chương trình ABA cá nhân hóa",
      "Mục tiêu điều trị được tùy chỉnh theo điểm mạnh, nhu cầu phát triển, ưu tiên của người chăm sóc và dữ liệu tiến bộ đo lường được.",
    ],
    [
      "Đào tạo kỹ năng xã hội",
      "Hỗ trợ tương tác với bạn bè, luân phiên, chào hỏi, vui chơi, chú ý chung, hội thoại và xây dựng tình bạn.",
    ],
    [
      "Đào tạo & hỗ trợ phụ huynh",
      "Huấn luyện thực tế để phụ huynh áp dụng chiến lược ABA trong bữa ăn, giờ ngủ, chuyển tiếp, đi ra cộng đồng và thói quen hằng ngày.",
    ],
  ],
  gettingStartedTitle: "Cách bắt đầu với liệu pháp ABA",
  gettingStartedP1:
    "Nếu con bạn đã được chẩn đoán rối loạn phổ tự kỷ và gia đình muốn bắt đầu liệu pháp ABA, bạn có thể liên hệ với chúng tôi để lên lịch tiếp nhận hồ sơ ban đầu.",
  gettingStartedP2:
    "Nếu con bạn có nhiều dấu hiệu sớm của rối loạn phổ tự kỷ nhưng chưa được chẩn đoán, chúng tôi có thể hướng dẫn gia đình về các lựa chọn hỗ trợ đánh giá và chẩn đoán.",
  screeningToolsTitle: "Công cụ sàng lọc trực tuyến miễn phí",
  forToddlers: "Dành cho trẻ nhỏ:",
  takeMchat: "Làm M-CHAT",
  forOlderChildren: "Dành cho trẻ lớn hơn:",
  takeCast: "Làm CAST",
  assessmentTitle: "Lên lịch đánh giá tự kỷ gần bạn",
  assessmentText:
    "Eden ABA Therapy giúp gia đình hiểu các bước tiếp theo cho đánh giá tự kỷ và dịch vụ ABA.",
  diagnosticSupport: "Nhận hỗ trợ chẩn đoán",
  careersEyebrow: "Hệ thống tuyển dụng",
  careersTitle: "Trang cơ hội nghề nghiệp với chức năng tìm kiếm vị trí ứng tuyển.",
  searchJobs: "Tìm việc...",
  apply: "Ứng tuyển",
  schedulerEyebrow: "Eden ABA Therapy",
  schedulerTitle: "Hệ thống đặt lịch trực tuyến nâng cao",
  schedulerSubtitle:
    "Đặt lịch trực tuyến với Eden ABA Therapy bằng hệ thống đặt lịch nhiều bước có hướng dẫn.",
  guidedWizard: "Trình đặt lịch có hướng dẫn",
  complete: "Hoàn tất",
  back: "Quay lại",
  continue: "Tiếp tục",
  submitRequest: "Gửi yêu cầu",
  bookAnother: "Đặt lịch khác",
  requiredNotice: "Vui lòng hoàn tất các trường bắt buộc trước khi tiếp tục.",
  intakeBadge: "Hỗ trợ lấy gia đình làm trung tâm",
  intakeTitle: "Giúp con bạn phát triển với liệu pháp ABA.",
  intakeSubtitle:
    "Hoàn tất mẫu quan tâm trực tuyến và đội ngũ của chúng tôi sẽ liên hệ để hướng dẫn các bước tiếp theo.",
  benefits: [
    "Kế hoạch liệu pháp ABA cá nhân hóa",
    "Hỗ trợ gia đình và người chăm sóc",
    "Chăm sóc tận tâm từ intake đến dịch vụ",
  ],
  whatNext: "Điều gì sẽ diễn ra tiếp theo?",
  whatNextText:
    "Eden ABA Therapy sẽ xem xét thông tin của bạn, liên hệ để tiếp nhận hồ sơ ban đầu, trao đổi về bảo hiểm hoặc các giấy tờ cần thiết, và hỗ trợ lên lịch bước tiếp theo phù hợp.",
  intakeFormTitle: "Bắt đầu liệu pháp ABA",
  parentName: "Tên phụ huynh (Bắt buộc)",
  childFirstName: "Tên của trẻ",
  childLastName: "Họ của trẻ",
  childBirthdate: "Ngày sinh của trẻ",
  phoneNumber: "Số điện thoại",
  emailAddress: "Địa chỉ email",
  preferredContact: "Cách liên hệ ưu tiên",
  diagnosisQuestion: "Con bạn đã có chẩn đoán chưa?",
  state: "Tiểu bang",
  message: "Tin nhắn",
  appointmentIntake: "Lịch hẹn và tiếp nhận hồ sơ ban đầu",
  appointmentIntakeText:
    "Chúng tôi sẽ liên hệ để lên lịch hẹn và hoàn tất quy trình tiếp nhận hồ sơ ban đầu.",
  secureConfidential: "Bảo mật & riêng tư",
  secureConfidentialText:
    "Thông tin của bạn được bảo vệ theo các tiêu chuẩn bảo mật và quyền riêng tư nghiêm ngặt.",
  consentUpdates:
    "Tôi đồng ý nhận nhắc lịch hẹn và cập nhật intake từ Eden ABA Therapy.",
  consentTerms: "Tôi đồng ý với Chính sách Quyền riêng tư và Điều khoản Dịch vụ.",
  recaptcha: "được bảo vệ bởi reCAPTCHA",
  liveChat: "Trò chuyện trực tuyến",
  edenAssistant: "Trợ lý Eden",
  chatSupport: "Hỗ trợ ABA • Âm ngữ trị liệu • Hoạt động trị liệu",
  chatPlaceholder: "Nhập tin nhắn của bạn...",
  sendMessage: "Gửi tin nhắn",
  emergencyNote: "Chỉ hỗ trợ giáo dục. Trường hợp khẩn cấp hãy gọi 911.",
  typing: "Đang nhập...",
  you: "Bạn",
  chatGreeting:
    "Xin chào! Tôi là trợ lý trị liệu của Eden. Tôi có thể trả lời câu hỏi về ABA, trị liệu ngôn ngữ, trị liệu hoạt động, hỗ trợ tự kỷ, intake, bảo hiểm, đặt lịch, tài liệu, đào tạo phụ huynh và các bước tiếp theo. Bạn muốn biết điều gì?",
  newsletterTitle: "Kết nối với bản tin gia đình của chúng tôi",
  fullName: "Họ và tên",
  email: "Email",
  joinNewsletter: "Tham gia bản tin gia đình",
  newsletterThanks: "Cảm ơn",
  newsletterThanksEnd: "Bạn đã vào danh sách nhận bản tin xem trước.",
  footerDescription:
    "Eden ABA Therapy cung cấp dịch vụ chăm sóc tự kỷ và liệu pháp ABA tận tâm cho trẻ em và gia đình tại Bắc Virginia.",
  forParents: "Dành cho phụ huynh",
  resources: "Tài nguyên",
  contactEden: "Liên hệ Eden",
  serviceAreas: "Khu vực phục vụ",
  officeHours: "Giờ làm việc",
  googleReviews: "Đánh giá Google",
  allRights: "Đã đăng ký bản quyền.",
  privacy: "Chính sách Quyền riêng tư",
  terms: "Điều khoản Dịch vụ",
  accessibility: "Khả năng truy cập",
  noticePrivacy: "Thông báo về Thực hành Quyền riêng tư",
  headerEvaluation: {
    eyebrow: "Đánh giá tự kỷ",
    title: "Hiểu bước tiếp theo dành cho con bạn.",
    text: "Công cụ sàng lọc thân thiện với phụ huynh, hướng dẫn phát triển và hỗ trợ đánh giá.",
    cards: [
      ["Sàng lọc sớm", "Công cụ trực tuyến M-CHAT-R & CAST"],
      [
        "Hướng dẫn phụ huynh",
        "Hỗ trợ hiểu hành vi và các cột mốc phát triển",
      ],
      ["Intake bảo mật", "Biểu mẫu được bảo vệ và tải tài liệu lên"],
      ["Lên lịch nhanh", "Phối hợp đánh giá và các bước tiếp theo"],
    ],
  },
  logo: {
    alt: "Logo Eden ABA Therapy",
    fallbackLine1: "EDEN",
    fallbackLine2: "ABA THERAPY",
    defaultAlt: "Eden ABA Therapy",
  },
  googleMap: {
    defaultTitle: "Bản đồ Google Eden ABA Therapy",
    annandaleTitle: "Bản đồ Google Eden ABA Therapy Annandale",
    apiKeyNotice:
      "Để có bản đồ Google nhúng đáng tin cậy nhất, hãy thêm NEXT_PUBLIC_GOOGLE_MAPS_API_KEY vào biến môi trường. Bạn vẫn có thể mở Eden ABA Therapy trên Google Maps.",
    openInGoogleMaps: "mở Eden ABA Therapy trên Google Maps",
  },
  locationsDetail: {
    breadcrumbPrefix: "Eden ABA Therapy /",
    brandLabel: "Eden ABA Therapy",
    officePhone: "Điện thoại văn phòng:",
    fax: "Fax:",
    distanceOptions: ["5 mi", "10 mi", "20 mi", "50 mi"],
    annandale: {
      name: "Eden ABA Therapy – Annandale",
      street: "7700 Little River Turnpike",
      suite: "Suite 304",
      cityStateZip: "Annandale, VA 22003, United States",
      phone: "(703) 587-5238",
      fax: "571-445-8631",
      address: "7700 Little River Turnpike, Suite 304, Annandale, VA 22003, United States",
    },
  },
  homeIntakePlaceholders: {
    parentName: "Tên phụ huynh",
    childFirstName: "Tên của trẻ",
    childLastName: "Họ của trẻ",
    phone: "Số điện thoại",
    email: "Nhập email của bạn",
    message: "Hãy cho chúng tôi biết về con bạn và cách chúng tôi có thể hỗ trợ.",
    preferredContactOptions: ["Gọi điện", "Tin nhắn", "Email"],
    diagnosisOptions: [
      "Chọn tình trạng chẩn đoán",
      "Có",
      "Không",
      "Đang trong quá trình",
    ],
    stateOptions: ["Virginia", "Maryland", "Washington DC"],
  },
  chatResponses: {
    emergency:
      "Nếu có nguy hiểm cấp bách, hãy gọi 911 ngay. Nếu con bạn có thể tự làm hại bản thân hoặc người khác, hãy ở gần chỉ khi an toàn, loại bỏ vật nguy hiểm nếu có thể, và liên hệ dịch vụ cấp cứu hoặc bác sĩ của trẻ. Tôi có thể hỗ trợ lập kế hoạch an toàn chung, nhưng trường hợp khẩn cấp cần sự giúp đỡ chuyên môn trực tiếp ngay lập tức.",
    aba: "Liệu pháp ABA, hay Phân tích Hành vi Ứng dụng, là phương pháp dựa trên bằng chứng giúp trẻ xây dựng kỹ năng giao tiếp, xã hội, sinh hoạt hằng ngày, vui chơi, học tập và an toàn. BCBA nghiên cứu những gì xảy ra trước và sau hành vi, sau đó tạo kế hoạch dạy kỹ năng thay thế và giảm hành vi không an toàn hoặc cản trở.",
    behavior:
      "Với đánh, cắn, tantrum hoặc hung hăng, bước đầu tiên là hiểu lý do: tránh né, tìm sự chú ý, tiếp cận vật phẩm, nhu cầu cảm giác, đau, sự thất vọng giao tiếp hoặc chuyển tiếp. ABA thường dạy kỹ năng thay thế như xin nghỉ, nhờ giúp đỡ, chờ đợi, dùng lời nói/AAC hoặc thói quen bình tĩnh. Nếu hành vi nguy hiểm, BCBA nên hoàn thành đánh giá hành vi và kế hoạch an toàn.",
    speech:
      "Trị liệu ngôn ngữ hỗ trợ giao tiếp. Có thể hỗ trợ ngôn ngữ biểu đạt, hiểu chỉ dẫn, phát âm, giao tiếp xã hội, yêu cầu, trả lời câu hỏi và công cụ AAC như giao tiếp bằng hình ảnh hoặc thiết bị nói. ABA và trị liệu ngôn ngữ có thể phối hợp khi hành vi của trẻ liên quan đến sự thất vọng giao tiếp.",
    occupational:
      "Trị liệu hoạt động giúp trẻ với kỹ năng sinh hoạt hằng ngày và vận động-cảm giác. OT có thể hỗ trợ điều hòa cảm giác, vận động tinh, ăn uống, mặc quần áo, thói quen vệ sinh, viết tay, nhận thức cơ thể, kỹ năng vui chơi và sẵn sàng đi học. ABA có thể phối hợp với OT bằng cách giúp trẻ thực hành các kỹ năng này nhất quán tại nhà, phòng khám và trường học.",
    insurance:
      "Để xác minh bảo hiểm, đội intake thường cần họ tên đầy đủ của trẻ, ngày sinh, công ty bảo hiểm, mã thành viên, tên/ngày sinh chủ hợp đồng, báo cáo chẩn đoán và đôi khi giấy giới thiệu. Sau đó, quyền lợi được kiểm tra cho phạm vi ABA, khấu trừ, đồng thanh toán, yêu cầu ủy quyền và giờ dịch vụ được phê duyệt.",
    intake:
      "Để bắt đầu liệu pháp ABA, hoàn tất mẫu Bắt đầu liệu pháp ABA với tên phụ huynh, tên trẻ, ngày sinh, điện thoại, email, tình trạng chẩn đoán, tiểu bang và mối quan tâm chính. Sau khi gửi, đội tiếp nhận sẽ xem xét thông tin, xác minh bảo hiểm, yêu cầu tài liệu và lên lịch cuộc gọi intake hoặc đánh giá.",
    scheduling:
      "Quy trình thông thường: cuộc gọi intake, xem xét tài liệu, xác minh bảo hiểm, lên lịch đánh giá, đánh giá BCBA, kế hoạch điều trị, ủy quyền bảo hiểm, rồi bắt đầu trị liệu. Lịch trình phụ thuộc địa điểm, nhân sự, phê duyệt bảo hiểm và giờ được đề xuất.",
    documents:
      "Tài liệu hữu ích gồm báo cáo chẩn đoán tự kỷ, thẻ bảo hiểm mặt trước/sau, giấy giới thiệu nếu cần, IEP hoặc đánh giá trường học, báo cáo trị liệu trước đó, danh sách thuốc/dị ứng, tài liệu giám hộ/pháp lý nếu có, và mọi đánh giá phát triển hoặc tâm lý gần đây.",
    parentTraining:
      "Đào tạo phụ huynh dạy người chăm sóc cách dùng chiến lược ABA trong thói quen hằng ngày. Có thể gồm thực hành giao tiếp, củng cố, chuyển tiếp, giảm hành vi vấn đề, thói quen giờ ngủ, vệ sinh, ăn uống, an toàn và giúp trẻ khái quát hóa kỹ năng ngoài buổi trị liệu.",
    cost: "Chi phí phụ thuộc gói bảo hiểm, khấu trừ, đồng thanh toán, ủy quyền và liệu ABA có được bảo hiểm chi trả vì lý do y khoa cần thiết hay không. Bước tốt nhất là xác minh quyền lợi trước khi bắt đầu dịch vụ để gia đình hiểu trách nhiệm tài chính dự kiến.",
    school:
      "ABA có thể hỗ trợ mục tiêu liên quan trường học bằng cách giúp giao tiếp, chuyển tiếp, kế hoạch hành vi, kỹ năng xã hội, sẵn sàng lớp học và thói quen hằng ngày. ABA không thay thế nhóm IEP của trường, nhưng BCBA thường có thể phối hợp với người chăm sóc và nhà cung cấp trường học khi có giấy phép ký.",
    default:
      "Tôi có thể hỗ trợ về liệu pháp ABA, trị liệu ngôn ngữ, trị liệu hoạt động, intake, bảo hiểm, đặt lịch, tài liệu, đào tạo phụ huynh, mối quan tâm về hành vi và hỗ trợ tự kỷ. Hãy cho tôi biết tuổi của trẻ, mối quan tâm chính và bạn đang hỏi về ABA, trị liệu ngôn ngữ, OT, bảo hiểm hay bắt đầu dịch vụ.",
  },
});

applyRemainingTranslations(vi);

writeFileSync(join(root, "locales/vi.json"), JSON.stringify(vi, null, 2) + "\n", "utf8");
console.log("Wrote locales/vi.json");
