"use client";
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
import { uploadGameThumbnail } from "@/lib/controllers/games";
import { Badge } from "@/components/ui/badge";
import { X, Search } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommandList } from 'cmdk';
import { ScrollArea } from '../ui/scroll-area';
import { Provider } from './ProviderForm';

interface GameFormProps {
  initialData?: Game;
  providers: Provider[];
  categories: string[];
  onSubmit: (data: GameFormData) => Promise<void>;
}

export function GameForm({ initialData, providers = [], categories = [], onSubmit }: GameFormProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnailUrl || null
  );
  const [openCategory, setOpenCategory] = useState(false);
  const [openProvider, setOpenProvider] = useState(false);

  const form = useForm<GameFormData>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          gameUrl: initialData.gameUrl,
          tags: initialData.tags || [],
          status: initialData.status || "active",
          providerId: initialData.providerId,
          categories: initialData.categories || [],
        }
      : {
          title: "",
          description: "",
          gameUrl: "",
          tags: [],
          status: "active",
          // providerId: 0,
          categories: [],
        },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
        form.setValue("thumbnailFile", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data: GameFormData) => {
    try {
      const validation = validateGameForm(data);
      if (!validation.success) {
        validation.error.errors.forEach((err) => {
          form.setError(err.path[0] as keyof GameFormData, {
            type: "manual",
            message: err.message,
          });
        });
        return;
      }

      if (data.thumbnailFile) {
        const thumbnailUrl = await uploadGameThumbnail(data.thumbnailFile);
        data.thumbnailUrl = thumbnailUrl;
      }

      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-4">
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
                <Textarea placeholder="Enter game description" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select game status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white'>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2 mb-2">
                  {field.value.map((category) => (
                    <Badge key={category} variant="secondary" className="text-sm py-1 px-2">
                      {category}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          const updatedCategories = field.value.filter((c) => c !== category);
                          form.setValue("categories", updatedCategories);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </FormControl>
              <Popover open={openCategory} onOpenChange={setOpenCategory}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCategory}
                    className="w-full justify-between"
                  >
                    Select categories
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search categories..." />
                    <CommandList className='bg-white'>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="max-h-32 overflow-auto hide-scrollbar">
                          {categories.map((category: any) => (
                            <CommandItem
                              key={category}
                              onSelect={() => {
                                if (!field.value.includes(category)) {
                                  form.setValue("categories", [...field.value, category]);
                                }
                                setOpenCategory(false);
                              }}
                            >
                              {category}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="providerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider</FormLabel>
              <Popover open={openProvider} onOpenChange={setOpenProvider}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openProvider}
                    className="w-full justify-between"
                  >
                    {field.value
                      ? providers.find((provider) => provider.id === field.value)?.name
                      : "Select provider"}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList className='bg-white'>
                      <CommandInput placeholder="Search providers..." />
                      <CommandEmpty>No provider found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="max-h-32 overflow-auto hide-scrollbar">
                          {providers.map((provider) => (
                            <CommandItem
                              key={provider.id}
                              onSelect={() => {
                                form.setValue("providerId", provider.id);
                                setOpenProvider(false);
                              }}
                            >
                              {provider.name}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
          {initialData ? "Update Game" : "Add Game"}
        </Button>
      </form>
    </Form>
  );
}