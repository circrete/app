import { Label } from './Label';

export const Input = <K extends number | string>({
  number = false,
  step = 0.01,
  label,
  value,
  onChange,
  required
}: {
  label?: string;
  number?: boolean;
  step?: number;
  value: K;
  onChange: (value: K) => void;
  required?: boolean;
}) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <input
        type={number ? 'number' : 'text'}
        step={number ? step : undefined}
        value={value}
        onChange={(e) => onChange((number ? parseFloat(e.target.value) : e.target.value) as K)}
        className="w-full p-2 border border-gray-300 rounded-md"
        required={required}
      />
    </div>
  );
};
