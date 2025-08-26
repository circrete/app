import { Label } from './Label';

export const Select: React.FC<{
  options: { label: string; value: string }[];
  label?: string;
  value: string | undefined;
  required?: boolean;
  onChange: (value: string) => void;
}> = ({ label, options, value, required, onChange }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        className="w-full px-2 py-1 rounded-md bg-slate-200 text-slate-800"
        key={value}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        <option disabled selected value={undefined}>
          none
        </option>
      </select>
    </div>
  );
};
