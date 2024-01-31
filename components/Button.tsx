import { ReactNode } from "react";

const Button = ({
  children,
  width,
  height,
  className,
}: {
  children: ReactNode;
  width: string;
  height: string;
  className?: string;
}) => {
  return (
    <button
      className={`semibold-16 flex-center rounded bg-blue-500 text-white ${width} ${height} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
