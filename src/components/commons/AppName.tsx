import { Divider, Toolbar, Typography } from "@mui/material";
import { config } from "../../config";
import { GradientTypography } from "./GradientTypography";

const { palleteColor } = config;
export const AppName = () => {
  return (
    <>
      <GradientTypography color={palleteColor.primaryGradient} fontWeight="bold" variant="h2">
        {config.appName}
      </GradientTypography>
    </>
  );
};
