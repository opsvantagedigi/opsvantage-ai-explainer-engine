# Autonomous AI‑YouTube Studio
## Full System Pipeline & Monetisation Architecture
### Using Firebase GenKit, Gemini AI & NOWPayments

---

# **TABLE OF CONTENTS**

## **1. Executive Summary**
1.1 Purpose of the System
1.2 Core Technologies
1.3 High‑Level Architecture Overview

## **2. Platform Architecture**
2.1 Frontend Architecture
2.2 Backend Architecture
2.3 AI Engine (Gemini via GenKit)
2.4 Database Architecture (Firestore)
2.5 Storage Architecture (Cloud Storage)
2.6 Payment Infrastructure (NOWPayments)
2.7 Media Generation APIs
2.8 YouTube Integration

## **3. Pricing & Subscription Model**
3.1 Pricing Tiers (USD)
3.2 Subscription Rules
3.3 NOWPayments Billing Flow
3.4 Subscription Database Schema
3.5 Usage Tracking

## **4. Firestore Data Model**
4.1 Users
4.2 Subscriptions
4.3 Projects
4.4 Content Plans
4.5 Scripts
4.6 Videos
4.7 Monetisation Profiles
4.8 Affiliate System
4.9 Analytics

## **5. Full Autonomous Pipeline**
5.1 Phase 1 — User Onboarding & Billing
5.2 Phase 2 — Project & YouTube Setup
5.3 Phase 3 — Niche Discovery & Content Strategy
5.4 Phase 4 — Script Generation
5.5 Phase 5 — Voiceover Generation
5.6 Phase 6 — Video Generation & Editing
5.7 Phase 7 — YouTube Upload & Optimisation
5.8 Phase 8 — Monetisation Flows
5.9 Phase 9 — Promotion & Channel Growth
5.10 Phase 10 — Analytics & Optimisation Loop

## **6. Monetisation System**
6.1 Affiliate Link Injection
6.2 Digital Product Generation
6.3 Email List Growth
6.4 Lead Magnets
6.5 Monetisation Tracking

## **7. Promotion & Growth Automation**
7.1 SEO Automation
7.2 Thumbnail A/B Testing
7.3 Title A/B Testing
7.4 Comment Automation
7.5 Community Posts
7.6 Shorts Repurposing

## **8. GenKit Workflow Architecture**
8.1 Workflow Overview
8.2 Function Naming Conventions
8.3 Input/Output Contracts
8.4 Error Handling & Retries
8.5 Logging & Observability

## **9. GenKit Workflow Definitions (Developer‑Ready)**
9.1 `generateContentStrategy()`
9.2 `generateVideoScript()`
9.3 `generateVoiceover()`
9.4 `generateVideoAssets()`
9.5 `assembleFinalVideo()`
9.6 `uploadToYouTube()`
9.7 `generateMonetisationPlan()`
9.8 `runGrowthAnalytics()`

## **10. Security & Compliance**
10.1 Authentication
10.2 Payment Security
10.3 API Key Management
10.4 Data Retention

## **11. Deployment & DevOps**
11.1 Firebase Hosting
11.2 Cloud Functions Deployment
11.3 Environment Configuration
11.4 CI/CD Pipeline

## **12. Future Enhancements**
12.1 Multi‑Language Support
12.2 Multi‑Platform Publishing
12.3 AI‑Generated Courses & Products
12.4 Creator Marketplace

---

## 1. System overview

**Goal:**
A fully autonomous AI‑YouTube Studio that:

- Finds niches
- Plans content
- Writes scripts
- Generates voice & video
- Edits and uploads to YouTube
- Optimises for growth
- Monetises via multiple channels
- Bills users in USD via NOWPayments (crypto + fiat)

**Core components:**

- **Frontend:** Web app (React/Next.js/Vue) on Firebase Hosting
- **Auth:** Firebase Auth
- **Backend:** Firebase Cloud Functions with GenKit
- **AI Engine:** Gemini 1.5 Pro / Flash via GenKit
- **Database:** Firestore
- **Storage:** Firebase Cloud Storage
- **Payments:** NOWPayments (crypto + native currency, priced in USD)
- **Media APIs:** ElevenLabs / Play.ht / OpenAI TTS, Pika / Runway / D‑ID / HeyGen / CapCut / Veed / Kapwing
- **Video Platform:** YouTube Data API v3

---

## 2. Pricing & subscription model

### 2.1 Pricing tiers (all in USD)

**Free**

- **Price:** $0/month
- **Limits:**
  - 1 video/month
  - Basic script generation
  - Watermarked video
  - No monetisation tools

**Starter**

- **Price:** $19/month
- **Limits:**
  - 10 videos/month
  - Full script + SEO metadata
  - Basic TTS voice
  - Template‑based video
  - Basic analytics

**Pro**

- **Price:** $49/month
- **Limits:**
  - 30 videos/month
  - Premium voice options
  - AI video generation (Pika/Runway)
  - Thumbnail generation
  - Monetisation tools (affiliate, products, email)
  - Growth analytics

**Agency**

- **Price:** $149/month
- **Limits:**
  - 100 videos/month
  - Multiple YouTube channels
  - Team members
  - Full automation
  - A/B testing (titles, thumbnails)
  - Advanced analytics & reporting

---

### 2.2 Subscription database (Firestore)

**Collection: `subscriptions`**

Each document (keyed by `userId` or random ID with `userId` field):

```json
{
  "userId": "string",
  "plan": "free" | "starter" | "pro" | "agency",
  "status": "active" | "canceled" | "past_due" | "trial",
  "renewsAt": "timestamp",
  "paymentProvider": "nowpayments",
  "paymentId": "string",          // NOWPayments payment/subscription ID
  "videoCredits": 30,             // remaining videos this period
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Collection: `usage`**

```json
{
  "userId": "string",
  "month": "2026-01",
  "videosGenerated": 12,
  "charactersUsed": 123456,
  "storageUsedMB": 512,
  "lastUpdatedAt": "timestamp"
}
```

---

### 2.3 NOWPayments integration (crypto + fiat, USD‑based)

**Key points:**

- All plans priced in **USD** in your app.
- NOWPayments handles:
  - Crypto payments (BTC, ETH, USDT, etc.)
  - Fiat payments (via supported methods)
- You treat NOWPayments as the **single billing provider**.

**Flow:**

1. User selects plan (Starter/Pro/Agency) in USD.
2. App calls NOWPayments API to create a payment or subscription:
   - Amount in USD
   - Currency options (crypto + fiat)
3. User is redirected to NOWPayments payment page or sees embedded widget.
4. User pays in chosen currency.
5. NOWPayments sends webhook to your Cloud Function:
   - Payment status: `finished`, `failed`, `expired`
   - Payment ID, amount, user reference
6. Cloud Function updates Firestore:
   - Creates/updates `subscriptions` document
   - Sets `status = "active"` and `renewsAt`
   - Allocates `videoCredits` based on plan
7. On renewal, NOWPayments sends another webhook → update subscription.

**Webhooks to handle:**

- `payment.finished` → activate/renew subscription
- `payment.failed` → mark as `past_due`
- `payment.expired` → no activation

---

## 3. Data model (Firestore)

### 3.1 `users`

**Collection:** `users`
**Document ID:** `userId` (same as Firebase Auth UID)

```json
{
  "displayName": "string",
  "email": "string",
  "photoURL": "string | null",
  "role": "user | admin",
  "defaultProjectId": "string | null",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

### 3.2 `subscriptions`

**Collection:** `subscriptions`
**Document ID:** auto ID (with `userId` indexed)

```json
{
  "userId": "string",
  "plan": "free | starter | pro | agency",
  "status": "active | canceled | past_due" | "trial",
  "paymentProvider": "nowpayments",
  "paymentId": "string",          // NOWPayments payment/subscription ID
  "currency": "USD",
  "amountUSD": 49,
  "videoCredits": 30,
  "renewsAt": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
**Indexes:** `userId`, `userId + status`

---

### 3.3 `usage`

**Collection:** `usage`
**Document ID:** `${userId}_${month}` (e.g. `abc123_2026-01`)

```json
{
  "userId": "string",
  "month": "string",              // "YYYY-MM"
  "videosGenerated": 0,
  "charactersUsed": 0,
  "storageUsedMB": 0,
  "lastUpdatedAt": "timestamp"
}
```

---

### 3.4 `projects`

**Collection:** `projects`
**Document ID:** auto ID

```json
{
  "userId": "string",
  "name": "string",
  "niche": "string",
  "language": "string",           // "en", "es", etc.
  "tone": "string",               // "educational", "entertaining", etc.
  "targetAudience": "string",
  "postingFrequency": "string",   // "1_per_week", "3_per_week"
  "connectedYouTubeChannelId": "string | null",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
**Indexes:** `userId`

---

### 3.5 `contentPlans`

**Collection:** `contentPlans`
**Document ID:** auto ID

```json
{
  "projectId": "string",
  "createdAt": "timestamp",
  "status": "active | archived",
  "items": [
    {
      "id": "string",
      "title": "string",
      "targetKeywords": ["string"],
      "estimatedDifficulty": "low | medium | high",
      "format": "long_form | shorts",
      "scheduledDate": "timestamp | null",
      "status": "planned | in_progress" | "published"
    }
  ]
}
```
**Indexes:** `projectId + status`

---

### 3.6 `videos`

**Collection:** `videos`
**Document ID:** auto ID

```json
{
  "projectId": "string",
  "planItemId": "string | null",
  "title": "string",
  "status": "draft | rendering | ready | uploaded | failed",
  "scriptId": "string | null",
  "voiceoverPath": "string | null",   // gs://...
  "videoPath": "string | null",       // gs://...
  "thumbnailPath": "string | null",   // gs://...
  "youtubeVideoId": "string | null",
  "publishedAt": "timestamp | null",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
**Indexes:** `projectId + status`

---

### 3.7 `scripts`

**Collection:** `scripts`
**Document ID:** auto ID

```json
{
  "projectId": "string",
  "videoId": "string",
  "scriptText": "string",
  "sceneBreakdown": [
    {
      "timestamp": "string",          // "00:00"
      "description": "string",
      "voiceText": "string"
    }
  ],
  "seoMetadata": {
    "title": "string",
    "description": "string",
    "tags": ["string"],
    "chapters": [
      {
        "timestamp": "string",
        "title": "string"
      }
    ],
    "hashtags": ["string"]
  },
  "thumbnailConcepts": [
    {
      "headline": "string",
      "visualDescription": "string",
      "emotion": "string",
      "colors": "string"
    }
  ],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
**Indexes:** `videoId`

---

### 3.8 `monetisationProfiles`

**Collection:** `monetisationProfiles`
**Document ID:** `projectId`

```json
{
  "projectId": "string",
  "affiliatePrograms": [
    {
      "name": "string",
      "baseUrl": "string",
      "trackingId": "string"
    }
  ],
  "digitalProducts": [
    {
      "id": "string",
      "type": "ebook | course | template",
      "title": "string",
      "priceUSD": 29,
      "salesPageUrl": "string"
    }
  ],
  "emailProvider": "convertkit | mailerlite | custom | none",
  "emailListId": "string | null",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

### 3.9 `affiliates`

**Collection:** `affiliates`
**Document ID:** `userId`

```json
{
  "userId": "string",
  "code": "string",
  "clicks": 0,
  "conversions": 0,
  "earningsUSD": 0,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

### 3.10 `analyticsVideo`

**Collection:** `analyticsVideo`
**Document ID:** `${videoId}_${date}` (e.g. `abc123_2026-01-22`)

```json
{
  "videoId": "string",
  "projectId": "string",
  "date": "string",               // "YYYY-MM-DD"
  "views": 0,
  "impressions": 0,
  "clickThroughRate": 0.0,
  "averageViewDurationSec": 0,
  "watchTimeHours": 0.0,
  "likes": 0,
  "comments": 0,
  "subsGained": 0,
  "createdAt": "timestamp"
}
```

---

### 3.11 `analyticsChannel`

**Collection:** `analyticsChannel`
**Document ID:** `${projectId}_${date}`

```json
{
  "projectId": "string",
  "date": "string",
  "views": 0,
  "subsGained": 0,
  "subsTotal": 0,
  "watchTimeHours": 0.0,
  "estimatedRevenueUSD": 0.0,
  "createdAt": "timestamp"
}
```

---

## 4. Full pipeline (Phases & Steps)

### PHASE 1 — User Onboarding & Billing
1. **User signs up** (Firebase Auth, create `users` document)
2. **User selects plan** (Frontend shows USD prices)
3. **Create NOWPayments payment** (Cloud Function `createSubscriptionPayment`)
4. **User completes payment** (Redirect to NOWPayments)
5. **NOWPayments webhook** (Cloud Function `handlePaymentWebhook` updates `subscriptions`)
6. **Frontend checks subscription** (Unlocks features)

### PHASE 2 — Project & YouTube Channel Setup
1. **Create project** (User defines niche, tone, etc. -> `projects` document)
2. **Connect YouTube channel** (OAuth2 flow)
3. **Connect monetisation profile** (Optional: affiliate, products, email)

### PHASE 3 — Niche Discovery & Content Strategy (GenKit + Gemini)
1. **Trigger:** User action or schedule
2. **Node: Fetch channel data** (YouTube Data API)
3. **Node: Gemini — Niche analysis**
4. **Node: Gemini — 30–90 day content plan**
5. **Node: Store content plan** (`contentPlans` collection)
6. **Node: Update UI**

### PHASE 4 — Video Concept & Script Generation
1. **Trigger:** User or automation selects video
2. **Node: Gemini — Detailed video concept**
3. **Node: Gemini — Full script**
4. **Node: Gemini — SEO metadata**
5. **Node: Gemini — Thumbnail concepts**
6. **Node: Store script & metadata** (`scripts` and `videos` collections)

### PHASE 5 — Voiceover Generation
1. **Node: Prepare voiceover text**
2. **Node: Generate voiceover** (ElevenLabs / Play.ht / OpenAI TTS API)
3. **Node: Store voiceover metadata** (Update `videos.voiceoverPath`)

### PHASE 6 — Video Generation & Editing
*   **Option A: AI‑generated visuals** (Pika / Runway / D‑ID)
*   **Option B: Template‑based editing** (CapCut / Veed / Kapwing)

### PHASE 7 — YouTube Upload & Optimisation
1. **Node: Gemini — Final metadata refinement**
2. **Node: Thumbnail generation** (Image model or Canva API)
3. **Node: Upload video to YouTube** (YouTube Data API)
4. **Node: Add chapters**
5. **Node: Store publication record** (Update `videos` collection)

### PHASE 8 — Monetisation Flows
1. **Node: Gemini — Monetisation strategy per video**
2. **Node: Affiliate link injection**
3. **Node: Digital product integration**
4. **Node: Email list growth**
5. **Node: Track monetisation performance**

### PHASE 9 — Promotion & YouTube Channel Growth
1. **Node: YouTube SEO automation** (Titles, descriptions, tags, etc.)
2. **Node: Thumbnail A/B testing**
3. **Node: Title A/B testing**
4. **Node: Comment engagement**
5. **Node: Community posts**
6. **Node: Shorts repurposing**

### PHASE 10 — Analytics & Optimisation Loop
1. **Node: Fetch performance metrics** (YouTube Data API)
2. **Node: Store analytics** (Firestore or BigQuery)
3. **Node: Gemini — Performance analysis**
4. **Node: Gemini — Strategy update**
5. **Node: A/B test automation**

---

## 5. GenKit Workflow Definitions

### 5.1 `generateContentStrategy()`
- **Purpose:** Generate niche analysis + content plan.
- **Inputs:** `{ userId: string, projectId: string }`
- **Outputs:** `{ nicheOptions: [...], contentPlan: [...] }`
- **Steps:** Fetch data, call Gemini for analysis, call Gemini for plan, save to Firestore.

### 5.2 `generateVideoScript()`
- **Purpose:** Generate concept, script, SEO metadata, thumbnail ideas.
- **Inputs:** `{ projectId: string, planItemId: string }`
- **Outputs:** `{ scriptId: string, seoMetadata: {...}, thumbnailConcepts: [...] }`
- **Steps:** Fetch item, call Gemini for concept, script, SEO, and thumbnails, save all.

### 5.3 `generateVoiceover()`
- **Inputs:** `{ scriptId: string, voiceProfile: string }`
- **Outputs:** `{ audioPath: string, duration: number }`
- **Steps:** Fetch script, clean text, call TTS API, save audio, update video record.

### 5.4 `generateVideoAssets()`
- **Inputs:** `{ scriptId: string, style: string }`
- **Outputs:** `{ clipPaths: string[] }`
- **Steps:** Fetch script, call Gemini for scene prompts, call Pika/Runway for each scene, save clips.

### 5.5 `assembleFinalVideo()`
- **Inputs:** `{ videoId: string }`
- **Outputs:** `{ finalVideoPath: string }`
- **Steps:** Fetch clips & audio, call FFmpeg (Cloud Run), save final MP4, update Firestore.

### 5.6 `uploadToYouTube()`
- **Inputs:** `{ videoId: string }`
- **Outputs:** `{ youtubeVideoId: string }`
- **Steps:** Fetch video & metadata, call Gemini for final optimisation, upload, add chapters, save record.

### 5.7 `generateMonetisationPlan()`
- **Inputs:** `{ videoId: string }`
- **Outputs:** `{ monetisationPlan: {...} }`
- **Steps:** Fetch script & profile, call Gemini for strategy, inject links, save to Firestore.

### 5.8 `runGrowthAnalytics()`
- **Inputs:** `{ projectId: string }` (or scheduled job)
- **Outputs:** `{ insights: [...], updatedPlan: [...] }`
- **Steps:** Fetch analytics, store, call Gemini for analysis, call Gemini for strategy update, save plan.

---

## 6. Config-Driven Integration Modules

- **Goal:** Use a `integrationConfigs` collection in Firestore to manage API providers and keys, allowing for dynamic switching without redeploying code.
- **`integrationConfigs/global`:** Default settings for all projects.
- **`integrationConfigs/{projectId}`:** Optional overrides for specific projects.

### Example `integrationConfigs/global` document:
```json
{
  "tts": {
    "provider": "elevenlabs",
    "apiKey": "SECRET_MANAGER_REF_TO_ELEVENLABS_KEY",
    "defaultVoiceId": "EXAMPLE_VOICE_ID"
  },
  "video": {
    "provider": "pika",
    "apiKey": "SECRET_MANAGER_REF_TO_PIKA_KEY",
    "defaultStyle": "cinematic"
  },
  "youtube": {
    "authMode": "oauth_user",
    "clientId": "SECRET_MANAGER_REF_TO_YT_CLIENT_ID",
    "clientSecret": "SECRET_MANAGER_REF_TO_YT_SECRET",
    "redirectUri": "https://yourapp.com/oauth2/callback"
  }
}
```

### Security Rules for `integrationConfigs`
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.role == 'admin';
    }

    match /integrationConfigs/{configId} {
      // Disallow all client-side access.
      // Backend functions will use Admin SDK which bypasses these rules.
      allow read, write: if false;
    }
  }
}
```

---

## 7. Full Gemini Prompt Library

_(This section contains the detailed prompts for each GenKit workflow step, which will be implemented in the backend code.)_

*(...Prompts as provided by the user...)*
