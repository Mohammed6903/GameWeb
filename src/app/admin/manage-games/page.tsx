"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gamepad, Search, Plus, Edit } from 'lucide-react';
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
import { getPaginatedGames, deleteGame, getTotalGamesCount } from '@/lib/controllers/games';
import { FetchedGameData } from '@/types/games';
import { Pagination } from '@/components/pagination';
import { toast } from 'sonner';

export default function ManageGamesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState<FetchedGameData[]>([]);
  const [filteredGames, setFilteredGames] = useState<FetchedGameData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    loadGames();
  }, [currentPage]);

  async function loadGames() {
    setIsLoading(true);
    try {
      const fetchedGames = await getPaginatedGames(currentPage, pageSize);
      setGames(fetchedGames);
      setFilteredGames(fetchedGames);
      const totalCount = await getTotalGamesCount();
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = games.filter(game => 
      game.name.toLowerCase().includes(term)
    );
    
    setFilteredGames(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDeleteGame = async (gameId: string) => {
    const response = await deleteGame(gameId);
    if (response.status === 200) {
      loadGames();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
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
          {isLoading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <>
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
                        {game.thumbnail_url ? (
                          <img
                            src={game.thumbnail_url}
                            alt={`${game.name} thumbnail`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{game.name}</TableCell>
                      <TableCell>
                        <span
                          className={`
                            px-2 py-1 rounded text-xs font-semibold
                            ${(game.is_active)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }
                          `}
                        >
                          {game.is_active ? 'active' : 'inactive' }
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
                            gameTitle={game.name}
                            onDelete={() => handleDeleteGame(game.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl="/admin/manage-games"
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* No Results Handling */}
      {!isLoading && filteredGames.length === 0 && (
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