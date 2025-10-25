"use client"

import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import NeighborCard from "@/components/neighbor-card"

// Mock neighbor data
const neighbors = [
  {
    id: "1",
    name: "권재헌",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "스파크 팀장 권재헌입니다",
    status: "offline" as const,
  },
  {
    id: "2",
    name: "나기찬",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "스파크 기획 나기찬입니다",
    status: "online" as const,
  },
  {
    id: "3",
    name: "박근우",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "스파크 개발 박근우입니다",
    status: "online" as const,
  },
  {
    id: "4",
    name: "이규원",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "스파크 발표 이규원입니다",
    status: "offline" as const,
  },
  {
    id: "5",
    name: "조율희",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "디자인 조율희입니다",
    status: "online" as const,
  },
  {
    id: "6",
    name: "김민수",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "프론트엔드 개발자입니다",
    status: "online" as const,
  },
  {
    id: "7",
    name: "이서연",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "백엔드 개발자입니다",
    status: "offline" as const,
  },
  {
    id: "8",
    name: "박지훈",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "UI/UX 디자이너입니다",
    status: "online" as const,
  },
  {
    id: "9",
    name: "최유진",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "프로젝트 매니저입니다",
    status: "offline" as const,
  },
  {
    id: "10",
    name: "정민호",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "데이터 분석가입니다",
    status: "online" as const,
  },
  {
    id: "11",
    name: "강서현",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "마케팅 담당자입니다",
    status: "offline" as const,
  },
  {
    id: "12",
    name: "윤태영",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "QA 엔지니어입니다",
    status: "online" as const,
  },
  {
    id: "13",
    name: "한지우",
    avatar: "/placeholder.svg?height=80&width=80",
    description: "DevOps 엔지니어입니다",
    status: "offline" as const,
  },
]

const birthdayNeighbors = neighbors.filter((_, index) => index < 3)

export default function NeighborList() {
  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          내 이웃
          <Users className="h-6 w-6" />
        </h2>
      </div>

      {/* Birthday Banner */}
      <Button
        variant="secondary"
        className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 mb-4"
      >
        생일인 이웃 {birthdayNeighbors.length} →
      </Button>

      {/* Neighbor Count and Sort */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold text-foreground">이웃 {neighbors.length}</span>
        <span className="text-sm text-muted-foreground">가나다순 정렬중</span>
      </div>

      {/* Neighbor Cards */}
      <div className="space-y-3">
        {neighbors.map((neighbor) => (
          <NeighborCard key={neighbor.id} neighbor={neighbor} />
        ))}
      </div>
    </div>
  )
}
