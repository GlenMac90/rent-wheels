import { ReactNode, ChangeEvent } from "react";

export interface ButtonProps {
  children: ReactNode;
  width?: string;
  height?: string;
  className?: string;
  submit?: boolean;
  linkPath?: string;
  handleClick?: () =>
    | void
    | Promise<void>
    | ((e: ChangeEvent<HTMLInputElement>) => void);
  disabled?: boolean;
  deleteButton?: boolean;
}
