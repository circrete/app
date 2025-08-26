import { useEffect, useState } from 'react';
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
  value: K | undefined;
  onChange: (value: K) => void;
  required: boolean;
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div>
      {label && <Label>{label}</Label>}
      <input
        key={value}
        type={number ? 'number' : 'text'}
        step={number ? step : undefined}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value as K)}
        onBlur={() => onChange((number ? Number(inputValue) : inputValue) as K)}
        onKeyDown={(e) => e.key === 'Enter' && onChange(inputValue as K)}
        className="w-full px-2 py-1  rounded-md bg-slate-200 text-slate-800"
        placeholder={label}
        required={required}
      />
    </div>
  );
};
