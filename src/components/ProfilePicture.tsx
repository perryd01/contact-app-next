import Image from "next/image";
import clsx from "clsx";

type ProfilePictureProps = {
  size?: "small" | "big";
  image: string;
  name: string;
};

export default function ProfilePicture({
  image,
  name,
  size = "small",
}: ProfilePictureProps) {
  const sizes = {
    small: "w-10 h-10",
    big: "w-[88px] h-[88px]",
  };
  return (
    <div className={clsx(sizes[size], "aspect-square relative")}>
      <Image
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={image}
        alt={name}
        className="rounded-full w-full h-full border-[1px] border-grey-60"
      />
    </div>
  );
}
