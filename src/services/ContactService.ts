import { Prisma, Contact } from "@prisma/client";
import prisma from "@/lib/prisma";
import axios from "axios";

class ContactService {
  async getAllContacts() {
    const res = await axios.get("http://localhost:3000/api/contacts");
    return res.data;
  }

  async getContactById(id: number) {
    const res = await axios.get(`http://localhost:3000/api/contacts/${id}`);
    return res.data;
  }

  addContact(
    data: Pick<Prisma.ContactCreateInput, "name" | "email" | "phone"> & {
      image?: File;
    }
  ) {
    return prisma?.contact.create({
      data,
    });
  }

  updateContact(id: number, data: Partial<Omit<Contact, "id">>) {
    return prisma?.contact.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteContact(id: number) {
    return prisma?.contact.delete({
      where: {
        id,
      },
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactService();
