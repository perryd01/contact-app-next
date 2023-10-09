import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
  const id = Number(params.id);
  const contact = await prisma.contact.findMany({
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
      id,
      isDeleted: false,
    },
  });

  if (!contact) {
    return NextResponse.error();
  }

  return NextResponse.json({
    ...contact,
  });
}

export async function PUT(request: Request) {
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

  return NextResponse.json({
    ...contact,
    Image: dbImage,
  });
}

export async function DELETE(_: NextRequest, { params }: any) {
  const id = Number(params.id);
  const contact = await prisma.contact.findFirst({
    where: {
      id,
    },
  });

  if (!contact) {
    return NextResponse.error();
  }

  const res = await prisma.contact.delete({
    where: {
      id,
    },
  });

  if (!res) {
    return NextResponse.error();
  }

  return NextResponse.json({
    ...contact,
  });
}
