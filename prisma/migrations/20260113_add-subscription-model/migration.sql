-- Migration: add-subscription-model (create-only)
-- Generated manually for offline create-only migration
-- NOTE: Review before applying to any database. This migration creates the Subscription model and SubscriptionStatus enum.

-- Ensure pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

-- Create enum type for subscription status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscriptionstatus') THEN
    CREATE TYPE "SubscriptionStatus" AS ENUM ('pending','active','cancelled','failed');
  END IF;
END$$;

-- Create Subscription table
CREATE TABLE IF NOT EXISTS "Subscription" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "workspaceId" TEXT NULL,
  "planId" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerOrderId" TEXT NULL UNIQUE,
  "status" "SubscriptionStatus" NOT NULL DEFAULT 'pending',
  "amountCents" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "startedAt" TIMESTAMP WITH TIME ZONE NULL,
  "expiresAt" TIMESTAMP WITH TIME ZONE NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Foreign keys (assumes User and Workspace tables exist)
ALTER TABLE IF EXISTS "Subscription" ADD CONSTRAINT "Subscription_user_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE IF EXISTS "Subscription" ADD CONSTRAINT "Subscription_workspace_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL;

COMMIT;
