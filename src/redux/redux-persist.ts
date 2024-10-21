import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // default storage for web
import { persistStore, persistReducer } from "redux-persist";
import exampleReducer from "./slices/exampleSlice"; // your existing example slice

// Configuration for redux-persist
const persistConfig = {
  key: "root", // the key for the persisted reducer
  storage, // use localStorage
};

// Combine reducers if you have more than one
const rootReducer = combineReducers({
  example: exampleReducer, // your slice reducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable check for redux-persist
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Types for TypeScript (if needed)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;