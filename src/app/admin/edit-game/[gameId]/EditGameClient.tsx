'use client';

import { useState } from 'react';
import { GameForm } from '@/components/admin/GameForm';
import { updateGame } from '@/lib/api/games';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Game, GameFormData } from '@/types/games';

export default function EditGameClient({ 
  initialGame, 
  gameId 
}: { 
  initialGame: Game, 
  gameId: string 
}) {
  const router = useRouter();

  const handleUpdateGame = async (gameData: GameFormData) => {
    try {
      await updateGame(gameId, gameData);
      
      // Show success toast and redirect
      toast.success('Game updated successfully');
      router.push('/admin/manage-games');
    } catch (error) {
      // Handle error
      console.error('Failed to update game:', error);
      toast.error('Failed to update game');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Edit Game
      </h1>
      <GameForm 
        initialData={initialGame} 
        onSubmit={handleUpdateGame}  
      />
    </div>
  );
}