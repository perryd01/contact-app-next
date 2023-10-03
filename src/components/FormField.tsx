type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function FormField({ label, value, onChange }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white-secondary m block">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-grey-60 rounded-sm border-[1px] border-grey-10 px-3 py-[11px] b "
      />
    </div>
  );
}
