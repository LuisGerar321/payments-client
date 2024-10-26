import { ChangeEvent, FC, useState } from "react";
import { IProps } from "../../interfaces";
import { BaseGradientCard } from "../commons/BaseGradientCard";
import { config } from "../../config";
import { Box, CircularProgress, IconButton, Snackbar, Alert, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import animationLogin from "../../assets/lotties/animationCreate.json";
import Lottie from "lottie-react";
import { HeaderText } from "../commons/HeaderText";
import gateway from "../../config/gateway";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { resetTransactionState } from "../../redux/transactionSlice";

const { palleteColor } = config;
const initLoginFormData = { email: "", citizenIdentityDocumentNumber: "" };

export const LoginClientForm: FC<IProps> = (props: IProps) => {
  const [loginFormData, setLoginFormData] = useState(initLoginFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const dispatch: AppDispatch = useDispatch();

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await gateway.post("/auth", loginFormData);
      setAlertMessage("Login successful");
      setAlertSeverity("success");
      localStorage.setItem("token", response.data.data.token);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      setAlertMessage(error.response?.data?.message || "Error logging in");
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
    <BaseGradientCard backgroundColor={palleteColor.secondaryGradient} sx={{ boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.4)" }}>
      <Lottie animationData={animationLogin} style={{ width: "200px", height: "200px", margin: "0 auto" }} />
      <HeaderText color={palleteColor.alternativeGradient} primary="Welcome back to Villet!" secondary="(Virtual Wallet) Login to your account" />
      <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column" }}>
        <TextField name="email" value={loginFormData.email} onChange={handleChangeData} required sx={{ m: "auto" }} label="Email" variant="standard" color="secondary" type="email" />
        <TextField
          name="citizenIdentityDocumentNumber"
          value={loginFormData.citizenIdentityDocumentNumber}
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
