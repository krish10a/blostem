Below is a copy-paste ready project blueprint for your Blostem Marketing Automation MVP. I have kept the structure close to the style of the ClauseAI mentor document you shared — objective, workflow, modules, architecture, milestones, and tech stack — but adapted it properly for this hackathon use case. The ClauseAI document you shared used exactly this kind of product-style structure: introduction/objective, methodology/workflow, modules, architecture, week-wise implementation, and technology stack.
________________________________________
Blostem AI Marketing Automation MVP
Project Blueprint, Module Breakdown, and Implementation Plan
1. Introduction / Objective
Blostem AI Marketing Automation MVP is an AI-powered B2B sales and outreach intelligence system built for fintech infrastructure companies like Blostem. Its purpose is to help the sales and marketing team identify high-intent enterprise prospects, understand who the key decision-makers are, generate personalized outreach across the buying committee, and recommend the best next action for every account.
The core problem this product solves is that enterprise fintech sales is slow, fragmented, and multi-stakeholder. A single generic email is not enough. A real sales cycle needs signal detection, account prioritization, persona mapping, compliant messaging, lead nurturing, and sales action recommendations. The MVP should convert messy market signals into a clean, actionable pipeline for the sales team.
This project is not just an email generator. It is a decision-support system for B2B fintech growth.
________________________________________
2. Problem Statement
Blostem’s B2B cycle involves multiple decision-makers, long deal timelines, and activation friction after partner sign-up. Sales teams need to know:
•	Which accounts are worth reaching out to
•	Which companies are showing buying intent
•	Who inside the account should be contacted
•	What message should be sent to each stakeholder
•	When to follow up
•	What compliance-sensitive language should be avoided
•	Which lead should be prioritized next
Most teams do this manually using spreadsheets, CRM notes, and guesswork. That creates delay, inconsistency, and missed opportunities. The MVP should replace that manual process with a structured AI pipeline.
________________________________________
3. Project Goal
The goal of the MVP is to build a working prototype that:
•	Detects potential enterprise fintech prospects from market and company signals
•	Scores and ranks accounts by intent and fit
•	Maps likely stakeholders in the buying chain
•	Generates tailored outreach sequences for each persona
•	Recommends sales next steps based on account activity
•	Provides a simple dashboard for marketing/sales users to manage the pipeline
________________________________________
4. What the Product Should Be
The product should look like a lightweight but serious B2B SaaS dashboard.
It should feel like a real internal tool used by a fintech sales team.
The UI should not feel like a toy chatbot. It should have the following screens:
1.	Account Discovery Dashboard
A list of target companies with intent score, fit score, reason tags, and status.
2.	Account Detail Page
A deep view of one company showing summary, signals, stakeholders, pain points, and suggested outreach angles.
3.	Persona Outreach Generator
A screen that generates customized messages for founder, product head, partnerships lead, compliance lead, and engineering lead.
4.	Sequence Builder
A workflow to create email or LinkedIn-style outreach sequences with compliance-safe language.
5.	Sales Action Panel
A recommendations page showing who to contact now, who to nurture, and who to deprioritize.
6.	Analytics Dashboard
Conversion metrics, reply rate, sequence performance, and lead funnel insights.

## Phase 2: Backend Cloud Migration & Security

### [MODIFY] [AppSidebar.tsx](file:///c:/Users/ASUS/Desktop/blostem/app-core/blostem-ui/src/components/shell/AppSidebar.tsx)
- Integrated Supabase user state and Sign Out button.

### [MODIFY] [requirements.txt](file:///c:/Users/ASUS/Desktop/blostem/app-core/blostem-backend/requirements.txt)
- Added `psycopg2-binary` for PostgreSQL support.
- Added `python-jose[cryptography]` for JWT verification.

### [MODIFY] [database.py](file:///c:/Users/ASUS/Desktop/blostem/app-core/blostem-backend/database.py)
- Switch from SQLite to PostgreSQL.
- Use `DATABASE_URL` from environment variables.

### [NEW] [auth_utils.py](file:///c:/Users/ASUS/Desktop/blostem/app-core/blostem-backend/auth_utils.py)
- Implement `get_current_user` dependency.
- Use `jose` to verify JWTs signed by Supabase.

### [MODIFY] [models.py](file:///c:/Users/ASUS/Desktop/blostem/app-core/blostem-backend/models.py)
- Add `owner_id` to `Prospect` table for multi-tenancy.

### [MODIFY] [routers/prospects.py](file:///c:/Users/ASUS/Desktop/blostem/app-core/blostem-backend/routers/prospects.py)
- Update endpoints to filter by `owner_id`.
- Inject `current_user` dependency to all protected routes.

## Open Questions

> [!IMPORTANT]
> **Supabase JWT Secret**: I will need the `JWT Secret` from your Supabase Project Settings (Settings -> API) to allow the backend to verify tokens. I'll use an environment variable `SUPABASE_JWT_SECRET` for this.

## Verification Plan

### Automated Tests
- `pytest` for backend route protection (mocking JWTs).
- Browser testing of the login flow and data isolation.

### Manual Verification
- Test Google Login on the hosted Vercel URL.
- Verify that prospects created by one user are NOT visible to another user.
________________________________________
5. Core User Flow / Workflow
The MVP should follow this end-to-end workflow:
Step 1: Input / Prospect Source
The system accepts either:
•	A manual company name
•	A CSV list of target accounts
•	A simple seed query such as “Indian fintech companies raising funds”
•	Optional: external company URLs or basic metadata
Step 2: Signal Collection
The system collects or simulates signals such as:
•	Company category
•	Stage or size
•	Market relevance
•	Funding/activity signals
•	Hiring signals
•	Website/product clues
•	Social or public updates
•	Compatibility with Blostem’s offering
Step 3: Lead Scoring
The system calculates:
•	Intent score
•	Fit score
•	Priority score
•	Confidence score
Step 4: Persona Mapping
The system identifies likely stakeholders:
•	Founder / CEO
•	Product leader
•	Partnerships / BizDev
•	Compliance / Risk
•	Engineering / Tech lead
Step 5: Message Generation
The system creates:
•	One personalized opener per persona
•	One full outreach email
•	One follow-up message
•	One short LinkedIn note
•	Optional: a call script or internal note
Step 6: Compliance Check
The system checks the message for:
•	Overpromising
•	Unverified claims
•	Unclear regulatory language
•	Aggressive sales wording
•	Weak or spammy phrasing
Step 7: Sales Action Recommendation
The system outputs:
•	Contact now
•	Wait and nurture
•	Assign to rep
•	Follow up in 3 days
•	Low-priority
Step 8: Export / Handoff
The final result can be:
•	Exported as JSON
•	Exported as CSV
•	Copied into CRM
•	Saved to history for later use
________________________________________
6. Functional Modules
Module 1: Prospect Intake Module
Purpose
Accept company information from the user.
Input
•	Company name
•	URL
•	CSV upload
•	Manual text
•	Seed keyword
Output
•	Structured prospect object
Responsibilities
•	Parse uploaded file
•	Normalize company names
•	Store initial records
•	Validate missing fields
MVP Scope
•	Manual input and CSV upload only
•	No need for full external scraping in the first version
________________________________________
Module 2: Signal Intelligence Module
Purpose
Extract useful market and company signals.
Possible Signals
•	Company industry
•	Fintech relevance
•	Team size estimate
•	Growth stage
•	Hiring activity
•	Product maturity
•	Public updates
•	Funding or partnership hints
Output
•	Signal summary
•	Reason tags
•	Raw notes
MVP Scope
Use a mix of:
•	Publicly available text input
•	Manual signal templates
•	AI-generated inference from company description
Do not overbuild this. The goal is useful signal-based ranking, not perfect market intelligence.
________________________________________
Module 3: Lead Scoring Module
Purpose
Convert signals into a usable priority score.
Scores
•	Fit Score: How relevant the company is to Blostem
•	Intent Score: How likely they are to be active or interested
•	Priority Score: Combined score used for ranking
•	Confidence Score: How reliable the score is
Scoring Logic
A simple weighted rule-based model is enough for MVP:
•	Fintech relevance: 30%
•	Growth signals: 25%
•	Product fit: 20%
•	Hiring/activity: 15%
•	Recency/engagement hints: 10%
Output
•	Rank-ordered lead list
•	Score explanation
•	Short justification
MVP Scope
Do not use a heavy ML model unless you already have good data. A transparent scoring system is better for this hackathon.
________________________________________
Module 4: Persona Mapping Module
Purpose
Identify who in the account should be targeted and why.
Personas
•	Founder / CEO
•	Head of Product
•	Head of Partnerships
•	Head of Growth
•	Compliance / Risk
•	Engineering / Tech
Output per persona
•	Role-specific pain points
•	Likely objections
•	Best pitch angle
•	Message tone
•	Call-to-action style
MVP Scope
Use AI to map personas based on company type and deal stage. Even if the identity is inferred rather than exact, the logic should be convincing.
________________________________________
Module 5: Outreach Generation Module
Purpose
Generate personalized sales and marketing messages.
Output Types
•	Initial email
•	Follow-up email
•	LinkedIn message
•	Internal sales note
•	Call script summary
Message Constraints
•	Short and clear
•	Personalized to account
•	Persona-aware
•	Blostem-relevant
•	Compliance-safe
•	No exaggerated claims
MVP Scope
Generate 2–3 variations per persona:
•	Founder version
•	Product version
•	Partnerships version
________________________________________
Module 6: Compliance and Safety Module
Purpose
Prevent risky or weak outreach content.
Checks
•	No false claims
•	No manipulative language
•	No regulatory overstatement
•	No vague promises
•	No spam-like formatting
Output
•	Approved
•	Needs revision
•	Flagged issue list
MVP Scope
Use a simple rule-based and LLM-based check together.
This module is important because the hackathon brief explicitly asks for compliance-aware sequences.
________________________________________
Module 7: Sequence Builder Module
Purpose
Create a multi-step outreach sequence.
Sequence Structure
1.	First touch email
2.	Follow-up after 3 days
3.	Follow-up with case study angle
4.	Final nudge or handoff
Output
•	Timeline of messages
•	Channel-wise message draft
•	Suggested send timing
MVP Scope
A sequence builder is more valuable than a single-message generator because it feels like a real sales product.
________________________________________
Module 8: Sales Action Recommendation Module
Purpose
Tell the user what to do next.
Recommendation Types
•	Contact now
•	Add to nurture
•	Escalate to rep
•	Rework message
•	Deprioritize
Output
•	Next action
•	Reason
•	Suggested owner
•	Suggested time
MVP Scope
This module can be rule-based with AI explanation. That is enough.
________________________________________
Module 9: Dashboard and Analytics Module
Purpose
Show the overall system impact.
Metrics
•	Total accounts discovered
•	High-priority leads
•	Generated sequences
•	Approved messages
•	Reply rate
•	Conversion stages
•	Best-performing persona
MVP Scope
Keep it simple but polished. Even basic charts and cards will make the product feel real.
________________________________________
Module 10: Export and Integration Module
Purpose
Allow output to be reused outside the app.
Export Options
•	CSV export
•	JSON export
•	Copy to clipboard
•	Download outreach sequence
•	Save account notes
MVP Scope
This can be very lightweight, but it makes the tool feel practical.
________________________________________
7. Suggested System Architecture
The architecture should be modular and pipeline-based.
High-Level Flow
Input → Signal Extraction → Scoring → Persona Mapping → Message Generation → Compliance Check → Sequence Builder → Recommendations → Dashboard
Architecture Layers
A. Frontend Layer
Handles:
•	User input
•	Dashboard
•	Tables/cards
•	Message preview
•	Sequence editor
B. Orchestration Layer
Handles:
•	Module coordination
•	Step execution
•	Data passing between components
C. Intelligence Layer
Handles:
•	AI generation
•	Scoring logic
•	Persona reasoning
•	Content generation
•	Compliance checking
D. Storage Layer
Handles:
•	Saved prospects
•	Generated messages
•	Sequence history
•	User activity logs
E. Analytics Layer
Handles:
•	Metrics
•	Lead funnel
•	Basic reporting
________________________________________
8. Suggested Tech Stack
Frontend
•	React
•	Tailwind CSS
•	shadcn/ui or similar component library
•	Recharts for analytics
•	Framer Motion for small interactions
Backend
•	Python FastAPI or Node.js backend
•	REST endpoints for module actions
AI / LLM Layer
•	OpenAI API or another reliable LLM API
•	Prompt templates for scoring and outreach
•	Structured JSON outputs
Data / Storage
•	PostgreSQL (Supabase)
•	Optional PostgreSQL if needed
•	Optional vector store if you later add retrieval
File Handling
•	CSV parsing
•	JSON serialization
•	Downloadable exports
Deployment
•	Frontend: Vercel or Netlify
•	Backend: Render / Railway / similar
•	Database: local SQLite for demo or hosted DB if possible
________________________________________
9. Recommended Data Model
Prospect Object
•	company_name
•	website
•	industry
•	size
•	signals
•	fit_score
•	intent_score
•	priority_score
•	confidence_score
•	persona_map
•	messages
•	sequence_plan
•	compliance_status
•	next_action
•	created_at
•	updated_at
Persona Object
•	persona_name
•	role
•	pain_points
•	objections
•	pitch_angle
•	message_draft
Sequence Object
•	step_number
•	channel
•	message
•	timing
•	status
________________________________________
10. Prompt and AI Design Principles
The AI layer should not be random. It should use structured prompts.
Prompt Goals
•	Force JSON output where possible
•	Make reasoning concise and business-like
•	Prevent hallucination
•	Keep tone professional
•	Make outputs actionable
Prompt Rules
•	No long essays
•	No vague advice
•	No marketing fluff
•	No unsupported claims
•	No repetitive phrasing
•	Every output should lead to an action
________________________________________
11. MVP Scope Control
This is where most students fail. They try to build 10 things and finish 2 badly. Do not do that.
What to Build First
•	Prospect input
•	Lead scoring
•	Persona mapping
•	Message generation
•	Dashboard
•	Basic export
What to Delay
•	Full CRM integration
•	Browser scraping automation
•	Auto-email sending
•	Complex workflow rules
•	Advanced analytics
•	Multi-agent overengineering
The MVP must look complete, not huge.
________________________________________
12. Week-Wise Implementation Plan
Week 1: Foundation + Core Intelligence
Goals
•	Finalize product scope
•	Create UI skeleton
•	Build input form
•	Build prospect data model
•	Implement lead scoring logic
•	Create first AI prompts
Deliverables
•	Basic dashboard
•	Prospect creation
•	Simple scoring engine
•	Dummy or semi-real sample data
________________________________________
Week 2: Persona and Outreach System
Goals
•	Implement persona mapping
•	Build message generation module
•	Add compliance check
•	Create sequence builder
Deliverables
•	Persona-aware outreach drafts
•	Sequence view
•	Compliance flagging
•	Message variations
________________________________________
Week 3: Dashboard and Action Layer
Goals
•	Build sales action recommendation module
•	Add analytics cards
•	Improve UI polish
•	Add export functions
Deliverables
•	Priority board
•	Analytics dashboard
•	CSV/JSON export
•	Better UX and navigation
________________________________________
Week 4: Refinement and Demo Readiness
Goals
•	Fix bugs
•	Improve copy
•	Clean visuals
•	Add empty states
•	Add sample demo datasets
•	Write README and presentation flow
•	Record or prepare demo
Deliverables
•	Production-like UI
•	Working demo flow
•	Clean documentation
•	Final submission package
________________________________________
13. Final Deliverables
Your final submission should include:
•	Working deployed app
•	GitHub repository
•	README with problem, solution, features, and setup
•	Demo video or live demo script
•	Screenshots of dashboard
•	Architecture diagram
•	Sample input/output examples
•	Clear explanation of business impact
________________________________________
14. Evaluation Strategy
The judges will likely care about whether this feels like a real product, not whether you built a giant system.
What will impress them
•	Clear problem understanding
•	Realistic B2B workflow
•	Good UI
•	Explainable lead scoring
•	Persona-aware outreach
•	Compliance-aware messaging
•	Clean demo story
•	Deployed application
What will hurt you
•	Generic AI wrapper
•	No product logic
•	Weak narrative
•	Unfinished UI
•	Fake or vague demo
•	Too much complexity with too little polish
________________________________________
15. Demo Storyline
Your demo should follow this exact story:
1.	“Blostem sells fintech infrastructure to enterprises.”
2.	“This cycle is slow and multi-stakeholder.”
3.	“I built a system that finds good accounts from signals.”
4.	“It scores them and identifies the right stakeholders.”
5.	“It generates compliant personalized outreach for each persona.”
6.	“It recommends the next sales action.”
7.	“The result is a faster, more focused pipeline.”
That is the story. Keep it tight.
________________________________________
16. Success Criteria
The MVP is successful if it can:
•	Accept a company or account list
•	Score and rank prospects
•	Explain the score
•	Generate persona-based outreach
•	Flag risky wording
•	Recommend next actions
•	Present everything in a clean dashboard
•	Be deployed and shown live
________________________________________
17. Non-Goals
Do not waste time on these in the MVP:
•	Full-scale data scraping engine
•	Automated email sending with live inbox integration
•	Advanced ML models without data
•	Complex CRM sync
•	Overdesigned multi-agent system
•	Overly fancy animations with no value
________________________________________
18. Final Product Definition
At the end of the build, your product should feel like this:
“A smart internal marketing and sales assistant for fintech companies that turns market signals into prioritized enterprise outreach.”
That is the cleanest definition of the project.
________________________________________
If you want, the next step should be the actual folder structure, database schema, APIs, and screen-by-screen UI plan for this exact MVP.

