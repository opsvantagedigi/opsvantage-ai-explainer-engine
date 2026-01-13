-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'member', 'superuser');

-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('owner', 'editor', 'viewer');

-- CreateEnum
CREATE TYPE "Timeframe" AS ENUM ('weekly', 'monthly', 'custom');

-- CreateEnum
CREATE TYPE "ShortVideoStatus" AS ENUM ('idea', 'scripted', 'ready_to_upload', 'uploaded', 'failed');

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "startedAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "expiresAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'member',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "subscriptionPlanId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceMonthly" INTEGER NOT NULL,
    "maxWorkspaces" INTEGER NOT NULL,
    "maxChannels" INTEGER NOT NULL,
    "maxVideosPerMonth" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWorkspaceMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "role" "WorkspaceRole" NOT NULL DEFAULT 'viewer',

    CONSTRAINT "UserWorkspaceMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeChannelConfig" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "channelId" TEXT,
    "youtubeAccessToken" TEXT NOT NULL,
    "youtubeRefreshToken" TEXT NOT NULL,
    "tokenExpiry" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeChannelConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Niche" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Niche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentPlan" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "nicheId" TEXT NOT NULL,
    "timeframe" "Timeframe" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortVideo" (
    "id" TEXT NOT NULL,
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
    "scheduledAt" TIMESTAMP(3),
    "uploadedAt" TIMESTAMP(3),

    CONSTRAINT "ShortVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserWorkspaceMembership_userId_workspaceId_key" ON "UserWorkspaceMembership"("userId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Niche_workspaceId_name_key" ON "Niche"("workspaceId", "name");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkspaceMembership" ADD CONSTRAINT "UserWorkspaceMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkspaceMembership" ADD CONSTRAINT "UserWorkspaceMembership_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeChannelConfig" ADD CONSTRAINT "YouTubeChannelConfig_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentPlan" ADD CONSTRAINT "ContentPlan_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentPlan" ADD CONSTRAINT "ContentPlan_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortVideo" ADD CONSTRAINT "ShortVideo_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortVideo" ADD CONSTRAINT "ShortVideo_contentPlanId_fkey" FOREIGN KEY ("contentPlanId") REFERENCES "ContentPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortVideo" ADD CONSTRAINT "ShortVideo_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
