import React, { FC, ReactNode } from "react";
import { IProps } from "../../interfaces";
import { Avatar, Box, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";

interface ITransactionsProps extends IProps {
  gradientColor: string[];
  iconColor: string;
  icon: ReactNode;
  title: string;
  amount: number;
}

export const TransactionCard: FC<ITransactionsProps> = (props: ITransactionsProps) => {
  const { gradientColor, icon, iconColor, title, amount } = props;

  const gradientString = `linear-gradient(to bottom, ${gradientColor.map((color) => color).join(", ")})`;
  const iconSize = 60;
  return (
    <Card
      sx={{
        width: {
          xs: "200px",
        },
        height: {
          xs: "260px",
        },
        m: 4,
        backgroundImage: gradientString,
        borderRadius: 7,
        boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.2)",
        pl: 3,
        pt: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: iconColor, borderRadius: 2, height: iconSize, width: iconSize }} variant="rounded">
            {icon}
          </Avatar>
        }
      ></CardHeader>
      <CardContent>
        <Typography color="white" variant="h5" sx={{ mt: -1 }} fontWeight="bold">
          {title}
        </Typography>
        <Box sx={{ mt: 4, display: "flex" }}>
          <Typography fontWeight="bold" variant="h5">
            $
          </Typography>
          <Typography fontWeight="bold" variant="h3">
            {amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
