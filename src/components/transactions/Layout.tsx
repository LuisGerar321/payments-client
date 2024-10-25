import { FC } from "react";
import { IProps } from "../../interfaces";
import { Box } from "@mui/material";
import { SectionTransaction } from "./Sections";
import { ListTransaction } from "./List";

interface ITransactionLayoutProps extends IProps {}

export const TransactionLayout: FC<ITransactionLayoutProps> = (props: ITransactionLayoutProps) => {
  return (
    <>
      <Box
        sx={{
          width: {
            xs: "350px",
            md: "700px",
            lg: "900px",
            xl: "1200px",
          },
          height: {
            md: "400px",
          },
          mt: 2,
          ml: "auto",
          mr: "auto",
          // borderRadius: 7,
          // boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <SectionTransaction></SectionTransaction>
        <ListTransaction></ListTransaction>
      </Box>
    </>
  );
};
