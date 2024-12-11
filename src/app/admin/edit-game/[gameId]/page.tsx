import { redirect } from 'next/navigation';
import { getAllProviders } from '@/lib/controllers/providers';
import { getAllCategories } from '@/lib/controllers/categories';
import { getAllTags } from '@/lib/controllers/tags';
import axios from 'axios';
import EditGameClient from './EditGameClient'; // Move client logic here
import { Card, CardContent } from '@/components/ui/card';

export default async function EditGamePage({ 
  params 
}: { 
  params: { gameId: string } 
}) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/game/byId/${params.gameId}`);
    const gameById = response.data.game;

    const providers = (await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/providers`)).data.providers;
    const categories = (await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`)).data.categories.map((item: any) => item.category);
    const tags = (await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tags`)).data.tags.map((item: any) => item.tag);

    if (!gameById) {
      return redirect('/admin/manage-games');
    }

    return (
      <div className="max-w-2xl mx-auto m-12 p-6 bg-white">
        <Card className="bg-white shadow-lg rounded-lg">
          <CardContent  className="p-6">
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                  Edit Game
              </h1>
              <EditGameClient
                initialGame={gameById}
                providers={providers}
                categories={categories}
                tags={tags}
              />
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch game data:', error);
    return redirect('/admin/manage-games');
  }
}
