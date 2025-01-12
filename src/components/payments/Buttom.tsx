import { FC } from "react";
import { ETransactionType, IProps } from "../../interfaces";
import { Grid } from "@mui/material";
import { config } from "../../config";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CustomButton } from "../commons/CustomButton";
import { Wallet } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateTransactionCreate } from "../../redux/transactionSlice";

interface IPaymentsButtomsProps extends IProps {}

const { primary, secondary } = config.palleteColor;
const sx = { display: "flex", justifyContent: "center", alignItems: "center" };
export const ButtomPayments: FC<IPaymentsButtomsProps> = (props: IPaymentsButtomsProps) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={sx}>
        <CustomButton
          cb={() => {
            dispatch(updateTransactionCreate({ state: true, type: ETransactionType.ADD }));
          }}
          icon={<Wallet></Wallet>}
          title="Add"
          color={primary}
        ></CustomButton>
      </Grid>

      <Grid item xs={12} md={6} sx={sx}>
        <CustomButton
          cb={() => {
            dispatch(updateTransactionCreate({ state: true, type: ETransactionType.PAY }));
          }}
          icon={<PaymentsIcon></PaymentsIcon>}
          title="Pay"
          color={secondary}
        ></CustomButton>
      </Grid>
    </Grid>
  );
};
