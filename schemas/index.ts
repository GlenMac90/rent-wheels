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

export const carFormSchema = z.object({
  carTitle: z.string().min(1, { message: "Car title is required" }),
  carType: z.string().min(1, { message: "Car type is required" }),
  rentPrice: z.number().min(1, { message: "Rent price is required" }),
  capacity: z.number().min(1, { message: "Capacity is required" }),
  transmission: z.string().min(1, { message: "Transmission is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  fuelCapacity: z.number().min(1, { message: "Fuel capacity is required" }),
  carDescription: z
    .string()
    .min(15, { message: "Car description is required" }),
  images: z.array(z.string()).optional(),
});

export type CarFormFields = z.infer<typeof carFormSchema>;
