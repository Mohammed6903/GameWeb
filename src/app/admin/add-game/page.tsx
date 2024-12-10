"use client"

import { useEffect, useState } from 'react';
import { ProviderForm, ProviderFormData, Provider } from '@/components/admin/ProviderForm';
import { addProvider } from '@/lib/controllers/providers';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GameFormData } from '@/types/games';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateGameForm } from '@/components/admin/CreateGameForm';
import axios from 'axios';

export default function AddGamePage() {
  const [activeTab, setActiveTab] = useState('add-game');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAll = async () => {
      const result = await axios.get('http://localhost:8080/api/providers');
      setProviders(result.data.providers);
      const catRes = (await axios.get('http://localhost:8080/api/categories')).data.categories.map((item: any) => item.category);
      setCategories(catRes);
      const tagRes = (await axios.get('http://localhost:8080/api/tags')).data.tags.map((item: any) => item.tag);
      setTags(tagRes);
    }
    fetchAll();
  },[]);

  const handleAddGame = async (gameData: GameFormData) => {
    try {
      await axios.post(`http://localhost:8080/api/game/create`, {
        name: gameData.title,
        description: gameData.description,
        gameUrl: gameData.gameUrl,
        tags: gameData.tags,
        status: gameData.status,
        providerId: gameData.providerId,
        thumbnailUrl: gameData.thumbnail_url,
        categories: gameData.categories,
      })
      toast.success('Game added successfully');
      router.push('/admin/manage-games');
    } catch (error) {
      console.error('Failed to add game:', error);
      toast.error('Failed to add game');
    }
  };

  const handleAddProvider = async (providerData: ProviderFormData) => {
    try {
      const newProvider = await addProvider(providerData);
      toast.success('Provider added successfully');
      setActiveTab('add-game');
    } catch (error) {
      console.error('Failed to add provider:', error);
      toast.error('Failed to add provider');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Game Management
      </h1>
      
      <Card className="bg-white shadow-lg rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-game">Add New Game</TabsTrigger>
            <TabsTrigger value="add-provider">Create New Provider</TabsTrigger>
          </TabsList>
          <CardContent className="p-6">
            <TabsContent value="add-game">  
              <CreateGameForm onSubmit={handleAddGame} providers={providers} categories={categories} tags={tags} />
            </TabsContent>
            <TabsContent value="add-provider">
              <ProviderForm onSubmit={handleAddProvider} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}