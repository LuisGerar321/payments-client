import React, { FC, useEffect, useState } from "react";
import { EAlertState, ETransactionType, IProps, ITransaction } from "../../interfaces";
import { Alert, CircularProgress, Dialog, Slide, Snackbar, Typography } from "@mui/material";
import { config } from "../../config";
import { TransitionProps } from "@mui/material/transitions";
import { GradientTypography } from "../commons/GradientTypography";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { resetTransactionState, updateTransactionCreate } from "../../redux/transactionSlice";
import gateway from "../../config/gateway";
import { isAxiosError } from "axios";
import { PaymentTransactionLayout } from "./PaymentTransactionFormLayout";
import { AddFundsForm } from "./AddFundsForm";

interface ITransactionFormProps extends IProps {}

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
  const { createATransaction } = useSelector((state: RootState) => state.transaction);
  const { state, type } = createATransaction;
  const isAddType = type === ETransactionType.ADD;
  const isPayment = type === ETransactionType.PAY;
  // const isOpen = state && type === props.type;
  const token = localStorage.getItem("token");
  const { severity, message } = useSelector((state: RootState) => state.transaction.createATransaction.alert);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {}, [severity, token]);

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={state}
        onClose={() => {
          dispatch(
            updateTransactionCreate({
              state: false,
              type: type,
            }),
          );
        }}
        PaperProps={{ style: { backgroundColor: "transparent", boxShadow: "none" } }}
      >
        {isAddType && <AddFundsForm></AddFundsForm>}
        {isPayment && <PaymentTransactionLayout></PaymentTransactionLayout>}
      </Dialog>

      {/* <Snackbar open={severity !== null} onClose={() => dispatch(resetTransactionState())}>
        <Alert onClose={() => dispatch(resetTransactionState())} severity={severity ? severity : "info"}>
          {message}
        </Alert>
      </Snackbar> */}
    </>
  );
};
