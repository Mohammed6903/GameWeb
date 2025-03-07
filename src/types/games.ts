export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnail_url?: string;
  play_url: string;
  tags?: string[];
  provider_id: string;
  categories: string[]
  status: "active" | "inactive";
  created_at?: Date;
  updated_at?: Date;
}

export interface RelatedGame {
  id: string
  name: string
  thumbnail: string
  slug: string
}

export interface GameBasicData {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  categories: string[];
  tags: string[];
}

export interface ExternalGame {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category?: string;
  categories?: string[];
  tags?: string;
  url: string;
}

export interface GameFormData extends Omit<Game, 'id' | 'createdAt' | 'updatedAt'> {
  thumbnailFile?: File;
}

export interface FetchedGameData extends Omit<Game, 'status'> {
  is_active: boolean;
}