import { useLayout } from "@/providers/LayoutContext";
import { useExpedienteClinicoItems, useSideBarItems } from "@/lib/utils/index";
import { useState } from "react";
import Image from "next/image";
import { TeletriageImage } from "@/assets/images";

const SupervisorDashboardLayout = ()=> {
    const sidebarItems = useSideBarItems();
    const expClinicoItems = useExpedienteClinicoItems();
    const [display, setDisplay ] = useState<boolean>(false);
    const { ActiveItem, setItem } = useLayout();

    return (
        <div className="flex flex-col justify-center bg-gray-50 rounded-t-3xl m-5 mb-0 p-2">
        <div className="flex flex-col p-2 text-4xl text-center w-full">
            <h2 className="font-['Manrope'] font-bold text-blue-900" >
                Biblioteca</h2>
            <p className="text-2xl text-slate-500" >
                Recursos de teleaprendizaje</p>
        </div>
        <section className="flex flex-row flex-wrap gap-16 w-full p-5 text-blue-950">
            {sidebarItems.map((item)=>{
                const Item = item.component;
                return (
                <div
                key={item.name}
                onClick={() => {}}
            className="flex flex-col bg-white rounded-2xl
                border border-gray-200 overflow-hidden
                min-h-25 w-[25%] z-0
                shadow-xl/30
                cursor-pointer
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-2xl/40 hover:-translate-y-1
                hover:border-gray-300"
                >
                    <div className="relative w-full h-62.5">
                        <Image
                        src={TeletriageImage.src}
                        alt=""
                        fill
                        className="object-cover z-0"
                        />
                    </div>
                    <div className="p-4">
                        <h1 className="text-blue-950 text-xs">{item.name}</h1>
                        <p className="font-extralight text-justify">
                            Renewable energy becomes an asset to the world's energy resource for its eco-friendly and low cost
                            energy production feature. As an important renewable energy source, wind turbine technology has
                            become a significant contributor to the world energy production because of its feasible production cost,
                            reliability and efficiency.
                        </p>
                    </div>
                </div>
                )
            })}
        </section>
        </div>
    )
}

export default SupervisorDashboardLayout;

//         {/*  Loop for each sidebar item and its attributes */}
//         <nav className="flex flex-col gap-1">
//             {sidebarItems.map((item) => {
//                 return (
//                     <span key={item.name}>
//                         <button 
//                         onClick={()=>{
//                             if ( ActiveItem == item.component ) {
//                                 setItem(()=>null);
//                             } else {
//                                 setItem(()=>item.component); 
//                             }
//                         } }
//                         // w-full p-5 bg-blue-950 py-3 bg-primary text-gray-300 font-light rounded-xl text-xs uppercase tracking-widest 
//                         // gap-2 hover:text-white hover:font-bold transition-all
//                         className="
// h-[100px] p-5 border-b-2
// text-gray-300 font-light text-xs uppercase tracking-widest
// w-full flex flex-row items-center gap-2 
// px-4 py-3 hover:rounded-lg
// transition-all duration-300 ease-in-out
// hover:scale-130 hover:font-bold 
// hover:shadow-lg hover:shadow-xl/30
// hover:bg-blue-950
// focus:outline-none focus:ring-2 focus:ring-blue-400
//                         ">
//           <span className="material-symbols-outlined text-sm">{item.name}</span>
//                         </button>
//                     </span>
//                 )
//             })}

//         <div className="flex flex-col w-full">
//             {/* Main Button - Toggle */}
//             <button 
//             onClick={() => setDisplay(!display)}
//             className="
// w-full p-5 py-3 border-b-2
// text-gray-300 font-light text-xs uppercase tracking-widest
// transition-all duration-300 ease-in-out
// hover:text-white hover:font-bold
//             ">
//             <span>Expediente Clínico</span>
//             </button>

//             {/* Dropdown Menu */}
//             <div 
//             className={`
//                 overflow-hidden transition-all duration-300 ease-in-out
//                 ${display ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
//             `}
//             >
//                 <div className="flex flex-col gap-8">
//                     {expClinicoItems.map((item) => (
//                     <button
//                         key={item.name}
//                         onClick={() => setItem(()=>item.component)}
//                         className={`w-full p-5 bg-blue-950 rounded-2xl font-light 
//                             text-sm hover:text-white hover:font-bold
//                             `}
//                     >
//                         <span className="">{item.name}</span>
//                     </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//         </nav>