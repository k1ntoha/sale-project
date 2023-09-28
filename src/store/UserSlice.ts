import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import AuthUser from "../types/UserTypes";

interface UserState {
  authUser: AuthUser;
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: UserState = {
  authUser: {
    id: "",
    email: "",
    password: "",
    savedSales: [],
    createdSales: [],
  },
  isLoading: false,
  isAuth: false,
};

export const login = createAsyncThunk(
  "users/login",
  async function (user: { email: string; password: string }) {
    const response = await AuthService.login(user.email, user.password); // где locaalStorage.setItem ?
    return response.data;
  }
);

export const registration = createAsyncThunk(
  "users/registration",
  async function (user: { email: string; password: string }) {
    const response = await AuthService.registration(user.email, user.password);
    return response.data;
  }
);

export const logout = createAsyncThunk("users/logout", async function () {
  const response = await AuthService.logout();
});

export const checkAuth = createAsyncThunk("users/checkAuth", async function () {
  const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
    withCredentials: true,
  });
  return response.data;
});

export const deleteSale = createAsyncThunk(
  "users/deleteSale",
  async function (currentUserAndSale: { saleId: string; userId: string }) {
    const response = await UserService.deleteSale(currentUserAndSale);
    return response.data;
  }
);

export const toggleSave = createAsyncThunk(
  "users/toggleSave",
  async function (saleId: string) {
    const response = await UserService.toggleSave(saleId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createSale(state, action) {
      state.authUser.createdSales.push(action.payload.sale._id);
    },
    removeSale(state, action) {
      state.authUser.createdSales.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authUser = action.payload.user;
      localStorage.setItem("token", action.payload.accessToken);
      state.isAuth = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.authUser = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
    });

    builder.addCase(checkAuth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.authUser = action.payload.user;
      state.isAuth = true;
    });

    builder.addCase(toggleSave.fulfilled, (state, action) => {
      state.authUser.savedSales.includes(action.payload.saleId)
        ? state.authUser.savedSales.splice(
            state.authUser.savedSales.indexOf(act.prototype.salId),
            1
          )
        : state.authUser.savedSales.push(action.payload.saleId);
    });

    builder.addCase(deleteSale.fulfilled, (state, action) => {
      state.authUser.createdSales.filter(
        (saleId) => saleId !== action.payload.currentUserAndSale.saleId
      );
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
      state.authUser = {
        id: "",
        email: "",
        password: "",
        savedSales: [],
        createdSales: [],
      };
    });
  },
});

export const { createSale, removeSale } = userSlice.actions;
export default userSlice.reducer;
