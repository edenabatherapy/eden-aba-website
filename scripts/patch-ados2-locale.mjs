import { readFileSync, writeFileSync } from "fs";

const ados2En = {
  meta: {
    title: "ADOS-2 Autism Assessment | Eden ABA Therapy",
    description:
      "Learn about the ADOS-2 autism assessment, what it measures, who it is for, and how Eden ABA Therapy helps families understand next steps after autism screening.",
  },
  hero: {
    breadcrumb: ["Autism Evaluation", "ADOS-2"],
    badge: "Professional Autism Evaluation",
    title: "The ADOS-2: Professional Autism Evaluation",
    subtitle:
      "The Autism Diagnostic Observation Schedule, Second Edition (ADOS-2) is a face-to-face, play-based assessment used to evaluate children for possible autism spectrum disorder (ASD). During the assessment, a trained clinician observes how your child communicates, plays, and interacts. Results can help inform the autism diagnostic process.",
    scheduleButton: "Schedule the ADOS-2",
    findCenterButton: "Find a Center",
    imageAlt: "Clinician engaging a young child in a warm play-based developmental assessment",
  },
  whatIs: {
    title: "What is the ADOS-2?",
    intro:
      "The ADOS-2 is a standardized, play-based assessment and a trusted tool for helping evaluate possible autism in children.",
    cards: [
      [
        "A Gold Standard",
        "The ADOS-2 is considered a gold-standard measure for evaluating children for ASD. It is backed by research and helps professionals identify autism-related characteristics.",
      ],
      [
        "Play-Based",
        "The ADOS-2 is not like a typical doctor's visit. During the assessment, the clinician engages your child in activities tailored to their age, communication skills, and developmental level.",
      ],
      [
        "Scoring",
        "After the assessment, scores are calculated to show how closely your child's behaviors in key areas match autism characteristics. A summary may be shared with your child's pediatrician or referring provider to support the diagnostic process.",
      ],
    ],
  },
  measure: {
    title: "What does the ADOS-2 measure?",
    intro:
      "The ADOS-2 looks at areas of a child's development often linked to autism. During the evaluation, a trained clinician observes how your child communicates, plays, and interacts.",
    areas: [
      ["Social communication", "Making eye contact, using gestures, or sharing enjoyment with others."],
      ["Play and imagination", "How your child uses toys and whether they engage in pretend play."],
      ["Language use", "How your child talks and responds in social situations."],
      ["Repetitive behaviors or strong interests", "Repeated movements or intense focus on specific topics."],
    ],
    closing:
      "Behaviors most closely associated with autism are scored to show how your child's responses compare to common autism characteristics.",
    imageAlt: "Therapist using picture cards during a play-based assessment with a child",
  },
  modules: {
    title: "ADOS-2 Modules Explained",
    intro: "The ADOS-2 includes five modules, each matched to a child's age and language abilities.",
    list: [
      ["Toddler Module", "For children 12 to 30 months old."],
      ["Module 1", "For children who do not yet speak in phrases."],
      ["Module 2", "For children who speak in phrases but are not yet verbally fluent."],
      ["Module 3", "For verbally fluent children."],
      ["Module 4", "For verbally fluent adolescents and adults."],
    ],
    edenNoteLabel: "Eden ABA note:",
    edenNote:
      "At Eden ABA Therapy, assessment availability may vary by region. Clinicians select the appropriate module based on the child's communication skills, age, and developmental stage.",
  },
  results: {
    title: "Understanding the ADOS-2 Results",
    intro:
      "Once the ADOS-2 is complete, the clinician scores the assessment using a standardized system. Behaviors most associated with autism are totaled, and the results show how closely the child's responses compare to common autism characteristics.",
    additional:
      "The ADOS-2 is one piece of the bigger picture. Parent concerns, developmental history, clinical observation, and provider review are also important parts of the evaluation process.",
    imageAlt: "Parent and clinician reviewing developmental assessment information together",
    steps: [
      ["Step 1", "Assessment completed", "Your child completes the play-based ADOS-2 activities with a trained clinician."],
      ["Step 2", "Clinician scores results", "Responses are scored using the standardized ADOS-2 system."],
      ["Step 3", "Results reviewed", "The summary is reviewed alongside developmental history and parent concerns."],
      ["Step 4", "Next steps discussed", "Your family receives guidance on recommended follow-up and care options."],
    ],
  },
  whoCan: {
    title: "Who can take the ADOS-2?",
    intro:
      "The ADOS-2 may be appropriate for children who are showing possible signs of autism, such as limited eye contact, delayed communication, differences in play, repetitive behaviors, or social communication challenges.",
    onlineBadge: "Online",
    professionalBadge: "Professional",
    learnMore: "Learn more",
    options: [
      ["Online", "The M-CHAT-R", "Online autism screener for toddlers.", "mchat"],
      ["Online", "The CAST", "Online autism screener for older children.", "cast"],
      ["Professional", "The ADOS-2", "Play-based, in-person ASD assessment.", "ados"],
      ["Professional", "IDE", "Initial Diagnostic Evaluation, in person or via telehealth if available.", "ide"],
    ],
  },
  faq: {
    title: "Frequently Asked Questions About the ADOS-2",
    items: [
      [
        "Why is it important to get an autism diagnosis for your child?",
        "A formal autism diagnosis may help your child access certain developmental therapies, school supports, and services such as ABA therapy.",
      ],
      [
        "Who conducts the ADOS-2?",
        "The ADOS-2 is conducted by a trained clinician who meets the publisher's criteria for administering and scoring the tool.",
      ],
      [
        "What happens during the ADOS-2?",
        "The clinician completes a set of play-based activities while observing key behaviors associated with autism. Activities may vary depending on the child's age, communication skills, and developmental level.",
      ],
      [
        "Does the ADOS-2 diagnose autism?",
        "The ADOS-2 does not diagnose autism by itself. It provides important information that helps a qualified provider make diagnostic decisions.",
      ],
      [
        "What happens after the ADOS-2?",
        "The results summary may be reviewed by your child's treating provider. They will consider all available information to determine whether your child meets diagnostic criteria for autism and what next steps may be recommended.",
      ],
      [
        "Who can administer the ADOS-2?",
        "Only professionals trained in the tool and qualified under the publisher's standards should administer the ADOS-2.",
      ],
      [
        "How often can the ADOS-2 be administered?",
        "The ADOS-2 can be administered more than once, but repeated assessments are usually spaced out and recommended only when new developmental questions arise or earlier results were inconclusive.",
      ],
      [
        "Does insurance cover the ADOS-2?",
        "Coverage and cost may vary by location, provider, and insurance plan. Families should contact Eden ABA Therapy to confirm availability and options in their region.",
      ],
    ],
  },
  schedule: {
    title: "Schedule the ADOS-2",
    intro:
      "Contact your nearest Eden ABA Therapy location or complete the form below to request an autism evaluation. This form helps us match your family with the right center and next step.",
    form: {
      fields: {
        parentFirstName: "Parent/Guardian First Name*",
        parentLastName: "Parent/Guardian Last Name*",
        email: "Email*",
        phone: "Phone Number*",
        childFirstName: "Child First Name",
        childDateOfBirth: "Child Date of Birth",
        postalCode: "Postal Code*",
        preferredLocation: "Preferred Location",
        completedScreener: "Has your child completed an online screener?",
        hasDiagnosis: "Has your child already received an autism diagnosis?",
        message: "Message / Concerns",
      },
      locationPlaceholder: "Select a location",
      selectPlaceholder: "Please select",
      locationOptions: ["Fairfax", "Centreville", "Chantilly", "Reston", "Herndon", "Annandale"],
      screenerOptions: ["Yes — M-CHAT-R", "Yes — CAST", "Yes — both", "No, not yet"],
      diagnosisOptions: ["Yes", "No", "Evaluation in progress", "Not sure"],
      consent:
        "I consent to receive occasional text messages from Eden ABA Therapy regarding educational resources and follow-up related to my inquiry. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
      submit: "Request ADOS-2 Appointment",
      validationError:
        "Please complete all required fields, enter a valid email and phone number, and accept the consent statement.",
      successMessage:
        "Thank you. Your ADOS-2 appointment request has been received. A member of our team will contact you within one business day.",
    },
  },
  finalCta: {
    title: "Need Help Understanding Your Child's Evaluation Options?",
    text: "Eden ABA Therapy can help your family understand screening results, autism evaluation options, and next steps for care.",
    startScreener: "Start Online Screener",
    contactEden: "Contact Eden ABA",
  },
};

const ados2Vi = structuredClone(ados2En);
ados2Vi.meta = {
  title: "Đánh giá Tự kỷ ADOS-2 | Eden ABA Therapy",
  description:
    "Tìm hiểu đánh giá tự kỷ ADOS-2, nội dung đo lường, đối tượng phù hợp và cách Eden ABA Therapy hỗ trợ gia đình hiểu bước tiếp theo sau sàng lọc.",
};
ados2Vi.hero = {
  breadcrumb: ["Đánh giá Tự kỷ", "ADOS-2"],
  badge: "Đánh giá Tự kỷ Chuyên nghiệp",
  title: "ADOS-2: Đánh giá Tự kỷ Chuyên nghiệp",
  subtitle:
    "Lịch Quan sát Chẩn đoán Tự kỷ, Phiên bản thứ hai (ADOS-2) là đánh giá trực tiếp dựa trên vui chơi dùng để đánh giá trẻ có thể mắc rối loạn phổ tự kỷ (ASD). Trong buổi đánh giá, chuyên viên được đào tạo quan sát cách con bạn giao tiếp, chơi và tương tác.",
  scheduleButton: "Lên lịch ADOS-2",
  findCenterButton: "Tìm Cơ sở",
  imageAlt: "Chuyên viên tương tác ấm áp với trẻ nhỏ qua hoạt động đánh giá dựa trên vui chơi",
};
ados2Vi.whatIs.title = "ADOS-2 là gì?";
ados2Vi.measure.title = "ADOS-2 đo lường điều gì?";
ados2Vi.modules.title = "Giải thích các Module ADOS-2";
ados2Vi.results.title = "Hiểu Kết quả ADOS-2";
ados2Vi.whoCan.title = "Ai có thể làm ADOS-2?";
ados2Vi.whoCan.learnMore = "Tìm hiểu thêm";
ados2Vi.faq.title = "Câu Hỏi Thường Gặp Về ADOS-2";
ados2Vi.schedule.title = "Lên lịch ADOS-2";
ados2Vi.schedule.intro =
  "Liên hệ cơ sở Eden ABA Therapy gần nhất hoặc hoàn thành biểu mẫu bên dưới để yêu cầu đánh giá tự kỷ.";
ados2Vi.schedule.form.fields = {
  parentFirstName: "Tên Phụ huynh/Người giám hộ*",
  parentLastName: "Họ Phụ huynh/Người giám hộ*",
  email: "Email*",
  phone: "Số điện thoại*",
  childFirstName: "Tên con",
  childDateOfBirth: "Ngày sinh con",
  postalCode: "Mã bưu điện*",
  preferredLocation: "Cơ sở ưu tiên",
  completedScreener: "Con bạn đã hoàn thành sàng lọc trực tuyến chưa?",
  hasDiagnosis: "Con bạn đã được chẩn đoán tự kỷ chưa?",
  message: "Tin nhắn / Mối quan tâm",
};
ados2Vi.schedule.form.locationPlaceholder = "Chọn cơ sở";
ados2Vi.schedule.form.selectPlaceholder = "Vui lòng chọn";
ados2Vi.schedule.form.submit = "Yêu cầu Lịch hẹn ADOS-2";
ados2Vi.schedule.form.validationError =
  "Vui lòng hoàn thành các trường bắt buộc, nhập email và số điện thoại hợp lệ, và chấp nhận điều khoản đồng ý.";
ados2Vi.schedule.form.successMessage =
  "Cảm ơn bạn. Yêu cầu lịch hẹn ADOS-2 đã được nhận. Thành viên đội ngũ sẽ liên hệ trong một ngày làm việc.";
ados2Vi.finalCta = {
  title: "Cần Giúp Hiểu Lựa Chọn Đánh Giá Cho Con?",
  text: "Eden ABA Therapy có thể giúp gia đình hiểu kết quả sàng lọc, lựa chọn đánh giá tự kỷ và bước tiếp theo cho chăm sóc.",
  startScreener: "Bắt đầu Sàng lọc Trực tuyến",
  contactEden: "Liên hệ Eden ABA",
};

for (const [file, data] of [
  ["locales/en.json", ados2En],
  ["locales/vi.json", ados2Vi],
]) {
  const locale = JSON.parse(readFileSync(file, "utf8"));
  locale.pages["ados2Assessment"] = data;
  writeFileSync(file, JSON.stringify(locale, null, 2) + "\n");
}

console.log("Patched ados2Assessment locales");
