export interface Game {
    id: string
    name: string
    description: string
    thumbnail: string
    play_url: string
    categories: string[]
    platform: 'mobile' | 'desktop' | 'all'
    title:string
    gameUrl:string
  }
  
  export interface RelatedGame {
    id: string
    name: string
    thumbnail: string
    slug: string
  }