import { FC } from "react";
import { IProps } from "../../interfaces";
import { Grid } from "@mui/material";
import { config } from "../../config";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CustomButton } from "../commons/CustomButton";
import { Wallet } from "@mui/icons-material";

interface IDashboardButtomsProps extends IProps {}

const { primary, secondary } = config.palleteColor;
const sx = { display: "flex", justifyContent: "center", alignItems: "center" };
export const DashboardButtoms: FC<IDashboardButtomsProps> = (props: IDashboardButtomsProps) => {
  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={sx}>
        <CustomButton icon={<Wallet></Wallet>} title="Add" color={primary}></CustomButton>
      </Grid>

      <Grid item xs={12} md={6} sx={sx}>
        <CustomButton icon={<PaymentsIcon></PaymentsIcon>} title="Pay" color={secondary}></CustomButton>
      </Grid>
    </Grid>
  );
};
