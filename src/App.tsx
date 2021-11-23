import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { shoppingApiFetch } from "./api/ShoppingApiFetch";
import ShoppingPage from "./components/ShoppingPage";
import { ITypes } from "./interface/types";
import axios from "axios";
import {
  AppBar,
  Badge,
  BadgeProps,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@emotion/styled/types/base";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Cart from "./components/cart/Cart";
const App = () => {
  const [data, setData] = useState<ITypes[]>([]);
  const [cart, setCart] = useState<ITypes[]>([]);
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   (async function () {
  //     const list = await shoppingApiFetch();
  //     setData(list);
  //   })();
  // }, []);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setData(res.data));
  });
  const handleAddToCart = (cartItem: ITypes) => {
    setCart((prev) => {
      const checkItem = prev.find((item) => item.id === cartItem.id);
      if (checkItem) {
        return prev.map((item) =>
          item.id === cartItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...cartItem, amount: 1 }];
    });
  };
  const addToCart = (id: number) => {
    setCart((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          return [...ack, { ...item, amount: item.amount + 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as ITypes[])
    );
  };
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount <= 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as ITypes[])
    );
  };

  return (
    <Box>
      {open && (
        <Box
          sx={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            position: "fixed",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 200,
          }}
          onClick={() => setOpen(false)}
        ></Box>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome to my store
            </Typography>
            <IconButton aria-label="cart">
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon
                  sx={{ color: "white" }}
                  onClick={() => setOpen(true)}
                />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: 300,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 300,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <Box sx={{ marginTop: "2%", marginBottom: "11%" }}>
            <ArrowForwardIcon
              onClick={() => setOpen(false)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "red",
                  transition: "color 0.5s",
                },
              }}
            />
          </Box>
          <Box>
            <Cart
              cartItems={cart}
              addItem={addToCart}
              removeItem={removeFromCart}
            />
          </Box>
        </Drawer>
      </Box>
      {data.map((item) => {
        return (
          <ShoppingPage
            shoppingList={item}
            key={item.id}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </Box>
  );
};

export default App;
