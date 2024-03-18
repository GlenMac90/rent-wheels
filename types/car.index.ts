import { MouseEvent } from "react";

export interface CarModalScreenOneProps {
  data: {
    galleryImages: string[];
    name: string;
    description: string;
    type: string;
    transmission: string;
    capacity: number;
    fuelCapacity: number;
    price: number;
  };
  handleClick: (e: MouseEvent) => void;
  handleClose: () => void;
  handleButtonClick: () => void;
}
