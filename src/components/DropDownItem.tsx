import { IconVariant } from "@/types/IconVariant";
import Image from "next/image";

type DropDownItemProps = {
  label: string;
  icon: IconVariant;
  onClick?: () => void;
};

function InnerContent({
  icon,
  label,
}: Pick<DropDownItemProps, "label" | "icon">) {
  return (
    <>
      <Image
        draggable={false}
        src={`/icons/${icon}.svg`}
        width={24}
        height={24}
        alt={`${icon} button`}
        className="select-none"
      />
      <span>{label}</span>
    </>
  );
}

export default function DropDownItem({
  label,
  icon,
  onClick,
}: DropDownItemProps) {
  return (
    <li
      className="w-full b py-3 flex flex-row gap-3 px-2.5 cursor-pointer hover:bg-grey-70"
      onClick={onClick}
    >
      <InnerContent icon={icon} label={label} />
    </li>
  );
}
