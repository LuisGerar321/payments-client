import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";
import { IProps } from "../../interfaces";

interface IGradientTypography extends IProps, Omit<TypographyProps, "color"> {
  sx?: React.CSSProperties;
  color: string[];
}

export const GradientTypography: FC<IGradientTypography> = ({ sx, color, children, ...typographyProps }: IGradientTypography) => {
  return (
    <Typography
      sx={{
        background: `linear-gradient(90deg, ${color.join(", ")})`,
        backgroundClip: "text",
        color: "transparent",
        ...(sx || {}),
      }}
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};
