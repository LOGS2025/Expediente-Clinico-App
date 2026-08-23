// components/medical/historia/shared/FormSection.tsx
'use client';

import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({
  title,
  children,
  className = '',
}: FormSectionProps) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
};