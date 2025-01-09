import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import exampleReducer from "./slices/exampleSlice";
import authReducer from "./slices/authSlices";
import hotelReducer from "./slices/hotelSlice"; 
import dropdownReducer from "./slices/dropDownSlice"; 

// Configuration for redux-persist
const persistConfig = {
  key: "root", // the key for the persisted reducer
  storage, // use localStorage
  // Remove blacklist to include hotel slice for persistence
  blacklist: ["hotel"], // <-- Remove this line or comment it out
};

// Combine reducers
const rootReducer = combineReducers({
  example: exampleReducer,
  auth: authReducer,
  hotel: hotelReducer, // hotel slice reducer
  dropdown: dropdownReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Types for TypeScript (if needed)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
