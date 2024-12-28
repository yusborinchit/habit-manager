import { z } from "zod";

export const habitFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().max(255, {
    message: "Description must be less than 255 characters",
  }),
  days: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one day of the week.",
  }),
  time: z.object({
    hour: z
      .string()
      .refine((value) => Number(value) >= 1 && Number(value) <= 12, {
        message: "Hour must be between 01 and 12",
      }),
    minute: z
      .string()
      .refine((value) => Number(value) >= 0 && Number(value) <= 59, {
        message: "Minute must be between 00 and 59",
      }),
    mode: z.enum(["am", "pm"]),
  }),
});
