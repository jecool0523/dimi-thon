"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function NeighborHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/design-mode/ddeakeep.png"
            alt="떡 잎"
            width={60}
            height={30}
            className="object-contain"
          />
        </Link>

        <Link href="/login">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm">user님</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
