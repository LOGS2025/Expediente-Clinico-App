// components/medical/historia/sections/PlanSection.tsx
'use client';

import { FormSection } from "../shared/FormSection";
import { FormTextarea } from "../shared/FormTextarea";


interface PlanSectionProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const PlanSection = ({ data, onChange }: PlanSectionProps) => {
  return (
    <FormSection title="Plan">
      <div className="space-y-4">
        <FormTextarea
          label="Plan de manejo y tratamiento"
          value={data.plan_manejo || ''}
          onChange={(value) => onChange('plan_manejo', value)}
          placeholder="Plan de manejo y tratamiento"
          rows={4}
        />
        <FormTextarea
          label="Pronóstico"
          value={data.pronostico || ''}
          onChange={(value) => onChange('pronostico', value)}
          placeholder="Pronóstico"
          rows={2}
        />
        <FormTextarea
          label="Criterios de referencia"
          value={data.criterios_referencia || ''}
          onChange={(value) => onChange('criterios_referencia', value)}
          placeholder="Criterios de referencia"
          rows={2}
        />
      </div>
    </FormSection>
  );
};