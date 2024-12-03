"use client"
import React, { useState } from 'react';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Game, GameFormData } from "@/types/games";
import { gameFormSchema, validateGameForm } from "@/lib/validation/gameValidation";
import { uploadGameThumbnail } from "@/lib/api/games";

interface GameFormProps {
  initialData?: Game;
  onSubmit: (data: GameFormData) => Promise<void>;
}

export function GameForm({ initialData, onSubmit }: GameFormProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnailUrl || null
  );

  const form = useForm<GameFormData>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      gameUrl: initialData.gameUrl,
      tags: initialData.tags || [],
      status: initialData.status || 'active'
    } : {
      title: '',
      description: '',
      gameUrl: '',
      tags: [],
      status: 'active'
    }
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
        form.setValue('thumbnailFile', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data: GameFormData) => {
    try {
      // Validate form data
      const validation = validateGameForm(data);
      if (!validation.success) {
        validation.error.errors.forEach(err => {
          form.setError(err.path[0] as keyof GameFormData, {
            type: 'manual',
            message: err.message
          });
        });
        return;
      }

      // Upload thumbnail if a new file is selected
      if (data.thumbnailFile) {
        const thumbnailUrl = await uploadGameThumbnail(data.thumbnailFile);
        data.thumbnailUrl = thumbnailUrl;
      }

      // Submit form data
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error (e.g., show error toast)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter game title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter game description" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gameUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/game" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select game status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-gray-50'>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Thumbnail</FormLabel>
          <FormControl>
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleThumbnailChange} 
            />
          </FormControl>
          {thumbnailPreview && (
            <img 
              src={thumbnailPreview} 
              alt="Thumbnail Preview" 
              className="mt-2 max-w-[200px] rounded"
            />
          )}
        </FormItem>

        <Button type="submit">
          {initialData ? 'Update Game' : 'Add Game'}
        </Button>
      </form>
    </Form>
  );
}