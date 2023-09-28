import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import saleSlice from "./SaleSlice";
const rootReducer = combineReducers({
  userReducer,
  saleSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
