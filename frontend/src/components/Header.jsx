import { Button, Badge, Input, InputGroup, InputGroupText } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import bellIcon from '../assets/bell.svg'

const saudacao = () => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 19) return "Boa tarde";
    return "Boa noite";
};

const roleLabel = { admin: "Admin", member: "Membro", junior: "Júnior" };
const roleColor = { admin: "#2e7d32", member: "#1565c0", junior: "#e65100" };

const Header = () => {
    const { currentUser, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header>
            <div id="top-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <h3 style={{ margin: 0 }}>{saudacao()},</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                            <h4 style={{ margin: 0 }}>{currentUser?.nome.split(" ")[0]}!</h4>
                            {currentUser && (
                                <span style={{
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    color: roleColor[currentUser.role],
                                    background: "#f0f0f0",
                                    borderRadius: "8px",
                                    padding: "2px 8px"
                                }}>
                                    {roleLabel[currentUser.role]}
                                </span>
                            )}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <Button color="primary" outline>
                            <img src={bellIcon} alt="Notificações" />
                            {' '}<Badge>4</Badge>
                        </Button>
                        <Button
                            outline
                            color="secondary"
                            size="sm"
                            onClick={handleLogout}
                            title="Sair"
                        >
                            <i className="bi bi-box-arrow-right" />
                        </Button>
                    </div>
                </div>
            </div>
            <div id="searchbar" style={{ marginTop: "12px" }}>
                <SearchBox />
            </div>
        </header>
    );
};

const SearchBox = () => (
    <InputGroup>
        <InputGroupText>
            <i className="bi bi-search" />
        </InputGroupText>
        <Input placeholder="Pesquisar..." />
    </InputGroup>
);

export default Header;
