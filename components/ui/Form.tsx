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
      <div className="flex gap-3 pt-2 items-center justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-3xs p-5 bg-blue-950 py-3 bg-primary text-gray-300 font-light rounded-xl text-xs uppercase tracking-widest 
                        gap-2 hover:text-white hover:font-bold transition-all
                        ">
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