import EditPanel from "@/components/EditPanel";
import Modal from "@/components/Modal";

export default function InterceptedAddPage() {
  return (
    <Modal>
      <EditPanel mode="add" />
    </Modal>
  );
}
