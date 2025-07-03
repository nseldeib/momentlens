"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Heart, Coffee, Briefcase, Users, Home, Sparkles, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const moodEmojis = ["😔", "😕", "😐", "🙂", "😊", "😄", "🥰"]
const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Great", "Excellent", "Blissful"]

const tagOptions = [
  { name: "work", icon: Briefcase, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { name: "rest", icon: Home, color: "bg-green-100 text-green-700 hover:bg-green-200" },
  { name: "social", icon: Users, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
  { name: "coffee", icon: Coffee, color: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
  { name: "joy", icon: Heart, color: "bg-pink-100 text-pink-700 hover:bg-pink-200" },
  { name: "growth", icon: Sparkles, color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" },
]

const questions = ["How do you feel right now?", "What just happened?", "What do you want to remember about this?"]

export default function CaptureMoment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [mood, setMood] = useState([4])
  const [text, setText] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isSaved, setIsSaved] = useState(false)

  const handleTagToggle = (tagName: string) => {
    setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]))
  }

  const handleSave = () => {
    // Save logic would go here
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      // Reset form
      setCurrentQuestion(0)
      setMood([4])
      setText("")
      setSelectedTags([])
    }, 2000)
  }

  const canProceed = text.trim().length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-slate-800 mb-2">MomentLens</h1>
          <p className="text-slate-600 text-sm">Capture this moment</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index <= currentQuestion ? "bg-indigo-400" : "bg-slate-200",
                )}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-medium text-slate-700">{questions[currentQuestion]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood Slider */}
            {currentQuestion === 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{moodEmojis[mood[0]]}</div>
                  <p className="text-sm text-slate-600">{moodLabels[mood[0]]}</p>
                </div>
                <Slider value={mood} onValueChange={setMood} max={6} step={1} className="w-full" />
              </div>
            )}

            {/* Text Input */}
            <div className="space-y-2">
              <Textarea
                placeholder="Share what's on your mind..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px] border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 resize-none"
                maxLength={280}
              />
              <div className="text-right text-xs text-slate-500">{text.length}/280</div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700">Add tags (optional)</p>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => {
                  const Icon = tag.icon
                  const isSelected = selectedTags.includes(tag.name)
                  return (
                    <Badge
                      key={tag.name}
                      variant="secondary"
                      className={cn(
                        "cursor-pointer transition-all duration-200 px-3 py-1.5",
                        isSelected ? tag.color : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                      )}
                      onClick={() => handleTagToggle(tag.name)}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {tag.name}
                    </Badge>
                  )
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {currentQuestion > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  className="text-slate-600"
                >
                  Back
                </Button>
              )}

              <div className="ml-auto">
                {currentQuestion < questions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentQuestion((prev) => prev + 1)}
                    disabled={!canProceed}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSave}
                    disabled={!canProceed || isSaved}
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
                      "Save Moment"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

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
