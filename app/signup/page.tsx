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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/social`,
          data: {
            name: `${firstName} ${lastName}`,
            role: "citizen",
          },
        },
      })

      if (error) throw error

      console.log("[v0] Signup successful:", data)
      setSuccess("회원가입이 완료되었습니다! 이메일을 확인해주세요.")

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      console.error("[v0] Signup error:", err)
      setError(err.message || "회원가입에 실패했습니다")
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
          <p className="text-muted-foreground mt-1">Join your community today</p>
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
              <form onSubmit={handleSignup}>
                <CardHeader>
                  <CardTitle>Create Citizen Account</CardTitle>
                  <CardDescription>Enter your details to create your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
                  )}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                      {success}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="First name"
                        className="border-input text-foreground placeholder:text-muted-foreground"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Last name"
                        className="border-input text-foreground placeholder:text-muted-foreground"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-xs font-normal">
                      I agree to the{" "}
                      <Link href="/terms" className="text-lime-600 hover:text-lime-700">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-lime-600 hover:text-lime-700">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white" disabled={loading}>
                    {loading ? "가입 중..." : "Create Account"}
                  </Button>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-lime-600 hover:text-lime-700 font-medium">
                      Log in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="official">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle>Government Official Registration</CardTitle>
                <CardDescription>Create an account with official verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="official-first-name">First Name</Label>
                    <Input
                      id="official-first-name"
                      placeholder="First name"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="official-last-name">Last Name</Label>
                    <Input
                      id="official-last-name"
                      placeholder="Last name"
                      className="border-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="official-email">Official Email</Label>
                  <Input
                    id="official-email"
                    type="email"
                    placeholder="Enter your official email"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger className="border-input text-foreground">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="home-affairs">Home Affairs</SelectItem>
                      <SelectItem value="municipal">Municipal Corporation</SelectItem>
                      <SelectItem value="police">Police</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="rural-development">Rural Development</SelectItem>
                      <SelectItem value="urban-development">Urban Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-id">Employee ID</Label>
                  <Input
                    id="employee-id"
                    placeholder="Enter your employee ID"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="official-password">Password</Label>
                  <Input
                    id="official-password"
                    type="password"
                    placeholder="Create a password"
                    className="border-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="official-terms" />
                  <Label htmlFor="official-terms" className="text-xs font-normal">
                    I agree to the{" "}
                    <Link href="/terms" className="text-lime-600 hover:text-lime-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-lime-600 hover:text-lime-700">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Official accounts require verification through DigiLocker or Aadhaar. You
                    will be prompted to complete verification after registration.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">
                  Register & Proceed to Verification
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-lime-600 hover:text-lime-700 font-medium">
                    Log in
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
