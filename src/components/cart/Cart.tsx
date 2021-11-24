import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ITypes } from "../../interface/types";

import CartItem from "./CartItem";
interface ICart {
  cartItems: ITypes[];
  addItem(types: number): void;
  removeItem(types: number): void;
  handleBuy(): void;
}
const Cart: React.FC<ICart> = ({
  cartItems,
  addItem,
  removeItem,
  handleBuy,
}) => {
  const calculateCost = (items: ITypes[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Box sx={{ margin: "7%", zIndex: 1000 }}>
      {cartItems.map((item) => {
        return (
          <CartItem
            key={item.id}
            cartItems={item}
            addItem={addItem}
            removeItem={removeItem}
          />
        );
      })}
      {cartItems.length <= 0 ? (
        "No item in the cart"
      ) : (
        <>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "bold", marginTop: "3%" }}
          >
            Total:- {calculateCost(cartItems).toFixed(2)}
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "15%" }}
              onClick={handleBuy}
            >
              Buy
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
