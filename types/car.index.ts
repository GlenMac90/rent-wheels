import { ICar } from "@/lib/models/car.model";

export interface CarModalScreenOneProps {
  data: ICar;
  handleClose: () => void;
  handleButtonClick: () => void;
}

export interface CarModalScreenTwoProps {
  data: ICar;
  handleClose: () => void;
  handleButtonClick: () => void;
  carId: string;
}

export interface ImageDataArrayType {
  url: string;
  key: string;
  blurDataURL: string;
  width: number | undefined;
  height: number | undefined;
}

export type CarFieldType = {
  carTitle: string;
  carType: string;
  rentPrice: number;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  carDescription: string;
  images?: string[] | undefined;
};

export type CarTitleFieldProps = {
  carTitle: string;
  carType: string;
  rentPrice: number;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  carDescription: string;
  images?: string[] | undefined;
};
