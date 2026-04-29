import { useState } from "react";
import { Badge, Button } from "reactstrap";
import { useUser } from "../context/UserContext";
import familiaData from "../data/familia.json";

const roleLabel = { admin: "Administrador", member: "Membro", junior: "Júnior" };
const roleColor = { admin: "success", member: "primary", junior: "warning" };

const FamiliaPage = () => {
    const [membros] = useState(familiaData);
    const [convidadoEnviado, setConvidadoEnviado] = useState(false);
    const { currentUser } = useUser();
    const role = currentUser?.role;

    const handleConvidar = () => {
        setConvidadoEnviado(true);
        setTimeout(() => setConvidadoEnviado(false), 3000);
    };

    return (
        <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
            <h4 style={{ marginBottom: "4px" }}>👨‍👩‍👧‍👦 Família</h4>
            <p style={{ color: "#888", marginBottom: "20px" }}>
                {membros.length} membro(s) na tua despensa familiar.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {membros.map(membro => (
                    <div
                        key={membro.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "14px",
                            borderRadius: "14px",
                            background: membro.id === currentUser?.id ? "#e0f2f1" : "#fff",
                            border: membro.id === currentUser?.id ? "2px solid #45A293" : "1px solid #e0e0e0",
                        }}
                    >
                        <div style={{
                            width: "52px", height: "52px", borderRadius: "50%",
                            background: "#45A293", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: "22px", color: "#fff", fontWeight: "bold", flexShrink: 0
                        }}>
                            {membro.nome.charAt(0)}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                                {membro.nome}
                                {membro.id === currentUser?.id && (
                                    <span style={{ fontSize: "11px", color: "#45A293", marginLeft: "8px" }}>
                                        (tu)
                                    </span>
                                )}
                            </div>
                            <Badge color={roleColor[membro.role]} pill style={{ fontSize: "11px" }}>
                                {roleLabel[membro.role]}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>

            {/* Só o Admin pode convidar */}
            {role === "admin" && (
                <>
                    <Button
                        style={{ background: "#45A293", border: "none", borderRadius: "12px", padding: "14px", width: "100%", fontSize: "15px" }}
                        onClick={handleConvidar}
                    >
                        <i className="bi bi-person-plus" style={{ marginRight: "8px" }} />
                        Convidar Membro
                    </Button>
                    {convidadoEnviado && (
                        <div style={{
                            marginTop: "16px", padding: "14px", borderRadius: "12px",
                            background: "#e8f5e9", color: "#2e7d32",
                            border: "1px solid #a5d6a7", textAlign: "center"
                        }}>
                            Convite enviado com sucesso! 🎉
                        </div>
                    )}
                </>
            )}

            {role !== "admin" && (
                <p style={{ textAlign: "center", color: "#bbb", fontSize: "13px" }}>
                    Só o administrador pode convidar novos membros.
                </p>
            )}
        </div>
    );
};

export default FamiliaPage;
