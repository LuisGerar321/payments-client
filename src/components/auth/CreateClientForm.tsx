import { ChangeEvent, FC, useState } from "react";
import { EAlertState, ETransactionType, IProps, ITransactionFormData } from "../../interfaces";
import { BaseGradientCard } from "../commons/BaseGradientCard";
import { config } from "../../config";
import { Box, CircularProgress, IconButton, Snackbar, Alert, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import animationCreate from "../../assets/lotties/animationCreate.json";
import Lottie from "lottie-react";
import { HeaderText } from "../commons/HeaderText";
import gateway from "../../config/gateway";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetTransactionState } from "../../redux/transactionSlice";

const { palleteColor } = config;
const initClientFormData = { name: "", email: "", phone: "", citizenIdentityDocumentNumber: "" };

export const CreateClientForm: FC<IProps> = (props: IProps) => {
  const [clientFormData, setClientFormData] = useState(initClientFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const dispatch: AppDispatch = useDispatch();

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setClientFormData({ ...clientFormData, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await gateway.post("/clients", clientFormData);
      setAlertMessage(response.data.message);
      setAlertSeverity("success");
    } catch (error: any) {
      setAlertMessage(error.response?.data?.message || "Error creating client");
      setAlertSeverity("error");
    } finally {
      setIsLoading(false);
      setAlertOpen(true);
      dispatch(resetTransactionState());
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <BaseGradientCard backgroundColor={palleteColor.primaryGradient} sx={{ boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.4)" }}>
      <Lottie animationData={animationCreate} style={{ width: "200px", height: "200px", margin: "0 auto" }} />
      <HeaderText color={palleteColor.alternativeGradient} primary="Welcome to Villet!" secondary="(Virtual Wallet) Create your account" />
      <Box component="form" onSubmit={handleCreateAccount} sx={{ display: "flex", flexDirection: "column" }}>
        <TextField name="name" value={clientFormData.name} onChange={handleChangeData} required sx={{ m: "auto" }} label="Name" variant="standard" color="secondary" />
        <TextField name="email" value={clientFormData.email} onChange={handleChangeData} required sx={{ m: "auto" }} label="Email" variant="standard" color="secondary" type="email" />
        <TextField name="phone" value={clientFormData.phone} onChange={handleChangeData} required sx={{ m: "auto" }} label="Phone" variant="standard" color="secondary" type="tel" />
        <TextField
          name="citizenIdentityDocumentNumber"
          value={clientFormData.citizenIdentityDocumentNumber}
          onChange={handleChangeData}
          required
          sx={{ m: "auto" }}
          label="Identity Document"
          variant="standard"
          color="secondary"
          type="password"
        />
        {isLoading ? (
          <CircularProgress sx={{ margin: "auto" }} />
        ) : (
          <IconButton type="submit" sx={{ m: "auto" }}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </BaseGradientCard>
  );
};
