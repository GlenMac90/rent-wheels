import { z } from "zod";

export const searchBarSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  availableFrom: z.date().min(new Date()),
  availableTo: z.date().min(new Date()),
});

export const searchFiltersSchema = z.object({
  carName: z.string().min(1).max(20),
  carType: z.array(z.string()),
  carCapacity: z.array(z.string()),
  carMaxPrice: z.number().min(1).max(1000).optional(),
});

export type FormFields = z.infer<typeof searchFiltersSchema>;

export const pickupDropoffSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  pickupDate: z
    .date()
    .min(new Date(), { message: "Pickup date cannot be in the past" }),
  dropoffDate: z
    .date()
    .min(new Date(), { message: "Dropoff date cannot be in the past" }),
});

export type PickupDropoffFields = z.infer<typeof pickupDropoffSchema>;
