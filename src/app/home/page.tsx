"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gamepad2, Laptop2, Users2, Sparkles } from 'lucide-react'

export default function Page() {
  return (
    <div className="w-full p-3 text-white">
      {/* Welcome Section */}
      <section className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex justify-between items-center gap-4">
            <div className="size-12 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
              <Gamepad2 className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-red-600 font-bold">Welcome to CrazyGames</h1>
              <p className="text-purple-400">Play instantly, no downloads needed</p>
            </div>
          </div>
          <div className="flex flex-wrap lg:ml-auto gap-2">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-400">
              <Laptop2 className="text-red-500 size-4" />
              4000+ games
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-gray-400">
              <Users2 className="text-red-500 size-4" />
              Play with friends
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-gray-400">
              <Sparkles className="text-red-500 size-4" />
              All for free
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Featured games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-2">
          {[
            {
              title: "Bloxd.io",
              image: "/game1.jpg?height=200&width=400",
              tag: "HOT"
            },
            {
              title: "Racing Limits",
              image: "/game1.jpg?height=200&width=400",
              tag: "TOP RATED"
            },
            {
              title: "Smash Karts",
              image: "/game1.jpg?height=200&width=400",
              tag: "UPDATED"
            },
            {
              title: "Dead Shot",
              image: "/game1.jpg?height=200&width=400",
              tag: "NEW"
            },
            {
              title: "Mini Car Racing",
              image: "/game1.jpg?height=200&width=400",
              tag: "HOT"
            },
            {
              title: "Zombie Defense",
              image: "/game1.jpg?height=200&width=400",
              tag: "NEW"
            }
          ].map((game, i) => (
            <Card key={i} className="group relative overflow-hidden rounded-lg bg-white/5 border-transparent hover:bg-white/10 transition-all">
              <img 
                src="/game1.jpg?height=300&width=400"
                alt={game.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {game.tag && (
                <span className="absolute top-2 right-2 bg-violet-600 text-xs font-medium px-2 py-1 rounded">
                  {game.tag}
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                <h3 className="text-base font-medium">{game.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* All Games Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-3">All Games</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <Card 
              key={i} 
              className="group relative overflow-hidden rounded-lg bg-white/5 border-transparent hover:bg-white/10 transition-all"
            >
              <div className="aspect-square relative">
                <img
                  src={`/game1.jpg?height=200&width=200`}
                  alt={`Game ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

