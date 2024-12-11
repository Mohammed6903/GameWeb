import { Maximize2, Minimize2 } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CommentSection } from '@/components/comment'
import { RelatedGames } from './relatedgame'
import { GameViewer } from '@/components/game-viewer'
import { Game } from "@/types/game"

// This would typically come from your database or API
const getGameBySlug = (slug: string): Game => {
  // Simulated data
  return {
    id: '1',
    title: 'Thief Puzzle',
    description: 'Master stealth and strategy in Thief Puzzle – become the ultimate stealth master in this captivating 2D puzzle game!',
    thumbnail: '/game1.jpg',
    play_url: '/games/thief-puzzle',
    categories: ['puzzle', 'strategy'],
    platform: 'mobile'
  }
}

interface GamePageProps {
  params: {
    slug: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const game = getGameBySlug(params.slug)

  return (
    <div className="min-h-screen bg-[#1a1042] text-white p-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Game Section */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold">{game.name}</h1>
            
            {/* Game Viewer Component */}
            <GameViewer 
              play_url={game.play_url}
              thumbnail={game.thumbnail}
            />

            {/* Game Description */}
            <Card className="bg-[#2a1b52] border-none p-4">
              <h2 className="text-xl font-semibold mb-4">Game Description</h2>
              <p className="text-gray-300">
                {game.description}
              </p>
              <div className="mt-4 space-x-2">
                {game.categories.map((category) => (
                  <Link 
                    key={category} 
                    href={`/categories/${category}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-700 hover:bg-purple-600 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-700">
                  {game.platform}
                </span>
              </div>
            </Card>

            {/* Comments Section */}
            <CommentSection />
          </div>

          {/* Related Games Sidebar */}
          <div className="lg:col-span-1">
            <RelatedGames categories={game.categories} />
          </div>
        </div>
      </div>
    </div>
  )
}

