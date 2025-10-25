"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log("[v0] Login successful:", data)
      router.push("/social")
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setError(err.message || "로그인에 실패했습니다")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center text-foreground hover:text-lime-600">
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 mb-4">
            <Image src="/images/LOGO.png" alt="Logo" width={80} height={80} className="h-20 w-auto" />
            <Image src="/images/ddeakeep.png" alt="떡 잎" width={100} height={40} className="h-10 w-auto" />
          </div>
          <p className="text-muted-foreground mt-1">Connect with your community</p>
        </div>

        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="citizen" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white">
              Citizen
            </TabsTrigger>
            <TabsTrigger value="official" className="data-[state=active]:bg-lime-500 data-[state=active]:text-white">
              Government Official
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen">
            <Card className="border-border shadow-lg">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Citizen Login</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email or Mobile Number</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-lime-600 hover:text-lime-700">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 30 days
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white" disabled={loading}>
                    {loading ? "로그인 중..." : "Login"}
                  </Button>
                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-lime-600 hover:text-lime-700 font-medium">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="official">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>Government Official Login</CardTitle>
                <CardDescription>Secure login for verified government officials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="official-id">Official ID</Label>
                  <Input
                    id="official-id"
                    type="text"
                    placeholder="Enter your official ID"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="official-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-lime-600 hover:text-lime-700">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="official-password"
                    type="password"
                    placeholder="Enter your password"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="official-remember" />
                  <Label htmlFor="official-remember" className="text-sm font-normal">
                    Remember me for 30 days
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">Login with DigiLocker</Button>
                <div className="text-center text-sm">
                  Need verification?{" "}
                  <Link href="/official-verification" className="text-lime-600 hover:text-lime-700 font-medium">
                    Get verified
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
