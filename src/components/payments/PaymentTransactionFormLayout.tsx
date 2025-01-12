import { Box, Collapse } from "@mui/material";
import { PaymentConfirmTokenForm } from "./PaymentConfirmTokenForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PaymentForm } from "./PaymentForm";

export const PaymentTransactionLayout = () => {
  const { step } = useSelector((state: RootState) => state.transaction.createATransaction);

  return (
    <Box>
      <Collapse in={step === 1} unmountOnExit>
        <PaymentForm></PaymentForm>
      </Collapse>

      <Collapse in={step === 2} unmountOnExit>
        <PaymentConfirmTokenForm></PaymentConfirmTokenForm>
      </Collapse>
    </Box>
  );
};
