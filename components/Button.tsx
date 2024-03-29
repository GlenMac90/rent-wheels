import Link from "next/link";

import { ButtonProps } from "@/types/shared.index";

const Button = ({
  children,
  width,
  height,
  className,
  linkPath = "",
  submit = false,
  handleClick,
  disabled,
}: ButtonProps) => {
  if (linkPath) {
    return (
      <Link
        href={linkPath}
        className={`semibold-16 flex-center shrink-0 rounded bg-blue-500 text-white ${width} ${height} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      type={submit ? "submit" : "button"}
      className={`semibold-16 flex-center shrink-0 rounded bg-blue-500 text-white ${width} ${height} ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
