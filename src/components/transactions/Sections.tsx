import { FC, useState } from "react";
import { ETransactionSection, IProps } from "../../interfaces";
import { config } from "../../config";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateTransactionSection } from "../../redux/transactionSlice";

interface ISectionTransactionProps extends IProps {}

const { palleteColor } = config;
const maxOpacity = 0.4;
const minOpacity = 0.7;

export const SectionTransaction: FC<ISectionTransactionProps> = (props: ISectionTransactionProps) => {
  const [selected, setSelected] = useState<ETransactionSection>(ETransactionSection.RECEIVED);
  const dispatch: AppDispatch = useDispatch();

  const handleButtonClick = (type: ETransactionSection) => {
    setSelected(type);
    dispatch(updateTransactionSection(type));
  };

  const getTypographyStyles = (type: ETransactionSection) => ({
    color: palleteColor.dark,
    textTransform: "none",
    opacity: selected === type ? minOpacity : maxOpacity,
    fontWeight: "bold",
    fontSize: selected === type ? 26 : 24,
    position: "relative",
    textAlign: "left",
  });

  const renderLine = (type: ETransactionSection) => (
    <Box
      sx={{
        width: 40,
        height: 4,
        backgroundColor: palleteColor.primary,
        borderRadius: 2,
        display: selected === type ? "block" : "none",
        position: "absolute",
        bottom: 0,
        left: 0,
        ml: 1,
      }}
    />
  );

  return (
    <Box sx={{ width: "80%", mr: "auto", height: "50px", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
      <Button variant="text" onClick={() => handleButtonClick(ETransactionSection.RECEIVED)}>
        <Typography sx={getTypographyStyles(ETransactionSection.RECEIVED)}>Received</Typography>
        {renderLine(ETransactionSection.RECEIVED)}
      </Button>
      <Button variant="text" onClick={() => handleButtonClick(ETransactionSection.SENT)}>
        <Typography sx={getTypographyStyles(ETransactionSection.SENT)}>Sent</Typography>
        {renderLine(ETransactionSection.SENT)}
      </Button>
    </Box>
  );
};
