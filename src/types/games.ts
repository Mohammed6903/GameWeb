export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  gameUrl: string;
  tags?: string[];
  providerId: string;
  categories: string[]
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}

export interface GameFormData extends Omit<Game, 'id' | 'createdAt' | 'updatedAt'> {
  thumbnailFile?: File;
}