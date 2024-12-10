// 'use client';

// import { useState, useEffect } from 'react';
// import { GameForm } from '@/components/admin/GameForm';
// import { updateGame } from '@/lib/controllers/games';
// // import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { Game, GameFormData } from '@/types/games';
// import { Provider } from '@/components/admin/ProviderForm';
// import { getAllProviders } from '@/lib/controllers/providers';
// import { getAllCategories } from '@/lib/controllers/categories';
// import { getAllTags } from '@/lib/controllers/tags';
// import { redirect } from 'next/navigation';

// export default function EditGameClient({ 
//   initialGame, 
//   gameId 
// }: { 
//   initialGame: Game, 
//   gameId: string
// }) {
//   const [providers, setProviders] = useState<Provider[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [tags, setTags] = useState<any[]>([]);
//   // const [initialGame, setInitialGame] = useState<Game>();
//   // const router = useRouter();

//   useEffect(() => {
//     const fetchAll = async () => {
//       const result = await getAllProviders();
//       setProviders(result);
//       const catRes = (await getAllCategories()).map(item => item.category);
//       setCategories(catRes);
//       const tagRes = (await getAllTags()).map(item => item.tag);
//       setTags(tagRes);
//       // const gameRes = 
//     }
//     fetchAll();
//   },[]);


//   useEffect(() => {
//     const fetchProviders = async () => {
//       const result = await getAllProviders();
//       setProviders(result);
//     }
//     fetchProviders();
//   },[]);

//   const handleUpdateGame = async (gameData: GameFormData) => {
//     try {
//       await updateGame(gameId, gameData);
      
//       // Show success toast and redirect
//       toast.success('Game updated successfully');
//       return redirect('/admin/manage-games');
//     } catch (error) {
//       // Handle error
//       console.error('Failed to update game:', error);
//       toast.error('Failed to update game');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white">
//       <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
//         Edit Game
//       </h1>
//       <GameForm
//         initialData={initialGame} 
//         onSubmit={handleUpdateGame}  
//         providers={providers} 
//         categories={categories}
//         tags={tags}
//       />
//     </div>
//   );
// }
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
    title: initialGame?.name,
    description: initialGame?.description,
    status: initialGame?.is_active ? 'active' : 'inactive',
    gameUrl: initialGame?.play_url,
    thumbnail_url: initialGame?.thumbnail_url,
    providerId: initialGame?.provider_id,
    categories: initialGame?.categories,
    tags: initialGame?.tags,
  });

  const handleAddGame = async (gameData: any) => {
    try {
      await axios.put(`http://localhost:8080/api/game/update/${game.id}`, {
        name: gameData.title,
        description: gameData.description,
        gameUrl: gameData.gameUrl,
        tags: gameData.tags,
        status: gameData.status,
        providerId: gameData.providerId,
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
