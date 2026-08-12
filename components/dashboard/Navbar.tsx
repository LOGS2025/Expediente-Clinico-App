'use client';

// Imports necesarios 
/*
    Informacion del paciente activo, si es que hay!
*/

const Navbar = ()=>{
    return (
        <section>
            <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm dark:shadow-none h-[18%]">
                <div className="flex items-center gap-6">
                  {/* Logo 
                    de la UNAM
                  */}
                  <div className="flex flex-col gap-1">
                    <img className="h-10 w-auto object-contain self-start" src="https://lh3.googleusercontent.com/aida/ADBb0ujH04yHt5EiXWt9ILbIGIH31MUHQujKRuY0mQixa_f8BuxQhZagwz9XWk6VeKfDmL7Y0cJz3Tb2fRoDOfIYNe3edO2BJeBSINbCo6FIM1rlV5vhpbhnp9rYTiWy43hQe3-Pv-ajAd_s9ZEcKoYUZaxo64flnVNme8M83WJAW6I_y1bDJ8uKBRL2DqqiGgRhDyRSroFOUCYKhT7vLWRCnaJcLqcd2hdtQTwXmYx3vrwc7yQ_gpH7TFKRc_pJ6D66y5c0MAuWzbEh7ug" alt="" />
                    <span className="text-lg font-black text-blue-800 dark:text-blue-300 tracking-tight font-['Manrope']" >
                        Sistema ECE Didáctico<br/>para Teleconsulta<br/>FacMed UNAM
                        </span>
                    </div>
                </div>

                {/* Apartados para diferentes paginas. 
                    Se encuentran en guias.
                */}
                <nav className="hidden md:flex items-center gap-8 mt-8">
                    <a className="text-slate-500 dark:text-slate-400 font-['Manrope'] font-bold text-lg hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
                        PRONAM y<br/>Guías Clínicas</a>
                    <a className="text-slate-500 dark:text-slate-400 font-['Manrope'] font-bold text-lg hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
                        Guía de teleconsulta</a>
                    <a className="text-slate-500 dark:text-slate-400 font-['Manrope'] font-bold text-lg hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
                        Guía de prescripción</a>
                    <a className="text-slate-500 dark:text-slate-400 font-['Manrope'] font-bold text-lg hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
                        Guía de Actividades Profesionales a Confiar</a>
                    <a className="text-slate-500 dark:text-slate-400 font-['Manrope'] font-bold text-lg hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">
                        Más recursos</a>
                </nav>

                {/* 
                    Informacion del paciente 
                        TODO -> Obtener de db
                    ##############################
                    Ideal mover al display de al videollamada para no mezclar deberes.
                */}
                <div className="h-12 w-px bg-outline-variant/30 mt-8"></div>
                <div className="flex flex-col mt-8">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">Paciente activo {}</span>
                    <span className="font-headline font-bold text-base text-primary">ID: EClin-26</span>
                </div>

            </div>
        </section>
    )
}

export default Navbar;