import { ChangeEvent, FC, useState } from "react";
import { EAlertState, ETransactionType, IProps, ITransactionFormData } from "../../interfaces";
import { BaseGradientCard } from "../commons/BaseGradientCard";
import { config } from "../../config";
import { Box, CircularProgress, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import animationMoney from "../../assets/lotties/animationMoney.json";
import Lottie from "lottie-react";
import { HeaderText } from "../commons/HeaderText";
import gateway from "../../config/gateway";
import { isAxiosError } from "axios";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetTransactionState, updateTransactionCreate, updateTransactionCreateAlert } from "../../redux/transactionSlice";

const { palleteColor } = config;
const initPaymentformData = { amount: 0, externalPaymentRef: "", recipientId: 0 };

export const AddFundsForm: FC<IProps> = (props: IProps) => {
  const token = localStorage.getItem("token");

  const [paymentformData, setPaymentFormData] = useState<ITransactionFormData>(initPaymentformData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentFormData({ ...paymentformData, [e.target.name]: e.target.value });
  };

  const handleAddFunds = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      const payload = {
        type: ETransactionType.ADD,
        amount: paymentformData.amount,
      };

      const axiosResponse = await gateway.post(
        "/transactions",
        { ...payload },
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
    <BaseGradientCard backgroundColor={palleteColor.alternativeGradient}>
      <Lottie animationData={animationMoney} style={{ width: "200px", height: "200px", margin: "0 auto 0 auto" }}></Lottie>
      <HeaderText primary="Add founds" secondary="How much money do you want to add?"></HeaderText>

      <Box component="form" onSubmit={handleAddFunds} sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          name="amount"
          value={paymentformData.amount}
          onChange={handleChangePayment}
          required
          sx={{ m: "auto" }}
          id="standard-basic"
          label="Amount $"
          variant="standard"
          color="secondary"
          type="number"
        />
        {isLoading ? (
          <CircularProgress sx={{ margin: "auto" }}></CircularProgress>
        ) : (
          <IconButton type="submit" sx={{ m: "auto" }}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </BaseGradientCard>
  );
};
