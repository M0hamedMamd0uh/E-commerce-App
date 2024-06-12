import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const addToWishlistFun = createAsyncThunk(
  "wishlist/addToWishlistFun",
  async function (productID) {
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,

      {
        productId: `${productID}`,
      },
      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    return data;
  }
);
export const delFromWishlistFun = createAsyncThunk(
  "wishlist/delFromWishlistFun",
  async function (productID) {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`,

      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    return data;
  }
);
export const getAllWishlistFun = createAsyncThunk(
  "wishlist/getAllWishlistFun",
  async function () {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,

      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    return data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    allWishlist: null,
    allWishlistLoadig: false,
    allWishlistError: false,
    addToWishlistLoading: false,
    delFromWishlistLoading: false,
  },
  extraReducers: function (builder) {
    // add to wishlist

    builder.addCase(addToWishlistFun.fulfilled, function (prevstate, actions) {
      prevstate.addToWishlistLoading = false;
      toast.success(actions.payload.message);
    });

    builder.addCase(addToWishlistFun.rejected, function (prevstate, actions) {
      prevstate.addToWishlistLoading = false;
      toast.error("Failed To Add Product To Wishlist ");
    });

    builder.addCase(addToWishlistFun.pending, function (prevstate, actions) {
      prevstate.addToWishlistLoading = true;
    });

    // remove from wishlist

    builder.addCase(
      delFromWishlistFun.fulfilled,
      function (prevstate, actions) {
        prevstate.delFromWishlistLoading = false;
        toast.success(actions.payload.message);
      }
    );

    builder.addCase(delFromWishlistFun.rejected, function (prevstate, actions) {
      prevstate.delFromWishlistLoading = false;
      toast.error("Failed To Remove Product From Wishlist");
    });

    builder.addCase(delFromWishlistFun.pending, function (prevstate, actions) {
      prevstate.delFromWishlistLoading = true;
    });

    // get all wishlist

    builder.addCase(getAllWishlistFun.fulfilled, function (prevstate, actions) {
      prevstate.allWishlist = actions.payload.data;
      prevstate.allWishlistLoadig = false;
      prevstate.allWishlistError = false;
    });

    builder.addCase(getAllWishlistFun.rejected, function (prevstate, actions) {
      prevstate.allWishlistLoadig = false;
      prevstate.allWishlistError = true;
    });

    builder.addCase(getAllWishlistFun.pending, function (prevstate, actions) {
      prevstate.allWishlistLoadig = true;
      prevstate.allWishlistError = false;
    });
  },
});

export default wishlistSlice.reducer;
