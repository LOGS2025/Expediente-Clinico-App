const Button = ({text, onClick}:{text: string; onClick?: ()=>void;})=>{
    return (
        <div className="flex items-center justify-center p-8">
            <button onClick={onClick} className="w-full p-5 bg-blue-950 py-3 bg-primary text-gray-300 font-light rounded-xl text-xs uppercase tracking-widest 
                        gap-2 hover:text-white hover:font-bold transition-all
                        ">
            {text}</button>
        </div>
    )
}

export default Button;