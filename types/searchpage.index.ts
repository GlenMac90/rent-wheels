export interface CarTypeFiltersProps {
  mobileFilters?: boolean;
  types?: string[];
  capacities?: string[];
  maxPrice?: string;
}

export interface SearchProps {
  name: string | null;
  type: string | null;
  capacity: string | null;
  maxPrice: string | null;
}

export interface OptionalSearchFiltersProps {
  mobileFilters: boolean;
  urlValues?: SearchProps;
}

export interface MobileSearchFiltersProps extends OptionalSearchFiltersProps {
  handleClose: () => void;
  urlValues?: SearchProps;
}
