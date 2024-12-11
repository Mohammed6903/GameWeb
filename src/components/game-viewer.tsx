'use client'

import { useState, useRef, useEffect } from "react"
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import GameNotFound from "./game-not-found"

interface GameViewerProps {
  play_url: string
  thumbnail?: string
}

export function GameViewer({ play_url, thumbnail }: GameViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [found, setFound] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const tryEmbed = () => {
      try {
        const iframe = document.createElement('iframe');
        iframe.src = play_url;
        const result = iframe.toString().includes('iframe');
        // Remove the iframe from memory
        iframe.remove();
        return true;
      } catch {
        return false;
      }
    }
    if (!play_url || !tryEmbed()) {
      setFound(false);
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, []);

  if (!found) {
    return (
      <GameNotFound />
    )
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div ref={containerRef} className="relative rounded-lg overflow-hidden bg-[#2a1b52]">
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
        <div className={`relative ${isFullscreen ? 'w-screen h-screen' : 'aspect-video'}`}>
          <iframe
            src={play_url}
            className="w-full h-full"
            allow="fullscreen"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            {isFullscreen ? (
              <Minimize2 className="h-6 w-6" />
            ) : (
              <Maximize2 className="h-6 w-6" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}