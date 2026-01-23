# 30-Day Roadmap

Assuming ~part-time but focused effort; adjust pacing as needed.

## Week 1 — Stabilise & Unblock Deployment
Goal: Fully working SSR deployment + clean environments.

### Tasks:
- Apply IAM fix via gcloud (as above).
- Redeploy Hosting and verify:
  - /dashboard
  - /projects
  - /projects/[id]
- Add basic logging around all Genkit flows (start/end, errors).
- Create a simple "System Status" section in the dashboard showing:
  - Genkit health
  - GitHub connectivity
  - YouTube connectivity

## Week 2 — New Flows & Backend Enhancements
Goal: Implement and wire the new flows.

### Tasks:
- Implement:
  - generateThumbnail
  - autoPublishSchedule
  - competitorAnalysis
  - audiencePersonaBuilder
  - contentCalendarGenerator
- Register flows in firebase.ts and genkit.json.
- Add Firestore models for:
  - Content calendar items
  - Personas
  - Competitor snapshots
- Write minimal integration tests (or manual scripts) to call each flow.

## Week 3 — UI for Production Pipeline & Calendar
Goal: Make the system feel like a real studio, not just a set of flows.

### Tasks:
- Implement Production Timeline on /projects/[id]:
  - Show status of each step based on Firestore/flow results.
  - Add "Run step" buttons that call the corresponding flows.
- Implement Content Calendar view:
  - Calendar grid
  - "Generate 30-day calendar" button
  - Store items in Firestore
- Add GitHub panel to project page:
  - Show repo link, latest commits, open issues (using your GitHub flows).

## Week 4 — Analytics, Promotion, and Polish
Goal: Turn it into a growth machine, not just a production tool.

### Tasks:
- Build Growth & Analytics dashboard:
  - Integrate runGrowthAnalytics flow.
  - Show charts (even if initially mocked or lightly powered).
- Implement Promotion Campaigns UI:
  - List campaigns
  - Detail view with tasks from executePromotionTask and schedulePromotionCampaign.
- Add Monetisation Dashboard:
  - Use generateMonetisationPlan, createMonetisationProfile, getMonetisationProfile.
- UX polish:
  - Loading states, error toasts, success banners.
  - Clear "Next step" CTAs on each page.