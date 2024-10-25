import { FC, useEffect, useState } from "react";
import { IProps, ISelfBalance } from "../../interfaces";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { config } from "../../config";
import { TransactionCard } from "./TransactionCard.component";
import SentMoneyIcon from "@mui/icons-material/SwipeUp";
import ReceiveMoneyIcon from "@mui/icons-material/SwipeDownAlt";
import { DashboardButtoms } from "./Buttoms.component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import gateway from "../../config/gateway";
import { updateBalance } from "../../redux/balanceSlice";

interface IDashboardProps extends IProps {}

const { primaryGradient, secondaryGradient, primaryIcon, secondaryIcon, dark } = config.palleteColor;

export const Dashboard: FC<IDashboardProps> = (props: IDashboardProps) => {
  const token = localStorage.getItem("token");

  const dispatch: AppDispatch = useDispatch();
  const { balance, sent, received } = useSelector((state: RootState) => state.balance);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    gateway
      .get("/transactions/self-balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((axiosResponse) => {
        const res = axiosResponse.data;
        const data: ISelfBalance = res.data;
        dispatch(updateBalance(data));
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  return (
    <Paper
      sx={{
        width: {
          md: "700px",
          lg: "900px",
          xl: "1200px",
        },
        height: {
          md: "400px",
        },
        m: 4,
        mt: 2,
        borderRadius: 7,
        boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
      }}
    >
      <Grid container>
        <Grid item md={4} xs={12} sx={{ p: 6, display: "flex", flexDirection: "column" }}>
          <Typography color="gray" variant="h1" fontSize={18} fontWeight="bold" sx={{ opacity: 0.4 }} textAlign="center">
            PAYMENTS BALANCE
          </Typography>
          <Box position="relative" textAlign="center" m="auto">
            {!isLoading ? (
              <Typography color={dark} fontWeight="bold" variant="h3">
                <Box component="span" display="inline-flex" alignItems="flex-start">
                  <Typography variant="h5" fontWeight="bold" color={dark} marginRight={0.5}>
                    $
                  </Typography>
                  {balance}
                </Box>
              </Typography>
            ) : (
              <Skeleton width={120} height={60} sx={{ m: "auto", mt: 4 }} />
            )}
          </Box>

          <Box mt="auto" mr="auto" ml="auto">
            <DashboardButtoms />
          </Box>
        </Grid>

        <Grid item md={8} xs={12} display="flex" alignItems="center">
          <Box display="flex" width="100%" height="70%" sx={{ justifyContent: "center" }}>
            <TransactionCard
              isLoading={isLoading}
              title={"Received"}
              amount={received}
              gradientColor={primaryGradient}
              icon={<ReceiveMoneyIcon fontSize="large"></ReceiveMoneyIcon>}
              iconColor={primaryIcon}
            />
            <TransactionCard title={"Sent"} amount={sent} gradientColor={secondaryGradient} icon={<SentMoneyIcon fontSize="large"></SentMoneyIcon>} iconColor={secondaryIcon} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
