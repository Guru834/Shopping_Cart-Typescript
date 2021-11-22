import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { shoppingApiFetch } from "./api/ShoppingApiFetch";
import ShoppingPage from "./components/ShoppingPage";
import { ITypes } from "./interface/types";
import axios from "axios";
const App = () => {
  const [data, setData] = useState<ITypes[]>([]);
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
  return (
    <Box>
      {data.map((item) => {
        return <ShoppingPage shoppingList={item} key={item.id} />;
      })}
    </Box>
  );
};

export default App;
