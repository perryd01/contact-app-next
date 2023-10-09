import { UseFormRegister } from "react-hook-form";

type FormFieldProps = {
  label: string;
  register: UseFormRegister<any>;
  fieldName: string;
};

export default function FormField({
  label,
  register,
  fieldName,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white-secondary m block">{label}</label>
      <input
        className="bg-grey-60 rounded-sm border-[1px] border-grey-10 px-3 py-[11px] b "
        {...register(fieldName)}
      />
    </div>
  );
}
