import { Box, Grid } from "@mui/material";
import { config } from "./config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Payments } from "./components/payments/Layout";
import { MenuLayout } from "./components/menu/Layout";
import { TransactionLayout } from "./components/transactions/Layout";
import { AuthLayout } from "./components/auth/Layout";
import { useEffect } from "react";

const { palleteColor } = config;
function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {}, [token]);
  return (
    <Router>
      <Box
        sx={{
          m: 0,
          p: 0,
          backgroundColor: palleteColor.background,
          backgroundImage: !token ? `linear-gradient(to bottom, ${palleteColor.alternativeGradient.map((color) => color).join(", ")})` : undefined,
          width: "100%",
          height: "100vh",
          display: "flex",
          overflowY: { xs: "auto", md: "hidden" },
        }}
      >
        {token ? (
          <Grid container>
            <Grid item xs={12} md={2}>
              <MenuLayout></MenuLayout>
            </Grid>
            <Grid item xs={12} md={10}>
              <Routes>
                <Route
                  path="/payments"
                  element={
                    <>
                      <Payments />
                      <TransactionLayout />
                    </>
                  }
                />
              </Routes>
            </Grid>
          </Grid>
        ) : (
          <AuthLayout></AuthLayout>
        )}
      </Box>
    </Router>
  );
}

export default App;
