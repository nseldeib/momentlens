"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Clock, TrendingUp, BookOpen, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Capture" },
  { href: "/timeline", icon: Clock, label: "Timeline" },
  { href: "/trends", icon: TrendingUp, label: "Trends" },
  { href: "/prompts", icon: BookOpen, label: "Prompts" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-4 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200",
                  isActive ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:text-slate-800 hover:bg-slate-50",
                )}
              >
                <Icon className={cn("w-5 h-5 mb-1", isActive && "text-indigo-600")} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
