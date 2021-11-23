import { Button, Typography } from "@mui/material";
import { Box, fontSize } from "@mui/system";
import React from "react";
import { ITypes } from "../../interface/types";

import CartItem from "./CartItem";
interface ICart {
  cartItems: ITypes[];
  addItem(types: number): void;
  removeItem(types: number): void;
}
const Cart: React.FC<ICart> = ({ cartItems, addItem, removeItem }) => {
  const calculateCost = (items: ITypes[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Box sx={{ margin: "7%" }}>
      {cartItems.map((item) => {
        return (
          <CartItem
            cartItems={item}
            addItem={addItem}
            removeItem={removeItem}
          />
        );
      })}
      <Typography
        sx={{ fontSize: "15px", fontWeight: "bold", marginTop: "3%" }}
      >
        Total:- {calculateCost(cartItems).toFixed(2)}
      </Typography>
      <Box>
        <Button variant="contained" sx={{ width: "100%", marginTop: "15%" }}>
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;