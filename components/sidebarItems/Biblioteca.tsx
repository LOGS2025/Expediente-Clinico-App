import { useMainItems } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";


export const Biblioteca = ()=>{
    const sidebarItems = useMainItems();
    const router = useRouter();


    return (
        <div className="p-10">
        <div className="flex flex-col items-center text-center w-full mb-8">
            <div
            className="w-20 h-1 rounded-full mb-4"
            style={{ backgroundColor: '#C49A2E' }}
            />

            <h2
            className="font-['Manrope'] font-bold text-4xl"
            style={{ color: '#002D72' }}
            >
            Biblioteca
            </h2>

            <p
            className="text-xl mt-2 font-medium tracking-wide"
            style={{ color: '#685652' }}
            >
            Recursos de teleaprendizaje
            </p>

            <div
            className="w-20 h-1 rounded-full mt-4"
            style={{ backgroundColor: '#C49A2E' }}
            />
        </div>

        <section
            className="
            grid grid-cols-3 gap-6
            max-w-4xl mx-auto
            place-items-center
            text-blue-950
            "
        >
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