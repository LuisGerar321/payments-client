import { FC, useState } from "react";
import { IProps } from "../../interfaces";
import { config } from "../../config";
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MoneyIcon from "@mui/icons-material/CurrencyExchange";
import ReportsIcon from "@mui/icons-material/Assessment";

interface IDrawerProps extends IProps {
  balance: number;
}

const { palleteColor } = config;

export const PersistentSlider: FC<IDrawerProps> = (props: IDrawerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <List>
        <ListItem>
          <ListItemButton onClick={() => handleListItemClick(0)}>
            <ListItemIcon>
              <Avatar
                variant="rounded"
                sx={{
                  backgroundColor: selectedIndex === 0 ? palleteColor.primary : "white",
                  borderRadius: 3,
                  boxShadow: `0px 4px 10px rgba(0,0,0,0.2)`,
                }}
              >
                <MoneyIcon sx={{ color: selectedIndex === 0 ? "white" : palleteColor.secondary }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText sx={{ color: palleteColor.dark }} primary="Payments" secondary={`$${props.balance || 0}`} />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => handleListItemClick(1)}>
            <ListItemIcon>
              <Avatar
                variant="rounded"
                sx={{
                  backgroundColor: selectedIndex === 1 ? palleteColor.primary : "white",
                  borderRadius: 3,
                  boxShadow: `0px 4px 10px rgba(0,0,0,0.2)`,
                }}
              >
                <ReportsIcon sx={{ color: selectedIndex === 1 ? "white" : palleteColor.secondary }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
