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

  const users = new Array(20).fill("Luis Gerardo Camara Salinas");

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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {header("Add founds", "How much money do you want to add?")}
      <TextField sx={{ m: "auto" }} id="standard-basic" label="Amount $" variant="standard" focused color="secondary" />
    </Box>
  );

  const ExternalPayForm = <Box></Box>;

  const PayForm = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {header("Payment", "How much money do you want to Pay?")}
      <FormControlLabel sx={{ m: "auto" }} label={"External Payment"} control={<Checkbox checked={isExternal} onChange={handleCheckboxChange} />} />
      {!isExternal ? (
        <FormControl sx={{ m: "auto", minWidth: 120 }}>
          <InputLabel id="user-select-label">User</InputLabel>
          <Select labelId="user-select-label" id="user-select" value={selectedUser} label="User" onChange={handleUserChange}>
            {users.map((username) => (
              <MenuItem key={username} value={username}>
                {username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField sx={{ m: "auto" }} id="reference-basic" label="Reference Number" variant="standard" focused color="secondary" />
      )}
      <TextField sx={{ m: "auto" }} id="amount-basic" label="Amount $" variant="standard" focused color="secondary" />
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
        <IconButton sx={{ m: "auto" }}>
          <SendIcon sx={{ color: palleteColor.primaryIcon }}></SendIcon>
        </IconButton>
      </Card>
    </Dialog>
  );
};
