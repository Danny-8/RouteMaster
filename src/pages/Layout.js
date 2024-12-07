import { Typography, Layout as BaseLayout, Row } from "antd";

const { Content, Footer, Header } = BaseLayout;
const { Text } = Typography;

export default function Layout({ children }) {
    return (
        <BaseLayout
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Header
                style={{
                    backgroundColor: "black",
                    height: "10vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 16px",
                }}
            >
                <Row justify="center" align="middle" style={{ width: "100%" }}>
                    <Text
                        strong
                        style={{
                            color: "white",
                            fontSize: "clamp(24px, 5vw, 48px)",
                            textAlign: "center",
                        }}
                    >
                        🏈RouteMaster🏈
                    </Text>
                </Row>
            </Header>
            <Content
                style={{
                    flex: 1,
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                {children}
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                    paddingBlock: "11px",
                    background: "black",
                    color: "white",
                    fontSize: "clamp(12px, 2vw, 16px)",
                    marginTop: "auto",
                }}
            >
                RouteMaster ©{new Date().getFullYear()} Created by Daniel Suárez
            </Footer>
        </BaseLayout>
    );
}
