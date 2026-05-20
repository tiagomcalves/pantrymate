import { useState, useEffect } from "react";
import { Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import { getCurrentSession } from "../features/SessionManager.jsx";
import axios from "axios";

const roleLabel = { admin: "Administrador", member: "Membro", junior: "Júnior" };
const roleColor = { admin: "success", member: "primary", junior: "warning" };

const nomeValido = (nome) => {
    const palavras = nome.trim().split(/\s+/);
    return /^[a-zA-ZÀ-ÿ\s]+$/.test(nome.trim()) && palavras.length >= 2;
};

const erroNomeMsg = (nome) => {
    if (/[^a-zA-ZÀ-ÿ\s]/.test(nome)) return "Apenas letras são permitidas, sem números ou caracteres especiais.";
    return "Introduz pelo menos nome e apelido.";
};

const FamiliaPage = () => {
    const { currentUser } = getCurrentSession();
    const role = currentUser?.role;

    const [membros, setMembros] = useState([]);
    const [erro, setErro] = useState(null);

    // Modal adicionar
    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [novoNome, setNovoNome] = useState("");
    const [novoRole, setNovoRole] = useState("member");
    const [novoEmail, setNovoEmail] = useState("");
    const [novoPassword, setNovoPassword] = useState("");

    // Modal editar
    const [membroEditando, setMembroEditando] = useState(null);
    const [editNome, setEditNome] = useState("");
    const [editRole, setEditRole] = useState("member");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");

    useEffect(() => {
        axios.get(`/family/api/membros/`, { withCredentials: true})
            .then(res => {
                if(res.status === 200){
                    setMembros(res.data)
                    setModalAdicionar(false);
                }
                else if(res.status === 204){
                    setMembros(null)
                }
            })
            .catch(() => setErro("Erro ao carregar membros."));
    }, []);

    const abrirAdicionar = () => {
        setNovoNome(""); setNovoRole("member"); setNovoEmail(""); setNovoPassword("");
        setErro(null);
        setModalAdicionar(true);
    };

    const abrirEditar = (membro) => {
        setEditNome(membro.nome);
        setEditRole(membro.role);
        setEditEmail("");
        setEditPassword("");
        setMembroEditando(membro);
    };

    const adicionarMembro = () => {
        if (!nomeValido(novoNome) || !novoEmail.trim() || !novoPassword.trim()) return;
        axios.post(`/family/api/membros/add`, {
            nome: novoNome.trim(),
            role: novoRole,
            email: novoEmail.trim(),
            password: novoPassword,
        })
            .then(res => {
                    setMembros(prev => [...prev, res.data]);
                    setModalAdicionar(false);
            })
            .catch(err => {
                setErro(err.response?.data?.error || "Erro ao adicionar membro.");
            });
    };

    const guardarEdicao = () => {
        if (!nomeValido(editNome)) return;
        axios.patch(`/family/api/membros/${membroEditando.id}/`, {
            nome: editNome.trim(),
            role: editRole,
            email: editEmail.trim() || undefined,
            password: editPassword || undefined,
        })
            .then(res => {
                setMembros(prev => prev.map(m => m.id === res.data.id ? res.data : m));
                setMembroEditando(null);
            })
            .catch(() => setErro("Erro ao editar membro."));
    };

    const removerMembro = (id) => {
        axios.delete(`/family/api/membros/${id}/`)
            .then(() => setMembros(prev => prev.filter(m => m.id !== id)))
            .catch(() => setErro("Erro ao remover membro."));
    };

    const erroNomeAdicionar = novoNome.length > 0 && !nomeValido(novoNome);
    const erroNomeEditar = editNome.length > 0 && !nomeValido(editNome);
    const formularioAdicionarValido = nomeValido(novoNome) && novoEmail.trim() && novoPassword.trim();
    const formularioEditarValido = nomeValido(editNome);

    let membros_msg = "";

    if (membros === null) {
        membros_msg = "Conta não tem atributo \"membrofamilia\"";
    } else if (membros.length > 0) {
        membros_msg = `${membros.length} ${membros.length === 1 ? "membro" : "membros"} na tua família.`;
    } else {
        membros_msg = "Ainda não existem membros na tua família.";
    }

    return (
        <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
            <h4 style={{ marginBottom: "4px", color: "#1a1a2e", fontWeight: "700" }}>👨‍👩‍👧‍👦 Família</h4>
            <p style={{ color: "#1a1a2e", fontWeight: "600", marginBottom: "20px" }}>
                {membros_msg}
            </p>

            {erro && (
                <div style={{ color: "#dc3545", fontSize: "13px", marginBottom: "12px" }}>{erro}</div>
            )}

            {membros !== null && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {membros.map(membro => {
                    const isSelf = membro.nome === (currentUser?.first_name + " " + currentUser?.last_name);
                    return (
                        <div
                            key={membro.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "14px",
                                borderRadius: "14px",
                                background: isSelf ? "#e0f2f1" : "#fff",
                                border: isSelf ? "2px solid #45A293" : "1px solid #e0e0e0",
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
                                    {isSelf && (
                                        <span style={{ fontSize: "11px", color: "#45A293", marginLeft: "8px" }}>(tu)</span>
                                    )}
                                </div>
                                <Badge color={roleColor[membro.role]} pill style={{ fontSize: "11px" }}>
                                    {roleLabel[membro.role]}
                                </Badge>
                            </div>

                            {role === "admin" && !isSelf && (
                                <div style={{ display: "flex", gap: "6px" }}>
                                    <Button
                                        size="sm"
                                        outline
                                        color="secondary"
                                        style={{ borderRadius: "8px", padding: "4px 8px" }}
                                        onClick={() => abrirEditar(membro)}
                                        title="Editar"
                                    >
                                        <i className="bi bi-pencil" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        outline
                                        color="danger"
                                        style={{ borderRadius: "8px", padding: "4px 8px" }}
                                        onClick={() => removerMembro(membro.id)}
                                        title="Eliminar"
                                    >
                                        <i className="bi bi-trash" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>)}

            {role === "admin" && (
                <Button
                    style={{ background: "#45A293", border: "none", borderRadius: "12px", padding: "14px", width: "100%", fontSize: "15px" }}
                    onClick={abrirAdicionar}
                >
                    <i className="bi bi-person-plus" style={{ marginRight: "8px" }} />
                    Adicionar Membro
                </Button>
            )}

            {role !== "admin" && (
                <p style={{ textAlign: "center", color: "#1a1a2e", fontSize: "13px", fontWeight: "700" }}>
                    Só o administrador pode gerir os membros.
                </p>
            )}

            {/* Modal — Adicionar */}
            <Modal isOpen={modalAdicionar} toggle={() => setModalAdicionar(false)} centered size="sm">
                <ModalHeader toggle={() => setModalAdicionar(false)}>Novo Membro</ModalHeader>
                <ModalBody>
                    {erro && <div style={{ color: "#dc3545", fontSize: "13px", marginBottom: "10px" }}>{erro}</div>}
                    <FormGroup>
                        <Label>Nome completo</Label>
                        <Input
                            placeholder="Nome Apelido..."
                            value={novoNome}
                            invalid={erroNomeAdicionar}
                            onChange={e => setNovoNome(e.target.value)}
                            autoFocus
                        />
                        {erroNomeAdicionar && (
                            <div style={{ fontSize: "12px", color: "#dc3545", marginTop: "4px" }}>
                                {erroNomeMsg(novoNome)}
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>Tipo de utilizador</Label>
                        <Input type="select" value={novoRole} onChange={e => setNovoRole(e.target.value)}>
                            <option value="admin">Administrador</option>
                            <option value="member">Membro</option>
                            <option value="junior">Júnior</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" placeholder="email@exemplo.pt" value={novoEmail} onChange={e => setNovoEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup style={{ marginBottom: 0 }}>
                        <Label>Password</Label>
                        <Input type="password" placeholder="••••••••" value={novoPassword} onChange={e => setNovoPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && adicionarMembro()} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outline onClick={() => setModalAdicionar(false)}>Cancelar</Button>
                    <Button disabled={!formularioAdicionarValido} style={{ background: "#45A293", border: "none" }} onClick={adicionarMembro}>
                        Adicionar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal — Editar */}
            <Modal isOpen={!!membroEditando} toggle={() => setMembroEditando(null)} centered>
                <ModalHeader toggle={() => setMembroEditando(null)}>Editar Membro</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Nome completo</Label>
                        <Input
                            placeholder="Nome Apelido..."
                            value={editNome}
                            invalid={erroNomeEditar}
                            onChange={e => setEditNome(e.target.value)}
                            autoFocus
                        />
                        {erroNomeEditar && (
                            <div style={{ fontSize: "12px", color: "#dc3545", marginTop: "4px" }}>
                                {erroNomeMsg(editNome)}
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>Tipo de utilizador</Label>
                        <Input type="select" value={editRole} onChange={e => setEditRole(e.target.value)}>
                            <option value="admin">Administrador</option>
                            <option value="member">Membro</option>
                            <option value="junior">Júnior</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Novo email <span style={{ color: "#aaa", fontWeight: 400 }}>(opcional)</span></Label>
                        <Input type="email" placeholder="Deixa em branco para não alterar" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup style={{ marginBottom: 0 }}>
                        <Label>Nova password <span style={{ color: "#aaa", fontWeight: 400 }}>(opcional)</span></Label>
                        <Input type="password" placeholder="Deixa em branco para não alterar" value={editPassword} onChange={e => setEditPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && guardarEdicao()} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outline onClick={() => setMembroEditando(null)}>Cancelar</Button>
                    <Button disabled={!formularioEditarValido} style={{ background: "#45A293", border: "none" }} onClick={guardarEdicao}>
                        Guardar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default FamiliaPage;
