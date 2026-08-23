import "./CapibaraLoadingScreen.css"

export const CapibaraLoadingScreen = ({count}:{count:number}) => {
    return (
        <>
            <div className="capybaraloader">
            <div className="capybara">
                <div className="capyhead">
                <div className="capyear">
                    <div className="capyear2"></div>
                </div>
                <div className="capyear"></div>
                <div className="capymouth">
                    <div className="capylips"></div>
                    <div className="capylips"></div>
                </div>
                <div className="capyeye"></div>
                <div className="capyeye"></div>
                </div>
                <div className="capyleg"></div>
                <div className="capyleg2"></div>
                <div className="capyleg2"></div>
                <div className="capy"></div>
            </div>
            <div className="loader">
                <div className="loaderline"></div>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    Esperando participantes
                </h1>
                <p className="text-white/40 text-sm font-medium">
                    Participantes conectados: <span className="text-blue-400 font-bold">{count}</span> de 3
                </p>
            </div>
            </div>
        </>
    )
}