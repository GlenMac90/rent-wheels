import { z } from "zod";

export const searchBarSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  availableFrom: z.date().min(new Date()),
  availableTo: z.date().min(new Date()),
});

export const searchFiltersSchema = z.object({
  carName: z.string().min(1).max(10),
  carType: z.array(z.string()),
  carCapacity: z.array(z.string()),
  carMaxPrice: z.number().min(1).max(1000).optional(),
});

export type FormFields = z.infer<typeof searchFiltersSchema>;
