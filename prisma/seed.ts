import { Contact, PrismaClient } from "@prisma/client";
import { readFileSync, readdirSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

type SeedContact = Pick<Contact, "name" | "email" | "phone">;
const contacts: SeedContact[] = [
  "Timothy Lewis",
  "Sarah Wright",
  "Lucy Jones",
  "Jake Perez",
  "Adebayo Rodriguez",
].map((e) => ({
  name: e,
  email: `${e.toLowerCase().replace(" ", ".")}@mail.com`,
  phone: "+36 01 234 5678",
}));

async function main() {
  console.time("seed");
  const imageFilenames = await readdirSync(
    path.join(__dirname, "./seed_data/"),
    "utf-8"
  ).filter((file) => file.endsWith(".png"));

  const images = (
    await Promise.all(
      imageFilenames.map((filename) => {
        return readFileSync(path.join(__dirname, "./seed_data/", filename));
      })
    )
  ).map((e, i) => ({
    filename: imageFilenames[i],
    data: e,
  }));

  await Promise.all([
    prisma.contact.deleteMany({
      where: {
        id: {
          gt: 0,
        },
      },
    }),
    prisma.image.deleteMany(),
  ]);

  const dbContacts = await prisma.$transaction(
    contacts.map((e, i) => {
      return prisma.contact.create({
        data: {
          ...e,
        },
      });
    })
  );

  const dbImages = await prisma.$transaction(
    images.map((e) => {
      const contact = dbContacts.find((c) => e.filename.includes(c.name));
      return prisma.image.create({
        data: {
          name: `${e.filename.split(".")[0]}_${Date.now()}`,
          content: e.data,
          contactId: contact?.id,
        },
      });
    })
  );

  console.timeEnd("seed");
}

main();
