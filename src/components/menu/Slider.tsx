import { FC, useMemo, useState, cloneElement } from "react";
import { IProps } from "../../interfaces";
import { config } from "../../config";
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MoneyIcon from "@mui/icons-material/CurrencyExchange";
import ReportsIcon from "@mui/icons-material/Assessment";
import { Category, Dashboard, Liquor } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface IDrawerProps extends IProps {
  balance: number;
}

const { palleteColor } = config;
const sections = [
  {
    name: "Dashboard",
    description: null,
    icon: <Dashboard></Dashboard>,
    pathRoute: "/dashboard",
  },
  {
    name: "Categories",
    description: null,
    icon: <Category></Category>,
    pathRoute: "/categories",
  },
  {
    name: "Products",
    description: null,
    icon: <Liquor></Liquor>,
    pathRoute: "/products",
  },
  {
    name: "Payments",
    description: null,
    icon: <MoneyIcon> </MoneyIcon>,
    pathRoute: "/payments",
  },
  {
    name: "Reports",
    description: null,
    icon: <ReportsIcon> </ReportsIcon>,
    pathRoute: "/reports",
  },
];

export const PersistentSlider: FC<IDrawerProps> = (props: IDrawerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleListItemClick = (index: number, pathRoute: string) => {
    setSelectedIndex(index);
    navigate(pathRoute);
  };

  const paymentsIndex = useMemo(() => {
    return sections.findIndex((section) => section.name === "Payments");
  }, [sections]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <List>
        {sections.map((section, index) => (
          <ListItem>
            <ListItemButton
              sx={{
                "&:hover": {
                  borderRadius: 3,
                  backgroundColor: palleteColor.primaryGradient,
                },
              }}
              onClick={() => handleListItemClick(index, section.pathRoute)}
            >
              <ListItemIcon>
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor: selectedIndex === index ? palleteColor.primary : "white",
                    borderRadius: 3,
                    boxShadow: `0px 4px 10px rgba(0,0,0,0.2)`,
                  }}
                >
                  {cloneElement(section.icon, {
                    sx: {
                      color: selectedIndex === index ? "white" : palleteColor.secondary,
                    },
                  })}
                </Avatar>
              </ListItemIcon>
              <ListItemText sx={{ color: palleteColor.dark }} primary={section.name} secondary={index === paymentsIndex ? `$${props.balance}` : section.description} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
