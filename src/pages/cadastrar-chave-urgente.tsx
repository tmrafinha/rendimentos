import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { SecundaryHeader } from "../components/secundary-header";
import Modal from 'react-modal';
import { BiCheck } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im"; // Loader Spinner
import fgts from "../assets/f-logo.png"

// Estilo do modal
const modalStyles: Modal.Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3rem 2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '90%',
        width: '400px',
        border: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
    },
};

// Interface para definir a estrutura da chave PIX
interface PixKey {
    chave: string;
    banco: string;
    tipo: string;
}

export function CadastrarChavesUrgente() {
    const [pixList, setPixList] = useState<PixKey[]>([]);
    const [newPix, setNewPix] = useState<PixKey>({ chave: "", banco: "", tipo: "" });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carregamento


    useEffect(() => {
        const storedPix = localStorage.getItem("pixList");
        if (storedPix) {
            setPixList(JSON.parse(storedPix) as PixKey[]);
        }
    }, []);

    const saveToLocalStorage = (list: PixKey[]) => {
        localStorage.setItem("pixList", JSON.stringify(list));
    };

    const handleAddPix = () => {
        if (!newPix.chave || !newPix.banco || !newPix.tipo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Inicia o carregamento
        setIsLoading(true);

        // Simula o processo de cadastro com um delay de 3 segundos
        setTimeout(() => {
            const updatedList: PixKey[] = [...pixList, newPix];
            setPixList(updatedList);
            saveToLocalStorage(updatedList);
            setNewPix({ chave: "", banco: "", tipo: "" });
            setIsLoading(false); // Finaliza o carregamento
            setIsModalOpen(true); // Abre o modal de confirmação
        }, 3000);
    };

    const handleRemovePix = (index: number) => {
        const updatedList = pixList.filter((_, i) => i !== index);
        setPixList(updatedList);
        saveToLocalStorage(updatedList);
    };

    return (
        <div>
            <SecundaryHeader />
            <div className="flex items-center px-4 py-6 space-x-2">
                <div className="bg-orange-500 p-3 rounded-full w-fit">
                    <img src={fgts} alt="Logo" className="h-6 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-zinc-800">CADASTRE SUA <br /> CHAVE PIX</h1>
            </div>

            {/* Listagem das Chaves PIX */}
            <div className="px-4">
                {pixList.length > 0 ? (
                    <div className="space-y-4">
                        {pixList.map((pix, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-zinc-100 p-4 rounded-lg shadow-md"
                            >
                                <div>
                                    <p className="text-lg font-semibold">{pix.chave}</p>
                                    <p className="text-sm text-gray-600">
                                        {pix.tipo} - {pix.banco}
                                    </p>
                                </div>
                                <FaTrash
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => handleRemovePix(index)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        Nenhuma chave PIX cadastrada.
                    </p>
                )}
            </div>

            {/* Formulário para Adicionar Nova Chave */}
            <div className="px-4 mt-8 space-y-4">


                <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Chave</label>
                    <select
                        value={newPix.tipo}
                        onChange={(e) => setNewPix({ ...newPix, tipo: e.target.value })}
                        className="w-full p-3 border rounded-lg text-zinc-800 bg-white"
                    >
                        <option value="">Selecione o tipo</option>
                        <option value="CPF">CPF</option>
                        <option value="CNPJ">CNPJ</option>
                        <option value="E-MAIL">E-mail</option>
                        <option value="PHONE">Telefone</option>
                        <option value="RANDOM">Chave aleatória</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Banco</label>
                    <select
                        value={newPix.banco}
                        onChange={(e) => setNewPix({ ...newPix, banco: e.target.value })}
                        className="w-full p-3 border rounded-lg text-zinc-800 bg-white"
                    >
                        <option value="">Selecione o banco</option>
                        <option value="Banco do Brasil">Banco do Brasil</option>
                        <option value="Caixa Econômica Federal">Caixa Econômica Federal</option>
                        <option value="Bradesco">Bradesco</option>
                        <option value="Itaú">Itaú</option>
                        <option value="Santander">Santander</option>
                        <option value="Nubank">Nubank</option>
                        <option value="C6 Bank">C6 Bank</option>
                        <option value="Banco Inter">Banco Inter</option>
                        <option value="Viacredi">Viacredi</option>
                        <option value="Cooperativa de crédito">Cooperativa de crédito</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Chave PIX</label>
                    <input
                        type="text"
                        placeholder="Digite sua chave PIX"
                        value={newPix.chave}
                        onChange={(e) => setNewPix({ ...newPix, chave: e.target.value })}
                        className="w-full p-3 border rounded-lg text-zinc-800 bg-white"
                    />
                </div>

                <button
                    onClick={handleAddPix}
                    disabled={isLoading}
                    className={`w-full text-white p-3 rounded-lg flex items-center justify-center space-x-2 ${isLoading ? "bg-primary" : "bg-orange-400"
                        }`}
                >
                    {isLoading ? (
                        <ImSpinner2 className="animate-spin text-xl" />
                    ) : (
                        <>
                            <FaPlus />
                            <span>Adicionar Chave PIX</span>
                        </>
                    )}
                </button>

                <div>
                    {pixList.length > 0 && (
                        <a className="" href="/processarpagamento">
                            <button
                                disabled={isLoading}
                                className={`w-full text-white p-3 rounded-lg bg-primary flex items-center justify-center space-x-2}`}
                            >
                                Ir para o saque
                            </button>
                        </a>
                    )}
                </div>
            </div>

            {/* Modal de Confirmação */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={modalStyles}
                contentLabel="Confirmação"
            >
                <div className="text-center flex flex-col items-center">
                    <div className="bg-primary p-4 rounded-full w-fit mb-6">
                        <BiCheck className="text-white text-6xl" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Chave PIX cadastrada com sucesso!</h2>
                    <p className="text-gray-600 mb-4">Agora você pode utilizá-la para transferências.</p>
                    <a href="/processarpagamento" className="w-full">
                        <button
                            className="bg-orange-400 text-white px-6 py-2 w-full rounded-lg"
                        >
                            IR PARA O SAQUE
                        </button>
                    </a>
                </div>
            </Modal>
        </div>
    );
}
