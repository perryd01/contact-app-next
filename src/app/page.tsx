import Button from "@/components/Button";
import ContactListItem from "@/components/ContactListItem";
import prisma from "@/lib/prisma";

async function getContacts() {
  const res = await prisma.contact.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      Image: {
        select: {
          id: true,
        },
      },
    },
    where: {
      isDeleted: false,
    },
  });

  return res ?? [];
}

export default async function Home() {
  const data = await getContacts();
  return (
    <main className="flex flex-col h-full grow px-6">
      <div className="flex flex-col ">
        {data.map((c) => (
          <div key={c.email} className="py-3">
            <ContactListItem
              id={c.id}
              name={c.name}
              number={c.phone}
              image={`/api/images/${c.Image?.id}`}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
