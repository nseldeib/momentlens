"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Moon, Sun, Download, Trash2, Shield, Heart } from "lucide-react"

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [morningTime, setMorningTime] = useState("9:00")
  const [eveningTime, setEveningTime] = useState("21:00")

  const handleExportData = () => {
    // In a real app, this would trigger data export
    alert("Data export feature coming soon!")
  }

  const handleDeleteData = () => {
    // In a real app, this would show a confirmation dialog
    if (confirm("Are you sure you want to delete all your data? This cannot be undone.")) {
      alert("Data deletion feature coming soon!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-slate-800 mb-2">Settings</h1>
          <p className="text-slate-600 text-sm">Customize your MomentLens experience</p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-indigo-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-sm font-medium text-slate-700">
                  Daily reminders
                </Label>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>

              {notifications && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Morning reminder</Label>
                    <Select value={morningTime} onValueChange={setMorningTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7:00">7:00 AM</SelectItem>
                        <SelectItem value="8:00">8:00 AM</SelectItem>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-slate-600">Evening reminder</Label>
                    <Select value={eveningTime} onValueChange={setEveningTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                {darkMode ? (
                  <Moon className="w-5 h-5 mr-2 text-indigo-500" />
                ) : (
                  <Sun className="w-5 h-5 mr-2 text-indigo-500" />
                )}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-sm font-medium text-slate-700">
                  Dark mode
                </Label>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-indigo-500" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleExportData}>
                <Download className="w-4 h-4 mr-2" />
                Export my data
              </Button>

              <div className="pt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  onClick={handleDeleteData}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete all data
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  This action cannot be undone. All your moments will be permanently deleted.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-indigo-500" />
                About MomentLens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-slate-600 leading-relaxed">
                <p className="mb-2">
                  MomentLens helps you capture and reflect on the small moments that make up your life.
                </p>
                <p>Version 1.0.0 • Made with care for mindful reflection</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Button variant="ghost" className="w-full text-sm text-slate-600">
                  Privacy Policy
                </Button>
                <Button variant="ghost" className="w-full text-sm text-slate-600">
                  Terms of Service
                </Button>
                <Button variant="ghost" className="w-full text-sm text-slate-600">
                  Send Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
