// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import exampleReducer from "./slices/exampleSlice";
import authReducer from "./slices/authSlices";
import hotelReducer from "./slices/hotelSlice"; 
import dropdownReducer from "./slices/dropDownSlice"; 

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  example: exampleReducer,
  auth: authReducer,
  hotel: hotelReducer, 
  dropdown: dropdownReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
