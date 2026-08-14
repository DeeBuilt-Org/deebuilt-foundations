# Voice — deebuilt.co

Project-specific voice notes for the DeeBuilt site. **Read `C:\Users\ruthn\.claude\VOICE.md`
first** — it carries the fingerprint, the shape checks, and the banned list. This file only
adds what's specific to this site.

---

## The brief, in her words

> "I want my website to sound straightforward, not like marketing."

Straightforward is a stance, not a tone. It means saying the plain thing even when the
marketing version would sound better.

Also standing: **human, approachable, helpful.** Not clever, not impressive.

---

## Who is reading

A business owner or operator who has a problem they can describe but can't name. They may
not know what an integration is. They have **zero shared context** with this site.

Two consequences:

- Shorthand doesn't work here. Every noun has to be a real, named thing (global `VOICE.md`
  §1, and its exception does not apply on this site).
- Jargon is out. *Workflow orchestration*, *data pipeline*, *permission architecture*,
  *integration layer* — all rejected. The plain version she actually says is the correct
  version: *a bridge between the two systems*.

---

## Say what the work is, not what it transforms

This is the site's hardest problem and the source of every corny line she's rejected.

**The site has to state what she does.** A hero has room for eight words and a stranger
needs an answer. So state it plainly — that's not the thing she objects to.

What's dead is the *transformation claim*: *chaos into order*, *stitch together what's
broken*, *turn X into Y*. Both halves abstract, nothing real on either side. See global
`VOICE.md` §2 for the precise line.

Two moves that work instead:

- **Name the actual work.** "I map how work moves through a business, then rebuild the
  parts that stall." Nobody is inspired by that sentence, which is exactly why it doesn't
  read as corny. It reads as a job.
- **Name the person.** "For businesses that outgrew their spreadsheets but aren't ready
  for enterprise software." The problem is implied and no metaphor was needed.

Her existing lede is good and stays unless she says otherwise:

> "Operations and systems support, on call. Tell me what you're feeling and I'll tell you
> what you need."

It reads as warm rather than corny because it describes an exchange, not a transformation.
What it needs is a plain factual neighbor above or below it — it can't carry the whole
positioning alone.

---

## Claims must be backed

She has one paying client and a real portfolio. She does not have scale, a team, or years
of agency case studies. Do not write copy that implies any of them.

No invented metrics. No "trusted by." No plural clients where there is one. If a claim
can't be pointed at, it doesn't ship — and per global `VOICE.md` §4, a stub beats a
plausible-sounding placeholder.

Honest labeling is already a strength of this site (the `Live` / `Demo` / `Personal
project` status system in `src/content/projects.ts`). Copy should match that standard.

---

## Lines currently on the site

All settled 2026-08-14 unless marked otherwise. Every line below is hers.

**Home:**
- Hero rotator: "Launch. Scale. Reorganize." (see below)
- Lede: "Operations and systems design for businesses at any stage."
- Hook: "Your business is capped by your weakest process."
- "Which sounds familiar?" over the four flip cards
- "See how your operations stack up." / "Take the full assessment"
- "You get your score before we ask for anything."
- "Selected work." (replaced "Things I've built." — passive, and about her)

**Four service-card symptoms** (`src/content/projects.ts`) — in a customer's voice, each
one a complaint someone would actually make. Also: "You keep the map whether or not you
hire me."

**About:**
- "Honestly, I love integrations." — replaced "I help teams improve the way their work
  flows," which failed the stance test.
- The mathematician / carpet-cleaning-video comparison. Both halves stay: the first
  carries the PROCESS (building step by step), the second the PAYOFF (the moment it
  lands). Cutting either halves the feeling.
- "As a self-proclaimed generalist..." — five fields, a real inventory, not a rhetorical
  list. "Systems development" is deliberate; she wants credit for it.
- The cats / Pilates / audiobooks line. The one unserious line on the site.

**Still open:**
- Closing CTA band on the home page: "Start with a look at how work moves through your
  business" and "Thirty minutes, no pitch..." She dislikes both. Needs a line that ASKS —
  it sits above the booking button.
- About page meta description — still the old "handoffs between them" positioning.
- Portfolio entries she called weak, especially the Demo-status ones.

**Dropped, do not reinstate without her:**
> "If information only moves when you move it, you need better integrations."

Hers, and she likes it — it had no home that worked. It's a diagnosis, so above a booking
button it leaves a gap where the ask should be. She has it saved elsewhere.

---

## What "in her words" actually means

The single biggest failure mode this session, repeated several times: she dictates a line,
and the draft comes back with her words swapped for cleaner ones.

> "I don't know what's so hard about putting my words. That's what this whole session is
> about, and you just keep on stripping it down."

> "What you revert to is never gonna be as good as what I give you. Please don't do that
> anymore. Work with what I give you. Don't try to reframe it because it's going to sound
> like AI. You can't help but sound like AI."

**When she dictates, the ONLY edit permitted is removing spoken restarts and filler** —
the *um*, the *you know*, the mid-sentence restarts. Nothing swapped, nothing "tightened,"
no synonyms. If a construction in her line is genuinely banned (negative parallelism, a
propped-up tail), write it as she said it, then flag it separately and let her decide.

Two related failures worth naming:

**Don't filter your way to nothing.** When she rejected constructions in a line, the draft
kept deleting words until four flat words were left that explained nothing. Rejecting a
shape is not an instruction to shorten — it's an instruction to write a better sentence.

**Build on what she gives you; don't dismantle it.** She proposed "project-based or full
engagement, operations and systems leadership." The only real problem was ORDER (six words
of contract terms in front of the noun). Reordering it kept everything. Tearing it down to
rebuild from scratch lost her voice and wasted the turn.

---

## Copy principles established this session

**Symptoms are conditions, not confessions.** "It's hard to keep track of project status"
describes a system someone can hand over. "We lose track of project status" is an
admission of failure, and a visitor who has to blame themselves in order to qualify will
just decide the card isn't about them. Her call, and it's right.

**"Better" is load-bearing — don't correct it to "any" or "the right."** Her reasoning:
someone who already has integrations audits what they have; someone who has none still
self-qualifies and then asks HOW they need better ones. That question is the conversation
she wants.

**Don't hand the reader a choice she should be making.** "You need better integrations or
you need better automations" was cut to just integrations. Resolving which one is her job.

**Nothing that makes the reader do the diagnosing.** The old lede — "Tell me what you're
feeling and I'll tell you what you need" — asked the visitor to self-diagnose before being
given anything, and they usually diagnose wrong.

**A hero line can state something.** What's banned is the abstract-to-abstract
transformation claim, not any claim at all. See global `VOICE.md` §2.

---

## Word choices, decided

- **design** over *support* (what a helpdesk does), *leadership* (implies running someone
  else's team, contradicts fractional), and *consulting* (a delivery model, not a skill).
  "Design" is also what makes the title *strategist* cohere.
- **reorganize** over *rebuild*, *reset*, *retool*, *regroup*, *transform*. See below.
- **systems development**, never *DevOps*. DevOps means deployment pipelines and
  infrastructure. That is not this work, and anyone technical would read it wrong.
- **repeated** over *same* in the automation symptom — *same* is a comparison, *repeated*
  is a frequency, and frequency is the complaint.
- **"Selected work."** for the portfolio heading. The standard term for consultants, and
  *selected* implies both depth and that someone chose.

---

## Structural notes

**She splits long sentences rather than trimming them.** Her instinct on a sentence that
runs long is a period, not a cut. Follow it.

**Don't restate the hero elsewhere on the site.** A closing line on the About page was cut
purely for repeating Launch / Scale / Reorganize.

**Meta descriptions are not a ranking factor.** They affect click-through only. The title
tag and H1 do the SEO work. Don't stuff keywords into a description and call it SEO.

**The funnel, as the site now runs it:** hero (what/who) → hook (the principle) → flip
cards (the qualifier, with the flip as a micro-commitment) → assessment (the heavier ask,
20+ scored statements ending in a capture) → selected work → booking. The assessment sits
BELOW the cards deliberately; above them it asked for too much too early.

**Three contact paths, by readiness:** "Send a message" (lowest commitment, footer only),
"Book a discovery call" (highest intent), the assessment (diagnostic that captures on the
way out). Note the plain contact form currently exists ONLY in the footer.

---

## Terms she wants on the page (parked, 2026-08-14)

Real industry terms she wants worked in somewhere, not yet placed:

- **Digital transformation** — the named category buyers search for and budget for. Use as
  the full two-word term. Do NOT shorten to *transform* as a standalone verb; alone it has
  no object and becomes an abstract-to-abstract claim (global `VOICE.md` §3).
- **Process engineering** — reading a process end to end, reverse-engineering it, writing
  it out. Adjacent material she raised: the five whys, cutting waste.

Both describe the same work the hero rotator gestures at. The rotator holds plain
owner-words; these are the terms for a section with room to define them.

---

## The hero rotator

Three states, settled 2026-08-14: **Launch. Scale. Reorganize.**

They are not a pipeline and must not be ordered as one. They're three milestones a
business can sit in at any time, in any order.

*Reorganize* was chosen over *rebuild*, *reset*, *retool*, and *regroup* in her words:

> "Rebuild sounds like, whoa whoa whoa, I already built this. You're not coming in here
> and messing up what already works. Reorganize makes us sound like, oh, we're gonna keep
> what works."

It's the concession word — someone sitting in a crisis can admit to needing "a little more
organization" without admitting to a crisis. It also catches the buyer who arrives
self-diagnosed as needing to scale when the real job comes first.

Rejected: *transform* (no object, abstract-to-abstract), and any version where the third
item carries a trailing clause (global `VOICE.md` §3, the propped-up third item).

---

## Structural note

The visual bans (three-up card grids, generic centered hero, card-stacked layouts) **do
apply here** — this is a marketing site. That's the scope where they're meant to fire.
See global `VOICE.md` §6.

The existing 2x2 flip-card grid is deliberate and approved: four items, not three, and it
functions as a qualification device rather than a feature row.
