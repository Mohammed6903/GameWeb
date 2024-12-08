// src/lib/api/games.ts
import { Game, GameFormData } from '@/types/games';

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
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Puzzle Master',
    description: 'Challenging puzzle game with multiple levels',
    gameUrl: 'https://example.com/puzzle-master',
    thumbnailUrl: 'https://via.placeholder.com/150',
    status: 'inactive',
    tags: ['Puzzle', 'Strategy'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function addGame(gameData: GameFormData): Promise<Game> {
  const newGame: Game = {
    id: (mockGames.length + 1).toString(),
    ...gameData,
    thumbnailUrl: gameData.thumbnailFile 
      ? 'https://via.placeholder.com/150' 
      : undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockGames.push(newGame);
  return newGame;
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
    updatedAt: new Date()
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