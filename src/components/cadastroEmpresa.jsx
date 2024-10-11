import { useState } from 'react';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [referencia, setReferencia] = useState('');
  const [valorMensalidade, setValorMensalidade] = useState('');
  const [status, setStatus] = useState(1)

  const handleSubmit = e => {
    e.preventDefault();

    const novoProduto = {
      status,
      nome,
      dataEntrada,
      referencia,
      valorMensalidade,
    };

    const produtosExistentes = JSON.parse(localStorage.getItem('produtos')) || [];

    const novosProdutos = [...produtosExistentes, novoProduto];

    localStorage.setItem('produtos', JSON.stringify(novosProdutos));

    setStatus('')
    setNome('');
    setDataEntrada('');
    setReferencia('');
    setValorMensalidade('');

    alert('Produto salvo no localStorage!');
  };

  return (
    <div className="flex ">
      <div className="bg-white rounded-lg p-3">
        <h1 className="text-2xl font-bold ml-32 text-start text-blue-900 mb-4">Cadastro de Clientes</h1>
        <form onSubmit={handleSubmit} className="flex grid-cols-2 gap-4 item-center justify-center ml-96">
          <div className="col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Digite o nome do produto"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Data de Entrada
            </label>
            <input
              type="date"
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Referência
            </label>
            <input
              type="text"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              required
              placeholder="Digite a referência"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Valor da Mensalidade
            </label>
            <input
              type="number"
              value={valorMensalidade}
              onChange={(e) => setValorMensalidade(e.target.value)}
              required
              placeholder="Digite o valor da mensalidade"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-900 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
