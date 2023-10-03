import EditPanel from "@/components/EditPanel";
import Modal from "@/components/Modal";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

export default async function EditSelected({
  params,
}: {
  params: { id: string };
}) {
  const parsedId = parseInt(params.id);
  const contact = await prisma?.contact.findFirst({
    where: {
      id: parsedId,
    },
    include: {
      Image: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!contact) {
    notFound();
  }

  return <EditPanel mode="edit" contact={contact} />;
}
