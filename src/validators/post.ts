import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),

  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content cannot be empty"),

  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category cannot be empty"),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").optional(),

  content: z.string().min(1, "Content cannot be empty").optional(),

  category: z.string().min(1, "Category cannot be empty").optional(),
});
