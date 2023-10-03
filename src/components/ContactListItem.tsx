import Image from "next/image";
import ProfilePicture from "./ProfilePicture";
import Button from "./Button";
import Link from "next/link";

type ContactListItemProps = {
  id: number;
  name: string;
  number: string;
  image: string;
};

export default function ContactListItem({
  id,
  image,
  name,
  number,
}: ContactListItemProps) {
  return (
    <div className="flex flex-row justify-between group">
      <div className="flex flex-row gap-4 items-center">
        <ProfilePicture image={image} name={name} />
        <div className="flex flex-col">
          <h3>{name}</h3>
          <p className="text-white-secondary m">{number}</p>
        </div>
      </div>
      <div className="flex-row gap-2 group-hover:flex hidden">
        <Button icon="Mute" type="secondary" />
        <Button icon="Call" type="secondary" />
        <Link href={`/edit/${id}`} scroll={false}>
          <Button icon="More" type="secondary" />
        </Link>
      </div>
    </div>
  );
}
