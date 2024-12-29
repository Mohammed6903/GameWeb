"use client"
import React from 'react';
import { Gamepad, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/useDashboardData';
import { QuickStatsCard } from '@/components/admin/QuickStatCard';
import { ChartCard } from '@/components/admin/ChartCard';
import { ApexOptions } from 'apexcharts';

const GameAnalyticsDashboard = () => {
  const {
    playsOverTimeSeries,
    categories,
    gameCategorySeries,
    gameCategoryLabels,
    gamesCount,
    newUsers,
    isLoading,
    error
  } = useDashboardData();

  const playsOverTimeOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      animations: {
        enabled: true,
        // easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    colors: ['#6366f1'],
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { 
      categories,
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        trim: true
      }
    },
    yaxis: {
      labels: {
        formatter: (value: any) => value.toString()
      }
    },
    // title: {
    //   text: 'Weekly Game Plays',
    //   style: { 
    //     fontSize: '16px', 
    //     fontWeight: 'bold',
    //     color: '#4a5568'
    //   }
    // },
    grid: {
      show: true,
      borderColor: '#f3f4f6',
      strokeDashArray: 4
    }
  };

  const gameCategoryOptions: ApexOptions = {
    chart: { 
      type: 'donut',
      animations: {
        enabled: true,
        speed: 500,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    labels: gameCategoryLabels,
    colors: ['#6366f1', '#10b981', '#f43f5e', '#f97316'],
    // title: {
    //   text: 'Game Categories',
    //   style: { 
    //     fontSize: '16px', 
    //     fontWeight: 'bold',
    //     color: '#4a5568'
    //   }
    // },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${Math.round(val)}%`
    }
  };

  const quickStats = [
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
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">Error loading dashboard data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickStats.map((stat) => (
          <QuickStatsCard key={stat.title} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {playsOverTimeSeries[0]?.data?.length > 0 && (
          <div className="p-4 border rounded-lg shadow-sm">
            <ChartCard
              title="Weekly Game Plays"
              options={playsOverTimeOptions}
              series={playsOverTimeSeries}
              type="line"
              height={350}
            />
          </div>
        )}
        
        {gameCategorySeries?.length > 0 && (
          <div className="p-4 border rounded-lg shadow-sm">
            <ChartCard
              title='Game Categories'
              options={gameCategoryOptions}
              series={gameCategorySeries}
              type="donut"
              height={350}
            />
          </div>
        )}
      </div>

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
};

export default GameAnalyticsDashboard;