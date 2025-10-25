"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Heart, Users, ShoppingBasket, MoreHorizontal } from "lucide-react"

export default function MobileFooterNav() {
  const pathname = usePathname()
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsScrollingUp(true)
      } else {
        setIsScrollingUp(currentScrollY < lastScrollY)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    {
      icon: Home,
      label: "홈",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: Heart,
      label: "페이버릿",
      href: "/favorites",
      active: pathname === "/favorites",
    },
    {
      icon: Users,
      label: "내이웃",
      href: "/neighbor",
      active: pathname === "/neighbor",
    },
    {
      icon: ShoppingBasket,
      label: "떡 바구니",
      href: "/social",
      active: pathname === "/social",
    },
    {
      icon: MoreHorizontal,
      label: "더보기",
      href: "/more",
      active: pathname === "/more",
    },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border transition-transform duration-300",
        !isScrollingUp && "translate-y-full",
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center w-full h-full">
            <div className="relative">
              <item.icon className={cn("h-6 w-6", item.active ? "text-black" : "text-black/60")} />
            </div>
            <span className={cn("text-xs mt-1", item.active ? "text-black font-medium" : "text-black/60")}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
