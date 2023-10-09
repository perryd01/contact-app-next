"use client";

import ContactListItem from "@/components/ContactListItem";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "./api/contacts/route";
import axios from "axios";

export default function ListContacts({ contacts }: { contacts: any[] }) {
  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => axios.get("/api/contacts").then((res) => res.data),
    initialData: contacts,
    refetchOnMount: true,
  });

  if (!data) return <p>Loading</p>;

  return (
    <div className="flex flex-col">
      {data &&
        Array.isArray(data) &&
        data?.map((c: any) => (
          <div key={c.email} className="py-3">
            <ContactListItem
              id={c.id}
              name={c.name}
              number={c.phone}
              image={c.Image?.id ? `/api/images/${c.Image.id}` : undefined}
            />
          </div>
        ))}
    </div>
  );
}
