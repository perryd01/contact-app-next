import ContactListItem from "@/components/ContactListItem";
import { getContacts } from "./api/contacts/route";
import ListContacts from "./list-contacts";

export default async function Home() {
  const data = await getContacts();
  return (
    <main className="flex flex-col h-full grow px-6">
      <ListContacts contacts={data} />
    </main>
  );
}
