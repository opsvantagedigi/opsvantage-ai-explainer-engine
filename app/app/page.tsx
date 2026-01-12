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

export default function AIExplainerPage() {
  const [input, setInput] = useState("")
  const [niche, setNiche] = useState("general")
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState<OutputData | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateExplainer = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/ai-explainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, niche }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || "Failed to generate explainer")
      }

      const data = (await res.json()) as OutputData
      setOutput(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message ?? "Something went wrong while generating the explainer.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/ai-explainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, niche }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = (await res.json()) as OutputData
      setOutput(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <main className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="mb-2 text-lg font-semibold">AI Explainer Engine</h2>
              <p className="text-sm text-slate-400">Describe a system or workflow to get a concise explainer.</p>

              <div className="mt-4">
                <label className="block text-sm font-medium">Niche</label>
                <input value={niche} onChange={e => setNiche(e.target.value)} className="mt-1 w-full rounded border px-3 py-2 bg-slate-900" />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium">Prompt</label>
                <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Explain the deployment pipeline for our service..." />
              </div>

              <div className="mt-4 flex gap-2">
                <Button onClick={handleGenerateExplainer} disabled={loading}>
                  {loading ? 'Generating...' : 'Generate Explainer'}
                </Button>
                <Button variant="ghost" onClick={() => { setInput(''); setOutput(null); }}>
                  Clear
                </Button>
              </div>

              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            </Card>
          </section>

          <section className="lg:col-span-2">
            <motion.section initial="hidden" animate="visible" variants={containerVariants}>
              {output ? (
                <motion.div className="space-y-4" variants={itemVariants}>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold">{output.title}</h3>
                    <div className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{output.script}</div>

                    <div className="mt-4">
                      <strong>Key points</strong>
                      <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
                        {output.keyPoints.map((kp, idx) => <li key={idx}>{kp}</li>)}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <strong>Hashtags</strong>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {output.hashtags.map((tag, idx) => (
                          <motion.span key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">{tag}</motion.span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" size="lg" disabled={loading} onClick={handleRegenerate} className="w-full border-slate-700 bg-transparent text-slate-100">
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Regenerate with same intent
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div className="flex h-full items-center justify-center" variants={itemVariants}>
                  <Card className="max-w-md border-white/5 bg-slate-950/70 p-8 text-center">
                    <motion.div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#003B73] via-[#00A676] to-[#F2C14E]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}>
                      <Sparkles className="h-6 w-6 text-slate-950" />
                    </motion.div>
                    <h3 className="text-base font-semibold text-slate-50">Ready to explain your next system?</h3>
                    <p className="mt-2 text-sm text-slate-400">Describe a workflow, doctrine, or product behavior in the left panel. The AI Explainer Engine will return a clean script, key points, and hashtags you can ship directly to your channels.</p>
                  </Card>
                </motion.div>
              )}
            </motion.section>
          </section>
        </div>

        <motion.footer className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-slate-500" variants={itemVariants}>
          AI Explainer Engine · Crafted for founders, educators, and operators who build systems that outlive them.
        </motion.footer>
      </main>
    </div>
  )
}
