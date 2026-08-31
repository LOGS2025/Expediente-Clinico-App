import Link from "next/link"

export const Footer = () => {
    return(
        <div className="bg-slate-800 flex flex-col items-center justify-center p-4 pt-5 pb-5 text-base">
            <section className="w-full flex flex-row md:flex-col">
                <div className="flex-1 flex-col p-5">
                    <h3 className="font-bold">CENTRAL DE ATENCION DE EMERGENCIAS [CAE]</h3>
                    <li className="flex flex-col">
                        <a href="">55 5616 0523</a>
                        <a href="">DESDE CUALQUIER EXTENSIÓN TELEFÓNICA DE LA UNAM</a>
                        <a href="">SOLO MARCAR (CAE) 55</a>
                    </li>
                </div>

                <div className="flex-1 flex-col p-5">
                    <span>Descarga la aplicación 
                        <Link className="hover:text-green-800 text-gray-600 underline" href={''}> SOS UNAM </Link>
                        </span>
                    <h3 className="font-bold">PROTECCIÓN CIVIL FM</h3>
                    <li className="flex flex-col">
                    <a>45 189</a>
                    <a>32 419</a>
                    </li>
                </div>
            </section>

            <section className="flex flex-col items-center justify-center p-5">
                <ul className="flex flex-row flex-wrap items-center justify-center 
                gap-x-7 gap-y-1 
                list-disc w-[75%]">
                    <li>FACULTAD DE MEDICINA </li>
                    <li>CIRCUITO INTERIOR </li>
                    <li>CIUDAD UNIVERSITARIA </li>
                    <li>AV. UNIVERSIDAD 3000 </li>
                    <li>CP 04510</li>
                </ul>
                
                <span className="text-gray-500 text-sm p-3">AVISO DE PRIVACIDAD</span>
                <Link className="text-yellow-600 underline text-sm p-3" href={''}>[ INTEGRAL | SIMPLIFICADO ]</Link>
                <Link className="text-yellow-600 underline text-sm p-3" href={''}>CONVENIOS</Link>


                <Link className="text-yellow-600 underline text-sm" href={''}>DOCUMENTO DE SEGURIDAD EN MATERIA DE DATOS PERSONALES</Link>
                <Link className="text-yellow-600 underline text-sm" href={''}>RESOLUCIÓN DEL COMITÉ DE TRANSPARENCIA</Link>
            </section>

            <section>

            </section>
        </div>
    )
}