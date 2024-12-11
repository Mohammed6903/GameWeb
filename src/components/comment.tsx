// 'use client'

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"

// export function CommentSection() {
//   return (
//     <Card className="bg-[#2a1b52] border-none p-4">
//       <h2 className="text-xl font-semibold mb-4">Comments</h2>
//       <form className="space-y-4">
//         <Input
//           placeholder="Name"
//           className="bg-[#1a1042] border-purple-700"
//         />
//         <Input
//           placeholder="Email"
//           type="email"
//           className="bg-[#1a1042] border-purple-700"
//         />
//         <Textarea
//           placeholder="Message"
//           className="bg-[#1a1042] border-purple-700 min-h-[100px]"
//         />
//         <Button className="w-full bg-purple-700 hover:bg-purple-800">
//           Submit Comment
//         </Button>
//       </form>
//     </Card>
//   )
// }

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string
  user: string
  content: string
  createdAt: string
}

interface CommentSectionProps {
  gameId: string
}

export function CommentSection({ gameId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'Anonymous',
        content: newComment,
        createdAt: new Date().toISOString(),
      }
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="bg-white/5 border-white/10 focus:border-purple-500"
        />
        <Button type="submit">Post Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarFallback>{comment.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{comment.user}</p>
              <p className="text-sm text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

