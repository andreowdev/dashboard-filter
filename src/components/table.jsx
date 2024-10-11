import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

function Detalhes() {

    return (
        <div className="flex justify-center text-center w-full">
            <h1>DETALHES SOBRE O CLIENTE</h1>
        </div>
    );
}    

Detalhes.propTypes = {
    item: PropTypes.shape({
        nome: PropTypes.string.isRequired,
        dataEntrada: PropTypes.string.isRequired,
        referencia: PropTypes.string.isRequired,
        valorMensalidade: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired, 
};

export default function Table() {
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [dados, setDados] = useState([]);
    const [detalhesIndex, setDetalhesIndex] = useState(null); 

    useEffect(() => {
        const produtos = localStorage.getItem('produtos');
        if (produtos) {
            try {
                const parsedData = JSON.parse(produtos);
                if (Array.isArray(parsedData)) {
                    setDados(parsedData);
                } else if (parsedData && typeof parsedData === 'object') {
                    setDados([parsedData]);
                } else {
                    console.error("Os dados armazenados não são válidos:", parsedData);
                }
            } catch (error) {
                console.error("Erro ao parsear os dados do localStorage:", error);
            }
        }
    }, []);

    const updateItem = (updatedItem) => {
        const newData = dados.map((item, index) =>
            index === detalhesIndex ? updatedItem : item
        );
        setDados(newData);
        localStorage.setItem('produtos', JSON.stringify(newData)); 
    };

    // Função de filtragem
    const filteredData = dados.filter(item => {
        const matchesStatus = statusFilter ? item.status === (statusFilter === "Ativo" ? 1 : 0) : true;
        const matchesDate = dateFilter ? item.dataEntrada === dateFilter : true;
        const matchesSearch = searchQuery
            ? item.referencia?.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.nome?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchesStatus && matchesDate && matchesSearch;
    });

    const openDetalhes = (index) => {
        setDetalhesIndex(detalhesIndex === index ? null : index); 
    }

    return (
        <div>
            <Navbar 
                setStatusFilter={setStatusFilter} 
                setDateFilter={setDateFilter} 
                setSearchQuery={setSearchQuery}
            />
            <div className="flex justify-center p-8">
                <div className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-md overflow-hidden p-3">
                    <div className="grid grid-cols-6 bg-gray-200 p-3 text-center rounded-lg shadow-md">
                        <div className="font-bold">Status</div>
                        <div className="font-bold">Nome</div>
                        <div className="font-bold">Data de Entrada</div>
                        <div className="font-bold">Referencia</div>
                        <div className="font-bold">Valor</div>
                        <div className="font-bold">Detalhes</div>
                    </div>
                    {filteredData.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">Nenhum dado encontrado.</div>
                    ) : (
                        filteredData.map((item, index) => (
                            <div key={index} className="grid grid-cols-6 p-3  my-2 border border-[#9fa5aa] rounded-lg text-center font-sans">
                                <div className={item.status === 1 ? 'text-green-500' : 'text-orange-500'}>
                                    {item.status === 1 ? 'Ativo' : 'Inativo'}
                                </div>
                                <div>{item.nome}</div>
                                <div>{item.dataEntrada}</div>
                                <div>{item.referencia}</div>
                                <div>R${item.valorMensalidade}.00</div>
                                <button 
                                    onClick={() => openDetalhes(index)} 
                                    className="text-blue-500 hover:underline"
                                >
                                    {detalhesIndex === index ? 'Fechar' : 'Abrir'}
                                </button>
                                {detalhesIndex === index && <Detalhes item={item} onUpdate={updateItem} />}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
