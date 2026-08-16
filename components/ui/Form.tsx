// components/appointments/AppointmentForm.tsx
'use client';

import { useState } from 'react';

interface AppointmentFormData {
  fecha: string;
  hora: string;
  motif: string;
}

interface AppointmentFormProps {
  setForm: (data: AppointmentFormData) => void;
  onSuccess?: () => any;
  onCancel?: () => void;
  isLoading?: boolean;
}

const Form = ({
  setForm,
  onSuccess,
  onCancel,
  isLoading = false,
}: AppointmentFormProps) => {

  const [formData, setFormData] = useState<AppointmentFormData>({
    fecha: '',
    hora: '',
    motif: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setForm(updated);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    console.log("Pressed send!!!");
    e.preventDefault();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fecha */}
      <div>
        <label 
          htmlFor="fecha" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Fecha
        </label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          required
          value={formData.fecha}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Hora */}
      <div>
        <label 
          htmlFor="hora" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Hora
        </label>
        <input
          id="hora"
          name="hora"
          type="time"
          required
          value={formData.hora}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Motivo */}
      <div>
        <label 
          htmlFor="motif" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Motivo
        </label>
        <textarea
          id="motif"
          name="motif"
          rows={3}
          placeholder="Motivo de la consulta..."
          value={formData.motif}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Agendar Cita'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;