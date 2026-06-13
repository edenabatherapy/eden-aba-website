#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

const path = "/Users/wagmaomari/Desktop/eden-aba-website/app/page.js";
let s = readFileSync(path, "utf8");

// Insurance submitted - regex
s = s.replace(
  /<h1 className="mt-6 text-4xl font-black leading-tight text-\[#0b4f4f\] md:text-5xl">Your insurance information was submitted successfully!<\/h1>[\s\S]*?<div className="mt-8 flex flex-wrap justify-center gap-4"><Button onClick={onSchedule}>Schedule Appointment<\/Button><Button variant="secondary" onClick={onHome}>Return Home<\/Button><\/div>/,
  `<h1 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">{ins.submitted.title}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">{ins.submitted.intro}</p>
          <p className="mt-5 rounded-[2rem] bg-[#ddf4f4]/60 p-6 font-semibold leading-8 text-slate-700">{ins.submitted.followUp}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Button onClick={onSchedule}>{ins.submitted.scheduleAppointment}</Button><Button variant="secondary" onClick={onHome}>{ins.submitted.returnHome}</Button></div>`
);

// MChat results stage
s = s.replace(
  `<p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Screening complete</p>
          <h2 className="mt-3 text-4xl font-black text-[#083b35] md:text-5xl">Your M-CHAT-R Summary</h2>`,
  `<p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">{rs.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black text-[#083b35] md:text-5xl">{rs.title}</h2>`
);
s = s.replace(`<p className="text-sm font-bold text-slate-500">Total score</p>`, `<p className="text-sm font-bold text-slate-500">{rs.totalScore}</p>`);
s = s.replace(`<p className="mt-4 text-sm font-black text-slate-500">Percentage score: {percentageScore}%</p>`, `<p className="mt-4 text-sm font-black text-slate-500">{rs.percentageScore} {percentageScore}%</p>`);
s = s.replace(`<h3 className="text-2xl font-black text-[#083b35]">What this means</h3>`, `<h3 className="text-2xl font-black text-[#083b35]">{rs.whatThisMeans}</h3>`);
s = s.replace(`Results prepared for Eden ABA Therapy. Connect this button to your intake email/API endpoint.`, `{rs.sendSuccess}`);
s = s.replace(`>Retake Screener</Button>`, `>{rs.retake}</Button>`);
s = s.replace(`>Print Results</Button>`, `>{rs.printResults}</Button>`);
s = s.replace(`>Send Results to Eden Office</Button>`, `>{rs.sendToEden}</Button>`);
s = s.replace(`>Contact Eden ABA Therapy</a>`, `>{rs.contactEden}</a>`);

// MChat questions stage
s = s.replace(
  `<p className="text-base font-black text-emerald-700">M-CHAT-R: Question {index + 1} of {questions.length}</p>`,
  `<p className="text-base font-black text-emerald-700">{qs.label} {index + 1} {qs.of} {questions.length}</p>`
);
s = s.replace(
  `{["No", "Yes"].map((answer) => (`,
  `{qs.answers.map((answer) => (`
);
s = s.replace(`>Previous</Button>`, `>{qs.previous}</Button>`);
s = s.replace(
  `{Object.keys(answers).length} of 20 answered`,
  `{Object.keys(answers).length} {qs.answered}`
);
s = s.replace(
  `{index === questions.length - 1 ? "See Results" : "Next"}`,
  `{index === questions.length - 1 ? qs.seeResults : qs.next}`
);

// MChat intake form
s = s.replace(`>Start here</p>`, `>{formT.eyebrow}</p>`);
s = s.replace(`>M-CHAT-R Autism Screening Tool</h2>`, `>{formT.title}</h2>`);
s = s.replace(
  `Complete the parent and child information below before beginning the 20-question screener.`,
  `{formT.intro}`
);
const ph = "formT.placeholders";
s = s.replace(`placeholder="Parent/Guardian First Name *"`, `placeholder={${ph}.parentFirstName}`);
s = s.replace(`placeholder="Parent/Guardian Last Name *"`, `placeholder={${ph}.parentLastName}`);
s = s.replace(`placeholder="Email *"`, `placeholder={${ph}.email}`);
s = s.replace(`placeholder="Phone *"`, `placeholder={${ph}.phone}`);
s = s.replace(`placeholder="Child First Name *"`, `placeholder={${ph}.childFirstName}`);
s = s.replace(`placeholder="Zip Code *"`, `placeholder={${ph}.zipCode}`);
s = s.replace(
  `<option value="">Preferred Location *</option>
            <option value="Annandale">Annandale</option>
            <option value="Fairfax">Fairfax</option>
            <option value="Centreville / Chantilly">Centreville / Chantilly</option>
            <option value="Alexandria / Arlington">Alexandria / Arlington</option>
            <option value="Not sure yet">Not sure yet</option>`,
  `<option value="">{formT.placeholders.preferredLocation}</option>
            {formT.locationOptions.map((location) => <option key={location} value={location}>{location}</option>)}`
);
s = s.replace(
  `<span>I consent to be contacted by Eden ABA Therapy about screening support and next steps. I understand this screener is not a diagnosis.</span>`,
  `<span>{formT.consent}</span>`
);
s = s.replace(
  `Please complete all required fields, enter a valid email, and check the consent box.`,
  `{formT.validationError}`
);
s = s.replace(`>Submit & Start Screener</Button>`, `>{formT.submit}</Button>`);

// MChat screener intro paragraph wrapper
s = s.replace(
  `            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">
              {p.intro}
            </p>`,
  `            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">{p.intro}</p>`
);

writeFileSync(path, s);
console.log("MChat + insurance submitted patched");
