'use client'

import { useState } from "react"
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface GameViewerProps {
  gameUrl: string
  thumbnail?: string  // Make thumbnail optional
}

export function GameViewer({ gameUrl, thumbnail }: GameViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20"
          >
            <Minimize2 className="h-6 w-6" />
          </Button>
        </div>
        <iframe
          src={gameUrl}
          className="w-full h-full"
          allow="fullscreen"
        />
      </div>
    )
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-[#2a1b52]">
      {!isPlaying ? (
        <div className="relative aspect-video">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="Game thumbnail"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No thumbnail available</span>
            </div>
          )}
          <Button
            onClick={() => setIsPlaying(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700"
            size="lg"
          >
            Play
          </Button>
        </div>
      ) : (
        <div className="relative aspect-video">
          <iframe
            src={gameUrl}
            className="w-full h-full"
            allow="fullscreen"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <Maximize2 className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  )
}

