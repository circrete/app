import { Label } from './Label';

export const Checkbox = ({
  label,
  value,
  onChange,
  required
}: {
  label: string;
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  required: boolean;
}) => (
  <Label>
    <input
      type="checkbox"
      required={required}
      checked={value}
      onChange={(e) => onChange(Boolean(e.target.checked))}
      className="mr-2"
    />
    <span>{label}</span>
  </Label>
);
