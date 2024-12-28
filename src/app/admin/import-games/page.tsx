"use client"

import React, { useState, useEffect } from 'react';
import { Search, Save } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination } from '@/components/pagination';
import { toast, Toaster } from 'sonner';
import { getOrCreateProviderId } from '@/lib/utils/provider';
import { ExternalGame, translateGamesToFormData, translateToGameFormData } from '@/lib/utils/translator';
import { saveGames } from '@/lib/controllers/importGame';

interface Category {
  id: string;
  name: string;
}

export default function ImportGamesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allGames, setAllGames] = useState<ExternalGame[]>([]);
  const [displayedGames, setDisplayedGames] = useState<ExternalGame[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApi, setSelectedApi] = useState<'gamepix' | 'gamemonetize'>('gamepix');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set());
  const [provider, setProvider] = useState<string>('');
  const pageSize = 10;

  const gameMonetizeCategories = [
    ".IO", "2 Player", "3D", "Adventure", "Arcade", 
    "Bejeweled", "Boys", "Clicker", "Cooking", "Girls", "Hypercasual", 
    "Multiplayer", "Puzzle", "Racing", "Shooting", "Soccer", 
    "Sports", "Stickman", "Baby Hazel", "Action"
  ];

  useEffect(() => {
    const savedSelections = localStorage.getItem('selectedGames');
    if (savedSelections) {
      setSelectedGames(new Set(JSON.parse(savedSelections)));
    };

  }, []);

  useEffect(() => {
    localStorage.setItem('selectedGames', JSON.stringify(Array.from(selectedGames)));
  }, [selectedGames]);

  useEffect(() => {
    if (selectedApi === 'gamepix') {
      fetchGamePixCategories();
    } else {
      setCategories(gameMonetizeCategories.map((name, index) => ({ id: (index + 1).toString(), name })));
    }
  }, [selectedApi]);

  useEffect(() => {
    if (selectedApi) {
      fetchGames();
      updateDisplayedGames();
    }
  }, [selectedApi, selectedCategory]);

  useEffect(() => {
    updateDisplayedGames();
  }, [currentPage, searchTerm, allGames]);

  const updateDisplayedGames = () => {
    const filteredGames = searchTerm
      ? allGames.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : allGames;

    setTotalPages(Math.ceil(filteredGames.length / pageSize));
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedGames(filteredGames.slice(startIndex, endIndex));
  };

  const fetchGamePixCategories = async () => {
    try {
      const response = await fetch('https://games.gamepix.com/categories');
      const data = await response.json();
      if (data.status === 'success') {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching GamePix categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const fetchGames = async () => {
    setIsLoading(true);
    try {
        const providerId = await getOrCreateProviderId(selectedApi);
        setProvider(providerId);
        let url;
        if (selectedApi === 'gamepix') {
            url = selectedCategory
            ? `https://games.gamepix.com/games?category=${selectedCategory}&page=${currentPage}`
            : `https://games.gamepix.com/games?sid=1&order=q&page=${currentPage}`;
        } else {
            url = selectedCategory
            ? `https://gamemonetize.com/feed.php?format=0&category=${selectedCategory}&links=0`
            : `https://gamemonetize.com/feed.php?format=0&links=0`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        let formattedGames: ExternalGame[];
        if (selectedApi === 'gamepix') {
            formattedGames = data.data.map((game: any) => ({
              id: game.id,
              title: game.title,
              description: game.description,
              thumbnailUrl: game.thumbnailUrl,
              category: game.category,
              categories: game.categories,
              url: game.url
            }));
        } else {
            formattedGames = data.map((game: any) => ({
              id: game.id,
              title: game.title,
              description: game.description,
              thumbnailUrl: game.thumb,
              category: game.category,
              tags: game.tags,
              url: game.url
            }));
        }
        setAllGames(formattedGames);
              
    } catch (error) {
        console.error('Error fetching games:', error);
        toast.error('Failed to fetch games');
    } finally {
        setIsLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(selectedGames);
      displayedGames.forEach(game => newSelected.add(game.id));
      setSelectedGames(newSelected);
    } else {
      const newSelected = new Set(selectedGames);
      displayedGames.forEach(game => newSelected.delete(game.id));
      setSelectedGames(newSelected);
    }
  };

  const handleSelectGame = (gameId: string, checked: boolean) => {
    const newSelected = new Set(selectedGames);
    if (checked) {
      newSelected.add(gameId);
    } else {
      newSelected.delete(gameId);
    }
    setSelectedGames(newSelected);
  };

  const handleSaveGames = async (saveAll: boolean) => {
    const gamesToSave = saveAll 
      ? allGames
      : allGames.filter(game => selectedGames.has(game.id));
    
    const response = await saveGames(gamesToSave, provider);
    if (response.success){
      toast.success(`${saveAll ? 'All' : 'Selected'} games saved successfully`);
    } else if (response.error) {
      toast.error(response.message);
    }

    
    // Here you would typically send this data to your backend
    // const response = await fetch('/api/save-games', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(gamesToSave)
    // });
    // if (response.ok) {
    //   toast.success(`${saveAll ? 'All' : 'Selected'} games saved successfully`);
    // } else {
    //   toast.error('Failed to save games');
    // }
  };

  const areAllCurrentPageSelected = displayedGames.length > 0 && 
    displayedGames.every(game => selectedGames.has(game.id));

  return (
    <div className="space-y-6 p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Import Games
      </h1>

      <div className="flex justify-between items-center mb-6 space-x-4">
        <Select onValueChange={(value: 'gamepix' | 'gamemonetize') => setSelectedApi(value)} defaultValue='gamemonetize'>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select API" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="gamepix">GamePix</SelectItem>
            <SelectItem value="gamemonetize">GameMonetize</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text"
            placeholder="Search games by title..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Games Table */}
      <Card className="bg-gray-50 border-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center justify-between">
            <span>Game Catalog ({selectedGames.size} selected)</span>
            <div className="space-x-2">
              <Button 
                onClick={() => handleSaveGames(false)} 
                variant="outline"
                disabled={selectedGames.size === 0}
              >
                <Save className="mr-2 h-4 w-4" /> Save Selected
              </Button>
              <Button 
                onClick={() => handleSaveGames(true)} 
                className='bg-black text-white'
                disabled={allGames.length === 0}
              >
                <Save className="mr-2 h-4 w-4" /> Save All
              </Button>
            </div>
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
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={areAllCurrentPageSelected}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedGames.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedGames.has(game.id)}
                          onCheckedChange={(checked) => handleSelectGame(game.id, checked as boolean)}
                        />
                      </TableCell>
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
                      <TableCell>{game.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl="/admin/import-games"
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* No Results Handling */}
      {!isLoading && displayedGames.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No games found</p>
        </div>
      )}
      <Toaster position='bottom-right' />
    </div>
  );
}