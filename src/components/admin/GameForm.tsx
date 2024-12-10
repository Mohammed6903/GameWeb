"use client";
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  FormControl, 
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Game, GameFormData } from "@/types/games";
import { gameFormSchema, validateGameForm } from "@/lib/validation/gameValidation";
import { uploadGameThumbnail } from "@/lib/services/storageServices";
import { Badge } from "@/components/ui/badge";
import { X, Search, Plus } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from '../ui/scroll-area';
import { Provider } from './ProviderForm';
import { createClient } from '@/lib/utils/supabase/client';

interface GameFormProps {
  initialData: any ;
  providers: Provider[];
  categories: string[];
  tags: string[];
  onSubmit: (data: GameFormData) => Promise<void>;
}

export function GameForm({ initialData, providers = [], categories = [], tags = [], onSubmit }: GameFormProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnail_url || null
  );
  const [openCategory, setOpenCategory] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [openProvider, setOpenProvider] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [customTag, setCustomTag] = useState("");

  const form = useForm<GameFormData>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      gameUrl: initialData.gameUrl || "",
      tags: initialData.tags || [],
      status: initialData.status || "active",
      providerId: initialData.providerId || "",
      categories: initialData.categories || [],
      thumbnail_url: initialData.thumbnail_url || "",
    },
  });
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setThumbnailPreview(reader.result as string);
        form.setValue("thumbnailFile", file);
        form.setValue("thumbnail_url", "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    form.setValue("thumbnail_url", url);
    form.setValue("thumbnailFile", undefined);
    setThumbnailPreview(url);
  };

  useEffect(() => {
    const thumbnail_url = form.watch("thumbnail_url");
    if (thumbnail_url) {
      setThumbnailPreview(thumbnail_url);
    }
  }, [form.watch("thumbnail_url")]);

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
        const file = data.thumbnailFile;
        const supabase = await createClient();
        // Return a placeholder URL for mock implementation
        const {data: uploadedFile, error} = await supabase
        .storage
        .from('gameThumbnails')
        .upload(`public/${file.name}-${file.size}`, file, {
            cacheControl: '3600',
            upsert: false
        });
        if (error) {
            throw new Error(`Error uploading file: ${error}`)
        }
    
        const {data: res} = supabase
        .storage
        .from('gameThumbnails')
        .getPublicUrl(`${uploadedFile?.fullPath}`);
    
        // const thumbnail_url = await uploadGameThumbnail(data.thumbnailFile);
        data.thumbnail_url = res.publicUrl;
        delete data.thumbnailFile;
      }

      const { thumbnailFile, ...submitData } = data;
      await onSubmit(submitData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleAddCustomItem = (field: "categories" | "tags", value: string) => {
    const currentValues = form.getValues(field);
    if (value  && currentValues && !currentValues.includes(value)) {
      form.setValue(field, [...currentValues, value]);
    }
    if (field === "categories") {
      setCustomCategory("");
      setOpenCategory(false);
    } else {
      setCustomTag("");
      setOpenTag(false);
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
                    <CommandInput placeholder="Search categories..." onValueChange={setCustomCategory} />
                    <CommandList className='bg-white'>
                      <CommandEmpty>
                        No category found.
                        <Button
                          type="button"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleAddCustomItem("categories", customCategory)}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add "{customCategory}"
                        </Button>
                      </CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="max-h-32 overflow-auto hide-scrollbar">
                          {categories.map((category: string) => (
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2 mb-2">
                  {field.value && field.value.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm py-1 px-2">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          const updatedTags = field.value && field.value.filter((t) => t !== tag);
                          form.setValue("tags", updatedTags);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </FormControl>
              <Popover open={openTag} onOpenChange={setOpenTag}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTag}
                    className="w-full justify-between"
                  >
                    Select Tags
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search tags..." onValueChange={setCustomTag} />
                    <CommandList className='bg-white'>
                      <CommandEmpty>
                        <h1>
                          No such tag found.
                        </h1>
                        <Button
                          type="button"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleAddCustomItem("tags", customTag)}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add "{customTag}"
                        </Button>
                      </CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="max-h-32 overflow-auto hide-scrollbar">
                          {tags.map((tag: string) => (
                            <CommandItem
                              key={tag}
                              onSelect={() => {
                                if (field.value && !field.value.includes(tag)) {
                                  form.setValue("tags", [...field.value, tag]);
                                }
                                setOpenTag(false);
                              }}
                            >
                              {tag}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="thumbnailFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    {...field}
                    onChange={handleThumbnailUrlChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {thumbnailPreview && (
          <div className="mt-4">
            <FormLabel>Thumbnail Preview</FormLabel>
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 max-w-[200px] rounded"
            />
          </div>
        )}

        <Button type="submit">
          {initialData ? "Update Game" : "Add Game"}
        </Button>
      </form>
    </Form>
  );
}