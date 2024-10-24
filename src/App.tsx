import { Box } from "@mui/material";
import React from "react";
import { config } from "./config";
import { TransactionCard } from "./components/balance/TransactionCard";

import SentMoneyIcon from "@mui/icons-material/SwipeUp";
import ReceiveMoneyIcon from "@mui/icons-material/SwipeDownAlt";

const { background, primaryGradient, secondaryGradient, primaryIcon, secondaryIcon } = config.palleteColor;
function App() {
  return (
    <Box sx={{ m: 0, p: 0, backgroundColor: background, width: "100%", height: "100vh", position: "fixed" }}>
      <TransactionCard title={"Received"} amount={300} gradientColor={primaryGradient} icon={<ReceiveMoneyIcon fontSize="large"></ReceiveMoneyIcon>} iconColor={primaryIcon}></TransactionCard>
      <TransactionCard title={"Sent"} amount={300} gradientColor={secondaryGradient} icon={<SentMoneyIcon fontSize="large"></SentMoneyIcon>} iconColor={secondaryIcon}></TransactionCard>
    </Box>
  );
}

export default App;
