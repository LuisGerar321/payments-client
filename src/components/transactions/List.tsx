import { FC, useEffect, useState } from "react";
import { ETransactionSection, ETransactionType, IProps } from "../../interfaces";
import { config } from "../../config";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import gateway from "../../config/gateway";
import { updateTransactionList } from "../../redux/transactionSlice";
import stringToColor from "string-to-color";

interface IListTransactionProps extends IProps {}

const { palleteColor } = config;

export const ListTransaction: FC<IListTransactionProps> = (props: IListTransactionProps) => {
  const token = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const { transactions, section } = useSelector((state: RootState) => state.transaction);
  const isReceived = section === ETransactionSection.RECEIVED;
  const transactionList = isReceived ? transactions.received : transactions.sent;

  useEffect(() => {
    gateway
      .get("/transactions/self", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((axiosResponse) => {
        const res = axiosResponse.data;
        const data = res.data;
        console.log(data);
        dispatch(
          updateTransactionList({
            sent: data?.sent || [],
            received: data?.received || [],
          }),
        );
      })
      .catch((err) => {})
      .finally(() => {});
  }, [token]);

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
        {transactionList?.map((transaction, index) => {
          const isExternal = transaction.type === ETransactionType.EXTERNAL_PAYMENT;
          const isAddTransaction = transaction.type === ETransactionType.ADD;
          const senderName = transaction?.sender?.name;
          const recipientName = transaction?.recipient?.name;
          const name = isExternal ? "external" : isReceived ? senderName : recipientName;
          const suggarDate = new Date(transaction?.createdAt).toLocaleString("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
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
                  <Avatar sx={{ backgroundColor: stringToColor(name) }}>{name[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText sx={{ width: "2px" }} primary={isAddTransaction ? "You" : name}></ListItemText>
                <ListItemText primary={isReceived ? `+ $${transaction?.amount}` : `- $${transaction?.amount}`}></ListItemText>
                <ListItemText primary={transaction?.status}> </ListItemText>
                <ListItemText primary={suggarDate}></ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
