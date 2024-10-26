import { FC, ReactNode } from "react";
import { IProps } from "../../interfaces";
import { Button, Typography } from "@mui/material";

interface ICustomButtomProps extends IProps {
  color: string;
  icon: ReactNode;
  title?: string;
  cb?: () => any;
}

export const CustomButton: FC<ICustomButtomProps> = (props: ICustomButtomProps) => {
  return (
    <Button
      onClick={() => {
        if (props.cb) props.cb();
      }}
      variant="contained"
      sx={{ m: 2, borderRadius: 4, backgroundColor: props.color, display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      {props.title && <Typography variant="body2">{props.title} </Typography>}
      {props.icon}
    </Button>
  );
};
