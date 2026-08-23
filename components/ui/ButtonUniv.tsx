const Button = ({text, onClick}:{text: string; onClick?: ()=>void;})=>{
    return (
        <div className="flex items-center justify-center p-8">
            <button onClick={onClick} className="w-full bg-blue-600 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest 
                        shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
            {text}</button>
        </div>
    )
}

export default Button;