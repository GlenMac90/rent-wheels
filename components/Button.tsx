import { ButtonProps } from "@/types/shared.index";

const Button = ({
  children,
  width,
  height,
  className,
  submit = false,
}: ButtonProps) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={`semibold-16 flex-center shrink-0 rounded bg-blue-500 text-white ${width} ${height} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
