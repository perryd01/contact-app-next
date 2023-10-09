import EditPanel from "@/components/EditPanel";
import Modal from "@/components/Modal";
import { notFound } from "next/navigation";

type InterceptedEditPageProps = {
  params: {
    id: string;
  };
};

export default async function InterceptedEditPage({
  params,
}: InterceptedEditPageProps) {
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

  return (
    <Modal>
      <EditPanel mode="edit" contact={contact} />
    </Modal>
  );
}
