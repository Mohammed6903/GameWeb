import { GameForm } from '@/components/admin/GameForm';
import { addGame } from '@/lib/api/games';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { GameFormData } from '@/types/games';

export default function AddGamePage() {
  const handleAddGame = async (gameData: GameFormData) => {
    'use server';
    
    try {
      // const newGame = await addGame(gameData);
      
      // Show success toast and redirect
      toast.success('Game added successfully');
      redirect('/admin/manage-games');
    } catch (error) {
      // Handle error
      console.error('Failed to add game:', error);
      toast.error('Failed to add game');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Add New Game
      </h1>
      <GameForm onSubmit={handleAddGame} />
    </div>
  );
}