"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from 'lucide-react';
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

interface Game {
  id: number;
  name: string;
  categories: string[];
  tags: string[];
}

interface GroupedGames {
  [key: string]: Game[];
}

export function GameSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [groupedGames, setGroupedGames] = useState<GroupedGames>({});
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const fetchGames = useCallback(async () => {
    const { data, error } = await supabase
      .from('games')
      .select('id, name, categories, tags').eq('is_active', true);

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      setGames(data || []);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    const filtered = games.filter(game => {
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      const nameMatch = game.name.toLowerCase().includes(searchLower);
      const categoryMatch = game.categories?.some(
        category => category.toLowerCase().includes(searchLower)
      );
      const tagMatch = game.tags?.some(
        tag => tag.toLowerCase().includes(searchLower)
      );

      return nameMatch || categoryMatch || tagMatch;
    });

    const grouped = filtered.reduce((acc, game) => {
      if (!game.categories || game.categories.length === 0) {
        const category = 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(game);
      } else {
        game.categories.forEach(category => {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(game);
        });
      }
      return acc;
    }, {} as GroupedGames);

    setFilteredGames(filtered);
    setGroupedGames(grouped);
  }, [searchTerm, games]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const navigateToCategory = (category: string) => {
    const sectionId = category.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  // Hide search results on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative group" ref={searchRef}>
      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-focus-within:text-white/70" />
      <Input
        placeholder="Search games by name, category, or tags..."
        className="h-9 w-full pl-9 bg-white/10 border-transparent text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/20"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg">
          <ScrollArea className="h-[300px]">
            {Object.entries(groupedGames).map(([category, categoryGames]) => (
              <div 
                key={category}
                className="px-2"
              >
                <div className="sticky top-0 bg-gray-50 px-4 py-2 font-semibold text-sm text-gray-500">
                  {category} ({categoryGames.length})
                </div>
                <div className="space-y-1">
                  {categoryGames.map((game, index) => (
                    <Button
                      key={`${game.id}-${index}`}
                      variant="ghost"
                      className="w-full justify-start text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        navigateToCategory(game.categories[0] || 'Uncategorized');
                      }}
                    >
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-black">{game.name}</span>
                          {game.tags && game.tags.length > 0 && (
                            <span className="text-xs text-gray-400">
                              {game.tags.slice(0, 3).join(' • ')}
                              {game.tags.length > 3 && ' ...'}
                            </span>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}