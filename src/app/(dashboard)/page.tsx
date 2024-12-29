import React, { Suspense } from 'react';
import { Gamepad2, Laptop2, Users2, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FeaturedGames } from '@/components/featured-games';
import { AllGames } from '@/components/all-games';
import { FetchedGameData } from '@/types/games';
import { getActiveGamesCount, getAllGames } from '@/lib/controllers/games';
import { getMeta } from '@/lib/controllers/meta';
import Loading, { CategorySkeleton, FeaturedGamesSkeleton, WelcomeSkeleton } from './loading';

// Helper function
const capitalizeCategory = (category: string) => {
  return category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Main component
export default async function DashboardPage() {
  const [games, metaResult, activeCount] = await Promise.all([
    getAllGames(),
    getMeta(),
    getActiveGamesCount(),
  ]);

  const categories = await getGamesByCategory(games);
  const metaData = metaResult.status === 200 && metaResult.data ? metaResult.data : {};

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto p-6 md:p-8 lg:p-12 space-y-12">
          {/* Welcome Section */}
          <Suspense fallback={<WelcomeSkeleton />}>
            <section className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-3xl p-4 shadow-xl transition-transform hover:scale-[1.02] duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg transform transition-transform hover:rotate-12 duration-300">
                    <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-700" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                      {metaData.site_name ? capitalizeCategory(metaData.site_name) : 'Gamers Arena'}
                    </h1>
                    <p className="text-purple-200 mt-1 text-sm sm:text-base">
                      Play instantly, no downloads needed
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-0">
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20 transition-colors">
                    <Laptop2 className="text-pink-400 w-5 h-5 sm:w-6 sm:h-6" />
                    {activeCount}+ games
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20 transition-colors">
                    <Users2 className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
                    Play with friends
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20 transition-colors">
                    <Sparkles className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
                    All for free
                  </Button>
                </div>
              </div>
            </section>
          </Suspense>

          {/* Featured Games */}
          <section>
            <h2 className="text-2xl sm:text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Featured Games
            </h2>
            <Suspense fallback={<FeaturedGamesSkeleton />}>
              <FeaturedGames games={games.slice(0, 6)} />
            </Suspense>
          </section>

          {/* Categories */}
          {Object.entries(categories).map(([category, categoryGames]) => (
            <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                {capitalizeCategory(category)}
              </h2>
              <Suspense fallback={<CategorySkeleton />}>
                <AllGames games={categoryGames} />
              </Suspense>
            </section>
          ))}
        </div>
      </div>
    </Suspense>
  );
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