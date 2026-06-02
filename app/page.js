"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InsuranceVerificationForm from "@/components/InsuranceVerificationForm";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  ClipboardCheck,
  Users,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  CheckCircle2,
  LockKeyhole,
  CalendarDays,
  FileText,
  GraduationCap,
  BriefcaseBusiness,
  Stethoscope,
  Home,
  Building2,
  School,
  MessageCircle,
  Star,
  Search,
  ChevronDown,
  UploadCloud,
  UserRound,
  Baby,
  BadgeCheck,
  Clock3,
  BarChart3,
  FileSignature,
  CreditCard,
  Sparkles,
  Filter,
  PlayCircle,
  ExternalLink,
  AlertCircle,
  Check,
} from "lucide-react";

const logoPath = "/logo.png";

const brandColors = {
  forest: "#1f7a2e",
  leaf: "#58b82e",
  teal: "#128c8c",
  aqua: "#49b8c8",
  orange: "#ff8a1f",
  gold: "#f7c72f",
  lime: "#b6d930",
  cream: "#fff8df",
};

const menu = [
  {
    label: "Autism Evaluation",
    type: "evaluation",
    highlightTitle: "Autism Evaluation",
    highlightText: "Early autism screening and evaluation support for families across Northern Virginia.",
    columns: [
      {
        title: "Online Screeners",
        links: [
          "M-CHAT-R Online Screener",
          "CAST Online Screener",
          "Developmental Milestones",
          "Signs of Autism"
        ],
      },
      {
        title: "Evaluation Support",
        links: [
          "ADOS-2 Assessment",
          "Diagnostic Guidance",
          "Parent Consultation",
          "Insurance Support"
        ],
      },
    ],
  },
  {
    label: "ABA Therapy",
    type: "simple",
    columns: [
      { title: "ABA Therapy", links: ["In-Home ABA", "Clinic-Based ABA", "Parent Training", "School Support"] },
      { title: "Family Resources", links: ["What is Autism?", "What is ABA Therapy?", "Insurance Coverage", "Admissions Information"] },
    ],
  },
  {
    label: "Locations",
    type: "locations",
    columns: [
      { title: "Eden Locations", links: ["Fairfax", "Centreville", "Chantilly", "Reston", "Herndon"] },
      { title: "More Areas", links: ["Alexandria", "Arlington", "Manassas", "Woodbridge", "View All Locations"] },
    ],
  },
  {
    label: "Resources",
    type: "simple",
    columns: [
      { title: "Family Resources", links: ["What is ABA?", "Caregiver Guides", "Blog", "FAQs"] },
      { title: "Support", links: ["Insurance Coverage", "Parent Training", "Admissions Information", "Privacy Practices"] },
    ],
  },
  {
    label: "About Eden",
    type: "compact",
    columns: [
      { title: "About Eden", links: ["Our Story", "Our Team", "Clinical Quality", "About Us", "Contact Us"] },
    ],
  },
  {
    label: "Careers",
    type: "compact",
    columns: [
      { title: "Careers", links: ["Search Open Roles", "RBT Careers", "BCBA Careers", "Interview Guide", "Career Resources"] },
    ],
  },
];

const serviceData = [
  { icon: Home, tag: "Home", title: "In-Home ABA Therapy", age: "2–18", text: "Support in the child’s daily environment with caregiver coaching and skill generalization.", features: ["Daily routines", "Communication", "Behavior reduction", "Family training"] },
  { icon: Building2, tag: "Clinic", title: "Clinic-Based ABA", age: "2–12", text: "Structured learning environment for school readiness, social skills, and intensive treatment.", features: ["1:1 sessions", "Peer practice", "BCBA oversight", "Progress review"] },
  { icon: School, tag: "School", title: "School Collaboration", age: "3–18", text: "Coordination with teachers and teams to support goals across school and community settings.", features: ["IEP support", "Transitions", "Classroom goals", "Teacher collaboration"] },
  { icon: Users, tag: "Family", title: "Parent Training", age: "All", text: "Practical coaching so caregivers can respond confidently and continue progress at home.", features: ["Caregiver goals", "Home plans", "Crisis prevention", "Consistency"] },
];

const intakeSteps = [
  { title: "Family Inquiry", icon: FileText, status: "Secure form" },
  { title: "Insurance Check", icon: CreditCard, status: "Benefits review" },
  { title: "Consent & Uploads", icon: FileSignature, status: "Documents" },
  { title: "Clinical Intake", icon: UserRound, status: "Care history" },
  { title: "Assessment", icon: ClipboardCheck, status: "BCBA review" },
  { title: "Start Therapy", icon: HeartHandshake, status: "Care begins" },
];

const jobs = [
  { role: "Registered Behavior Technician", type: "Full-time / Part-time", location: "Fairfax, VA", dept: "Clinical" },
  { role: "Board Certified Behavior Analyst", type: "Full-time", location: "Northern Virginia", dept: "Clinical" },
  { role: "Intake Coordinator", type: "Full-time", location: "Hybrid", dept: "Operations" },
  { role: "Clinical Supervisor", type: "Full-time", location: "Fairfax, VA", dept: "Leadership" },
];

const edenLocations = [
  {
    name: "Eden ABA Therapy - Annandale",
    city: "Annandale",
    zip: "22003",
    address: "7700 Little River Turnpike, Suite 304, Annandale, VA 22003",
    phone: "(703) 587-5238",
    hours: [
      ["Monday", "9 AM–5 PM"],
      ["Tuesday", "9 AM–5 PM"],
      ["Wednesday", "9 AM–5 PM"],
      ["Thursday", "9 AM–5 PM"],
      ["Friday", "9 AM–5 PM"],
      ["Saturday", "Closed"],
      ["Sunday", "Closed"],
    ],
  },
  { name: "Eden ABA Therapy - Fairfax", city: "Fairfax", zip: "22030", address: "Serving Fairfax County, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Centreville", city: "Centreville", zip: "20120", address: "Serving Centreville, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Chantilly", city: "Chantilly", zip: "20151", address: "Serving Chantilly, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Reston", city: "Reston", zip: "20190", address: "Serving Reston, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Herndon", city: "Herndon", zip: "20170", address: "Serving Herndon, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Alexandria", city: "Alexandria", zip: "22314", address: "Serving Alexandria, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Arlington", city: "Arlington", zip: "22201", address: "Serving Arlington, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Manassas", city: "Manassas", zip: "20110", address: "Serving Manassas, Virginia", phone: "571-478-0089" },
  { name: "Eden ABA Therapy - Woodbridge", city: "Woodbridge", zip: "22191", address: "Serving Woodbridge, Virginia", phone: "571-478-0089" },
];

const edenBusinessInfo = {
  address: "7700 Little River Turnpike, Suite 304, Annandale, VA 22003, United States",
  phone: "(703) 587-5238",
  fax: "571-445-8631",
  hours: [
    ["Monday", "9 AM–5 PM"],
    ["Tuesday", "9 AM–5 PM"],
    ["Wednesday", "9 AM–5 PM"],
    ["Thursday", "9 AM–5 PM"],
    ["Friday", "9 AM–5 PM"],
    ["Saturday", "Closed"],
    ["Sunday", "Closed"],
  ],
};

const translations = {
  en: {
    english: "English",
    vietnamese: "Tiếng Việt",
    brandName: "Eden ABA Therapy",
    brandTagline: "Compassionate autism care",
    navAutismEvaluation: "Autism Evaluation",
    navABATherapy: "ABA Therapy",
    navLocations: "Locations",
    locationsPageTitle: "Find an Eden ABA Therapy location near you.",
    locationsIntro: "Search for Eden ABA Therapy care and view our Annandale location, hours, directions, and appointment options.",
    currentlyUsingLocation: "Search by zip code, city, or address",
    listView: "List View",
    mapView: "Map View",
    filters: "Filters",
    locationDetails: "Location Details",
    getDirections: "Get Directions",
    suggestHours: "Suggest new hours",
    distanceLabel: "Distance",
    hours: "Hours",
    navResources: "Resources",
    navAboutEden: "About Eden",
    navCareers: "Careers",
    startABA: "Start ABA Therapy",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    heroTitle: "A brighter path for children to grow, learn, and thrive.",
    heroSubtitle: "Eden ABA Therapy provides warm, family-centered ABA support using compassionate care, clear guidance, and child-friendly therapy experiences.",
    finderTitle: "Find ABA therapy near you",
    finderPlaceholder: "Zip Code, City, or Center name",
    findCare: "Find care",
    abaRightForMe: "Is ABA therapy right for me?",
    asdSupport: "Get ASD evaluation support",
    call: "Call",
    serviceHeadline: "Let’s Talk About ABA Therapy.",
    serviceSubtitle: "Our team provides personalized ABA therapy designed to meet every child’s unique needs. From communication and social skills to daily routines and positive behaviors, Eden ABA Therapy creates supportive care plans that help children grow with confidence.",
    services: [
      ["School Support ABA Therapy", "Collaboration with families and school teams to support classroom readiness, communication, routines, and positive behavior strategies."],
      ["In-Home ABA Therapy", "Personalized ABA therapy in the child’s natural home environment to strengthen daily routines, communication, and independence."],
      ["Center-Based ABA Therapy", "Structured therapy in a supportive clinical setting focused on skill-building, play, social engagement, and developmental progress."],
      ["Early Intervention ABA Therapy", "Early support for young children to build communication, imitation, play, daily living skills, and positive learning routines."],
      ["Behavior Assessment", "Detailed review of behavior patterns, triggers, communication needs, safety concerns, and family priorities before treatment planning."],
      ["Individualized ABA Programs", "Customized treatment goals based on each child’s strengths, developmental needs, caregiver priorities, and measurable progress data."],
      ["Social Skills Training", "Support for peer interaction, turn-taking, greetings, play, shared attention, conversation, and friendship-building skills."],
      ["Parent Training & Support", "Practical caregiver coaching to help parents use ABA strategies during meals, bedtime, transitions, community outings, and daily routines."],
    ],
    gettingStartedTitle: "How to get started with ABA therapy",
    gettingStartedP1: "If your child already has an autism diagnosis and you want to get started with ABA therapy, you can contact us to schedule an intake.",
    gettingStartedP2: "If your child has many of the early signs of autism and does not yet have a diagnosis, we can help guide you through diagnostic support options.",
    screeningToolsTitle: "No-cost online screening tools",
    forToddlers: "For toddlers:",
    takeMchat: "Take the M-CHAT",
    forOlderChildren: "For older children:",
    takeCast: "Take the CAST",
    assessmentTitle: "Schedule an autism assessment near you",
    assessmentText: "Eden ABA Therapy can help families understand next steps for autism evaluation and ABA therapy services.",
    diagnosticSupport: "Get diagnostic support",
    careersEyebrow: "Recruiting system",
    careersTitle: "Careers page with searchable roles.",
    searchJobs: "Search jobs...",
    apply: "Apply",
    schedulerEyebrow: "Eden ABA Therapy",
    schedulerTitle: "Advanced Online Appointment Scheduler",
    schedulerSubtitle: "Schedule an appointment online with Eden ABA Therapy using our guided multi-step booking system.",
    guidedWizard: "Guided booking wizard",
    complete: "Complete",
    back: "Back",
    continue: "Continue",
    submitRequest: "Submit Request",
    bookAnother: "Book Another",
    requiredNotice: "Please complete all required fields before continuing.",
    intakeBadge: "Family-centered support",
    intakeTitle: "Help your child thrive with ABA therapy.",
    intakeSubtitle: "Complete our online interest form and our team will contact you to guide you through the next steps.",
    benefits: ["Personalized ABA therapy plans", "Support for families and caregivers", "Compassionate care from intake to services"],
    whatNext: "What happens next?",
    whatNextText: "Eden ABA Therapy reviews your information, contacts you for intake, discusses insurance or documentation needs, and helps schedule the next appropriate step.",
    intakeFormTitle: "Start ABA Therapy",
    parentName: "Parent’s Name (Required)",
    childFirstName: "Child’s First Name",
    childLastName: "Child’s Last Name",
    childBirthdate: "Child’s Birthdate",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    preferredContact: "Preferred Contact Method",
    diagnosisQuestion: "Does your child have a diagnosis?",
    state: "State",
    message: "Message",
    appointmentIntake: "Appointment & Intake",
    appointmentIntakeText: "We’ll contact you to schedule an appointment and complete the intake process.",
    secureConfidential: "Secure & Confidential",
    secureConfidentialText: "Your information is protected with strict privacy and security standards.",
    consentUpdates: "I consent to receive appointment reminders and intake updates from Eden ABA Therapy.",
    consentTerms: "I agree to the Privacy Policy and Terms of Service.",
    recaptcha: "protected by reCAPTCHA",
    liveChat: "Live Chat",
    edenAssistant: "Eden Assistant",
    chatSupport: "ABA • Speech • OT Support",
    chatPlaceholder: "Type your message...",
    sendMessage: "Send Message",
    emergencyNote: "Educational support only. For emergencies call 911.",
    typing: "Typing...",
    you: "You",
    chatGreeting: "Hi! I’m Eden’s therapy assistant. I can answer questions about ABA therapy, speech therapy, occupational therapy, autism support, intake, insurance, scheduling, documents, parent training, and next steps. What would you like to know?",
    newsletterTitle: "Stay connected with our family newsletter",
    firstName: "First Name",
    email: "Email",
    joinNewsletter: "Join Family Newsletter",
    newsletterThanks: "Thank you",
    newsletterThanksEnd: "You’re on the newsletter preview list.",
    footerDescription: "Eden ABA Therapy provides compassionate autism and ABA therapy services for children and families across Northern Virginia.",
    forParents: "For Parents",
    resources: "Resources",
    contactEden: "Contact Eden",
    serviceAreas: "Service Areas",
    officeHours: "Office Hours",
    googleReviews: "Google Reviews",
    allRights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    accessibility: "Accessibility",
    noticePrivacy: "Notice of Privacy Practices"
  },
  vi: {
    english: "English",
    vietnamese: "Vietnamese / Tiếng Việt",
    brandName: "Eden ABA Therapy",
    brandTagline: "Chăm sóc tự kỷ tận tâm",
    navAutismEvaluation: "Đánh giá tự kỷ",
    navABATherapy: "Liệu pháp ABA",
    navLocations: "Địa điểm",
    locationsPageTitle: "Tìm địa điểm Eden ABA Therapy gần bạn.",
    locationsIntro: "Tìm dịch vụ chăm sóc của Eden ABA Therapy và xem địa điểm Annandale, giờ làm việc, chỉ đường và lựa chọn đặt lịch.",
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
    heroSubtitle: "Eden ABA Therapy cung cấp hỗ trợ ABA ấm áp, lấy gia đình làm trung tâm, với sự chăm sóc tận tâm, hướng dẫn rõ ràng và trải nghiệm trị liệu thân thiện với trẻ.",
    finderTitle: "Tìm liệu pháp ABA gần bạn",
    finderPlaceholder: "Mã ZIP, thành phố hoặc tên trung tâm",
    findCare: "Tìm dịch vụ",
    abaRightForMe: "Liệu pháp ABA có phù hợp với con tôi không?",
    asdSupport: "Nhận hỗ trợ đánh giá ASD",
    call: "Gọi",
    serviceHeadline: "Hãy cùng tìm hiểu về liệu pháp ABA.",
    serviceSubtitle: "Đội ngũ của chúng tôi cung cấp liệu pháp ABA được cá nhân hóa theo nhu cầu riêng của từng trẻ. Từ kỹ năng giao tiếp, kỹ năng xã hội đến thói quen hằng ngày và hành vi tích cực, Eden ABA Therapy xây dựng kế hoạch chăm sóc hỗ trợ trẻ phát triển một cách tự tin.",
    services: [
      ["Dịch vụ ABA hỗ trợ tại trường học", "Phối hợp với gia đình và nhà trường để hỗ trợ sẵn sàng lớp học, giao tiếp, thói quen và chiến lược hành vi tích cực."],
      ["Liệu pháp ABA tại nhà", "Liệu pháp ABA cá nhân hóa trong môi trường sống tự nhiên của trẻ nhằm củng cố thói quen hằng ngày, giao tiếp và tính độc lập."],
      ["Liệu pháp ABA tại trung tâm", "Trị liệu trong môi trường lâm sàng hỗ trợ, tập trung vào xây dựng kỹ năng, vui chơi, giao tiếp xã hội và phát triển."],
      ["Can thiệp sớm ABA", "Hỗ trợ sớm cho trẻ nhỏ để xây dựng giao tiếp, bắt chước, vui chơi, kỹ năng sinh hoạt và thói quen học tập tích cực."],
      ["Đánh giá hành vi", "Xem xét chi tiết các mẫu hành vi, yếu tố kích hoạt, nhu cầu giao tiếp, an toàn và ưu tiên gia đình trước khi lập kế hoạch điều trị."],
      ["Chương trình ABA cá nhân hóa", "Mục tiêu điều trị được tùy chỉnh theo điểm mạnh, nhu cầu phát triển, ưu tiên của người chăm sóc và dữ liệu tiến bộ đo lường được."],
      ["Đào tạo kỹ năng xã hội", "Hỗ trợ tương tác với bạn bè, luân phiên, chào hỏi, vui chơi, chú ý chung, hội thoại và xây dựng tình bạn."],
      ["Đào tạo & hỗ trợ phụ huynh", "Huấn luyện thực tế để phụ huynh áp dụng chiến lược ABA trong bữa ăn, giờ ngủ, chuyển tiếp, đi ra cộng đồng và thói quen hằng ngày."],
    ],
    gettingStartedTitle: "Cách bắt đầu với liệu pháp ABA",
    gettingStartedP1: "Nếu con bạn đã được chẩn đoán rối loạn phổ tự kỷ và gia đình muốn bắt đầu liệu pháp ABA, bạn có thể liên hệ với chúng tôi để lên lịch tiếp nhận hồ sơ ban đầu.",
    gettingStartedP2: "Nếu con bạn có nhiều dấu hiệu sớm của rối loạn phổ tự kỷ nhưng chưa được chẩn đoán, chúng tôi có thể hướng dẫn gia đình về các lựa chọn hỗ trợ đánh giá và chẩn đoán.",
    screeningToolsTitle: "Công cụ sàng lọc trực tuyến miễn phí",
    forToddlers: "Dành cho trẻ nhỏ:",
    takeMchat: "Làm M-CHAT",
    forOlderChildren: "Dành cho trẻ lớn hơn:",
    takeCast: "Làm CAST",
    assessmentTitle: "Lên lịch đánh giá tự kỷ gần bạn",
    assessmentText: "Eden ABA Therapy giúp gia đình hiểu các bước tiếp theo cho đánh giá tự kỷ và dịch vụ ABA.",
    diagnosticSupport: "Nhận hỗ trợ chẩn đoán",
    careersEyebrow: "Hệ thống tuyển dụng",
    careersTitle: "Trang cơ hội nghề nghiệp với chức năng tìm kiếm vị trí ứng tuyển.",
    searchJobs: "Tìm việc...",
    apply: "Ứng tuyển",
    schedulerEyebrow: "Eden ABA Therapy",
    schedulerTitle: "Hệ thống đặt lịch trực tuyến nâng cao",
    schedulerSubtitle: "Đặt lịch trực tuyến với Eden ABA Therapy bằng hệ thống đặt lịch nhiều bước có hướng dẫn.",
    guidedWizard: "Trình đặt lịch có hướng dẫn",
    complete: "Hoàn tất",
    back: "Quay lại",
    continue: "Tiếp tục",
    submitRequest: "Gửi yêu cầu",
    bookAnother: "Đặt lịch khác",
    requiredNotice: "Vui lòng hoàn tất các trường bắt buộc trước khi tiếp tục.",
    intakeBadge: "Hỗ trợ lấy gia đình làm trung tâm",
    intakeTitle: "Giúp con bạn phát triển với liệu pháp ABA.",
    intakeSubtitle: "Hoàn tất mẫu quan tâm trực tuyến và đội ngũ của chúng tôi sẽ liên hệ để hướng dẫn các bước tiếp theo.",
    benefits: ["Kế hoạch liệu pháp ABA cá nhân hóa", "Hỗ trợ gia đình và người chăm sóc", "Chăm sóc tận tâm từ intake đến dịch vụ"],
    whatNext: "Điều gì sẽ diễn ra tiếp theo?",
    whatNextText: "Eden ABA Therapy sẽ xem xét thông tin của bạn, liên hệ để tiếp nhận hồ sơ ban đầu, trao đổi về bảo hiểm hoặc các giấy tờ cần thiết, và hỗ trợ lên lịch bước tiếp theo phù hợp.",
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
    appointmentIntakeText: "Chúng tôi sẽ liên hệ để lên lịch hẹn và hoàn tất quy trình tiếp nhận hồ sơ ban đầu.",
    secureConfidential: "Bảo mật & riêng tư",
    secureConfidentialText: "Thông tin của bạn được bảo vệ theo các tiêu chuẩn bảo mật và quyền riêng tư nghiêm ngặt.",
    consentUpdates: "Tôi đồng ý nhận nhắc lịch hẹn và cập nhật intake từ Eden ABA Therapy.",
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
    chatGreeting: "Xin chào! Tôi là trợ lý trị liệu của Eden. Tôi có thể trả lời câu hỏi về ABA, trị liệu ngôn ngữ, trị liệu hoạt động, hỗ trợ tự kỷ, intake, bảo hiểm, đặt lịch, tài liệu, đào tạo phụ huynh và các bước tiếp theo. Bạn muốn biết điều gì?",
    newsletterTitle: "Kết nối với bản tin gia đình của chúng tôi",
    firstName: "Tên",
    email: "Email",
    joinNewsletter: "Tham gia bản tin gia đình",
    newsletterThanks: "Cảm ơn",
    newsletterThanksEnd: "Bạn đã vào danh sách nhận bản tin xem trước.",
    footerDescription: "Eden ABA Therapy cung cấp dịch vụ chăm sóc tự kỷ và liệu pháp ABA tận tâm cho trẻ em và gia đình tại Bắc Virginia.",
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
  },
};

function getTranslation(language) {
  return translations[language] || translations.en;
}

function LanguageSwitcher({ language, setLanguage }) {
  const t = getTranslation(language);

  const chooseLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("eden-language", nextLanguage);
    }
  };

  return (
    <div className="flex overflow-hidden rounded-full border border-[#49b8c8]/40 bg-white p-1 shadow-lg shadow-[#128c8c]/10">
      <button type="button" onClick={() => chooseLanguage("en")} aria-pressed={language === "en"} className={`rounded-full px-4 py-2 text-xs font-black transition ${language === "en" ? "bg-[#1f7a2e] text-white" : "text-[#0b4f4f] hover:bg-[#49b8c8]/10"}`}>
        {t.english}
      </button>
      <button type="button" onClick={() => chooseLanguage("vi")} aria-pressed={language === "vi"} className={`rounded-full px-4 py-2 text-xs font-black transition ${language === "vi" ? "bg-[#1f7a2e] text-white" : "text-[#0b4f4f] hover:bg-[#49b8c8]/10"}`}>
        {t.vietnamese}
      </button>
    </div>
  );
}

function LogoImage({ alt = "Eden ABA Therapy", className = "h-14 w-auto" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`grid place-items-center rounded-2xl bg-white px-4 py-2 text-center font-black leading-tight text-emerald-800 shadow-sm ${className}`}>
        <span className="text-sm">EDEN</span>
        <span className="text-[10px] tracking-wide">ABA THERAPY</span>
      </div>
    );
  }

  return <img src={logoPath} alt={alt} className={className} onError={() => setFailed(true)} />;
}

function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-all disabled:cursor-not-allowed disabled:opacity-60";
  const styles = {
    primary: "bg-[#1f7a2e] text-white shadow-lg shadow-[#128c8c]/20 hover:-translate-y-0.5 hover:bg-[#166326]",
    secondary: "border border-[#49b8c8]/30 bg-white/90 text-[#0b4f4f] hover:bg-[#49b8c8]/10",
    dark: "bg-[#0b4f4f] text-white hover:bg-[#083d3d]",
    gold: "bg-[#f7c72f] text-[#0b4f4f] hover:bg-[#ff8a1f] hover:text-white",
  }[variant];
  return <button type={type} {...props} className={`${base} ${styles} ${className}`}>{children}</button>;
}

function GoogleMapEmbed({ address, title = "Eden ABA Therapy Google Map", className = "h-[560px] w-full" }) {
  const encodedAddress = encodeURIComponent(address);
  const apiKey = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : "";
  const mapSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&zoom=16`
    : `https://www.google.com/maps?q=${encodedAddress}&z=16&hl=en&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-slate-100">
      <iframe
        title={title}
        src={mapSrc}
        className={className}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      {!apiKey && (
        <div className="border-t border-slate-100 bg-white p-4 text-center text-sm font-bold text-slate-600">
          For the most reliable embedded Google Map, add <span className="font-black text-slate-900">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</span> to your environment variables. You can still <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-[#128c8c] underline underline-offset-4">open Eden ABA Therapy in Google Maps</a>.
        </div>
      )}
    </div>
  );
}

function Header({ onStart, onNavigate, language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const t = getTranslation(language);

  const goToAutismAssessment = () => {
    onNavigate?.("autism-assessment");
  };
  const navLabels = {
    "Autism Evaluation": t.navAutismEvaluation,
    "ABA Therapy": t.navABATherapy,
    "Locations": t.navLocations,
    "Resources": t.navResources,
    "About Eden": t.navAboutEden,
    "Careers": t.navCareers,
  };
  return (
    <header className="sticky top-0 z-50 border-b border-[#49b8c8]/20 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <LogoImage alt="Eden ABA Therapy logo" className="h-14 w-auto" />
          <div className="hidden sm:block">
            <p className="text-lg font-black tracking-tight text-[#1f7a2e]">{t.brandName}</p>
            <p className="text-xs font-bold text-[#128c8c]">{t.brandTagline}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {menu.map((group) => {
            const isLocations = group.label === "Locations";

            return (
              <div key={navLabels[group.label] || group.label} className="group relative">
                {isLocations ? (
                  <button
                    type="button"
                    onClick={() => onNavigate?.("locations")}
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {navLabels[group.label] || group.label}
                  </button>
                ) : (
                  <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800 group-hover:bg-emerald-50 group-hover:text-emerald-900">
                    {navLabels[group.label] || group.label}
                    <ChevronDown size={15} />
                  </button>
                )}

                {!isLocations && (
                  <div className="invisible absolute left-1/2 top-12 w-[560px] -translate-x-1/2 translate-y-3 rounded-[1.4rem] border border-slate-100 bg-white p-5 opacity-0 shadow-2xl shadow-slate-900/10 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid gap-5 md:grid-cols-2">
                      {group.type === "evaluation" && (
                        <div className="overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 text-white shadow-xl">
                          <div className="border-b border-white/10 p-5">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-100">
                              Autism Evaluation
                            </p>
                            <h3 className="mt-3 text-2xl font-black leading-tight">
                              Understand the next step for your child.
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-emerald-50">
                              Parent-friendly screening tools, developmental guidance, and evaluation support.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 p-5">
                            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                              <ClipboardCheck className="text-yellow-300" size={26} />
                              <p className="mt-3 text-sm font-black">Early Screening</p>
                              <p className="mt-1 text-xs text-emerald-50">
                                M-CHAT-R & CAST online tools
                              </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                              <Users className="text-yellow-300" size={26} />
                              <p className="mt-3 text-sm font-black">Parent Guidance</p>
                              <p className="mt-1 text-xs text-emerald-50">
                                Support understanding behaviors and milestones
                              </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                              <ShieldCheck className="text-yellow-300" size={26} />
                              <p className="mt-3 text-sm font-black">Secure Intake</p>
                              <p className="mt-1 text-xs text-emerald-50">
                                Protected forms and document uploads
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={goToAutismAssessment}
                              className="rounded-2xl bg-white/10 p-4 text-left backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            >
                              <CalendarDays className="text-yellow-300" size={26} />
                              <p className="mt-3 text-sm font-black">Fast Scheduling</p>
                              <p className="mt-1 text-xs text-emerald-50">
                                Assessment coordination and next steps
                              </p>
                            </button>
                          </div>
                        </div>
                      )}

                      {group.columns.map((col) => (
                        <div key={col.title}>
                          <p className="mb-2 border-b border-slate-100 pb-2 text-xs font-black uppercase tracking-widest text-slate-500">
                            {col.title}
                          </p>

                          {col.links.map((link) => (
                            <button
                              key={link}
                              type="button"
                              onClick={() => {
                                if (link === "M-CHAT-R Online Screener") {
                                  onNavigate?.("m-chat-r-online-screener");
                                } else if (link === "What is Autism?") {
                                  if (typeof window !== "undefined") {
                                    window.history.pushState(null, "", "/what-is-autism");
                                    window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "what-is-autism" }));
                                  } else {
                                    onNavigate?.("what-is-autism");
                                  }
                                } else if (link === "What is ABA Therapy?") {
                                  onNavigate?.("aba-therapy");
                                } else if (link === "Insurance Coverage") {
                                  onNavigate?.("insurance-coverage");
                                } else if (link === "About Us") {
                                  onNavigate?.("about-us");
                                } else if (
                                  link === "Start ABA Therapy" ||
                                  link.includes("Screener") ||
                                  link.includes("Evaluation") ||
                                  link.includes("Admissions")
                                ) {
                                  onStart();
                                }
                              }}
                              className="block w-full rounded-xl px-2 py-2.5 text-left text-sm font-black text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                            >
                              {link}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button onClick={() => onStart()}>
            {t.startABA} <ArrowRight size={16} />
          </Button>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-full border border-emerald-100 p-2 xl:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-emerald-100 bg-white xl:hidden">
            <div className="grid gap-2 p-4">
              {menu.map((group) => (
                group.label === "Locations" ? (
                  <button
                    key={navLabels[group.label] || group.label}
                    type="button"
                    onClick={() => {
                      onNavigate?.("locations");
                      setOpen(false);
                    }}
                    className="rounded-2xl bg-emerald-50/50 p-3 text-left font-black text-emerald-950"
                  >
                    Locations
                  </button>
                ) : (
                  <details key={navLabels[group.label] || group.label} className="rounded-2xl bg-emerald-50/50 p-3">
                    <summary className="cursor-pointer font-black text-emerald-950">{navLabels[group.label] || group.label}</summary>
                    {group.columns.flatMap((c) => c.links).map((link) => (
                      <button
                        key={link}
                        type="button"
                        onClick={() => {
                          if (link === "M-CHAT-R Online Screener") {
                            onNavigate?.("m-chat-r-online-screener");
                          } else if (link === "What is Autism?") {
                            if (typeof window !== "undefined") {
                              window.history.pushState(null, "", "/what-is-autism");
                              window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "what-is-autism" }));
                            } else {
                              onNavigate?.("what-is-autism");
                            }
                          } else if (link === "What is ABA Therapy?") {
                            onNavigate?.("aba-therapy");
                          } else if (link === "Insurance Coverage") {
                            onNavigate?.("insurance-coverage");
                          } else if (link === "About Us") {
                            onNavigate?.("about-us");
                          } else if (
                            link === "Start ABA Therapy" ||
                            link === "Intake Checklist" ||
                            link.startsWith("Step ")
                          ) {
                            onStart();
                          }
                          setOpen(false);
                        }}
                        className="block w-full py-2 pl-3 text-left text-sm font-semibold text-slate-700"
                      >
                        {link}
                      </button>
                    ))}
                  </details>
                )
              ))}

              <div className="mt-3 flex justify-center">
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
              </div>

              <Button onClick={() => onStart()} className="mt-2 w-full">
                {t.startABA}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LocationSearchBox({ onStart, onFindCare, t = translations.en }) {
  const [query, setQuery] = useState("");

  const openLocationsPage = () => {
    if (typeof onFindCare === "function") {
      onFindCare(query);
    }

    if (typeof window !== "undefined") {
      window.location.hash = "locations";
      window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "locations" }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    openLocationsPage();
  };

  return (
    <div className="mt-10 max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-[#128c8c]/10 ring-1 ring-[#49b8c8]/30">
      <form onSubmit={handleSubmit}>
        <label className="mb-4 block text-lg font-black text-[#0b4f4f]">{t.finderTitle}</label>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600" size={22} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-4 pl-14 pr-5 text-base font-bold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder={t.finderPlaceholder}
            />
          </div>
          <a
            href="#locations"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openLocationsPage();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#1f7a2e] px-8 py-4 font-black text-white shadow-lg shadow-[#128c8c]/20 transition hover:bg-[#ff8a1f]"
          >
            {t.findCare} <ArrowRight className="ml-2 inline" size={18} />
          </a>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold text-slate-600">
        <button type="button" onClick={onStart} className="inline-flex items-center gap-2 hover:text-emerald-700">
          <CheckCircle2 size={16} className="text-emerald-600" /> {t.abaRightForMe}
        </button>
        <button type="button" onClick={onStart} className="inline-flex items-center gap-2 hover:text-emerald-700">
          <CheckCircle2 size={16} className="text-emerald-600" /> {t.asdSupport}
        </button>
      </div>
    </div>
  );
}

function AutismAwarenessCounter() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) {
    return (
      <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-black italic tracking-tight text-[#128c8c] md:text-5xl">
            Autism Awareness Counter
          </h2>
        </div>
      </section>
    );
  }

  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);
  const secondsToday = Math.max(0, Math.floor((now.getTime() - midnight.getTime()) / 1000));
  const minutesToday = secondsToday / 60;
  const birthsToday = Math.floor(minutesToday * 7);
  const estimatedAutismPrevalence = Math.floor(birthsToday / 31);
  const dayProgress = Math.min(100, (secondsToday / 86400) * 100);
  const timeLabel = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" });

  return (
    <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#49b8c8]/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#f7c72f]/25 blur-3xl" />

      <img
        src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=600&auto=format&fit=crop"
        alt="Child participating in therapy activity"
        className="pointer-events-none absolute left-6 top-24 hidden h-40 w-40 rounded-full object-cover opacity-70 shadow-2xl ring-8 ring-white lg:block xl:h-52 xl:w-52"
      />
      <img
        src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop"
        alt="Therapist supporting a child"
        className="pointer-events-none absolute right-8 bottom-24 hidden h-40 w-40 rounded-full object-cover opacity-70 shadow-2xl ring-8 ring-white lg:block xl:h-52 xl:w-52"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mx-auto inline-flex rounded-full border border-[#49b8c8]/40 bg-white px-5 py-3 text-sm font-black text-[#128c8c] shadow-lg shadow-[#128c8c]/10">
          CDC estimate: 1 in 31 children identified with autism
        </div>

        <h2 className="mt-7 text-4xl font-black italic tracking-tight text-[#128c8c] md:text-5xl">
          Autism Awareness Counter
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
          A live educational estimate created to promote autism awareness, early support, and compassionate care for children and families.
        </p>
        <p className="mt-4 text-base font-black text-[#1f7a2e]">
          Eden ABA Therapy | Awareness, Guidance, and Family-Centered Support
        </p>
        <p className="mt-5 text-2xl font-black text-[#128c8c]">
          Current Time: {timeLabel}
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">Babies Born in the U.S. Today</p>
            <p className="mt-4 text-5xl font-black text-[#128c8c]">{birthsToday.toLocaleString()}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">Estimated live count since midnight</p>
          </div>

          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">Estimated Future Autism Prevalence</p>
            <p className="mt-4 text-5xl font-black text-[#128c8c]">{estimatedAutismPrevalence.toLocaleString()}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">Based on a 1 in 31 prevalence estimate</p>
          </div>

          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">Estimated Births This Minute</p>
            <p className="mt-4 text-5xl font-black text-[#128c8c]">7</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">Approximate national average per minute</p>
          </div>

          <div className="rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <p className="text-base font-bold text-slate-700">What Early Support Can Improve</p>
            <p className="mt-4 text-3xl font-black leading-tight text-[#128c8c]">Meaningful Progress</p>
            <div className="mt-4 grid gap-1 text-sm font-semibold text-slate-600">
              <span>Communication</span>
              <span>Daily Living Skills</span>
              <span>Social Engagement</span>
              <span>Family Routines</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[1.8rem] bg-white p-6 shadow-xl shadow-[#128c8c]/10">
          <p className="font-black text-[#0b4f4f]">Day Progress</p>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-r from-[#1f7a2e] via-[#128c8c] to-[#f7c72f] transition-all duration-500" style={{ width: `${dayProgress}%` }} />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-500">{dayProgress.toFixed(1)}% of the day completed</p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[1.8rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
          <h3 className="font-black text-[#0b4f4f]">Autism Awareness Fact</h3>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-700">
            Autism awareness helps reduce stigma and promote inclusion in schools and communities.
          </p>
        </div>
      </div>
    </section>
  );
}

function Hero({ onStart, onFindCare, language }) {
  const t = getTranslation(language);
  const animatedWords = ["thrive", "smile", "achieve", "connect", "flourish"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % animatedWords.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/15">
      <div className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-[#f7c72f]/35 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#49b8c8]/35 blur-3xl" />
      <div className="absolute left-1/2 top-28 h-40 w-40 -translate-x-1/2 rounded-full bg-[#ff8a1f]/20 blur-2xl" />
      <div className="mx-auto max-w-5xl px-4 py-20 lg:px-8 lg:py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl">
          
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-[#0b4f4f] md:text-7xl">
            <span className="block">A brighter path for children</span>
            <span className="block">to grow, learn, and</span>
            <span className="inline-flex items-baseline justify-center text-[#1f7a2e]">
              <span className="relative inline-flex min-w-[7.5ch] items-baseline justify-center align-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={animatedWords[wordIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="inline-block leading-[0.95]"
                  >
                    {animatedWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
            Eden ABA Therapy provides warm, family-centered ABA support using compassionate care, clear guidance, and child-friendly therapy experiences.
          </p>
          <div className="mx-auto mt-10 max-w-3xl">
            <LocationSearchBox onStart={onStart} onFindCare={onFindCare} t={t} />
          </div>
        </motion.div>

        
      </div>
    </section>
  );
}

function LocationsPage({ t = translations.en, onStart }) {
  const [view, setView] = useState("list");
  const [distance, setDistance] = useState("20 mi");
  const location = {
    name: "Eden ABA Therapy – Annandale",
    street: "7700 Little River Turnpike",
    suite: "Suite 304",
    cityStateZip: "Annandale, VA 22003, United States",
    phone: "(703) 587-5238",
    fax: "571-445-8631",
    address: "7700 Little River Turnpike, Suite 304, Annandale, VA 22003, United States",
    hours: [
      ["Monday", "9 AM–5 PM"],
      ["Tuesday", "9 AM–5 PM"],
      ["Wednesday", "9 AM–5 PM"],
      ["Thursday", "9 AM–5 PM"],
      ["Friday", "9 AM–5 PM"],
      ["Saturday", "Closed"],
      ["Sunday", "Closed"],
    ],
  };
  const mapQuery = encodeURIComponent(location.address);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=16&hl=en&output=embed`;

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="border-b border-slate-100 bg-gradient-to-br from-white via-[#fff8df]/60 to-[#49b8c8]/10 px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Eden ABA Therapy / <span className="text-[#128c8c]">{t.navLocations}</span></p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-6xl">
            {t.locationsPageTitle}
          </h1>
          <p className="mt-5 max-w-5xl text-lg font-semibold leading-8 text-slate-700">
            {t.locationsIntro}
          </p>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-[#128c8c]/10">
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1f7a2e]" size={22} />
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-12 text-base font-bold text-slate-800 outline-none transition focus:border-[#128c8c] focus:bg-white focus:ring-4 focus:ring-[#49b8c8]/20"
                placeholder={t.currentlyUsingLocation}
                defaultValue=""
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-black text-slate-500">{t.distanceLabel}</span>
                {["5 mi", "10 mi", "20 mi", "50 mi"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDistance(option)}
                    className={`rounded-xl px-5 py-3 text-sm font-black transition ${distance === option ? "bg-[#1f7a2e] text-white shadow-lg shadow-[#1f7a2e]/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-200">
                <Filter size={17} /> {t.filters}
              </button>
            </div>

            <div className="mt-7 flex overflow-hidden rounded-t-2xl border border-slate-200 bg-slate-100 w-fit">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`px-6 py-4 text-sm font-black transition ${view === "list" ? "bg-white text-[#0b4f4f]" : "text-slate-600 hover:bg-white/70"}`}
              >
                {t.listView}
              </button>
              <button
                type="button"
                onClick={() => setView("map")}
                className={`px-6 py-4 text-sm font-black transition ${view === "map" ? "bg-white text-[#0b4f4f]" : "text-slate-600 hover:bg-white/70"}`}
              >
                {t.mapView}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {view === "map" ? (
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
              <GoogleMapEmbed address={location.address} title="Eden ABA Therapy Annandale Google Map" className="h-[560px] w-full" />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#128c8c]">Eden ABA Therapy</p>
                    <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight text-[#1f7a2e] md:text-4xl">
                      {location.name}
                    </h2>
                    <div className="mt-6 space-y-1 text-base font-semibold leading-7 text-slate-800">
                      <p>{location.street}</p>
                      <p>{location.suite}</p>
                      <p>{location.cityStateZip}</p>
                    </div>
                    <p className="mt-5 text-base font-bold text-slate-800">
                      Office Phone: <a className="text-[#1f7a2e] underline" href="tel:7035875238">{location.phone}</a>
                    </p>
                    <p className="mt-2 text-base font-bold text-slate-800">
                      Fax: <span className="text-slate-700">{location.fax}</span>
                    </p>
                  </div>
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f] shadow-sm">
                    <MapPin size={34} />
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-[#0b4f4f]">{t.hours}</h3>
                  <div className="mt-4 grid gap-2">
                    {location.hours.map(([day, time]) => (
                      <div key={day} className="flex justify-between gap-5 border-b border-slate-200 pb-2 text-sm last:border-0 last:pb-0">
                        <span className="font-black text-slate-700">{day}</span>
                        <span className="font-semibold text-slate-600">{time}</span>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="mt-4 text-sm font-black text-[#128c8c] underline underline-offset-4">
                    {t.suggestHours}
                  </button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Button variant="secondary" className="w-full">{t.locationDetails}</Button>
                  <Button onClick={onStart} className="w-full">{t.startABA}</Button>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f7c72f] px-6 py-3 text-sm font-extrabold text-[#0b4f4f] transition-all hover:bg-[#ff8a1f] hover:text-white"
                  >
                    {t.getDirections} <ExternalLink size={16} />
                  </a>
                </div>
              </article>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                <GoogleMapEmbed address={location.address} title="Eden ABA Therapy Annandale Google Map" className="h-full min-h-[520px] w-full" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function WhatIsAutismPage({ onStart, onAssessment }) {
  const sectionNav = [
    ["Overview", "what-is-autism-overview"],
    ["Early Signs", "early-signs-autism"],
    ["Communication", "communication-differences"],
    ["Sensory & Behavior", "sensory-behavior"],
    ["Causes & Myths", "causes-myths"],
    ["Diagnosis", "autism-diagnosis"],
    ["ABA Support", "aba-support"],
    ["Milestones", "developmental-milestones"],
    ["Resources", "parent-resources"],
  ];

  const heroStats = [
    ["1 in 31", "CDC estimate for children identified with autism"],
    ["Early support", "Can help families understand needs sooner"],
    ["Spectrum", "Autism looks different for every child"],
  ];

  const imageBlocks = {
    hero: ["/images/autism-family-consultation.jpg", "Family meeting with autism specialist"],
    learning: ["/images/autism-child-learning.jpg", "Child participating in learning activities"],
    community: ["/images/community-autism-support.jpg", "Families learning about developmental support"],
    observation: ["/images/early-signs-observation.jpg", "Parent observing child development"],
    social: ["/images/social-interaction-skills.jpg", "Children developing social skills"],
    language: ["/images/language-development.jpg", "Speech and communication development"],
    nonverbal: ["/images/communication-practice.jpg", "Child practicing communication skills"],
    sensory: ["/images/sensory-play-room.jpg", "Sensory play and developmental activities"],
    regulation: ["/images/emotional-regulation.jpg", "Child learning calming strategies"],
    daily: ["/images/daily-living-skills.jpg", "Child learning daily living skills"],
    school: ["/images/school-support-environment.jpg", "Child receiving classroom support"],
    family: ["/images/family-support-meeting.jpg", "Family support meeting with clinician"],
    research: ["/images/autism-research-family.jpg", "Family discussing autism research"],
    support: ["/images/individualized-support.jpg", "Individualized developmental support"],
    evaluation: ["/images/autism-evaluation.jpg", "Autism evaluation and assessment"],
    screening: ["/images/autism-screening-process.jpg", "Autism screening process"],
    aba: ["/images/aba-therapy-session.jpg", "ABA therapy session"],
    parent: ["/images/parent-training-session.jpg", "Parent training and guidance"],
    clinic: ["/images/clinic-based-therapy.jpg", "Clinic based ABA therapy setting"],
    home: ["/images/in-home-therapy.jpg", "In home therapy support"],
    progress: ["/images/autism-progress.jpg", "Developmental progress and success"],
    resources: ["/images/family-resources-center.jpg", "Family autism resources"],
    cta: ["/images/start-support-today.jpg", "Start autism support today"],
  };

  const ImageCard = ({ src, alt, className = "h-[360px]", priority = false }) => (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#ddf4f4] shadow-2xl shadow-[#128c8c]/10 ring-8 ring-white">
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className={`${className} w-full object-cover transition duration-500 hover:scale-[1.03]`} />
    </div>
  );

  const InfoCard = ({ Icon = CheckCircle2, title, text }) => (
    <article className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-[#128c8c]/10 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eef9f4] text-[#1f7a2e]"><Icon size={28} /></div>
      <h3 className="mt-5 text-xl font-black text-[#0b4f4f]">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
    </article>
  );

  const SplitSection = ({ id, eyebrow, title, children, image, reverse = false }) => (
    <section id={id} className="scroll-mt-28 px-4 py-20 lg:px-8">
      <div className={`mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 ${reverse ? "" : ""}`}>
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{eyebrow}</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{title}</h2>
          <div className="mt-6 space-y-5 text-lg font-semibold leading-9 text-slate-700">{children}</div>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <ImageCard src={image[0]} alt={image[1]} />
        </div>
      </div>
    </section>
  );

  const earlySigns = [
    [MessageCircle, "Communication", "Delayed language, reduced gestures, limited pointing, repeated words, or difficulty using communication for everyday needs."],
    [Users, "Social interaction", "Less response to name, fewer shared smiles, limited back-and-forth play, or difficulty sharing attention with caregivers."],
    [PlayCircle, "Play behaviors", "Limited pretend play, repetitive play patterns, lining up toys, or strong distress when play routines change."],
    [Sparkles, "Sensory patterns", "Strong reactions to sounds, textures, lights, movement, or seeking extra sensory input through spinning, jumping, or deep pressure."],
  ];

  const communicationCards = [
    [MessageCircle, "Verbal communication differences", "Some children use fewer words than expected, repeat words or phrases, have difficulty answering questions, or use language mainly to request preferred items."],
    [Users, "Nonverbal communication differences", "Some children may point less often, use fewer gestures, avoid showing objects, or have difficulty coordinating eye gaze, facial expressions, and body language."],
    [HeartHandshake, "Functional communication", "Support often focuses on helping a child request help, ask for breaks, make choices, share interests, and communicate safely in daily routines."],
  ];

  const behaviorCards = [
    [Sparkles, "Repetitive behaviors", "Repetitive movements, repeated sounds, lining up objects, spinning items, or repeating routines may help a child regulate or understand their environment."],
    [Star, "Restricted interests", "A child may have deep interest in specific objects, topics, videos, numbers, letters, vehicles, or routines. These interests can become strengths when supported respectfully."],
    [AlertCircle, "Emotional regulation", "Transitions, denied access, communication frustration, sensory overload, fatigue, or uncertainty may lead to distress. Support should teach coping skills and replacement communication."],
    [ClipboardCheck, "Executive function", "Planning, shifting attention, waiting, following multi-step directions, and organizing tasks may be challenging and may require visual supports or structured routines."],
  ];

  const lifeCards = [
    [Home, "Daily living skills", "Toileting, dressing, feeding, toothbrushing, handwashing, sleep routines, and safety skills may require step-by-step teaching and consistent practice."],
    [School, "School challenges", "Group instruction, transitions, peer play, waiting, classroom noise, and changes in routine can be difficult without individualized support."],
    [Users, "Autism and family life", "Families may navigate appointments, school meetings, behavior concerns, insurance questions, sibling routines, and decisions about services. Support should include caregivers."],
  ];

  const mythFacts = [
    ["Myth: Autism looks the same for every child.", "Fact: Autism is a spectrum. Children can have different strengths, challenges, communication styles, sensory needs, and levels of support."],
    ["Myth: Screening tools diagnose autism.", "Fact: Screeners can identify possible concerns, but diagnosis requires professional evaluation by a qualified clinician."],
    ["Myth: Autism is caused by parenting.", "Fact: Autism is a neurodevelopmental condition. Parenting style does not cause autism."],
    ["Myth: Children cannot make progress.", "Fact: With individualized support, many children build meaningful communication, daily living, social, and learning skills."],
  ];

  const supportLevels = [
    ["Level 1", "Requires support", "A child may communicate verbally and participate in many settings but still need help with flexibility, social communication, organization, transitions, or independence."],
    ["Level 2", "Requires substantial support", "A child may need more consistent support for communication, behavior, daily routines, social interaction, and adapting to changes."],
    ["Level 3", "Requires very substantial support", "A child may need intensive support across communication, safety, daily living, behavior regulation, and participation in everyday routines."],
  ];

  const diagnosisSteps = [
    [Search, "Screening Tools", "Screeners such as the M-CHAT-R can help identify whether follow-up may be helpful. They are not diagnostic tools and should be discussed with a pediatrician or qualified clinician."],
    [ClipboardCheck, "Developmental Evaluation", "A clinician may review developmental history, parent concerns, communication, play, sensory patterns, adaptive skills, and behavior across settings."],
    [Stethoscope, "Formal Diagnostic Assessment", "A formal evaluation may include standardized tools, observation, caregiver interview, medical history, and review of school or therapy records."],
  ];

  const therapyServices = [
    [Building2, "Clinic-Based Therapy", "A structured setting can support school readiness, communication practice, social opportunities, play development, and consistent therapy routines."],
    [Home, "In-Home Therapy", "Home-based sessions can help children practice skills during real family routines such as meals, transitions, bedtime, dressing, and play."],
    [Users, "Parent Training", "Caregiver coaching helps families use strategies consistently and confidently between therapy sessions."],
    [School, "School Support Services", "With appropriate permissions, care teams may coordinate with schools to support classroom routines, communication, safety, and generalization."],
  ];

  const milestones = [
    ["18 months", "/images/milestones-18-months.jpg", "18 month developmental milestones", ["Points to show interest", "Uses several words", "Imitates simple actions", "Looks to caregiver for reassurance"]],
    ["2 years", "/images/milestones-2-years.jpg", "2 year developmental milestones", ["Uses two-word phrases", "Follows simple directions", "Begins pretend play", "Shows interest in other children"]],
    ["3 years", "/images/milestones-3-years.jpg", "3 year developmental milestones", ["Uses short sentences", "Takes turns with help", "Plays simple make-believe", "Separates more easily from caregivers"]],
    ["4 years", "/images/milestones-4-years.jpg", "4 year developmental milestones", ["Engages in imaginative play", "Answers simple questions", "Plays with peers", "Follows multi-step routines"]],
    ["5 years", "/images/milestones-5-years.jpg", "5 year developmental milestones", ["Participates in structured learning", "Communicates needs clearly", "Shows growing independence", "Uses social problem-solving with support"]],
  ];

  const faqOne = [
    ["Is autism a medical diagnosis?", "Autism spectrum disorder is a developmental diagnosis made by qualified professionals. A diagnosis usually considers developmental history, direct observation, caregiver interview, communication, behavior, adaptive functioning, and symptoms across settings."],
    ["Can a child have autism and still make eye contact?", "Yes. Autism does not look the same for every child. Some autistic children make eye contact often, some make it inconsistently, and some find it uncomfortable or distracting."],
    ["Can autism be noticed before age two?", "Some developmental differences may be noticed in infancy or toddlerhood, while other signs become clearer later. Families should discuss concerns with a pediatrician whenever they arise."],
    ["Does a screening result confirm autism?", "No. Screening tools can identify possible concerns but cannot diagnose autism. Results should be reviewed with a pediatrician or qualified clinician."],
  ];

  const faqTwo = [
    ["What should parents do first if they are concerned?", "Write down examples of what you notice, ask your pediatrician about developmental screening, gather school or therapy records if available, and request evaluation guidance when concerns continue."],
    ["How can ABA therapy support daily life?", "ABA therapy may help children build communication, daily living skills, social interaction, play, safety, emotional regulation, and independence through individualized goals."],
    ["Does Eden ABA Therapy diagnose autism?", "Eden ABA Therapy can help families understand screening, intake, documentation, and next steps. Formal diagnosis should be completed by qualified diagnostic professionals."],
    ["Can parents be involved in therapy?", "Yes. Parent training is an important part of effective support because children use skills across home, school, clinic, and community settings."],
  ];

  return (
    <div className="bg-[#fffaf0] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#f7c72f]/40 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#128c8c]">ABA Therapy › Family Resource Center</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">What is autism?</h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
              Autism spectrum disorder is a neurodevelopmental condition that can affect communication, social interaction, learning, behavior, sensory processing, daily routines, and independence. Every autistic child has a unique profile of strengths and support needs, so families benefit from clear education, compassionate guidance, and individualized planning.
            </p>
            <div className="mt-6 rounded-[2rem] border border-[#49b8c8]/25 bg-white/90 p-5 shadow-xl shadow-[#128c8c]/10">
              <p className="font-bold leading-7 text-slate-700"><span className="font-black text-[#0b4f4f]">Parent-friendly note:</span> This page is educational and does not diagnose autism. If you have concerns, speak with your pediatrician or a qualified clinician.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={onAssessment}>Autism screening and support <ArrowRight size={18} /></Button>
              <Button variant="secondary" onClick={onStart}>Start ABA Therapy</Button>
            </div>
          </div>
          <ImageCard src={imageBlocks.hero[0]} alt={imageBlocks.hero[1]} className="h-[470px]" priority />
        </div>
        <div className="relative mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-3">
          {heroStats.map(([number, label]) => (
            <div key={number} className="rounded-[2rem] border border-[#49b8c8]/20 bg-white/85 p-6 shadow-xl shadow-[#128c8c]/10 backdrop-blur">
              <p className="text-3xl font-black text-[#1f7a2e]">{number}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#49b8c8]/10 bg-white px-4 py-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl gap-3 overflow-x-auto" aria-label="What is autism page sections">
          {sectionNav.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-[#49b8c8]/25 bg-[#eef9f4] px-4 py-2 text-sm font-black text-[#0b4f4f] transition hover:bg-[#1f7a2e] hover:text-white">{label}</a>
          ))}
        </nav>
      </section>

      <SplitSection id="what-is-autism-overview" eyebrow="Understanding autism" title="What Is Autism?" image={imageBlocks.learning}>
        <p>Autism affects how the brain develops and how a person experiences the world. It may influence communication, relationships, play, sensory processing, emotional regulation, learning, flexibility, and daily living skills.</p>
        <p>Autism is called a spectrum because support needs vary widely. One child may speak fluently but struggle with peer relationships and transitions. Another child may use few words or an AAC device and need more support with daily routines and safety.</p>
        <div className="rounded-[2rem] bg-[#eef9f4] p-6 text-base font-black leading-7 text-[#0b4f4f]">A helpful autism resource should look at the whole child: strengths, needs, family priorities, communication style, culture, school demands, and daily routines.</div>
      </SplitSection>

      <section id="how-common-is-autism" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ImageCard src={imageBlocks.community[0]} alt={imageBlocks.community[1]} />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">How common is autism?</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">Autism is increasingly recognized across families and communities</h2>
            <p className="mt-6 text-lg font-semibold leading-9 text-slate-700">Autism identification has increased over time as awareness, screening, access to evaluation, and professional understanding have improved. More families are learning that early developmental differences are worth discussing, not ignoring.</p>
            <p className="mt-4 text-lg font-semibold leading-9 text-slate-700">Prevalence estimates are population-level numbers. They do not predict an individual child’s future, but they remind communities that autism support, inclusion, and access to care matter.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Awareness", "Early screening", "Inclusive support"].map((item) => <div key={item} className="rounded-2xl bg-[#eef9f4] p-5 text-center font-black text-[#0b4f4f]">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="spectrum" className="scroll-mt-28 bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Across the spectrum</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Understanding Autism Across the Spectrum</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">Autism can include both strengths and challenges. Some children have strong memory, visual learning, pattern recognition, deep interests, honesty, creativity, or persistence. Support should reduce barriers while respecting the child’s identity and dignity.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {supportLevels.map(([level, title, text]) => (
              <article key={level} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">{level}</p>
                <h3 className="mt-3 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10"><ImageCard src={imageBlocks.support[0]} alt={imageBlocks.support[1]} className="h-[360px]" /></div>
        </div>
      </section>

      <section id="early-signs-autism" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Early signs of autism</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Early Signs of Autism</h2>
              <p className="mt-6 text-lg font-semibold leading-9 text-slate-700">Early signs may appear in communication, play, social interaction, sensory responses, or behavior. A single sign does not diagnose autism, but patterns across time and settings can signal that a developmental conversation is important.</p>
              <p className="mt-4 text-lg font-semibold leading-9 text-slate-700">Parents often notice differences during daily routines: meals, bath time, play, community outings, childcare, preschool, or transitions between activities.</p>
            </div>
            <ImageCard src={imageBlocks.observation[0]} alt={imageBlocks.observation[1]} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {earlySigns.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}
          </div>
        </div>
      </section>

      <SplitSection id="communication-differences" eyebrow="Social communication" title="Social Communication Differences" image={imageBlocks.social} reverse>
        <p>Social communication includes shared attention, gestures, facial expression, responding to name, taking turns, imitation, showing objects, and noticing how another person feels. Autistic children may communicate socially in different ways or need support learning these skills.</p>
        <p>Some children may enjoy people but struggle to start interaction. Others may interact best through movement, music, preferred toys, visual routines, or quiet one-on-one play. Support should meet the child where they are.</p>
      </SplitSection>

      <section className="bg-[#fff8df]/60 px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <ImageCard src={imageBlocks.language[0]} alt={imageBlocks.language[1]} className="h-[310px]" />
          <ImageCard src={imageBlocks.nonverbal[0]} alt={imageBlocks.nonverbal[1]} className="h-[310px]" />
          <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
            <h2 className="text-3xl font-black text-[#0b4f4f]">Verbal and Nonverbal Communication Differences</h2>
            <div className="mt-6 grid gap-4">
              {communicationCards.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="sensory-behavior" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Sensory, behavior, and regulation</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Repetitive Behaviors, Restricted Interests, Sensory Processing, and Regulation</h2>
              <p className="mt-6 text-lg font-semibold leading-9 text-slate-700">Behavior is communication. Repetition, strong interests, sensory seeking, sensory avoidance, and emotional responses may help a child cope, communicate, learn, or manage a world that feels overwhelming.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <ImageCard src={imageBlocks.sensory[0]} alt={imageBlocks.sensory[1]} className="h-[250px]" />
              <ImageCard src={imageBlocks.regulation[0]} alt={imageBlocks.regulation[1]} className="h-[250px]" />
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{behaviorCards.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}</div>
        </div>
      </section>

      <section className="bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {lifeCards.map(([Icon, title, text], index) => (
              <article key={title} className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#128c8c]/10">
                <img src={[imageBlocks.daily[0], imageBlocks.school[0], imageBlocks.family[0]][index]} alt={[imageBlocks.daily[1], imageBlocks.school[1], imageBlocks.family[1]][index]} loading="lazy" className="h-56 w-full object-cover" />
                <div className="p-7">
                  <Icon className="text-[#1f7a2e]" size={30} />
                  <h3 className="mt-4 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                  <p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="causes-myths" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <ImageCard src={imageBlocks.research[0]} alt={imageBlocks.research[1]} />
            <div className="mt-8 rounded-[2rem] bg-[#eef9f4] p-7">
              <h3 className="text-2xl font-black text-[#0b4f4f]">What Causes Autism?</h3>
              <p className="mt-3 font-semibold leading-8 text-slate-700">Autism does not have one single cause. Research suggests autism is related to differences in brain development influenced by genetics and other biological or environmental factors before or around birth. Families should avoid blame-based explanations.</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Causes, genetics, environment</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Genetics, Environmental Influences, and Common Myths</h2>
            <div className="mt-6 space-y-5 text-lg font-semibold leading-9 text-slate-700">
              <p><strong className="text-[#0b4f4f]">Genetics and autism:</strong> Genetic factors can contribute to autism likelihood, and autism can run in families. Genetics are complex and do not mean parents caused the condition.</p>
              <p><strong className="text-[#0b4f4f]">Environmental influences:</strong> Researchers study many prenatal and early developmental factors. These influences are complex and should be discussed with healthcare professionals using evidence-based information.</p>
            </div>
            <div className="mt-8 grid gap-4">
              {mythFacts.map(([myth, fact]) => (
                <article key={myth} className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
                  <h3 className="font-black text-[#0b4f4f]">{myth}</h3>
                  <p className="mt-2 font-semibold leading-7 text-slate-700">{fact}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="autism-diagnosis" className="scroll-mt-28 bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Evaluation pathway</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">How Autism Is Diagnosed</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">Diagnosis should be completed by qualified professionals. Families may move through screening, developmental evaluation, and formal diagnostic assessment depending on age, symptoms, records, and clinical recommendations.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {diagnosisSteps.map(([Icon, title, text], index) => (
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]"><Icon size={28} /></div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">Step {index + 1}</p>
                <h3 className="mt-2 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ImageCard src={imageBlocks.evaluation[0]} alt={imageBlocks.evaluation[1]} className="h-[320px]" />
            <ImageCard src={imageBlocks.screening[0]} alt={imageBlocks.screening[1]} className="h-[320px]" />
          </div>
        </div>
      </section>

      <section id="aba-support" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">ABA therapy support</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">What Is ABA Therapy and How Can It Help?</h2>
              <p className="mt-6 text-lg font-semibold leading-9 text-slate-700">Applied Behavior Analysis uses the science of learning and behavior to teach meaningful skills and reduce barriers that interfere with safety, independence, communication, and participation. A good ABA plan is individualized, ethical, compassionate, and family-centered.</p>
              <p className="mt-4 text-lg font-semibold leading-9 text-slate-700">Benefits may include stronger communication, safer replacement behaviors, daily living skills, social engagement, school readiness, and more confident family routines.</p>
            </div>
            <ImageCard src={imageBlocks.aba[0]} alt={imageBlocks.aba[1]} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{therapyServices.map(([Icon, title, text]) => <InfoCard key={title} Icon={Icon} title={title} text={text} />)}</div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ImageCard src={imageBlocks.parent[0]} alt={imageBlocks.parent[1]} className="h-[260px]" />
            <ImageCard src={imageBlocks.clinic[0]} alt={imageBlocks.clinic[1]} className="h-[260px]" />
            <ImageCard src={imageBlocks.home[0]} alt={imageBlocks.home[1]} className="h-[260px]" />
          </div>
        </div>
      </section>

      <section id="developmental-milestones" className="scroll-mt-28 bg-[#fff8df]/70 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Developmental milestones by age</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Developmental Milestones by Age</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">Milestones are general guides, not strict rules. If a child misses milestones, loses skills, or shows persistent differences in communication, play, social interaction, or daily routines, families should talk with a pediatrician.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {milestones.map(([age, src, alt, items]) => (
              <article key={age} className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#128c8c]/10">
                <img src={src} alt={alt} loading="lazy" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-black text-[#0b4f4f]">{age}</h3>
                  <ul className="mt-4 grid gap-2 text-sm font-bold leading-6 text-slate-700">
                    {items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-[#1f7a2e]" size={16} />{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">FAQ section 1</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Frequently Asked Questions About Autism</h2>
            <div className="mt-8"><ImageCard src={imageBlocks.resources[0]} alt={imageBlocks.resources[1]} className="h-[300px]" /></div>
          </div>
          <div className="grid gap-4">
            {faqOne.map(([question, answer]) => (
              <article key={question} className="rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-[#0b4f4f]">{question}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="parent-resources" className="scroll-mt-28 bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Additional parent resources</p>
              <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Parent Resources for the Next Step</h2>
              <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">Families do not have to figure out autism support alone. Helpful next steps include writing down developmental concerns, asking for screening, collecting records, contacting insurance, exploring evaluation options, and learning about therapy supports.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Ask your pediatrician about screening", "Gather school and therapy records", "Document examples of concerns", "Explore M-CHAT-R or CAST screening", "Review insurance benefits", "Request family-centered support"].map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </div>
            <ImageCard src={imageBlocks.progress[0]} alt={imageBlocks.progress[1]} />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            {faqTwo.map(([question, answer]) => (
              <article key={question} className="rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-[#0b4f4f]">{question}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{answer}</p>
              </article>
            ))}
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">FAQ section 2</p>
            <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">Questions About Support and Services</h2>
            <div className="mt-8"><ImageCard src={imageBlocks.cta[0]} alt={imageBlocks.cta[1]} className="h-[300px]" /></div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] px-4 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f7c72f]">Start autism support today</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Get clear guidance for your child’s next step.</h2>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-teal-50">Eden ABA Therapy can help families understand autism screening, ABA therapy options, parent training, insurance review, and service planning across Northern Virginia.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="gold" onClick={onAssessment}>Autism screening support</Button>
              <Button variant="secondary" onClick={onStart}>Start ABA Therapy</Button>
            </div>
          </div>
          <ImageCard src={imageBlocks.cta[0]} alt={imageBlocks.cta[1]} className="h-[360px]" />
        </div>
      </section>
    </div>
  );
}

function ABATherapyEducationPage({ onStart }) {
  const sidebarLinks = [
    ["What is ABA therapy?", "what-is-aba-therapy"],
    ["What are target behaviors in ABA?", "target-behaviors"],
    ["How does ABA therapy help?", "how-aba-helps"],
    ["Signs ABA may help", "signs-child-may-benefit"],
    ["ABA by age group", "aba-by-age-group"],
    ["Communication development", "communication-development-aba"],
    ["Reach practical goals", "practical-goals"],
    ["Progress measurement", "aba-progress-measured"],
    ["The typical ABA day", "typical-day"],
    ["First 90 days", "first-90-days-aba"],
    ["How are parents involved in ABA therapy?", "parent-involvement"],
    ["Home and school success", "home-school-success"],
    ["Is ABA therapy effective?", "effectiveness"],
    ["Myths vs facts", "aba-myths-facts"],
    ["ABA assessment process", "aba-assessment-process"],
    ["How much does ABA therapy cost?", "cost"],
    ["Parent questions", "questions-before-aba"],
  ];

  const therapyCards = [
    {
      icon: Building2,
      title: "Center-Based Therapy",
      text: "Structured therapy in a supportive clinical setting where children can practice communication, play, school readiness, social skills, and independence.",
      note: "Available through Eden ABA Therapy intake review.",
    },
    {
      icon: GraduationCap,
      title: "Eden ABA Academy",
      text: "A learning-focused program concept for children who need routines, readiness skills, peer practice, communication support, and consistent clinical oversight.",
      note: "Best matched after assessment and family consultation.",
    },
    {
      icon: Home,
      title: "ABA at Home",
      text: "In-home support helps children practice skills in daily routines such as meals, bedtime, transitions, play, safety, and communication with caregivers.",
      note: "Serving families across Northern Virginia when available.",
    },
  ];

  const skillCards = [
    [MessageCircle, "Communication skills", "Develop requesting, answering, following directions, gestures, AAC use, and spoken language when appropriate."],
    [GraduationCap, "School readiness skills", "Build imitation, matching, waiting, transitions, group routines, attention, and learning-to-learn behaviors."],
    [ShieldCheck, "Behavior support", "Teach safer replacement skills and reduce unsafe patterns such as aggression, elopement, self-injury, or severe tantrums."],
    [HeartHandshake, "Social skills", "Support turn-taking, shared play, greetings, peer interaction, conversation, and relationship-building."],
  ];

  const goalExamples = [
    "Increase functional communication to request help, breaks, toys, attention, or preferred items.",
    "Follow daily routines such as handwashing, dressing, cleaning up, waiting, and transitions.",
    "Build safe replacement behaviors for aggression, elopement, property destruction, or severe tantrums.",
    "Practice social interaction such as turn-taking, shared attention, peer play, and greetings.",
    "Improve school readiness through matching, imitation, sitting for short routines, and group participation.",
  ];

  const daySteps = [
    ["Step 1", "Warm welcome and check-in", "Your family shares updates, priorities, and any changes from home or school before the session begins.", "https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=800&auto=format&fit=crop"],
    ["Step 2", "Play-based connection", "The therapist builds rapport through preferred toys, movement, songs, games, and child-led interests.", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"],
    ["Step 3", "Skill practice", "Goals are practiced in small achievable steps, with support faded as the child becomes more independent.", "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop"],
    ["Step 4", "Natural environment teaching", "Skills are practiced during real routines, play, communication, transitions, and social opportunities.", "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop"],
    ["Step 5", "Caregiver coaching", "Parents learn practical strategies that can be used at home, in the community, and during daily routines.", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"],
    ["Step 6", "Progress review", "The BCBA reviews data, celebrates progress, and updates the treatment plan as your child’s needs change.", "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop"],
  ];

  const signsCards = [
    [MessageCircle, "Difficulty communicating needs", "Your child may become frustrated when they cannot ask for help, request a break, make choices, or tell caregivers what they need."],
    [ShieldCheck, "Safety or behavior concerns", "ABA may help when a child engages in elopement, aggression, self-injury, severe tantrums, or other unsafe patterns that need careful support."],
    [Clock3, "Hard transitions and routines", "Some children need support moving between activities, tolerating waiting, following routines, or coping when plans change."],
    [Users, "Limited play or social interaction", "ABA can help build shared attention, imitation, peer play, turn-taking, greetings, and flexible participation with others."],
  ];

  const ageGroupCards = [
    [Baby, "Toddlers", "Early ABA goals may focus on joint attention, imitation, play, early communication, responding to name, and simple daily routines."],
    [PlayCircle, "Preschool", "Preschool-age support may target school readiness, peer play, transitions, functional communication, and independence during routines."],
    [School, "School-age children", "School-age ABA may help with classroom participation, emotional regulation, social problem-solving, homework routines, and self-management."],
    [GraduationCap, "Older children", "Goals may expand toward self-advocacy, safety awareness, community skills, independence, and daily living routines."],
  ];

  const progressCards = [
    [BarChart3, "Baseline data", "The team first documents current skills and behavior patterns so progress can be compared over time."],
    [ClipboardCheck, "Session data", "Therapists collect information during teaching, play, routines, and behavior support activities."],
    [BadgeCheck, "Goal mastery", "A skill is considered mastered only when it is used consistently enough to be meaningful for daily life."],
    [FileSignature, "Treatment updates", "The BCBA reviews data and updates goals when your child needs more support, different strategies, or new challenges."],
  ];

  const assessmentSteps = [
    ["1", "Family interview", "Parents share concerns, routines, strengths, priorities, safety needs, and goals for home, school, and community."],
    ["2", "Direct observation", "The clinician observes communication, play, transitions, learning readiness, and behavior patterns."],
    ["3", "Skill review", "The team evaluates communication, adaptive skills, daily routines, social engagement, and independence."],
    ["4", "Plan development", "Findings are used to create measurable goals, recommended service intensity, and family guidance."],
  ];

  const firstNinetyDays = [
    ["Days 1–30", "Assessment, rapport, and baseline", "Your team focuses on getting to know your child, identifying motivators, collecting baseline data, and finalizing early priorities."],
    ["Days 31–60", "Skill teaching begins", "Therapy goals become more active, parent coaching starts, and the BCBA reviews early response to teaching strategies."],
    ["Days 61–90", "Refinement and progress review", "The team reviews data, adjusts goals, expands generalization, and discusses what is working across home and school routines."],
  ];

  const abaMyths = [
    ["ABA is only table work.", "Modern ABA can be play-based, naturalistic, routine-based, and built around the child’s interests."],
    ["ABA looks the same for every child.", "Ethical ABA is individualized around the child’s strengths, needs, communication style, family priorities, and culture."],
    ["ABA only reduces problem behavior.", "Many goals focus on communication, independence, safety, social participation, play, and daily living skills."],
    ["Parents are not part of ABA.", "Caregiver collaboration is essential because children need to use skills outside therapy sessions."],
  ];

  const parentQuestions = [
    ["How is progress measured?", "Ask how data is collected, reviewed, and shared with parents."],
    ["How often will goals be updated?", "A good program should review goals regularly and adjust based on data and family priorities."],
    ["How will parents be coached?", "Ask what parent training looks like, how often it occurs, and how strategies are practiced at home."],
    ["Who supervises therapy?", "Ask how often the BCBA observes sessions, reviews treatment data, and supports the therapy team."],
    ["How are school and provider teams involved?", "Ask how communication can happen with teachers, speech therapy, OT, physicians, and other providers when appropriate."],
  ];

  const relatedResources = [
    ["Autism Evaluation", "Understand screening, diagnostic guidance, and next steps.", "#autism-assessment", "Schedule an Autism Evaluation"],
    ["What Is Autism?", "Learn about autism signs, diagnosis, support levels, and family resources.", "/what-is-autism", "Read Autism Guide"],
    ["M-CHAT-R Screener", "Use a parent-friendly toddler screening tool and review score ranges.", "/m-chat-r-online-screener", "Start Screener"],
    ["Insurance Coverage", "Review Virginia insurance support, authorization, and benefits guidance.", "#insurance-coverage", "Check Insurance Coverage"],
    ["Locations", "Find Eden ABA Therapy service areas and center information.", "#locations", "Find a Center Near You"],
    ["Start Intake", "Share your family’s information and begin the next step.", "#intake", "Get Started"],
  ];

  const additionalFaqs = [
    ["How many hours of ABA therapy will my child need?", "Recommended hours depend on assessment results, medical necessity, family goals, school schedule, age, safety concerns, and insurance authorization requirements."],
    ["Can ABA therapy help with communication?", "Yes. ABA can support functional communication such as requesting help, making choices, asking for breaks, following directions, using AAC, and reducing frustration related to communication difficulties."],
    ["Can ABA support school readiness?", "ABA may help children practice waiting, transitions, following instructions, peer interaction, group routines, and learning-to-learn skills that support classroom participation."],
    ["What does a BCBA do?", "A BCBA completes assessment, designs the treatment plan, supervises therapy, reviews data, updates goals, and supports parent training."],
    ["What should I bring to the first ABA visit?", "Helpful documents include diagnosis reports, insurance cards, pediatrician notes, IEP or school records, prior therapy reports, and a list of your biggest family concerns."],
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "ABA Therapy", item: "/aba-therapy" },
        ],
      },
      {
        "@type": "MedicalWebPage",
        name: "ABA Therapy at Eden ABA Therapy",
        description: "Comprehensive parent-friendly ABA therapy guide covering assessment, goals, progress measurement, parent coaching, communication development, school readiness, and insurance next steps.",
        about: { "@type": "MedicalTherapy", name: "Applied Behavior Analysis Therapy" },
        provider: { "@type": "MedicalOrganization", name: "Eden ABA Therapy", telephone: edenBusinessInfo.phone, address: edenBusinessInfo.address },
      },
      {
        "@type": "FAQPage",
        mainEntity: additionalFaqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "Organization",
        name: "Eden ABA Therapy",
        telephone: edenBusinessInfo.phone,
        email: "info@edenabatherapy.com",
      },
    ],
  };

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-white via-emerald-50/50 to-white px-4 py-20 lg:px-8">
        <div className="absolute right-16 top-14 h-48 w-48 rounded-full bg-yellow-300/70" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div className="relative z-10">
            <p className="text-base font-bold text-slate-600">Services <span className="mx-2 text-slate-400">›</span> <span className="underline">ABA Therapy</span></p>
            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-emerald-950 md:text-7xl">
              ABA Therapy at Eden ABA Therapy
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-700">
              Eden ABA Therapy provides evidence-based Applied Behavior Analysis support for children diagnosed with autism spectrum disorder. Our programs focus on communication, independence, social engagement, safety, learning readiness, and family-centered progress.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={onStart}>Get Started <ArrowRight size={18} /></Button>
              <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Find a Center</Button>
            </div>
          </div>

          <div className="relative z-10">
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-yellow-300/80" />
            <div className="absolute -right-4 bottom-4 h-32 w-32 rounded-[2.5rem] bg-emerald-600" />
            <img
              src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop"
              alt="ABA therapy support for a child"
              className="relative h-[430px] w-full rounded-full object-cover shadow-2xl ring-8 ring-white"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-black text-emerald-950">Eden offers several types of ABA therapy for autism:</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {therapyCards.map(({ icon: Icon, title, text, note }) => (
              <article key={title} className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-1">
                <div className="flex items-center gap-5 bg-slate-50 p-6">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><Icon size={30} /></div>
                  <h3 className="text-2xl font-black text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-4">{title}</h3>
                </div>
                <div className="p-6">
                  <p className="leading-8 text-slate-700">{text}</p>
                  <p className="mt-4 font-black text-emerald-800">{note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[270px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[1.6rem] bg-white p-6 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">Categories</p>
              <nav className="grid gap-3 text-base font-semibold text-slate-700" aria-label="ABA therapy page sections">
                {sidebarLinks.map(([label, id]) => (
                  <a key={id} href={`#${id}`} className="underline-offset-4 transition hover:text-emerald-700 hover:underline">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <section id="what-is-aba-therapy" className="scroll-mt-28 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">What is ABA therapy?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Applied Behavior Analysis, often called ABA, is a research-backed therapy that uses the science of learning and behavior to help children build meaningful skills for everyday life. ABA looks at what happens before and after behavior so clinicians can understand why behavior occurs and teach safer, more effective ways to communicate and participate.
              </p>
              <p className="mt-4 text-lg leading-9 text-slate-700">
                At Eden ABA Therapy, goals are individualized and family-centered. A BCBA reviews your child’s strengths, needs, communication style, routines, safety concerns, and learning profile before creating a treatment plan.
              </p>
            </section>

            <section id="target-behaviors" className="scroll-mt-28 mt-14">
              <h3 className="text-3xl font-black text-emerald-950">What are target behaviors in ABA?</h3>
              <p className="mt-4 text-lg leading-9 text-slate-700">
                A target behavior is a skill to build or a behavior to reduce. Some goals may focus on requesting help, making eye contact when appropriate, following directions, waiting, tolerating transitions, or playing with peers. Other goals may focus on reducing aggression, self-injury, elopement, severe tantrums, or unsafe behaviors.
              </p>
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-lg font-bold leading-8 text-emerald-900">
                The purpose is not to change who your child is. The purpose is to teach useful skills, support safety, and help your child communicate needs more successfully.
              </div>
            </section>

            <section id="how-aba-helps" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">How does ABA therapy help?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy helps children develop functional skills they can use at home, school, and in the community. Families also receive guidance to support generalization across daily routines and different people.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {skillCards.map(([Icon, title, text]) => (
                  <div key={title} className="flex gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                    <Icon className="mt-1 shrink-0 text-emerald-600" size={32} />
                    <div>
                      <h3 className="text-xl font-black text-emerald-950">{title}</h3>
                      <p className="mt-2 leading-7 text-slate-700">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="signs-child-may-benefit" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">Signs Your Child May Benefit From ABA Therapy</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Families often ask when ABA therapy may be appropriate. A child may benefit when communication, safety, daily routines, school readiness, or social participation are difficult enough to affect everyday life. These signs do not replace a clinical assessment, but they can help parents decide when to ask for guidance.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {signsCards.map(([Icon, title, text]) => (
                  <article key={title} className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <Icon className="text-emerald-600" size={34} />
                    <h3 className="mt-4 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
              <div className="mt-7 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                <p className="text-lg font-black text-emerald-950">Helpful next step</p>
                <p className="mt-2 leading-8 text-slate-700">If these patterns sound familiar, Eden ABA Therapy can help your family understand intake, documentation, insurance review, and assessment planning.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={onStart}>Start ABA Therapy <ArrowRight size={18} /></Button>
                  <a href="/what-is-autism" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">Learn More About Autism</a>
                </div>
              </div>
            </section>

            <section id="aba-by-age-group" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">ABA Therapy By Age Group</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy goals should change as children grow. Younger children may focus on foundational communication and play, while older children may work on school participation, independence, self-advocacy, and life skills.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {ageGroupCards.map(([Icon, title, text]) => (
                  <article key={title} className="rounded-[1.7rem] border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
                    <Icon className="text-emerald-700" size={34} />
                    <h3 className="mt-4 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="communication-development-aba" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Communication Development Through ABA</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Communication goals in ABA are not limited to spoken words. A child may learn to request help, ask for a break, make choices, use gestures, follow directions, use AAC, or communicate emotions more safely. The goal is functional communication that reduces frustration and improves participation in daily life.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {["Requesting and choosing", "Asking for help or breaks", "Following directions", "Using AAC or visuals", "Greeting and turn-taking", "Communicating feelings"].map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </section>

            <section id="practical-goals" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Reach practical goals with ABA therapy</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                No two children are the same. A strong ABA plan uses measurable goals that matter in real life and reflect your family’s priorities.
              </p>
              <div className="mt-7 grid gap-3">
                {goalExamples.map((goal) => (
                  <div key={goal} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-lg font-bold text-slate-700 shadow-sm">
                    <CheckCircle2 className="shrink-0 text-emerald-600" />
                    {goal}
                  </div>
                ))}
              </div>
            </section>

            <section id="aba-progress-measured" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">How ABA Progress Is Measured</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy uses data to understand whether strategies are helping. Progress is not based only on impressions; the BCBA reviews patterns over time and adjusts the treatment plan when your child needs a different level of support.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {progressCards.map(([Icon, title, text]) => (
                  <article key={title} className="flex gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <Icon className="mt-1 shrink-0 text-emerald-600" size={32} />
                    <div>
                      <h3 className="text-xl font-black text-emerald-950">{title}</h3>
                      <p className="mt-2 leading-8 text-slate-700">{text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm">
                <div className="grid bg-emerald-50 text-sm font-black uppercase tracking-[0.16em] text-emerald-800 md:grid-cols-2"><div className="p-5">Initial assessment</div><div className="border-t border-emerald-100 p-5 md:border-l md:border-t-0">Ongoing progress review</div></div>
                <div className="grid md:grid-cols-2">
                  <div className="space-y-3 p-6 text-slate-700"><p>Baseline skill levels</p><p>Family interview</p><p>Observation of routines</p><p>Initial behavior patterns</p></div>
                  <div className="space-y-3 border-t border-slate-100 p-6 text-slate-700 md:border-l md:border-t-0"><p>Session data trends</p><p>Goal mastery</p><p>Parent feedback</p><p>BCBA treatment updates</p></div>
                </div>
              </div>
            </section>

            <section id="typical-day" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">What does a typical ABA therapy day look like?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                A typical day may include play, structured practice, natural environment teaching, parent updates, progress tracking, and safety planning. Each session is adjusted to your child’s needs.
              </p>
              <div className="mt-8 grid gap-5">
                {daySteps.map(([stepName, title, text, image]) => (
                  <div key={stepName} className="grid gap-5 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[210px_1fr]">
                    <img src={image} alt={title} className="h-32 w-full rounded-2xl object-cover" />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">{stepName}</p>
                      <h3 className="mt-2 text-2xl font-black text-emerald-950">{title}</h3>
                      <p className="mt-2 text-lg leading-8 text-slate-700">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="first-90-days-aba" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">What Parents Can Expect During the First 90 Days</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                The first months of ABA therapy are usually focused on learning your child’s needs, building trust, teaching early goals, and helping caregivers understand what is happening in treatment.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {firstNinetyDays.map(([label, title, text]) => (
                  <article key={label} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">{label}</p>
                    <h3 className="mt-3 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="parent-involvement" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">How are parents involved in ABA therapy?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Families play a vital role in every successful ABA program. Parent guidance helps caregivers understand strategies, practice skills during daily routines, and support progress outside therapy sessions.
              </p>
              <ul className="mt-6 space-y-3 text-lg leading-9 text-slate-700">
                <li>• Set personalized goals that reflect home, school, and community needs</li>
                <li>• Learn evidence-based strategies for transitions, safety, communication, and routines</li>
                <li>• Coordinate care with doctors, schools, speech therapy, occupational therapy, and other providers when appropriate</li>
                <li>• Build consistency so children can use skills with different people and in different places</li>
              </ul>
            </section>

            <section id="home-school-success" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">How ABA Supports Success at Home and School</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                A strong ABA program teaches skills in ways that can carry into real routines. The goal is for children to use communication, independence, safety, and social skills with different people and in different settings.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <article className="rounded-[1.8rem] bg-emerald-50 p-7 ring-1 ring-emerald-100">
                  <Home className="text-emerald-700" size={34} />
                  <h3 className="mt-4 text-2xl font-black text-emerald-950">Home routines</h3>
                  <p className="mt-3 leading-8 text-slate-700">ABA may support meals, hygiene, toileting, bedtime, chores, transitions, sibling play, and safe communication during everyday family routines.</p>
                </article>
                <article className="rounded-[1.8rem] bg-yellow-50 p-7 ring-1 ring-yellow-200">
                  <School className="text-yellow-700" size={34} />
                  <h3 className="mt-4 text-2xl font-black text-emerald-950">School readiness</h3>
                  <p className="mt-3 leading-8 text-slate-700">ABA may help children practice waiting, group instruction, following directions, peer interaction, transitions, and classroom participation.</p>
                </article>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#locations" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800">Find a Center Near You</a>
                <a href="#autism-assessment" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">Schedule an Autism Evaluation</a>
              </div>
            </section>

            <section id="effectiveness" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Is ABA therapy effective?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA is widely used to support children with autism because it uses individualized goals, ongoing progress data, parent involvement, and evidence-based teaching strategies. The best outcomes happen when treatment is personalized, compassionate, consistent, and reviewed frequently.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-black text-emerald-950">Discrete Trial Teaching</h3><p className="mt-3 leading-8 text-emerald-900">DTT breaks new skills into small steps with clear prompts, practice, feedback, and reinforcement.</p></div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-black text-emerald-950">Natural Environment Teaching</h3><p className="mt-3 leading-8 text-emerald-900">NET uses play, routines, and child interests to teach skills in real-life situations.</p></div>
              </div>
            </section>

            <section id="aba-myths-facts" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">Common ABA Therapy Myths vs Facts</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Parents deserve a clear, modern understanding of ABA therapy. These quick myth-and-fact cards help families know what ethical, individualized ABA should look like.</p>
              <div className="mt-8 grid gap-4">
                {abaMyths.map(([myth, fact]) => (
                  <details key={myth} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-emerald-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">Myth: {myth}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700"><strong>Fact:</strong> {fact}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="aba-assessment-process" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <ImageHeader image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Understanding the ABA Assessment Process</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Before therapy begins, the BCBA learns about your child’s strengths, needs, communication, routines, safety concerns, school history, and family priorities. The assessment becomes the foundation for treatment planning.</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {assessmentSteps.map(([number, title, text]) => (
                  <article key={title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-700 text-lg font-black text-white">{number}</div>
                    <h3 className="mt-4 text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="treatment-plans" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">How BCBAs Create Individualized Treatment Plans</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">A BCBA uses assessment results, family input, observation, developmental priorities, and data to create a plan that is specific, measurable, and meaningful. The plan should explain what will be taught, how progress will be measured, and how caregivers will be supported.</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {["Family priorities", "Current skill levels", "Behavior and safety needs", "Communication profile", "School and home routines", "Progress review schedule"].map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </section>

            <section id="early-intervention-benefits" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">Long-Term Benefits of Early Intervention</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Early support can help families understand developmental needs sooner and build foundational skills during important learning years. ABA therapy may support communication, daily routines, safety, play, social participation, and school readiness when goals are individualized and reviewed regularly.</p>
              <div className="mt-7 rounded-[1.7rem] border border-emerald-200 bg-emerald-50 p-6">
                <p className="text-xl font-black text-emerald-950">Early support is not about rushing a child. It is about giving the child and family practical tools sooner.</p>
              </div>
            </section>

            <section id="cost" className="scroll-mt-28 mt-16 rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
              <h2 className="text-4xl font-black text-emerald-950">How much does ABA therapy cost?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy costs depend on insurance coverage, authorization requirements, deductible, copay, coinsurance, medical necessity, provider network status, and the number of approved therapy hours. Eden ABA Therapy can help collect insurance information, review benefits, and explain next steps before services begin.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button onClick={onStart}>Get Started <ArrowRight size={18} /></Button>
                <Button variant="secondary" onClick={onStart}>Check my insurance coverage</Button>
              </div>
            </section>

            <section id="questions-before-aba" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">Questions Parents Should Ask Before Starting ABA Therapy</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Choosing an ABA provider is an important decision. These questions help families compare programs, understand supervision, and feel prepared before starting services.</p>
              <div className="mt-8 grid gap-4">
                {parentQuestions.map(([question, answer]) => (
                  <details key={question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-emerald-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">{question}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700">{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="aba-success-factors" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">Success Factors That Improve ABA Outcomes</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Meaningful progress is more likely when therapy is consistent, individualized, collaborative, and connected to real family routines.</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {["Consistent attendance", "Active parent participation", "Clear measurable goals", "BCBA supervision", "Coordination with schools and providers", "Regular data review", "Compassionate teaching", "Generalization across settings"].map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
              </div>
            </section>

            <section id="aba-additional-faq" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">Frequently Asked Questions About Starting ABA</h2>
              <div className="mt-8 grid gap-4">
                {additionalFaqs.map(([question, answer]) => (
                  <details key={question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-yellow-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">{question}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700">{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="aba-related-resources" className="scroll-mt-28 mt-16 border-t border-slate-200 pt-16">
              <h2 className="text-5xl font-black tracking-tight text-emerald-950">Related ABA Therapy Resources</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Use these related pages to continue learning, check coverage, find a center, or begin the intake process.</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {relatedResources.map(([title, text, href, cta]) => (
                  <a key={title} href={href} className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
                    <h3 className="text-2xl font-black text-emerald-950">{title}</h3>
                    <p className="mt-3 leading-8 text-slate-700">{text}</p>
                    <span className="mt-5 inline-flex font-black text-emerald-700">{cta} →</span>
                  </a>
                ))}
              </div>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}

function ImageHeader({ image, color }) {
  return (
    <div className="relative max-w-lg">
      <div className={`absolute -right-10 -top-8 h-32 w-32 ${color === "yellow" ? "rounded-full bg-yellow-300" : "rounded-[2.5rem] bg-emerald-600"}`} />
      <img src={image} alt="ABA therapy educational section" className="relative h-56 w-full rounded-[2rem] object-cover shadow-xl ring-8 ring-white" />
    </div>
  );
}

function MiniCheck({ children }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-sm font-black text-slate-700 shadow-sm">
      <CheckCircle2 className="shrink-0 text-[#1f7a2e]" size={18} />
      <span>{children}</span>
    </div>
  );
}

function AboutEdenPage({ onStart, onFindCare }) {
  const missionCards = [
    { Icon: HeartHandshake, title: "Compassionate Care", text: "We create a supportive environment where children feel safe, encouraged, and understood." },
    { Icon: ClipboardCheck, title: "Evidence-Based ABA", text: "Our therapy is guided by data, individualized goals, and proven ABA strategies that support real-life progress." },
    { Icon: Users, title: "Family Partnership", text: "We work closely with parents and caregivers so progress continues beyond therapy sessions." },
  ];

  const approachCards = [
    { Icon: Search, title: "Assessment & Goal Planning", text: "We learn about each child’s strengths, routines, and goals before creating a plan." },
    { Icon: UserRound, title: "One-on-One ABA Therapy", text: "Personalized therapy sessions focus on communication, behavior, independence, social skills, and daily living development." },
    { Icon: HeartHandshake, title: "Parent Support", text: "Families receive practical coaching and tools to help reinforce progress at home and in the community." },
    { Icon: BarChart3, title: "Progress Monitoring", text: "Our team reviews data, celebrates progress, and adjusts strategies to support ongoing growth." },
  ];

  const serveCards = [
    { Icon: Baby, title: "Early Learners", text: "Helping young children build foundational communication, play, and learning skills." },
    { Icon: School, title: "School-Age Children", text: "Supporting social development, behavior, independence, and school readiness." },
    { Icon: Users, title: "Families Seeking Autism Support", text: "Providing guidance, education, and partnership throughout the care journey." },
  ];

  const bullets = [
    "Individualized treatment plans",
    "Parent training and caregiver support",
    "Skill-building for daily life",
    "Support for communication and social development",
    "Data-guided clinical decisions",
    "Respectful, child-centered therapy",
  ];

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#f7c72f]/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#128c8c]">About Eden ABA Therapy</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">About Eden ABA Therapy</h1>
            <p className="mt-5 max-w-2xl text-2xl font-black leading-9 text-[#1f7a2e]">Compassionate autism care designed around each child and family.</p>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
              At Eden ABA Therapy, we believe every child deserves support that feels personal, respectful, and hopeful. Our team provides individualized ABA therapy services that help children build meaningful skills at home, in the clinic, and in everyday life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={onStart}>Start ABA Therapy <ArrowRight size={18} /></Button>
              <Button variant="secondary" onClick={onFindCare}>Find ABA Therapy Near Me</Button>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f7c72f]" />
            <div className="absolute -right-8 top-10 h-44 w-44 rounded-[3rem] bg-[#49b8c8]/70" />
            <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-[#ff8a1f]/80" />
            <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop" alt="Therapist helping a child during therapy" className="relative h-[440px] w-full rounded-[3rem] object-cover shadow-2xl ring-8 ring-white" />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Who We Are</p>
            <h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">Who We Are</h2>
          </div>
          <p className="text-lg font-semibold leading-9 text-slate-700">
            Eden ABA Therapy provides applied behavior analysis services for children with autism and developmental needs. Our approach combines clinical quality, family partnership, and compassionate care. Every treatment plan is built around the child’s strengths, goals, communication style, and daily routines.
          </p>
        </div>
      </section>

      <section className="bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black text-[#0b4f4f] md:text-5xl">Our Mission</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {missionCards.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]"><Icon size={28} /></div>
                <h3 className="mt-5 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <img src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop" alt="Child and therapist learning together" className="h-[420px] w-full rounded-[2.5rem] object-cover shadow-2xl" />
          <div>
            <h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">What Makes Eden Different?</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">
              Eden ABA Therapy is different because we focus on the whole child, not just a diagnosis. We look at communication, independence, behavior, daily routines, play, social skills, and family goals together. Our team uses measurable progress tracking while keeping care warm, flexible, and human.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {bullets.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8df]/60 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black text-[#0b4f4f] md:text-5xl">Our Care Approach</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approachCards.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <Icon className="text-[#1f7a2e]" size={34} />
                <h3 className="mt-5 text-xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">Who We Serve</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">Eden ABA Therapy supports children with autism and developmental delays who may need help with communication, behavior, social interaction, play skills, daily routines, school readiness, and independence.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serveCards.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-[#128c8c]/10">
                <Icon className="text-[#128c8c]" size={34} />
                <h3 className="mt-5 text-2xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 font-semibold leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 text-center shadow-2xl shadow-[#128c8c]/10 md:p-12">
          <h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">Committed to Quality ABA Care</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
            Our team is committed to ethical, respectful, and clinically guided ABA therapy. We use progress data to understand what is working, adjust treatment when needed, and celebrate every meaningful step forward.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-8 text-center text-white shadow-2xl md:p-12">
          <h2 className="text-4xl font-black md:text-5xl">Ready to learn more about Eden ABA Therapy?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-teal-50">Our team is here to guide your family through the next step with care, clarity, and compassion.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={onStart} variant="gold">Start ABA Therapy</Button>
            <Button onClick={onStart} variant="secondary">Contact Eden ABA</Button>
            <Button onClick={onFindCare} variant="dark">Find a Location</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AutismAssessmentPage({ onStart, onMchat, onCast }) {
  const assessmentSteps = [
    { Icon: ClipboardCheck, title: "Share your concerns", text: "Tell us about your child’s communication, social interaction, play, behavior, and developmental questions." },
    { Icon: FileText, title: "Review helpful documents", text: "If available, gather evaluation reports, school documents, pediatrician notes, or previous therapy information." },
    { Icon: CalendarDays, title: "Schedule assessment support", text: "Our team can help coordinate the next appropriate step for autism evaluation or ABA therapy services." },
    { Icon: HeartHandshake, title: "Plan next steps", text: "Families receive clear guidance about screening, diagnostic support, insurance review, and service options." },
  ];

  const supportCards = [
    { Icon: Baby, title: "For toddlers", text: "Families with younger children may start with a parent-completed M-CHAT-R screening tool and then discuss results with a qualified professional." },
    { Icon: GraduationCap, title: "For older children", text: "Older children may need a different screener, school documentation review, or professional diagnostic guidance." },
    { Icon: ShieldCheck, title: "Insurance guidance", text: "Eden ABA Therapy can help families understand what documentation may be useful for benefits review and authorization steps." },
  ];

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#f7c72f]/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#128c8c]">Autism Assessment Support</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">
              Schedule an autism assessment near you
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
              Eden ABA Therapy can help families understand next steps for autism evaluation and ABA therapy services. Our team offers parent-friendly guidance, screening support, intake coordination, and insurance review so families know what to prepare before care begins.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={onStart}>Get diagnostic support <ArrowRight size={18} /></Button>
              <Button variant="secondary" onClick={onMchat}>Take the M-CHAT-R</Button>
              <Button variant="secondary" onClick={onCast}>Explore CAST Screener</Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f7c72f]" />
            <img
              src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop"
              alt="Child participating in a supportive developmental activity"
              className="relative h-[440px] w-full rounded-[3rem] object-cover shadow-2xl ring-8 ring-white"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">How it works</p>
            <h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">A clear path from questions to next steps</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {assessmentSteps.map(({ Icon, title, text }, index) => (
              <article key={title} className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-[#128c8c]/10 transition hover:-translate-y-1">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eef9f4] text-[#1f7a2e]"><Icon size={28} /></div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-black text-[#0b4f4f]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">Support for different ages and needs</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
              Autism screening and evaluation planning should be matched to the child’s age, developmental history, symptoms, and family concerns. Screening tools can be helpful, but they do not diagnose autism. Families should speak with a pediatrician or qualified clinician when concerns continue.
            </p>
          </div>
          <div className="grid gap-5">
            {supportCards.map(({ Icon, title, text }) => (
              <article key={title} className="flex gap-5 rounded-[2rem] bg-white p-6 shadow-xl shadow-[#128c8c]/10">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]"><Icon size={28} /></div>
                <div>
                  <h3 className="text-2xl font-black text-[#0b4f4f]">{title}</h3>
                  <p className="mt-2 font-semibold leading-8 text-slate-700">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-8 text-center text-white shadow-2xl md:p-12">
          <h2 className="text-4xl font-black md:text-5xl">Ready for assessment guidance?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-teal-50">
            Share your family’s questions and our team will help you understand the next step for autism evaluation, ABA therapy, documentation, and insurance review.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={onStart} variant="gold">Get diagnostic support</Button>
            <Button onClick={onMchat} variant="secondary">Start M-CHAT-R</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function MChatQuestionnaire() {
  const questions = [
    [1, "If you point at something across the room, does your child look at it?", "No"],
    [2, "Have you ever wondered if your child might be deaf?", "Yes"],
    [3, "Does your child play pretend or make-believe?", "No"],
    [4, "Does your child like climbing on things?", "No"],
    [5, "Does your child make unusual finger movements near their eyes?", "Yes"],
    [6, "Does your child point with one finger to ask for something or get help?", "No"],
    [7, "Does your child point with one finger to show you something interesting?", "No"],
    [8, "Is your child interested in other children?", "No"],
    [9, "Does your child show you things by bringing them to you or holding them up?", "No"],
    [10, "Does your child respond when you call their name?", "No"],
    [11, "When you smile at your child, does your child smile back?", "No"],
    [12, "Does your child get upset by everyday noises?", "Yes"],
    [13, "Does your child walk?", "No"],
    [14, "Does your child look you in the eye when you are talking, playing, or helping them?", "No"],
    [15, "Does your child try to copy what you do?", "No"],
    [16, "If you turn your head to look at something, does your child look to see what you are looking at?", "No"],
    [17, "Does your child try to get you to watch them?", "No"],
    [18, "Does your child understand when you tell them to do something?", "No"],
    [19, "If something new happens, does your child look at your face to see how you feel about it?", "No"],
    [20, "Does your child like movement activities?", "No"],
  ];

  const [stage, setStage] = useState("intake");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [form, setForm] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    childFirstName: "",
    childDateOfBirth: "",
    zipCode: "",
    preferredLocation: "",
    consent: false,
  });

  const current = questions[index];
  const score = questions.reduce((total, [id, _question, riskAnswer]) => total + (answers[id] === riskAnswer ? 1 : 0), 0);
  const percentageScore = Math.round((score / questions.length) * 100);
  const progress = Math.round(((index + 1) / questions.length) * 100);
  const valid = form.parentFirstName && form.parentLastName && form.email.includes("@") && form.phone && form.childFirstName && form.childDateOfBirth && form.zipCode && form.preferredLocation && form.consent;
  const updateForm = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const result = score <= 2
    ? ["Lower concern", "Your responses fall in a lower-concern range. Continue monitoring development and speak with your pediatrician if concerns continue.", "bg-emerald-100 text-emerald-800", "bg-emerald-600"]
    : score <= 7
      ? ["Moderate concern", "Your responses suggest follow-up may be helpful. Consider sharing these results with your child’s pediatrician or a qualified developmental clinician.", "bg-yellow-100 text-yellow-800", "bg-yellow-500"]
      : ["Elevated concern", "Your responses fall in an elevated-concern range. A professional developmental evaluation is recommended.", "bg-orange-100 text-orange-800", "bg-orange-500"];

  const parentName = `${form.parentFirstName} ${form.parentLastName}`.trim();
  const childName = form.childFirstName.trim();
  const generatedAt = new Date();
  const reportDate = generatedAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const reportDateTime = generatedAt.toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
  const riskResponses = questions.filter(([id, _question, riskAnswer]) => answers[id] === riskAnswer);
  const nonRiskResponses = questions.length - riskResponses.length;
  const riskQuestionNumbers = riskResponses.map(([id]) => Number(id));
  const followUpAreas = [
    { label: "Joint attention and pointing", ids: [1, 6, 7, 9, 16, 17] },
    { label: "Social engagement and response", ids: [8, 10, 11, 14, 19] },
    { label: "Pretend play, imitation, and learning readiness", ids: [3, 15, 18] },
    { label: "Sensory responses and repetitive behaviors", ids: [5, 12] },
    { label: "Movement and motor participation", ids: [4, 13, 20] },
  ].filter((area) => area.ids.some((id) => riskQuestionNumbers.includes(id))).map((area) => area.label);
  const disclaimer = "The M-CHAT-R is a screening tool only. It does not diagnose autism or any medical condition. Results should be reviewed with a pediatrician or qualified clinician.";
  const fieldClass = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

  const handlePrintReport = () => {
    console.log("Print button clicked");

    const reportElement = document.getElementById("printable-report");

    if (!reportElement) {
      console.error("Printable report not found");
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=700");

    if (!printWindow) {
      console.error("Print window was blocked. Allow popups for this site, then try again.");
      window.print();
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>M-CHAT-R Screening Report</title>
          <style>
            @page { size: auto; margin: 0.5in; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 24px;
              background: #ffffff;
              color: #0f172a;
              font-family: Arial, Helvetica, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print-actions { display: none !important; }
            #printable-report {
              width: 100%;
              max-width: none;
              margin: 0;
              padding: 0;
              border: 0;
              border-radius: 0;
              box-shadow: none;
              background: #ffffff;
            }
            h2, h3, p { margin-top: 0; }
            .report-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
            .report-three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
            .report-card { border: 1px solid #dbe5e1; border-radius: 18px; padding: 16px; background: #ffffff; break-inside: avoid; }
            .report-muted { background: #f8fafc; }
            .report-title { color: #083b35; font-weight: 900; }
            .report-label { color: #64748b; font-size: 11px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; }
            .report-value { color: #083b35; font-size: 16px; font-weight: 900; margin-top: 6px; }
            .report-section { margin-top: 28px; break-inside: avoid; }
            .severity-meter { height: 16px; border-radius: 999px; overflow: hidden; background: linear-gradient(90deg, #16a34a 0 15%, #f59e0b 15% 40%, #f97316 40% 100%); position: relative; }
            .severity-marker { position: absolute; top: -4px; width: 4px; height: 24px; border-radius: 999px; background: #0f172a; }
            .donut-wrap { display: flex; gap: 22px; align-items: center; }
            .question-row { border: 1px solid #dbe5e1; border-radius: 16px; padding: 14px; margin-top: 10px; break-inside: avoid; }
            .risk-row { border-color: #fed7aa; background: #fff7ed; }
            .safe-row { border-color: #bbf7d0; background: #f0fdf4; }
            .pill { display: inline-flex; border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 900; }
            .risk-pill { background: #fed7aa; color: #9a3412; }
            .safe-pill { background: #bbf7d0; color: #166534; }
            .notes-box { min-height: 90px; border: 1px solid #cbd5e1; border-radius: 14px; padding: 14px; }
            @media print {
              body { padding: 0; }
              .report-grid, .report-three { gap: 10px; }
              .report-section { margin-top: 20px; }
            }
          </style>
        </head>
        <body>
          ${reportElement.outerHTML}
          <script>
            window.onload = function () {
              window.focus();
              window.print();
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const sendResultsToEden = () => {
    const payload = {
      parentName,
      childName,
      childDateOfBirth: form.childDateOfBirth,
      email: form.email,
      phone: form.phone,
      zipCode: form.zipCode,
      preferredLocation: form.preferredLocation,
      totalScore: score,
      riskLevel: result[0],
      percentageScore,
      recommendation: result[1],
      submittedAt: new Date().toISOString(),
    };

    // TODO: Connect this placeholder to your real Eden ABA Therapy intake email/API endpoint.
    // Example: await fetch("/api/mchat-results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (typeof window !== "undefined") {
      localStorage.setItem("eden-mchat-results-placeholder", JSON.stringify(payload));
    }
    setSendSuccess(true);
  };

  const contactEden = (event) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "intake" }));
    }
  };

  if (stage === "printReport") {
    const reportRows = [
      ["Parent name", parentName || "—"],
      ["Child name", childName || "—"],
      ["Child date of birth", form.childDateOfBirth || "—"],
      ["Email", form.email || "—"],
      ["Phone", form.phone || "—"],
      ["Zip code", form.zipCode || "—"],
      ["Preferred location", form.preferredLocation || "—"],
      ["Date/time generated", reportDateTime],
    ];

    const nextSteps = score <= 2
      ? "Lower concern: continue monitoring development and discuss concerns with your pediatrician if needed."
      : score <= 7
        ? "Moderate concern: consider pediatric follow-up or an additional developmental screening review."
        : "Elevated concern: a professional developmental evaluation is recommended.";

    const circumference = 2 * Math.PI * 46;
    const donutOffset = circumference - (percentageScore / 100) * circumference;
    const markerLeft = `${Math.min(98, Math.max(2, percentageScore))}%`;

    return (
      <section className="min-h-screen bg-slate-100 px-4 py-10 print:bg-white print:p-0 lg:px-8">
        <style>{`
          @page { size: auto; margin: 0.5in; }

          @media print {
            html,
            body {
              width: 100% !important;
              min-height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
            }

            body * {
              visibility: hidden !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            #printable-report,
            #printable-report * {
              visibility: visible !important;
            }

            #printable-report {
              display: block !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              border: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              background: #ffffff !important;
            }

            .print-hidden,
            .print-hidden * {
              display: none !important;
              visibility: hidden !important;
            }
          }
        `}</style>

        <div className="print:hidden print-hidden mx-auto mb-6 flex max-w-5xl flex-wrap gap-4">
          <button
            type="button"
            aria-label="Print this M-CHAT-R screening report"
            onClick={handlePrintReport}
            className="relative z-[10000] inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1f7a2e] px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#128c8c]/20 transition hover:bg-[#166326] focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Print This Report
          </button>
          <button
            type="button"
            onClick={() => setStage("results")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#49b8c8]/30 bg-white/90 px-6 py-3 text-sm font-extrabold text-[#0b4f4f] transition hover:bg-[#49b8c8]/10"
          >
            Back to Results
          </button>
        </div>

        <div id="printable-report" className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none md:p-10">
          <header className="border-b border-slate-200 pb-6 print:border-slate-300">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <p className="report-label text-emerald-700">Eden ABA Therapy</p>
                <h2 className="report-title mt-3 text-4xl font-black text-[#083b35]">M-CHAT-R Screening Report</h2>
                <p className="mt-3 text-sm font-bold text-slate-500">Generated on {reportDateTime}</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left print:bg-white">
                <p className="report-label">Screening result</p>
                <p className="mt-2 text-2xl font-black text-[#083b35]">{score}/20</p>
                <p className="mt-1 text-sm font-black text-emerald-800">{result[0]}</p>
              </div>
            </div>
          </header>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">Family Information</h3>
            <div className="report-grid mt-4 grid gap-4 md:grid-cols-2">
              {reportRows.map(([label, value]) => (
                <div key={label} className="report-card report-muted rounded-2xl border border-slate-200 bg-slate-50 p-4 print:bg-white">
                  <p className="report-label text-xs font-black uppercase tracking-[0.15em] text-slate-500">{label}</p>
                  <p className="report-value mt-2 text-lg font-black text-[#083b35]">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">Score Summary</h3>
            <div className="mt-4 grid gap-5 lg:grid-cols-[260px_1fr]">
              <div className="report-card rounded-[2rem] border border-slate-200 bg-white p-6">
                <div className="donut-wrap flex items-center gap-5">
                  <svg width="124" height="124" viewBox="0 0 124 124" role="img" aria-label={`Risk percentage ${percentageScore}%`}>
                    <circle cx="62" cy="62" r="46" fill="none" stroke="#e2e8f0" strokeWidth="16" />
                    <circle cx="62" cy="62" r="46" fill="none" stroke={score <= 2 ? "#16a34a" : score <= 7 ? "#f59e0b" : "#f97316"} strokeWidth="16" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={donutOffset} transform="rotate(-90 62 62)" />
                    <text x="62" y="57" textAnchor="middle" className="fill-[#083b35] text-3xl font-black">{percentageScore}%</text>
                    <text x="62" y="78" textAnchor="middle" className="fill-slate-500 text-xs font-bold">risk score</text>
                  </svg>
                  <div>
                    <p className="report-label">Total score</p>
                    <p className="report-title mt-2 text-4xl font-black text-[#083b35]">{score}/20</p>
                    <span className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-black ${result[2]}`}>{result[0]}</span>
                  </div>
                </div>
              </div>

              <div className="report-card rounded-[2rem] border border-slate-200 bg-white p-6">
                <p className="report-label">Color-coded severity meter</p>
                <div className="severity-meter relative mt-4 h-4 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500">
                  <span className="severity-marker absolute -top-1 h-6 w-1 rounded-full bg-slate-900" style={{ left: markerLeft }} />
                </div>
                <div className="mt-2 grid grid-cols-3 text-xs font-black text-slate-600">
                  <span>0–2 Lower</span>
                  <span className="text-center">3–7 Moderate</span>
                  <span className="text-right">8–20 Elevated</span>
                </div>
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{result[1]}</p>
              </div>
            </div>

            <div className="report-three mt-5 grid gap-4 md:grid-cols-4">
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">Total questions answered</p>
                <p className="report-value">20</p>
              </div>
              <div className="report-card rounded-2xl border border-orange-200 bg-orange-50 p-4 print:bg-white">
                <p className="report-label">Risk-scored answers</p>
                <p className="report-value text-orange-700">{score}</p>
              </div>
              <div className="report-card rounded-2xl border border-emerald-200 bg-emerald-50 p-4 print:bg-white">
                <p className="report-label">Non-risk answers</p>
                <p className="report-value text-emerald-700">{nonRiskResponses}</p>
              </div>
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">Risk percentage</p>
                <p className="report-value">{percentageScore}%</p>
              </div>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">Parent Response Review</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-600">Each item below shows the parent answer and whether it matched the M-CHAT-R risk-scored response for that question.</p>
            <div className="mt-4 grid gap-3">
              {questions.map(([id, question, riskAnswer]) => {
                const answer = answers[id] || "—";
                const isRisk = answer === riskAnswer;

                return (
                  <article key={id} className={`question-row rounded-2xl border p-4 ${isRisk ? "risk-row border-orange-200 bg-orange-50" : "safe-row border-emerald-200 bg-emerald-50"}`}>
                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                      <div>
                        <p className="report-label">Question {id}</p>
                        <h4 className="mt-2 text-base font-black leading-7 text-[#083b35]">{question}</h4>
                      </div>
                      <span className={`pill shrink-0 rounded-full px-3 py-1 text-xs font-black ${isRisk ? "risk-pill bg-orange-200 text-orange-800" : "safe-pill bg-emerald-200 text-emerald-800"}`}>
                        {isRisk ? "Risk-scored" : "Non-risk"}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <p className="rounded-xl bg-white/80 p-3 text-sm font-bold text-slate-700"><span className="text-slate-500">Parent answer:</span> {answer}</p>
                      <p className="rounded-xl bg-white/80 p-3 text-sm font-bold text-slate-700"><span className="text-slate-500">Risk-scored response:</span> {isRisk ? "Yes" : "No"}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">Helpful Notes for RBT/BCBA Review</h3>
            <div className="report-card mt-4 rounded-[2rem] border border-slate-200 bg-white p-6">
              <ul className="grid gap-3 text-sm font-bold leading-7 text-slate-700">
                <li>• Number of risk-scored responses: <strong>{score}</strong> out of 20.</li>
                <li>• Risk level: <strong>{result[0]}</strong>.</li>
                <li>• Areas that may need follow-up: <strong>{followUpAreas.length ? followUpAreas.join(", ") : "No specific high-risk cluster identified from this screening pattern."}</strong></li>
                <li>• This report is not a diagnosis and should not replace clinical judgment.</li>
                <li>• Review concerns with a pediatrician, qualified developmental clinician, BCBA, or intake team as appropriate.</li>
              </ul>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">Suggested Next Steps</h3>
            <div className="report-card mt-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 print:bg-white">
              <p className="text-lg font-black leading-8 text-[#083b35]">{nextSteps}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-700">Families may share this report with a pediatrician, developmental clinician, Eden ABA Therapy intake team, RBT, BCBA, or other qualified provider to support follow-up conversations.</p>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">Medical Disclaimer</h3>
            <div className="report-card mt-4 rounded-[2rem] border border-slate-200 bg-emerald-50 p-6 print:bg-white">
              <p className="text-sm font-bold leading-7 text-slate-700">{disclaimer}</p>
            </div>
          </section>

          <section className="report-section mt-8">
            <h3 className="report-title text-2xl font-black text-[#083b35]">Staff Signature / Notes</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">Reviewed by</p>
                <div className="mt-8 border-b border-slate-400" />
              </div>
              <div className="report-card rounded-2xl border border-slate-200 p-4">
                <p className="report-label">Date</p>
                <div className="mt-8 border-b border-slate-400" />
              </div>
            </div>
            <div className="notes-box mt-4 rounded-2xl border border-slate-200 p-4">
              <p className="report-label">Notes</p>
            </div>
          </section>
        </div>
      </section>
    );
  }

  if (stage === "results") {
    return (
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Screening complete</p>
          <h2 className="mt-3 text-4xl font-black text-[#083b35] md:text-5xl">Your M-CHAT-R Summary</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-slate-50 p-6">
              <p className="text-sm font-bold text-slate-500">Total score</p>
              <p className="mt-2 text-6xl font-black text-[#083b35]">{score}/20</p>
              <div className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black ${result[2]}`}>{result[0]}</div>
              <p className="mt-4 text-sm font-black text-slate-500">Percentage score: {percentageScore}%</p>
              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200"><div className={`h-full rounded-full ${result[3]}`} style={{ width: `${Math.max(6, percentageScore)}%` }} /></div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
              <h3 className="text-2xl font-black text-[#083b35]">What this means</h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">{result[1]}</p>
              <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-sm font-bold leading-7 text-slate-700">{disclaimer}</div>
            </div>
          </div>

          {sendSuccess && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-black leading-7 text-emerald-800">
              Results prepared for Eden ABA Therapy. Connect this button to your intake email/API endpoint.
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={() => { setAnswers({}); setIndex(0); setSendSuccess(false); setStage("questions"); }}>Retake Screener</Button>
            <Button variant="secondary" onClick={() => setStage("printReport")}>Print Results</Button>
            <Button variant="secondary" onClick={sendResultsToEden}>Send Results to Eden Office</Button>
            <a href="#intake" onClick={contactEden} className="rounded-full bg-[#f7c72f] px-6 py-3 font-black text-[#083b35] transition hover:bg-yellow-400">Contact Eden ABA Therapy</a>
          </div>
        </div>
      </section>
    );
  }

  if (stage === "questions") {
    return (
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-10">
          <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-700 transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="py-12 text-center">
            <p className="text-base font-black text-emerald-700">M-CHAT-R: Question {index + 1} of {questions.length}</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-tight text-[#083b35] md:text-4xl">{current[1]}</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {["No", "Yes"].map((answer) => (
                <button key={answer} type="button" onClick={() => setAnswers((old) => ({ ...old, [current[0]]: answer }))} className={`min-w-[140px] rounded-full border px-8 py-4 text-base font-black transition ${answers[current[0]] === answer ? "border-emerald-700 bg-emerald-700 text-white shadow-lg" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-600"}`}>{answer}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <Button variant="secondary" disabled={index === 0} onClick={() => setIndex((currentIndex) => Math.max(0, currentIndex - 1))}>Previous</Button>
            <p className="hidden text-sm font-black text-slate-500 sm:block">{Object.keys(answers).length} of 20 answered</p>
            <Button disabled={!answers[current[0]]} onClick={() => index === questions.length - 1 ? setStage("results") : setIndex((currentIndex) => currentIndex + 1)}>{index === questions.length - 1 ? "See Results" : "Next"}</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-20 lg:px-8">
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); if (valid) { setAnswers({}); setIndex(0); setSendSuccess(false); setStage("questions"); } }} className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Start here</p>
          <h2 className="mt-3 text-4xl font-black text-[#083b35] md:text-5xl">M-CHAT-R Autism Screening Tool</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-600">Complete the parent and child information below before beginning the 20-question screener.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={fieldClass} value={form.parentFirstName} onChange={(e) => updateForm("parentFirstName", e.target.value)} placeholder="Parent/Guardian First Name *" />
          <input className={fieldClass} value={form.parentLastName} onChange={(e) => updateForm("parentLastName", e.target.value)} placeholder="Parent/Guardian Last Name *" />
          <input className={fieldClass} type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="Email *" />
          <input className={fieldClass} value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="Phone *" />
          <input className={fieldClass} value={form.childFirstName} onChange={(e) => updateForm("childFirstName", e.target.value)} placeholder="Child First Name *" />
          <input className={fieldClass} type="date" value={form.childDateOfBirth} onChange={(e) => updateForm("childDateOfBirth", e.target.value)} />
          <input className={fieldClass} value={form.zipCode} onChange={(e) => updateForm("zipCode", e.target.value)} placeholder="Zip Code *" />
          <select className={fieldClass} value={form.preferredLocation} onChange={(e) => updateForm("preferredLocation", e.target.value)}>
            <option value="">Preferred Location *</option>
            <option value="Annandale">Annandale</option>
            <option value="Fairfax">Fairfax</option>
            <option value="Centreville / Chantilly">Centreville / Chantilly</option>
            <option value="Alexandria / Arlington">Alexandria / Arlington</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <label className="mt-5 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-bold leading-6 text-slate-700">
          <input type="checkbox" checked={form.consent} onChange={(e) => updateForm("consent", e.target.checked)} className="mt-1 h-5 w-5 accent-emerald-700" />
          <span>I consent to be contacted by Eden ABA Therapy about screening support and next steps. I understand this screener is not a diagnosis.</span>
        </label>
        {submitted && !valid && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-600">Please complete all required fields, enter a valid email, and check the consent box.</p>}
        <Button type="submit" className="mt-6 w-full">Submit & Start Screener</Button>
      </form>
    </section>
  );
}

function MChatROnlineScreenerPage({ onStart, onCast }) {
  const scrollToQuestionnaire = () => {
    document.getElementById("mchat-questionnaire")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#f7c72f]/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#128c8c]">
              Screeners › M-CHAT-R
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">
              Online M-CHAT-R Autism Screener
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
              A parent-friendly screening tool that helps identify developmental patterns that may need follow-up. The M-CHAT-R is commonly used for toddlers around 16–30 months and can help families decide whether to discuss concerns with a pediatrician or qualified clinician.
            </p>
            <div className="mt-6 rounded-[2rem] border border-[#49b8c8]/25 bg-white/90 p-5 shadow-xl shadow-[#128c8c]/10">
              <div className="flex gap-4">
                <AlertCircle className="mt-1 shrink-0 text-[#ff8a1f]" size={26} />
                <p className="font-bold leading-7 text-slate-700">
                  <span className="font-black text-[#0b4f4f]">Important:</span> The M-CHAT-R is a screening tool only. It does not diagnose autism or any medical condition.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={scrollToQuestionnaire}>
                Start M-CHAT-R Screener <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" onClick={() => document.getElementById("mchat-scoring")?.scrollIntoView({ behavior: "smooth" })}>
                Learn how scoring works
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f7c72f]" />
            <img
              src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop"
              alt="Parent and child completing a developmental screening activity"
              className="relative h-[460px] w-full rounded-[3rem] object-cover shadow-2xl ring-8 ring-white"
            />
          </div>
        </div>
      </section>

      <section id="mchat-scoring" className="scroll-mt-28 bg-[#eef9f4] px-4 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Scoring</p>
            <h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">Understanding score ranges</h2>
            <p className="mt-5 text-lg font-semibold leading-9 text-slate-700">
              Each answer that matches the risk response counts as one point. The total score ranges from 0 to 20 and is meant to guide follow-up, not provide a diagnosis.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl shadow-[#128c8c]/10">
            {[
              ["0–2", "Lower concern", "Continue monitoring development and speak with a pediatrician if concerns continue."],
              ["3–7", "Moderate concern", "Discuss results with a pediatrician or qualified developmental clinician."],
              ["8–20", "Higher concern", "A professional developmental evaluation is recommended."],
            ].map(([range, label, text]) => (
              <div key={range} className="grid gap-4 border-b border-slate-100 p-6 last:border-b-0 md:grid-cols-[120px_190px_1fr] md:items-center">
                <div className="text-3xl font-black text-[#1f7a2e]">{range}</div>
                <div className="text-xl font-black text-[#0b4f4f]">{label}</div>
                <p className="font-semibold leading-7 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mchat-questionnaire" className="scroll-mt-28">
        <MChatQuestionnaire />
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">Frequently asked questions</h2>
          </div>
          <div className="grid gap-4">
            {[
              ["What is the purpose of the M-CHAT-R?", "The M-CHAT-R helps families identify developmental patterns that may need follow-up. It can support a conversation with a pediatrician or qualified clinician."],
              ["Is the M-CHAT-R a diagnosis?", "No. The M-CHAT-R is a screening tool, not a diagnostic evaluation. A score cannot confirm autism or rule it out."],
              ["What age is it for?", "It is commonly used for toddlers around 16 to 30 months. Children outside that range may need a different screening pathway."],
              ["What should I do after a high score?", "A higher score means professional follow-up is recommended. Speak with your child’s pediatrician or a qualified developmental clinician."],
              ["Can I retake it?", "Yes. Families may retake screening later if concerns change or a clinician recommends it."],
              ["Should I talk to my pediatrician?", "Yes. If you have concerns about communication, play, social interaction, behavior, or development, talk with your pediatrician."],
            ].map(([question, answer]) => (
              <article key={question} className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-[#0b4f4f]">{question}</h3>
                <p className="mt-3 font-semibold leading-8 text-slate-700">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8df] px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 text-center shadow-xl shadow-[#128c8c]/10 md:p-12">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">Medical disclaimer</h2>
          <p className="mx-auto mt-5 max-w-4xl text-base font-semibold leading-8 text-slate-700">
            The M-CHAT-R is a screening tool only. It does not diagnose autism or any medical condition. Results should be reviewed with a pediatrician or qualified clinician.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={onStart}>Start ABA Therapy</Button>
            <Button variant="secondary" onClick={onCast}>Explore CAST Screener</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function InsuranceVerificationPage({ onSchedule, onHome, onStart }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childName: "",
    childDob: "",
    zip: "",
    provider: "",
    memberId: "",
    groupNumber: "",
    contactMethod: "Phone",
    notes: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllProviders, setShowAllProviders] = useState(false);
  const [openFaq, setOpenFaq] = useState("Does insurance cover ABA therapy in Virginia?");

  const providers = ["Aetna", "Anthem HealthKeepers Plus", "Blue Cross Blue Shield", "CareFirst", "Cigna", "Optum", "UnitedHealthcare", "UMR", "Virginia Medicaid", "Molina", "Kaiser Permanente", "TRICARE", "Humana", "Magellan", "Other Plans"];
  const visibleProviders = showAllProviders ? providers : providers.slice(0, 9);
  const required = ["firstName", "lastName", "email", "phone", "childName", "zip", "provider", "memberId"];
  const emailValid = form.email.includes("@") && form.email.includes(".");
  const complete = required.every((key) => String(form[key] || "").trim()) && emailValid && form.consent;
  const completion = Math.round(((required.filter((key) => String(form[key] || "").trim()).length + (emailValid ? 1 : 0) + (form.consent ? 1 : 0)) / (required.length + 2)) * 100);

  const update = (key, value) => {
    if (key === "phone") {
      const digits = value.replace(/[^0-9]/g, "").slice(0, 10);
      const formatted = digits.length > 6 ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}` : digits.length > 3 ? `(${digits.slice(0, 3)}) ${digits.slice(3)}` : digits;
      setForm((old) => ({ ...old, phone: formatted }));
      return;
    }
    setForm((old) => ({ ...old, [key]: value }));
  };

  const scrollToVerify = () => document.getElementById("verify-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const submit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (!complete) return;
    if (typeof window !== "undefined") localStorage.setItem("eden-insurance-coverage-request", JSON.stringify({ ...form, submittedAt: new Date().toISOString() }));
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  const fieldClass = "w-full rounded-2xl border border-[#49b8c8]/25 bg-white px-4 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#128c8c] focus:ring-4 focus:ring-[#49b8c8]/20";
  const virginiaCards = [
    [ShieldCheck, "Virginia Medicaid / DMAS", "Virginia Medicaid may cover medically necessary ABA-related behavioral therapy services for eligible children under EPSDT. Prior authorization and clinical documentation may be required. Eden ABA Therapy can help families understand what information may be needed before services begin."],
    [BadgeCheck, "Private Insurance in Virginia", "Many Virginia-regulated private insurance plans include autism-related coverage, including ABA therapy, when medically necessary. Coverage can vary by employer plan, individual plan, network status, deductible, copay, and authorization rules."],
    [ClipboardCheck, "Prior Authorization in Virginia", "Some Virginia Medicaid and private insurance plans may require authorization before ABA therapy starts. This process usually includes diagnosis information, clinical recommendations, treatment goals, and requested service hours."],
  ];
  const prepItems = ["Child’s diagnosis or evaluation documents, if available", "Insurance card", "Member ID and group number", "Parent/guardian contact information", "Pediatrician or referral information, if available", "Any previous therapy or school support documents"];
  const helpItems = ["Verify benefits", "Review in-network or out-of-network details", "Explain possible family costs", "Help with authorization steps", "Guide families through the next step toward ABA therapy"];
  const faqs = [
    ["Does insurance cover ABA therapy in Virginia?", "ABA therapy may be covered in Virginia when it is medically necessary and the child meets the plan’s requirements. Coverage may depend on diagnosis, medical necessity documentation, prior authorization, network status, Medicaid eligibility, employer plan type, deductible, copay, and coinsurance. Virginia Medicaid and Virginia-regulated private insurance plans can have different rules. Eden ABA Therapy can help review your family’s benefits and explain what the plan says before services begin."],
    ["Do I need an autism diagnosis in Virginia?", "Many Virginia Medicaid and private insurance plans may require an autism diagnosis or evaluation documentation before ABA therapy is authorized. Some plans may also request clinical recommendations, treatment goals, and records showing medical necessity. If your child is still being evaluated, Eden ABA Therapy can help you understand what documents may be helpful for the insurance review process. We cannot guarantee approval, but we can help your family prepare the information commonly requested."],
    ["What is prior authorization in Virginia?", "Prior authorization is a review step that some Virginia Medicaid and private insurance plans may require before ABA therapy begins. The plan may ask for diagnosis information, assessment results, treatment recommendations, service hours, and measurable goals. The insurance plan reviews that information before deciding whether services can be approved under the policy. Eden ABA Therapy can help families understand what may be needed and guide them through the next steps."],
    ["Will Eden ABA Therapy verify my Virginia insurance?", "Yes. Eden ABA Therapy can collect your insurance information and review benefits for Virginia families seeking ABA therapy. Our team can help explain eligibility, deductible, copay, coinsurance, network status, authorization requirements, and possible next steps. Verification gives families helpful information before starting care, but final decisions are made by the insurance plan."],
    ["Does verification guarantee coverage?", "No. Insurance verification does not guarantee payment, approval, or continued coverage in Virginia. It is an estimate based on information available from the insurance plan at the time of review. Coverage may still depend on active eligibility, diagnosis, medical necessity, prior authorization, plan exclusions, provider network status, and family cost-sharing responsibilities. Eden ABA Therapy can help explain what we learn and what steps may come next."],
    ["What if my insurance is not listed?", "If your Virginia insurance plan is not listed, you can still submit the form for review. Some plans use different network names, third-party administrators, Medicaid managed care organizations, or employer-specific benefit rules. Our team can review the information on your insurance card and help determine what questions to ask the plan. If ABA benefits are limited or unavailable, we can still discuss possible next steps and support options."],
  ];

  const MiniCheckLocal = ({ children }) => <li className="flex gap-3 text-sm font-bold leading-7 text-slate-700"><CheckCircle2 className="mt-1 shrink-0 text-[#1f7a2e]" size={18} />{children}</li>;

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[3rem] border border-[#49b8c8]/20 bg-white p-8 text-center shadow-2xl shadow-[#128c8c]/10 md:p-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#1f7a2e] text-white shadow-xl"><CheckCircle2 size={42} /></div>
          <h1 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">Your insurance information was submitted successfully!</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">Thank you for choosing Eden ABA Therapy. Our insurance verification team has received your information and will begin reviewing your benefits. We’re passionate about helping families access compassionate, effective ABA therapy with less stress and more clarity.</p>
          <p className="mt-5 rounded-[2rem] bg-[#ddf4f4]/60 p-6 font-semibold leading-8 text-slate-700">A member of our team will contact you soon to explain your coverage, answer questions, and guide you through the next step in starting services.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Button onClick={onSchedule}>Schedule Appointment</Button><Button variant="secondary" onClick={onHome}>Return Home</Button></div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Insurance Coverage</p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">Insurance Coverage for ABA Therapy</h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">Eden ABA Therapy currently serves Virginia families only. We help families review ABA therapy benefits, authorization requirements, and possible family costs with clear, compassionate guidance.</p>
            <div className="mt-8 flex flex-wrap gap-4"><Button onClick={scrollToVerify}>Verify Insurance <ArrowRight size={18} /></Button><Button variant="secondary" onClick={onStart}>Start ABA Therapy</Button></div>
            <div className="mt-8 max-w-2xl rounded-[2rem] border border-[#49b8c8]/20 bg-white/90 p-6 shadow-xl shadow-[#128c8c]/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#eef9f4] text-[#1f7a2e]">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#0b4f4f]">Virginia insurance support for ABA therapy</h2>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-700">
                    Eden ABA Therapy helps families understand insurance benefits, prior authorization requirements, Medicaid/DMAS coverage questions, and possible out-of-pocket costs before starting care.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Benefit verification guidance", "Prior authorization support", "Clear next-step planning for Virginia families"].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl bg-[#ddf4f4]/55 p-3 text-sm font-black leading-6 text-[#0b4f4f]">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#1f7a2e]" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative"><div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f7c72f]" /><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" alt="Family reviewing therapy insurance support" className="relative h-[440px] w-full rounded-[3rem] object-cover shadow-2xl ring-8 ring-white" /></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#49b8c8]/30 bg-white px-5 py-3 text-sm font-black text-[#0b4f4f] shadow-lg shadow-[#128c8c]/10"><MapPin size={18} className="text-[#1f7a2e]" /> Virginia families only</div>
              <h2 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-6xl">ABA Therapy Insurance Coverage in Virginia</h2>
              <p className="mt-6 text-lg font-semibold leading-9 text-slate-700">Coverage for ABA therapy in Virginia may depend on the child’s diagnosis, medical necessity, insurance plan type, Medicaid eligibility, prior authorization, deductible, copay, and out-of-pocket maximum.</p>
              <div className="mt-8 rounded-[2rem] border border-[#49b8c8]/20 bg-white p-6 shadow-xl shadow-[#128c8c]/10"><h3 className="text-2xl font-black text-[#0b4f4f]">What Families Should Prepare</h3><ul className="mt-5 grid gap-3">{prepItems.map((item) => <MiniCheckLocal key={item}>{item}</MiniCheckLocal>)}</ul></div>
            </div>
            <div className="grid gap-5">
              {virginiaCards.map(([Icon, title, text]) => <article key={title} className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-[#128c8c]/10"><div className="flex items-start gap-5"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#ddf4f4] to-[#fff8df] text-[#1f7a2e]"><Icon size={30} /></div><div><h3 className="text-2xl font-black text-[#0b4f4f]">{title}</h3><p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p></div></div></article>)}
              <article className="rounded-[2rem] border border-[#49b8c8]/20 bg-gradient-to-br from-white to-[#ddf4f4]/60 p-7 shadow-xl shadow-[#128c8c]/10"><h3 className="text-2xl font-black text-[#0b4f4f]">How Eden ABA Therapy Helps</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{helpItems.map((item) => <MiniCheckLocal key={item}>{item}</MiniCheckLocal>)}</div></article>
            </div>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-[#49b8c8]/20 bg-white p-6 shadow-2xl shadow-[#128c8c]/10 md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><h3 className="text-3xl font-black text-[#0b4f4f]">Insurance Plans We Can Help Review in Virginia</h3><p className="mt-3 max-w-3xl font-semibold leading-7 text-slate-700">If your plan is not listed, submit the form and our team can still review your benefits.</p></div><Button onClick={scrollToVerify}>Verify Insurance <ArrowRight size={18} /></Button></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{visibleProviders.map((provider) => <div key={provider} className="rounded-[1.4rem] border border-[#49b8c8]/20 bg-gradient-to-br from-white to-[#ddf4f4]/50 p-5 text-center font-black text-[#0b4f4f] shadow-sm"><CheckCircle2 className="mx-auto mb-3 text-[#1f7a2e]" size={22} />{provider}</div>)}</div>
            <button type="button" onClick={() => setShowAllProviders((v) => !v)} className="mt-6 w-full rounded-full border border-slate-200 bg-white px-6 py-4 font-black text-[#0b4f4f] shadow-sm transition hover:bg-[#ddf4f4]">{showAllProviders ? "Show Less" : "Show More"}</button>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#f7c72f]/70" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-[2.5rem] bg-[#49b8c8]/20" />
            <img
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop"
              alt="Child and caregiver in a supportive clinical therapy setting"
              className="relative h-[420px] w-full rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-white"
            />
          </div>

          <div className="order-1 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-900/10 md:p-8 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef9f4] px-4 py-2 text-sm font-black text-[#1f7a2e]">
              <ClipboardCheck size={18} /> Prior authorization support
            </div>
            <h2 className="mt-5 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">
              What if my insurance requires prior authorization?
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
              Some Virginia Medicaid and private insurance plans may require approval before ABA therapy begins. This review helps the insurance plan understand your child’s clinical needs, recommended therapy hours, and treatment goals before services start.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                [Stethoscope, "Clinical assessment", "A clinician reviews your child’s strengths, needs, safety concerns, and family goals."],
                [Clock3, "Recommended therapy hours", "Your care team identifies the level of support that may be clinically appropriate."],
                [FileSignature, "Documentation submission", "Insurance forms, diagnosis details, goals, and service requests may be sent for review."],
                [HeartHandshake, "Approval or next-step support", "If more information is needed, Eden helps families understand the next step."],
              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-white to-[#eef9f4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a2e] text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 rounded-[1.5rem] bg-[#fff8df] p-5 text-base font-bold leading-7 text-[#0b4f4f]">
              Eden ABA Therapy cannot guarantee authorization or coverage, but our team can help families gather information, understand plan requests, and move through the process with less stress.
            </p>

            <div className="mt-7">
              <Button onClick={scrollToVerify}>Get help with insurance <ArrowRight size={18} /></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">FAQs about ABA therapy insurance coverage</h2></div><div className="grid gap-3">{faqs.map(([question, answer]) => <div key={question} className="rounded-[1.4rem] border border-slate-100 bg-white shadow-sm"><button type="button" onClick={() => setOpenFaq(openFaq === question ? "" : question)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-[#0b4f4f]">{question}<ChevronDown className={openFaq === question ? "rotate-180 transition" : "transition"} size={20} /></button>{openFaq === question && <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-base font-medium leading-8 text-slate-700">{answer}</div>}</div>)}</div></div></section>

      <section id="verify-form" className="bg-[#fff8df] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <InsuranceVerificationForm
            onSchedule={onSchedule}
            onHome={onHome}
          />
        </div>
      </section>
    </div>
  );
}

function ServiceExplorer({ t = translations.en }) {
  const cards = (t.services || translations.en.services).map(([title, text], index) => ({
    title,
    text,
    image: [
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    ][index % 4],
  }));

  return (
    <section className="bg-white px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black italic tracking-tight text-[#128c8c] md:text-5xl">{t.serviceHeadline}</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{t.serviceSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-[1.8rem] bg-white shadow-xl shadow-[#128c8c]/10 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
              <img src={card.image} alt={card.title} className="h-44 w-full object-cover" />
              <div className="min-h-[230px] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-6 text-white">
                <h3 className="text-2xl font-black leading-tight">{card.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/90">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientReviewMarquee({ onStart, onVerifyInsurance }) {
  const reviews = [
    "Eden ABA Therapy made the intake process simple and supportive.",
    "The team helped us feel understood from the very first call.",
    "Our child is building communication skills with more confidence.",
    "The parent guidance has helped our routines at home.",
    "We felt respected, heard, and supported throughout the process.",
    "The therapists are patient, kind, and truly child-centered.",
    "Eden helped us understand ABA in a way that felt clear.",
    "Our family noticed meaningful progress in daily living skills.",
    "The care team explained every step with compassion.",
    "Scheduling and communication have been easy and professional.",
    "Our child looks forward to learning with the therapy team.",
    "We appreciate the focus on family goals and real progress.",
    "The team made insurance and next steps less stressful.",
    "Eden ABA Therapy feels warm, organized, and trustworthy.",
    "The support has helped our child with social engagement.",
    "We love how the team celebrates small wins.",
    "The treatment approach feels personalized for our child.",
    "Parent training helped us feel more confident at home.",
    "The team is responsive, caring, and professional.",
    "We are grateful for the guidance and encouragement.",
    "Our child is learning important skills in a positive way.",
    "The staff made us feel comfortable asking questions.",
    "Eden’s approach feels compassionate and family-centered.",
    "We felt supported from evaluation through care planning.",
  ];

  const firstRow = reviews.slice(0, 12);
  const secondRow = reviews.slice(12);
  const labels = ["Sample family feedback", "Parent experience highlight", "Care experience", "Family feedback"];
  const initials = ["A.", "M.", "S.", "L.", "R.", "J.", "K.", "N.", "T.", "P.", "D.", "H."];

  const ReviewCard = ({ text, index }) => (
    <article className="mx-3 w-[520px] shrink-0 rounded-[1.7rem] border border-[#49b8c8]/20 bg-white p-5 shadow-xl shadow-[#128c8c]/10 md:w-[600px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 text-[#f7c72f]">
          {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={18} fill="currentColor" />)}
        </div>
        <span className="rounded-full bg-[#ddf4f4] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#0b4f4f]">
          {labels[index % labels.length]}
        </span>
      </div>
      <p className="mt-4 truncate whitespace-nowrap overflow-hidden text-ellipsis text-base font-semibold leading-7 text-slate-700">“{text}”</p>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#1f7a2e] to-[#128c8c] text-sm font-black text-white">
          {initials[index % initials.length]}
        </div>
        <div>
          <p className="text-sm font-black text-[#0b4f4f]">Parent Review</p>
          <p className="text-xs font-bold text-slate-500">Sample family feedback</p>
        </div>
      </div>
    </article>
  );

  return (
    <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
      <style>{`
        @keyframes eden-scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes eden-scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .eden-marquee-left { animation: eden-scroll-left 46s linear infinite; }
        .eden-marquee-right { animation: eden-scroll-right 52s linear infinite; }
        .eden-marquee-wrap:hover .eden-marquee-left,
        .eden-marquee-wrap:hover .eden-marquee-right { animation-play-state: paused; }
      `}</style>
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#f7c72f]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl text-center">
        <p className="inline-flex rounded-full border border-[#49b8c8]/30 bg-white px-5 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#128c8c] shadow-sm">
          Sample family feedback
        </p>
        <h2 className="mt-5 text-4xl font-black tracking-tight text-[#0b4f4f] md:text-6xl">Families Trust Eden ABA Therapy</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
          Positive experiences from families who value compassionate, personalized ABA support.
        </p>
      </div>

      <div className="eden-marquee-wrap relative mt-12 space-y-6 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#eef9f4] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#eef9f4] to-transparent" />
        <div className="eden-marquee-left flex w-max">
          {[...firstRow, ...firstRow].map((review, index) => <ReviewCard key={`top-${index}`} text={review} index={index} />)}
        </div>
        <div className="eden-marquee-right flex w-max">
          {[...secondRow, ...secondRow].map((review, index) => <ReviewCard key={`bottom-${index}`} text={review} index={index + 12} />)}
        </div>
      </div>

      <div className="relative z-20 mt-12 flex flex-wrap justify-center gap-4">
        <Button onClick={onStart}>Start ABA Therapy <ArrowRight size={18} /></Button>
        <Button onClick={onVerifyInsurance} variant="secondary">Verify Insurance</Button>
      </div>
    </section>
  );
}

function InsurancePaymentSection({ onStart }) {
  const providers = [
    { name: "Aetna", color: "border-[#58b82e]/30 bg-[#58b82e]/10 text-[#1f7a2e]" },
    { name: "Anthem", color: "border-[#128c8c]/30 bg-[#128c8c]/10 text-[#0b4f4f]" },
    { name: "Blue Cross Blue Shield", color: "border-[#49b8c8]/40 bg-[#49b8c8]/15 text-[#0b4f4f]" },
    { name: "Optum", color: "border-[#1f7a2e]/30 bg-[#1f7a2e]/10 text-[#1f7a2e]" },
    { name: "UMR", color: "border-[#b6d930]/50 bg-[#b6d930]/20 text-[#0b4f4f]" },
    { name: "UnitedHealthcare", color: "border-[#ff8a1f]/40 bg-[#ff8a1f]/15 text-[#8a3f00]" },
    { name: "Cigna", color: "border-[#f7c72f]/60 bg-[#fff8df] text-[#0b4f4f]" },
    { name: "Virginia Medicaid", color: "border-[#49b8c8]/40 bg-[#ddf4f4] text-[#0b4f4f]" },
    { name: "More", color: "border-[#f7c72f]/70 bg-[#f7c72f]/25 text-[#0b4f4f]" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#eef9f4] px-4 py-20 lg:px-8">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#49b8c8]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#f7c72f]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-[#49b8c8]/20 bg-white shadow-2xl shadow-[#128c8c]/10">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Insurance Support</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">
              Paying for ABA therapy doesn’t have to be stressful.
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
              As a parent, you juggle a lot. Let Eden ABA Therapy help you navigate the financial side of your child’s care. Most major insurance plans may cover ABA therapy, and our team can help verify benefits, explain coverage, and coordinate insurance details on your behalf.
            </p>
            <h3 className="mt-8 text-xl font-black text-[#128c8c]">
              We can help review major insurance providers, including:
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {providers.map((provider) => (
                <span key={provider.name} className={`rounded-full border px-4 py-3 text-sm font-black shadow-sm ${provider.color}`}>
                  {provider.name}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button onClick={onStart}>Verify Insurance <ArrowRight size={18} /></Button>
              <button type="button" onClick={onStart} className="font-black text-[#128c8c] underline-offset-4 hover:underline">
                Contact us to learn more
              </button>
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-8 text-white shadow-xl">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#f7c72f] text-[#0b4f4f]">
              <ShieldCheck size={34} />
            </div>
            <h3 className="mt-6 text-3xl font-black">Insurance help for Virginia families</h3>
            <div className="mt-6 grid gap-4 text-sm font-semibold leading-7 text-teal-50">
              {[
                "Benefits review",
                "Deductible, copay, and coinsurance guidance",
                "Prior authorization support",
                "In-network and out-of-network explanation",
                "Clear next-step planning",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                  <CheckCircle2 className="shrink-0 text-[#f7c72f]" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EligibilityChecker({ t = translations.en, onStart, onAssessment }) {
  return (
    <section className="bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] px-4 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
            {t.gettingStartedTitle}
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-lg font-semibold leading-8 text-white/95">
            {t.gettingStartedP1}
          </p>

          <p className="mx-auto mt-7 max-w-4xl text-lg font-semibold leading-8 text-white/95">
            {t.gettingStartedP2}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[#0b4f4f] p-8 shadow-2xl shadow-[#0b4f4f]/30 ring-1 ring-white/10 md:p-10">
            <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-lime-300">
              <ClipboardCheck size={42} />
            </div>

            <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              {t.screeningToolsTitle}
            </h3>

            <div className="mt-8">
              <p className="text-lg font-bold text-white">{t.forToddlers}</p>
              <button
                type="button"
                onClick={() => window.location.href = "/m-chat-r-online-screener"}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f7c72f] px-7 py-4 text-base font-black text-[#0b4f4f] shadow-lg transition hover:bg-[#ff8a1f] hover:text-white"
              >
                {t.takeMchat} <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-8">
              <p className="text-lg font-bold text-white">{t.forOlderChildren}</p>
              <button
                type="button"
                onClick={() => window.location.href = "/cast"}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f7c72f] px-7 py-4 text-base font-black text-[#0b4f4f] shadow-lg transition hover:bg-[#ff8a1f] hover:text-white"
              >
                {t.takeCast} <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 text-slate-800 shadow-2xl shadow-emerald-950/20 md:p-10">
            <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-lime-600">
              <MapPin size={42} />
            </div>

            <h3 className="text-3xl font-black tracking-tight text-emerald-950 md:text-4xl">
              {t.assessmentTitle}
            </h3>

            <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">
              {t.assessmentText}
            </p>

            <button
              type="button"
              onClick={onAssessment || onStart}
              className="mt-14 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f7a2e] px-7 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#ff8a1f]"
            >
              {t.diagnosticSupport} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParentResourcesSection({ onStart }) {
  const resources = [
    [ClipboardCheck, "Autism screening tools", "Parent-friendly M-CHAT-R and CAST screening pathways for early questions and next steps."],
    [FileText, "Caregiver guides", "Simple guides for routines, communication, behavior support, insurance, and preparing documents."],
    [ShieldCheck, "Insurance verification", "A clear workflow for benefits checks, authorizations, and documents needed before ABA starts."],
    [MessageCircle, "Parent support", "Live chat, appointment requests, and intake guidance so families know what to do next."],
  ];

  return (
    <section className="bg-white px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Parent Resources</p>
          <h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">Autism resources and screening support for families</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">Helpful tools for families exploring autism support, ABA therapy, insurance coverage, and the intake process.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resources.map(([Icon, title, text]) => (
            <article key={title} className="rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white to-[#ddf4f4]/40 p-7 shadow-xl shadow-[#128c8c]/5">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff8df] text-[#ff8a1f]"><Icon size={28} /></div>
              <h3 className="mt-5 text-xl font-black text-[#0b4f4f]">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Button onClick={onStart}>Start with an intake form <ArrowRight size={18} /></Button>
        </div>
      </div>
    </section>
  );
}

function Careers({ t = translations.en }) {
  const [q, setQ] = useState("");
  const filtered = jobs.filter((j) => `${j.role} ${j.type} ${j.location} ${j.dept}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-white to-yellow-50 p-8 md:p-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-black text-emerald-700">{t.careersEyebrow}</p>
            <h2 className="mt-3 text-4xl font-black text-emerald-950">{t.careersTitle}</h2>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchJobs} className="w-full rounded-full border border-emerald-100 bg-white py-3 pl-11 pr-4 font-bold outline-none focus:border-emerald-500" />
          </div>
        </div>
        <div className="mt-8 grid gap-4">
          {filtered.map((job) => (
            <div key={job.role} className="flex flex-col justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center">
              <div><p className="text-xl font-black text-emerald-950">{job.role}</p><p className="mt-1 text-sm font-bold text-slate-600">{job.dept} • {job.type} • {job.location}</p></div>
              <Button variant="dark">{t.apply} <ExternalLink size={16} /></Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterprisePlatformSuite() {
  const [activeModule, setActiveModule] = useState("Backend + Supabase");
  const [role, setRole] = useState("Admin");
  const [leadStatus, setLeadStatus] = useState("New Intake");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "Eden Assistant",
      text: "Hi! I can help with ABA therapy, speech therapy, occupational therapy, intake, insurance, scheduling, documents, and parent questions. How can I help today?",
    },
  ]);
  const [appointment, setAppointment] = useState({ date: "", time: "" });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const modules = [
    { name: "Backend + Supabase", icon: ShieldCheck, text: "Secure form submission, database tables, server validation, encrypted records, and audit history." },
    { name: "Secure Uploads", icon: UploadCloud, text: "Insurance cards, diagnosis reports, IEPs, referrals, signed forms, and clinical documents." },
    
    { name: "Parent Portal", icon: Users, text: "Family login, appointment view, document upload, messages, signatures, and intake status tracking." },
    { name: "Staff Login + RBAC", icon: LockKeyhole, text: "Admin, BCBA, RBT, Intake, Billing, Parent, and Read Only permissions." },
    { name: "Insurance Verification", icon: CreditCard, text: "API-ready eligibility workflow with payer, member ID, DOB, authorization status, and benefits notes." },
    { name: "Appointment Scheduling", icon: CalendarDays, text: "Consultation bookings, assessment scheduling, staff availability, reminders, and calendar sync." },
    { name: "Locations + SEO", icon: MapPin, text: "City pages for Fairfax, Loudoun, Prince William, Alexandria, Arlington, Manassas, and more." },
    { name: "Blog + CMS", icon: FileText, text: "Resource articles, autism education, caregiver guides, editable content, categories, and SEO metadata." },
    { name: "Live Chat", icon: MessageCircle, text: "Website chat widget, intake support, routing, staff responses, and saved conversation history." },
    { name: "Email + SMS", icon: Mail, text: "Confirmation emails, staff alerts, SMS reminders, intake follow-ups, and no-show communication." },
    { name: "PDF + E-Sign", icon: FileSignature, text: "Electronic signature capture and PDF generation for intake summaries and consent records." },
  ];

  const pipeline = ["New Intake", "Insurance Review", "Documents Needed", "Clinical Review", "Assessment Scheduled", "Authorization Pending", "Ready to Start"];
  const cities = ["Fairfax", "Loudoun", "Prince William", "Alexandria", "Arlington", "Falls Church", "Manassas", "Centreville", "Chantilly", "Reston", "Herndon", "Woodbridge"];
  const permissions = [
    ["Admin", "Full access to dashboard, users, files, messages, billing, analytics, and settings"],
    ["BCBA", "Clinical review, treatment notes, assessment files, parent messages, and care plans"],
    ["RBT", "Assigned client schedule, session documents, and limited client information"],
    ["Intake", "Admissions pipeline, insurance review, documents, and family communication"],
    ["Billing", "Insurance, authorizations, payer data, invoices, and payment notes"],
    ["Parent", "Own child portal, uploads, forms, signatures, appointments, and messages"],
  ];

  const active = modules.find((m) => m.name === activeModule) || modules[0];
  const ActiveIcon = active.icon;

  const getChatReply = (message) => {
    const q = message.toLowerCase();

    if (q.includes("emergency") || q.includes("danger") || q.includes("suicide") || q.includes("hurt") || q.includes("911")) {
      return "If there is immediate danger or a medical emergency, call 911 right away. For urgent safety concerns, contact your child’s doctor or local emergency services. I can still help with general ABA safety planning after the immediate risk is handled.";
    }

    if (q.includes("aba") || q.includes("behavior") || q.includes("tantrum") || q.includes("hitting") || q.includes("aggression") || q.includes("elop") || q.includes("autism")) {
      return "ABA therapy focuses on understanding why behavior happens and teaching safer, more helpful replacement skills. A BCBA usually assesses communication, daily living, social skills, triggers, reinforcement, and safety needs, then creates a treatment plan. For hitting, aggression, tantrums, or elopement, the next step is usually an intake, caregiver interview, and behavior assessment.";
    }

    if (q.includes("speech") || q.includes("talk") || q.includes("language") || q.includes("communication") || q.includes("words") || q.includes("nonverbal")) {
      return "Speech therapy helps with communication, understanding language, expressive language, articulation, social communication, feeding-related oral motor skills when appropriate, and AAC supports such as picture systems or speech devices. ABA and speech therapy can work together when the child needs help requesting, following directions, social communication, or reducing frustration from communication difficulty.";
    }

    if (q.includes("occupational") || q.includes(" ot") || q.includes("sensory") || q.includes("fine motor") || q.includes("feeding") || q.includes("dressing") || q.includes("handwriting")) {
      return "Occupational therapy helps children build daily living, sensory regulation, fine motor, feeding, dressing, play, and school-readiness skills. OT is often helpful when a child has sensory sensitivities, difficulty with transitions, trouble with utensils, dressing, handwriting, or body awareness. ABA can coordinate with OT goals so skills generalize at home and school.";
    }

    if (q.includes("insurance") || q.includes("medicaid") || q.includes("authorization") || q.includes("benefit") || q.includes("coverage")) {
      return "For insurance verification, families usually provide the child’s full name, date of birth, insurance provider, member ID, policy holder information, diagnosis documentation, and sometimes a referral. The intake team can check benefits, authorization requirements, copays, deductibles, and documentation needed before starting ABA therapy.";
    }

    if (q.includes("intake") || q.includes("start") || q.includes("begin") || q.includes("apply") || q.includes("form")) {
      return "To start ABA therapy, complete the Start ABA Therapy form with parent information, child information, diagnosis status, insurance details, preferred contact method, and your main concerns. After submission, the intake team should review insurance, documents, availability, and schedule the next call or assessment.";
    }

    if (q.includes("schedule") || q.includes("appointment") || q.includes("assessment") || q.includes("availability")) {
      return "Scheduling usually depends on your child’s needs, location, insurance authorization, staff availability, and recommended service hours. The first appointments are commonly an intake call and assessment. You can share preferred days, times, school schedule, and whether you want in-home, clinic, or community support.";
    }

    if (q.includes("document") || q.includes("upload") || q.includes("diagnosis") || q.includes("iep") || q.includes("file")) {
      return "Helpful documents include the diagnosis report, insurance card, referral if required, IEP or school evaluation, prior therapy reports, medication/allergy information, and custody/legal documents if applicable. For a live website, uploads should be stored securely with access controls and audit logs.";
    }

    if (q.includes("parent") || q.includes("training") || q.includes("caregiver")) {
      return "Parent training helps caregivers use the same strategies outside therapy sessions. It can cover communication, routines, behavior prevention, reinforcement, transitions, toileting, feeding routines, safety, and how to respond consistently to challenging behaviors.";
    }

    if (q.includes("price") || q.includes("cost") || q.includes("pay") || q.includes("copay")) {
      return "Cost depends on insurance coverage, deductible, copay, coinsurance, authorization, and whether services are covered as medically necessary. The intake team should verify benefits before services begin and explain any estimated family responsibility.";
    }

    return "I can help with ABA therapy, speech therapy, occupational therapy, autism support, intake, insurance, scheduling, documents, and parent training. Please tell me your child’s age, main concern, diagnosis status, and whether you are asking about ABA, speech, OT, or starting services.";
  };

  const sendChatMessage = () => {
    const clean = chatInput.trim();
    if (!clean) return;
    const reply = getChatReply(clean);
    setChatMessages((old) => [...old, { sender: "You", text: clean }, { sender: "Eden Assistant", text: reply }]);
    setChatInput("");
  };

  return (
    <section className="bg-slate-950 px-4 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-black uppercase tracking-[0.3em] text-yellow-300">Complete Business System</p>
            <h2 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">Full custom-coded ABA platform.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This adds the architecture and working front-end foundation for backend submission, portals, dashboards, scheduling, documents, automation, analytics, SEO, and dark mode. Supabase keys and third-party API credentials are added later through environment variables.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-400/20 p-4 text-emerald-300"><ActiveIcon size={34} /></div>
              <div>
                <h3 className="text-2xl font-black">{active.name}</h3>
                <p className="mt-2 text-slate-300">{active.text}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map(({ name, icon: Icon, text }) => (
            <button
              key={name}
              type="button"
              onClick={() => setActiveModule(name)}
              className={`rounded-[1.5rem] border p-5 text-left transition ${activeModule === name ? "border-emerald-300 bg-emerald-400/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <Icon className="text-yellow-300" size={26} />
              <p className="mt-4 font-black">{name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Parent Portal</h3>
            <div className="mt-5 space-y-3 text-sm font-bold text-slate-300">
              <p>✅ Intake status: {leadStatus}</p>
              <p>✅ Uploaded documents: {Math.max(uploadedFiles.length, 2)}</p>
              <p>✅ Messages with admissions team</p>
              <p>✅ Appointment: {appointment.date || "Not scheduled"} {appointment.time}</p>
              <p>✅ E-sign consent forms</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Insurance Verification API</h3>
            <div className="mt-5 grid gap-3">
              <input className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white placeholder:text-slate-400" placeholder="Insurance payer" />
              <input className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white placeholder:text-slate-400" placeholder="Member ID" />
              <Button variant="gold">Run Eligibility Check</Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">PDF + E-Sign</h3>
            <div className="mt-5 rounded-2xl bg-white p-4 text-slate-900">
              <p className="font-black text-emerald-950">Electronic Signature</p>
              <input className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 font-bold" placeholder="Type parent/guardian signature" />
            </div>
            <Button className="mt-4 w-full">Generate Intake PDF</Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Blog / CMS System</h3>
            {[
              "What Is ABA Therapy?",
              "How Parent Training Helps",
              "Preparing for an ABA Assessment",
            ].map((post) => <p key={post} className="mt-3 rounded-2xl bg-white/10 p-4 font-bold">📝 {post}</p>)}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Email + SMS Automation</h3>
            <div className="mt-4 space-y-3 text-sm font-bold text-slate-300">
              <p>📧 Intake confirmation email</p>
              <p>📧 Staff notification email</p>
              <p>📱 Appointment reminder SMS</p>
              <p>📱 Missing document follow-up SMS</p>
              <p>📧 Authorization status update</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-black">Analytics Dashboard</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["2.4k", "Visitors"], ["184", "Leads"], ["38", "Scheduled"], ["21%", "Conversion"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 p-4 text-center"><p className="text-2xl font-black text-yellow-300">{n}</p><p className="text-sm text-slate-300">{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveChatAssistant({ t = translations.en }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "Eden Assistant",
      text: t.chatGreeting,
    },
  ]);

  const answerQuestion = (question) => {
    const q = question.toLowerCase();

    if (q.includes("emergency") || q.includes("911") || q.includes("danger") || q.includes("suicide") || q.includes("kill") || q.includes("hurt himself") || q.includes("hurt herself")) {
      return "If there is immediate danger, call 911 now. If your child may hurt themselves or someone else, stay close only if it is safe, remove dangerous items if possible, and contact emergency services or your child’s doctor. I can help with general safety planning, but emergencies need live professional help immediately.";
    }

    if (q.includes("what is aba") || q.includes("aba therapy") || q.includes("applied behavior") || q.includes("behavior therapy")) {
      return "ABA therapy, or Applied Behavior Analysis, is an evidence-based approach that helps children build communication, social, daily living, play, learning, and safety skills. A BCBA studies what happens before and after behavior, then creates a plan to teach replacement skills and reduce unsafe or interfering behaviors.";
    }

    if (q.includes("hit") || q.includes("hitting") || q.includes("aggression") || q.includes("bite") || q.includes("biting") || q.includes("tantrum") || q.includes("meltdown") || q.includes("throw")) {
      return "For hitting, biting, tantrums, or aggression, the first step is to understand the reason: escape, attention, access to items, sensory needs, pain, communication frustration, or transitions. ABA usually teaches a replacement skill like requesting a break, asking for help, waiting, using words/AAC, or calming routines. If the behavior is dangerous, a BCBA should complete a behavior assessment and safety plan.";
    }

    if (q.includes("speech") || q.includes("talk") || q.includes("language") || q.includes("nonverbal") || q.includes("communication") || q.includes("aac")) {
      return "Speech therapy helps with communication. It may support expressive language, understanding directions, articulation, social communication, requesting, answering questions, and AAC tools like picture communication or speech devices. ABA and speech can work together when a child’s behavior is connected to communication frustration.";
    }

    if (q.includes("occupational") || q.includes(" ot") || q.includes("sensory") || q.includes("fine motor") || q.includes("handwriting") || q.includes("feeding") || q.includes("dressing") || q.includes("toilet")) {
      return "Occupational therapy helps children with daily living and sensory-motor skills. OT may support sensory regulation, fine motor skills, feeding, dressing, toileting routines, handwriting, body awareness, play skills, and school readiness. ABA can coordinate with OT by helping the child practice these skills consistently across home, clinic, and school.";
    }

    if (q.includes("insurance") || q.includes("medicaid") || q.includes("anthem") || q.includes("aetna") || q.includes("cigna") || q.includes("united") || q.includes("coverage") || q.includes("authorization") || q.includes("copay")) {
      return "For insurance verification, the intake team usually needs the child’s full name, date of birth, insurance company, member ID, policy holder name/date of birth, diagnosis report, and sometimes a referral. After that, benefits are checked for ABA coverage, deductible, copay, coinsurance, authorization requirements, and approved service hours.";
    }

    if (q.includes("start") || q.includes("intake") || q.includes("begin") || q.includes("apply") || q.includes("enroll") || q.includes("form")) {
      return "To start ABA therapy, complete the Start ABA Therapy form with parent name, child name, birthdate, phone, email, diagnosis status, state, and your main concerns. After submission, the admissions team should review your information, verify insurance, request documents, and schedule an intake call or assessment.";
    }

    if (q.includes("assessment") || q.includes("schedule") || q.includes("appointment") || q.includes("availability") || q.includes("hours")) {
      return "The usual process is: intake call, document review, insurance verification, assessment scheduling, BCBA assessment, treatment plan, insurance authorization, then therapy start. Scheduling depends on location, staff availability, insurance approval, and recommended hours.";
    }

    if (q.includes("document") || q.includes("upload") || q.includes("diagnosis") || q.includes("iep") || q.includes("evaluation") || q.includes("referral")) {
      return "Helpful documents include the autism diagnosis report, insurance card front/back, referral if required, IEP or school evaluation, prior therapy reports, medication/allergy list, custody/legal documents if applicable, and any recent developmental or psychological evaluations.";
    }

    if (q.includes("parent training") || q.includes("caregiver") || q.includes("parents help") || q.includes("home")) {
      return "Parent training teaches caregivers how to use ABA strategies during daily routines. It can include communication practice, reinforcement, transitions, reducing problem behavior, bedtime routines, toileting, feeding routines, safety, and helping the child generalize skills outside therapy sessions.";
    }

    if (q.includes("cost") || q.includes("price") || q.includes("pay") || q.includes("expensive")) {
      return "The cost depends on the insurance plan, deductible, copay, coinsurance, authorization, and whether ABA is covered as medically necessary. The best next step is to verify benefits before services start so the family understands any expected responsibility.";
    }

    if (q.includes("school") || q.includes("iep") || q.includes("teacher")) {
      return "ABA can support school-related goals by helping with communication, transitions, behavior plans, social skills, classroom readiness, and daily routines. ABA does not replace the school IEP team, but the BCBA can often coordinate with caregivers and school providers when releases are signed.";
    }

    return "I can help with ABA therapy, speech therapy, occupational therapy, intake, insurance, scheduling, documents, parent training, behavior concerns, and autism support. Please tell me the child’s age, main concern, and whether you are asking about ABA, speech, OT, insurance, or starting services.";
  };

  

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {open && (
        <div className="mb-3 w-[370px] overflow-hidden rounded-[2rem] border border-emerald-100 bg-white text-slate-900 shadow-2xl sm:w-[420px]">
          <div className="bg-emerald-800 p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-black">{t.edenAssistant}</h3>
                <p className="text-xs font-bold text-emerald-50">{t.chatSupport}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2"><X size={16} /></button>
            </div>
            </div>

          <div ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }} className="max-h-96 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={`rounded-2xl p-3 text-sm leading-6 ${msg.sender === "You" ? "ml-10 bg-emerald-700 text-white" : "mr-6 bg-white text-slate-800 shadow-sm"}`}>
                <p className="mb-1 text-xs font-black opacity-70">{msg.sender === "You" ? t.you : msg.sender}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          {isTyping && <div className="mr-6 rounded-2xl bg-white p-3 text-sm font-bold text-slate-500 shadow-sm">{t.typing}</div>}
          </div>

          <div className="border-t border-slate-100 bg-white p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const clean = input.trim();
                if (!clean) return;
                setIsTyping(true);
                const reply = answerQuestion(clean);
                setTimeout(() => {
                  setMessages((old) => [...old, { sender: "You", text: clean }, { sender: "Eden Assistant", text: reply }]);
                  setInput("");
                  setIsTyping(false);
                }, 400);
              }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                className="min-h-20 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                placeholder={t.chatPlaceholder}
              />
              <button type="submit" className="mt-3 w-full rounded-full bg-emerald-700 px-6 py-3 text-sm font-black text-white hover:bg-emerald-800">
                {t.sendMessage}
              </button>
            </form>
            <p className="mt-3 text-center text-[11px] leading-4 text-slate-500">{t.emergencyNote}</p>
          </div>
        </div>
      )}

      <button type="button" onClick={() => setOpen(!open)} className="rounded-full bg-yellow-400 px-6 py-4 font-black text-emerald-950 shadow-2xl">
        💬 {t.liveChat}
      </button>
    </div>
  );
}

function IntakePage({ t = translations.en }) {
  const intakeSections = [
    {
      title: "Basic Information",
      subtitle: "Let’s start with basic information about the child, parent/guardian, referral source, and requested services.",
      icon: FileText,
      fields: [
        ["Child Legal Full Name", "text", "First Middle Last"],
        ["Preferred Name", "text", "Optional"],
        ["Date of Birth", "date", ""],
        ["Gender", "select", "Male|Female|Other|Prefer not to say"],
        ["Child Primary Language", "text", "English, Vietnamese, Spanish, etc."],
        ["Street Address", "text", "Enter street address"],
        ["City", "text", "City"],
        ["State", "select", "VA|MD|DC|Other"],
        ["ZIP Code", "text", "ZIP Code"],
        ["Parent / Guardian Full Name", "text", "First and Last Name"],
        ["Relationship to Child", "select", "Mother|Father|Guardian|Grandparent|Other"],
        ["Primary Phone Number", "tel", "(703) 000-0000"],
        ["Primary Email Address", "email", "name@example.com"],
        ["Emergency Contact Name", "text", "Name"],
        ["Emergency Contact Phone", "tel", "Phone"],
        ["Preferred Service Location", "select", "Home|Clinic|School/Daycare|Telehealth|Not Sure"],
      ],
      note: "Required fields are marked with an asterisk in the final intake build. A team member will contact the family after submission.",
    },
    {
      title: "Medical Insurance",
      subtitle: "Collect diagnosis, provider, medication, allergy, safety, and insurance information for intake review.",
      icon: ShieldCheck,
      fields: [
        ["Primary Diagnosis / Reason for Referral", "select", "Autism Spectrum Disorder|Developmental Delay|Behavior Concerns|Speech Delay|Other"],
        ["Date of Diagnosis", "date", ""],
        ["Diagnosing Provider / Facility", "text", "Provider name"],
        ["Primary Physician / Pediatrician", "text", "Doctor name"],
        ["Physician Phone Number", "tel", "Phone"],
        ["Current Medications", "textarea", "Medication, dosage, schedule"],
        ["Allergies", "textarea", "Food, medication, environmental, etc."],
        ["Seizure or Neurological Concerns", "select", "Yes|No|Not Sure"],
        ["Insurance Provider", "select", "Aetna|Anthem|Blue Cross Blue Shield|Cigna|Medicaid|United Healthcare|Tricare|Other"],
        ["Member ID / Policy ID", "text", "Member ID"],
        ["Group Number", "text", "Optional"],
        ["Policy Holder Name", "text", "Name"],
        ["Policy Holder Date of Birth", "date", ""],
        ["Insurance Phone Number", "tel", "Phone"],
      ],
      note: "Families should have the insurance card, diagnosis report, and any referral ready for upload later.",
    },
    {
      title: "Legal Consent",
      subtitle: "Review legal guardian information, court orders, HIPAA, ABA consent, release of information, attendance, cancellation, custody, and safety acknowledgments.",
      icon: FileSignature,
      fields: [
        ["Legal Representative Full Name", "text", "First and Last Name"],
        ["Relationship to Child", "select", "Mother|Father|Guardian|Authorized Representative|Other"],
        ["Legal Representative Phone", "tel", "Phone"],
        ["Legal Representative Email", "email", "Email"],
        ["Any court orders, custody agreements, or restrictions?", "select", "Yes|No|Not Sure"],
        ["Court Order Details", "textarea", "Describe if applicable"],
        ["HIPAA Acknowledgment", "checkbox", "I acknowledge the Notice of Privacy Practices"],
        ["Consent for ABA Services", "checkbox", "I consent to ABA assessment and therapy services"],
        ["Parent / Guardian Agreement", "checkbox", "I agree to the parent/guardian responsibilities"],
        ["Release of Information Authorization", "checkbox", "I authorize information exchange for care coordination"],
        ["Attendance Policy", "checkbox", "I understand the attendance policy"],
        ["Cancellation Policy", "checkbox", "I understand the cancellation policy"],
        ["Safety & Incident Acknowledgment", "checkbox", "I understand safety and incident communication policies"],
        ["Parent / Guardian Signature", "text", "Type full legal name"],
        ["Date", "date", ""],
      ],
      note: "This step mirrors the consent dashboard from the uploaded intake form and keeps consent items grouped before final signature.",
    },
    {
      title: "Financial & Communication",
      subtitle: "Collect billing responsibility, preferred contact method, language needs, appointment reminders, and availability.",
      icon: CreditCard,
      fields: [
        ["Financially Responsible Party", "select", "Parent|Guardian|Policy Holder|Self|Other"],
        ["Responsible Party Phone", "tel", "Phone"],
        ["Responsible Party Email", "email", "Email"],
        ["Payment Type", "select", "Insurance|Self-Pay / Private Pay|Both Insurance & Self-Pay|Not Sure"],
        ["Preferred Billing Method", "select", "Auto Pay|Credit / Debit Card|HSA / FSA|Invoice Only"],
        ["Preferred Language", "select", "English|Vietnamese|Spanish|Arabic|Other"],
        ["Interpreter Needed?", "select", "Yes|No|Sometimes"],
        ["Preferred Contact Method", "select", "Phone Call|Text Message|Email|Portal Message"],
        ["Best Time to Contact", "select", "Morning|Afternoon|Evening|Anytime"],
        ["Appointment Reminders", "select", "Text Message|Email|Phone Call|Portal Message"],
        ["Days Available", "text", "Monday, Tuesday, etc."],
        ["Times Available", "text", "Morning, afternoon, after school, etc."],
        ["Requested Weekly ABA Hours", "select", "Less than 10|10–15|15–20|20–25|25–30|30+|Not sure"],
      ],
      note: "Billing and communication preferences help the intake team coordinate benefits, authorizations, reminders, and appointments.",
    },
    {
      title: "Family & Clinical",
      subtitle: "Gather family history, developmental history, behavior profile, communication needs, functional living skills, and treatment priorities.",
      icon: HeartHandshake,
      fields: [
        ["Primary Caregiver Full Name", "text", "Name"],
        ["Home Language", "select", "English|Vietnamese|Spanish|Arabic|Other"],
        ["Other Household Members", "textarea", "Names, relationships, ages"],
        ["Was your child born full-term?", "select", "Yes|No|Not Sure"],
        ["Developmental Regression?", "select", "Yes|No|Not Sure"],
        ["Past Services", "textarea", "ABA, Speech, OT, PT, school services, etc."],
        ["Current School / Daycare / Program", "text", "Optional"],
        ["Main Areas of Concern", "textarea", "Communication, behavior, play, toileting, feeding, safety, etc."],
        ["Behavior Severity Level", "select", "Mild concerns|Moderate concerns|Significant concerns|High safety concern|Not sure"],
        ["Known Triggers", "textarea", "Transitions, denied access, waiting, noise, demands, etc."],
        ["What helps calm your child?", "textarea", "Preferred items, breaks, music, quiet space, etc."],
        ["Primary Communication Method", "select", "Vocal speech|Gestures|PECS / pictures|AAC device|Sign language|Mixed communication|Not sure"],
        ["Toileting Status", "select", "Independent|Needs reminders|Needs help|In diapers/pull-ups|Training|Not started"],
        ["Top family goals for first 90 days", "textarea", "List 3–5 goals"],
      ],
      note: "This step helps the clinical team prepare assessment targets and individualized treatment goals.",
    },
    {
      title: "Uploads & Signature",
      subtitle: "Upload documents, review final information, and sign the intake verification.",
      icon: UploadCloud,
      fields: [
        ["Insurance Card Front & Back", "file", ""],
        ["Parent / Guardian Photo ID", "file", ""],
        ["Diagnostic Evaluation Report", "file", ""],
        ["Referral / Prescription for ABA", "file", ""],
        ["IEP / IFSP / 504 Plan", "file", ""],
        ["School Evaluation / Psychoeducational Report", "file", ""],
        ["Medication List / Medical Plan", "file", ""],
        ["Court Orders / Custody Documents", "file", ""],
        ["Other Supporting Documents", "file", ""],
        ["Missing Documents Explanation", "textarea", "If any documents are pending, explain here"],
        ["Final Notes for Intake Team", "textarea", "Anything else our team should know?"],
        ["I certify the information is accurate", "checkbox", "Yes, the information is true and complete"],
        ["Final Signature", "text", "Type full legal name"],
        ["Date Signed", "date", ""],
      ],
      note: "In the live version, uploaded documents should be stored securely and submitted to the intake team.",
    },
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("eden-intake-preview") || "{}");
    } catch {
      return {};
    }
  });
  const active = intakeSections[step];
  const ActiveIcon = active.icon;
  const progress = Math.round(((step + 1) / intakeSections.length) * 100);

  const updateField = (label, value) => {
    setFormData((old) => {
      const next = { ...old, [label]: value };
      if (typeof window !== "undefined") {
        localStorage.setItem("eden-intake-preview", JSON.stringify(next));
      }
      return next;
    });
  };

  const renderField = ([label, type, placeholder]) => {
    const value = formData[label] || "";
    const base = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-[#128c8c] focus:bg-white focus:ring-4 focus:ring-[#49b8c8]/20";

    if (type === "select") {
      return (
        <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
          {label}
          <select value={value} onChange={(event) => updateField(label, event.target.value)} className={base}>
            <option value="">Select option</option>
            {placeholder.split("|").map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      );
    }

    if (type === "textarea") {
      return (
        <label key={label} className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
          {label}
          <textarea value={value} onChange={(event) => updateField(label, event.target.value)} placeholder={placeholder} className={`${base} min-h-28`} />
        </label>
      );
    }

    if (type === "checkbox") {
      return (
        <label key={label} className="flex items-start gap-3 rounded-2xl border border-[#49b8c8]/20 bg-white p-4 text-sm font-bold leading-6 text-slate-700 md:col-span-2">
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => updateField(label, event.target.checked)} className="mt-1 h-5 w-5 accent-[#1f7a2e]" />
          <span><strong className="text-[#0b4f4f]">{label}:</strong> {placeholder}</span>
        </label>
      );
    }

    if (type === "file") {
      return (
        <label key={label} className="grid gap-2 rounded-2xl border border-dashed border-[#49b8c8]/40 bg-[#ddf4f4]/40 p-4 text-sm font-black text-slate-700">
          {label}
          <input type="file" onChange={(event) => updateField(label, event.target.files?.[0]?.name || "")} className="text-sm font-bold text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#1f7a2e] file:px-4 file:py-2 file:font-black file:text-white" />
          {value && <span className="text-xs font-bold text-[#128c8c]">Selected: {value}</span>}
        </label>
      );
    }

    return (
      <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
        {label}
        <input type={type} value={value} onChange={(event) => updateField(label, event.target.value)} placeholder={placeholder} className={base} />
      </label>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#49b8c8]/30 bg-white px-4 py-2 text-sm font-black text-[#128c8c] shadow-sm">
              <HeartHandshake size={18} /> Eden ABA Therapy Intake
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#0b4f4f] md:text-6xl">Intake Form - 6 Step Process</h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">Complete each section one by one. Your progress stays on this page while the family moves through the full intake process.</p>
          </div>
          <div className="rounded-2xl border border-[#49b8c8]/30 bg-white p-4 shadow-lg shadow-[#128c8c]/10">
            <p className="text-sm font-black text-slate-500">Progress</p>
            <p className="text-3xl font-black text-[#1f7a2e]">{progress}%</p>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-full bg-white shadow-inner ring-1 ring-slate-100">
          <div className="h-3 rounded-full bg-gradient-to-r from-[#1f7a2e] via-[#128c8c] to-[#f7c72f] transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-[#128c8c]/10 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#128c8c]">Checklist</p>
            <div className="mt-5 grid gap-3">
              {intakeSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => setStep(index)}
                    className={`flex items-center gap-3 rounded-2xl p-3 text-left transition ${step === index ? "bg-[#1f7a2e] text-white shadow-lg shadow-[#1f7a2e]/20" : index < step ? "bg-emerald-50 text-[#0b4f4f]" : "bg-slate-50 text-slate-600 hover:bg-[#ddf4f4]"}`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/80 text-[#1f7a2e]"><Icon size={18} /></span>
                    <span className="text-sm font-black">{index + 1}. {section.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-[#fff8df] p-4 text-sm font-bold leading-6 text-[#0b4f4f]">
              Secure draft style preview. Final live submission can connect to your backend/API later.
            </div>
          </aside>

          <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl shadow-[#128c8c]/10">
            <div className="border-b border-slate-100 bg-gradient-to-r from-[#ddf4f4] via-white to-[#fff8df] p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#1f7a2e] text-white shadow-lg"><ActiveIcon size={32} /></div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#128c8c]">Step {step + 1} of 6</p>
                  <h2 className="mt-2 text-3xl font-black text-[#0b4f4f] md:text-4xl">{active.title}</h2>
                  <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-slate-700">{active.subtitle}</p>
                </div>
              </div>
            </div>

            <form className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
              {active.fields.map(renderField)}
              <div className="md:col-span-2 rounded-2xl border border-[#49b8c8]/20 bg-[#ddf4f4]/50 p-5 text-sm font-bold leading-7 text-[#0b4f4f]">
                {active.note}
              </div>
            </form>

            <div className="flex flex-col justify-between gap-4 border-t border-slate-100 bg-slate-50 p-6 sm:flex-row">
              <Button variant="secondary" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>← Previous Step</Button>
              <Button variant="secondary" onClick={() => {
                if (typeof window !== "undefined") localStorage.setItem("eden-intake-preview", JSON.stringify(formData));
                alert("Your intake progress has been saved on this device.");
              }}>💾 Save & Exit</Button>
              {step === intakeSections.length - 1 ? (
                <Button onClick={() => alert("✅ Intake form completed. Next step: connect this button to your secure intake API, email notification, and document upload storage.")}>Review & Submit ✓</Button>
              ) : (
                <Button onClick={() => setStep((current) => Math.min(intakeSections.length - 1, current + 1))}>Next Step →</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterBanner({ t = translations.en }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <section className="bg-white px-4 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-6 py-12 text-center shadow-2xl shadow-[#128c8c]/20 md:px-10 md:py-16">
        <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          Stay connected with our family newsletter
        </h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!firstName.trim() || !email.trim()) return;
            setJoined(true);
          }}
          className="mx-auto mt-9 flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-center"
        >
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none shadow-lg transition focus:ring-4 focus:ring-lime-300/30"
            placeholder={t.firstName}
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none shadow-lg transition focus:ring-4 focus:ring-lime-300/30"
            placeholder={t.email}
          />

          <button
            type="submit"
            className="h-14 rounded-full bg-[#f7c72f] px-8 text-base font-black text-[#0b4f4f] shadow-xl transition hover:bg-[#ff8a1f] hover:text-white"
          >
            Join Family Newsletter
          </button>
        </form>

        {joined && (
          <p className="mt-5 text-sm font-bold text-lime-200">
            {t.newsletterThanks}, {firstName}! {t.newsletterThanksEnd}
          </p>
        )}
      </div>
    </section>
  );
}

function Footer({ t = translations.en }) {
  return (
    <footer className="bg-gradient-to-br from-[#032f2b] via-[#0b4f4f] to-[#1f7a2e] px-4 pt-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <LogoImage alt="Eden ABA Therapy" className="h-20 w-auto rounded-2xl bg-white p-2" />
            <p className="mt-6 text-base leading-8 text-emerald-50">
              Eden ABA Therapy provides compassionate autism and ABA therapy services for children and families across Northern Virginia.
            </p>

            <a
              href="#intake"
              onClick={(event) => {
                event.preventDefault();
                window.location.hash = "intake";
                window.dispatchEvent(new CustomEvent("eden:navigate", { detail: "intake" }));
              }}
              className="mt-6 inline-flex items-center rounded-full bg-lime-500 px-6 py-3 text-sm font-black text-emerald-950 transition hover:bg-lime-400"
            >
              {t.startABA}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              For Parents
            </h4>

            <div className="mt-5 grid gap-3 text-sm font-bold text-emerald-50">
              <a href="#">Autism Diagnostic Support</a>
              <a href="#">About Autism</a>
              <a href="#">About ABA Therapy</a>
              <a href="#">Insurance Coverage</a>
              <a href="#">Family Resources</a>
              <a href="#">Get Started</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Resources
            </h4>

            <div className="mt-5 grid gap-3 text-sm font-bold text-emerald-50">
              <a href="#">M-CHAT-R Screener</a>
              <a href="#">CAST Screener</a>
              <a href="#">ADOS-2 Evaluation</a>
              <a href="#">Caregiver Guides</a>
              <a href="#">Blog & Articles</a>
              <a href="#">Frequently Asked Questions</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Careers
            </h4>

            <div className="mt-5 grid gap-3 text-sm font-bold text-emerald-50">
              <a href="#">Open Positions</a>
              <a href="#">RBT Careers</a>
              <a href="#">BCBA Careers</a>
              <a href="#">Clinical Leadership</a>
              <a href="#">Interview Guide</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Contact Eden
            </h4>

            <div className="mt-5 grid gap-4 text-sm text-emerald-50">
              <p className="flex gap-3 leading-7">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>{edenBusinessInfo.address}</span>
              </p>

              <p className="flex items-center gap-3 font-bold">
                <Phone size={18} />
                <span>{edenBusinessInfo.phone}</span>
              </p>

              <p className="flex items-center gap-3 font-bold">
                <FileText size={18} />
                <span>Fax: {edenBusinessInfo.fax}</span>
              </p>

              <p className="flex items-center gap-3 font-bold">
                <Mail size={18} />
                <span>info@edenabatherapy.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-10 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Service Areas
            </h4>

            <p className="mt-4 text-sm leading-7 text-emerald-50">
              Proudly serving families across Northern Virginia including Fairfax, Annandale, Arlington, Alexandria, Centreville, Chantilly, Herndon, Reston, Springfield, Burke, Falls Church, McLean, Vienna, and surrounding communities.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Office Hours
            </h4>

            <div className="mt-4 grid gap-2 text-sm text-emerald-50">
              {edenBusinessInfo.hours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-5">
                  <span className="font-bold">{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Google Reviews
            </h4>

            <div className="mt-4 flex items-center gap-2 text-yellow-300">
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
            </div>

            <p className="mt-4 text-sm leading-7 text-emerald-50">
              Families trust Eden ABA Therapy for compassionate autism care and personalized ABA services.
            </p>

            <a
              href="https://g.page/r/Cc8VjakVrKCeEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-emerald-950 transition hover:bg-yellow-300"
            >
              Leave a Google Review <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-6 text-sm text-emerald-100 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Eden ABA Therapy. All rights reserved.</p>

          <div className="flex flex-wrap gap-5 font-bold">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
            <a href="#">Notice of Privacy Practices</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SchedulerIntroCard({ onStart }) {
  const sections = [
    {
      title: "What this scheduler helps with",
      items: [
        "Request an ABA therapy evaluation",
        "Share family and child information securely",
        "Choose preferred appointment date and time",
        "Provide insurance details for eligibility review",
        "Submit everything directly to Eden ABA Therapy",
      ],
    },
    {
      title: "Why families like it",
      items: [
        "Simple guided process",
        "Saves time before intake",
        "Helps our team prepare before contacting you",
        "Supports insurance verification",
        "Works for online/Zoom or in-person appointments",
      ],
    },
    {
      title: "Before you start",
      items: [
        "Parent/guardian contact information",
        "Child’s basic information",
        "Preferred appointment date",
        "Insurance plan and member ID if available",
        "Any concerns or questions you want our team to know",
      ],
    },
  ];

  return (
    <div className="mb-10 overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#1f7a2e] via-[#128c8c] to-[#0b4f4f] p-6 shadow-2xl shadow-[#128c8c]/20 md:p-10">
      <div className="grid gap-6 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title} className="rounded-[2rem] bg-white/95 p-6 shadow-xl shadow-emerald-950/10">
            <h2 className="text-xl font-black text-[#0b4f4f]">{section.title}</h2>
            <div className="mt-5 grid gap-3">
              {section.items.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#1f7a2e]" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={onStart} variant="gold">Start Appointment Scheduler <ArrowRight size={18} /></Button>
      </div>
    </div>
  );
}

function OnlineAppointmentSchedulerCTA({ t = translations.en, introOnly = false, onOpenScheduler }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [form, setForm] = useState({
    communication: "Moderate concern",
    behavior: "Moderate concern",
    social: "Moderate concern",
    urgency: "Priority",
    notes: "",
    service: "ABA Therapy Evaluation",
    locationType: "Online / Zoom",
    visitType: "New Patient",
    parentName: "",
    childName: "",
    phone: "",
    email: "",
    dob: "",
    ageGroup: "3-5",
    zip: "",
    date: "",
    time: "",
    insurance: "Medicaid",
    memberId: "",
    referral: "",
    parentConcerns: "",
  });

  const updateForm = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const steps = ["Triage", "Service", "Family", "Schedule", "Insurance", "Review"];
  const availableTimes = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];

  const requiredMissing = () => {
    if (step === 1) return !form.notes;
    if (step === 2) return !form.service || !form.locationType || !form.visitType;
    if (step === 3) return !form.parentName || !form.childName || !form.phone || !form.email || !form.dob || !form.zip;
    if (step === 4) return !form.date || !form.time;
    if (step === 5) return !form.insurance || !form.memberId || !form.referral || !form.parentConcerns;
    return false;
  };

  const selectedDateTime = `${form.date || "Not selected"} ${form.time || ""}`.trim();
  const progress = Math.round((step / steps.length) * 100);

  const nextStep = () => {
    if (requiredMissing()) return;
    setStep((current) => Math.min(6, current + 1));
  };

  const backStep = () => setStep((current) => Math.max(1, current - 1));

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
  };

  if (introOnly) {
    return (
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-[#49b8c8]/20 bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] p-8 text-center shadow-2xl shadow-[#128c8c]/10 md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Online Scheduling</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">Schedule an appointment online with Eden ABA Therapy.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">Use our guided multi-step scheduler to request an ABA therapy evaluation, choose preferred times, and share insurance information for review.</p>
          <div className="mt-8">
            <Button onClick={onOpenScheduler}>Schedule Online <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f7f7] px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="font-black uppercase tracking-[0.25em] text-[#128c8c]">Eden ABA Therapy</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Advanced Online Appointment Scheduler
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-700">
            Schedule an appointment online with Eden ABA Therapy using our guided multi-step booking system.
          </p>
        </div>

        {!showWizard && <SchedulerIntroCard onStart={() => setShowWizard(true)} />}

        {showWizard && <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
            <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-700">{t.guidedWizard}</p>
                  <h3 className="mt-2 text-3xl font-black text-slate-950">Step {step}: {steps[step - 1]}</h3>
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-100">
                  {progress}% {t.complete}
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white shadow-inner">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {steps.map((label, index) => {
                  const number = index + 1;
                  const isActive = step === number;
                  const isComplete = step > number || submitted;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => !submitted && setStep(number)}
                      className={`rounded-2xl border px-3 py-3 text-center transition ${
                        isActive
                          ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                          : isComplete
                          ? "border-emerald-200 bg-emerald-100 text-emerald-950"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <p className="text-xs font-black">{number}</p>
                      <p className="mt-1 text-xs font-black">{label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-[430px] p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={submitted ? "submitted" : step}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                >
                  {submitted ? (
                    <div className="rounded-[1.8rem] bg-emerald-50 p-8 text-center ring-1 ring-emerald-100">
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white">
                        <Check size={34} />
                      </div>
                      <h3 className="mt-5 text-3xl font-black text-emerald-900">Appointment Submitted</h3>
                      <p className="mt-2 font-bold text-emerald-800">Reference: EAT-{Math.floor(1000000 + Math.random() * 9000000)}</p>
                      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">
                        In the live version, this request will save to Supabase, create a Zoom meeting, notify Eden staff, and send confirmation to the family.
                      </p>
                      <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-white p-5 text-left shadow-sm">
                        <p className="font-black text-slate-950">Zoom Meeting Preview</p>
                        <p className="mt-2 break-all rounded-xl bg-sky-50 p-3 text-sm font-bold text-sky-700">https://zoom.us/j/secure-eden-aba-intake</p>
                        <p className="mt-2 text-sm text-slate-700">Meeting Passcode: <strong>EDEN</strong></p>
                        <p className="text-sm text-slate-700">Appointment: <strong>{selectedDateTime}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {step === 1 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">AI Triage Before Booking</h4>
                          <p className="mt-2 text-slate-600">Tell us what your family needs so we can route the request correctly.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {[["communication", "Communication concerns"], ["behavior", "Behavior concerns"], ["social", "Social concerns"], ["urgency", "Scheduling urgency"]].map(([key, label]) => (
                              <label key={key} className="grid gap-2 text-sm font-black text-slate-700">
                                {label} <span className="text-red-500">*</span>
                                <select value={form[key]} onChange={(e) => updateForm(key, e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100">
                                  <option>Mild concern</option>
                                  <option>Moderate concern</option>
                                  <option>High concern</option>
                                  <option>Priority</option>
                                </select>
                              </label>
                            ))}
                          </div>
                          <label className="mt-5 grid gap-2 text-sm font-black text-slate-700">
                            Parent notes <span className="text-red-500">*</span>
                            <textarea value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Describe your concerns, goals, behaviors, communication needs, or questions." />
                          </label>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">Service Selection</h4>
                          <p className="mt-2 text-slate-600">Choose the service type and appointment style.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <label className="grid gap-2 text-sm font-black text-slate-700">Service <span className="text-red-500">*</span><select value={form.service} onChange={(e) => updateForm("service", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>ABA Therapy Evaluation</option><option>Parent Consultation</option><option>Insurance Review</option><option>ASD Evaluation Support</option></select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">Location type <span className="text-red-500">*</span><select value={form.locationType} onChange={(e) => updateForm("locationType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>Online / Zoom</option><option>In-Home</option><option>Office Appointment</option></select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">Visit type <span className="text-red-500">*</span><select value={form.visitType} onChange={(e) => updateForm("visitType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>New Patient</option><option>Returning Family</option><option>Provider Referral</option></select></label>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">Parent and Patient Details</h4>
                          <p className="mt-2 text-slate-600">Add contact information and basic child details.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <input value={form.parentName} onChange={(e) => updateForm("parentName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Parent name *" />
                            <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Email *" />
                            <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Phone *" />
                            <input value={form.childName} onChange={(e) => updateForm("childName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Child name *" />
                            <label className="grid gap-2 text-sm font-black text-slate-700">Child birthdate <input type="date" value={form.dob} onChange={(e) => updateForm("dob", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" /></label>
                            <select value={form.ageGroup} onChange={(e) => updateForm("ageGroup", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>0-2</option><option>3-5</option><option>6-12</option><option>13+</option></select>
                            <input value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="ZIP code *" />
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">Date and Time</h4>
                          <p className="mt-2 text-slate-600">Choose a preferred appointment date and available time.</p>
                          <div className="mt-6 grid items-start gap-5 md:grid-cols-[0.85fr_1.15fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <label className="mb-2 block text-sm font-black text-slate-700">Preferred date</label>
                              <input type="date" value={form.date} onChange={(e) => updateForm("date", e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                              <p className="mt-3 text-xs font-bold text-emerald-700">✅ 16 slots available on selected date</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                              {availableTimes.map((time) => (
                                <button key={time} type="button" onClick={() => updateForm("time", time)} className={`rounded-2xl border px-4 py-3 font-black transition ${form.time === time ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"}`}>{time}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">Insurance and Concerns</h4>
                          <p className="mt-2 text-slate-600">Add insurance details and family concerns for intake review.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-black text-slate-700">Insurance plan <select value={form.insurance} onChange={(e) => updateForm("insurance", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>Medicaid</option><option>Anthem</option><option>Aetna</option><option>Cigna</option><option>UnitedHealthcare</option><option>Other</option></select></label>
                            <input value={form.memberId} onChange={(e) => updateForm("memberId", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Member ID *" />
                            <input value={form.referral} onChange={(e) => updateForm("referral", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Referral source *" />
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"><input type="checkbox" defaultChecked className="h-5 w-5 accent-sky-500" /> Run insurance eligibility check</label>
                            <textarea value={form.parentConcerns} onChange={(e) => updateForm("parentConcerns", e.target.value)} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100 md:col-span-2" placeholder="Parent concerns *" />
                          </div>
                        </div>
                      )}

                      {step === 6 && (
                        <div>
                          <h4 className="text-2xl font-black text-slate-950">Review and Submit</h4>
                          <p className="mt-2 text-slate-600">Review your request before submitting it to Eden ABA Therapy.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Triage Summary</p><p className="mt-2 text-sm">Urgency: <strong>{form.urgency}</strong></p><p className="text-sm">Communication: {form.communication}</p><p className="text-sm">Behavior: {form.behavior}</p><p className="text-sm">Social: {form.social}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Appointment</p><p className="mt-2 text-sm">{form.service}</p><p className="text-sm">{form.locationType} • {form.visitType}</p><p className="text-sm">{selectedDateTime}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Family Information</p><p className="mt-2 text-sm">{form.parentName || "—"}</p><p className="text-sm">{form.email || "—"}</p><p className="text-sm">{form.phone || "—"}</p><p className="text-sm">Child: {form.childName || "—"}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Insurance</p><p className="mt-2 text-sm">{form.insurance}</p><p className="text-sm">Member ID: {form.memberId || "—"}</p><p className="text-sm">Eligibility check: Requested</p></div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 md:px-8">
              <div className="flex items-center justify-between gap-4">
                <Button variant="secondary" disabled={step === 1 || submitted} onClick={backStep}>{t.back}</Button>
                {submitted ? (
                  <Button onClick={resetForm}>{t.bookAnother}</Button>
                ) : step === 6 ? (
                  <Button onClick={() => setSubmitted(true)}>{t.submitRequest}</Button>
                ) : (
                  <Button disabled={requiredMissing()} onClick={nextStep}>{t.continue} <ArrowRight size={16} /></Button>
                )}
              </div>
              {!submitted && requiredMissing() && step > 2 && (
                <p className="mt-3 text-center text-sm font-bold text-red-600">{t.requiredNotice}</p>
              )}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Clean summary panel</p>
            <div className="mt-4 rounded-2xl bg-slate-950 p-5 text-white">
              <p className="font-black">Booking Status</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">Step</p><p className="text-2xl font-black">{step}/6</p></div>
                <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">Progress</p><p className="text-2xl font-black">{progress}%</p></div>
              </div>
              <div className="mt-3 rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">Next automation</p><p className="text-sm font-bold">Supabase + Zoom + email/SMS</p></div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-700">
              <p className="flex justify-between gap-4"><span>Service</span><strong>{form.service}</strong></p>
              <p className="flex justify-between gap-4"><span>Chosen Time</span><strong>{selectedDateTime}</strong></p>
              <p className="flex justify-between gap-4"><span>Insurance</span><strong>{form.insurance}</strong></p>
              <p className="flex justify-between gap-4"><span>Office Email</span><strong>info@edenabatherapy.com</strong></p>
            </div>
          </aside>
        </div>}
      </div>
    </section>
  );
}

/*
BACKEND FILES TO CREATE IN YOUR NEXT.JS PROJECT:

1) /app/api/appointments/route.ts
- Save appointment to Supabase
- Call /api/zoom/create-meeting
- Save Zoom link back to appointment row
- Trigger email/SMS automation

2) /app/api/zoom/create-meeting/route.ts
- Uses Zoom Server-to-Server OAuth credentials
- Creates secure Zoom intake meeting

3) Supabase table: appointments
- parent_name, patient_name, email, phone, dob, insurance, concerns,
  appointment_date, appointment_time, status, zoom_join_url,
  zoom_meeting_id, zoom_password, created_at

4) .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
RESEND_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
*/

export default function EdenABAWebsite() {
  const [darkMode, setDarkMode] = useState(false);
  const [consentUpdates, setConsentUpdates] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/what-is-autism") return "what-is-autism";
      if (window.location.pathname === "/m-chat-r-online-screener") return "m-chat-r-online-screener";
      if (window.location.pathname === "/autism-assessment") return "autism-assessment";
      const hashPage = window.location.hash.replace("#", "");
      const hashPages = [
        "locations",
        "aba-therapy",
        "about-us",
        "intake",
        "schedule-appointment",
        "insurance-coverage",
      ];
      if (hashPages.includes(hashPage)) return hashPage;
    }
    return "home";
  });
  const [language, setLanguage] = useState("en");
  const t = getTranslation(language);

  const goToPage = (page) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      if (page === "what-is-autism") {
        window.history.pushState(null, "", "/what-is-autism");
      } else if (page === "m-chat-r-online-screener") {
        window.history.pushState(null, "", "/m-chat-r-online-screener");
      } else if (page === "autism-assessment") {
        window.history.pushState(null, "", "/autism-assessment");
      } else if (page === "home") {
        window.history.pushState(null, "", "/");
      } else {
        window.location.hash = page;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleNavigate = (event) => {
      const pathPage = window.location.pathname === "/what-is-autism" ? "what-is-autism" : window.location.pathname === "/m-chat-r-online-screener" ? "m-chat-r-online-screener" : window.location.pathname === "/autism-assessment" ? "autism-assessment" : "";
      const page = event?.detail || pathPage || window.location.hash.replace("#", "") || "home";
      if (page === "locations" || page === "aba-therapy" || page === "what-is-autism" || page === "about-us" || page === "intake" || page === "schedule-appointment" || page === "insurance-coverage" || page === "autism-assessment" || page === "m-chat-r-online-screener" || page === "home") {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    handleNavigate();
    window.addEventListener("eden:navigate", handleNavigate);
    window.addEventListener("hashchange", handleNavigate);
    window.addEventListener("popstate", handleNavigate);
    return () => {
      window.removeEventListener("eden:navigate", handleNavigate);
      window.removeEventListener("hashchange", handleNavigate);
      window.removeEventListener("popstate", handleNavigate);
    };
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("eden-language");
    if (savedLanguage === "en" || savedLanguage === "vi") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.title = "Eden ABA Therapy | ABA Therapy, Autism Support & Insurance Help in Northern Virginia";
      const description = "Eden ABA Therapy provides compassionate ABA therapy, autism support, insurance verification, intake forms, parent resources, and location support for families in Northern Virginia.";
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [language]);

  if (currentPage === "what-is-autism") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <WhatIsAutismPage onStart={() => goToPage("intake")} onAssessment={() => goToPage("autism-assessment")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "aba-therapy") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <ABATherapyEducationPage onStart={() => goToPage("intake")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "locations") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <LocationsPage t={t} onStart={() => goToPage("intake")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "about-us") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <AboutEdenPage onStart={() => goToPage("intake")} onFindCare={() => goToPage("locations")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "intake") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <IntakePage t={t} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "schedule-appointment") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <OnlineAppointmentSchedulerCTA t={t} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "insurance-coverage") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <InsuranceVerificationPage onSchedule={() => goToPage("schedule-appointment")} onHome={() => goToPage("home")} onStart={() => goToPage("intake")} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "autism-assessment") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <AutismAssessmentPage onStart={() => goToPage("intake")} onMchat={() => goToPage("m-chat-r-online-screener")} onCast={() => { if (typeof window !== "undefined") window.location.href = "/cast"; }} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  if (currentPage === "m-chat-r-online-screener") {
    return (
      <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
        >
          {darkMode ? t.lightMode : t.darkMode}
        </button>
        <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
        <MChatROnlineScreenerPage onStart={() => goToPage("intake")} onCast={() => { if (typeof window !== "undefined") window.location.href = "/cast"; }} />
        <LiveChatAssistant t={t} />
        <NewsletterBanner t={t} />
        <Footer t={t} />
      </main>
    );
  }

  return (
    <main className={`min-h-screen font-sans transition ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-5 left-5 z-50 rounded-full bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-2xl"
      >
        {darkMode ? t.lightMode : t.darkMode}
      </button>
      <Header onStart={() => goToPage("intake")} onNavigate={goToPage} language={language} setLanguage={setLanguage} />
      <Hero onStart={() => goToPage("intake")} onFindCare={() => goToPage("locations")} language={language} />
      <AutismAwarenessCounter />
      <ServiceExplorer t={t} />
      <InsurancePaymentSection onStart={() => goToPage("insurance-coverage")} />
      <EligibilityChecker t={t} onStart={() => goToPage("intake")} onAssessment={() => goToPage("autism-assessment")} />
      <ParentResourcesSection onStart={() => goToPage("intake")} />
      <Careers t={t} />
      <OnlineAppointmentSchedulerCTA t={t} />
      <ClientReviewMarquee onStart={() => goToPage("intake")} onVerifyInsurance={() => goToPage("insurance-coverage")} />
      <section className="bg-gradient-to-br from-[#128c8c] via-[#1f7a2e] to-[#0b4f4f] px-4 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="pt-4 text-white lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur-md">
              <HeartHandshake size={18} className="text-lime-300" /> {t.intakeBadge}
            </div>

            <h2 className="mt-7 max-w-xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Help your child thrive with ABA therapy.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-teal-50/95">
              Complete our online interest form and our team will contact you to guide you through the next steps.
            </p>

            <div className="mt-8 grid gap-4">
              {t.benefits.map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-emerald-950/10 backdrop-blur-md">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime-400 text-emerald-950">
                    <Check size={20} />
                  </div>
                  <p className="text-base font-black text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">{t.whatNext}</p>
              <p className="mt-3 leading-7 text-teal-50">
                Eden ABA Therapy reviews your information, contacts you for intake, discusses insurance or documentation needs, and helps schedule the next appropriate step.
              </p>
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-white/70 bg-white p-6 shadow-2xl shadow-emerald-950/25 lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">Eden ABA Therapy</p>
                <h3 className="mt-2 text-3xl font-black text-emerald-950">{t.intakeFormTitle}</h3>
              </div>
              <div className="hidden rounded-2xl bg-teal-50 p-3 text-teal-700 sm:block">
                <ShieldCheck size={30} />
              </div>
            </div>

            <form className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-black text-slate-700">{t.parentName}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder="Parent's Name" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.childFirstName}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder="Child's First Name" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.childLastName}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder="Child's Last Name" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.childBirthdate}</label>
                <input type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.phoneNumber}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder="Phone" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.emailAddress}</label>
                <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder="Enter your email" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.preferredContact}</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100">
                  <option>Phone Call</option>
                  <option>Text Message</option>
                  <option>Email</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.diagnosisQuestion}</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100">
                  <option>Select Diagnosis Status</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>In Progress</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">{t.state}</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100">
                  <option>Virginia</option>
                  <option>Maryland</option>
                  <option>Washington DC</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-black text-slate-700">{t.message}</label>
                <textarea className="min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100" placeholder="Tell us about your child and how we can help." />
              </div>

              <div className="md:col-span-2 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-5 shadow-lg shadow-teal-900/5">
                <div className="grid gap-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-700 text-white shadow-lg">
                      <CalendarDays size={21} />
                    </div>
                    <div>
                      <p className="text-base font-black text-emerald-950">{t.appointmentIntake}</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-700">
                        We’ll contact you to schedule an appointment and complete the intake process.
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-teal-100" />

                  <div className="flex items-start gap-4">
                    <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-700 text-white shadow-lg">
                      <LockKeyhole size={21} />
                    </div>
                    <div>
                      <p className="text-base font-black text-emerald-950">{t.secureConfidential}</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-700">
                        Your information is protected with strict privacy and security standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4 text-sm leading-6 text-slate-700">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consentUpdates}
                    onChange={(e) => setConsentUpdates(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-teal-700"
                  />
                  <span>{t.consentUpdates}</span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-teal-700"
                  />
                  <span>{t.consentTerms}</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setRecaptchaChecked((value) => !value)}
                className={`md:col-span-2 rounded-xl border p-4 text-left transition ${
                  recaptchaChecked
                    ? "border-teal-500 bg-teal-50 ring-4 ring-teal-100"
                    : "border-slate-200 bg-slate-50 hover:border-teal-300"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 place-items-center rounded border-2 bg-white ${recaptchaChecked ? "border-teal-600" : "border-slate-300"}`}>
                      {recaptchaChecked && <Check size={20} className="text-teal-700" />}
                    </div>
                    <span className="text-sm font-black text-slate-700">{t.recaptcha}</span>
                  </div>
                  <div className="h-9 w-9 rounded bg-gradient-to-br from-sky-400 to-blue-600" />
                </div>
              </button>

              <div className="md:col-span-2">
                <button className="w-full rounded-xl bg-[#f7c72f] px-6 py-4 text-lg font-black text-[#0b4f4f] shadow-lg transition hover:bg-[#ff8a1f] hover:text-white">
                  {t.submitRequest}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <LiveChatAssistant t={t} />
      <NewsletterBanner t={t} />
      <Footer t={t} />
    </main>
  );
}
