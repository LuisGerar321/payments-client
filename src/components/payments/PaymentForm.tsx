import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import gateway from "../../config/gateway";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { EAlertState, ETransactionType, ITransactionFormData } from "../../interfaces";
import { resetTransactionState, updateTransactionCreate, updateTransactionCreateAlert, updateTransactionCreatePendingId, updateTransactionCreateStep } from "../../redux/transactionSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { isAxiosError } from "axios";
import { BaseGradientCard } from "../commons/BaseGradientCard";
import Lottie from "lottie-react";
import { HeaderText } from "../commons/HeaderText";
import animationPay from "../../assets/lotties/animationPay.json";
import { config } from "../../config";

const initPaymentformData = { amount: 0, externalPaymentRef: "", recipientId: 0 };
const { palleteColor } = config;

export const PaymentForm = () => {
  const token = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExternal, setIsExternal] = useState(true);
  const [selectedUser, setSelectedUser] = useState("");
  const [paymentformData, setPaymentFormData] = useState<ITransactionFormData>(initPaymentformData);

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsExternal(event.target.checked);
  // };

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentFormData({ ...paymentformData, [e.target.name]: e.target.value });
  };

  const handleRecipientChange = (event: SelectChangeEvent<string>) => {
    setSelectedUser(event.target.value);
  };

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      let payload;
      if (isExternal) {
        payload = {
          type: ETransactionType.EXTERNAL_PAYMENT,
          externalPaymentRef: paymentformData.externalPaymentRef as string,
          amount: paymentformData.amount,
        };
      } else {
        payload = {
          type: ETransactionType.PAY,
          recipientId: selectedUser,
          amount: paymentformData.amount,
        };
      }

      const axiosResponse = await gateway.post("/transactions", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = axiosResponse.data;
      const data: any = res.data;
      dispatch(updateTransactionCreatePendingId(data.id));
      dispatch(updateTransactionCreateStep(2));
      console.log(data);
    } catch (error) {
      let errorMessage = "Something wrong creating your Payment";
      console.error(error);

      if (isAxiosError(error)) errorMessage = `${errorMessage} : ${error.response?.data?.message}  ${error.response?.data?.details?.message}`;
      dispatch(resetTransactionState());
      dispatch(
        updateTransactionCreateAlert({
          severity: EAlertState.ERROR,
          message: errorMessage,
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseGradientCard backgroundColor={palleteColor.secondaryGradient}>
      <Lottie animationData={animationPay} style={{ width: "200px", height: "200px", margin: "0 auto 0 auto" }}></Lottie>
      <HeaderText primary="Payment" secondary="How much mony do you want to pay?"></HeaderText>
      <Box component="form" onSubmit={handlePayment} sx={{ display: "flex", flexDirection: "column" }}>
        {/* <FormControlLabel sx={{ m: "auto" }} label={"External Payment"} control={<Checkbox checked={isExternal} onChange={handleCheckboxChange} />} /> */}
        {!isExternal ? (
          <FormControl sx={{ m: "auto", minWidth: 120 }}>
            <InputLabel id="user-select-label">User</InputLabel>
            <Select name="recipientId" labelId="user-select-label" id="user-select" value={selectedUser} label="User" onChange={handleRecipientChange}>
              {[
                { id: 1, name: "User1" },
                { id: 2, name: "User2" },
              ].map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            name="externalPaymentRef"
            value={paymentformData.externalPaymentRef}
            onChange={handleChangePayment}
            sx={{ m: "auto" }}
            id="reference-basic"
            label="Reference Number"
            variant="standard"
          />
        )}
        <TextField name="amount" value={paymentformData.amount} onChange={handleChangePayment} type="number" sx={{ m: "auto" }} id="amount-basic" label="Amount $" variant="standard" />
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
