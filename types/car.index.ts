import { ICar } from "@/lib/models/car.model";
import { MouseEvent } from "react";

export interface CarModalScreenOneProps {
  data: ICar;
  handleClick: (e: MouseEvent) => void;
  handleClose: () => void;
  handleButtonClick: () => void;
}

export interface ImageDataArrayType {
  url: string;
  blurDataURL: string;
  width: number | undefined;
  height: number | undefined;
}
