import Button from "@/components/Button";
import FormField from "@/components/FormField";
import ProfilePicture from "@/components/ProfilePicture";

export default async function Edit() {
  return (
    <main className="p-6 max-w-sm mx-auto flex flex-col gap-6">
      <h1>Edit contact</h1>
      <div className="gap-4 flex flex-row items-center justify-between">
        <ProfilePicture image="/api/images/1" name="John Doe" size="big" />
        <div className="flex-row flex gap-2">
          <Button icon="Change" text="Change picture" type="primary" />
          <Button icon="Delete" />
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        <FormField label="Name" />
        <FormField label="Phone number" />
        <FormField label="Email address" />
      </div>
      <div className="py-6 flex flex-row justify-end">
        <Button text="Cancel" type="secondary" />
        <Button text="Done" type="primary" />
      </div>
    </main>
  );
}
