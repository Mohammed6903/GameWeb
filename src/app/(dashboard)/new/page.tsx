"use client"

import React, { useEffect, useState } from 'react'
import { Sparkles, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { fetchTopNewGames } from '@/lib/controllers/games'

export default function NewGamesPage() {
    const [newGames, setNewGames] = useState<any[]>();

    useEffect(() => {
        const fetchNew = async () => {
            const response = await fetchTopNewGames();
            console.log(response);
            setNewGames(response);
        }
        fetchNew();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 mb-12">
            New Releases
            </h1>

            <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <h2 className="text-3xl font-bold">Fresh and Exciting</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newGames && newGames.map((game) => (
                <GameCard key={game.id} game={game} />
                ))}
            </div>
            </section>
        </div>
        </div>
    )
}

function GameCard({ game }: { game: any }) {
  return (
    <div className="bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="aspect-video relative">
        <img
          src={game.thumbnail_url}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <Link href={`/play/${game.id}`} passHref>
            <Button className="bg-white/30 hover:bg-white/50 text-white gap-2">
              Play Now
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{game.name}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {game.categories.map((category: string) => (
            <span
              key={category}
              className="text-xs px-2 py-1 rounded-full bg-purple-700/30 text-purple-300"
            >
              {category}
            </span>
          ))}
        </div>
        <p className="text-sm text-purple-300 mt-2">Released: {game.created_at}</p>
      </div>
    </div>
  )
}