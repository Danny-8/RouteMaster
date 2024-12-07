import { useState, useEffect } from "react";
import { Input, Button, Row, Col, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    const correctPassword = process.env.REACT_APP_PASSWORD;
    if (password === correctPassword) {
      localStorage.setItem("authenticated", "true");
      navigate("/");
    } else {
      message.error("Contraseña incorrecta");
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        width: "100%",
        padding: "0 16px",
        background: "#f0f2f5",
      }}
    >
      <Col
        xs={24}
        sm={18}
        md={12}
        lg={8}
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Title level={2} style={{ marginBottom: "24px", color: "#333" }}>
          Iniciar sesión
        </Title>
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Introduce la contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "24px",
            padding: "12px",
            fontSize: "16px",
          }}
        />
        <Button
          type="primary"
          block
          onClick={handleLogin}
          style={{
            backgroundColor: "black",
            borderColor: "black",
            padding: "12px",
            fontSize: "16px",
            textTransform: "uppercase",
            fontWeight: "bold",
            marginBottom: "12px",
          }}
        >
          Iniciar sesión
        </Button>
      </Col>
    </Row>
  );
}
