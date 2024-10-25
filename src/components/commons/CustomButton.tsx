import { FC, ReactNode } from "react";
import { IProps } from "../../interfaces";
import { Button, Typography } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";

interface ICustomButtomProps extends IProps {
  color: string;
  icon: ReactNode;
  title: string;
}

export const CustomButton: FC<ICustomButtomProps> = (props: ICustomButtomProps) => {
  return (
    <Button variant="contained" sx={{ m: 2, borderRadius: 4, backgroundColor: props.color, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="body2">{props.title} </Typography>
      {props.icon}
    </Button>
  );
};
