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
