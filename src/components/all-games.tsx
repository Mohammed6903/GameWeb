"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { FetchedGameData } from '@/types/games'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AdBanner from '@/components/adSense/AdBanner'

interface GamesCarouselProps {
  games: FetchedGameData[]
  adFrequency?: number // Number of games between each ad
}

export function AllGames({ games, adFrequency = 3 }: GamesCarouselProps) {
  const [cardsToShow, setCardsToShow] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Calculate cards to show based on screen width
  useEffect(() => {
    const calculateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;      // Mobile: 1 card
      if (width < 768) return 2;      // Small tablets: 2 cards
      if (width < 1024) return 3;     // Tablets: 3 cards
      if (width < 1280) return 4;     // Laptops: 4 cards
      if (width < 1536) return 5;     // Large laptops: 5 cards
      return 6;                       // Desktops: 6 cards
    };

    setCardsToShow(calculateCardsToShow());

    const handleResize = () => {
      setCardsToShow(calculateCardsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openGame = (gameId: string) => {
    router.push(`/play/${gameId}`);
  }

  const paginate = (direction: number) => {
    const maxIndex = games.length + Math.floor(games.length / adFrequency);
    
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + (direction * cardsToShow);
      
      // Wrap around logic
      if (newIndex < 0) return maxIndex - (maxIndex % cardsToShow || cardsToShow);
      if (newIndex >= maxIndex) return 0;
      
      return newIndex;
    });
  }

  // Prepare visible games with proper wrapping and ad insertion
  const prepareVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < cardsToShow; i++) {
      const itemIndex = (currentIndex + i) % (games.length + Math.floor(games.length / adFrequency));
      const gameIndex = itemIndex - Math.floor(itemIndex / (adFrequency + 1));
      
      if (itemIndex > 0 && itemIndex % (adFrequency + 1) === 0) {
        // Insert ad
        visibleItems.push({ type: 'ad', id: `ad-${itemIndex}` });
      } else {
        // Insert game
        visibleItems.push({ type: 'game', game: games[gameIndex] });
      }
    }
    return visibleItems;
  }

  const visibleItems = prepareVisibleItems();

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 z-10 flex items-center justify-between w-full pointer-events-none">
        <motion.button
          className="pointer-events-auto bg-white/20 rounded-full p-2 hover:bg-white/30 transition"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="text-white" />
        </motion.button>
        <motion.button
          className="pointer-events-auto bg-white/20 rounded-full p-2 hover:bg-white/30 transition"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="text-white" />
        </motion.button>
      </div>

      {/* Carousel Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {visibleItems.map((item, index) => (
          <motion.div
            key={item.type === 'ad' ? item.id : item.game && item.game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {item.type === 'ad' ? (
              <Card className="aspect-square relative overflow-hidden rounded-xl bg-white/5 border-transparent">
                <AdBanner
                  dataAdSlot="8349769512"
                  dataAdFormat="fluid"
                  dataFullWidthResponsive={true}
                />
              </Card>
            ) : (
              <Card 
                className="group relative overflow-hidden rounded-xl bg-white/5 border-transparent hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => {(item.game) && openGame( item.game.id)}}
              >
                  {item.game && (
                    <div className="aspect-square relative">
                      <Image
                        src={item.game && item.game.thumbnail_url || '/placeholder.png'}
                        alt={item.game.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16.6vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end">
                        <h3 className="text-sm font-semibold mb-1 line-clamp-2">{item.game.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          {item.game.categories.slice(0, 2).map((category, i) => (
                            <span key={i} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    )
                  }
              </Card>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}