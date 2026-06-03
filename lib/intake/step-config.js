/** Eden ABA Therapy advanced intake — step field configuration. */
import { UPLOAD_LABELS } from './constants.js';
import { getConsentAckFields } from './consent-docs.js';

const FILE_ACCEPT = ".pdf,.jpg,.jpeg,.png";

const UPLOAD_FIELDS = UPLOAD_LABELS.map((label, i) => ({
  name: `file${i}`,
  label: label.replace(/ \*$/, ""),
  type: "file",
  accept: FILE_ACCEPT,
}));

export const STEP_SECTIONS = [
  {
    sections: [
      {
        title: "Child Information",
        icon: "👤",
        fields: [
          { name: "childFullName", label: "Child Legal Full Name", type: "text", required: true, placeholder: "First Middle Last" },
          { name: "preferredName", label: "Preferred Name", type: "text", placeholder: "Enter preferred name" },
          { name: "dob", label: "Date of Birth", type: "date" },
          { name: "childAge", label: "Child Age", type: "text", placeholder: "Auto/enter age" },
          { name: "primaryLanguageChild", label: "Child Primary Language", type: "text", required: true, placeholder: "English, Dari, Pashto, etc." },
          { name: "street", label: "Street Address", type: "text", required: true, placeholder: "Enter street address" },
          { name: "apt", label: "Apartment, Suite, etc.", type: "text" },
          { name: "city", label: "City", type: "text" },
          { name: "zip", label: "ZIP Code", type: "text" },
          { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other", "Prefer not to say"] },
          { name: "state", label: "State", type: "select", options: ["VA", "MD", "DC", "WV", "Other"] },
          { name: "livingSetting", label: "Current Living Setting", type: "select", options: ["With both parents", "With mother", "With father", "With guardian", "Shared custody", "Foster care", "Other"] },
        ],
      },
      {
        title: "Parent / Guardian Information",
        icon: "👥",
        fields: [
          { name: "guardianName", label: "Primary Parent / Guardian Full Name", type: "text" },
          { name: "phone", label: "Primary Phone Number", type: "tel", required: true, placeholder: "(703) 000-0000" },
          { name: "email", label: "Primary Email Address", type: "email", required: true, placeholder: "name@example.com" },
          { name: "secondaryGuardianName", label: "Secondary Parent / Guardian Name", type: "text" },
          { name: "secondaryPhone", label: "Secondary Phone", type: "tel" },
          { name: "secondaryEmail", label: "Secondary Email", type: "email" },
          { name: "emergencyContactName", label: "Emergency Contact Name", type: "text", required: true },
          { name: "emergencyContactPhone", label: "Emergency Contact Phone", type: "tel", required: true },
          { name: "relationship", label: "Relationship to Child", type: "select", options: ["Mother", "Father", "Guardian", "Foster Parent", "Grandparent", "Other"] },
          { name: "primaryContactLegal", label: "Is this person legally authorized to consent to treatment?", type: "select", options: ["Yes", "No", "Not Sure"] },
          { name: "preferredContactTime", label: "Best Contact Time", type: "select", options: ["Morning", "Afternoon", "Evening", "Anytime"] },
          { name: "secondaryRelationship", label: "Secondary Relationship", type: "select", options: ["Mother", "Father", "Guardian", "Grandparent", "Other"] },
          { name: "contactMethod", label: "Preferred Contact Method *", type: "checkbox-group", required: true, options: ["Phone Call", "Text Message", "Email", "Any"] },
        ],
      },
      {
        title: "Referral & Intake Source",
        icon: "📌",
        fields: [
          { name: "referralSource", label: "Referral Source / Name", type: "text" },
          { name: "preferredStartDate", label: "Preferred Start Date", type: "date" },
          { name: "hearAbout", label: "How did you hear about us?", type: "select", options: ["Google", "Doctor / Pediatrician", "Insurance", "School", "Social Media", "Friend / Family", "Case Manager", "Other"] },
          { name: "serviceRequested", label: "Service Requested", type: "select", options: ["ABA Therapy", "ABA Assessment Only", "Parent Training", "School Consultation", "Telehealth Parent Training", "Not Sure"] },
          { name: "preferredServiceLocation", label: "Preferred Service Location", type: "select", options: ["Home", "Clinic", "School/Daycare", "Community", "Telehealth", "Combination", "Not Sure"] },
          { name: "urgency", label: "Urgency / Priority", type: "select", options: ["Routine", "As soon as possible", "High safety concern", "School placement issue", "Insurance deadline", "Other"] },
          { name: "intakeReason", label: "Main reason for seeking ABA services now", type: "textarea", required: true, placeholder: "Please describe your child’s needs, family concerns, and what support you are requesting." },
        ],
      },
      {
        title: "Advanced Intake Triage & Accessibility",
        icon: "🚦",
        fields: [
          { name: "medicaidMco", label: "Medicaid / MCO Plan if applicable", type: "select", options: ["Not Medicaid", "Aetna Better Health of Virginia", "Anthem HealthKeepers Plus", "Molina Complete Care", "Sentara / Optima", "UnitedHealthcare Community Plan", "Virginia Medicaid Fee-for-Service", "Other", "Not sure"] },
          { name: "accessibilityNeeds", label: "Accessibility Needs", type: "select", options: ["None", "Interpreter", "Large print", "Caregiver assistance completing form", "Technology support", "Transportation support", "Other"] },
          { name: "familyPriority", label: "Family Priority", type: "select", options: ["Start services quickly", "Insurance authorization help", "High safety concerns", "School support", "Parent training", "Assessment only", "Not sure"] },
          { name: "barriersToCare", label: "Barriers to care / social needs", type: "textarea", placeholder: "Transportation, housing instability, technology access, caregiver schedule, language access, food insecurity, etc." },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Diagnosis & Medical Information",
        icon: "🩺",
        fields: [
          { name: "diagnosisDate", label: "Date of Diagnosis", type: "date" },
          { name: "diagnosingProvider", label: "Diagnosing Provider / Facility", type: "text" },
          { name: "otherDiagnoses", label: "Other Diagnoses", type: "text", placeholder: "Enter all diagnoses, separated by commas" },
          { name: "lastWellVisit", label: "Last Well-Child Visit", type: "date" },
          { name: "primaryPhysician", label: "Primary Physician / Pediatrician", type: "text", required: true },
          { name: "providerPhone", label: "Physician / Provider Phone Number", type: "tel", required: true, placeholder: "(703) 000-0000" },
          { name: "providerEmail", label: "Physician / Provider Email", type: "email", placeholder: "name@example.com" },
          { name: "primaryDiagnosis", label: "Primary Diagnosis / Reason for Referral", type: "select", options: ["Autism Spectrum Disorder", "Developmental Delay", "Behavior Concerns", "Speech Delay", "ADHD", "Intellectual Disability", "Genetic Condition", "Other"] },
          { name: "diagnosticReportAvailable", label: "Do you have a diagnostic evaluation report?", type: "select", options: ["Yes", "No", "Requested / Pending", "Not Sure"] },
        ],
      },
      {
        title: "Medical Risk, Medications & Allergies",
        icon: "💊",
        fields: [
          { name: "majorIllnessDetails", label: "If yes, please explain", type: "textarea", placeholder: "Dates, reason, treatment, restrictions..." },
          { name: "medicationList", label: "If yes, list medication, dosage, schedule, prescribing doctor", type: "textarea" },
          { name: "allergyList", label: "If yes, list allergies and reactions", type: "textarea", placeholder: "Food, medication, latex, environmental, EpiPen, etc." },
          { name: "seizurePlan", label: "If yes, describe seizure plan / emergency instructions", type: "textarea" },
          { name: "dietRestrictions", label: "Dietary restrictions / feeding precautions", type: "textarea", placeholder: "Texture restrictions, choking risk, allergies, cultural/religious restrictions, preferred foods..." },
          { name: "majorIllness", label: "Has your child had major illnesses, injuries, hospitalizations, or surgeries?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "medications", label: "Does your child currently take medication?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "allergies", label: "Does your child have allergies?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "seizureHistory", label: "Seizure history or neurological concerns?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "medicalSupports", label: "Medical / Safety Supports Needed", type: "checkbox-group", options: ["EpiPen", "Inhaler", "Rescue medication", "Glasses", "Hearing aid", "Feeding plan", "Seizure protocol", "Mobility support", "None", "Other"] },
        ],
      },
      {
        title: "Insurance Information",
        icon: "🛡",
        fields: [
          { name: "memberId", label: "Member ID / Policy ID", type: "text" },
          { name: "groupNumber", label: "Group Number", type: "text" },
          { name: "policyHolder", label: "Policy Holder Name", type: "text" },
          { name: "policyDob", label: "Date of Birth Policy Holder", type: "date" },
          { name: "insurancePhone", label: "Insurance Phone Number", type: "tel", required: true },
          { name: "employer", label: "Policy Holder Employer", type: "text" },
          { name: "insuranceAddress", label: "Insurance Claims / Mailing Address", type: "text" },
          { name: "authorizationNumber", label: "Existing Authorization / Referral Number", type: "text" },
          { name: "caseManagerName", label: "Insurance Case Manager Name", type: "text" },
          { name: "caseManagerPhone", label: "Insurance Case Manager Phone", type: "tel" },
          { name: "insuranceProvider", label: "Primary Insurance Provider", type: "select", options: ["Aetna", "Anthem", "Blue Cross Blue Shield", "Cigna", "Medicaid", "United Healthcare", "Tricare", "Kaiser", "Other"] },
          { name: "policyRelationship", label: "Relationship to Child", type: "select", options: ["Self", "Mother", "Father", "Guardian", "Other"] },
          { name: "referralRequired", label: "Does your plan require a referral for ABA services?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "abaCovered", label: "Is ABA therapy covered under this plan?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "oopChecked", label: "Have you checked out-of-pocket costs?", type: "radio", options: ["Yes", "No", "Not Sure"] },
        ],
      },
      {
        title: "Prior Authorization Readiness",
        icon: "📌",
        fields: [
          { name: "icd10Diagnosis", label: "ICD-10 Diagnosis Code", type: "text", placeholder: "Example: F84.0" },
          { name: "lmnDate", label: "Letter of Medical Necessity Date", type: "date" },
          { name: "previousAbaProvider", label: "Previous ABA Provider", type: "text" },
          { name: "lastAbaServiceDate", label: "Last ABA Service Date", type: "date" },
          { name: "requestedCptCodes", label: "Requested / expected ABA CPT codes", type: "text", placeholder: "97151, 97153, 97155, 97156" },
          { name: "secondaryInsuranceName", label: "Secondary Insurance Name", type: "text" },
          { name: "lmnAvailable", label: "Letter of Medical Necessity Available?", type: "select", options: ["Yes", "No", "Requested", "Not sure"] },
          { name: "priorAbaLast6Months", label: "ABA in last 6 months?", type: "select", options: ["Yes", "No", "Not sure"] },
          { name: "secondaryInsurance", label: "Secondary Insurance?", type: "select", options: ["Yes", "No", "Not sure"] },
          { name: "medicalNecessitySummary", label: "Medical necessity summary for authorization", type: "textarea", placeholder: "Functional impairments, risks, prior services, barriers, why ABA is requested now..." },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Legal Guardian / Authorized Representative",
        icon: "👤",
        fields: [
          { name: "legalRepName", label: "Full Name *", type: "text", required: true, placeholder: "First and Last Name" },
          { name: "legalRepPhone", label: "Phone Number *", type: "tel", required: true, placeholder: "(703) 000-0000" },
          { name: "legalRepEmail", label: "Phone Number *", type: "email", required: true, placeholder: "name@example.com" },
          { name: "legalRepRelationship", label: "Relationship to Child *", type: "select", required: true, options: ["Mother", "Father", "Guardian", "Authorized Representative", "Other"] },
        ],
      },
      {
        title: "Legal Documents & Court Orders",
        icon: "📄",
        fields: [
          { name: "courtOrderDetails", label: "If yes, please describe", type: "textarea", placeholder: "Please provide details..." },
          { name: "courtOrders", label: "Are there any court orders, custody agreements, or restraining orders related to your child?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "legalDocumentUpload", label: "Upload court orders / custody documents (JPG, PNG, PDF — max 10MB)", type: "file", accept: ".pdf,.jpg,.jpeg,.png" },
        ],
      },
      {
        title: "Additional Compliance Acknowledgments",
        icon: "🧾",
        fields: [
          { name: "consentLimitations", label: "Consent limitations or restrictions", type: "textarea", placeholder: "List any restrictions on communication, release of information, photography/video, school contact, custody, or billing communication." },
          { name: "dataCollectionConsent", label: "Consent for clinical data collection and progress monitoring?", type: "radio", options: ["Yes", "No"] },
          { name: "photoVideoConsent", label: "Photo/video use for treatment supervision only?", type: "radio", options: ["Yes", "No"] },
          { name: "electronicCommunicationConsent", label: "Consent to electronic communication for scheduling/intake?", type: "radio", options: ["Yes", "No"] },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Financial Responsibility & Billing",
        icon: "💳",
        fields: [
          { name: "financialResponsiblePhone", label: "Financial Responsible Party Phone", type: "tel", required: true },
          { name: "financialResponsibleEmail", label: "Financial Responsible Party Email", type: "email", required: true },
          { name: "statementEmail", label: "Email for Statements", type: "email" },
          { name: "billingAddress", label: "Billing Address if different", type: "text" },
          { name: "financialResponsible", label: "Who is financially responsible for this account?", type: "select", options: ["Parent", "Guardian", "Policy Holder", "Self", "Other"] },
          { name: "financialRelationship", label: "Relationship to Child", type: "select", options: ["Mother", "Father", "Guardian", "Policy Holder", "Other"] },
          { name: "billingMethod", label: "Preferred Billing Method", type: "select", options: ["Auto Pay", "Credit / Debit Card", "HSA / FSA", "Cash / Check", "Invoice Only"] },
          { name: "billingNotes", label: "Billing / copay / deductible notes", type: "textarea", placeholder: "Anything we should know about billing, secondary insurance, payer coordination, or financial concerns?" },
          { name: "paymentType", label: "How will you be paying for services?", type: "radio", options: ["Insurance", "Self-Pay / Private Pay", "Both Insurance & Self-Pay", "Not Sure"] },
          { name: "outOfPocket", label: "Do you have out-of-pocket cost?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "statements", label: "How would you like to receive statements?", type: "radio", options: ["Email", "Mail", "Both"] },
        ],
      },
      {
        title: "Communication Preferences",
        icon: "💬",
        fields: [
          { name: "preferredNumber", label: "Preferred Contact Number", type: "tel" },
          { name: "alternateNumber", label: "Alternate Contact Number", type: "tel" },
          { name: "language", label: "Preferred Language", type: "select", options: ["English", "Dari", "Pashto", "Spanish", "Arabic", "Urdu", "Other"] },
          { name: "communicationFrequency", label: "Preferred Update Frequency", type: "select", options: ["After each session", "Weekly", "Bi-weekly", "Monthly", "As needed"] },
          { name: "reportPreference", label: "Preferred Report Format", type: "select", options: ["Plain language summary", "Clinical report", "Both summary and clinical report", "Portal only"] },
          { name: "communicationNotes", label: "Communication notes", type: "textarea", placeholder: "Preferred caregiver contact, translation needs, family schedule, communication boundaries, etc." },
          { name: "interpreterNeeded", label: "Interpreter needed?", type: "radio", options: ["Yes", "No", "Sometimes"] },
          { name: "bestTime", label: "Best time to contact you?", type: "radio", options: ["Morning", "Afternoon", "Evening", "Anytime"] },
          { name: "preferredContact", label: "How would you prefer to be contacted?", type: "checkbox-group", options: ["Phone Call", "Text Message", "Email", "Mail", "Portal Message"] },
          { name: "reminderMethod", label: "How would you like appointment reminders?", type: "checkbox-group", options: ["Text Message", "Email", "Phone Call", "Portal Message"] },
        ],
      },
      {
        title: "Availability & Scheduling",
        icon: "📅",
        fields: [
          { name: "preferredAssessmentDate", label: "Preferred Assessment Date", type: "date" },
          { name: "hoursRequested", label: "Requested Weekly ABA Hours", type: "select", options: ["Less than 10", "10–15", "15–20", "20–25", "25–30", "30+", "Not sure"] },
          { name: "caregiverTrainingAvailability", label: "Caregiver Training Availability", type: "select", options: ["Weekly", "Bi-weekly", "Monthly", "Evenings only", "Weekends only", "Not sure"] },
          { name: "homeAccess", label: "Home Access / Parking Notes", type: "select", options: ["Easy parking", "Street parking", "Apartment access needed", "Gate code needed", "Pets in home", "Other"] },
          { name: "scheduleNotes", label: "Scheduling notes and restrictions", type: "textarea", placeholder: "School schedule, nap schedule, transportation, siblings, work schedule, religious/cultural schedule, etc." },
          { name: "availableDays", label: "Days Available", type: "checkbox-group", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
          { name: "availableTimes", label: "Times Available", type: "checkbox-group", options: ["Early Morning", "Morning", "Afternoon", "After School", "Evening"] },
        ],
      },
      {
        title: "Operations & Portal Preferences",
        icon: "⚙️",
        fields: [
          { name: "schoolDistrict", label: "School District", type: "text" },
          { name: "schoolContact", label: "School Contact / Teacher", type: "text" },
          { name: "schoolPhoneEmail", label: "School Phone or Email", type: "text" },
          { name: "portalAccessNeeded", label: "Portal access needed?", type: "select", options: ["Yes", "No", "Not sure"] },
          { name: "secureMessagePreference", label: "Secure message preference", type: "select", options: ["Portal", "Encrypted email", "Phone only", "Text for scheduling only", "Not sure"] },
          { name: "sessionSettingPriority", label: "Preferred service setting priority", type: "select", options: ["Home first", "Clinic first", "School/daycare first", "Hybrid", "Telehealth parent training", "Not sure"] },
          { name: "transportationNotes", label: "Transportation / access / parking notes", type: "textarea", placeholder: "Parking, gate code, apartment access, pets, caregiver must be present, school arrival procedures..." },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Family Information",
        icon: "👥",
        fields: [
          { name: "caregiverName", label: "Primary Caregiver Full Name", type: "text" },
          { name: "caregiverPhone", label: "Phone Number", type: "tel" },
          { name: "caregiverEmail", label: "Email Address", type: "email" },
          { name: "pronouns", label: "Preferred Pronouns", type: "text" },
          { name: "caregiverRelationship", label: "Relationship to Child", type: "select", options: ["Mother", "Father", "Guardian", "Grandparent", "Foster Parent", "Other"] },
          { name: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Separated", "Widowed", "Prefer not to say"] },
          { name: "homeLanguage", label: "Primary Language Spoken at Home", type: "select", options: ["English", "Dari", "Pashto", "Spanish", "Arabic", "Other"] },
          { name: "decisionMaker", label: "Who has legal decision making for your child?", type: "select", options: ["Mother", "Father", "Both Parents", "Legal Guardian", "Court Appointed Guardian", "Other"] },
          { name: "household", label: "Other Household Members", type: "textarea", placeholder: "Name, relationship, age, and role in the home..." },
        ],
      },
      {
        title: "Child’s Development & History",
        icon: "📈",
        fields: [
          { name: "birthWeeks", label: "Gestational Age / Weeks at Birth", type: "text", placeholder: "e.g., 39 weeks" },
          { name: "birthWeight", label: "Birth Weight", type: "text", placeholder: "e.g., 7 lb 4 oz" },
          { name: "currentSchool", label: "Current School / Daycare / Program", type: "text" },
          { name: "schoolPlacement", label: "Current Educational Placement", type: "select", options: ["Not in school/daycare", "Daycare", "Preschool", "General Education", "Special Education", "Self-contained classroom", "Home-based instruction", "Other"] },
          { name: "pregnancyDetails", label: "If yes, please describe", type: "textarea", placeholder: "NICU stay, oxygen, feeding issues, jaundice, etc." },
          { name: "regressionDetails", label: "If yes, describe lost skills and age noticed", type: "textarea", placeholder: "Speech, toileting, feeding, social skills, play, etc." },
          { name: "diagnosisList", label: "If yes, please list all diagnoses", type: "textarea", placeholder: "Autism, ADHD, speech delay, anxiety, seizures, feeding disorder, etc." },
          { name: "pastServicesList", label: "If yes, list services received", type: "textarea", placeholder: "ABA, Speech, OT, PT, feeding therapy, counseling, school services, etc." },
          { name: "iep504Details", label: "IEP / 504 / IFSP Details", type: "textarea", placeholder: "Eligibility category, services, accommodations, goals, meeting date..." },
          { name: "fullTerm", label: "Was your child born full-term?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "pregnancyComp", label: "Were there any complications during pregnancy or delivery?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "developmentalRegression", label: "Has your child lost skills previously learned?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "diagnosedConcerns", label: "Does your child have diagnosed conditions or developmental concerns?", type: "radio", options: ["Yes", "No", "Not Sure"] },
          { name: "pastServices", label: "Has your child received therapies or early intervention services?", type: "radio", options: ["Yes", "No", "Not Sure"] },
        ],
      },
      {
        title: "Behavior & Safety Profile",
        icon: "🛡️",
        fields: [
          { name: "behaviorLevel", label: "Behavior severity level", type: "select", options: ["Mild concerns", "Moderate concerns", "Significant concerns", "Crisis / high safety concern", "Not sure"] },
          { name: "concernDetails", label: "Describe your top 3 concerns and examples", type: "textarea", required: true, placeholder: "What happens, how often, where it happens, and what usually triggers it?" },
          { name: "behaviorTriggers", label: "Known triggers or warning signs", type: "textarea", placeholder: "Denied access, transitions, waiting, noise, demands, change in routine, pain, hunger, etc." },
          { name: "deEscalation", label: "What helps calm your child?", type: "textarea", placeholder: "Preferred items, breaks, music, deep pressure, quiet space, caregiver strategies..." },
          { name: "medicalSafetyPlan", label: "Medical or emergency safety information", type: "textarea", placeholder: "Seizures, allergies, rescue medication, emergency protocol, physician instructions..." },
          { name: "concerns", label: "Main areas of concern", type: "checkbox-group", options: ["Communication", "Social Skills", "Behavior", "Play Skills", "Attention / Focus", "Learning Readiness", "Self-Help Skills", "Emotional Regulation", "Sensory Issues", "Motor Skills", "Safety Concerns", "Feeding", "Toileting", "Sleep", "Other"] },
          { name: "riskBehaviors", label: "Safety/Risk Behaviors", type: "checkbox-group", options: ["Aggression", "Self-injury", "Elopement / running away", "Property destruction", "Pica / eating non-food items", "Climbing / unsafe movement", "Choking risk", "Water safety risk", "Seizure risk", "Severe tantrums", "Other"] },
        ],
      },
      {
        title: "VB-MAPP / EESA Readiness",
        icon: "🗣️",
        fields: [
          { name: "primaryCommunication", label: "Primary Communication Method", type: "select", options: ["Vocal speech", "Gestures", "PECS / pictures", "AAC device", "Sign language", "Pulling/leading caregiver", "Crying/tantrum", "Mixed communication", "Not sure"] },
          { name: "requestingLevel", label: "Requesting / Manding Level", type: "select", options: ["Does not request independently", "Requests with gestures", "Uses single words/sounds", "Uses short phrases", "Uses full sentences", "Uses AAC/pictures", "Not sure"] },
          { name: "labelingLevel", label: "Labeling / Tact Level", type: "select", options: ["Not yet labeling", "Labels a few items", "Labels common items", "Labels actions/features", "Labels with phrases/sentences", "Not sure"] },
          { name: "echoicLevel", label: "Echoic / Vocal Imitation Level", type: "select", options: ["No vocal imitation", "Imitates sounds", "Imitates syllables", "Imitates words", "Imitates phrases", "Speech unclear", "Not sure"] },
          { name: "listenerResponding", label: "Listener Responding Level", type: "select", options: ["Does not follow directions", "Follows 1-step directions", "Follows 2-step directions", "Identifies items/body parts", "Follows group directions", "Not sure"] },
          { name: "intraverbalLevel", label: "Intraverbal / Conversation Level", type: "select", options: ["Does not answer questions", "Answers simple fill-ins", "Answers WH questions", "Has short conversation", "Conversational", "Not sure"] },
          { name: "imitationLevel", label: "Motor Imitation Level", type: "select", options: ["Does not imitate", "Imitates simple actions", "Imitates actions with objects", "Imitates sequences", "Not sure"] },
          { name: "visualMatching", label: "Visual Perceptual / Matching Level", type: "select", options: ["Does not match", "Matches identical objects", "Matches pictures", "Sorts/categories", "Completes puzzles/blocks", "Not sure"] },
          { name: "playSkills", label: "Play Skills Level", type: "select", options: ["No functional play", "Simple toy play", "Cause/effect play", "Pretend play", "Cooperative play", "Independent play", "Not sure"] },
          { name: "socialSkills", label: "Social / Peer Interaction Level", type: "select", options: ["Avoids peers", "Tolerates peers nearby", "Brief interaction", "Parallel play", "Cooperative play", "Seeks peers", "Not sure"] },
          { name: "groupLearning", label: "Group/Classroom Readiness", type: "select", options: ["Not ready for group", "Tolerates short group", "Can sit briefly", "Follows group routines", "Participates independently", "Not sure"] },
          { name: "languageSamples", label: "Caregiver language examples", type: "textarea", placeholder: "Words, sounds, phrases, AAC responses, requests, labels, questions answered..." },
        ],
      },
      {
        title: "VB-MAPP Barriers & Transition Indicators",
        icon: "🚧",
        fields: [
          { name: "barrierNotes", label: "Barriers / transition notes", type: "textarea", placeholder: "Describe anything that may affect learning, placement, treatment intensity, supervision, or safety." },
          { name: "reinforcers", label: "Known reinforcers / preferences", type: "textarea", required: true, placeholder: "Favorite toys, snacks, videos, activities, people, sensory items, places, routines..." },
          { name: "learningBarriers", label: "Possible Learning Barriers", type: "checkbox-group", options: ["Problem behavior", "Instructional control difficulty", "Prompt dependence", "Weak motivation", "Limited imitation", "Limited scanning", "Limited listener skills", "Limited requesting", "Limited social interest", "Difficulty with transitions", "Sensory sensitivity", "Reinforcer dependency", "Generalization difficulty", "Not sure"] },
          { name: "transitionIndicators", label: "Transition / Placement Considerations", type: "checkbox-group", options: ["Sits for instruction", "Works independently", "Follows classroom routines", "Learns in group setting", "Responds to name", "Waits briefly", "Transitions between activities", "Tolerates denied access", "Uses functional communication", "Toilet trained", "Safe in community", "Not sure"] },
        ],
      },
      {
        title: "AFLS Functional Living Skills",
        icon: "🏠",
        fields: [
          { name: "toiletingStatus", label: "Toileting Status", type: "select", options: ["Fully independent", "Needs reminders", "Needs physical help", "In diapers/pull-ups", "In toilet training", "Not started", "Medical concern"] },
          { name: "feedingStatus", label: "Feeding / Eating Skills", type: "select", options: ["Independent eater", "Picky/selective eater", "Needs feeding support", "Choking/swallowing concern", "Tube feeding", "Not sure"] },
          { name: "dressingStatus", label: "Dressing Skills", type: "select", options: ["Independent", "Needs verbal prompts", "Needs physical assistance", "Cannot dress independently", "Not sure"] },
          { name: "hygieneStatus", label: "Hygiene / Grooming Skills", type: "select", options: ["Independent", "Needs reminders", "Needs assistance", "Does not tolerate hygiene", "Not sure"] },
          { name: "sleepStatus", label: "Sleep Routine", type: "select", options: ["Sleeps well", "Difficulty falling asleep", "Wakes at night", "Co-sleeping concern", "Medication/supplement used", "Not sure"] },
          { name: "communitySafety", label: "Community Safety", type: "select", options: ["Stays near caregiver", "Runs away/elopes", "Poor danger awareness", "Traffic safety concern", "Stranger safety concern", "Not sure"] },
          { name: "homeSkills", label: "Home Skills", type: "select", options: ["Helps with simple chores", "Cleans up with prompts", "Does not participate", "Unsafe with household items", "Not sure"] },
          { name: "schoolReadiness", label: "School / Group Skills", type: "select", options: ["Can sit and attend", "Needs 1:1 support", "Difficulty waiting", "Difficulty sharing", "Difficulty transitions", "Not in school"] },
          { name: "dailyRoutineIndependence", label: "Daily Routine Independence", type: "select", options: ["Mostly independent", "Needs visual schedule", "Needs verbal prompts", "Needs physical support", "Highly dependent", "Not sure"] },
          { name: "adaptiveGoals", label: "Family priorities for functional living skills", type: "textarea", placeholder: "Toileting, feeding, dressing, hygiene, sleep, safety, community, school routines, chores..." },
        ],
      },
      {
        title: "ABLLS-R Skill Acquisition Planning",
        icon: "🧩",
        fields: [
          { name: "skillStrengths", label: "Current strengths and mastered skills", type: "textarea", placeholder: "What can your child already do independently?" },
          { name: "skillDeficits", label: "Skills family wants to build first", type: "textarea", required: true, placeholder: "Communication, toileting, feeding, safety, play, following directions, peer interaction, daily living..." },
          { name: "goalPriorities", label: "Top family goals for the first 90 days", type: "textarea", required: true, placeholder: "List 3–5 goals you want ABA therapy to address first." },
          { name: "abllsDomains", label: "Skill Areas to Prioritize", type: "checkbox-group", options: ["Cooperation and reinforcer effectiveness", "Visual performance / matching", "Receptive language", "Motor imitation", "Vocal imitation", "Requests / mands", "Labeling / tacts", "Intraverbals", "Spontaneous vocalizations", "Syntax and grammar", "Play and leisure", "Social interaction", "Group instruction", "Classroom routines", "Reading readiness", "Math readiness", "Writing/fine motor", "Gross motor", "Dressing", "Eating", "Grooming", "Toileting"] },
        ],
      },
      {
        title: "Treatment Planning Detail",
        icon: "🎯",
        fields: [
          { name: "baselineStrengths", label: "Baseline strengths", type: "textarea", placeholder: "Motivators, communication strengths, independent skills, learning style..." },
          { name: "baselineDeficits", label: "Baseline deficits / impairments", type: "textarea", placeholder: "Communication, adaptive, behavior, social, safety, school readiness..." },
          { name: "caregiverGoals", label: "Caregiver goals and training needs", type: "textarea", placeholder: "What caregivers want to learn and what routines need support..." },
          { name: "coordinationProviders", label: "Other providers and coordination needs", type: "textarea", placeholder: "Speech, OT, PT, psychiatry, pediatrician, school team, case manager..." },
          { name: "outcomeMeasures", label: "Outcome / assessment tools to consider", type: "checkbox-group", options: ["VB-MAPP", "ABLLS-R", "AFLS", "EFL", "FBA/BIP", "Vineland", "SRS-2", "School observation", "Caregiver interview", "Other"] },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Upload Required Documents",
        icon: "📄",
        fields: UPLOAD_FIELDS,
      },
      {
        title: "Final Intake Review",
        icon: "✅",
        fields: [
          { name: "missingDocuments", label: "If documents are missing or pending, explain", type: "textarea", placeholder: "Example: waiting for doctor referral, school IEP meeting scheduled, insurance card pending..." },
          { name: "finalNotes", label: "Final notes for intake team", type: "textarea", placeholder: "Anything else our intake, clinical, billing, or scheduling team should know?" },
          { name: "infoAccurate", label: "I certify that the information provided is accurate and complete to the best of my knowledge.", type: "radio", required: true, options: ["Yes", "No"] },
          { name: "notifyChanges", label: "I understand I must notify Eden ABA Therapy if information changes.", type: "radio", required: true, options: ["Yes", "No"] },
          { name: "documentsUploaded", label: "I uploaded all available required documents.", type: "radio", required: true, options: ["Yes", "No", "Some documents pending"] },
        ],
      },
      {
        title: "Digital Signature",
        icon: "🖊",
        fields: [
          { name: "finalName", label: "Parent / Guardian Full Name *", type: "text", required: true, placeholder: "Type full legal name" },
          { name: "finalDate", label: "Date *", type: "date", required: true },
          { name: "finalSignature", label: "Signature *", type: "text", required: true, placeholder: "Type full legal name" },
        ],
      },
      {
        title: "Submission Quality Check",
        icon: "🧪",
        fields: [
          { name: "submissionContactName", label: "Best contact after submission", type: "text" },
          { name: "submissionContactPhone", label: "Best phone after submission", type: "tel" },
          { name: "submissionChecklistNotes", label: "Submission checklist notes", type: "textarea", placeholder: "Anything missing, urgent deadlines, authorization issues, or preferred follow-up instructions?" },
          { name: "readyForInsuranceVerification", label: "Ready for insurance verification?", type: "radio", options: ["Yes", "No", "Need help"] },
          { name: "readyForClinicalReview", label: "Ready for clinical review?", type: "radio", options: ["Yes", "No", "Need help"] },
        ],
      },
    ],
  },
];

const LEGAL_GLOBAL_FIELDS = [
  { name: "legalGlobalName", label: "Parent / Guardian Full Name *", type: "text", required: true },
  { name: "legalGlobalDate", label: "Date *", type: "date", required: true },
  { name: "legalGlobalSignature", label: "Signature *", type: "text", required: true },
];

const STEP5_REQUIRED_NAMES = new Set(['infoAccurate','notifyChanges','documentsUploaded','finalName','finalDate','finalSignature']);

function flattenStepFields(stepIndex) {
  const step = STEP_SECTIONS[stepIndex];
  if (!step) return [];
  return step.sections.flatMap((section) => section.fields);
}

/** @param {number} stepIndex @param {Record<string, unknown>} [_data] */
export function getStepRequiredFields(stepIndex, _data = {}) {
  const out = [];
  const fields = flattenStepFields(stepIndex);

  if (stepIndex === 5) {
    for (const field of fields) {
      if (!STEP5_REQUIRED_NAMES.has(field.name)) continue;
      out.push({ name: field.name, type: field.type, required: true });
    }
  } else {
    for (const field of fields) {
      if (!field.required) continue;
      out.push({ name: field.name, type: field.type, required: true });
    }
  }

  if (stepIndex === 2) {
    out.push(...getConsentAckFields());
    for (const field of LEGAL_GLOBAL_FIELDS) {
      out.push({ name: field.name, type: field.type, required: true });
    }
  }

  return out;
}
