import { useMainItems } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";


export const Biblioteca = ()=>{
    const sidebarItems = useMainItems();
    const router = useRouter();


    return (
                <div className="
        
        ">
        <div className="flex flex-col p-2 text-4xl text-center w-full">
            <h2 className="font-['Manrope'] font-bold text-blue-900" >
                Biblioteca</h2>
            <p className="text-2xl text-slate-500" >
                Recursos de teleaprendizaje</p>
        </div>
        <section className="flex flex-row flex-wrap gap-16 w-full p-5 text-blue-950">
            {sidebarItems.map((item)=>{
                return (
                <div
                key={item.name}
                onClick={() => {
                    router.push(item.url);                    
                }}
            className="flex flex-col bg-white rounded-2xl
                border border-gray-200 overflow-hidden
                max-h-175 min-h-25 
                max-w-75 min-w-67.5 
                z-0
                shadow-xl/30
                cursor-pointer
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-2xl/40 hover:-translate-y-1
                hover:border-gray-300"
                >
                    {/* Only show image if there is one */}
                    {item.icon.src && <div className="relative w-full h-[100px]">
                        <Image
                        src={item.icon.src}
                        alt=""
                        fill
                        className="object-cover z-0"
                        />
                    </div>}

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