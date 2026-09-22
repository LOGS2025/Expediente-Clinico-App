// lib/data/apcs.ts
export interface APC {
  id: string;
  short: string;
  title: string;
  description: string;
  color: string;
}

export const APCS: APC[] = [
  {
    id: 'apc1',
    short: 'APC 1',
    title: 'Identificar la viabilidad de la teleconsulta',
    description: 'Determina si la atención a distancia es clínica, tecnológica, ética y operativamente apropiada.',
    color: '#27363F',
  },
  {
    id: 'apc2',
    short: 'APC 2',
    title: 'Realizar la historia clínica mediante teleconsulta',
    description: 'Obtiene información clínica relevante, completa y ordenada mediante comunicación remota.',
    color: '#685652',
  },
  {
    id: 'apc3',
    short: 'APC 3',
    title: 'Dirigir la exploración física en telemedicina',
    description: 'Selecciona, explica y dirige maniobras de exploración remota seguras.',
    color: '#8EA1AE',
  },
  {
    id: 'apc4',
    short: 'APC 4',
    title: 'Integrar el diagnóstico clínico',
    description: 'Construye una representación del problema, genera diagnósticos diferenciales.',
    color: '#6B212C',
  },
  {
    id: 'apc5',
    short: 'APC 5',
    title: 'Prescribir el tratamiento inicial',
    description: 'Establece un plan terapéutico seguro, basado en evidencia y adaptado al contexto.',
    color: '#BEB3AC',
  },
  {
    id: 'apc6',
    short: 'APC 6',
    title: 'Realizar teleinterconsulta',
    description: 'Solicita y coordina apoyo de otro profesional mediante una pregunta clínica clara.',
    color: '#27363F',
  },
  {
    id: 'apc7',
    short: 'APC 7',
    title: 'Recomendar promoción y prevención a distancia',
    description: 'Identifica riesgos y oportunidades preventivas, ofrece recomendaciones pertinentes.',
    color: '#685652',
  },
  {
    id: 'apc8',
    short: 'APC 8',
    title: 'Realizar seguimiento a distancia',
    description: 'Evalúa evolución, respuesta, adherencia y seguridad; actualiza el plan.',
    color: '#8EA1AE',
  },
];