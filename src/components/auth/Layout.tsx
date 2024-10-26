import { useState } from "react";
import { Collapse, Button, Box } from "@mui/material";
import { CreateClientForm } from "./CreateClientForm";
import { config } from "../../config";
import { LoginClientForm } from "./LoginClientForm";

const { palleteColor } = config;

export const AuthLayout = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <Box sx={{ textAlign: "center", padding: 2, display: "flex", flexDirection: "column", m: "auto" }}>
      <Collapse in={!isLoginForm} mountOnEnter unmountOnExit>
        <CreateClientForm />
      </Collapse>
      <Collapse in={isLoginForm} mountOnEnter unmountOnExit>
        <LoginClientForm />
      </Collapse>
      <Button variant="contained" onClick={toggleForm} sx={{ mt: 2, backgroundColor: !isLoginForm ? palleteColor.primaryIcon : palleteColor.secondaryIcon }}>
        {isLoginForm ? "Create a new account" : "Do you have an account? Log in!"}
      </Button>
    </Box>
  );
};
