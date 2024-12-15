import { getGameBySlug } from '@/lib/controllers/games'
import { getAuthenticatedUser } from '@/lib/controllers/users'
import GamePage from './clientPage';

export default async function ServerGamePage({ params }: { params: { slug: string } }) {
    const game = await getGameBySlug(params.slug);
    const user = await getAuthenticatedUser();

    return <GamePage game={game} user={user} />;
}