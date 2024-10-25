import { FC } from "react";
import { IProps } from "../../interfaces";
import { Box } from "@mui/material";
import { ClientMenu } from "./Client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NavbarMenu } from "./Navbar";
import { PersistentSlider } from "./Slider";
import { AppName } from "../commons/AppName";

interface ISidebarLayoutProps extends IProps {}

export const MenuLayout: FC<ISidebarLayoutProps> = (props: ISidebarLayoutProps) => {
  const { balance } = useSelector((state: RootState) => state.balance);

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          border: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.2)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavbarMenu></NavbarMenu>
        <AppName></AppName>
        <ClientMenu></ClientMenu>
      </Box>

      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          border: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.2)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AppName></AppName>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, height: "100%", justifyContent: "space-around" }}>
          <ClientMenu></ClientMenu>
          <PersistentSlider balance={balance}></PersistentSlider>;
        </Box>
      </Box>
    </>
  );
};
