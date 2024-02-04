import { FormFields } from "@/schemas";
import { UseFormReturn } from "react-hook-form";

export interface OptionalSearchFiltersProps {
  form: UseFormReturn<FormFields>;
  currentPrice: number | undefined;
}
