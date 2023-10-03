import EditPanel from "@/components/EditPanel";
import Modal from "@/components/Modal";

export default function InterceptedAddPage() {
  async function createContact(formData: FormData) {
    "use server";
  }
  return (
    <Modal>
      <EditPanel mode="add" />
    </Modal>
  );
}
