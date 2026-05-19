import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { getCurrentSession } from "../features/SessionManager.jsx";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(false);
    const { handleLogin } = getCurrentSession();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await handleLogin(username.trim(), password);
        if (ok) {
            navigate("/", { replace: true });
        } else {
            setErro(true);
            setTimeout(() => setErro(false), 3000);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            padding: "24px"
        }}>
            <div style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "36px 28px",
                width: "100%",
                maxWidth: "380px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
            }}>
                {/* Logo / título */}
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                    <div style={{ fontSize: "40px", marginBottom: "8px" }}>🥗</div>
                    <h3 style={{ margin: 0, color: "#45A293" }}>PantryMate</h3>
                    <p style={{ color: "#aaa", fontSize: "14px", margin: "4px 0 0" }}>
                        Gestão de despensa familiar
                    </p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username" style={{ fontWeight: "600", fontSize: "14px" }}>Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="o-teu-username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            style={{ borderRadius: "10px" }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" style={{ fontWeight: "600", fontSize: "14px" }}>Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{ borderRadius: "10px" }}
                        />
                    </FormGroup>

                    {erro && (
                        <Alert color="danger" style={{ borderRadius: "10px", fontSize: "14px", padding: "10px 14px" }}>
                            Email ou password incorretos.
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        block
                        style={{
                            background: "#45A293",
                            border: "none",
                            borderRadius: "10px",
                            padding: "12px",
                            fontWeight: "600",
                            marginTop: "8px"
                        }}
                    >
                        Entrar
                    </Button>
                </Form>

            </div>
        </div>
    );
};

export default LoginPage;
