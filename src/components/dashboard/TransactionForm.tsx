import React, { FC, useState } from "react";
import { ETransactionType, IProps, ITransaction } from "../../interfaces";
import { Box, Card, Checkbox, Dialog, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Slide, TextField, Typography } from "@mui/material";
import { config } from "../../config";
import { TransitionProps } from "@mui/material/transitions";
import { GradientTypography } from "../commons/GradientTypography";
import Lottie from "lottie-react";
import animationMoney from "../../assets/lotties/animationMoney.json";
import animationPay from "../../assets/lotties/animationPay.json";

import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateTransactionCreate } from "../../redux/transactionSlice";

interface ITransactionFormProps extends Pick<ITransaction, "type">, IProps {}

const { palleteColor } = config;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FormData {
  amount: number | null;
  externalPaymentRef: string;
  recipientId: number | null;
}

export const TransactionFormDashboard: FC<ITransactionFormProps> = (props: ITransactionFormProps) => {
  const isAddType = props.type === ETransactionType.ADD;
  const isPayment = props.type === ETransactionType.PAY;
  const [isExternal, setIsExternal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const palleteGradient = isAddType ? palleteColor.alternativeGradient : palleteColor.secondaryGradient;
  const currAnimation = isAddType ? animationMoney : animationPay;
  const gradientString = `linear-gradient(to bottom, ${palleteGradient.map((color) => color).join(", ")})`;
  const { createATransaction } = useSelector((state: RootState) => state.transaction);
  const { state, type } = createATransaction;
  const isOpen = state && type === props.type;

  const [paymentformData, setPaymentFormData] = useState<FormData>({ amount: null, externalPaymentRef: "", recipientId: null });

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentFormData({ ...paymentformData, [e.target.name]: e.target.value });
  };

  const handleAddFunds = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      type,
      amount: paymentformData.amount,
    };
    console.log(payload);
  };

  const handlePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    console.log(payload);
  };

  const users = new Array(20).fill({ id: 1, name: "luis Gerardo" });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsExternal(event.target.checked);
  };

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSelectedUser(event.target.value);
  };

  const dispatch: AppDispatch = useDispatch();

  const header = (primary: string, secondary: string) => (
    <>
      <GradientTypography sx={{}} color={palleteColor.primaryGradient.slice(0, 2)} fontWeight="bold" variant="h1" fontSize={40} textAlign="center">
        {primary}
      </GradientTypography>
      <Typography sx={{ marginBottom: 8 }} color={palleteColor.secondary} fontWeight="bold" variant="h2" fontSize={20} textAlign="center">
        {secondary}
      </Typography>
    </>
  );

  const addForm = (
    <Box component="form" onSubmit={handleAddFunds} sx={{ display: "flex", flexDirection: "column" }}>
      {header("Add founds", "How much money do you want to add?")}
      <TextField
        name="amount"
        value={paymentformData.amount}
        onChange={handleChangePayment}
        required
        sx={{ m: "auto" }}
        id="standard-basic"
        label="Amount $"
        variant="standard"
        focused
        color="secondary"
        type="number"
      />
      <IconButton type="submit" sx={{ m: "auto" }}>
        <SendIcon sx={{ color: palleteColor.primaryIcon }}></SendIcon>
      </IconButton>
    </Box>
  );

  const PayForm = (
    <Box component="form" onSubmit={handlePayment} sx={{ display: "flex", flexDirection: "column" }}>
      {header("Payment", "How much money do you want to Pay?")}
      <FormControlLabel sx={{ m: "auto" }} label={"External Payment"} control={<Checkbox checked={isExternal} onChange={handleCheckboxChange} />} />
      {!isExternal ? (
        <FormControl sx={{ m: "auto", minWidth: 120 }}>
          <InputLabel id="user-select-label">User</InputLabel>
          <Select name="recipientId" labelId="user-select-label" id="user-select" value={selectedUser} label="User" onChange={handleUserChange}>
            {users.map((username) => (
              <MenuItem key={username.id} value={username.id}>
                {username.name}
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
          focused
          color="secondary"
        />
      )}
      <TextField
        name="amount"
        value={paymentformData.amount}
        onChange={handleChangePayment}
        type="number"
        sx={{ m: "auto" }}
        id="amount-basic"
        label="Amount $"
        variant="standard"
        focused
        color="secondary"
      />

      <IconButton type="submit" sx={{ m: "auto" }}>
        <SendIcon sx={{ color: palleteColor.primaryIcon }}></SendIcon>
      </IconButton>
    </Box>
  );

  return (
    <Dialog
      TransitionComponent={Transition}
      open={isOpen}
      onClose={() => {
        dispatch(
          updateTransactionCreate({
            state: false,
            type: props.type,
          }),
        );
      }}
      PaperProps={{ style: { backgroundColor: "transparent", boxShadow: "none" } }}
    >
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
        }}
      >
        <Lottie animationData={currAnimation} style={{ width: "200px", height: "200px", margin: "0 auto 0 auto" }}></Lottie>
        {isAddType && addForm}
        {isPayment && PayForm}
      </Card>
    </Dialog>
  );
};
