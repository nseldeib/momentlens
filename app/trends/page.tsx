"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for trends
const moodData = {
  week: [
    { day: "Mon", mood: 4, date: "1/8" },
    { day: "Tue", mood: 3, date: "1/9" },
    { day: "Wed", mood: 5, date: "1/10" },
    { day: "Thu", mood: 4, date: "1/11" },
    { day: "Fri", mood: 6, date: "1/12" },
    { day: "Sat", mood: 5, date: "1/13" },
    { day: "Sun", mood: 4, date: "1/14" },
  ],
  month: [
    { day: "Week 1", mood: 4.2, date: "Jan 1-7" },
    { day: "Week 2", mood: 3.8, date: "Jan 8-14" },
    { day: "Week 3", mood: 4.5, date: "Jan 15-21" },
    { day: "Week 4", mood: 4.1, date: "Jan 22-28" },
  ],
  all: [
    { day: "Dec", mood: 3.9, date: "December" },
    { day: "Jan", mood: 4.2, date: "January" },
    { day: "Feb", mood: 4.0, date: "February" },
    { day: "Mar", mood: 4.4, date: "March" },
  ],
}

const tagData = [
  { name: "work", count: 12, color: "#3b82f6" },
  { name: "social", count: 8, color: "#8b5cf6" },
  { name: "rest", count: 10, color: "#10b981" },
  { name: "coffee", count: 6, color: "#f59e0b" },
  { name: "joy", count: 5, color: "#ec4899" },
  { name: "exercise", count: 4, color: "#f97316" },
]

const timeData = [
  { time: "6-9 AM", count: 3, mood: 4.2 },
  { time: "9-12 PM", count: 5, mood: 3.8 },
  { time: "12-3 PM", count: 4, mood: 4.0 },
  { time: "3-6 PM", count: 6, mood: 3.9 },
  { time: "6-9 PM", count: 8, mood: 4.5 },
  { time: "9-12 AM", count: 2, mood: 4.8 },
]

const moodEmojis = ["😔", "😕", "😐", "🙂", "😊", "😄", "🥰"]

export default function Trends() {
  const [activeTab, setActiveTab] = useState("week")

  const getMoodEmoji = (moodValue: number) => {
    return moodEmojis[Math.round(moodValue)] || "😐"
  }

  const averageMood =
    moodData[activeTab as keyof typeof moodData].reduce((sum, item) => sum + item.mood, 0) /
    moodData[activeTab as keyof typeof moodData].length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-slate-800 mb-2">Your Trends</h1>
          <p className="text-slate-600 text-sm">Insights from your moments</p>
        </div>

        {/* Time Period Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="week" className="text-sm">
              Week
            </TabsTrigger>
            <TabsTrigger value="month" className="text-sm">
              Month
            </TabsTrigger>
            <TabsTrigger value="all" className="text-sm">
              All Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6 mt-6">
            {/* Average Mood */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-medium text-slate-700">Average Mood</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl mb-2">{getMoodEmoji(averageMood)}</div>
                <p className="text-2xl font-light text-slate-700 mb-1">{averageMood.toFixed(1)}/6</p>
                <p className="text-sm text-slate-500">
                  {averageMood >= 5
                    ? "Great period!"
                    : averageMood >= 4
                      ? "Pretty good"
                      : averageMood >= 3
                        ? "Mixed feelings"
                        : "Challenging time"}
                </p>
              </CardContent>
            </Card>

            {/* Mood Over Time */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-700">Mood Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    mood: {
                      label: "Mood",
                      color: "#6366f1",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData[activeTab as keyof typeof moodData]}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis
                        domain={[0, 6]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        labelFormatter={(label, payload) => {
                          const data = payload?.[0]?.payload
                          return data ? `${label} (${data.date})` : label
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#6366f1", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Most Common Tags */}
        <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Most Common Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tagData.map((tag, index) => (
                <div key={tag.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-slate-600">#{index + 1}</div>
                    <Badge
                      variant="secondary"
                      className="px-3 py-1"
                      style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                    >
                      {tag.name}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600">{tag.count} times</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time of Day Breakdown */}
        <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-700">Time of Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Entries",
                  color: "#8b5cf6",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                  <ChartTooltip content={<ChartTooltipContent />} labelFormatter={(label) => `Time: ${label}`} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">
                Most active: <span className="font-medium">6-9 PM</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
