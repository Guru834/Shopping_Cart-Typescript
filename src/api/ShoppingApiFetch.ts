import { ITypes } from "../interface/types";

export async function shoppingApiFetch(): Promise<ITypes[]> {
  const api = "https://fakestoreapi.com/products";
  const response = await fetch(api);
  return await response.json();
}
