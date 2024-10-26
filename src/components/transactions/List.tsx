import { FC, useEffect } from "react";
import { ETransactionSection, ETransactionType, IProps } from "../../interfaces";
import { config } from "../../config";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import gateway from "../../config/gateway";
import { updateTransactionCreate, updateTransactionCreatePendingId, updateTransactionCreateStep, updateTransactionList } from "../../redux/transactionSlice";
import stringToColor from "string-to-color";
import Lottie from "lottie-react";
import animationEmpty from "../../assets/lotties/animationEmpty.json";

interface IListTransactionProps extends IProps {}

const { palleteColor } = config;

export const ListTransaction: FC<IListTransactionProps> = (props: IListTransactionProps) => {
  const token = localStorage.getItem("token");
  const dispatch: AppDispatch = useDispatch();
  const { transactions, section } = useSelector((state: RootState) => state.transaction);
  const isReceived = section === ETransactionSection.RECEIVED;
  const transactionList = isReceived ? transactions.received : transactions.sent;
  const { createATransaction } = useSelector((state: RootState) => state.transaction);

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
  }, [token, createATransaction]);

  return (
    <Box
      sx={{
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
        },
      }}
    >
      {transactionList?.length <= 0 ? (
        <Lottie animationData={animationEmpty} style={{ width: "200px", height: "200px", margin: "0 auto 0 auto" }}></Lottie>
      ) : (
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
                  onClick={() => {
                    dispatch(updateTransactionCreateStep(2));
                    dispatch(updateTransactionCreatePendingId(transaction.id));
                    dispatch(updateTransactionCreate({ state: true, type: ETransactionType.PAY }));
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: stringToColor(name) }}>{name[0].toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={isAddTransaction ? "You" : name} />
                  <ListItemText primary={isReceived ? `+ $${transaction?.amount}` : `- $${transaction?.amount}`} sx={{ display: { xs: "block", sm: "block" } }} />
                  <ListItemText primary={transaction?.status} sx={{ display: { xs: "none", sm: "block" } }} />
                  <ListItemText primary={suggarDate} sx={{ display: { xs: "none", sm: "block" } }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};
