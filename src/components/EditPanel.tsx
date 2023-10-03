"use client";

import { useState } from "react";
import Button from "./Button";
import FormField from "./FormField";
import ProfilePicture from "./ProfilePicture";
import { Contact } from "@prisma/client";

type EditPanelPropsAdd = {
  mode: "add";
};

type EditPanelPropsData = {
  mode: "edit";
  contact: Pick<Contact, "name" | "email" | "phone"> & {
    Image: {
      id: number;
    } | null;
  };
};

type EditPanelProps = (EditPanelPropsAdd | EditPanelPropsData) & {
  action?: (formData: FormData) => void;
};

const title = {
  add: "Add contact",
  edit: "Edit contact",
} satisfies {
  [key in EditPanelProps["mode"]]: string;
};

export default function EditPanel(props: EditPanelProps) {
  const hasData = props.mode === "edit";
  const hasProfilePic = hasData && props.contact.Image?.id ? true : false;
  const [profilePic, setProfilePic] = useState<File | boolean>(
    hasData && props.contact.Image?.id ? true : false
  );

  const [name, setName] = useState(hasData ? props.contact.name : "");
  const [email, setEmail] = useState(hasData ? props.contact.email : "");
  const [phone, setPhone] = useState(hasData ? props.contact.phone : "");
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1>{title[props.mode]}</h1>
      <div className="gap-4 flex flex-row items-center justify-between">
        <ProfilePicture
          image={"/pictures/Default.png"}
          name="John Doe"
          size="big"
        />
        <div className="flex-row flex gap-2">
          {!profilePic ? (
            <Button icon="Add" text="Add picture" type="primary" />
          ) : (
            <>
              <Button icon="Change" text="Change picture" type="primary" />
              <Button icon="Delete" onClick={() => setProfilePic(false)} />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        <FormField label="Name" value={name} onChange={setName} />
        <FormField label="Phone number" value={phone} onChange={setPhone} />
        <FormField label="Email address" value={email} onChange={setEmail} />
      </div>
      <div className="py-6 flex flex-row justify-end">
        <Button text="Cancel" type="secondary" />
        <Button text="Done" type="primary" />
      </div>
    </div>
  );
}
