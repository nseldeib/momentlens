"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Briefcase, Heart, Brain, Coffee, Sunset, Star, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const promptPacks = [
  {
    id: "before-bed",
    title: "Before Bed",
    description: "Reflect on your day and prepare for rest",
    icon: Moon,
    color: "from-indigo-500 to-purple-600",
    questions: [
      "What was the highlight of your day?",
      "What are you grateful for today?",
      "How are you feeling as you wind down?",
    ],
    tags: ["reflection", "gratitude", "rest"],
  },
  {
    id: "after-work",
    title: "After Work",
    description: "Transition from work mode to personal time",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-600",
    questions: ["How did work feel today?", "What did you accomplish?", "How do you want to spend your evening?"],
    tags: ["work", "transition", "accomplishment"],
  },
  {
    id: "moments-of-joy",
    title: "Moments of Joy",
    description: "Capture and celebrate happy moments",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    questions: [
      "What made you smile today?",
      "Who or what brought you joy?",
      "How does this happiness feel in your body?",
    ],
    tags: ["joy", "happiness", "celebration"],
  },
  {
    id: "when-anxious",
    title: "When Anxious",
    description: "Ground yourself and process difficult feelings",
    icon: Brain,
    color: "from-teal-500 to-green-600",
    questions: [
      "What are you feeling right now?",
      "What thoughts are going through your mind?",
      "What would help you feel more grounded?",
    ],
    tags: ["anxiety", "grounding", "processing"],
  },
  {
    id: "morning-check-in",
    title: "Morning Check-in",
    description: "Start your day with intention",
    icon: Coffee,
    color: "from-amber-500 to-orange-600",
    questions: [
      "How are you feeling this morning?",
      "What are you looking forward to today?",
      "What intention do you want to set?",
    ],
    tags: ["morning", "intention", "energy"],
  },
  {
    id: "evening-reflection",
    title: "Evening Reflection",
    description: "Process the day with gentle awareness",
    icon: Sunset,
    color: "from-orange-500 to-red-600",
    questions: ["What emotions did you experience today?", "What challenged you?", "What are you proud of?"],
    tags: ["reflection", "emotions", "growth"],
  },
  {
    id: "creative-spark",
    title: "Creative Spark",
    description: "Capture inspiration and creative thoughts",
    icon: Sparkles,
    color: "from-violet-500 to-purple-600",
    questions: [
      "What inspired you recently?",
      "What creative ideas are flowing?",
      "How do you want to express yourself?",
    ],
    tags: ["creativity", "inspiration", "expression"],
  },
  {
    id: "mindful-moment",
    title: "Mindful Moment",
    description: "Practice presence and awareness",
    icon: Star,
    color: "from-emerald-500 to-teal-600",
    questions: [
      "What do you notice around you right now?",
      "How does your body feel?",
      "What are you present to in this moment?",
    ],
    tags: ["mindfulness", "presence", "awareness"],
  },
]

export default function PromptPacks() {
  const router = useRouter()

  const handlePackSelect = (pack: (typeof promptPacks)[0]) => {
    // In a real app, you'd store the selected pack and redirect to capture
    // For now, we'll just go back to the main capture page
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-slate-800 mb-2">Prompt Packs</h1>
          <p className="text-slate-600 text-sm">Guided journaling for different moments</p>
        </div>

        {/* Prompt Packs Grid */}
        <div className="space-y-4">
          {promptPacks.map((pack) => {
            const Icon = pack.icon
            return (
              <Card
                key={pack.id}
                className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handlePackSelect(pack)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${pack.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium text-slate-800 mb-1">{pack.title}</CardTitle>
                      <p className="text-sm text-slate-600 leading-relaxed">{pack.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Sample Questions */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Sample Questions</p>
                    <div className="space-y-1">
                      {pack.questions.slice(0, 2).map((question, index) => (
                        <p key={index} className="text-sm text-slate-600 italic">
                          "{question}"
                        </p>
                      ))}
                      {pack.questions.length > 2 && (
                        <p className="text-xs text-slate-500">+{pack.questions.length - 2} more questions</p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {pack.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}
