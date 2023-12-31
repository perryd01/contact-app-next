"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import FormField from "./FormField";
import ProfilePicture from "./ProfilePicture";
import { Contact } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { contactSchema } from "@/lib/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type EditPanelPropsAdd = {
  mode: "add";
};

type EditPanelPropsData = {
  mode: "edit";
  contact: Pick<Contact, "id" | "name" | "email" | "phone"> & {
    Image: {
      id: number;
    } | null;
  };
};

type EditPanelProps = {
  mode: "add" | "edit";
  action?: (formData: FormData) => void;
  returnTo?: string;
  contact?: Pick<Contact, "id" | "name" | "email" | "phone"> & {
    Image: {
      id: number;
    } | null;
  };
};

const title = {
  add: "Add contact",
  edit: "Edit contact",
} satisfies {
  [key in EditPanelProps["mode"]]: string;
};

const fieldNames = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "phone",
    label: "Phone number",
  },
  {
    key: "email",
    label: "Email address",
  },
] as const;

type ValidationSchema = z.infer<typeof contactSchema>;

export default function EditPanel(props: EditPanelProps) {
  const hasData = props.mode === "edit";
  const [profilePic, setProfilePic] = useState<string | null>(
    props?.contact?.Image?.id ? `/api/images/${props.contact.Image.id}` : null
  );
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["contacts", props.contact?.id],
    queryFn: () =>
      axios.get(`/api/contacts/${props.contact?.id}`).then((res) => res.data),
    enabled: hasData,
    keepPreviousData: false,
    initialData: props.mode === "edit" && props.contact,
    refetchOnMount: true,
  });

  const handleClientSubmit = useMutation({
    mutationFn: async (data: any) => {
      if (data.id) {
        const res = await axios.put(`/api/contacts/${data.id}`, data);
        return res.data;
      }
      const res = await axios.post("/api/contacts", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: data,
    resolver: zodResolver(contactSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    handleClientSubmit.mutate(data);
    router.back();
  };

  const onCancel = () => {
    if (props.returnTo) router.push(props.returnTo);
    else router.back();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-6">
      <h1>{title[props.mode]}</h1>
      <div className="gap-4 flex flex-row items-center justify-between">
        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={() => {
            const file = fileInputRef.current?.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setProfilePic(e.target?.result as string);
                setValue("image", e.target?.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <ProfilePicture
          image={profilePic ?? undefined}
          name={"John Doe"}
          size="big"
        />
        <div className="flex-row flex gap-2">
          {!profilePic ? (
            <Button
              icon="Add"
              text="Add picture"
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
            />
          ) : (
            <>
              <Button
                icon="Change"
                text="Change picture"
                variant="primary"
                onClick={() => fileInputRef.current?.click()}
              />
              <Button icon="Delete" onClick={() => setProfilePic(null)} />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        {fieldNames.map((fieldName) => (
          <FormField
            fieldName={fieldName.key}
            label={fieldName.label}
            register={register}
            key={fieldName.key}
          />
        ))}
      </div>
      <div className="py-6 flex flex-row justify-end">
        <Button text="Cancel" variant="secondary" onClick={onCancel} />
        <Button type="submit" text="Done" variant="primary" />
      </div>
    </form>
  );
}
