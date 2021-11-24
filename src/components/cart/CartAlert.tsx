import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
interface IAlert {
  continueShopping: () => void;
  checkout: () => void;
}
const CartAlert: React.FC<IAlert> = ({ continueShopping, checkout }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Box />
      <Box
        sx={{
          backgroundColor: "red",
          zIndex: 30,
          minWidth: "712px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "whitesmoke",
              justifyContent: "center",
              padding: "6px",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", color: "red", fontWeight: 700 }}
            >
              Thank you for buying with us
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "6px",
            }}
          >
            <Typography variant="subtitle1">Choose what to do next</Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-evenly", margin: "4%" }}
        >
          <Button
            variant="contained"
            onClick={continueShopping}
            sx={{ width: "30%" }}
          >
            Continue Shopping
          </Button>
          <Button variant="contained" onClick={checkout} sx={{ width: "30%" }}>
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartAlert;
