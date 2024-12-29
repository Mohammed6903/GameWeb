// import { getGameBySlug } from '@/lib/controllers/games'
// import { getAuthenticatedUser } from '@/lib/controllers/users'
// import GamePage from './clientPage';
// import { getAdSettings } from '@/lib/controllers/ads';

// export default async function ServerGamePage({ params }: { params: { slug: string } }) {
//     const game = await getGameBySlug(params.slug);
//     const user = await getAuthenticatedUser();
//     const response = await getAdSettings();
//     return <GamePage game={game} user={user} adSetting={response.data}/>;
// }

import { Suspense } from 'react';
import { getGameBySlug } from '@/lib/controllers/games';
import { getAuthenticatedUser } from '@/lib/controllers/users';
import { getAdSettings } from '@/lib/controllers/ads';
import dynamic from 'next/dynamic';
import Loading from './loading';

const GamePage = dynamic(() => import('./clientPage'), {
  loading: () => <Loading />
});

export default async function ServerGamePage({ params }: { params: { slug: string } }) {
  const [game, user, adResponse] = await Promise.all([
    getGameBySlug(params.slug),
    getAuthenticatedUser(),
    getAdSettings()
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <GamePage 
        game={game} 
        user={user} 
        adSetting={adResponse.data}
      />
    </Suspense>
  );
}