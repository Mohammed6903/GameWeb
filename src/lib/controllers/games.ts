import { Game, GameFormData } from '@/types/games';
import { ApiClient } from '../utils/supabase/apiClient';
import { supabaseAdmin } from '../utils/supabase/admin';

// Mock games data
const mockGames: Game[] = [
  {
    id: '1',
    title: 'Space Invaders',
    description: 'Classic arcade space shooting game',
    gameUrl: 'https://example.com/space-invaders',
    thumbnailUrl: 'https://via.placeholder.com/150',
    status: 'active',
    tags: ['Arcade', 'Shooter'],
    categories: ['2 player games', 'game for kids'],
    providerId: '1',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: '2',
    title: 'Puzzle Master',
    description: 'Challenging puzzle game with multiple levels',
    gameUrl: 'https://example.com/puzzle-master',
    thumbnailUrl: 'https://via.placeholder.com/150',
    status: 'inactive',
    tags: ['Puzzle', 'Strategy'],
    categories: ['2 player games', 'game for kids'],
    providerId: '1',
    created_at: new Date(),
    updated_at: new Date()
  }
];

export async function addGame(gameData: GameFormData) {
  try{
    const { data, error } = await supabaseAdmin.from('games').insert({
      name: gameData.title,
      description: gameData.description,
      play_url: gameData.gameUrl,
      thumbnail_url: gameData.thumbnailUrl || null,
      is_active: (gameData.status === 'active' ? true : false),
      tags: gameData.tags,
      categories: gameData.categories,
      provider_id: Number(gameData.providerId),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).select();

    if (error) {
      throw new Error(`Error inserting game: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error('Error adding game:', err);
    throw err;
  }
}

export async function updateGame(
  gameId: string, 
  gameData: Partial<GameFormData>
): Promise<Game> {
  const gameIndex = mockGames.findIndex(game => game.id === gameId);
  if (gameIndex === -1) {
    throw new Error('Game not found');
  }

  mockGames[gameIndex] = {
    ...mockGames[gameIndex],
    ...gameData,
    thumbnailUrl: gameData.thumbnailFile 
      ? 'https://via.placeholder.com/150' 
      : mockGames[gameIndex].thumbnailUrl,
    updated_at: new Date()
  };

  return mockGames[gameIndex];
}

export async function deleteGame(gameId: string): Promise<void> {
  const index = mockGames.findIndex(game => game.id === gameId);
  if (index !== -1) {
    mockGames.splice(index, 1);
  }
}

export async function getAllGames(): Promise<Game[]> {
  return mockGames;
}

export async function getGameById(gameId: string): Promise<Game | null> {
  return mockGames.find(game => game.id === gameId) || null;
}

export async function getGameStats() {
  return {
    totalGames: mockGames.length,
    activeGames: mockGames.filter(game => game.status === 'active').length,
    inactiveGames: mockGames.filter(game => game.status === 'inactive').length
  };
}

export async function uploadGameThumbnail(file: File): Promise<string> {
  // Return a placeholder URL for mock implementation
  return 'https://via.placeholder.com/150';
}