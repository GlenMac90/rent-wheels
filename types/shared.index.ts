import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  width: string;
  height: string;
  className?: string;
  submit?: boolean;
  linkPath?: string;
  handleClick?: () => void;
}
