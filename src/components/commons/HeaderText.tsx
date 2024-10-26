import { Typography } from "@mui/material";
import { GradientTypography } from "./GradientTypography";
import { config } from "../../config";
import { FC } from "react";
import { IProps } from "../../interfaces";

const { palleteColor } = config;
interface HeaderTextProps extends IProps {
  primary: string;
  secondary?: string;
}

export const HeaderText: FC<HeaderTextProps> = ({ primary, secondary }: HeaderTextProps) => {
  return (
    <>
      <GradientTypography sx={{}} color={palleteColor.primaryGradient.slice(0, 2)} fontWeight="bold" variant="h1" fontSize={40} textAlign="center">
        {primary}
      </GradientTypography>
      {secondary && (
        <Typography sx={{ marginBottom: 8 }} color={palleteColor.secondary} fontWeight="bold" variant="h2" fontSize={20} textAlign="center">
          {secondary}
        </Typography>
      )}
    </>
  );
};
