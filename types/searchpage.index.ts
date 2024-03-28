export interface CarTypeFiltersProps {
  mobileFilters?: boolean;
  types?: string[];
  capacities?: string[];
  maxPrice?: string;
}

export interface CarPriceFilterProps {
  mobileFilters?: boolean;
  displayPrice: string;
  setDisplayPrice: (value: string) => void;
}

export interface SearchProps {
  name: string | null;
  type: string | null;
  capacity: string | null;
  maxPrice: string | null;
  page?: string | null;
}

export interface OptionalSearchFiltersProps {
  mobileFilters: boolean;
  urlValues?: SearchProps;
  displayPrice: string;
  setDisplayPrice: (value: string) => void;
}

export interface MobileSearchFiltersProps extends OptionalSearchFiltersProps {
  handleClose: () => void;
  urlValues?: SearchProps;
}
