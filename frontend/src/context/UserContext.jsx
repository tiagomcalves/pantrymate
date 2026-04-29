import { createContext, useContext, useState } from "react";
import familiaData from "../data/familia.json";

const mockCredentials = [
    { email: "maria@familia.pt",  password: "admin123", userId: 1 },
    { email: "joao@familia.pt",   password: "joao123",  userId: 2 },
    { email: "ana@familia.pt",    password: "ana123",   userId: 3 },
    { email: "pedro@familia.pt",  password: "pedro123", userId: 4 },
];

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (email, password) => {
        const match = mockCredentials.find(
            c => c.email === email && c.password === password
        );
        if (!match) return false;
        const user = familiaData.find(u => u.id === match.userId);
        setCurrentUser(user);
        return true;
    };

    const logout = () => setCurrentUser(null);

    return (
        <UserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
