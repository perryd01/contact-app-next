import clsx from "clsx";
import Image from "next/image";

type IconVariant =
  | "Add"
  | "Back arrow"
  | "Call"
  | "Change"
  | "Delete"
  | "Favourite"
  | "Light mode"
  | "More"
  | "Mute"
  | "Search"
  | "Settings";

type ButtonType = "primary" | "secondary" | "special";

type ButtonRounding = "base" | "full";

type ButtonPropsTextWithIcon = {
  text?: string;
  icon?: IconVariant;
};

type ButtonPropsRest = {
  rounding?: ButtonRounding;
  type?: ButtonType;
};

type ButtonProps = ButtonPropsTextWithIcon & ButtonPropsRest;

const paddings = {
  text: "px-4 py-2",
  textWithIcon: "px-3 py-2",
};

const bgColors = {
  primary: "bg-grey-60 hover:bg-grey-50 active:bg-grey-40",
  secondary: "bg-transparent hover:bg-grey-90 active:bg-grey-80",
  special: "bg-gradient-to-t from-grey-60/70 to-grey-60",
} satisfies {
  [key in ButtonType]: string;
};

const roundings = {
  base: "rounded-sm",
  full: "rounded-full",
} satisfies {
  [key in ButtonRounding]: string;
};

export default function Button({
  rounding = "base",
  type = "primary",
  ...props
}: ButtonProps) {
  const foo = "bar";
  if (type === "special") rounding = "full";

  return (
    <button
      className={clsx(
        props.text && props.icon && paddings["textWithIcon"],
        props.text && !props.icon && paddings["text"],
        "h-10 min-w-[40px] w-fit",
        "flex flex-row justify-center items-center gap-2",
        bgColors[type],
        roundings[rounding],
        "transition-colors"
      )}
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
