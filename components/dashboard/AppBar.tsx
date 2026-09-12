import { chatpgtSVG, listSVG } from "@/assets/images"
import Image from "next/image"



export const AppBar = ()=>{
    return (
    <div className="fixed bottom-10 right-10 z-50">
        <svg width="0" height="0" style={{position:"absolute"}}>
        <defs>
            <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
            </clipPath>
        </defs>
        </svg>

        <div className="relative">

        <div className="relative flex flex-row items-end gap-x-2 p-2">
            <div className="relative">
            <div
                style={{clipPath: "#squircleClip"}}
                className="w-14 h-14 bg-gradient-to-br 
                rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl
                ">
                <button onClick={()=>{
                    
                }}>
                    <Image src={chatpgtSVG} width={100} height={100} alt="chatgpt logo that takes to telemedicina" />
                </button>
            </div>
            </div>

            <div className="relative">
            <div
                style={{clipPath: "#squircleClip"}}
                className="w-14 h-14 bg-gradient-to-br 
                rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl
                ">
                <button onClick={()=>{

                }}>
                    <Image src={chatpgtSVG} width={80} height={80} alt="note svg to apc list" />
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
}