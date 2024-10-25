import React, { FC } from "react";
import { IProps } from "../../interfaces";
import { config } from "../../config";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import MoneyIcon from "@mui/icons-material/CurrencyExchange";
import ReportsIcon from "@mui/icons-material/Assessment";

interface IAppMenuProps extends IProps {}

const { palleteColor } = config;

export const NavbarMenu: FC<IAppMenuProps> = (props: IAppMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "200px", maxHeight: "60px", m: "auto", justifyContent: "center" }}>
        <IconButton onClick={handleClick} sx={{ width: 56, height: 56 }}>
          <Avatar
            sx={{
              backgroundColor: palleteColor.secondaryIcon,
              borderRadius: 3,
              boxShadow: `0px 4px 8px rgba(250,100,0,0.4)`,
            }}
            variant="rounded"
          >
            <ListIcon></ListIcon>
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        id="AppMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <MoneyIcon fontSize="small" sx={{ mr: 1 }}></MoneyIcon>
          <Typography variant="body1">Payments</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ReportsIcon fontSize="small" sx={{ mr: 1 }}></ReportsIcon>
          <Typography variant="body1">Reports</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
