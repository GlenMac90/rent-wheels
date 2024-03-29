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

export const profileFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.string().min(1, { message: "Job title is required" }),
  image: z.string().min(1, { message: "Profile image is required" }),
});

export type ProfileFormFields = z.infer<typeof profileFormSchema>;

export const signUpFormSchema = z.object({
  username: z.string().min(5, { message: "Username is required" }).max(20),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be 8 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type SignUpFormFields = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = z.object({
  password: z.string(),
  email: z.string().email({ message: "Invalid email" }),
});

export type SignInFormFields = z.infer<typeof signInFormSchema>;
