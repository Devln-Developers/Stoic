import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid";
  children: React.ReactNode;
}

export default function Button({
  variant = "outline",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "text-[14px] font-semibold leading-none px-5 py-2.5 rounded-[36px] transition-colors cursor-pointer";

  const variants = {
    outline:
      "border border-[#2d2d2d] text-white bg-[#030303] hover:border-[#747474] transition-colors",
    solid: "bg-white text-black hover:bg-white/90",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
