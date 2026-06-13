import { readFileSync, writeFileSync } from "fs";

const ideEn = {
  meta: {
    title: "Initial Diagnostic Evaluation for Autism | Eden ABA Therapy",
    description:
      "Learn about Initial Diagnostic Evaluations for autism, what they include, who they are for, and how Eden ABA Therapy helps families understand next steps.",
  },
  hero: {
    breadcrumb: ["Autism Evaluation", "IDE"],
    badge: "Professional Diagnostic Support",
    title: "Initial Diagnostic Evaluation: Autism Diagnostic Support",
    subtitle:
      "At Eden ABA Therapy, we provide diagnostic support for families wondering if their child could have autism spectrum disorder (ASD). Initial Diagnostic Evaluations help determine whether a child meets diagnostic criteria for autism and what next steps may be recommended.",
    availabilityNote:
      "IDE availability may vary by region. Contact Eden ABA Therapy to learn which evaluation options are available near you.",
    scheduleButton: "Schedule Evaluation",
    findCenterButton: "Find a Center",
    imageAlt: "Licensed clinician engaging a young child in a warm, play-based diagnostic activity",
  },
  whatIs: {
    title: "What is an Initial Diagnostic Evaluation (IDE)?",
    intro:
      "There is no single test that can diagnose autism spectrum disorder. Instead, licensed professionals use multiple sources of information to determine whether a child meets criteria for ASD. An IDE is focused on autism-related concerns and may include caregiver input, direct observation, standardized tools, and a results review.",
    subheading: "Here's what to expect during the process:",
    steps: [
      [
        "Parent Interview",
        "Caregivers share information about the child's medical history, developmental milestones, daily behaviors, and current concerns.",
      ],
      [
        "Direct Observation",
        "The clinician engages the child in interactive activities to observe how they communicate, play, and respond.",
      ],
      [
        "Autism-Specific Tools",
        "Standardized tools and questionnaires may be used to gather information about behaviors associated with autism.",
      ],
      [
        "Results Review Session",
        "The clinician explains findings, discusses whether the child meets criteria for autism, and provides individualized recommendations for next steps. Families may also receive a written diagnostic report to share with pediatricians, teachers, or other providers.",
      ],
    ],
  },
  whoCan: {
    title: "Who can complete an IDE?",
    intro: "An IDE may be appropriate for children ages 18 months through 6 years who are showing possible signs of autism.",
    signs: [
      "Limited eye contact or difficulty responding to their name",
      "Delays in speech or language development",
      "Repetitive movements like hand-flapping or rocking",
      "Becoming upset by changes in routine",
      "Strong focus on specific topics or objects",
      "Difficulties forming relationships or playing with peers",
    ],
    referralText:
      "Children are often referred for an IDE after completing an autism screener like the M-CHAT-R or CAST, or when concerns come up during a pediatrician visit.",
    complexNote:
      "For children with multiple or complex developmental needs, a more comprehensive evaluation may be recommended. Eden ABA Therapy can help families understand what type of evaluation may be the best fit.",
    relatedCards: [
      ["M-CHAT-R Online Screener", "Online autism screener for toddlers ages 16–30 months.", "mchat"],
      ["CAST Online Screener", "Online autism screener for children ages 4–11.", "cast"],
    ],
  },
  measure: {
    title: "What does an IDE measure?",
    intro: "An Initial Diagnostic Evaluation examines key areas of development that are closely related to autism.",
    areas: [
      [
        "Social Communication",
        "The clinician observes how your child uses eye contact, gestures, facial expressions, and whether they share enjoyment or interest with others.",
      ],
      [
        "Play and Imagination",
        "The evaluation looks at how your child engages with toys, participates in pretend play, and builds simple stories or scenarios.",
      ],
      [
        "Language and Communication",
        "The clinician assesses expressive skills, such as talking, asking questions, and responding to others, as well as receptive skills like understanding and following directions.",
      ],
      [
        "Restricted or Repetitive Behaviors",
        "The clinician notes repeated movements, intense interests, sensory differences, or sensitivities to changes in routines or environments.",
      ],
      [
        "Emotional Responses",
        "The clinician observes how your child manages transitions, handles frustration, and reacts to unexpected changes or new experiences.",
      ],
    ],
  },
  tools: {
    title: "What tools are used during an IDE?",
    intro:
      "Not every child will need every tool. Clinicians choose tools based on the child's age, developmental history, communication skills, and needs. These tools help support the diagnostic process and guide individualized recommendations.",
    listLabel: "Tools may include:",
    items: [
      "Autism Diagnostic Interview-Revised",
      "Autism Diagnostic Observation Schedule",
      "Childhood Autism Rating Scale",
      "Tele-ASD-PEDS",
      "Parent questionnaires",
      "Developmental history review",
      "Direct child observation",
    ],
    imageAlt: "Child-friendly evaluation materials including picture cards and pretend play toys",
  },
  where: {
    title: "Where are IDEs performed?",
    intro:
      "IDEs may be offered in select locations through in-center evaluation or telehealth, depending on availability and regional requirements. No matter the setting, evaluations should include caregiver input, developmental history, direct observation, and other relevant information.",
    howTitle: "How it works",
    virtual: {
      title: "Virtual evaluation",
      text: "A virtual evaluation may allow the child to be observed in a familiar home environment. The clinician may coach the caregiver through simple activities while observing behaviors and interactions.",
    },
    inCenter: {
      title: "In-center evaluation",
      text: "For families who prefer or require in-person support, the clinician may guide structured activities while observing the child's responses directly. Parents may be asked to participate in portions of the assessment and complete parent-report measures.",
    },
    cta: "Contact us to learn which autism assessment services are available in your area.",
  },
  insurance: {
    title: "Does insurance cover an IDE?",
    text: "Insurance coverage for IDEs may vary by location, insurance plan, and provider requirements. Eden ABA Therapy can help families review available options and understand whether evaluation services may be covered.",
    button: "Insurance & Financial Assistance",
  },
  after: {
    title: "What happens after an IDE?",
    intro: "After the evaluation, families typically meet with the clinician for a feedback session. During this meeting, families may receive:",
    checklist: [
      "A detailed diagnostic report with test results and clinical observations",
      "Diagnostic insights explaining whether the child shows characteristics of autism",
      "Individualized recommendations for next steps, which may include ABA therapy, speech therapy, occupational therapy, school supports, or other interventions",
    ],
    additional:
      "At the family's request, the report may be shared with the child's pediatrician, school team, or other providers to support referrals, planning, and ongoing care.",
  },
  timing: {
    title: "When is the right time for an IDE?",
    cards: [
      [
        "Does an IDE diagnose autism?",
        "An IDE helps evaluate whether autism is present. If a child meets diagnostic criteria, a diagnosis of autism may be provided by the evaluating professional. If the child does not meet criteria, other recommendations or referrals may be provided.",
      ],
      [
        "Why is early autism diagnosis important?",
        "Early diagnosis can help families access early intervention, therapy services, school supports, and insurance-covered care. Many therapies, including ABA therapy, may require a formal diagnosis for coverage.",
      ],
      [
        "What can we expect during an IDE?",
        "The process is designed to be as comfortable as possible for the child. It may include a parent interview, parent questionnaires, child observation, and standardized testing.",
      ],
      [
        "What's the difference between an IDE and the ADOS-2?",
        "An IDE is a broader diagnostic evaluation completed by a qualified professional and may include developmental history, behavioral observations, parent questionnaires, and standardized tools. The ADOS-2 is one assessment tool that may be used to gather information about autism-related behaviors, but it does not diagnose autism by itself.",
      ],
    ],
  },
  getStarted: {
    title: "Ready to get started?",
    intro:
      "Eden ABA Therapy is here to help guide your family through the diagnostic process so your child can access the care and support they need. Complete the brief form, and a team member will contact you to discuss your child's needs.",
  },
  form: {
    fields: {
      parentFirstName: "Parent/Guardian First Name*",
      parentLastName: "Parent/Guardian Last Name*",
      email: "Email*",
      phone: "Phone Number*",
      childDateOfBirth: "Child's Date of Birth",
      childFirstName: "Child's First Name",
      zipCode: "Zip Code*",
      preferredLocation: "Preferred Eden ABA Location*",
      completedScreener: "Has your child completed M-CHAT-R or CAST?",
      concerns: "What concerns do you have?",
      hasDiagnosis: "Has your child already received a diagnosis?",
    },
    locationPlaceholder: "Select a location",
    selectPlaceholder: "Please select",
    locationOptions: ["Fairfax", "Centreville", "Chantilly", "Reston", "Herndon", "Annandale"],
    screenerOptions: ["Yes — M-CHAT-R", "Yes — CAST", "Yes — both", "No, not yet"],
    diagnosisOptions: ["Yes", "No", "Evaluation in progress", "Not sure"],
    consent:
      "I consent to receive occasional text messages from Eden ABA Therapy regarding educational resources and follow-up related to my inquiry. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
    submit: "Submit",
    validationError:
      "Please complete all required fields, enter a valid email and phone number, select a location, and accept the consent statement.",
    successMessage:
      "Thank you. Your IDE evaluation request has been received. A member of our team will contact you within one business day.",
  },
  faq: {
    title: "FAQs About Initial Diagnostic Evaluations",
    items: [
      [
        "What happens after the IDE?",
        "The clinician who completes the IDE will schedule a feedback appointment to review results and recommendations. A written report may also be provided. At your request, the report can be shared with other providers to support planning and next steps.",
      ],
      [
        "Do you offer virtual autism evaluations?",
        "Evaluation options may vary by region. Some families may be able to complete parts of the evaluation through telehealth, while others may complete the evaluation in person. Contact Eden ABA Therapy to learn what options are available near you.",
      ],
      [
        "Why is it important to get an autism diagnosis?",
        "A formal diagnosis may help children access therapies such as ABA, speech therapy, or occupational therapy. It may also be necessary for school services and insurance coverage. Early diagnosis can open the door to early intervention and long-term support.",
      ],
    ],
  },
};

const ideVi = structuredClone(ideEn);
ideVi.meta = {
  title: "Đánh giá Chẩn đoán Ban đầu Tự kỷ | Eden ABA Therapy",
  description:
    "Tìm hiểu Đánh giá Chẩn đoán Ban đầu (IDE) cho tự kỷ, nội dung bao gồm, đối tượng phù hợp và cách Eden ABA Therapy hỗ trợ gia đình.",
};
ideVi.hero = {
  breadcrumb: ["Đánh giá Tự kỷ", "IDE"],
  badge: "Hỗ trợ Chẩn đoán Chuyên nghiệp",
  title: "Đánh giá Chẩn đoán Ban đầu: Hỗ trợ Chẩn đoán Tự kỷ",
  subtitle:
    "Tại Eden ABA Therapy, chúng tôi cung cấp hỗ trợ chẩn đoán cho gia đình thắc mắc con có thể mắc rối loạn phổ tự kỷ (ASD). IDE giúp xác định liệu trẻ có đáp ứng tiêu chí chẩn đoán tự kỷ và các bước tiếp theo được đề xuất.",
  availabilityNote:
    "IDE có thể không có sẵn ở mọi khu vực. Liên hệ Eden ABA Therapy để biết lựa chọn đánh giá gần bạn.",
  scheduleButton: "Lên lịch Đánh giá",
  findCenterButton: "Tìm Cơ sở",
  imageAlt: "Chuyên gia tương tác ấm áp với trẻ nhỏ qua hoạt động chẩn đoán dựa trên vui chơi",
};
ideVi.whatIs.title = "Đánh giá Chẩn đoán Ban đầu (IDE) là gì?";
ideVi.whoCan.title = "Ai có thể hoàn thành IDE?";
ideVi.measure.title = "IDE đo lường điều gì?";
ideVi.tools.title = "Công cụ nào được dùng trong IDE?";
ideVi.where.title = "IDE được thực hiện ở đâu?";
ideVi.insurance.title = "Bảo hiểm có chi trả IDE không?";
ideVi.insurance.button = "Bảo hiểm & Hỗ trợ Tài chính";
ideVi.after.title = "Điều gì xảy ra sau IDE?";
ideVi.timing.title = "Khi nào là thời điểm phù hợp cho IDE?";
ideVi.getStarted.title = "Sẵn sàng bắt đầu?";
ideVi.getStarted.intro =
  "Eden ABA Therapy sẵn sàng hướng dẫn gia đình qua quá trình chẩn đoán. Hoàn thành biểu mẫu ngắn và thành viên đội ngũ sẽ liên hệ thảo luận nhu cầu của con bạn.";
ideVi.faq.title = "FAQ về Đánh giá Chẩn đoán Ban đầu";
ideVi.form.fields = {
  parentFirstName: "Tên Phụ huynh/Người giám hộ*",
  parentLastName: "Họ Phụ huynh/Người giám hộ*",
  email: "Email*",
  phone: "Số điện thoại*",
  childDateOfBirth: "Ngày sinh con",
  childFirstName: "Tên con",
  zipCode: "Mã bưu điện*",
  preferredLocation: "Cơ sở Eden ABA ưu tiên*",
  completedScreener: "Con đã hoàn thành M-CHAT-R hoặc CAST chưa?",
  concerns: "Mối quan tâm của bạn là gì?",
  hasDiagnosis: "Con đã được chẩn đoán chưa?",
};
ideVi.form.submit = "Gửi";
ideVi.form.validationError =
  "Vui lòng hoàn thành các trường bắt buộc, nhập email và số điện thoại hợp lệ, chọn cơ sở, và chấp nhận điều khoản đồng ý.";
ideVi.form.successMessage =
  "Cảm ơn bạn. Yêu cầu đánh giá IDE đã được nhận. Thành viên đội ngũ sẽ liên hệ trong một ngày làm việc.";

for (const [file, data] of [
  ["locales/en.json", ideEn],
  ["locales/vi.json", ideVi],
]) {
  const locale = JSON.parse(readFileSync(file, "utf8"));
  locale.pages["ideEvaluation"] = data;
  writeFileSync(file, JSON.stringify(locale, null, 2) + "\n");
}

console.log("Patched ideEvaluation locales");
