import { Box, Grid } from "@mui/material";
import { config } from "./config";

import { Dashboard } from "./components/dashboard/Layout";
import { MenuLayout } from "./components/menu/Layout";

const { background } = config.palleteColor;
function App() {
  return (
    <Box sx={{ m: 0, p: 0, backgroundColor: background, width: "100%", height: "100vh", position: "fixed", display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={2}>
          <MenuLayout></MenuLayout>
        </Grid>
        <Grid item xs={12} md={10}>
          <Dashboard></Dashboard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
