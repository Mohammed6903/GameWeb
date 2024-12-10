export interface Game {
    id: string
    title: string
    description: string
    thumbnail: string
    gameUrl: string
    categories: string[]
    platform: 'mobile' | 'desktop' | 'all'
  }
  
  export interface RelatedGame {
    id: string
    title: string
    thumbnail: string
    slug: string
  }