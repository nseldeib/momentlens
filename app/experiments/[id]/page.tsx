"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowLeft, Calendar, Target, TrendingUp, MessageSquare, Plus, CheckCircle } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

// Mock data for experiment details
const mockExperiment = {
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
  prompts: ["How do you feel right now? (1-10)", "What's your energy level?", "What influenced your mood today?"],
  tags: ["mood", "energy", "daily-patterns"],
}

const mockEntries = [
  {
    id: 1,
    date: new Date("2024-01-10"),
    timeOfDay: "morning",
    responses: {
      "How do you feel right now? (1-10)": "7",
      "What's your energy level?": "High - had a good night's sleep",
      "What influenced your mood today?": "Looking forward to the day ahead",
    },
    mood: 7,
  },
  {
    id: 2,
    date: new Date("2024-01-10"),
    timeOfDay: "evening",
    responses: {
      "How do you feel right now? (1-10)": "5",
      "What's your energy level?": "Medium - feeling tired",
      "What influenced your mood today?": "Long work day, but accomplished goals",
    },
    mood: 5,
  },
  {
    id: 3,
    date: new Date("2024-01-11"),
    timeOfDay: "morning",
    responses: {
      "How do you feel right now? (1-10)": "6",
      "What's your energy level?": "Medium - woke up a bit groggy",
      "What influenced your mood today?": "Rainy weather affecting my mood",
    },
    mood: 6,
  },
  {
    id: 4,
    date: new Date("2024-01-11"),
    timeOfDay: "evening",
    responses: {
      "How do you feel right now? (1-10)": "8",
      "What's your energy level?": "Good - had a productive day",
      "What influenced your mood today?": "Completed an important project",
    },
    mood: 8,
  },
]

const chartData = [
  { day: "Day 1", morning: 7, evening: 5 },
  { day: "Day 2", morning: 6, evening: 8 },
  { day: "Day 3", morning: 8, evening: 6 },
  { day: "Day 4", morning: 7, evening: 7 },
]

export default function ExperimentDetail() {
  const router = useRouter()
  const params = useParams()
  const [experiment] = useState(mockExperiment)
  const [entries] = useState(mockEntries)

  const handleBack = () => {
    router.push("/experiments")
  }

  const handleAddEntry = () => {
    router.push(`/experiments/${params.id}/entry`)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }

  const progressPercentage = (experiment.currentEntries / experiment.totalEntries) * 100

  const getInsights = () => {
    const morningMoods = entries.filter((e) => e.timeOfDay === "morning").map((e) => e.mood)
    const eveningMoods = entries.filter((e) => e.timeOfDay === "evening").map((e) => e.mood)

    const avgMorning = morningMoods.reduce((a, b) => a + b, 0) / morningMoods.length
    const avgEvening = eveningMoods.reduce((a, b) => a + b, 0) / eveningMoods.length

    return {
      avgMorning: avgMorning.toFixed(1),
      avgEvening: avgEvening.toFixed(1),
      trend: avgEvening > avgMorning ? "improving" : avgEvening < avgMorning ? "declining" : "stable",
    }
  }

  const insights = getInsights()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-3">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-medium text-slate-800">{experiment.title}</h1>
            <p className="text-sm text-slate-600">{experiment.description}</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 capitalize">
                <CheckCircle className="w-3 h-3 mr-1" />
                {experiment.status}
              </Badge>
              <span className="text-sm text-slate-600">
                Day {experiment.progress} of {experiment.duration}
              </span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm text-slate-600">
                  {experiment.currentEntries}/{experiment.totalEntries} entries
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="flex items-center text-sm text-slate-600">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(experiment.startDate)} - {formatDate(experiment.endDate)}
            </div>
          </CardContent>
        </Card>

        {/* Add Entry Button */}
        <Button onClick={handleAddEntry} className="w-full mb-6 bg-indigo-500 hover:bg-indigo-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="entries">Entries</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-indigo-500" />
                  Intention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 italic">"{experiment.intention}"</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />
                  Daily Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {experiment.prompts.map((prompt, index) => (
                    <li key={index} className="text-slate-600 flex items-start">
                      <span className="text-indigo-500 mr-2">{index + 1}.</span>
                      {prompt}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Entries Tab */}
          <TabsContent value="entries" className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium text-slate-800">{formatDate(entry.date)}</CardTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        entry.timeOfDay === "morning"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-purple-100 text-purple-700 border-purple-200",
                      )}
                    >
                      {entry.timeOfDay}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {Object.entries(entry.responses).map(([question, answer]) => (
                      <div key={question}>
                        <p className="text-sm font-medium text-slate-700 mb-1">{question}</p>
                        <p className="text-sm text-slate-600">{answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
                  Mood Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    morning: {
                      label: "Morning",
                      color: "#f59e0b",
                    },
                    evening: {
                      label: "Evening",
                      color: "#8b5cf6",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis
                        domain={[0, 10]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="morning"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="evening"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-700">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">{insights.avgMorning}</div>
                    <div className="text-sm text-yellow-600">Avg Morning</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{insights.avgEvening}</div>
                    <div className="text-sm text-purple-600">Avg Evening</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Pattern:</span> Your mood tends to be{" "}
                    {insights.trend === "improving" ? "higher" : insights.trend === "declining" ? "lower" : "similar"}{" "}
                    in the evening compared to morning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
