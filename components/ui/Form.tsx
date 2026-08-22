// components/appointments/AppointmentForm.tsx
'use client';

interface AppointmentFormProps {
  onSuccess?: () => any;
  onCancel?: () => void;
  isLoading?: boolean;
}

const Form = ({
  onSuccess,
  onCancel,
  isLoading = false,
}: AppointmentFormProps) => {

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Crear pareja'}
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