'use client';

import { useState } from 'react';
import { UpdateGameForm } from '@/components/admin/UpdateGameForm';
import { toast } from 'sonner';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { Game } from '@/types/games';

export default function EditGameClient({
  initialGame,
  providers,
  categories,
  tags,
}: {
  initialGame: any;
  providers: any[];
  categories: any[];
  tags: any[];
}) {
  const [game, setGame] = useState<Game>({
    id: initialGame?.id,
    name: initialGame?.name,
    description: initialGame?.description,
    status: initialGame?.is_active ? 'active' : 'inactive',
    play_url: initialGame?.play_url,
    thumbnail_url: initialGame?.thumbnail_url,
    provider_id: initialGame?.provider_id,
    categories: initialGame?.categories,
    tags: initialGame?.tags,
  });

  const handleAddGame = async (gameData: any) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_SITE_URL}/api/game/update/${game.id}`, {
        name: gameData.name,
        description: gameData.description,
        play_url: gameData.play_url,
        tags: gameData.tags,
        is_active: gameData.is_active,
        provider_id: gameData.provider_id,
        thumbnailUrl: gameData.thumbnail_url,
        categories: gameData.categories,
      });
      toast.success('Game updated successfully');
      return redirect('/admin/manage-games');
    } catch (error) {
      console.error('Failed to update game:', error);
      toast.error('Failed to update game');
    }
  };

  return (
        <UpdateGameForm
            initialData={game}
            providers={providers}
            categories={categories}
            tags={tags}
            onSubmit={handleAddGame}
        />
  );
}
