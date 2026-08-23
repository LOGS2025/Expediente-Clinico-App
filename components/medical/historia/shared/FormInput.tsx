// components/medical/historia/shared/FormInput.tsx
'use client';

interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  type?: 'text' | 'number' | 'date' | 'tel' | 'email';
  placeholder?: string;
  className?: string;
}

export const FormInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  className = '',
}: FormInputProps) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};