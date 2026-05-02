import { createContext, useContext, useState } from "react";
import familiaData from "../data/familia.json";

const initialCredentials = [
    { email: "maria@familia.pt",  password: "admin123", userId: 1 },
    { email: "joao@familia.pt",   password: "joao123",  userId: 2 },
    { email: "ana@familia.pt",    password: "ana123",   userId: 3 },
    { email: "pedro@familia.pt",  password: "pedro123", userId: 4 },
];

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [membros, setMembros] = useState(familiaData);
    const [credentials, setCredentials] = useState(initialCredentials);
    const [currentUser, setCurrentUser] = useState(null);

    const login = (email, password) => {
        const match = credentials.find(
            c => c.email === email && c.password === password
        );
        if (!match) return false;
        const user = membros.find(u => u.id === match.userId);
        setCurrentUser(user);
        return true;
    };

    const logout = () => setCurrentUser(null);

    const registarMembro = (nome, role, email, password) => {
        const id = Date.now();
        setMembros(prev => [...prev, { id, nome, role }]);
        setCredentials(prev => [...prev, { email, password, userId: id }]);
    };

    const removerMembro = (id) => {
        setMembros(prev => prev.filter(m => m.id !== id));
        setCredentials(prev => prev.filter(c => c.userId !== id));
    };

    const editarMembro = (id, { nome, role, email, password }) => {
        setMembros(prev => prev.map(m => m.id === id ? { ...m, nome, role } : m));
        setCredentials(prev => prev.map(c => {
            if (c.userId !== id) return c;
            return { ...c, email, ...(password ? { password } : {}) };
        }));
    };

    return (
        <UserContext.Provider value={{ currentUser, membros, login, logout, registarMembro, removerMembro, editarMembro }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
