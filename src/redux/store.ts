import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import exampleReducer from "./slices/exampleSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  example: exampleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Log the initial state of the store
console.log("Initial state of the store:", store.getState());

export const persistor = persistStore(store);

// Log when persistor is created
persistor.subscribe(() => {
  console.log("Persistor state updated:", persistor.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
