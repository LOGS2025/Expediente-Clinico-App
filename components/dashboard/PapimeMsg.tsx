export const Inicio = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        {/* Accent line */}
        <div
          className="w-24 h-1 mx-auto mb-8 rounded-full"
          style={{ backgroundColor: '#C49A2E' }}
        />

        {/* Main text */}
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700">
          Este proyecto ha sido apoyado por el{' '}
          <span className="font-bold" style={{ color: '#002D72' }}>
            Programa de Apoyo a Proyectos para la Innovación y Mejoramiento de la Enseñanza
          </span>{' '}
          de la{' '}
          <span className="font-semibold" style={{ color: '#002D72' }}>
            Dirección General de Asuntos del Personal Académico
          </span>{' '}
          de la{' '}
          <span className="font-bold" style={{ color: '#C49A2E' }}>
            UNAM
          </span>
          :
        </p>

        {/* Project title - emphasized */}
        <h2
          className="mt-8 text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-wide leading-snug"
          style={{ color: '#002D72' }}
        >
          Sistema de Expediente Clínico Didáctico
          <br />
          <span className="text-base md:text-lg lg:text-xl font-bold" style={{ color: '#685652' }}>
            para el desarrollo de competencias en teleconsulta
            <br />
            en estudiantes de pregrado de medicina
          </span>
        </h2>

        {/* Project code badge */}
        <div className="mt-8 inline-block">
          <span
            className="px-5 py-2 rounded-full text-sm md:text-base font-bold tracking-widest"
            style={{
              backgroundColor: '#C49A2E',
              color: '#FFFFFF',
            }}
          >
            PAPIME PE207226
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          className="w-24 h-1 mx-auto mt-8 rounded-full"
          style={{ backgroundColor: '#C49A2E' }}
        />
      </div>
    </div>
  );
};