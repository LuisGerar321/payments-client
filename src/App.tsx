import { Box } from "@mui/material";
import { config } from "./config";

import { Dashboard } from "./components/dashboard/Dashboard.layout";

const { background } = config.palleteColor;
function App() {
  return (
    <Box sx={{ m: 0, p: 0, backgroundColor: background, width: "100%", height: "100vh", position: "fixed" }}>
      <Dashboard></Dashboard>
    </Box>
  );
}

export default App;
