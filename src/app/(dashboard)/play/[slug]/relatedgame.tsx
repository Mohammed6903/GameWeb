import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { FetchedGameData } from "@/types/games"
import Image from 'next/image'

interface RelatedGamesProps {
  categories: string[]
  currentGameId: string
}

const getRelatedGames = (categories: string[]) => {
    // Simulated data
    return [
      { id: "1", name: "Puzzle Game 1", thumbnail: "/placeholder.svg", slug: "puzzle-game-1" },
      { id: "2", name: "Puzzle Game 2", thumbnail: "/placeholder.svg", slug: "puzzle-game-2" },
      { id: "3", name: "Puzzle Game 3", thumbnail: "/placeholder.svg", slug: "puzzle-game-3" },
      { id: "4", name: "Puzzle Game 4", thumbnail: "/placeholder.svg", slug: "puzzle-game-4" },
      { id: "5", name: "Puzzle Game 5", thumbnail: "/placeholder.svg", slug: "puzzle-game-5" },
      { id: "6", name: "Puzzle Game 6", thumbnail: "/placeholder.svg", slug: "puzzle-game-6" }
    ]
  }

export const RelatedGames = ({ categories }: { categories: string[] }) => {
    const relatedGames = getRelatedGames(categories);

    return (
      <Card className="bg-white/10 backdrop-blur-md border-none p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Related Games</h2>
        <div className="space-y-4">
          {relatedGames.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Image
                  src={game.thumbnail || '/placeholder-game.jpg'}
                  alt={game.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{game.name}</h3>
                  {/* <p className="text-sm text-gray-400">{game.categories.join(', ')}</p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    )
}