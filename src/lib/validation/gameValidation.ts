import * as z from 'zod';

export const gameFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  gameUrl: z.string().url({ message: "Invalid URL format" }),
  tags: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  thumbnailFile: z.instanceof(File).optional()
});

export const validateGameForm = (data: unknown) => {
  return gameFormSchema.safeParse(data);
};