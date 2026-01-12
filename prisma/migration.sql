-- Migration SQL generated from Prisma schema

-- Create enums (idempotent)
DO $$
BEGIN
  BEGIN
    CREATE TYPE "UserRole" AS ENUM ('admin', 'member');
  EXCEPTION WHEN duplicate_object THEN
    -- type already exists, ignore
    NULL;
  END;
END$$;

DO $$
BEGIN
  BEGIN
    CREATE TYPE "WorkspaceRole" AS ENUM ('owner', 'editor', 'viewer');
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END$$;

DO $$
BEGIN
  BEGIN
    CREATE TYPE "Timeframe" AS ENUM ('weekly', 'monthly', 'custom');
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END$$;

DO $$
BEGIN
  BEGIN
    CREATE TYPE "ShortVideoStatus" AS ENUM ('idea', 'scripted', 'ready_to_upload', 'uploaded', 'failed');
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END$$;

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'member',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Workspace" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "ownerId" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "subscriptionPlanId" TEXT
);

CREATE TABLE IF NOT EXISTS "SubscriptionPlan" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "priceMonthly" INTEGER NOT NULL,
  "maxWorkspaces" INTEGER NOT NULL,
  "maxChannels" INTEGER NOT NULL,
  "maxVideosPerMonth" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "UserWorkspaceMembership" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "workspaceId" TEXT NOT NULL,
  "role" "WorkspaceRole" NOT NULL DEFAULT 'viewer'
);
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_workspace_unique') THEN
    ALTER TABLE "UserWorkspaceMembership" ADD CONSTRAINT user_workspace_unique UNIQUE ("userId", "workspaceId");
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS "YouTubeChannelConfig" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "workspaceId" TEXT NOT NULL,
  "channelName" TEXT NOT NULL,
  "channelId" TEXT,
  "youtubeAccessToken" TEXT NOT NULL,
  "youtubeRefreshToken" TEXT NOT NULL,
  "tokenExpiry" TIMESTAMP WITH TIME ZONE NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Niche" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "workspaceId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true
);
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'workspace_name_unique') THEN
    ALTER TABLE "Niche" ADD CONSTRAINT workspace_name_unique UNIQUE ("workspaceId", "name");
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS "ContentPlan" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "workspaceId" TEXT NOT NULL,
  "nicheId" TEXT NOT NULL,
  "timeframe" "Timeframe" NOT NULL,
  "startDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "endDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "ShortVideo" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "workspaceId" TEXT NOT NULL,
  "contentPlanId" TEXT NOT NULL,
  "nicheId" TEXT NOT NULL,
  "dayIndex" INTEGER NOT NULL,
  "hook" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "script" TEXT NOT NULL,
  "hashtags" TEXT NOT NULL,
  "status" "ShortVideoStatus" NOT NULL DEFAULT 'idea',
  "youtubeVideoId" TEXT,
  "youtubeUrl" TEXT,
  "scheduledAt" TIMESTAMP WITH TIME ZONE,
  "uploadedAt" TIMESTAMP WITH TIME ZONE
);

-- Foreign keys
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'workspace_owner_fkey') THEN
    ALTER TABLE "Workspace" ADD CONSTRAINT workspace_owner_fkey FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'workspace_subscription_fkey') THEN
    ALTER TABLE "Workspace" ADD CONSTRAINT workspace_subscription_fkey FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'membership_user_fkey') THEN
    ALTER TABLE "UserWorkspaceMembership" ADD CONSTRAINT membership_user_fkey FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'membership_workspace_fkey') THEN
    ALTER TABLE "UserWorkspaceMembership" ADD CONSTRAINT membership_workspace_fkey FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'yt_workspace_fkey') THEN
    ALTER TABLE "YouTubeChannelConfig" ADD CONSTRAINT yt_workspace_fkey FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'niche_workspace_fkey') THEN
    ALTER TABLE "Niche" ADD CONSTRAINT niche_workspace_fkey FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contentplan_workspace_fkey') THEN
    ALTER TABLE "ContentPlan" ADD CONSTRAINT contentplan_workspace_fkey FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contentplan_niche_fkey') THEN
    ALTER TABLE "ContentPlan" ADD CONSTRAINT contentplan_niche_fkey FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'short_workspace_fkey') THEN
    ALTER TABLE "ShortVideo" ADD CONSTRAINT short_workspace_fkey FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'short_contentplan_fkey') THEN
    ALTER TABLE "ShortVideo" ADD CONSTRAINT short_contentplan_fkey FOREIGN KEY ("contentPlanId") REFERENCES "ContentPlan"("id") ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'short_niche_fkey') THEN
    ALTER TABLE "ShortVideo" ADD CONSTRAINT short_niche_fkey FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE RESTRICT;
  END IF;
END$$;

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_email ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS idx_workspace_slug ON "Workspace"("slug");
