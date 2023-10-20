import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [CartProducts, setCartProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartID, setcartID] = useState(null);

  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // setCartProducts(data.data.products);
      // setTotalCartPrice(data.data.totalCartPrice);
      // setNumOfCartItems(data.numOfCartItems);

      getUserCart();

      return data;
    } catch (e) {
      console.log("Error : ", e);
    }
  }

  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: localStorage.getItem("token") } }
      );

      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProducts(data.data.products);
      setcartID(data.data._id);
    } catch (e) {
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setCartProducts([]);
    }
  }

  async function deleteProduct(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token: localStorage.getItem("token") } }
      );

      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProducts(data.data.products);

      return data;
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async function clearCart() {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      });

      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setCartProducts([]);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async function updateProduct(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        { headers: { token: localStorage.getItem("token") } }
      );

      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartProducts(data.data.products);

      return data;
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getUserCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        CartProducts,
        totalCartPrice,
        numOfCartItems,
        setNumOfCartItems,
        setTotalCartPrice,
        setCartProducts,
        deleteProduct,
        updateProduct,
        clearCart,
        getUserCart,
        cartID,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
