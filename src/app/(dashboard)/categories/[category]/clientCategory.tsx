"use client";

import React,{useEffect, useState} from 'react';
import { Suspense } from 'react'
import { Tag, Filter, Grid, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FetchedGameData } from '@/types/games'
import { Pagination } from '@/components/pagination'
// import {FilterModal}  from "@/components/filterModal"
import { useRouter } from 'next/navigation';

interface ClientCategoryProps {
  category: string,
  gameProp: FetchedGameData[],
  totalProp: number,
  handlePageChange: (page: number) => Promise<{games: any[], total: number | null}>
}

export default function ClientCategoryPage({ category, gameProp, totalProp, handlePageChange }: ClientCategoryProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState({ search: '', tags: [] as string[] })
  const [games, setGames] = useState<any []>(gameProp);
  const [total, setTotal] = useState<number>(totalProp);
  const gamesPerPage = 12;
  const totalPages = Math.ceil(total / gamesPerPage);
  const router = useRouter();

  // const handleApplyFilters = (newFilters: { search: string; tags: string[] }) => {
  //   setFilters(newFilters)
  // }

  useEffect(() => {
    const fetchNew = async () => {
        const res = await handlePageChange(currentPage);
        if (res.games && res.total) {
            setGames(res.games);
            setTotal(res.total);
        }
        router.refresh();
    }
    fetchNew();
  }, [currentPage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Category Header */}
        <section className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="size-16 rounded-2xl bg-violet-600 flex items-center justify-center shrink-0 shadow-lg">
              <Tag className="size-10 text-white" />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                {category} Games
              </h1>
              <p className="text-purple-300 mt-2">
                {total} games in this category
              </p>
            </div>
            {/* <div className="flex items-center space-x-4">
              <Button onClick={() => setIsFilterModalOpen(true)} variant="outline" className="gap-2 text-gray-300 hover:text-white hover:bg-white/10">
                <Filter className="size-5 text-purple-500" />
                Filters
              </Button>
              <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApplyFilters={handleApplyFilters}
              />
            </div> */}
          </div>
        </section>

        {/* Games Grid */}
        <Suspense fallback={<div className="h-96 bg-white/5 rounded-3xl animate-pulse"></div>}>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games && games.map((game: FetchedGameData) => (
              <div 
                key={game.id} 
                className="bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video relative">
                  {game.thumbnail_url && (
                    <img
                      src={game.thumbnail_url} 
                      alt={game.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <Button className="bg-white/30 hover:bg-white/50 text-white" onClick={() => router.push(`/play/${game.id}`)}>
                      Play Now
                    </Button>
                  </div>
                </div>
                <div className="p-4 hidden sm:block">
                  <h3 className="text-lg font-semibold truncate">{game.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {game.categories.slice(0, 2).map((cat: string) => (
                      <span 
                        key={cat} 
                        className="text-xs px-2 py-1 rounded-full bg-purple-700/30 text-purple-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              setCurrentPage={setCurrentPage}
              baseUrl={`/categories/${category}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}