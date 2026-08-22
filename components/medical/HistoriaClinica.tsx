// components/medical/HistoriaClinica.tsx
'use client';

import { useState } from 'react';


interface HistoriaClinicaData {
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
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
    // Here you would send to your API
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Historia Clínica</h1>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {[
          { id: 'identificacion', label: 'Identificación' },
          { id: 'antecedentes', label: 'Antecedentes' },
          { id: 'padecimiento', label: 'Padecimiento' },
          { id: 'interrogatorio', label: 'Interrogatorio' },
          { id: 'exploracion', label: 'Exploración' },
          { id: 'diagnosticos', label: 'Diagnósticos' },
          { id: 'plan', label: 'Plan' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeSection === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ========== SECCIÓN 1: IDENTIFICACIÓN ========== */}
        <section className={`space-y-4 ${activeSection !== 'identificacion' ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Tipo de Interrogatorio</h2>
          
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="interrogatorio_tipo"
                value="directo"
                checked={formData.interrogatorio_tipo === 'directo'}
                onChange={(e) => handleChange('interrogatorio_tipo', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              Directo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="interrogatorio_tipo"
                value="indirecto"
                checked={formData.interrogatorio_tipo === 'indirecto'}
                onChange={(e) => handleChange('interrogatorio_tipo', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              Indirecto
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del informante
              </label>
              <input
                type="text"
                value={formData.informante_nombre || ''}
                onChange={(e) => handleChange('informante_nombre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del informante"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parentezco con el paciente
              </label>
              <input
                type="text"
                value={formData.informante_parentezco || ''}
                onChange={(e) => handleChange('informante_parentezco', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Parentezco"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mt-6">Ficha de Identificación</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                value={formData.nombre || ''}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nombre del paciente"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
              <select
                value={formData.genero || ''}
                onChange={(e) => handleChange('genero', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Seleccionar</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
              <input
                type="number"
                value={formData.edad || ''}
                onChange={(e) => handleChange('edad', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Edad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
              <input
                type="date"
                value={formData.fecha_nacimiento || ''}
                onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lugar de nacimiento</label>
              <input
                type="text"
                value={formData.lugar || ''}
                onChange={(e) => handleChange('lugar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Lugar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domicilio</label>
              <input
                type="text"
                value={formData.domicilio || ''}
                onChange={(e) => handleChange('domicilio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Domicilio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado civil</label>
              <select
                value={formData.estado_civil || ''}
                onChange={(e) => handleChange('estado_civil', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Seleccionar</option>
                <option value="soltero">Soltero/a</option>
                <option value="casado">Casado/a</option>
                <option value="union_libre">Unión libre</option>
                <option value="divorciado">Divorciado/a</option>
                <option value="viudo">Viudo/a</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Escolaridad</label>
              <input
                type="text"
                value={formData.escolaridad || ''}
                onChange={(e) => handleChange('escolaridad', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Escolaridad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profesión u ocupación</label>
              <input
                type="text"
                value={formData.profesion || ''}
                onChange={(e) => handleChange('profesion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Profesión"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Religión</label>
              <input
                type="text"
                value={formData.religion || ''}
                onChange={(e) => handleChange('religion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Religión"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidad</label>
              <input
                type="text"
                value={formData.nacionalidad || ''}
                onChange={(e) => handleChange('nacionalidad', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nacionalidad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ocupación</label>
              <select
                value={formData.ocupacion || ''}
                onChange={(e) => handleChange('ocupacion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Seleccionar</option>
                <option value="empleado">Empleado</option>
                <option value="pensionado">Pensionado</option>
                <option value="jubilado">Jubilado</option>
                <option value="desempleado">Desempleado</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mt-6">Persona Responsable del Paciente</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={formData.responsable_nombre || ''}
                onChange={(e) => handleChange('responsable_nombre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nombre del responsable"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domicilio</label>
              <input
                type="text"
                value={formData.responsable_domicilio || ''}
                onChange={(e) => handleChange('responsable_domicilio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Domicilio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={formData.responsable_telefono || ''}
                onChange={(e) => handleChange('responsable_telefono', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Teléfono"
              />
            </div>
          </div>
        </section>

        {/* ========== SECCIÓN 2: ANTECEDENTES ========== */}
        <section className={`space-y-4 ${activeSection !== 'antecedentes' ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Antecedentes</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Antecedentes familiares</label>
            <textarea
              value={formData.antecedentes_familiares || ''}
              onChange={(e) => handleChange('antecedentes_familiares', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Antecedentes familiares relevantes"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-4">Antecedentes Personales No Patológicos</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alimentación</label>
              <textarea
                value={formData.alimentacion || ''}
                onChange={(e) => handleChange('alimentacion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hábitos alimenticios"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Habitación</label>
              <textarea
                value={formData.habitacion || ''}
                onChange={(e) => handleChange('habitacion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Condiciones de vivienda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hábitos higiénicos</label>
              <textarea
                value={formData.habitos_higiene || ''}
                onChange={(e) => handleChange('habitos_higiene', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hábitos de higiene"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ocupación actual</label>
              <input
                type="text"
                value={formData.ocupacion_actual || ''}
                onChange={(e) => handleChange('ocupacion_actual', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Ocupación actual"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ocupación previa</label>
              <input
                type="text"
                value={formData.ocupacion_previa || ''}
                onChange={(e) => handleChange('ocupacion_previa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Ocupación previa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uso de tiempo libre</label>
              <input
                type="text"
                value={formData.tiempo_libre || ''}
                onChange={(e) => handleChange('tiempo_libre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Actividades de tiempo libre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inmunizaciones</label>
              <input
                type="text"
                value={formData.inmunizaciones || ''}
                onChange={(e) => handleChange('inmunizaciones', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Vacunas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conciencia de enfermedad</label>
              <input
                type="text"
                value={formData.conciencia_enfermedad || ''}
                onChange={(e) => handleChange('conciencia_enfermedad', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Percepción de su enfermedad"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Antecedentes Gineco-Obstétricos</label>
            <textarea
              value={formData.antecedentes_gineco || ''}
              onChange={(e) => handleChange('antecedentes_gineco', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="Menarca, gestas, partos, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Antecedentes Andrológicos</label>
            <textarea
              value={formData.antecedentes_andrologicos || ''}
              onChange={(e) => handleChange('antecedentes_andrologicos', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="Antecedentes andrológicos relevantes"
            />
          </div>
        </section>

        {/* ========== SECCIÓN 3: PADECIMIENTO ACTUAL ========== */}
        <section className={`space-y-4 ${activeSection !== 'padecimiento' ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Padecimiento Actual</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Motivo y circunstancia de la consulta</label>
            <textarea
              value={formData.motivo_consulta || ''}
              onChange={(e) => handleChange('motivo_consulta', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="Motivo de la consulta"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Síntoma y molestia principal</label>
            <textarea
              value={formData.sintoma_principal || ''}
              onChange={(e) => handleChange('sintoma_principal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="Síntoma principal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Síntomas acompañantes</label>
            <textarea
              value={formData.sintomas_acompaniantes || ''}
              onChange={(e) => handleChange('sintomas_acompaniantes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="Síntomas acompañantes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estudios paraclínicos</label>
            <textarea
              value={formData.estudios_paraclinicos || ''}
              onChange={(e) => handleChange('estudios_paraclinicos', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="Estudios realizados"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Terapéutica empleada y resultados</label>
            <textarea
              value={formData.terapeutica_empleada || ''}
              onChange={(e) => handleChange('terapeutica_empleada', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="Tratamiento y resultados"
            />
          </div>
        </section>

        {/* ========== SECCIÓN 4: INTERROGATORIO POR APARATOS ========== */}
        <section className={`space-y-4 ${activeSection !== 'interrogatorio' ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Interrogatorio por Aparatos y Sistemas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aparato Respiratorio</label>
              <textarea
                value={formData.respiratorio || ''}
                onChange={(e) => handleChange('respiratorio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos respiratorios"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aparato Digestivo</label>
              <textarea
                value={formData.digestivo || ''}
                onChange={(e) => handleChange('digestivo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos digestivos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aparato Cardiovascular</label>
              <textarea
                value={formData.cardiovascular || ''}
                onChange={(e) => handleChange('cardiovascular', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos cardiovasculares"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aparato Renal y Urinario</label>
              <textarea
                value={formData.renal_urinario || ''}
                onChange={(e) => handleChange('renal_urinario', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos renales"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aparato Genital Masculino</label>
              <textarea
                value={formData.genital_masculino || ''}
                onChange={(e) => handleChange('genital_masculino', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos genitales masculinos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aparato Genital Femenino</label>
              <textarea
                value={formData.genital_femenino || ''}
                onChange={(e) => handleChange('genital_femenino', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos genitales femeninos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sistema Endocrino</label>
              <textarea
                value={formData.endocrino || ''}
                onChange={(e) => handleChange('endocrino', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos endocrinos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sistema Hematopoyético y Linfático</label>
              <textarea
                value={formData.hematopoyetico || ''}
                onChange={(e) => handleChange('hematopoyetico', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos hematológicos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Piel y Anexos</label>
              <textarea
                value={formData.piel_anexos || ''}
                onChange={(e) => handleChange('piel_anexos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos dermatológicos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Musculoesquelético</label>
              <textarea
                value={formData.musculoesqueletico || ''}
                onChange={(e) => handleChange('musculoesqueletico', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos musculoesqueléticos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sistema Nervioso</label>
              <textarea
                value={formData.nervioso || ''}
                onChange={(e) => handleChange('nervioso', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos neurológicos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Órganos de los Sentidos</label>
              <textarea
                value={formData.organos_sentidos || ''}
                onChange={(e) => handleChange('organos_sentidos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en órganos sensoriales"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Esfera Psíquica</label>
              <textarea
                value={formData.esfera_psiquica || ''}
                onChange={(e) => handleChange('esfera_psiquica', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Estado mental y emocional"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Síntomas Generales</label>
              <textarea
                value={formData.sintomas_generales || ''}
                onChange={(e) => handleChange('sintomas_generales', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Síntomas generales"
              />
            </div>
          </div>
        </section>

        {/* ========== SECCIÓN 5: EXPLORACIÓN FÍSICA ========== */}
        <section className={`space-y-4 ${activeSection !== 'exploracion' ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Exploración Física</h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-4">Signos Vitales y Somatometría</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pulso</label>
              <input
                type="text"
                value={formData.signos_vitales?.pulso || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'pulso', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Pulso"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presión arterial</label>
              <input
                type="text"
                value={formData.signos_vitales?.presion_arterial || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'presion_arterial', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperatura</label>
              <input
                type="text"
                value={formData.signos_vitales?.temperatura || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'temperatura', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="36.5°C"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia respiratoria</label>
              <input
                type="text"
                value={formData.signos_vitales?.frecuencia_respiratoria || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'frecuencia_respiratoria', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="16 rpm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia cardiaca</label>
              <input
                type="text"
                value={formData.signos_vitales?.frecuencia_cardiaca || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'frecuencia_cardiaca', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="72 lpm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso</label>
              <input
                type="text"
                value={formData.signos_vitales?.peso || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'peso', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="70 kg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Talla</label>
              <input
                type="text"
                value={formData.signos_vitales?.talla || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'talla', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="1.70 m"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IMC</label>
              <input
                type="text"
                value={formData.signos_vitales?.imc || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'imc', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="24.2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Otros</label>
              <input
                type="text"
                value={formData.signos_vitales?.otros || ''}
                onChange={(e) => handleNestedChange('signos_vitales', 'otros', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Otros signos"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-4">Exploración por Regiones</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cabeza</label>
              <textarea
                value={formData.exploracion?.cabeza || ''}
                onChange={(e) => handleNestedChange('exploracion', 'cabeza', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en cabeza"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuello</label>
              <textarea
                value={formData.exploracion?.cuello || ''}
                onChange={(e) => handleNestedChange('exploracion', 'cuello', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en cuello"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tórax</label>
              <textarea
                value={formData.exploracion?.torax || ''}
                onChange={(e) => handleNestedChange('exploracion', 'torax', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en tórax"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Abdomen</label>
              <textarea
                value={formData.exploracion?.abdomen || ''}
                onChange={(e) => handleNestedChange('exploracion', 'abdomen', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en abdomen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Región inguino-crural</label>
              <textarea
                value={formData.exploracion?.inguino_crural || ''}
                onChange={(e) => handleNestedChange('exploracion', 'inguino_crural', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos inguinales"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genitales externos</label>
              <textarea
                value={formData.exploracion?.genitales_externos || ''}
                onChange={(e) => handleNestedChange('exploracion', 'genitales_externos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en genitales externos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tacto vaginal</label>
              <textarea
                value={formData.exploracion?.tacto_vaginal || ''}
                onChange={(e) => handleNestedChange('exploracion', 'tacto_vaginal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en tacto vaginal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tacto rectal</label>
              <textarea
                value={formData.exploracion?.tacto_rectal || ''}
                onChange={(e) => handleNestedChange('exploracion', 'tacto_rectal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en tacto rectal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Extremidades</label>
              <textarea
                value={formData.exploracion?.extremidades || ''}
                onChange={(e) => handleNestedChange('exploracion', 'extremidades', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en extremidades"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Columna vertebral</label>
              <textarea
                value={formData.exploracion?.columna || ''}
                onChange={(e) => handleNestedChange('exploracion', 'columna', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos en columna"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exploración neurológica</label>
              <textarea
                value={formData.exploracion?.neurologica || ''}
                onChange={(e) => handleNestedChange('exploracion', 'neurologica', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Hallazgos neurológicos"
              />
            </div>
          </div>
        </section>

        {/* ========== SECCIÓN 6: DIAGNÓSTICOS ========== */}
        <section className={`space-y-4 ${activeSection !== 'diagnosticos' ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Diagnósticos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sintomáticos</label>
              <textarea
                value={formData.diagnosticos?.sintomaticos || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'sintomaticos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico sintomático"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Signológicos</label>
              <textarea
                value={formData.diagnosticos?.signologicos || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'signologicos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico signológico"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sindromáticos</label>
              <textarea
                value={formData.diagnosticos?.sindromaticos || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'sindromaticos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico sindromático"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anatomotopográficos</label>
              <textarea
                value={formData.diagnosticos?.anatomotopograficos || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'anatomotopograficos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico anatomotopográfico"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fisiopatológicos</label>
              <textarea
                value={formData.diagnosticos?.fisiopatologicos || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'fisiopatologicos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico fisiopatológico"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Por laboratorio y/o gabinete</label>
              <textarea
                value={formData.diagnosticos?.laboratorio || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'laboratorio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico por laboratorio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Etiológico</label>
              <textarea
                value={formData.diagnosticos?.etiologico || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'etiologico', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico etiológico"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nosológico</label>
              <textarea
                value={formData.diagnosticos?.nosologico || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'nosologico', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico nosológico"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diferenciales</label>
              <textarea
                value={formData.diagnosticos?.diferenciales || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'diferenciales', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnósticos diferenciales"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Integral</label>
              <textarea
                value={formData.diagnosticos?.integral || ''}
                onChange={(e) => handleNestedChange('diagnosticos', 'integral', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Diagnóstico integral"
              />
            </div>
          </div>
        </section>

        {/* ========== SECCIÓN 7: PLAN ========== */}
        <section className={`space-y-4 ${activeSection !== 'plan' ? 'hidden' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Plan</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan de manejo y tratamiento</label>
            <textarea
              value={formData.plan_manejo || ''}
              onChange={(e) => handleChange('plan_manejo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Plan de manejo y tratamiento"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pronóstico</label>
            <textarea
              value={formData.pronostico || ''}
              onChange={(e) => handleChange('pronostico', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Pronóstico"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Criterios de referencia</label>
            <textarea
              value={formData.criterios_referencia || ''}
              onChange={(e) => handleChange('criterios_referencia', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Criterios de referencia"
            />
          </div>
        </section>

        {/* ========== BOTÓN DE ENVÍO ========== */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              setFormData({});
              // Reset form logic
            }}
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