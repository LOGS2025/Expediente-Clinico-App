// components/medical/historia/sections/ExploracionSection.tsx
'use client';

import { FormInput } from "../shared/FormInput";
import { FormSection } from "../shared/FormSection";
import { FormTextarea } from "../shared/FormTextarea";

interface ExploracionSectionProps {
  data: any;
  onNestedChange: (section: string, field: string, value: any) => void;
}

export const ExploracionSection = ({
  data,
  onNestedChange,
}: ExploracionSectionProps) => {
  const vitalSigns = [
    { id: 'pulso', label: 'Pulso', placeholder: 'Pulso' },
    { id: 'presion_arterial', label: 'Presión arterial', placeholder: '120/80' },
    { id: 'temperatura', label: 'Temperatura', placeholder: '36.5°C' },
    { id: 'frecuencia_respiratoria', label: 'Frecuencia respiratoria', placeholder: '16 rpm' },
    { id: 'frecuencia_cardiaca', label: 'Frecuencia cardiaca', placeholder: '72 lpm' },
    { id: 'peso', label: 'Peso', placeholder: '70 kg' },
    { id: 'talla', label: 'Talla', placeholder: '1.70 m' },
    { id: 'imc', label: 'IMC', placeholder: '24.2' },
    { id: 'otros', label: 'Otros', placeholder: 'Otros signos' },
  ];

  const exploracionRegions = [
    { id: 'cabeza', label: 'Cabeza' },
    { id: 'cuello', label: 'Cuello' },
    { id: 'torax', label: 'Tórax' },
    { id: 'abdomen', label: 'Abdomen' },
    { id: 'inguino_crural', label: 'Región inguino-crural' },
    { id: 'genitales_externos', label: 'Genitales externos' },
    { id: 'tacto_vaginal', label: 'Tacto vaginal' },
    { id: 'tacto_rectal', label: 'Tacto rectal' },
    { id: 'extremidades', label: 'Extremidades' },
    { id: 'columna', label: 'Columna vertebral' },
    { id: 'neurologica', label: 'Exploración neurológica' },
  ];

  return (
    <div className="space-y-6">
      <FormSection title="Exploración Física">
        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-3">
          Signos Vitales y Somatometría
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vitalSigns.map((field) => (
            <FormInput
              key={field.id}
              label={field.label}
              value={data.signos_vitales?.[field.id] || ''}
              onChange={(value) => onNestedChange('signos_vitales', field.id, value)}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">
          Exploración por Regiones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exploracionRegions.map((field) => (
            <FormTextarea
              key={field.id}
              label={field.label}
              value={data.exploracion?.[field.id] || ''}
              onChange={(value) => onNestedChange('exploracion', field.id, value)}
              placeholder={`Hallazgos en ${field.label.toLowerCase()}`}
              rows={2}
            />
          ))}
        </div>
      </FormSection>
    </div>
  );
};