"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Plus, X, CalendarIcon, Target, MessageSquare, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const presetExperiments = [
  {
    title: "Morning vs Evening Mood",
    description: "Track how your mood changes throughout the day",
    intention: "Understand daily mood patterns to optimize my schedule",
    duration: 7,
    prompts: ["How do you feel right now? (1-10)", "What's your energy level?", "What has influenced your mood today?"],
    tags: ["mood", "energy", "daily-patterns"],
  },
  {
    title: "Gratitude Practice",
    description: "Daily gratitude journaling for better mindset",
    intention: "Develop a more positive outlook through consistent gratitude practice",
    duration: 14,
    prompts: [
      "What are you grateful for today?",
      "Who made a positive impact on your day?",
      "What small moment brought you joy?",
    ],
    tags: ["gratitude", "positivity", "mindfulness"],
  },
  {
    title: "Work Stress Tracking",
    description: "Monitor stress levels and identify patterns",
    intention: "Find better ways to manage work-related stress",
    duration: 10,
    prompts: [
      "How stressed do you feel? (1-10)",
      "What's causing your stress today?",
      "What would help you feel more calm?",
    ],
    tags: ["stress", "work", "coping"],
  },
]

export default function CreateExperiment() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    intention: "",
    duration: 7,
    startDate: new Date(),
    prompts: [""],
    tags: [],
  })
  const [newTag, setNewTag] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/experiments")
    }
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePresetSelect = (preset: (typeof presetExperiments)[0]) => {
    setFormData({
      ...formData,
      title: preset.title,
      description: preset.description,
      intention: preset.intention,
      duration: preset.duration,
      prompts: preset.prompts,
      tags: preset.tags,
    })
    setStep(2)
  }

  const handlePromptChange = (index: number, value: string) => {
    const newPrompts = [...formData.prompts]
    newPrompts[index] = value
    setFormData({ ...formData, prompts: newPrompts })
  }

  const addPrompt = () => {
    setFormData({ ...formData, prompts: [...formData.prompts, ""] })
  }

  const removePrompt = (index: number) => {
    const newPrompts = formData.prompts.filter((_, i) => i !== index)
    setFormData({ ...formData, prompts: newPrompts })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  const handleCreate = () => {
    // In a real app, this would save the experiment
    console.log("Creating experiment:", formData)
    router.push("/experiments")
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.title.trim() && formData.description.trim()
      case 2:
        return formData.intention.trim()
      case 3:
        return formData.prompts.some((p) => p.trim())
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-3">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-medium text-slate-800">Create Experiment</h1>
            <p className="text-sm text-slate-600">Step {step} of 4</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("flex-1 h-1 rounded-full mx-1", i <= step ? "bg-indigo-400" : "bg-slate-200")} />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-500" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Presets */}
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-3 block">Quick Start (Optional)</Label>
                <div className="space-y-2">
                  {presetExperiments.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-3 bg-transparent"
                      onClick={() => handlePresetSelect(preset)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-slate-800">{preset.title}</div>
                        <div className="text-sm text-slate-600">{preset.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                <div className="text-center my-4 text-sm text-slate-500">or create from scratch</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Experiment Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Morning Mood Tracking"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what you want to track..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Intention & Duration */}
        {step === 2 && (
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                Intention & Duration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="intention">Your Intention</Label>
                <Textarea
                  id="intention"
                  placeholder="What do you hope to learn or achieve from this experiment?"
                  value={formData.intention}
                  onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-slate-500">Be specific about what insights you're looking for</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (days)</Label>
                <Select
                  value={formData.duration.toString()}
                  onValueChange={(value) => setFormData({ ...formData, duration: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">1 week</SelectItem>
                    <SelectItem value="14">2 weeks</SelectItem>
                    <SelectItem value="21">3 weeks</SelectItem>
                    <SelectItem value="30">1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(formData.startDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => {
                        if (date) {
                          setFormData({ ...formData, startDate: date })
                          setShowCalendar(false)
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Custom Prompts */}
        {step === 3 && (
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />
                Custom Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">Create prompts that will guide your daily entries</p>

              {formData.prompts.map((prompt, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Prompt ${index + 1}...`}
                    value={prompt}
                    onChange={(e) => handlePromptChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.prompts.length > 1 && (
                    <Button variant="outline" size="icon" onClick={() => removePrompt(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addPrompt}
                className="w-full bg-transparent"
                disabled={formData.prompts.length >= 5}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Prompt
              </Button>

              <p className="text-xs text-slate-500">You can add up to 5 prompts. Keep them focused and specific.</p>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Tags & Review */}
        {step === 4 && (
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700">Review & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tags */}
              <div className="space-y-3">
                <Label>Tags (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="flex-1"
                  />
                  <Button onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-2 py-1 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Review */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-medium text-slate-800">Review Your Experiment</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Title:</span>
                    <p className="text-slate-600">{formData.title}</p>
                  </div>

                  <div>
                    <span className="font-medium text-slate-700">Duration:</span>
                    <p className="text-slate-600">{formData.duration} days</p>
                  </div>

                  <div>
                    <span className="font-medium text-slate-700">Prompts:</span>
                    <ul className="text-slate-600 list-disc list-inside">
                      {formData.prompts
                        .filter((p) => p.trim())
                        .map((prompt, index) => (
                          <li key={index}>{prompt}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack} className="bg-transparent">
            Back
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleCreate} className="bg-indigo-500 hover:bg-indigo-600 text-white">
              Create Experiment
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
