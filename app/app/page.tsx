"use client"

import { useState } from "react"
import { motion, easeOut } from "framer-motion"
import {
  Copy,
  Menu,
  Sparkles,
  RotateCcw,
  Zap,
  Settings,
  Play,
  Youtube,
  MessageSquare,
  ChevronRight,
} from "lucide-react"
import { Card } from "../../src/components/ui/card"
import { Button } from "../../src/components/ui/button"
import { Textarea } from "../../src/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../src/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "../../src/components/ui/sheet"

type OutputData = {
  title: string
  script: string
  keyPoints: string[]
  hashtags: string[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

const gradientVariants: any = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    transition: {
      duration: 16,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeOut,
    },
  },
}

type SidebarItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  description: string
}

const sidebarItems: SidebarItem[] = [
  {
    icon: MessageSquare,
    label: "Content Plans",
    description: "Design structured explainer series.",
  },
  {
    icon: Play,
    label: "Short Video Generator",
    description: "Turn explainers into Shorts.",
  },
  {
    icon: Youtube,
    label: "YouTube Integration",
    description: "Publish directly to your channels.",
  },
  {
    icon: Settings,
    label: "Workspace Settings",
    description: "Govern roles, niches, and engines.",
  },
]

import AIExplainerPage from "@/app/page"

export default function AppPage() {
  return <AIExplainerPage />
}
