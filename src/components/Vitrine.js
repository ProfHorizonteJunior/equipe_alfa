import { useEffect, useState } from 'react';

export function Vitrine() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch('https://dummyjson.com/products?limit=30');
        if (!resposta.ok) throw new Error('Erro ao carregar os produtos');
        const dados = await resposta.json();
        setProdutos(dados.products);
        setProdutosFiltrados(dados.products);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutos();
  }, []);

  useEffect(() => {
    if (!termoBusca.trim()) {
      setProdutosFiltrados(produtos);
    } else {
      setProdutosFiltrados(
        produtos.filter(p =>
          p.title.toLowerCase().includes(termoBusca.toLowerCase())
        )
      );
    }
  }, [termoBusca, produtos]);

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-10 w-10 border-2 border-gray-300 border-t-black rounded-full"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg text-gray-800 mb-2">Erro ao carregar</p>
          <p className="text-gray-500 mb-4">{erro}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Produtos
          </h1>

          <input
            type="text"
            placeholder="Buscar produtos..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
          />

          <p className="text-sm text-gray-400 mt-2">
            {produtosFiltrados.length} resultados
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {produtosFiltrados.length === 0 ? (
          <p className="text-gray-500">Nenhum produto encontrado</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <div className="bg-gray-100 h-44 flex items-center justify-center">
                  <img
                    src={produto.thumbnail}
                    alt={produto.title}
                    className="h-full object-contain group-hover:scale-105 transition"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x300';
                    }}
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm text-gray-800 line-clamp-2 mb-1">
                    {produto.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-2">
                    ⭐ {produto.rating} • {produto.stock} unidades
                  </p>

                  <p className="text-lg font-semibold text-gray-900">
                    ${produto.price}
                  </p>

                  <button className="mt-3 w-full text-sm border border-gray-300 py-1.5 rounded-lg hover:bg-gray-900 hover:text-white transition">
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}