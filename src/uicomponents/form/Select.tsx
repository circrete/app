import { Label } from './Label';

export const Select: React.FC<{
  options: { label: string; value: string }[];
  label?: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}> = ({ label, options, value, required, onChange }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        className="w-full p-2 border border-gray-300 rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
