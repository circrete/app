import { Label } from './Label';

export const Checkbox = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => (
  <Label>
    <input type="checkbox" checked={value} onChange={(e) => onChange(Boolean(e.target.checked))} className="mr-2" />
    <span>{label}</span>
  </Label>
);
