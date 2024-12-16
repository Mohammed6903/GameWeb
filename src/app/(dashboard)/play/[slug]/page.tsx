import { getGameBySlug } from '@/lib/controllers/games'
import { getAuthenticatedUser } from '@/lib/controllers/users'
import GamePage from './clientPage';
import { getAdSettings } from '@/lib/controllers/ads';

export default async function ServerGamePage({ params }: { params: { slug: string } }) {
    const game = await getGameBySlug(params.slug);
    const user = await getAuthenticatedUser();
    const response = await getAdSettings();
    return <GamePage game={game} user={user} adSetting={response.data}/>;
}