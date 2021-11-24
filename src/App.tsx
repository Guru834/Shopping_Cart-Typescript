import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ShoppingPage from "./components/ShoppingPage";
import { ITypes } from "./interface/types";
import axios from "axios";
import {
  AppBar,
  Backdrop,
  Badge,
  Drawer,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Cart from "./components/cart/Cart";
import CartAlert from "./components/cart/CartAlert";
const App = () => {
  const [data, setData] = useState<ITypes[]>([]);
  const [cart, setCart] = useState<ITypes[]>([]);
  const [open, setOpen] = useState(false);
  const [alertBackDrop, setAlertBackDrop] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      axios.get("https://fakestoreapi.com/products").then((res) => {
        setData(res.data);
        setLoading(true);
      });
    }, 100);
  });
  const handleContinueShopping = (): void => {
    setAlertBackDrop(false);
  };
  const handleCheckout = (): void => {
    setAlertBackDrop(false);
    setOpen(true);
  };
  const handleBuy = (): void => {
    alert("Thank you for buying with us");
    setCart([]);
    setOpen(false);
  };
  const handleAddToCart = (cartItem: ITypes) => {
    if (cart.length >= 1) {
      alert("New addition in your cart:-  " + cartItem.title);
    }
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
    <>
      {!loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Box
            sx={{
              width: "70%",
            }}
          >
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box>
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
                handleBuy={handleBuy}
              />
            </Box>
          </Drawer>
          <Box>
            {open && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: 60,
                }}
                open={open}
                onClick={() => setOpen(false)}
              />
            )}
          </Box>
          <Box
            sx={{
              position: "fixed",
              top: "40%",
              width: "100%",
            }}
          >
            {cart.length >= 1 && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={alertBackDrop}
                onClick={handleContinueShopping}
              >
                <CartAlert
                  continueShopping={handleContinueShopping}
                  checkout={handleCheckout}
                />
              </Backdrop>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default App;
