import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

export default function HomeGameButton({ title, icon, description, navigateTo }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
    };

    const isDisabled = !navigateTo;

    return (
        <Button
            type="primary"
            shape="square"
            onClick={handleClick}
            disabled={isDisabled}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "clamp(200px, 20vw, 250px)",
                height: "clamp(200px, 20vw, 250px)",
                backgroundColor: "black",
                border: "none",
                textAlign: "center",
                padding: "16px",
                opacity: isDisabled ? 0.7 : 1,
            }}
        >
            {title && (
                <Text
                    strong
                    style={{
                        fontSize: "clamp(20px, 2vw, 25px)",
                        color: "white",
                        textAlign: "center",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                    }}
                >
                    {title}
                </Text>
            )}

            {icon && (
                <div
                    style={{
                        width: "clamp(60px, 8vw, 80px)",
                        height: "clamp(60px, 8vw, 80px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img src={icon} alt="icon" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
            )}

            {description && (
                <Text
                    strong
                    style={{
                        fontSize: "clamp(12px, 1.5vw, 15px)",
                        color: "white",
                        textAlign: "center",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                    }}
                >
                    {description}
                </Text>
            )}
        </Button>
    );
}
