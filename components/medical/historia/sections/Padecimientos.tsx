// components/medical/historia/sections/PadecimientoSection.tsx
'use client';

import { FormSection } from "../shared/FormSection";
import { FormTextarea } from "../shared/FormTextarea";

interface PadecimientoSectionProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const PadecimientoSection = ({
  data,
  onChange,
}: PadecimientoSectionProps) => {
  return (
    <div className="space-y-4">
      <FormSection title="Padecimiento Actual">
        <div className="space-y-4">
          <FormTextarea
            label="Motivo y circunstancia de la consulta"
            value={data.motivo_consulta || ''}
            onChange={(value) => onChange('motivo_consulta', value)}
            placeholder="Motivo de la consulta"
            rows={2}
          />
          <FormTextarea
            label="Síntoma y molestia principal"
            value={data.sintoma_principal || ''}
            onChange={(value) => onChange('sintoma_principal', value)}
            placeholder="Síntoma principal"
            rows={2}
          />
          <FormTextarea
            label="Síntomas acompañantes"
            value={data.sintomas_acompaniantes || ''}
            onChange={(value) => onChange('sintomas_acompaniantes', value)}
            placeholder="Síntomas acompañantes"
            rows={2}
          />
          <FormTextarea
            label="Estudios paraclínicos"
            value={data.estudios_paraclinicos || ''}
            onChange={(value) => onChange('estudios_paraclinicos', value)}
            placeholder="Estudios realizados"
            rows={2}
          />
          <FormTextarea
            label="Terapéutica empleada y resultados"
            value={data.terapeutica_empleada || ''}
            onChange={(value) => onChange('terapeutica_empleada', value)}
            placeholder="Tratamiento y resultados"
            rows={2}
          />
        </div>
      </FormSection>
    </div>
  );
};