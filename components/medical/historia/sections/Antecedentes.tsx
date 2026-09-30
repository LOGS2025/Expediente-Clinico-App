// components/medical/historia/sections/AntecedentesSection.tsx
'use client';

import { HistoriaClinicaData } from "../HistoriaClinica";
import { FormInput } from "../shared/FormInput";
import { FormSection } from "../shared/FormSection";
import { FormTextarea } from "../shared/FormTextarea";

interface AntecedentesSectionProps {
  data: Partial<HistoriaClinicaData>;
  onChange: (field: string, value: any) => void;
}

export const AntecedentesSection = ({
  data,
  onChange,
}: AntecedentesSectionProps) => {
  return (
    <div className="space-y-6">
      <FormSection title="Antecedentes Familiares">
        <FormTextarea
          label="Antecedentes familiares"
          value={data.antecedentes_familiares || ''}
          onChange={(value) => onChange('antecedentes_familiares', value)}
          placeholder="Antecedentes familiares relevantes"
          rows={3}
        />
      </FormSection>

      <FormSection title="Antecedentes Personales No Patológicos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormTextarea
            label="Alimentación"
            value={data.alimentacion || ''}
            onChange={(value) => onChange('alimentacion', value)}
            placeholder="Hábitos alimenticios"
            rows={2}
          />
          <FormTextarea
            label="Habitación"
            value={data.habitacion || ''}
            onChange={(value) => onChange('habitacion', value)}
            placeholder="Condiciones de vivienda"
            rows={2}
          />
          <FormTextarea
            label="Hábitos higiénicos"
            value={data.habitos_higiene || ''}
            onChange={(value) => onChange('habitos_higiene', value)}
            placeholder="Hábitos de higiene"
            rows={2}
          />
          <FormInput
            label="Ocupación actual"
            value={data.ocupacion_actual || ''}
            onChange={(value) => onChange('ocupacion_actual', value)}
            placeholder="Ocupación actual"
          />
          <FormInput
            label="Ocupación previa"
            value={data.ocupacion_previa || ''}
            onChange={(value) => onChange('ocupacion_previa', value)}
            placeholder="Ocupación previa"
          />
          <FormInput
            label="Uso de tiempo libre"
            value={data.tiempo_libre || ''}
            onChange={(value) => onChange('tiempo_libre', value)}
            placeholder="Actividades de tiempo libre"
          />
          <FormInput
            label="Inmunizaciones"
            value={data.inmunizaciones || ''}
            onChange={(value) => onChange('inmunizaciones', value)}
            placeholder="Vacunas"
          />
          <FormInput
            label="Conciencia de enfermedad"
            value={data.conciencia_enfermedad || ''}
            onChange={(value) => onChange('conciencia_enfermedad', value)}
            placeholder="Percepción de su enfermedad"
          />
        </div>
      </FormSection>

      <FormSection title="Antecedentes Específicos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          { data.genero == 'femenino' ? (
            <FormTextarea
              label="Antecedentes Gineco-Obstétricos"
              value={data.antecedentes_gineco || ''}
              onChange={(value) => onChange('antecedentes_gineco', value)}
              placeholder="Menarca, gestas, partos, etc."
              rows={2}
            />
          ):(
            <FormTextarea
              label="Antecedentes Andrológicos"
              value={data.antecedentes_andrologicos || ''}
              onChange={(value) => onChange('antecedentes_andrologicos', value)}
              placeholder="Antecedentes andrológicos relevantes"
              rows={2}
            />
          )}
        </div>
      </FormSection>
    </div>
  );
};