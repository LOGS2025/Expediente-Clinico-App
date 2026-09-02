// components/medical/historia/HistoriaClinica.tsx
'use client';

import { useState } from 'react';
import { IdentificacionSection } from './sections/Identificacion';
import { AntecedentesSection } from './sections/Antecedentes';
import { PadecimientoSection } from './sections/Padecimientos';
import { DiagnosticosSection } from './sections/Diagnosticos';
import { ExploracionSection } from './sections/Exploracion';
import { InterrogatorioSection } from './sections/Interrogatorios';
import { PlanSection } from './sections/Plan';

export interface HistoriaClinicaData {
  // Tipo de interrogatorio
  interrogatorio_tipo: 'directo' | 'indirecto'; // Si es directo, no sale informante...
  informante_nombre: string;
  informante_parentezco: string;

  // Ficha de identificación
  nombre: string;
  genero: 'masculino' | 'femenino' | 'otro';
  edad: number;
  fecha_nacimiento: string;
  lugar: string;
  domicilio: string;
  estado_civil: 'soltero' | 'casado' | 'union_libre' | 'divorciado' | 'viudo';
  escolaridad: string;
  profesion: string;
  religion: string;
  nacionalidad: string;
  ocupacion: 'empleado' | 'pensionado' | 'jubilado' | 'desempleado' | 'otro';

  // Persona responsable
  responsable_nombre: string;
  responsable_domicilio: string;
  responsable_telefono: string;

  // Antecedentes familiares
  antecedentes_familiares: string;

  // Antecedentes personales no patológicos
  alimentacion: string;
  habitacion: string;
  habitos_higiene: string;
  ocupacion_actual: string;
  ocupacion_previa: string;
  tiempo_libre: string;
  inmunizaciones: string;
  conciencia_enfermedad: string;

  // Antecedentes gineco-obstétricos / andrológicos
  antecedentes_gineco: string;
  antecedentes_andrologicos: string;

  // Padecimiento actual
  motivo_consulta: string;
  sintoma_principal: string;
  sintomas_acompaniantes: string;
  estudios_paraclinicos: string;
  terapeutica_empleada: string;

  // Interrogatorio por aparatos y sistemas
  respiratorio: string;
  digestivo: string;
  cardiovascular: string;
  renal_urinario: string;
  genital_masculino: string;
  genital_femenino: string;
  endocrino: string;
  hematopoyetico: string;
  piel_anexos: string;
  musculoesqueletico: string;
  nervioso: string;
  organos_sentidos: string;
  esfera_psiquica: string;
  sintomas_generales: string;

  // Exploración física
  signos_vitales: {
    pulso: string;
    presion_arterial: string;
    temperatura: string;
    frecuencia_respiratoria: string;
    frecuencia_cardiaca: string;
    peso: string;
    talla: string;
    imc: string;
    otros: string;
  };

  // Exploración por regiones
  exploracion: {
    cabeza: string;
    cuello: string;
    torax: string;
    abdomen: string;
    inguino_crural: string;
    genitales_externos: string;
    tacto_vaginal: string;
    tacto_rectal: string;
    extremidades: string;
    columna: string;
    neurologica: string;
  };

  // Diagnósticos
  diagnosticos: {
    sintomaticos: string;
    signologicos: string;
    sindromaticos: string;
    anatomotopograficos: string;
    fisiopatologicos: string;
    laboratorio: string;
    etiologico: string;
    nosologico: string;
    diferenciales: string;
    integral: string;
  };

  // Plan
  plan_manejo: string;
  pronostico: string;
  criterios_referencia: string;
}

const HistoriaClinica = () => {
  const [formData, setFormData] = useState<Partial<HistoriaClinicaData>>({});
  const [activeSection, setActiveSection] = useState<string>('identificacion');

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof HistoriaClinicaData] as Record<string, any> || {}),
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const sections = [
    { id: 'identificacion', label: 'Identificación' },
    { id: 'antecedentes', label: 'Antecedentes' },
    { id: 'padecimiento', label: 'Padecimiento' },
    { id: 'interrogatorio', label: 'Interrogatorio' },
    { id: 'exploracion', label: 'Exploración' },
    { id: 'diagnosticos', label: 'Diagnósticos' },
    { id: 'plan', label: 'Plan' },
  ];

  return (
    <div className="max-w-[450px] text-white p-6 overflow-y-auto h-dvh bg-blue-950">
      <h1 className="text-2xl font-bold text-white mb-6">Historia Clínica</h1>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-6 border-b border-gray-200 pb-4">
        {sections.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 text-sm font-medium brightness-80 hover:brightness-90 transition-colors ${
              activeSection === tab.id
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sections */}
        <div className={activeSection !== 'identificacion' ? 'hidden' : ''}>
          <IdentificacionSection data={formData} onChange={handleChange} />
        </div>

        <div className={activeSection !== 'antecedentes' ? 'hidden' : ''}>
          <AntecedentesSection data={formData} onChange={handleChange} />
        </div>

        <div className={activeSection !== 'padecimiento' ? 'hidden' : ''}>
          <PadecimientoSection data={formData} onChange={handleChange} />
        </div>

        <div className={activeSection !== 'interrogatorio' ? 'hidden' : ''}>
          <InterrogatorioSection data={formData} onChange={handleChange} />
        </div>

        <div className={activeSection !== 'exploracion' ? 'hidden' : ''}>
          <ExploracionSection
            data={formData}
            onNestedChange={handleNestedChange}
          />
        </div>

        <div className={activeSection !== 'diagnosticos' ? 'hidden' : ''}>
          <DiagnosticosSection
            data={formData}
            onNestedChange={handleNestedChange}
          />
        </div>

        <div className={activeSection !== 'plan' ? 'hidden' : ''}>
          <PlanSection data={formData} onChange={handleChange} />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setFormData({})}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Historia Clínica
          </button>
        </div>
      </form>
    </div>
  );
};

export default HistoriaClinica;