// 'use client';
import { BaseGameForm } from './BaseGameForm';
import { GameFormData } from '@/types/games';
import { Provider } from '@/components/admin/ProviderForm';

interface CreateGameFormProps {
  providers: Provider[];
  categories: string[];
  tags: string[];
  onSubmit: (data: GameFormData) => Promise<void>;
}

export function CreateGameForm({ providers, categories, tags, onSubmit }: CreateGameFormProps) {
  return (
    <BaseGameForm
      initialData={{}}
      providers={providers}
      categories={categories}
      tags={tags}
      onSubmit={onSubmit}
      submitButtonText="Add Game"
    />
  );
}