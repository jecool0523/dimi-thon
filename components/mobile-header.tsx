"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import LanguageSwitcher from "@/components/language-switcher"
import Image from "next/image"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function MobileHeader() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-40 flex md:hidden items-center justify-between bg-background border-b border-border px-4 py-2 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/LOGO.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
        <Image src="/images/ddeakeep.png" alt="떡 잎" width={60} height={24} className="h-6 w-auto" />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {!loading && user && (
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        )}

        {!loading && !user && (
          <>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-lime-600 hover:bg-lime-700 text-white text-sm">
                Sign up
              </Button>
            </Link>
          </>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] sm:w-[350px] pt-10 border-l-border">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="flex items-center gap-2">
                <Image src="/images/LOGO.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
                <Image src="/images/ddeakeep.png" alt="떡 잎" width={80} height={32} className="h-8 w-auto" />
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Settings</h3>
                <div className="space-y-1">
                  <LanguageSwitcher />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">More</h3>
                <div className="space-y-1">
                  <Link href="/schemes" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    Government Schemes
                  </Link>
                  <Link href="/jobs" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    Jobs & Opportunities
                  </Link>
                  <Link href="/events" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    Events
                  </Link>
                  <Link href="/community" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    Community
                  </Link>
                  <Link href="/help" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    Help & Support
                  </Link>
                </div>
              </div>

              {user && (
                <div className="pt-4 border-t border-border">
                  <Link href="/settings" className="block text-sm py-2 text-lime-600 hover:text-lime-700">
                    Account Settings
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
