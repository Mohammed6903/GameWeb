import { Suspense } from 'react'
import { Tag, Filter, Grid, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FetchedGameData } from '@/types/games'
import { getGamesByCategory } from '@/lib/controllers/games'
import { Pagination } from '@/components/pagination'
import GameNotFound from '@/components/game-not-found'

interface CategoryPageProps {
  params: {
    category: string
  },
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const gamesPerPage = 12;

  const { games, total } = await getGamesByCategory(category, {
    page: currentPage,
    limit: gamesPerPage
  });

  if (!games || total === null) {
    return <GameNotFound />
  }

  const totalPages = Math.ceil(total / gamesPerPage);

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
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Grid className="size-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <List className="size-6" />
              </Button>
              <Button variant="outline" className="gap-2 text-gray-300 hover:text-white hover:bg-white/10">
                <Filter className="size-5 text-purple-500" />
                Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <Suspense fallback={<div className="h-96 bg-white/5 rounded-3xl animate-pulse"></div>}>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game: FetchedGameData) => (
              <div 
                key={game.id} 
                className="bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video relative">
                  <img 
                    src={game.thumbnail_url} 
                    alt={game.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <Button className="bg-white/30 hover:bg-white/50 text-white">
                      Play Now
                    </Button>
                  </div>
                </div>
                <div className="p-4">
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
              baseUrl={`/search/${category}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}