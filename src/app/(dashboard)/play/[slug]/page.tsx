import { Maximize2, Minimize2, Tag, Clock, Star, ThumbsUp, ThumbsDown } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CommentSection } from '@/components/comment'
import { RelatedGames } from './relatedgame'
import { GameViewer } from '@/components/game-viewer'
import { getGameById } from '@/lib/controllers/games'
import { FetchedGameData } from '@/types/games'
import { ArrowLeft } from 'lucide-react'

const getGameBySlug = async (slug: string): Promise<FetchedGameData> => {
  const game = await getGameById(slug);
  return game;
}

interface GamePageProps {
  params: {
    slug: string
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const game = await getGameBySlug(params.slug)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120a2c] to-[#1e1540] text-white p-6 md:p-8 lg:p-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Game Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Game Header */}
            <div className="flex justify-between items-center">
              <Link href="/"><ArrowLeft size={24} /></Link>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                {game.name}
              </h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="text-black bg-white hover:bg-purple-700 hover:text-white">
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="text-black bg-white hover:bg-purple-700 hover:text-white">
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Game Viewer */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-800/50">
              <GameViewer 
                play_url={game.play_url}
                thumbnail={game.thumbnail_url}
              />
            </div>

            {/* Game Details */}
            <Card className="bg-[#2a1b52]/70 backdrop-blur-md border-none rounded-2xl shadow-xl">
              <CardHeader className="border-b border-purple-800/30 pb-4">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                  Game Description
                </h2>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {game.description}
                </p>
                
                {/* Categories and Metadata */}
                <div className="flex flex-wrap gap-3 items-center">
                  {game.categories.map((category) => (
                    <Link 
                      key={category} 
                      href={`/categories/${category}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm 
                        bg-purple-700/30 text-purple-300 
                        hover:bg-purple-700/50 transition-colors
                        border border-purple-700/50"
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      {category}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <CommentSection gameId='1'/>
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