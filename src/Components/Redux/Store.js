import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
  },
});
