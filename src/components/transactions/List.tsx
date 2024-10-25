import { FC } from "react";
import { IProps } from "../../interfaces";
import { config } from "../../config";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

interface IListTransactionProps extends IProps {}

const { palleteColor } = config;

const transactions = [
  { id: 1, name: "Luis", amount: 2 },
  { id: 2, name: "Luis", amount: 20 },
  { id: 3, name: "Luis", amount: 35 },
  { id: 3, name: "Luis", amount: 35 },
  { id: 3, name: "Luis", amount: 35 },
  { id: 3, name: "Luis", amount: 35 },
  { id: 3, name: "Luis", amount: 35 },
  { id: 3, name: "Luis", amount: 35 },
  { id: 3, name: "Luis", amount: 35 },
  { id: 3, name: "Luis", amount: 35 },
];

export const ListTransaction: FC<IListTransactionProps> = (props: IListTransactionProps) => {
  return (
    <Box
      sx={{
        // boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.2)",
        width: "100%",
        mr: "auto",
        mt: "auto",
        mb: "auto",
        maxHeight: "300px",
        overflowY: "auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `${palleteColor.secondaryIcon}`,
          borderRadius: "2px",
          // outline: "0.1px solid slategrey", // Borde del thumb
        },
      }}
    >
      <List sx={{ width: "100%" }}>
        {transactions.map((transaction, index) => (
          <ListItem key={index}>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderRadius: 5,
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar>{transaction.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={transaction.name}></ListItemText>
              <ListItemText primary={transaction.amount}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
