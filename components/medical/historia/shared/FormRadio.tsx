// components/medical/historia/shared/FormRadio.tsx
'use client';

interface FormRadioProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const FormRadio = ({
  label,
  name,
  value,
  options,
  onChange,
}: FormRadioProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};