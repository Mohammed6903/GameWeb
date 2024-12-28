"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { createClient } from "@/lib/utils/supabase/client";
import { ApexOptions } from 'apexcharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Gamepad, 
  Users, 
  CheckCircle, 
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { fetchWeeklyGamePlays, getActiveGamesCount, getTotalGamesCount } from '@/lib/controllers/games';
import { getUsedCategories } from '@/lib/controllers/categories';
import { getNewUsersCount } from '@/lib/controllers/analytics';
 
// Dynamically import ApexCharts to ensure client-side rendering
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function GameAnalyticsDashboard() {
  const [playsOverTimeSeries, setPlaysOverTimeSeries] = useState<[{name: string, data: number[]}]>([{ name: 'Game Plays', data: [] }]);
  const [categories, setCategories] = useState<string[]>([]);
  const [gameCategorySeries, setGameCategorySeries] = useState<number[]>([]);
  const [gameCategoryLabels, setGameCategoryLabels] = useState<string[]>([]);
  const [gamesCount, setGamesCount] = useState<{totalCount: number, activeCount: number}>({totalCount: 0, activeCount: 0});
  const [newUsers, setNewUsers] = useState<number>(0);
  const router = useRouter();
  const supabase = createClient();
  const [confirmedUser, setConfirmed] = useState(false);

  useEffect(() => {
    async function loadData() {
      const weeklyData = await fetchWeeklyGamePlays();

      // Transform the data for ApexCharts
      const categories = weeklyData.map((d) => d.date);
      const data = weeklyData.map((d) => d.totalPlays);

      setCategories(categories);
      setPlaysOverTimeSeries([{ name: 'Game Plays', data }]);
    }

    async function loadCategoryData() {
      const categoriesData = await getUsedCategories();
      const labels = categoriesData.map((item) => item.category);
      const series = categoriesData.map((item) => item.count);

      setGameCategoryLabels(labels);
      setGameCategorySeries(series);
    }

    async function loadTotalCounts() {
      const totalCount = await getTotalGamesCount();
      const activeCount = await getActiveGamesCount();
      if (totalCount && activeCount) {
        setGamesCount({totalCount, activeCount});
      }
    }

    async function getNewUsers() {
      const count = await getNewUsersCount();
      if (count) {
        setNewUsers(count);
      }
    }

    loadData();
    loadCategoryData();
    loadTotalCounts();
    getNewUsers()
  }, []);

  const playsOverTimeOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false }
    },
    colors: ['#6366f1'], // Indigo color
    stroke: { curve: 'smooth' },
    xaxis: {
      categories
    },
    title: {
      // text: 'Daily Game Plays',
      style: { 
        fontSize: '16px', 
        fontWeight: 'bold',
        color: '#4a5568'
      }
    }
  };

  // Game Category Distribution
  const gameCategoryOptions: ApexOptions = {
    chart: { 
      type: 'donut' 
    },
    labels: gameCategoryLabels,
    colors: ['#6366f1', '#10b981', '#f43f5e', '#f97316'],
    title: {
      // text: 'Game Category Distribution',
      style: { 
        fontSize: '16px', 
        fontWeight: 'bold',
        color: '#4a5568'
      }
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (!session?.user.email) {
          router.push('/sign-in');
        }

        const confirmed = session?.user.user_metadata.email_verified;
  
        if (!confirmed && session?.user.email) {
          console.log('Sending verification email');
          const { error } = await supabase.auth.resend({
            type: 'signup',
            email: session.user.email,
            options: {
              emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            }
          });
  
          if (error) {
            console.error('Verification email resend error:', error);
          } else {
            console.log('Verification email resent successfully');
          }
        } else {
          setConfirmed(true);
        }  
      } catch (error) {
        console.error('Unexpected error in checkUser:', error);
        router.push('/sign-in');
      }
    };
    
    checkUser();
  }, [router, supabase.auth]);

  return (
    <div className="space-y-6 p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Analytics Dashboard
      </h1>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { 
            title: 'Total Games', 
            value: gamesCount.totalCount, 
            icon: Gamepad, 
            color: 'text-blue-500',
            bg: 'bg-blue-50'
          },
          { 
            title: 'Active Games', 
            value: gamesCount.activeCount, 
            icon: CheckCircle, 
            color: 'text-green-500',
            bg: 'bg-green-50'
          },
          { 
            title: 'Unique Players', 
            value: newUsers, 
            icon: Users, 
            color: 'text-purple-500',
            bg: 'bg-purple-50'
          }
        ].map((card) => (
          <Card key={card.title} className={`${card.bg} border-none`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Game Plays Over Time */}
        <Card className="bg-gray-50 border-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Weekly Game Plays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              options={playsOverTimeOptions}
              series={playsOverTimeSeries}
              type="line"
              height={300}
            />
          </CardContent>
        </Card>

        {/* Game Category Distribution */}
        <Card className="bg-gray-50 border-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Game Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart 
              options={gameCategoryOptions} 
              series={gameCategorySeries} 
              type="donut" 
              height={300} 
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link href="/admin/add-game">
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Add New Game
            </Button>
          </Link>
          <Link href="/admin/manage-games">
            <Button variant="outline">Manage Games</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}