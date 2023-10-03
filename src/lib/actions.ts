import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
});

export async function createContact(prevState: any, formData: FormData) {
  const schemaResult = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  });

  if (!schemaResult.success) {
    return {
      message: schemaResult.error,
    };
  }

  const dbContact = await prisma.contact.create({
    data: schemaResult.data,
  });

  if (!dbContact) {
    return {
      message: "Error creating contact",
    };
  }

  revalidatePath("/");
  return {
    message: "Contact created successfully",
  };
}

export async function updateContact(prevState: any, formData: FormData) {}

export async function deleteContact(prevState: any, formData: FormData) {}
