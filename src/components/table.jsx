import { useState } from "react";
import Navbar from "./Navbar";

export default function Table() {
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const dados = [
        { id: 1, status: 1, dataEntrada: '21-03-2022', dataSaida: '23-03-2022', referencia: '122', mensalidade: '120', nome: 'Empresa1'},
        { id: 2, status: 0, dataEntrada: '21-03-2022', dataSaida: '22-03-2022', referencia: '112', mensalidade: '123', nome: 'Empresa2' },
    ];

    // Função de filtragem
    const filteredData = dados.filter(item => {
        const matchesStatus = statusFilter ? item.status === (statusFilter === "Ativo" ? 1 : 0) : true;
        const matchesDate = dateFilter ? item.dataEntrada === dateFilter : true;
        const matchesSearch = searchQuery ? 
            item.referencia.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.nome.toLowerCase().includes(searchQuery.toLowerCase()) 
            : true;

        return matchesStatus && matchesDate && matchesSearch;
    });

    return (
        <div>
            <Navbar 
                setStatusFilter={setStatusFilter} 
                setDateFilter={setDateFilter} 
                setSearchQuery={setSearchQuery}
            />
            <div className="flex justify-center p-8">
                <div className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-100 p-4 flex items-center justify-between">
                        <div className="text-orange-500 font-semibold">{statusFilter || "Filtrar por Status"}</div>
                    </div>
                    <div className="grid grid-cols-6 bg-gray-200 p-3">
                        <div className="font-bold">Status</div>
                        <div className="font-bold">Data de Entrada</div>
                        <div className="font-bold">Data de Saida</div>
                        <div className="font-bold">Referencia</div>
                        <div className="font-bold">Valor</div>
                        <div className="font-bold">Nome</div>
                    </div>
                    {filteredData.map((item) => (
                        <div key={item.id} className="grid grid-cols-6 p-2 border-t border-gray-300">
                            <div className={item.status === 1 ? 'text-green-500' : 'text-orange-500'}>{item.status === 1 ? 'Ativo' : 'Inativo'}</div>
                            <div>{item.dataEntrada}</div>
                            <div>{item.dataSaida}</div>
                            <div>{item.referencia}</div>
                            <div>R${item.mensalidade}</div>
                            <div>{item.nome}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
