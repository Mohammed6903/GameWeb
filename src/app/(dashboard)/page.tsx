import { Suspense } from 'react'
import { Gamepad2, Laptop2, Users2, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FeaturedGames } from '@/components/featured-games'
import { AllGames } from '@/components/all-games'
import { FetchedGameData, Game } from '@/types/games'
import { getActiveGamesCount, getAllGames } from '@/lib/controllers/games'
import { getMeta } from '@/lib/controllers/meta'

function capitalizeCategory(category: string) {
  return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

async function getGamesByCategory(games: FetchedGameData[]): Promise<Record<string, FetchedGameData[]>> {
  const categorizedGames: Record<string, FetchedGameData[]> = {};

  games.forEach((game) => {
    game.categories.forEach((category) => {
      if (!categorizedGames[category]) {
        categorizedGames[category] = [];
      }
      categorizedGames[category].push({
        id: game.id,
        name: game.name,
        description: game.description,
        thumbnail_url: game.thumbnail_url,
        play_url: game.play_url,
        tags: game.tags,
        provider_id: game.provider_id,
        categories: game.categories,
        is_active: game.is_active,
        created_at: game.created_at,
        updated_at: game.updated_at,
      });
    });
  });

  return categorizedGames;
}

export default async function DashboardPage() {
  const games = await getAllGames();
  const categories = await getGamesByCategory(games);
  const metaResult = await getMeta();
  const metaData = metaResult.status === 200 && metaResult.data ? metaResult.data : {};
  const activeCount = await getActiveGamesCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl">
        <div className="flex flex-row justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="size-10 sm:size-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg">
              <Gamepad2 className="size-8 sm:size-10 text-purple-700" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                {metaData.site_name ? capitalizeCategory(metaData.site_name) : 'Gamers Arena'}
              </h1>
              <p className="text-purple-200 mt-1 sm:mt-2 text-base sm:text-lg">Play instantly, no downloads needed</p>
            </div>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4">
            <Button variant="ghost" className="gap-2 text-white hover:bg-white/20">
              <Laptop2 className="text-pink-400 size-5 sm:size-6" />
              {activeCount}+ games
            </Button>
            <Button variant="ghost" className="gap-2 text-white hover:bg-white/20">
              <Users2 className="text-purple-400 size-5 sm:size-6" />
              Play with friends
            </Button>
            <Button variant="ghost" className="gap-2 text-white hover:bg-white/20">
              <Sparkles className="text-yellow-400 size-5 sm:size-6" />
              All for free
            </Button>
          </div>
        </div>
      </section>

        {/* Featured Games */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Featured Games
          </h2>
          <Suspense fallback={<div className="h-36 bg-white/5 rounded-3xl animate-pulse"></div>}>
            <FeaturedGames games={games.slice(0, 6)} />
          </Suspense>
        </section>

        {/* All Games Grid */}
        {Object.entries(categories).map(([category, games]) => (
          <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              {category}
            </h2>
            <Suspense fallback={<div className="h-96 bg-white/5 rounded-3xl animate-pulse"></div>}>
              <AllGames games={games} />
            </Suspense>
          </section>
        ))}
      </div>
    </div>
  )
}