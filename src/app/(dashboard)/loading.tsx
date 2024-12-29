import React from 'react';
import { Gamepad2, Laptop2, Users2, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const WelcomeSkeleton = () => (
  <div className="bg-gradient-to-br from-purple-700/50 to-purple-900/50 rounded-3xl p-4 animate-pulse">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20" />
        <div>
          <div className="h-8 w-48 bg-white/20 rounded-lg" />
          <div className="h-4 w-36 bg-white/20 rounded-lg mt-2" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-32 bg-white/20 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

export const FeaturedGamesSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="h-48 bg-white/5 rounded-3xl animate-pulse" />
    ))}
  </div>
);

export const CategorySkeleton = () => (
  <div className="space-y-4">
    <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 bg-white/5 rounded-3xl animate-pulse" />
      ))}
    </div>
  </div>
);

export const GamesCarouselSkeleton = () => {
  const getGridColumns = () => {
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className={`grid ${getGridColumns()} gap-4`}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card 
            key={index}
            className="relative overflow-hidden rounded-xl bg-white/5 border-transparent"
          >
            <div className="aspect-square relative">
              <div className="w-full h-full bg-white/5 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end">
                <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse mb-2" />
                <div className="flex gap-1">
                  <div className="h-6 w-16 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-white/10 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto p-6 md:p-8 lg:p-12 space-y-12">
        {/* Welcome Section */}
        <WelcomeSkeleton />

        {/* Featured Games */}
        <section>
          <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse mb-6" />
          <FeaturedGamesSkeleton />
        </section>

        {/* Categories */}
        {[1, 2, 3].map((i) => (
          <section key={i} className="scroll-mt-20">
            <CategorySkeleton />
          </section>
        ))}
      </div>
    </div>
  );
}