"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, Target, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

// Mock data for experiments
const mockExperiments = [
  {
    id: 1,
    title: "Morning vs Evening Mood",
    description: "Track how my mood changes from morning to evening",
    intention: "Understand my daily mood patterns to optimize my schedule",
    duration: 7,
    startDate: new Date("2024-01-10"),
    endDate: new Date("2024-01-17"),
    status: "active",
    progress: 4,
    totalEntries: 14,
    currentEntries: 8,
    prompts: ["How do you feel right now?", "What's your energy level?", "What influenced your mood today?"],
    tags: ["mood", "energy", "daily-patterns"],
  },
  {
    id: 2,
    title: "Gratitude Practice",
    description: "Daily gratitude journaling for better mindset",
    intention: "Develop a more positive outlook through consistent gratitude practice",
    duration: 14,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    status: "completed",
    progress: 14,
    totalEntries: 14,
    currentEntries: 14,
    prompts: [
      "What are you grateful for today?",
      "Who made a positive impact on your day?",
      "What small moment brought you joy?",
    ],
    tags: ["gratitude", "positivity", "mindfulness"],
  },
  {
    id: 3,
    title: "Work Stress Tracking",
    description: "Monitor stress levels before and after work",
    intention: "Identify work stress patterns and find better coping strategies",
    duration: 10,
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-01-30"),
    status: "upcoming",
    progress: 0,
    totalEntries: 20,
    currentEntries: 0,
    prompts: [
      "How stressed do you feel right now?",
      "What's causing your stress today?",
      "What would help you feel more calm?",
    ],
    tags: ["stress", "work", "coping"],
  },
]

const statusColors = {
  active: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
  upcoming: "bg-orange-100 text-orange-700 border-orange-200",
}

const statusIcons = {
  active: Clock,
  completed: CheckCircle,
  upcoming: Calendar,
}

export default function Experiments() {
  const router = useRouter()
  const [experiments] = useState(mockExperiments)

  const handleCreateExperiment = () => {
    router.push("/experiments/create")
  }

  const handleViewExperiment = (id: number) => {
    router.push(`/experiments/${id}`)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-slate-800 mb-2">Experiment Mode</h1>
          <p className="text-slate-600 text-sm">Run journaling experiments to discover insights</p>
        </div>

        {/* Create New Button */}
        <Button onClick={handleCreateExperiment} className="w-full mb-6 bg-indigo-500 hover:bg-indigo-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New Experiment
        </Button>

        {/* Experiments List */}
        <div className="space-y-4">
          {experiments.map((experiment) => {
            const StatusIcon = statusIcons[experiment.status]
            const progressPercentage = (experiment.currentEntries / experiment.totalEntries) * 100

            return (
              <Card
                key={experiment.id}
                className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleViewExperiment(experiment.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-medium text-slate-800 flex-1">{experiment.title}</CardTitle>
                    <Badge variant="outline" className={cn("ml-2 capitalize", statusColors[experiment.status])}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {experiment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{experiment.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Progress */}
                  {experiment.status === "active" && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Progress</span>
                        <span className="text-sm text-slate-600">
                          {experiment.currentEntries}/{experiment.totalEntries} entries
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  )}

                  {/* Duration & Dates */}
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {experiment.duration} days
                    </div>
                    <div>
                      {formatDate(experiment.startDate)} - {formatDate(experiment.endDate)}
                    </div>
                  </div>

                  {/* Status-specific info */}
                  {experiment.status === "active" && (
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-slate-600">{getDaysRemaining(experiment.endDate)} days remaining</span>
                      <span className="text-indigo-600 font-medium">{Math.round(progressPercentage)}% complete</span>
                    </div>
                  )}

                  {experiment.status === "completed" && (
                    <div className="flex items-center text-sm text-green-600 mb-3">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Ready to analyze results
                    </div>
                  )}

                  {experiment.status === "upcoming" && (
                    <div className="text-sm text-orange-600 mb-3">
                      Starts in {getDaysRemaining(new Date(experiment.startDate.getTime() - 24 * 60 * 60 * 1000))} days
                    </div>
                  )}

                  {/* Intention */}
                  <div className="mb-3">
                    <div className="flex items-center mb-1">
                      <Target className="w-3 h-3 mr-1 text-slate-500" />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Intention</span>
                    </div>
                    <p className="text-sm text-slate-600 italic">"{experiment.intention}"</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {experiment.tags.map((tag) => (
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

        {/* Empty State */}
        {experiments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🧪</div>
            <p className="text-slate-600 mb-2">No experiments yet</p>
            <p className="text-slate-500 text-sm">Create your first journaling experiment to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
