"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const mockEntries = [
  {
    id: 1,
    timestamp: new Date("2024-01-15T09:30:00"),
    mood: "😊",
    text: "Started the day with a great coffee and some journaling. Feeling optimistic about the week ahead.",
    tags: ["coffee", "morning", "optimistic"],
    moodLevel: 5,
  },
  {
    id: 2,
    timestamp: new Date("2024-01-15T14:15:00"),
    mood: "😐",
    text: "Lunch meeting went okay, but feeling a bit drained. Need to recharge this afternoon.",
    tags: ["work", "meeting"],
    moodLevel: 3,
  },
  {
    id: 3,
    timestamp: new Date("2024-01-15T19:45:00"),
    mood: "😄",
    text: "Had dinner with friends and laughed so much. These are the moments that matter most.",
    tags: ["social", "joy", "friends"],
    moodLevel: 6,
  },
  {
    id: 4,
    timestamp: new Date("2024-01-14T08:00:00"),
    mood: "🙂",
    text: "Morning walk in the park. The fresh air and quiet time helped clear my mind.",
    tags: ["nature", "exercise", "peace"],
    moodLevel: 4,
  },
  {
    id: 5,
    timestamp: new Date("2024-01-14T16:30:00"),
    mood: "😕",
    text: "Challenging day at work. Lots of deadlines and pressure, but I'm managing.",
    tags: ["work", "stress", "challenge"],
    moodLevel: 2,
  },
  {
    id: 6,
    timestamp: new Date("2024-01-13T21:00:00"),
    mood: "🥰",
    text: "Cozy evening reading a good book. Sometimes the simple pleasures are the best.",
    tags: ["rest", "reading", "cozy"],
    moodLevel: 6,
  },
]

const tagColors: Record<string, string> = {
  coffee: "bg-amber-100 text-amber-700",
  work: "bg-blue-100 text-blue-700",
  social: "bg-purple-100 text-purple-700",
  joy: "bg-pink-100 text-pink-700",
  rest: "bg-green-100 text-green-700",
  nature: "bg-emerald-100 text-emerald-700",
  exercise: "bg-orange-100 text-orange-700",
  peace: "bg-teal-100 text-teal-700",
  stress: "bg-red-100 text-red-700",
  challenge: "bg-yellow-100 text-yellow-700",
  reading: "bg-indigo-100 text-indigo-700",
  cozy: "bg-rose-100 text-rose-700",
  morning: "bg-sky-100 text-sky-700",
  optimistic: "bg-lime-100 text-lime-700",
  meeting: "bg-gray-100 text-gray-700",
  friends: "bg-violet-100 text-violet-700",
}

export default function Timeline() {
  const [searchTerm, setSearchTerm] = useState("")
  const [entries] = useState(mockEntries)

  const filteredEntries = entries.filter(
    (entry) =>
      entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  // Group entries by date
  const groupedEntries = filteredEntries.reduce(
    (groups, entry) => {
      const dateKey = entry.timestamp.toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(entry)
      return groups
    },
    {} as Record<string, typeof entries>,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-slate-800 mb-2">Your Moments</h1>
          <p className="text-slate-600 text-sm">Reflecting on your journey</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search moments or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {Object.entries(groupedEntries).map(([dateKey, dayEntries]) => (
            <div key={dateKey}>
              {/* Date Header */}
              <div className="flex items-center mb-4">
                <div className="flex-1 h-px bg-slate-200"></div>
                <div className="px-4 text-sm font-medium text-slate-600">{formatDate(new Date(dateKey))}</div>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Entries for this date */}
              <div className="space-y-4">
                {dayEntries.map((entry) => (
                  <Card
                    key={entry.id}
                    className="border-0 shadow-sm shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        {/* Mood */}
                        <div className="text-2xl">{entry.mood}</div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-500 font-medium">{formatTime(entry.timestamp)}</span>
                          </div>

                          <p className="text-slate-700 text-sm leading-relaxed mb-3">{entry.text}</p>

                          {/* Tags */}
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {entry.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className={cn("text-xs px-2 py-0.5", tagColors[tag] || "bg-slate-100 text-slate-600")}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-slate-600">No moments found</p>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
