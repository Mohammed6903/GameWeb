// import { GameForm } from '@/components/admin/GameForm';
import { getGameById, updateGame } from '@/lib/api/games';
import { redirect } from 'next/navigation';
// import { Game, GameFormData } from '@/types/games';
import EditGameClient from './EditGameClient';

export default async function EditGamePage({ 
  params 
}: { 
  params: { gameId: string } 
}) {
  const game = await getGameById(params.gameId);

  if (!game) {
    redirect('/admin/manage-games');
  }

  return (
    <EditGameClient 
      initialGame={game} 
      gameId={params.gameId} 
    />
  );
}