import { ICar } from "@/lib/models/car.model";
import { MouseEvent } from "react";

export interface CarModalScreenOneProps {
  data: ICar;
  handleClick: (e: MouseEvent) => void;
  handleClose: () => void;
  handleButtonClick: () => void;
}
