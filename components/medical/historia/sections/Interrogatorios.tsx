// components/medical/historia/sections/InterrogatorioSection.tsx
'use client';

import { FormSection } from "../shared/FormSection";
import { FormTextarea } from "../shared/FormTextarea";

interface InterrogatorioSectionProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const InterrogatorioSection = ({
  data,
  onChange,
}: InterrogatorioSectionProps) => {
  const fields = [
    { id: 'respiratorio', label: 'Aparato Respiratorio' },
    { id: 'digestivo', label: 'Aparato Digestivo' },
    { id: 'cardiovascular', label: 'Aparato Cardiovascular' },
    { id: 'renal_urinario', label: 'Aparato Renal y Urinario' },
    { id: data.genero == 'femenino' ? 'genital_femenino' : 'genital_masculino' , label: data.genero == 'femenino' ? 'Aparato Genital Femenino' : 'Aparato Genital Masculino' },
    { id: 'endocrino', label: 'Sistema Endocrino' },
    { id: 'hematopoyetico', label: 'Sistema Hematopoyético y Linfático' },
    { id: 'piel_anexos', label: 'Piel y Anexos' },
    { id: 'musculoesqueletico', label: 'Musculoesquelético' },
    { id: 'nervioso', label: 'Sistema Nervioso' },
    { id: 'organos_sentidos', label: 'Órganos de los Sentidos' },
    { id: 'esfera_psiquica', label: 'Esfera Psíquica' },
    { id: 'sintomas_generales', label: 'Síntomas Generales' },
  ];

  return (
    <FormSection title="Interrogatorio por Aparatos y Sistemas">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <FormTextarea
            key={field.id}
            label={field.label}
            value={data[field.id] || ''}
            onChange={(value) => onChange(field.id, value)}
            placeholder={`Hallazgos en ${field.label.toLowerCase()}`}
            rows={2}
          />
        ))}
      </div>
    </FormSection>
  );
};