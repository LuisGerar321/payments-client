import { Card, CardProps } from "@mui/material";
import { IProps } from "../../interfaces";
import { FC } from "react";

export interface IBaseGradientCardProps extends IProps, CardProps {
  backgroundColor: string[];
}

export const BaseGradientCard: FC<IBaseGradientCardProps> = ({ children, backgroundColor, sx, ...typographyProps }: IBaseGradientCardProps) => {
  const gradientString = `linear-gradient(to bottom, ${backgroundColor.map((color) => color).join(", ")})`;

  return (
    <Card
      sx={{
        width: {
          xs: "320px",
          sm: "400px",
        },
        height: {
          xs: "100vh",
          md: "600px",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundImage: gradientString,
        borderRadius: 7,
        boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.2)",
        ...(sx || {}),
      }}
      {...typographyProps}
    >
      {children}
    </Card>
  );
};
