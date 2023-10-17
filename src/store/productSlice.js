import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
};

export const getProducts = createAsyncThunk("products/get", async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const result = await data.json();
  return result;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = StatusCode.IDLE;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = StatusCode.ERROR;
      });
  },
});

// // export function getProducts() {
// //   return async function getProductsThunk(dispatch, getState) {
// //     try {
// //       const data = await fetch("https://fakestoreapi.com/products");
// //       const result = await data.json();
// //       dispatch(fetchProducts(result));
// //     } catch (error) {
// //       console.error("Error fetching products:", error);
// //     }
// //   };
// // }

export default productSlice.reducer;
