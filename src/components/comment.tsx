'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function CommentSection() {
  return (
    <Card className="bg-[#2a1b52] border-none p-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <form className="space-y-4">
        <Input
          placeholder="Name"
          className="bg-[#1a1042] border-purple-700"
        />
        <Input
          placeholder="Email"
          type="email"
          className="bg-[#1a1042] border-purple-700"
        />
        <Textarea
          placeholder="Message"
          className="bg-[#1a1042] border-purple-700 min-h-[100px]"
        />
        <Button className="w-full bg-purple-700 hover:bg-purple-800">
          Submit Comment
        </Button>
      </form>
    </Card>
  )
}

