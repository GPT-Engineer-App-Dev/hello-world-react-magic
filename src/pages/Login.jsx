import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { username, password } = data;

    // Mock authentication logic
    if (username === "admin" && password === "password") {
      const token = jwt.sign({ username }, "your-secret-key", { expiresIn: "1h" });
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4} align="flex-start">
          <Text fontSize="2xl" fontWeight="bold">Login</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" placeholder="Username" {...register("username", { required: "Username is required" })} />
              {errors.username && <Text color="red.500">{errors.username.message}</Text>}
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            <Button mt={4} colorScheme="teal" type="submit">Login</Button>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;