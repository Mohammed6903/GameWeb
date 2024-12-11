"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { FetchedGameData } from '@/types/games'

interface FeaturedGamesProps {
  games: FetchedGameData[]
}

export function FeaturedGames({ games }: FeaturedGamesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card 
            className="group relative overflow-hidden rounded-2xl bg-white/5 border-transparent hover:bg-white/10 transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img 
              src={game.thumbnail_url || '/placeholder.png'}
              alt={game.name}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {game.tags && game.tags.length > 0 && (
              <span className="absolute top-3 right-3 bg-violet-600 text-xs font-medium px-2 py-1 rounded-full">
                {game.tags[0]}
              </span>
            )}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2">{game.name}</h3>
              <p className="text-sm text-gray-300 line-clamp-2">{game.description}</p>
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}