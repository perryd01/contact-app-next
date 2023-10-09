"use client";

import Image from "next/image";
import ProfilePicture from "./ProfilePicture";
import Button from "./Button";
import Link from "next/link";
import { useState } from "react";
import DropDownItem from "./DropDownItem";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import clsx from "clsx";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type ContactListItemProps = {
  id: number;
  name: string;
  number: string;
  image: string | undefined;
};

export default function ContactListItem({
  id,
  image,
  name,
  number,
}: ContactListItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const queryClient = useQueryClient();

  const handleDelete = useMutation({
    mutationFn: (data: { id: number }) => {
      return axios.delete(`/api/contacts/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });

  const router = useRouter();

  return (
    <div className="flex flex-row justify-between group">
      <div className="flex flex-row gap-4 items-center">
        <ProfilePicture image={image} name={name} />
        <div className="flex flex-col">
          <h3>{name}</h3>
          <p className="text-white-secondary m">{number}</p>
        </div>
      </div>
      <div
        className={clsx(
          isDropdownOpen ? "flex" : "hidden",
          "flex-row relative gap-2 group-hover:flex"
        )}
      >
        <Button icon="Mute" type="secondary" />
        <Button icon="Call" type="secondary" />
        <Button
          icon="More"
          type="secondary"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        />
        {isDropdownOpen && (
          <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
            <div className="absolute pt-12 z-50">
              <div className="absolute flex flex-col rounded-lg bg-grey-80 overflow-hidden">
                <ul className="w-max min-w-[220px] ">
                  <DropDownItem
                    label="Edit"
                    icon="Change"
                    onClick={() => {
                      router.push(`/edit/${id}`, {
                        scroll: false,
                      });
                      setIsDropdownOpen(false);
                    }}
                  />
                  <DropDownItem label="Favourite" icon="Favourite" />
                  <DropDownItem
                    label="Remove"
                    icon="Delete"
                    onClick={() => {
                      handleDelete.mutate({ id });
                    }}
                  />
                </ul>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
}
