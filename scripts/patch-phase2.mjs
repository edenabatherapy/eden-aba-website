#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

const path = "/Users/wagmaomari/Desktop/eden-aba-website/app/page.js";
let s = readFileSync(path, "utf8");

// Insurance page arrays
s = s.replace(
  `  const [openFaq, setOpenFaq] = useState("Does insurance cover ABA therapy in Virginia?");

  const providers = ["Aetna", "Anthem HealthKeepers Plus", "Blue Cross Blue Shield", "CareFirst", "Cigna", "Optum", "UnitedHealthcare", "UMR", "Virginia Medicaid", "Molina", "Kaiser Permanente", "TRICARE", "Humana", "Magellan", "Other Plans"];
  const visibleProviders = showAllProviders ? providers : providers.slice(0, 9);`,
  `  const va = ins.virginia;
  const pa = ins.priorAuth;
  const [openFaq, setOpenFaq] = useState(ins.faqs[0]?.[0] || "");

  const providers = va.providers;
  const visibleProviders = showAllProviders ? providers : providers.slice(0, 9);
  const VIRGINIA_CARD_ICONS = [ShieldCheck, BadgeCheck, ClipboardCheck];
  const virginiaCards = va.cards.map(([title, text], i) => [VIRGINIA_CARD_ICONS[i], title, text]);
  const prepItems = va.prepareItems;
  const helpItems = va.helpItems;
  const faqs = ins.faqs;
  const PRIOR_AUTH_ICONS = [Stethoscope, Clock3, FileSignature, HeartHandshake];`
);

s = s.replace(
  `  const fieldClass = "w-full rounded-2xl border border-[#49b8c8]/25 bg-white px-4 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#128c8c] focus:ring-4 focus:ring-[#49b8c8]/20";
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

  const MiniCheckLocal`,
  `  const fieldClass = "w-full rounded-2xl border border-[#49b8c8]/25 bg-white px-4 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#128c8c] focus:ring-4 focus:ring-[#49b8c8]/20";

  const MiniCheckLocal`
);

// Insurance submitted state
s = s.replace(
  `<h1 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">Your insurance information was submitted successfully!</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">Thank you for choosing Eden ABA Therapy. Our insurance verification team has received your information and will begin reviewing your benefits. We're passionate about helping families access compassionate, effective ABA therapy with less stress and more clarity.</p>
          <p className="mt-5 rounded-[2rem] bg-[#ddf4f4]/60 p-6 font-semibold leading-8 text-slate-700">A member of our team will contact you soon to explain your coverage, answer questions, and guide you through the next step in starting services.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Button onClick={onSchedule}>Schedule Appointment</Button><Button variant="secondary" onClick={onHome}>Return Home</Button></div>`,
  `<h1 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{ins.submitted.title}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">{ins.submitted.intro}</p>
          <p className="mt-5 rounded-[2rem] bg-[#ddf4f4]/60 p-6 font-semibold leading-8 text-slate-700">{ins.submitted.followUp}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Button onClick={onSchedule}>{ins.submitted.scheduleAppointment}</Button><Button variant="secondary" onClick={onHome}>{ins.submitted.returnHome}</Button></div>`
);

// Insurance hero - use simpler replacements
const insHero = [
  ['<p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Insurance Coverage</p>', '<p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{ins.hero.eyebrow}</p>'],
  ['<h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">Insurance Coverage for ABA Therapy</h1>', '<h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-7xl">{ins.hero.title}</h1>'],
  ['<div className="mt-8 flex flex-wrap gap-4"><Button onClick={scrollToVerify}>Verify Insurance <ArrowRight size={18} /></Button><Button variant="secondary" onClick={onStart}>Start ABA Therapy</Button></div>', '<div className="mt-8 flex flex-wrap gap-4"><Button onClick={scrollToVerify}>{ins.hero.verifyInsurance} <ArrowRight size={18} /></Button><Button variant="secondary" onClick={onStart}>{ins.hero.startABA}</Button></div>'],
  ['<h2 className="text-xl font-black text-[#0b4f4f]">Virginia insurance support for ABA therapy</h2>', '<h2 className="text-xl font-black text-[#0b4f4f]">{ins.hero.supportTitle}</h2>'],
  ['alt="Family reviewing therapy insurance support"', 'alt={ins.hero.imageAlt}'],
  ['{["Benefit verification guidance", "Prior authorization support", "Clear next-step planning for Virginia families"].map((item) => (', '{ins.hero.supportItems.map((item) => ('],
  ['<MapPin size={18} className="text-[#1f7a2e]" /> Virginia families only</div>', '<MapPin size={18} className="text-[#1f7a2e]" /> {va.badge}</div>'],
  ['<h2 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-6xl">ABA Therapy Insurance Coverage in Virginia</h2>', '<h2 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-6xl">{va.title}</h2>'],
  ['<h3 className="text-2xl font-black text-[#0b4f4f]">What Families Should Prepare</h3>', '<h3 className="text-2xl font-black text-[#0b4f4f]">{va.prepareTitle}</h3>'],
  ['<h3 className="text-2xl font-black text-[#0b4f4f]">How Eden ABA Therapy Helps</h3>', '<h3 className="text-2xl font-black text-[#0b4f4f]">{va.helpTitle}</h3>'],
  ['<h3 className="text-3xl font-black text-[#0b4f4f]">Insurance Plans We Can Help Review in Virginia</h3>', '<h3 className="text-3xl font-black text-[#0b4f4f]">{va.plansTitle}</h3>'],
  ['{showAllProviders ? "Show Less" : "Show More"}', '{showAllProviders ? va.showLess : va.showMore}'],
  ['<ClipboardCheck size={18} /> Prior authorization support', '<ClipboardCheck size={18} /> {pa.badge}'],
  ['alt="Child and caregiver in a supportive clinical therapy setting"', 'alt={pa.imageAlt}'],
  ['<h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">FAQs about ABA therapy insurance coverage</h2>', '<h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">{ins.faqTitle}</h2>'],
  ['t={formT}', 'formT={formT}'],
];

for (const [a, b] of insHero) {
  if (s.includes(a)) s = s.replace(a, b);
  else console.warn("ins missing:", a.slice(0, 60));
}

// Insurance hero intro paragraph - unique context
s = s.replace(
  `<p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">Eden ABA Therapy currently serves Virginia families only. We help families review ABA therapy benefits, authorization requirements, and possible family costs with clear, compassionate guidance.</p>`,
  `<p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">{ins.hero.intro}</p>`
);
s = s.replace(
  `<p className="mt-3 text-base font-semibold leading-7 text-slate-700">
                    Eden ABA Therapy helps families understand insurance benefits, prior authorization requirements, Medicaid/DMAS coverage questions, and possible out-of-pocket costs before starting care.
                  </p>`,
  `<p className="mt-3 text-base font-semibold leading-7 text-slate-700">{ins.hero.supportText}</p>`
);
s = s.replace(
  `<p className="mt-6 text-lg font-semibold leading-9 text-slate-700">Coverage for ABA therapy in Virginia may depend on the child’s diagnosis, medical necessity, insurance plan type, Medicaid eligibility, prior authorization, deductible, copay, and out-of-pocket maximum.</p>`,
  `<p className="mt-6 text-lg font-semibold leading-9 text-slate-700">{va.intro}</p>`
);
s = s.replace(
  `<p className="mt-3 max-w-3xl font-semibold leading-7 text-slate-700">If your plan is not listed, submit the form and our team can still review your benefits.</p></div><Button onClick={scrollToVerify}>Verify Insurance <ArrowRight size={18} /></Button>`,
  `<p className="mt-3 max-w-3xl font-semibold leading-7 text-slate-700">{va.plansIntro}</p></div><Button onClick={scrollToVerify}>{ins.hero.verifyInsurance} <ArrowRight size={18} /></Button>`
);

// Prior auth section
s = s.replace(
  `<h2 className="mt-5 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">
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
              ].map(([Icon, title, text]) => (`,
  `<h2 className="mt-5 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{pa.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{pa.intro}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {pa.steps.map(([title, text], i) => {
                const Icon = PRIOR_AUTH_ICONS[i];
                return (`
);

s = s.replace(
  `<p className="mt-6 rounded-[1.5rem] bg-[#fff8df] p-5 text-base font-bold leading-7 text-[#0b4f4f]">
              Eden ABA Therapy cannot guarantee authorization or coverage, but our team can help families gather information, understand plan requests, and move through the process with less stress.
            </p>

            <div className="mt-7">
              <Button onClick={scrollToVerify}>Get help with insurance <ArrowRight size={18} /></Button>`,
  `<p className="mt-6 rounded-[1.5rem] bg-[#fff8df] p-5 text-base font-bold leading-7 text-[#0b4f4f]">{pa.disclaimer}</p>

            <div className="mt-7">
              <Button onClick={scrollToVerify}>{pa.cta} <ArrowRight size={18} /></Button>`
);

// Fix prior auth map closing - need to fix the map callback
s = s.replace(
  `              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-white to-[#eef9f4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a2e] text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p>
                </div>
              ))}`,
  `                <div key={title} className="rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-white to-[#eef9f4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a2e] text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p>
                </div>
              );})}`
);

// MChatROnlineScreenerPage
const mchat = [
  ['Screeners › M-CHAT-R', '{p.breadcrumb}'],
  ['Online M-CHAT-R Autism Screener', '{p.title}'],
  ['Start M-CHAT-R Screener <ArrowRight size={18} />', '{p.startScreener} <ArrowRight size={18} />'],
  ['Learn how scoring works', '{p.learnScoring}'],
  ['alt="Parent and child completing a developmental screening activity"', 'alt={p.heroImageAlt}'],
  ['<p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Scoring</p>', '<p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{p.scoring.eyebrow}</p>'],
  ['<h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">Understanding score ranges</h2>', '<h2 className="mt-3 text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.scoring.title}</h2>'],
  ['<h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">Frequently asked questions</h2>', '<h2 className="text-4xl font-black text-[#0b4f4f] md:text-5xl">{p.faqTitle}</h2>'],
  ['<h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">Medical disclaimer</h2>', '<h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.disclaimerTitle}</h2>'],
  ['<Button onClick={onStart}>Start ABA Therapy</Button>', '<Button onClick={onStart}>{p.startABA}</Button>'],
];

for (const [a, b] of mchat) {
  if (s.includes(a)) s = s.replace(a, b);
}

// MChat screener intro and important note
s = s.replace(
  `A parent-friendly screening tool that helps identify developmental patterns that may need follow-up. The M-CHAT-R is commonly used for toddlers around 16–30 months and can help families decide whether to discuss concerns with a pediatrician or qualified clinician.`,
  `{p.intro}`
);
s = s.replace(
  `<span className="font-black text-[#0b4f4f]">Important:</span> The M-CHAT-R is a screening tool only. It does not diagnose autism or any medical condition.`,
  `<span className="font-black text-[#0b4f4f]">{p.importantPrefix}</span> {p.importantText}`
);
s = s.replace(
  `Each answer that matches the risk response counts as one point. The total score ranges from 0 to 20 and is meant to guide follow-up, not provide a diagnosis.`,
  `{p.scoring.intro}`
);
s = s.replace(
  `The M-CHAT-R is a screening tool only. It does not diagnose autism or any medical condition. Results should be reviewed with a pediatrician or qualified clinician.`,
  `{p.disclaimerText}`
);

// MChat scoring ranges and faqs
s = s.replace(
  `{[
              ["0–2", "Lower concern", "Continue monitoring development and speak with a pediatrician if concerns continue."],
              ["3–7", "Moderate concern", "Discuss results with a pediatrician or qualified developmental clinician."],
              ["8–20", "Higher concern", "A professional developmental evaluation is recommended."],
            ].map(([range, label, text]) => (`,
  `{p.scoring.ranges.map(([range, label, text]) => (`
);
s = s.replace(
  `{[
              ["What is the purpose of the M-CHAT-R?", "The M-CHAT-R helps families identify developmental patterns that may need follow-up. It can support a conversation with a pediatrician or qualified clinician."],
              ["Is the M-CHAT-R a diagnosis?", "No. The M-CHAT-R is a screening tool, not a diagnostic evaluation. A score cannot confirm autism or rule it out."],
              ["What age is it for?", "It is commonly used for toddlers around 16 to 30 months. Children outside that range may need a different screening pathway."],
              ["What should I do after a high score?", "A higher score means professional follow-up is recommended. Speak with your child’s pediatrician or a qualified developmental clinician."],
              ["Can I retake it?", "Yes. Families may retake screening later if concerns change or a clinician recommends it."],
              ["Should I talk to my pediatrician?", "Yes. If you have concerns about communication, play, social interaction, behavior, or development, talk with your pediatrician."],
            ].map(([question, answer]) => (`,
  `{p.faqs.map(([question, answer]) => (`
);

// OnlineAppointmentSchedulerCTA
s = s.replace(
  `function OnlineAppointmentSchedulerCTA({ t, introOnly = false, onOpenScheduler }) {
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
    visitType: "New Patient",`,
  `function OnlineAppointmentSchedulerCTA({ t, introOnly = false, onOpenScheduler }) {
  const sched = t.pages.scheduler;
  const w = sched.wizard;
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [form, setForm] = useState({
    communication: w.triage.concernOptions[1],
    behavior: w.triage.concernOptions[1],
    social: w.triage.concernOptions[1],
    urgency: w.triage.concernOptions[3],
    notes: "",
    service: w.service.serviceOptions[0],
    locationType: w.service.locationOptions[0],
    visitType: w.service.visitOptions[0],`
);

s = s.replace(
  `    ageGroup: "3-5",
    zip: "",
    date: "",
    time: "",
    insurance: "Medicaid",`,
  `    ageGroup: w.family.ageGroups[1],
    zip: "",
    date: "",
    time: "",
    insurance: w.insurance.planOptions[0],`
);

s = s.replace(
  `  const steps = ["Triage", "Service", "Family", "Schedule", "Insurance", "Review"];
  const availableTimes = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];`,
  `  const steps = w.steps;
  const availableTimes = w.availableTimes;`
);

s = s.replace(
  `  const selectedDateTime = \`\${form.date || "Not selected"} \${form.time || ""}\`.trim();`,
  `  const selectedDateTime = \`\${form.date || w.notSelected} \${form.time || ""}\`.trim();`
);

// Scheduler introOnly
s = s.replace(
  `<p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">Online Scheduling</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">Schedule an appointment online with Eden ABA Therapy.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">Use our guided multi-step scheduler to request an ABA therapy evaluation, choose preferred times, and share insurance information for review.</p>
          <div className="mt-8">
            <Button onClick={onOpenScheduler}>Schedule Online <ArrowRight size={18} /></Button>`,
  `<p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{sched.introOnly.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{sched.introOnly.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">{sched.introOnly.intro}</p>
          <div className="mt-8">
            <Button onClick={onOpenScheduler}>{sched.introOnly.scheduleOnline} <ArrowRight size={18} /></Button>`
);

s = s.replace(
  `<p className="font-black uppercase tracking-[0.25em] text-[#128c8c]">Eden ABA Therapy</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Advanced Online Appointment Scheduler
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-700">
            Schedule an appointment online with Eden ABA Therapy using our guided multi-step booking system.
          </p>`,
  `<p className="font-black uppercase tracking-[0.25em] text-[#128c8c]">{t.schedulerEyebrow}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{t.schedulerTitle}</h1>
          <p className="mt-3 text-lg leading-8 text-slate-700">{t.schedulerSubtitle}</p>`
);

s = s.replace(
  `<h3 className="mt-2 text-3xl font-black text-slate-950">Step {step}: {steps[step - 1]}</h3>`,
  `<h3 className="mt-2 text-3xl font-black text-slate-950">{w.stepPrefix} {step}: {steps[step - 1]}</h3>`
);

// Scheduler wizard steps - batch replace step content headers
const schedSteps = [
  [`<h4 className="text-2xl font-black text-slate-950">AI Triage Before Booking</h4>
                          <p className="mt-2 text-slate-600">Tell us what your family needs so we can route the request correctly.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {[["communication", "Communication concerns"], ["behavior", "Behavior concerns"], ["social", "Social concerns"], ["urgency", "Scheduling urgency"]].map(([key, label]) => (`,
   `<h4 className="text-2xl font-black text-slate-950">{w.triage.title}</h4>
                          <p className="mt-2 text-slate-600">{w.triage.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {w.triage.fields.map(([key, label]) => (`],
  [`<option>Mild concern</option>
                                  <option>Moderate concern</option>
                                  <option>High concern</option>
                                  <option>Priority</option>`, `{w.triage.concernOptions.map((option) => <option key={option}>{option}</option>)}`],
  [`Parent notes <span className="text-red-500">*</span>
                            <textarea value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Describe your concerns, goals, behaviors, communication needs, or questions." />`, `{w.triage.parentNotes} <span className="text-red-500">*</span>
                            <textarea value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.triage.notesPlaceholder} />`],
  [`<h4 className="text-2xl font-black text-slate-950">Service Selection</h4>
                          <p className="mt-2 text-slate-600">Choose the service type and appointment style.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <label className="grid gap-2 text-sm font-black text-slate-700">Service <span className="text-red-500">*</span><select value={form.service} onChange={(e) => updateForm("service", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>ABA Therapy Evaluation</option><option>Parent Consultation</option><option>Insurance Review</option><option>ASD Evaluation Support</option></select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">Location type <span className="text-red-500">*</span><select value={form.locationType} onChange={(e) => updateForm("locationType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>Online / Zoom</option><option>In-Home</option><option>Office Appointment</option></select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">Visit type <span className="text-red-500">*</span><select value={form.visitType} onChange={(e) => updateForm("visitType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>New Patient</option><option>Returning Family</option><option>Provider Referral</option></select></label>`,
   `<h4 className="text-2xl font-black text-slate-950">{w.service.title}</h4>
                          <p className="mt-2 text-slate-600">{w.service.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.service.serviceLabel} <span className="text-red-500">*</span><select value={form.service} onChange={(e) => updateForm("service", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.service.serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.service.locationLabel} <span className="text-red-500">*</span><select value={form.locationType} onChange={(e) => updateForm("locationType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.service.locationOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.service.visitLabel} <span className="text-red-500">*</span><select value={form.visitType} onChange={(e) => updateForm("visitType", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.service.visitOptions.map((option) => <option key={option}>{option}</option>)}</select></label>`],
];

for (const [a, b] of schedSteps) {
  if (s.includes(a)) s = s.replace(a, b);
}

// Family step
s = s.replace(
  `<h4 className="text-2xl font-black text-slate-950">Parent and Patient Details</h4>
                          <p className="mt-2 text-slate-600">Add contact information and basic child details.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <input value={form.parentName} onChange={(e) => updateForm("parentName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Parent name *" />
                            <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Email *" />
                            <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Phone *" />
                            <input value={form.childName} onChange={(e) => updateForm("childName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Child name *" />
                            <label className="grid gap-2 text-sm font-black text-slate-700">Child birthdate <input type="date" value={form.dob} onChange={(e) => updateForm("dob", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" /></label>
                            <select value={form.ageGroup} onChange={(e) => updateForm("ageGroup", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>0-2</option><option>3-5</option><option>6-12</option><option>13+</option></select>
                            <input value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="ZIP code *" />`,
  `<h4 className="text-2xl font-black text-slate-950">{w.family.title}</h4>
                          <p className="mt-2 text-slate-600">{w.family.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <input value={form.parentName} onChange={(e) => updateForm("parentName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.parentName} />
                            <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.email} />
                            <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.phone} />
                            <input value={form.childName} onChange={(e) => updateForm("childName", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.childName} />
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.family.childBirthdate} <input type="date" value={form.dob} onChange={(e) => updateForm("dob", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" /></label>
                            <select value={form.ageGroup} onChange={(e) => updateForm("ageGroup", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.family.ageGroups.map((option) => <option key={option}>{option}</option>)}</select>
                            <input value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.family.zipCode} />`
);

// Schedule step
s = s.replace(
  `<h4 className="text-2xl font-black text-slate-950">Date and Time</h4>
                          <p className="mt-2 text-slate-600">Choose a preferred appointment date and available time.</p>
                          <div className="mt-6 grid items-start gap-5 md:grid-cols-[0.85fr_1.15fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <label className="mb-2 block text-sm font-black text-slate-700">Preferred date</label>
                              <input type="date" value={form.date} onChange={(e) => updateForm("date", e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                              <p className="mt-3 text-xs font-bold text-emerald-700">✅ 16 slots available on selected date</p>`,
  `<h4 className="text-2xl font-black text-slate-950">{w.schedule.title}</h4>
                          <p className="mt-2 text-slate-600">{w.schedule.intro}</p>
                          <div className="mt-6 grid items-start gap-5 md:grid-cols-[0.85fr_1.15fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <label className="mb-2 block text-sm font-black text-slate-700">{w.schedule.preferredDate}</label>
                              <input type="date" value={form.date} onChange={(e) => updateForm("date", e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                              <p className="mt-3 text-xs font-bold text-emerald-700">{w.schedule.slotsAvailable}</p>`
);

// Insurance step
s = s.replace(
  `<h4 className="text-2xl font-black text-slate-950">Insurance and Concerns</h4>
                          <p className="mt-2 text-slate-600">Add insurance details and family concerns for intake review.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-black text-slate-700">Insurance plan <select value={form.insurance} onChange={(e) => updateForm("insurance", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold"><option>Medicaid</option><option>Anthem</option><option>Aetna</option><option>Cigna</option><option>UnitedHealthcare</option><option>Other</option></select></label>
                            <input value={form.memberId} onChange={(e) => updateForm("memberId", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Member ID *" />
                            <input value={form.referral} onChange={(e) => updateForm("referral", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Referral source *" />
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"><input type="checkbox" defaultChecked className="h-5 w-5 accent-sky-500" /> Run insurance eligibility check</label>
                            <textarea value={form.parentConcerns} onChange={(e) => updateForm("parentConcerns", e.target.value)} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100 md:col-span-2" placeholder="Parent concerns *" />`,
  `<h4 className="text-2xl font-black text-slate-950">{w.insurance.title}</h4>
                          <p className="mt-2 text-slate-600">{w.insurance.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-black text-slate-700">{w.insurance.planLabel} <select value={form.insurance} onChange={(e) => updateForm("insurance", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold">{w.insurance.planOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                            <input value={form.memberId} onChange={(e) => updateForm("memberId", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.insurance.memberId} />
                            <input value={form.referral} onChange={(e) => updateForm("referral", e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder={w.insurance.referral} />
                            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"><input type="checkbox" defaultChecked className="h-5 w-5 accent-sky-500" /> {w.insurance.eligibilityCheck}</label>
                            <textarea value={form.parentConcerns} onChange={(e) => updateForm("parentConcerns", e.target.value)} className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100 md:col-span-2" placeholder={w.insurance.parentConcerns} />`
);

// Review step
s = s.replace(
  `<h4 className="text-2xl font-black text-slate-950">Review and Submit</h4>
                          <p className="mt-2 text-slate-600">Review your request before submitting it to Eden ABA Therapy.</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Triage Summary</p><p className="mt-2 text-sm">Urgency: <strong>{form.urgency}</strong></p><p className="text-sm">Communication: {form.communication}</p><p className="text-sm">Behavior: {form.behavior}</p><p className="text-sm">Social: {form.social}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Appointment</p><p className="mt-2 text-sm">{form.service}</p><p className="text-sm">{form.locationType} • {form.visitType}</p><p className="text-sm">{selectedDateTime}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Family Information</p><p className="mt-2 text-sm">{form.parentName || "—"}</p><p className="text-sm">{form.email || "—"}</p><p className="text-sm">{form.phone || "—"}</p><p className="text-sm">Child: {form.childName || "—"}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">Insurance</p><p className="mt-2 text-sm">{form.insurance}</p><p className="text-sm">Member ID: {form.memberId || "—"}</p><p className="text-sm">Eligibility check: Requested</p></div>`,
  `<h4 className="text-2xl font-black text-slate-950">{w.review.title}</h4>
                          <p className="mt-2 text-slate-600">{w.review.intro}</p>
                          <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.triageSummary}</p><p className="mt-2 text-sm">{w.review.urgency} <strong>{form.urgency}</strong></p><p className="text-sm">{w.review.communication} {form.communication}</p><p className="text-sm">{w.review.behavior} {form.behavior}</p><p className="text-sm">{w.review.social} {form.social}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.appointment}</p><p className="mt-2 text-sm">{form.service}</p><p className="text-sm">{form.locationType} • {form.visitType}</p><p className="text-sm">{selectedDateTime}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.familyInformation}</p><p className="mt-2 text-sm">{form.parentName || "—"}</p><p className="text-sm">{form.email || "—"}</p><p className="text-sm">{form.phone || "—"}</p><p className="text-sm">{w.review.childPrefix} {form.childName || "—"}</p></div>
                            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"><p className="font-black">{w.review.insurance}</p><p className="mt-2 text-sm">{form.insurance}</p><p className="text-sm">{w.review.memberIdPrefix} {form.memberId || "—"}</p><p className="text-sm">{w.review.eligibilityRequested}</p></div>`
);

// Submitted state
s = s.replace(
  `<h3 className="mt-5 text-3xl font-black text-emerald-900">Appointment Submitted</h3>
                      <p className="mt-2 font-bold text-emerald-800">Reference: EAT-{Math.floor(1000000 + Math.random() * 9000000)}</p>
                      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">
                        In the live version, this request will save to Supabase, create a Zoom meeting, notify Eden staff, and send confirmation to the family.
                      </p>
                      <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-white p-5 text-left shadow-sm">
                        <p className="font-black text-slate-950">Zoom Meeting Preview</p>
                        <p className="mt-2 break-all rounded-xl bg-sky-50 p-3 text-sm font-bold text-sky-700">https://zoom.us/j/secure-eden-aba-intake</p>
                        <p className="mt-2 text-sm text-slate-700">Meeting Passcode: <strong>EDEN</strong></p>
                        <p className="text-sm text-slate-700">Appointment: <strong>{selectedDateTime}</strong></p>`,
  `<h3 className="mt-5 text-3xl font-black text-emerald-900">{w.submitted.title}</h3>
                      <p className="mt-2 font-bold text-emerald-800">{w.submitted.referencePrefix}{Math.floor(1000000 + Math.random() * 9000000)}</p>
                      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">{w.submitted.liveNote}</p>
                      <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-white p-5 text-left shadow-sm">
                        <p className="font-black text-slate-950">{w.submitted.zoomPreview}</p>
                        <p className="mt-2 break-all rounded-xl bg-sky-50 p-3 text-sm font-bold text-sky-700">{w.submitted.zoomUrl}</p>
                        <p className="mt-2 text-sm text-slate-700">{w.submitted.passcodeLabel} <strong>{w.submitted.passcode}</strong></p>
                        <p className="text-sm text-slate-700">{w.submitted.appointmentLabel} <strong>{selectedDateTime}</strong></p>`
);

// Sidebar
s = s.replace(
  `<p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Clean summary panel</p>
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
              <p className="flex justify-between gap-4"><span>Office Email</span><strong>info@edenabatherapy.com</strong></p>`,
  `<p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">{w.sidebar.title}</p>
            <div className="mt-4 rounded-2xl bg-slate-950 p-5 text-white">
              <p className="font-black">{w.sidebar.bookingStatus}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">{w.sidebar.stepLabel}</p><p className="text-2xl font-black">{step}/6</p></div>
                <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">{w.sidebar.progressLabel}</p><p className="text-2xl font-black">{progress}%</p></div>
              </div>
              <div className="mt-3 rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">{w.sidebar.nextAutomation}</p><p className="text-sm font-bold">{w.sidebar.automationValue}</p></div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-700">
              <p className="flex justify-between gap-4"><span>{w.sidebar.service}</span><strong>{form.service}</strong></p>
              <p className="flex justify-between gap-4"><span>{w.sidebar.chosenTime}</span><strong>{selectedDateTime}</strong></p>
              <p className="flex justify-between gap-4"><span>{w.sidebar.insurance}</span><strong>{form.insurance}</strong></p>
              <p className="flex justify-between gap-4"><span>{w.sidebar.officeEmail}</span><strong>info@edenabatherapy.com</strong></p>`
);

// Home intake Eden ABA Therapy label
s = s.replace(
  `<p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">Eden ABA Therapy</p>`,
  `<p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">{t.brandName}</p>`
);

// InsuranceVerificationForm prop
s = s.replace(
  `<InsuranceVerificationForm
            formT={formT}`,
  `<InsuranceVerificationForm
            t={formT}`
);

writeFileSync(path, s);
console.log("Phase 2 patches applied");
