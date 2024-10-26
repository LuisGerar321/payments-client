import React, { FC, useEffect } from "react";
import { ETransactionType, IProps } from "../../interfaces";
import { Alert, Dialog, Slide, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateTransactionCreate } from "../../redux/transactionSlice";
import { PaymentTransactionLayout } from "./PaymentTransactionFormLayout";
import { AddFundsForm } from "./AddFundsForm";

interface ITransactionFormProps extends IProps {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TransactionFormDashboard: FC<ITransactionFormProps> = (props: ITransactionFormProps) => {
  const { createATransaction } = useSelector((state: RootState) => state.transaction);
  const { state, type } = createATransaction;
  const isAddType = type === ETransactionType.ADD;
  const isPayment = type === ETransactionType.PAY;
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

      <Snackbar open={severity !== null} onClose={() => console.log("closed")}>
        <Alert onClose={() => () => console.log("closed")} severity={severity ? severity : "info"}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
