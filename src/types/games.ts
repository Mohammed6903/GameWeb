export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  gameUrl: string;
  tags?: string[];
  providerId: string;
  categories: string[]
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}

export interface RelatedGame {
  id: string
  title: string
  thumbnail: string
  slug: string
}

export interface GameFormData extends Omit<Game, 'id' | 'createdAt' | 'updatedAt'> {
  thumbnailFile?: File;
}