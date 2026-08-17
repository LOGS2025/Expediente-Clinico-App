const Button = ({text, onClick}:{text: string; onClick?: ()=>void;})=>{
    return (
        <div className="flex items-center justify-center p-8">
        <button onClick={onClick} className="group relative px-8 py-4 bg-slate-800 rounded-xl font-bold text-white overflow-hidden transform transition-all duration-300 hover:scale-110">
                <span className="relative z-10">{text}</span>
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-emerald-500 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
        </div>
    )
}

export default Button;