import React, { FC, ReactNode } from "react";
import { IProps } from "../../interfaces";
import { Avatar, Box, Card, CardContent, CardHeader, Skeleton, Typography } from "@mui/material";
import { config } from "../../config";

interface ITransactionsProps extends IProps {
  gradientColor: string[];
  iconColor: string;
  icon: ReactNode;
  title: string;
  amount: number;
  isLoading?: boolean;
}

const { dark } = config.palleteColor;

export const TransactionCardDashboard: FC<ITransactionsProps> = (props: ITransactionsProps) => {
  const { gradientColor, icon, iconColor, title, amount, isLoading } = props;

  const gradientString = `linear-gradient(to bottom, ${gradientColor.map((color) => color).join(", ")})`;
  const iconSize = 60;

  return (
    <Card
      sx={{
        width: {
          xs: "100px",
          sm: "200px",
        },
        height: {
          xs: "100%",
        },
        m: 4,
        mt: 0,
        backgroundImage: gradientString,
        borderRadius: 7,
        boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.2)",
        pl: 3,
      }}
    >
      <CardHeader
        sx={{ display: { xs: "none", md: "block" } }}
        avatar={
          <Avatar sx={{ backgroundColor: iconColor, borderRadius: 2, height: iconSize, width: iconSize }} variant="rounded">
            {icon}
          </Avatar>
        }
      />
      <CardContent>
        <Typography color="white" variant="h5" sx={{ mt: -1 }} fontWeight="bold">
          {title}
        </Typography>
        <Box sx={{ mt: 4, display: "flex", alignItems: "center" }}>
          {!isLoading && (
            <Typography color={dark} fontWeight="bold" variant="h5">
              $
            </Typography>
          )}

          <Typography color={dark} fontWeight="bold" variant="h3">
            {isLoading ? <Skeleton width={120} /> : amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
