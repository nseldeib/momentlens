"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Clock, CheckCircle } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

const mockExperiment = {
  title: "Morning vs Evening Mood",
  prompts: ["How do you feel right now? (1-10)", "What's your energy level?", "What influenced your mood today?"],
}

export default function ExperimentEntry() {
  const router = useRouter()
  const params = useParams()
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [responses, setResponses] = useState<string[]>(["", "", ""])
  const [moodRating, setMoodRating] = useState([5])
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "evening" | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  const handleBack = () => {
    router.push(`/experiments/${params.id}`)
  }

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses]
    newResponses[currentPrompt] = value
    setResponses(newResponses)
  }

  const handleNext = () => {
    if (currentPrompt < mockExperiment.prompts.length - 1) {
      setCurrentPrompt(currentPrompt + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPrompt > 0) {
      setCurrentPrompt(currentPrompt - 1)
    }
  }

  const handleSave = () => {
    // In a real app, this would save the entry
    console.log("Saving entry:", {
      experimentId: params.id,
      timeOfDay,
      moodRating: moodRating[0],
      responses,
      timestamp: new Date(),
    })

    setIsSaved(true)
    setTimeout(() => {
      router.push(`/experiments/${params.id}`)
    }, 2000)
  }

  const canProceed = responses[currentPrompt]?.trim().length > 0
  const canSave = responses.every((r) => r.trim().length > 0) && timeOfDay

  const moodEmojis = ["😔", "😕", "😐", "🙂", "😊", "😄", "🥰"]
  const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Great", "Excellent", "Blissful"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-3">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-medium text-slate-800">New Entry</h1>
            <p className="text-sm text-slate-600">{mockExperiment.title}</p>
          </div>
        </div>

        {/* Time of Day Selection */}
        {!timeOfDay && (
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                When are you journaling?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
                onClick={() => setTimeOfDay("morning")}
              >
                <div className="text-left">
                  <div className="font-medium text-slate-800">🌅 Morning</div>
                  <div className="text-sm text-slate-600">Start of the day</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
                onClick={() => setTimeOfDay("evening")}
              >
                <div className="text-left">
                  <div className="font-medium text-slate-800">🌙 Evening</div>
                  <div className="text-sm text-slate-600">End of the day</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        {timeOfDay && (
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {mockExperiment.prompts.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index <= currentPrompt ? "bg-indigo-400" : "bg-slate-200",
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Time of Day Badge */}
        {timeOfDay && (
          <div className="flex justify-center mb-6">
            <Badge
              variant="outline"
              className={cn(
                "capitalize px-3 py-1",
                timeOfDay === "morning"
                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                  : "bg-purple-100 text-purple-700 border-purple-200",
              )}
            >
              {timeOfDay === "morning" ? "🌅" : "🌙"} {timeOfDay}
            </Badge>
          </div>
        )}

        {/* Main Content */}
        {timeOfDay && (
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg font-medium text-slate-700">
                {mockExperiment.prompts[currentPrompt]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Slider for first prompt */}
              {currentPrompt === 0 && mockExperiment.prompts[0].includes("1-10") && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{moodEmojis[moodRating[0]]}</div>
                    <p className="text-sm text-slate-600">{moodLabels[moodRating[0]]}</p>
                  </div>
                  <Slider
                    value={moodRating}
                    onValueChange={(value) => {
                      setMoodRating(value)
                      handleResponseChange(value[0].toString())
                    }}
                    max={6}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}

              {/* Text Response */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={responses[currentPrompt]}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  className="min-h-[120px] border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 resize-none"
                  maxLength={280}
                />
                <div className="text-right text-xs text-slate-500">{responses[currentPrompt]?.length || 0}/280</div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                {currentPrompt > 0 && (
                  <Button variant="ghost" onClick={handlePrevious} className="text-slate-600">
                    Previous
                  </Button>
                )}

                <div className="ml-auto">
                  {currentPrompt < mockExperiment.prompts.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSave}
                      disabled={!canSave || isSaved}
                      className={cn(
                        "transition-all duration-300",
                        isSaved
                          ? "bg-green-500 hover:bg-green-500 text-white"
                          : "bg-indigo-500 hover:bg-indigo-600 text-white",
                      )}
                    >
                      {isSaved ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Saved!
                        </>
                      ) : (
                        "Save Entry"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timestamp */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            {new Date().toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
