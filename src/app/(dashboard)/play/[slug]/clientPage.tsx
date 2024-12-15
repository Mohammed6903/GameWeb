'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CommentSection } from '@/components/comment';
import { RelatedGames } from './relatedgame';
import { GameViewer } from '@/components/game-viewer';
import { ArrowLeft, ThumbsUp, ThumbsDown, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { dislikeGame, getLikedOrDisliked, likeGame } from '@/lib/controllers/like';
import { useEffect, useState } from 'react';

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
}

export default function GamePage({ game, user }: GamePageProps) {
    const [like, setLike] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            if (user) {
                const response = await getLikedOrDisliked(game.id, user.id);
                setLike(response?.is_like);
            }
        }
        fetchStatus();
    }, [like]);

    const likeHandler = async () => {
        if (user) {
            const response = await likeGame(game.id, user.id);
            if (response?.status === 200) {
                setLike(true);
            }
        } else {
            toast('Sign in to like games');
        }
    }

    const dislikeHandler = async () => {
        if (user) {
            const response = await dislikeGame(game.id, user.id);
            if (response?.status === 200) {
                setLike(false);
            }
        } else {
            toast('Sign in to dislike games');
        }
    }

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
                                    onClick={async () => {
                                        await likeHandler()
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className={`text-black bg-white hover:bg-purple-700 hover:text-white ${like ? "bg-purple-700 text-white" : ""}`}
                                >
                                    <ThumbsUp className="h-5 w-5" />
                                </Button>
                                <Button
                                    onClick={async () => {
                                        await dislikeHandler()
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className={`text-black bg-white hover:bg-purple-700 hover:text-white ${like ? "" : "bg-purple-700 text-white"}`}
                                >
                                    <ThumbsDown className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Game Viewer */}
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-800/50">
                            <GameViewer play_url={game.play_url} thumbnail={game.thumbnail_url} />
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

                        {/* Comments Section */}
                        <div>
                            <CommentSection gameId={game.id} />
                        </div>
                    </div>

                    {/* Related Games Sidebar */}
                    <div className="lg:col-span-1">
                        <RelatedGames categories={game.categories} />
                    </div>
                </div>
            </div>
        </div>
    );
}