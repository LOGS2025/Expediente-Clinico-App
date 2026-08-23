// components/medical/historia/sections/IdentificacionSection.tsx
'use client';

import { FormInput } from "../shared/FormInput";
import { FormRadio } from "../shared/FormRadio";
import { FormSection } from "../shared/FormSection";
import { FormSelect } from "../shared/FormSelect";


interface IdentificacionSectionProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const IdentificacionSection = ({
  data,
  onChange,
}: IdentificacionSectionProps) => {
  return (
    <div className="space-y-6">
      <FormSection title="Tipo de Interrogatorio">
        <FormRadio
          label=""
          name="interrogatorio_tipo"
          value={data.interrogatorio_tipo || ''}
          options={[
            { value: 'directo', label: 'Directo' },
            { value: 'indirecto', label: 'Indirecto' },
          ]}
          onChange={(value) => onChange('interrogatorio_tipo', value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nombre del informante"
            value={data.informante_nombre || ''}
            onChange={(value) => onChange('informante_nombre', value)}
            placeholder="Nombre del informante"
          />
          <FormInput
            label="Parentezco con el paciente"
            value={data.informante_parentezco || ''}
            onChange={(value) => onChange('informante_parentezco', value)}
            placeholder="Parentezco"
          />
        </div>
      </FormSection>

      <FormSection title="Ficha de Identificación">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nombre completo"
            value={data.nombre || ''}
            onChange={(value) => onChange('nombre', value)}
            placeholder="Nombre del paciente"
          />
          <FormSelect
            label="Género"
            value={data.genero || ''}
            onChange={(value) => onChange('genero', value)}
            options={[
              { value: 'masculino', label: 'Masculino' },
              { value: 'femenino', label: 'Femenino' },
              { value: 'otro', label: 'Otro' },
            ]}
          />
          <FormInput
            label="Edad"
            type="number"
            value={data.edad || ''}
            onChange={(value) => onChange('edad', parseInt(value))}
            placeholder="Edad"
          />
          <FormInput
            label="Fecha de nacimiento"
            type="date"
            value={data.fecha_nacimiento || ''}
            onChange={(value) => onChange('fecha_nacimiento', value)}
          />
          <FormInput
            label="Lugar de nacimiento"
            value={data.lugar || ''}
            onChange={(value) => onChange('lugar', value)}
            placeholder="Lugar"
          />
          <FormInput
            label="Domicilio"
            value={data.domicilio || ''}
            onChange={(value) => onChange('domicilio', value)}
            placeholder="Domicilio"
          />
          <FormSelect
            label="Estado civil"
            value={data.estado_civil || ''}
            onChange={(value) => onChange('estado_civil', value)}
            options={[
              { value: 'soltero', label: 'Soltero/a' },
              { value: 'casado', label: 'Casado/a' },
              { value: 'union_libre', label: 'Unión libre' },
              { value: 'divorciado', label: 'Divorciado/a' },
              { value: 'viudo', label: 'Viudo/a' },
            ]}
          />
          <FormInput
            label="Escolaridad"
            value={data.escolaridad || ''}
            onChange={(value) => onChange('escolaridad', value)}
            placeholder="Escolaridad"
          />
          <FormInput
            label="Profesión u ocupación"
            value={data.profesion || ''}
            onChange={(value) => onChange('profesion', value)}
            placeholder="Profesión"
          />
          <FormInput
            label="Religión"
            value={data.religion || ''}
            onChange={(value) => onChange('religion', value)}
            placeholder="Religión"
          />
          <FormInput
            label="Nacionalidad"
            value={data.nacionalidad || ''}
            onChange={(value) => onChange('nacionalidad', value)}
            placeholder="Nacionalidad"
          />
          <FormSelect
            label="Ocupación"
            value={data.ocupacion || ''}
            onChange={(value) => onChange('ocupacion', value)}
            options={[
              { value: 'empleado', label: 'Empleado' },
              { value: 'pensionado', label: 'Pensionado' },
              { value: 'jubilado', label: 'Jubilado' },
              { value: 'desempleado', label: 'Desempleado' },
              { value: 'otro', label: 'Otro' },
            ]}
          />
        </div>
      </FormSection>

      <FormSection title="Persona Responsable del Paciente">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nombre"
            value={data.responsable_nombre || ''}
            onChange={(value) => onChange('responsable_nombre', value)}
            placeholder="Nombre del responsable"
          />
          <FormInput
            label="Domicilio"
            value={data.responsable_domicilio || ''}
            onChange={(value) => onChange('responsable_domicilio', value)}
            placeholder="Domicilio"
          />
          <FormInput
            label="Teléfono"
            type="tel"
            value={data.responsable_telefono || ''}
            onChange={(value) => onChange('responsable_telefono', value)}
            placeholder="Teléfono"
          />
        </div>
      </FormSection>
    </div>
  );
};