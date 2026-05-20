import { createContext, useContext, useState } from "react";
import produtosData from "../data/produtos.json";

const ProdutosContext = createContext(null);

export const ProdutosProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([...produtosData]);

    const adicionarProdutos = (novos) => {
        const comIds = novos.map(p => ({ ...p, id: Date.now() + Math.random() }));
        setProdutos(prev => [...prev, ...comIds]);
    };

    return (
        <ProdutosContext.Provider value={{ produtos, adicionarProdutos }}>
            {children}
        </ProdutosContext.Provider>
    );
};

export const useProdutos = () => useContext(ProdutosContext);
