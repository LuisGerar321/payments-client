import { Box, CircularProgress, IconButton, TextField } from "@mui/material";
import gateway from "../../config/gateway";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { EAlertState, ETransactionType } from "../../interfaces";
import { resetTransactionState, updateTransactionCreate, updateTransactionCreateAlert } from "../../redux/transactionSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { isAxiosError } from "axios";
import { BaseGradientCard } from "../commons/BaseGradientCard";
import Lottie from "lottie-react";
import animationPay from "../../assets/lotties/animationPay.json";
import { config } from "../../config";
import { HeaderText } from "../commons/HeaderText";

const { palleteColor } = config;

export const PaymentConfirmTokenForm = () => {
  const token = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentToken, setPaymentToken] = useState("");
  const { pendingTransactionId } = useSelector((state: RootState) => state?.transaction.createATransaction);

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => setPaymentToken(event.target.value);

  const handleConfirmPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      const axiosResponse = await gateway.patch(
        `/transactions/${pendingTransactionId}`,
        {
          token: paymentToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = axiosResponse.data;
      const data: any = res.data;
      dispatch(
        updateTransactionCreateAlert({
          severity: EAlertState.SUCCESS,
          message: "Your payment was applied succesfully!",
        }),
      );
      console.log(data);
    } catch (error) {
      let errorMessage = "Something wrong creating your Payment";
      console.error(error);
      dispatch(resetTransactionState());

      if (isAxiosError(error)) errorMessage = `${errorMessage} : ${error.response?.data?.message}  ${error.response?.data?.details?.message}`;

      dispatch(
        updateTransactionCreateAlert({
          severity: EAlertState.ERROR,
          message: errorMessage,
        }),
      );
    } finally {
      setIsLoading(false);
      dispatch(
        updateTransactionCreate({
          state: false,
          type: ETransactionType.ADD,
        }),
      );
    }
  };

  return (
    <BaseGradientCard backgroundColor={palleteColor.secondaryGradient}>
      <Lottie animationData={animationPay} style={{ width: "200px", height: "200px", margin: "0 auto 0 auto" }}></Lottie>
      <HeaderText primary="Payment" secondary="Token Verification 2fa"></HeaderText>

      <Box component="form" onSubmit={handleConfirmPayment} sx={{ display: "flex", flexDirection: "column" }}>
        <TextField name="paymentToken" value={paymentToken} onChange={handleTokenChange} sx={{ m: "auto" }} id="token-basic" label="Token" variant="standard" />
        {isLoading ? (
          <CircularProgress sx={{ margin: "auto" }} />
        ) : (
          <IconButton type="submit" sx={{ m: "auto" }}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </BaseGradientCard>
  );
};
