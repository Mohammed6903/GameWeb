import { Suspense } from 'react'
import { Tag, Filter, Grid, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FetchedGameData } from '@/types/games'
import { getGamesByCategory } from '@/lib/controllers/games'
import { Pagination } from '@/components/pagination'
import GameNotFound from '@/components/game-not-found'
import ClientCategoryPage from './clientCategory'

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

  const handlePageChange = async (page: number) => {
    'use server'
    const { games, total } = await getGamesByCategory(category, {
      page: page,
      limit: gamesPerPage
    });
    return {games, total}
  }

  if (!games || total === null) {
    return <GameNotFound />
  }

  return (
    <ClientCategoryPage gameProp={games} category={category} totalProp={total} handlePageChange={handlePageChange}/>
  )
}