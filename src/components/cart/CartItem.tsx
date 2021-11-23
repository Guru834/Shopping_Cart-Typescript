import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ITypes } from "../../interface/types";
interface ICart {
  cartItems: ITypes;
  addItem(types: number): void;
  removeItem(types: number): void;
}
const CartItem: React.FC<ICart> = ({ cartItems, addItem, removeItem }) => {
  return (
    <Box>
      <Grid item container xs={12}>
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            {cartItems.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10%",
            }}
          >
            <Typography>Price:- ${cartItems.price}</Typography>
            <Typography>
              Total:- ${(cartItems.amount * cartItems.price).toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6%",
            }}
          >
            <AddIcon
              sx={{
                backgroundColor: "gray",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "red",
                  transition: "background-color 0.5s",
                },
              }}
              onClick={() => addItem(cartItems.id)}
            />
            {cartItems.amount}
            <RemoveIcon
              sx={{
                backgroundColor: "gray",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "red",
                  transition: "background-color 0.5s",
                },
              }}
              onClick={() => removeItem(cartItems.id)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src={cartItems.image}
            sx={{ width: 60, height: 70 }}
            variant="square"
          />
        </Grid>
      </Grid>

      <Divider variant="middle" sx={{ marginBottom: "10%" }} />
    </Box>
  );
};

export default CartItem;
