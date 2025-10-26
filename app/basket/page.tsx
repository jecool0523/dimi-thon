"use client"

import { useState, useEffect } from "react"
import MobileFooterNav from "@/components/mobile-footer-nav"
import { Search, User, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function BasketPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-warm-bg pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-warm-bg border-b border-warm-border px-4 py-3">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-warm-brown">떡 잎</h1>
        </Link>

        {!loading && (
          <>
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-warm-brown">
                  <User className="h-5 w-5" />
                  <span>{user.email?.split("@")[0] || "user"}님</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-warm-brown">
                  로그인
                </Button>
              </Link>
            )}
          </>
        )}
      </header>

      {/* Search Bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="검색..."
            className="w-full h-12 rounded-full bg-white border border-warm-border px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
          />
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBasket className="h-8 w-8 text-warm-brown" />
          <h2 className="text-2xl font-bold text-warm-brown">떡 바구니</h2>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-32 h-32 bg-warm-cream rounded-full flex items-center justify-center mb-4">
            <ShoppingBasket className="h-16 w-16 text-warm-brown/40" />
          </div>
          <p className="text-lg text-warm-brown/60 mb-2">바구니가 비어있습니다</p>
          <p className="text-sm text-warm-brown/40">떡을 담아보세요!</p>
        </div>
      </div>

      <MobileFooterNav />
    </div>
  )
}
