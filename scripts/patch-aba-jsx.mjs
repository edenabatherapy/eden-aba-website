#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

const path = "/Users/wagmaomari/Desktop/eden-aba-website/app/page.js";
let s = readFileSync(path, "utf8");

const reps = [
  // ABA hero + sidebar
  ['alt="ABA therapy support for a child"', "alt={p.heroImageAlt}"],
  ['>Categories</p>', ">{p.sidebarTitle}</p>"],

  // whatIsAba
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">What is ABA therapy?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Applied Behavior Analysis, often called ABA, is a research-backed therapy that uses the science of learning and behavior to help children build meaningful skills for everyday life. ABA looks at what happens before and after behavior so clinicians can understand why behavior occurs and teach safer, more effective ways to communicate and participate.
              </p>
              <p className="mt-4 text-lg leading-9 text-slate-700">
                At Eden ABA Therapy, goals are individualized and family-centered. A BCBA reviews your child’s strengths, needs, communication style, routines, safety concerns, and learning profile before creating a treatment plan.
              </p>`,
    `<ImageHeader image="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1200&auto=format&fit=crop" color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.whatIsAba.title}</h2>
              {p.whatIsAba.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-5 text-lg leading-9 text-slate-700 first:mt-5">{paragraph}</p>
              ))}`,
  ],

  // targetBehaviors
  [
    `<h3 className="text-3xl font-black text-emerald-950">What are target behaviors in ABA?</h3>
              <p className="mt-4 text-lg leading-9 text-slate-700">
                A target behavior is a skill to build or a behavior to reduce. Some goals may focus on requesting help, making eye contact when appropriate, following directions, waiting, tolerating transitions, or playing with peers. Other goals may focus on reducing aggression, self-injury, elopement, severe tantrums, or unsafe behaviors.
              </p>
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-lg font-bold leading-8 text-emerald-900">
                The purpose is not to change who your child is. The purpose is to teach useful skills, support safety, and help your child communicate needs more successfully.
              </div>`,
    `<h3 className="text-3xl font-black text-emerald-950">{p.targetBehaviors.title}</h3>
              <p className="mt-4 text-lg leading-9 text-slate-700">{p.targetBehaviors.text}</p>
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-lg font-bold leading-8 text-emerald-900">{p.targetBehaviors.callout}</div>`,
  ],

  // howAbaHelps
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">How does ABA therapy help?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy helps children develop functional skills they can use at home, school, and in the community. Families also receive guidance to support generalization across daily routines and different people.
              </p>`,
    `<ImageHeader image="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop" color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.howAbaHelps.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.howAbaHelps.intro}</p>`,
  ],

  // signsBenefit
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">Signs Your Child May Benefit From ABA Therapy</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Families often ask when ABA therapy may be appropriate. A child may benefit when communication, safety, daily routines, school readiness, or social participation are difficult enough to affect everyday life. These signs do not replace a clinical assessment, but they can help parents decide when to ask for guidance.
              </p>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.signsBenefit.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.signsBenefit.intro}</p>`,
  ],
  [
    `<p className="text-lg font-black text-emerald-950">Helpful next step</p>
                <p className="mt-2 leading-8 text-slate-700">If these patterns sound familiar, Eden ABA Therapy can help your family understand intake, documentation, insurance review, and assessment planning.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={onStart}>{p.startABA} <ArrowRight size={18} /></Button>
                  <a href="/what-is-autism" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">Learn More About Autism</a>`,
    `<p className="text-lg font-black text-emerald-950">{p.signsBenefit.nextStepTitle}</p>
                <p className="mt-2 leading-8 text-slate-700">{p.signsBenefit.nextStepText}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={onStart}>{p.signsBenefit.startABA} <ArrowRight size={18} /></Button>
                  <a href="/what-is-autism" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">{p.signsBenefit.learnAutism}</a>`,
  ],

  // byAgeGroup
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">ABA Therapy By Age Group</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy goals should change as children grow. Younger children may focus on foundational communication and play, while older children may work on school participation, independence, self-advocacy, and life skills.
              </p>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.byAgeGroup.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.byAgeGroup.intro}</p>`,
  ],

  // communication
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Communication Development Through ABA</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Communication goals in ABA are not limited to spoken words. A child may learn to request help, ask for a break, make choices, use gestures, follow directions, use AAC, or communicate emotions more safely. The goal is functional communication that reduces frustration and improves participation in daily life.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {["Requesting and choosing", "Asking for help or breaks", "Following directions", "Using AAC or visuals", "Greeting and turn-taking", "Communicating feelings"].map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}`,
    `<ImageHeader image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop" color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.communication.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.communication.intro}</p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {p.communication.goals.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}`,
  ],

  // practicalGoals
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Reach practical goals with ABA therapy</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                No two children are the same. A strong ABA plan uses measurable goals that matter in real life and reflect your family’s priorities.
              </p>`,
    `<ImageHeader image="https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1200&auto=format&fit=crop" color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.practicalGoals.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.practicalGoals.intro}</p>`,
  ],

  // progress
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">How ABA Progress Is Measured</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy uses data to understand whether strategies are helping. Progress is not based only on impressions; the BCBA reviews patterns over time and adjusts the treatment plan when your child needs a different level of support.
              </p>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.progress.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.progress.intro}</p>`,
  ],
  [
    `<div className="grid bg-emerald-50 text-sm font-black uppercase tracking-[0.16em] text-emerald-800 md:grid-cols-2"><div className="p-5">Initial assessment</div><div className="border-t border-emerald-100 p-5 md:border-l md:border-t-0">Ongoing progress review</div></div>
                <div className="grid md:grid-cols-2">
                  <div className="space-y-3 p-6 text-slate-700"><p>Baseline skill levels</p><p>Family interview</p><p>Observation of routines</p><p>Initial behavior patterns</p></div>
                  <div className="space-y-3 border-t border-slate-100 p-6 text-slate-700 md:border-l md:border-t-0"><p>Session data trends</p><p>Goal mastery</p><p>Parent feedback</p><p>BCBA treatment updates</p></div>
                </div>`,
    `<div className="grid bg-emerald-50 text-sm font-black uppercase tracking-[0.16em] text-emerald-800 md:grid-cols-2">{p.progress.tableHeaders.map((header) => <div key={header} className="border-t border-emerald-100 p-5 first:border-t-0 md:first:border-t-0 md:[&:not(:first-child)]:border-l">{header}</div>)}</div>
                <div className="grid md:grid-cols-2">
                  <div className="space-y-3 p-6 text-slate-700">{p.progress.initialItems.map((item) => <p key={item}>{item}</p>)}</div>
                  <div className="space-y-3 border-t border-slate-100 p-6 text-slate-700 md:border-l md:border-t-0">{p.progress.ongoingItems.map((item) => <p key={item}>{item}</p>)}</div>
                </div>`,
  ],

  // typicalDay
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">What does a typical ABA therapy day look like?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                A typical day may include play, structured practice, natural environment teaching, parent updates, progress tracking, and safety planning. Each session is adjusted to your child’s needs.
              </p>`,
    `<ImageHeader image="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop" color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.typicalDay.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.typicalDay.intro}</p>`,
  ],

  // firstNinetyDays
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">What Parents Can Expect During the First 90 Days</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                The first months of ABA therapy are usually focused on learning your child’s needs, building trust, teaching early goals, and helping caregivers understand what is happening in treatment.
              </p>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.firstNinetyDays.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.firstNinetyDays.intro}</p>`,
  ],

  // parentInvolvement
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">How are parents involved in ABA therapy?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                Families play a vital role in every successful ABA program. Parent guidance helps caregivers understand strategies, practice skills during daily routines, and support progress outside therapy sessions.
              </p>
              <ul className="mt-6 space-y-3 text-lg leading-9 text-slate-700">
                <li>• Set personalized goals that reflect home, school, and community needs</li>
                <li>• Learn evidence-based strategies for transitions, safety, communication, and routines</li>
                <li>• Coordinate care with doctors, schools, speech therapy, occupational therapy, and other providers when appropriate</li>
                <li>• Build consistency so children can use skills with different people and in different places</li>
              </ul>`,
    `<ImageHeader image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.parentInvolvement.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.parentInvolvement.intro}</p>
              <ul className="mt-6 space-y-3 text-lg leading-9 text-slate-700">
                {p.parentInvolvement.bullets.map((item) => <li key={item}>• {item}</li>)}
              </ul>`,
  ],

  // homeSchool
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">How ABA Supports Success at Home and School</h2>
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
                <a href="#locations" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800">{p.findCenter} Near You</a>
                <a href="#autism-assessment" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">Schedule an Autism Evaluation</a>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.homeSchool.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.homeSchool.intro}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <article className="rounded-[1.8rem] bg-emerald-50 p-7 ring-1 ring-emerald-100">
                  <Home className="text-emerald-700" size={34} />
                  <h3 className="mt-4 text-2xl font-black text-emerald-950">{p.homeSchool.home.title}</h3>
                  <p className="mt-3 leading-8 text-slate-700">{p.homeSchool.home.text}</p>
                </article>
                <article className="rounded-[1.8rem] bg-yellow-50 p-7 ring-1 ring-yellow-200">
                  <School className="text-yellow-700" size={34} />
                  <h3 className="mt-4 text-2xl font-black text-emerald-950">{p.homeSchool.school.title}</h3>
                  <p className="mt-3 leading-8 text-slate-700">{p.homeSchool.school.text}</p>
                </article>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#locations" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800">{p.homeSchool.findCenter}</a>
                <a href="#autism-assessment" className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50">{p.homeSchool.scheduleEvaluation}</a>`,
  ],

  // effectiveness
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop" color="yellow" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Is ABA therapy effective?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA is widely used to support children with autism because it uses individualized goals, ongoing progress data, parent involvement, and evidence-based teaching strategies. The best outcomes happen when treatment is personalized, compassionate, consistent, and reviewed frequently.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-black text-emerald-950">Discrete Trial Teaching</h3><p className="mt-3 leading-8 text-emerald-900">DTT breaks new skills into small steps with clear prompts, practice, feedback, and reinforcement.</p></div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-black text-emerald-950">Natural Environment Teaching</h3><p className="mt-3 leading-8 text-emerald-900">NET uses play, routines, and child interests to teach skills in real-life situations.</p></div>
              </div>`,
    `<ImageHeader image="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop" color="yellow" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.effectiveness.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.effectiveness.intro}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {p.effectiveness.methods.map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-black text-emerald-950">{title}</h3><p className="mt-3 leading-8 text-emerald-900">{text}</p></div>
                ))}
              </div>`,
  ],

  // mythsFacts
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">Common ABA Therapy Myths vs Facts</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Parents deserve a clear, modern understanding of ABA therapy. These quick myth-and-fact cards help families know what ethical, individualized ABA should look like.</p>
              <div className="mt-8 grid gap-4">
                {abaMyths.map(([myth, fact]) => (
                  <details key={myth} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-emerald-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">Myth: {myth}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700"><strong>Fact:</strong> {fact}</p>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.mythsFacts.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.mythsFacts.intro}</p>
              <div className="mt-8 grid gap-4">
                {abaMyths.map(([myth, fact]) => (
                  <details key={myth} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-emerald-50">
                    <summary className="cursor-pointer text-xl font-black text-emerald-950">{p.mythsFacts.mythPrefix} {myth}</summary>
                    <p className="mt-3 text-lg leading-8 text-slate-700"><strong>{p.mythsFacts.factPrefix}</strong> {fact}</p>`,
  ],

  // assessment
  [
    `<ImageHeader image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop" color="green" />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">Understanding the ABA Assessment Process</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Before therapy begins, the BCBA learns about your child’s strengths, needs, communication, routines, safety concerns, school history, and family priorities. The assessment becomes the foundation for treatment planning.</p>`,
    `<ImageHeader image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop" color="green" alt={p.sectionImageAlt} />
              <h2 className="mt-8 text-5xl font-black tracking-tight text-emerald-950">{p.assessment.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.assessment.intro}</p>`,
  ],

  // treatmentPlans
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">How BCBAs Create Individualized Treatment Plans</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">A BCBA uses assessment results, family input, observation, developmental priorities, and data to create a plan that is specific, measurable, and meaningful. The plan should explain what will be taught, how progress will be measured, and how caregivers will be supported.</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {["Family priorities", "Current skill levels", "Behavior and safety needs", "Communication profile", "School and home routines", "Progress review schedule"].map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.treatmentPlans.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.treatmentPlans.intro}</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {p.treatmentPlans.checklist.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}`,
  ],

  // earlyIntervention
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">Long-Term Benefits of Early Intervention</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Early support can help families understand developmental needs sooner and build foundational skills during important learning years. ABA therapy may support communication, daily routines, safety, play, social participation, and school readiness when goals are individualized and reviewed regularly.</p>
              <div className="mt-7 rounded-[1.7rem] border border-emerald-200 bg-emerald-50 p-6">
                <p className="text-xl font-black text-emerald-950">Early support is not about rushing a child. It is about giving the child and family practical tools sooner.</p>
              </div>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.earlyIntervention.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.earlyIntervention.intro}</p>
              <div className="mt-7 rounded-[1.7rem] border border-emerald-200 bg-emerald-50 p-6">
                <p className="text-xl font-black text-emerald-950">{p.earlyIntervention.callout}</p>
              </div>`,
  ],

  // cost
  [
    `<h2 className="text-4xl font-black text-emerald-950">How much does ABA therapy cost?</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">
                ABA therapy costs depend on insurance coverage, authorization requirements, deductible, copay, coinsurance, medical necessity, provider network status, and the number of approved therapy hours. Eden ABA Therapy can help collect insurance information, review benefits, and explain next steps before services begin.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button onClick={onStart}>{p.getStarted} <ArrowRight size={18} /></Button>
                <Button variant="secondary" onClick={onStart}>Check my insurance coverage</Button>`,
    `<h2 className="text-4xl font-black text-emerald-950">{p.cost.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.cost.intro}</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button onClick={onStart}>{p.cost.getStarted} <ArrowRight size={18} /></Button>
                <Button variant="secondary" onClick={onStart}>{p.cost.checkInsurance}</Button>`,
  ],

  // parentQuestions section
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">Questions Parents Should Ask Before Starting ABA Therapy</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Choosing an ABA provider is an important decision. These questions help families compare programs, understand supervision, and feel prepared before starting services.</p>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.parentQuestions.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.parentQuestions.intro}</p>`,
  ],

  // successFactors
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">Success Factors That Improve ABA Outcomes</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Meaningful progress is more likely when therapy is consistent, individualized, collaborative, and connected to real family routines.</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {["Consistent attendance", "Active parent participation", "Clear measurable goals", "BCBA supervision", "Coordination with schools and providers", "Regular data review", "Compassionate teaching", "Generalization across settings"].map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.successFactors.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.successFactors.intro}</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {p.successFactors.items.map((item) => <MiniCheck key={item}>{item}</MiniCheck>)}`,
  ],

  // additionalFaqs + relatedResources
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">Frequently Asked Questions About Starting ABA</h2>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.additionalFaqs.title}</h2>`,
  ],
  [
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">Related ABA Therapy Resources</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">Use these related pages to continue learning, check coverage, find a center, or begin the intake process.</p>`,
    `<h2 className="text-5xl font-black tracking-tight text-emerald-950">{p.relatedResources.title}</h2>
              <p className="mt-5 text-lg leading-9 text-slate-700">{p.relatedResources.intro}</p>`,
  ],

  // ImageHeader component
  [
    `function ImageHeader({ image, color }) {
  return (
    <div className="relative max-w-lg">
      <div className={\`absolute -right-10 -top-8 h-32 w-32 \${color === "yellow" ? "rounded-full bg-yellow-300" : "rounded-[2.5rem] bg-emerald-600"}\`} />
      <img src={image} alt="ABA therapy educational section" className="relative h-56 w-full rounded-[2rem] object-cover shadow-xl ring-8 ring-white" />
    </div>
  );
}`,
    `function ImageHeader({ image, color, alt }) {
  return (
    <div className="relative max-w-lg">
      <div className={\`absolute -right-10 -top-8 h-32 w-32 \${color === "yellow" ? "rounded-full bg-yellow-300" : "rounded-[2.5rem] bg-emerald-600"}\`} />
      <img src={image} alt={alt} className="relative h-56 w-full rounded-[2rem] object-cover shadow-xl ring-8 ring-white" />
    </div>
  );
}`,
  ],
];

let applied = 0;
for (const [from, to] of reps) {
  if (s.includes(from)) {
    s = s.replace(from, to);
    applied++;
  } else {
    console.warn("MISSING:", from.slice(0, 80));
  }
}

writeFileSync(path, s);
console.log(`Applied ${applied}/${reps.length} ABA JSX replacements`);
