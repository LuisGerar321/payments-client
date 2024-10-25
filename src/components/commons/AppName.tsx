import { Divider, Toolbar, Typography } from "@mui/material";
import { config } from "../../config";

const { palleteColor } = config;
export const AppName = () => {
  return (
    <>
      <Typography sx={{ m: 4, background: `linear-gradient(90deg, ${palleteColor.primaryGradient.join(", ")})`, backgroundClip: "text", color: "transparent" }} fontWeight="bold" variant="h2">
        {config.appName}
      </Typography>
    </>
  );
};
