import { Row, Space } from "antd";
import HomeGameButton from "../components/HomeGameButton"; // Importamos el botón

export default function HomePage() {
    return (
        <Row
            justify="center"
            align="middle"
            style={{
                minHeight: "70vh",
                textAlign: "center",
                gap: "16px",
                flexWrap: "wrap",
            }}
        >
            <Space direction="vertical" size="large">
                <HomeGameButton
                    title="Adivina la ruta"
                    icon="/icons/route.svg"
                    description="Pulsa el nombre de la ruta correcta"
                    navigateTo="/route-game"
                />
                <HomeGameButton
                    title="Próximamente..."
                    icon=""
                    description=""
                    navigateTo=""
                />
            </Space>
        </Row>
    );
}
