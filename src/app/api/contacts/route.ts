import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export type AwaitedGetContactsReturnType = Awaited<
  ReturnType<typeof getContacts>
>;

export async function getContacts() {
  return await prisma.contact.findMany({
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
}

export async function GET() {
  const contacts = await getContacts();
  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const schemaResult = contactSchema.safeParse(body);
  if (!schemaResult.success) {
    console.error(schemaResult.error);
    return NextResponse.error();
  }

  const { name, email, phone, image } = schemaResult.data;

  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
    },
  });

  if (!contact) {
    return NextResponse.error();
  }

  let dbImage = null;
  if (image) {
    dbImage = await prisma.image.create({
      data: {
        name: `${name}_${new Date().getTime()}`,
        content: Buffer.from(image.split(",")[1], "base64"),
        contactId: contact.id,
      },
    });
  }

  if (!contact) {
    return NextResponse.error();
  }

  return NextResponse.json({
    contact,
  });
}
