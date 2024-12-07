import { useState, useEffect } from "react";
import { Button, Row, Col, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function RouteGamePage() {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [buttonColor, setButtonColor] = useState(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const navigate = useNavigate();

  const loadRoutesData = async () => {
    try {
      const response = await fetch("/routes.json");
      const data = await response.json();
      return data;
    } catch (error) {
      message.error("Error al cargar las rutas");
    }
  };

  const getRandomRoute = (routesData) => {
    const randomIndex = Math.floor(Math.random() * routesData.length);
    return routesData[randomIndex];
  };

  const loadNewQuestion = async () => {
    setIsTransitioning(true);
    setTimeout(async () => {
      const routesData = await loadRoutesData();
      const randomRoute = getRandomRoute(routesData);
      const correctRoute = randomRoute.route;
      setCurrentRoute(randomRoute);
      setCorrectAnswer(correctRoute);

      const allRoutes = routesData.map((item) => item.route);
      let options = [correctRoute];

      while (options.length < 4) {
        const randomRoute = allRoutes[Math.floor(Math.random() * allRoutes.length)];
        if (!options.includes(randomRoute)) {
          options.push(randomRoute);
        }
      }

      options = options.sort(() => Math.random() - 0.5);
      setOptions(options);
      setSelectedAnswer(null);
      setButtonsDisabled(false);
      setIsTransitioning(false);
    } , 500);
  };

  const handleAnswer = (selectedRoute) => {
    if (buttonsDisabled) return;

    setSelectedAnswer(selectedRoute);
    setButtonsDisabled(true);

    if (selectedRoute === correctAnswer) {
      setScore(score + 1);
      setButtonColor("green");
      message.success("¡Respuesta correcta!", 2);
      setTimeout(() => {
        setButtonColor(null);
        loadNewQuestion();
      }, 1500);
    } else {
      setScore(0);
      setButtonColor("red");
      message.error("Respuesta incorrecta. Tu puntaje ha sido reseteado.", 2);
      setTimeout(() => {
        setButtonColor(null);
        setButtonsDisabled(false);
      }, 1500);
    }
  };

  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  const buttonStyle = {
    backgroundColor: "black",
    borderColor: "black",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "8px",
    color: "white",
    transition: "background-color 0.3s ease",
    cursor: buttonsDisabled ? "not-allowed" : "pointer",
    width: "100%",
    padding: "12px 20px",
  };

  return (
    <>
      <div style={{ 
        padding: "20px", 
        textAlign: "center", 
        background: "#f4f6f9",
        opacity: isTransitioning ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}>
        <Title level={2} style={{ marginBottom: "40px", color: "#333" }}>
          Adivina la Ruta
        </Title>
        <Text style={{ fontSize: "18px", color: "black", marginBottom: "20px" }}>
          Puntaje: {score}
        </Text>

        {currentRoute && (
          <div style={{ marginTop: "20px" }}>
            <img
              src={`/routes/${currentRoute.image}`}
              alt={currentRoute.route}
              style={{
                maxWidth: "100%",
                height: "auto",
                marginBottom: "60px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div>
              <Row justify="center" gutter={[16, 16]}>
                {options.map((option, index) => (
                  <Col key={index} xs={12} sm={8} md={6} lg={6}>
                    <Button
                      type="primary"
                      block
                      disabled={buttonsDisabled}
                      onClick={() => handleAnswer(option)}
                      style={{
                        ...buttonStyle,
                        backgroundColor:
                          buttonColor && selectedAnswer === option ? buttonColor : "black",
                      }}
                    >
                      {option}
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        )}

      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          type="default"
          onClick={() => navigate("/")}
          icon={<ArrowLeftOutlined />}
          style={{
            top: "12vh",
            left: "2vw",
            position: "absolute",
            backgroundColor: "gray",
            color: "white",
            borderColor: "gray",
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        >
          Volver
        </Button>
      </div>
    </>
  );
}
