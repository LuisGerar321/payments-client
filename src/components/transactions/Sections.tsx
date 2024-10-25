import { FC, useState } from "react";
import { IProps } from "../../interfaces";
import { config } from "../../config";
import { Box, Button, Typography } from "@mui/material";

interface ISectionTransactionProps extends IProps {}

const { palleteColor } = config;
const maxOpacity = 0.4;
const minOpacity = 0.7;

export const SectionTransaction: FC<ISectionTransactionProps> = (props: ISectionTransactionProps) => {
  const [selected, setSelected] = useState<"received" | "sent" | null>("received");

  const handleButtonClick = (type: "received" | "sent") => {
    setSelected(type);
  };

  const getTypographyStyles = (type: "received" | "sent") => ({
    color: palleteColor.dark,
    textTransform: "none",
    opacity: selected === type ? minOpacity : maxOpacity,
    fontWeight: "bold",
    fontSize: selected === type ? 26 : 24,
    position: "relative",
    textAlign: "left",
  });

  const renderLine = (type: "received" | "sent") => (
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
      <Button variant="text" onClick={() => handleButtonClick("received")}>
        <Typography sx={getTypographyStyles("received")}>Received</Typography>
        {renderLine("received")}
      </Button>
      <Button variant="text" onClick={() => handleButtonClick("sent")}>
        <Typography sx={getTypographyStyles("sent")}>Sent</Typography>
        {renderLine("sent")}
      </Button>
    </Box>
  );
};
