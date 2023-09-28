import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SaleService from "../services/SaleService";
import Sale from "../types/SaleTypes";

type SaleState = {
  sales: Sale[];
  currentSale: Sale;
  isLoading: boolean;
};

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async function () {
    const response = await SaleService.fetchSales();
    return response.data;
  }
);

export const addSale = createAsyncThunk(
  "sales/addSale",
  async function (sale: Sale) {
    const response = await SaleService.addSale(sale);
    return response.data;
  }
);

export const updateSale = createAsyncThunk(
  "sales/editSale",
  async function (sale: Sale) {
    const response = await SaleService.updateSale(sale);
    return response.data;
  }
);

export const deleteSale = createAsyncThunk(
  "sales/deleteSale",
  async function (saleId: string) {
    const response = await SaleService.deleteSale(saleId);
    return response.data;
  }
);

export const acceptSale = createAsyncThunk(
  "sales/acceptSale",
  async function (saleId: string) {
    const response = await SaleService.acceptSale(saleId);
    return response.data;
  }
);

export const declineSale = createAsyncThunk(
  "sales/declineSale",
  async function (saleId: string) {
    const response = await SaleService.declineSale(saleId);
    return response.data;
  }
);

const initialState: SaleState = {
  currentSale: {} as Sale,
  sales: [] as Sale[],
  isLoading: false,
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    setCurrentSale(state, action) {
      state.currentSale = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSales.fulfilled, (state, action) => {
      state.sales = action.payload.sales;
      state.isLoading = false;
    });
    builder.addCase(fetchSales.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addSale.fulfilled, (state, action) => {
      state.sales.push(action.payload.sale);
    });
    builder.addCase(deleteSale.fulfilled, (state, action) => {
      state.sales = state.sales.filter(
        (sale) => sale._id !== action.payload.saleId && sale
      );
    });
    builder.addCase(updateSale.fulfilled, (state, action) => {
      state.sales = state.sales.filter(
        (sale) => sale._id !== action.payload.sale._id
      );
      state.sales.push(action.payload.sale);
    });
    builder.addCase(acceptSale.fulfilled, (state, action) => {
      state.sales = state.sales.filter((sale) =>
        sale._id === action.payload.saleId
          ? { ...sale, status: "accepted" }
          : sale
      );
    });
    builder.addCase(declineSale.fulfilled, (state, action) => {
      state.sales = state.sales.filter(
        (sale) =>
          sale._id === action.payload.saleId && { ...sale, status: "declined" }
      );
    });
  },
});

export const { setCurrentSale } = saleSlice.actions;
export default saleSlice.reducer;
