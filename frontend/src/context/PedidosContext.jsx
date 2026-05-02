import { createContext, useContext, useState } from "react";

const PedidosContext = createContext(null);

export const PedidosProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState([]);

    const criarPedido = (itens, user) => {
        const numero = String(pedidos.length + 1).padStart(3, "0");
        setPedidos(prev => [...prev, {
            id: Date.now(),
            numero: `PED-${numero}`,
            userId: user.id,
            userName: user.nome,
            itens,
            estado: "pendente",
            criadoEm: new Date().toISOString(),
        }]);
    };

    const atualizarEstado = (id, estado) => {
        setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado } : p));
    };

    return (
        <PedidosContext.Provider value={{ pedidos, criarPedido, atualizarEstado }}>
            {children}
        </PedidosContext.Provider>
    );
};

export const usePedidos = () => useContext(PedidosContext);
