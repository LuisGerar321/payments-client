import React, { FC } from "react";
import { IProps } from "../../interfaces";
import { config } from "../../config";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface IClientMenuProps extends IProps {}

const { dark, primaryIcon } = config.palleteColor;

export const ClientMenu: FC<IClientMenuProps> = (props: IClientMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "200px", m: 0 }}>
        <IconButton onClick={handleClick} sx={{ width: 56, height: 56 }}>
          <Avatar
            sx={{
              backgroundColor: primaryIcon,
            }}
          >
            L
          </Avatar>
        </IconButton>

        <Typography sx={{ display: { xs: "none", md: "block" } }} fontWeight="bold" variant="body2" color={dark} m="auto">
          Luis G
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            dojas@gmail.com
          </Typography>
        </Typography>
      </Box>
      <Menu
        id="clientMenu"
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
          <Typography variant="body1">Log out</Typography>
          <LogoutIcon fontSize="small" sx={{ ml: 1 }}></LogoutIcon>
        </MenuItem>
      </Menu>
    </>
  );
};
