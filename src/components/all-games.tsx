"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { FetchedGameData } from '@/types/games'
import { useRouter } from 'next/navigation'

interface AllGamesProps {
  games: FetchedGameData[]
}

export function AllGames({ games }: AllGamesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  const openGame = (gameId: string) => {
    router.push(`/play/${gameId}`);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card 
            className="group relative overflow-hidden rounded-xl bg-white/5 border-transparent hover:bg-white/10 transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openGame(game.id)}
          >
            <div className="aspect-square relative">
              <img
                src={game.thumbnail_url || '/placeholder.png'}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm font-semibold mb-1 line-clamp-2">{game.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {game.categories.slice(0, 2).map((category, i) => (
                    <span key={i} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}