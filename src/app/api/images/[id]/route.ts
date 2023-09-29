import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.coerce.number().min(0).int(),
});

export async function GET(request: any, { params }: any) {
  const schemaResult = paramsSchema.safeParse({ id: params.id });

  if (!schemaResult.success) {
    return new NextResponse("Bad Request", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const image = await prisma.image.findUnique({
    where: {
      id: schemaResult.data.id,
      isDeleted: false,
    },
  });

  if (!image) {
    return new NextResponse("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return new NextResponse(image.content, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "image/png",
      "Content-Length": image.content.byteLength.toString(),
      "Content-Disposition": `inline; filename="${image.name}.png`,
    },
  });
}
