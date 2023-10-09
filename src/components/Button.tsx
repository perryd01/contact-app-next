import { IconVariant } from "@/types/IconVariant";
import clsx from "clsx";
import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonVariant = "primary" | "secondary" | "special";

type ButtonRounding = "base" | "full";

type ButtonPropsTextWithIcon = {
  text?: string;
  icon?: IconVariant;
};

type ButtonPropsRest = {
  rounding?: ButtonRounding;
  variant?: ButtonVariant;
  onClick?: () => void;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = ButtonPropsTextWithIcon & ButtonPropsRest;

const paddings = {
  text: "px-4 py-2",
  textWithIcon: "px-3 py-2",
};

const bgColors = {
  primary: "bg-grey-60 hover:bg-grey-50 active:bg-grey-40",
  secondary: "bg-transparent hover:bg-grey-90 active:bg-grey-80",
  special:
    "bg-gradient-to-t from-grey-60/70 to-grey-60 hover:to-white-primary/5 border border-grey-20",
} satisfies {
  [key in ButtonVariant]: string;
};

const roundings = {
  base: "rounded-sm",
  full: "rounded-full",
} satisfies {
  [key in ButtonRounding]: string;
};

export default function Button({
  rounding = "base",
  variant = "primary",
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  if (variant === "special") rounding = "full";

  return (
    <button
      {...props}
      className={clsx(
        props.text && props.icon && paddings["textWithIcon"],
        props.text && !props.icon && paddings["text"],
        "h-10 min-w-[40px] w-fit",
        "flex flex-row justify-center items-center gap-2",
        bgColors[variant],
        roundings[rounding],
        "transition-colors"
      )}
      onClick={onClick}
    >
      {props.icon && (
        <Image
          draggable={false}
          src={`/icons/${props.icon}.svg`}
          width={24}
          height={24}
          alt={`${props.icon} button`}
          className="select-none"
        />
      )}
      {props.text && <span className="b">{props.text}</span>}
    </button>
  );
}
