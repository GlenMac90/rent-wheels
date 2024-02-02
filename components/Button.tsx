import { ButtonProps } from "@/types/shared.index";

const Button = ({
  children,
  width,
  height,
  className,
  submit = false,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={`semibold-16 flex-center shrink-0 rounded bg-blue-500 text-white ${width} ${height} ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
