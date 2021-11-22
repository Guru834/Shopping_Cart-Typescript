import { ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ITypes } from "../interface/types";

interface IPage {
  shoppingList: ITypes;
}
const ShoppingPage: React.FC<IPage> = ({ shoppingList }) => {
  return (
    <Box sx={{ display: "inline-flex" }}>
      <Card
        sx={{
          maxWidth: 450,
          minHeight: 700,
          maxHeight: 800,
          margin: "5%",
          "&:hover": { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <CardHeader
            title={shoppingList.title}
            subheader={shoppingList.category}
          />
          <CardMedia
            component="img"
            height="250"
            image={shoppingList.image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {shoppingList.description}
            </Typography>
            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", marginTop: "3%" }}
            >
              ${shoppingList.price}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            size="medium"
            sx={{
              width: "100%",
              "&:hover": { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" },
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ShoppingPage;
