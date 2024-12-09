"use client"
import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Gamepad, 
  Search, 
  Plus, 
  Edit, 
  // Trash2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DeleteGameDialog } from '@/components/admin/DeleteGameDialog';
import { getAllGames, deleteGame } from '@/lib/controllers/games';
import { Game } from '@/types/games';

export default function ManageGamesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = React.useState([] as Game[]);
  const [filteredGames, setFilteredGames] = React.useState([] as Game[]);

  React.useEffect(() => {
    async function loadGames() {
      const fetchedGames: Game[] = await getAllGames();
      setGames(fetchedGames);
      setFilteredGames(fetchedGames);
    }
    loadGames();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = games.filter(game => 
      game.title.toLowerCase().includes(term) ||
      game.status.toLowerCase().includes(term)
    );
    
    setFilteredGames(filtered);
  };

  const handleDeleteGame = async (gameId: string) => {
    await deleteGame(gameId);
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
    setFilteredGames(updatedGames);
  };

  return (
    <div className="space-y-6 p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Manage Games
      </h1>

      {/* Search and Add Game Section */}
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text"
            placeholder="Search games by title or status..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 w-full"
          />
        </div>
        <Link href="/admin/add-game">
          <Button 
            variant="default" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Game
          </Button>
        </Link>
      </div>

      {/* Games Table */}
      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center">
            <Gamepad className="mr-2 h-5 w-5 text-purple-500" />
            Game Catalog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>
                    {game.thumbnailUrl ? (
                      <img
                        src={game.thumbnailUrl}
                        alt={`${game.title} thumbnail`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{game.title}</TableCell>
                  <TableCell>
                    <span
                      className={`
                        px-2 py-1 rounded text-xs font-semibold
                        ${game.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {game.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/edit-game/${game.id}`}>
                        <Button variant="outline" size="sm" className="h-8 px-2">
                          <Edit className="mr-1 h-4 w-4" /> Edit
                        </Button>
                      </Link>
                      <DeleteGameDialog
                        gameId={game.id}
                        gameTitle={game.title}
                        onDelete={() => handleDeleteGame(game.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* No Results Handling */}
      {filteredGames.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No games found</p>
          <Link href="/admin/add-game">
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Your First Game
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}