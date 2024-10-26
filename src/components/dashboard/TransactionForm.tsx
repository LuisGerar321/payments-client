import React, { FC, useEffect, useState } from "react";
import { EAlertState, ETransactionType, IProps, ITransaction } from "../../interfaces";
import {
  Alert,
  Box,
  Card,
  Checkbox,
  CircularProgress,
  Collapse,
  Dialog,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
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
import gateway from "../../config/gateway";
import { isAxiosError } from "axios";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [actionAlertState, setActionAlertState] = useState<EAlertState | null>(null);
  const [messageAlert, setMessageAlert] = useState("");
  const [pendingTransactionId, setPendingTransactionId] = useState(null);

  const [paymentStep, setPaymentStep] = useState(1);
  const handleNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePayment(event);
    setPaymentStep((prevStep) => prevStep + 1);
  };
  const handlePrevStep = () => setPaymentStep((prevStep) => prevStep - 1);
  const [paymentToken, setPaymentToken] = useState("");

  const initPaymentformData = { amount: 0, externalPaymentRef: "", recipientId: 0 };
  const [paymentformData, setPaymentFormData] = useState<FormData>(initPaymentformData);

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => setPaymentToken(event.target.value);

  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentFormData({ ...paymentformData, [e.target.name]: e.target.value });
  };

  const handleAddFunds = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      const payload = {
        type,
        amount: paymentformData.amount,
      };

      const axiosResponse = await gateway.post(
        "/transactions",
        { ...payload, recipientId: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = axiosResponse.data;
      const data: any = res.data;
      setActionAlertState(EAlertState.SUCCESS);
      setMessageAlert("Your founds was added in your account!");
      console.log(data);
    } catch (error) {
      const errorMessage = "Something wrong creating your Payment";
      console.error(error);
      setActionAlertState(EAlertState.ERROR);
      if (isAxiosError(error)) {
        setMessageAlert(`${errorMessage} : ${error.response?.data?.message}  ${error.response?.data?.details?.message || error.response?.data?.details}`);
        return;
      }
      setMessageAlert(errorMessage);
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

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
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

      const axiosResponse = await gateway.post("/transactions", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = axiosResponse.data;
      const data: any = res.data;
      setPendingTransactionId(data.id);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setActionAlertState(EAlertState.SUCCESS);
      setMessageAlert("Your payment was applied succesfully!");
      console.log(data);
    } catch (error) {
      const errorMessage = "Something wrong creating your Payment";
      console.error(error);
      setActionAlertState(EAlertState.ERROR);
      if (isAxiosError(error)) {
        setMessageAlert(`${errorMessage} : ${error.response?.data?.message}  ${error.response?.data?.details?.message}`);
        return;
      }
      setMessageAlert(errorMessage);
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

  const loaderComponent = <CircularProgress sx={{ m: "auto" }}></CircularProgress>;
  const addForm = (
    <>
      {isLoading ? (
        loaderComponent
      ) : (
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
            color="secondary"
            type="number"
          />
          <IconButton type="submit" sx={{ m: "auto" }}>
            <SendIcon sx={{ color: palleteColor.primaryIcon }}></SendIcon>
          </IconButton>
        </Box>
      )}
    </>
  );

  const PayForm = (
    <>
      <Collapse in={paymentStep === 1} unmountOnExit>
        <Box component="form" onSubmit={handleNextStep} sx={{ display: "flex", flexDirection: "column" }}>
          <h2>Payment</h2>
          <FormControlLabel sx={{ m: "auto" }} label={"External Payment"} control={<Checkbox checked={isExternal} onChange={handleCheckboxChange} />} />
          {!isExternal ? (
            <FormControl sx={{ m: "auto", minWidth: 120 }}>
              <InputLabel id="user-select-label">User</InputLabel>
              <Select name="recipientId" labelId="user-select-label" id="user-select" value={selectedUser} label="User" onChange={handleUserChange}>
                {/* Map of users - replace with actual users data */}
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
          <IconButton type="submit" sx={{ m: "auto" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Collapse>

      <Collapse in={paymentStep === 2} unmountOnExit>
        <Box component="form" onSubmit={handleConfirmPayment} sx={{ display: "flex", flexDirection: "column" }}>
          <h2>Token Verification</h2>
          <TextField name="paymentToken" value={paymentToken} onChange={handleTokenChange} sx={{ m: "auto" }} id="token-basic" label="Token" variant="standard" />
          <IconButton type="submit" sx={{ m: "auto" }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Collapse>
    </>
  );

  useEffect(() => {}, [actionAlertState, token]);

  return (
    <>
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
          setPaymentFormData(initPaymentformData);
          setPaymentStep(1);
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

      <Snackbar open={actionAlertState !== null} onClose={() => setActionAlertState(null)}>
        <Alert onClose={() => setActionAlertState(null)} severity={actionAlertState ? actionAlertState : "info"}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </>
  );
};
