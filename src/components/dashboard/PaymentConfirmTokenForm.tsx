import { Box, CircularProgress, Divider, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import gateway from "../../config/gateway";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { EAlertState, ETransactionType } from "../../interfaces";
import { updateTransactionCreate, updateTransactionCreateAlert } from "../../redux/transactionSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { isAxiosError } from "axios";

export const PaymentConfirmTokenForm = () => {
  const token = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentToken, setPaymentToken] = useState("");
  const [pendingTransactionId, setPendingTransactionId] = useState(null);
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
    <>
      <Box component="form" onSubmit={handleConfirmPayment} sx={{ display: "flex", flexDirection: "column" }}>
        <h2>Token Verification</h2>
        <TextField name="paymentToken" value={paymentToken} onChange={handleTokenChange} sx={{ m: "auto" }} id="token-basic" label="Token" variant="standard" />
        {isLoading ? (
          <CircularProgress sx={{ margin: "auto" }} />
        ) : (
          <IconButton type="submit" sx={{ m: "auto" }}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
