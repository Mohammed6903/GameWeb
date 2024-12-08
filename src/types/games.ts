export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  gameUrl: string;
  tags?: string[];
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GameFormData extends Omit<Game, 'id' | 'createdAt' | 'updatedAt'> {
  thumbnailFile?: File;
}