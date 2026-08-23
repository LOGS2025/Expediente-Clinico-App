// components/medical/historia/sections/DiagnosticosSection.tsx
'use client';

import { FormSection } from "../shared/FormSection";
import { FormTextarea } from "../shared/FormTextarea";

interface DiagnosticosSectionProps {
  data: any;
  onNestedChange: (section: string, field: string, value: any) => void;
}

export const DiagnosticosSection = ({
  data,
  onNestedChange,
}: DiagnosticosSectionProps) => {
  const diagnosticoFields = [
    { id: 'sintomaticos', label: 'Sintomáticos' },
    { id: 'signologicos', label: 'Signológicos' },
    { id: 'sindromaticos', label: 'Sindromáticos' },
    { id: 'anatomotopograficos', label: 'Anatomotopográficos' },
    { id: 'fisiopatologicos', label: 'Fisiopatológicos' },
    { id: 'laboratorio', label: 'Por laboratorio y/o gabinete' },
    { id: 'etiologico', label: 'Etiológico' },
    { id: 'nosologico', label: 'Nosológico' },
    { id: 'diferenciales', label: 'Diferenciales' },
    { id: 'integral', label: 'Integral' },
  ];

  return (
    <FormSection title="Diagnósticos">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diagnosticoFields.map((field) => (
          <FormTextarea
            key={field.id}
            label={field.label}
            value={data.diagnosticos?.[field.id] || ''}
            onChange={(value) => onNestedChange('diagnosticos', field.id, value)}
            placeholder={`Diagnóstico ${field.label.toLowerCase()}`}
            rows={2}
          />
        ))}
      </div>
    </FormSection>
  );
};