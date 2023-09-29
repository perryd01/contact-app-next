type FormFieldProps = {
  label: string;
};

export default function FormField({ label }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white-secondary m block">{label}</label>
      <input className="bg-grey-60 rounded-sm border-[1px] border-grey-10 px-3 py-[11px] b " />
    </div>
  );
}
