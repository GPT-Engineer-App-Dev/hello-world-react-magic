import { Container, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        jwt.verify(token, "your-secret-key");
      } catch (error) {
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Hello World</Text>
      </VStack>
    </Container>
  );
};

export default Index;