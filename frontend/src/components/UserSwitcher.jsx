import { Badge } from "reactstrap";
import { useUser } from "../context/UserContext";
import familiaData from "../data/familia.json";

const roleLabel = { admin: "Admin", member: "Membro", junior: "Júnior" };
const roleColor = { admin: "success", member: "primary", junior: "warning" };

const UserSwitcher = () => {
    const { currentUser, setCurrentUser } = useUser();

    return (
        <div style={{
            display: "flex",
            gap: "8px",
            padding: "10px 12px",
            background: "#f5f5f5",
            borderRadius: "12px",
            marginBottom: "16px",
            overflowX: "auto"
        }}>
            <span style={{ fontSize: "12px", color: "#888", alignSelf: "center", whiteSpace: "nowrap" }}>
                Utilizador:
            </span>
            {familiaData.map(user => (
                <button
                    key={user.id}
                    onClick={() => setCurrentUser(user)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 10px",
                        borderRadius: "20px",
                        border: currentUser.id === user.id ? "2px solid #45A293" : "2px solid transparent",
                        background: currentUser.id === user.id ? "#e0f2f1" : "#fff",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontSize: "13px",
                        fontWeight: currentUser.id === user.id ? "600" : "400"
                    }}
                >
                    <div style={{
                        width: "24px", height: "24px", borderRadius: "50%",
                        background: "#45A293", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: "bold", flexShrink: 0
                    }}>
                        {user.nome.charAt(0)}
                    </div>
                    {user.nome.split(" ")[0]}
                    <Badge color={roleColor[user.role]} pill style={{ fontSize: "10px" }}>
                        {roleLabel[user.role]}
                    </Badge>
                </button>
            ))}
        </div>
    );
};

export default UserSwitcher;
