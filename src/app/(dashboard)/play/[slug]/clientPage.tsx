'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CommentSection } from '@/components/comment';
import { GameViewer } from '@/components/game-viewer';
import { GamePageAd } from '@/components/adSense/GamePageAds';
import { ArrowLeft, ThumbsUp, ThumbsDown, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { dislikeGame, getLikedOrDisliked, likeGame } from '@/lib/controllers/like';
import { useEffect, useState } from 'react';

interface AdSettings {
  google_client_id: string;
  carousel_ad_frequency: number;
  carousel_ad_slot: string;
  carousel_ad_format: string;
  carousel_ad_full_width: boolean;
  sidebar_ad_slot: string;
  sidebar_ad_format: string;
  sidebar_ad_full_width: boolean;
  game_view_ad_slot: string;
  game_view_ad_format: string;
  game_view_ad_full_width: boolean;
  comment_section_ad_slot: string;
  comment_section_ad_format: string;
  comment_section_ad_full_width: boolean;
  show_carousel_ads: boolean;
  show_sidebar_ads: boolean;
  show_game_view_ads: boolean;
  show_comment_section_ads: boolean;
  sidebar_ad_count: number;
}

interface GamePageProps {
  game: {
    id: number;
    name: string;
    description: string;
    play_url: string;
    thumbnail_url: string;
    categories: string[];
    tags: string[];
  };
  user: { id: string } | null;
  adSetting: AdSettings;
}

export default function GamePage({ game, user, adSetting }: GamePageProps) {
  const [like, setLike] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (user) {
        const response = await getLikedOrDisliked(game.id, user.id);
        setLike(response?.is_like);
      }
    };
    fetchStatus();
  }, [game.id, user]);

  const likeHandler = async () => {
    if (user) {
      const response = await likeGame(game.id, user.id);
      if (response?.status === 200) {
        setLike(true);
      }
    } else {
      toast('Sign in to like games');
    }
  };

  const dislikeHandler = async () => {
    if (user) {
      const response = await dislikeGame(game.id, user.id);
      if (response?.status === 200) {
        setLike(false);
      }
    } else {
      toast('Sign in to dislike games');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120a2c] to-[#1e1540] text-white p-6 md:p-8 lg:p-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Game Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Game Header */}
            <div className="flex justify-between items-center">
              <Link href="/">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                {game.name}
              </h1>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={likeHandler}
                  variant="outline"
                  size="icon"
                  className={`text-black bg-white hover:bg-purple-700 hover:text-white ${like ? "bg-purple-700 text-white" : ""}`}
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <Button
                  onClick={dislikeHandler}
                  variant="outline"
                  size="icon"
                  className={`text-black bg-white hover:bg-purple-700 hover:text-white ${(like === false) ? "bg-purple-700 text-white" : ""}`}
                >
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {adSetting.show_game_view_ads && (
              <GamePageAd
                adSlot={adSetting.game_view_ad_slot}
                adFormat={adSetting.game_view_ad_format}
                dataFullWidthResponsive={adSetting.game_view_ad_full_width}
                className="mb-6"
              />
            )}

            {/* Game Viewer */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-800/50">
              <GameViewer play_url={game.play_url} thumbnail={game.thumbnail_url} game_id={game.id} />
            </div>

            {/* Game Details */}
            <Card className="bg-[#2a1b52]/70 backdrop-blur-md border-none rounded-2xl shadow-xl">
              <CardHeader className="border-b border-purple-800/30 pb-4">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                  Game Description
                </h2>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">{game.description}</p>

                {/* Categories and Metadata */}
                <div className="flex flex-wrap gap-3 items-center">
                  {game.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-700/30 text-purple-300 hover:bg-purple-700/50 transition-colors border border-purple-700/50"
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      {category}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ad space before Comments Section */}
            {adSetting.show_comment_section_ads && (
              <GamePageAd
                adSlot={adSetting.comment_section_ad_slot}
                adFormat={adSetting.comment_section_ad_format}
                dataFullWidthResponsive={adSetting.comment_section_ad_full_width}
                className="my-6"
              />
            )}

            {/* Comments Section */}
            <div id="commentSection">
              <CommentSection gameId={game.id} />
            </div>
          </div>

          {/* Sidebar Ads */}
          {adSetting.show_sidebar_ads && (
            <div className="lg:col-span-1 space-y-6">
              {Array.from({ length: adSetting.sidebar_ad_count }).map((_, index) => (
                <GamePageAd
                  key={`sidebar-ad-${index}`}
                  adSlot={adSetting.sidebar_ad_slot}
                  adFormat={adSetting.sidebar_ad_format}
                  dataFullWidthResponsive={adSetting.sidebar_ad_full_width}
                  className="sticky top-6"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}