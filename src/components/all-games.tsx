"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { FetchedGameData } from '@/types/games'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AdBanner from '@/components/adSense/AdBanner'
import { getAdSettings } from '@/lib/controllers/ads'

interface AdSettings {
  google_client_id: string;
  carousel_ad_frequency: number;
  carousel_ad_slot: string;
  carousel_ad_format: string;
  carousel_ad_full_width: boolean;
  show_carousel_ads: boolean;
}

interface GamesCarouselProps {
  games: FetchedGameData[]
}

export function AllGames({ games }: GamesCarouselProps) {
  const [cardsToShow, setCardsToShow] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [adSettings, setAdSettings] = useState<AdSettings | null>(null);
  const router = useRouter();

  // Calculate optimal layout based on screen width and available games
  useEffect(() => {
    const fetchAndSet = async () => {
      const {data, error} = await getAdSettings();
      if (data) {
        setAdSettings(data as AdSettings);
      }
    }
    fetchAndSet();

    const calculateOptimalLayout = () => {
      const width = window.innerWidth;
      let defaultCards;
      if (width < 640) defaultCards = 1;      
      else if (width < 768) defaultCards = 2;
      else if (width < 1024) defaultCards = 3;     
      else if (width < 1280) defaultCards = 4;     
      else if (width < 1536) defaultCards = 5;
      else defaultCards = 6;

      // Adjust cards to show based on available games
      const totalItems = getTotalItems();
      if (totalItems < defaultCards) {
        return Math.max(1, totalItems);
      }
      return defaultCards;
    };

    setCardsToShow(calculateOptimalLayout());
    setCurrentIndex(0);

    const handleResize = () => {
      setCardsToShow(calculateOptimalLayout());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [games]);

  const openGame = (gameId: string) => {
    router.push(`/play/${gameId}`);
  }

  const getTotalItems = () => {
    if (!adSettings?.show_carousel_ads) return games.length;
    const adCount = Math.floor(games.length / (adSettings.carousel_ad_frequency || 3));
    return games.length + adCount;
  }

  const shouldShowNavigation = () => {
    const totalItems = getTotalItems();
    return totalItems > cardsToShow;
  }

  const paginate = (direction: number) => {
    const totalItems = getTotalItems();
    if (totalItems <= cardsToShow) return;

    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + (direction * cardsToShow);
      if (newIndex < 0) {
        const lastPageItems = totalItems % cardsToShow;
        return lastPageItems ? totalItems - lastPageItems : totalItems - cardsToShow;
      }
      if (newIndex >= totalItems) return 0;
      return newIndex;
    });
  }

  const prepareVisibleItems = () => {
    if (!adSettings) return games.slice(currentIndex, currentIndex + cardsToShow).map(game => ({ type: 'game', game }));

    const { show_carousel_ads, carousel_ad_frequency } = adSettings;
    const visibleItems = [];
    const totalItems = getTotalItems();
    
    for (let i = 0; i < Math.min(cardsToShow, totalItems); i++) {
      const itemIndex = (currentIndex + i) % totalItems;
      const gameIndex = itemIndex - Math.floor(itemIndex / (carousel_ad_frequency + 1));
      
      if (show_carousel_ads && itemIndex > 0 && itemIndex % (carousel_ad_frequency + 1) === 0) {
        visibleItems.push({ type: 'ad', id: `ad-${itemIndex}` });
      } else if (gameIndex < games.length) {
        visibleItems.push({ type: 'game', game: games[gameIndex] });
      }
    }
    return visibleItems;
  }

  const getContainerClasses = () => {
    if (games.length === 1) {
      return 'max-w-2xl mx-auto px-4'; // Centered, narrower container for single game
    }
    return 'max-w-7xl mx-auto px-4'; // Full width for multiple games
  }

  const getGridColumns = () => {
    const totalItems = getTotalItems();
    const columns = Math.min(cardsToShow, totalItems);
    
    if (games.length === 1) {
      return 'grid-cols-1'; // Single column for single game
    }
    
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
    }
  }

  const getSingleGameCardClasses = () => {
    if (games.length === 1) {
      return "group relative overflow-hidden rounded-xl bg-white/5 border-transparent hover:bg-white/10 transition-all duration-300 cursor-pointer aspect-video"; // 16:9 aspect ratio for single game
    }
    return "group relative overflow-hidden rounded-xl bg-white/5 border-transparent hover:bg-white/10 transition-all duration-300 cursor-pointer";
  }

  const getImageContainerClasses = () => {
    if (games.length === 1) {
      return "relative w-full h-full"; // Full height/width for single game
    }
    return "aspect-square relative"; // Square aspect for multiple games
  }

  const visibleItems = prepareVisibleItems();
  const showNavigation = shouldShowNavigation();

  if (games.length === 0) return null;

  return (
    <div className={`relative w-full ${getContainerClasses()}`}>
      {showNavigation && (
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
      )}

      <div className={`grid ${getGridColumns()} gap-4`}>
        {visibleItems.map((item, index) => (
          <motion.div
            key={`${item.type}-${item.type === 'ad' ? item.id : item.game && item.game.id}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {item.type === 'ad' && adSettings ? (
              <Card className="aspect-square relative overflow-hidden rounded-xl bg-white/5 border-transparent">
                <AdBanner
                  pubId={adSettings.google_client_id}
                  dataAdSlot={adSettings.carousel_ad_slot}
                  dataAdFormat={adSettings.carousel_ad_format}
                  dataFullWidthResponsive={adSettings.carousel_ad_full_width}
                />
              </Card>
            ) : (
              <Card 
                className={getSingleGameCardClasses()}
                onClick={() => (item.game && openGame(item.game.id))}
              >
                {item.game && (
                  <div className={getImageContainerClasses()}>
                    <Image
                      src={item.game.thumbnail_url || '/placeholder.png'}
                      alt={item.game.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes={games.length === 1 ? "100vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16.6vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end">
                      <h3 className={`font-semibold mb-1 line-clamp-2 ${games.length === 1 ? 'text-xl' : 'text-sm'}`}>
                        {item.game.name}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {item.game.categories.slice(0, games.length === 1 ? 3 : 2).map((category, i) => (
                          <span key={i} className={`bg-white/20 px-2 py-1 rounded-full ${games.length === 1 ? 'text-sm' : 'text-xs'}`}>
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}