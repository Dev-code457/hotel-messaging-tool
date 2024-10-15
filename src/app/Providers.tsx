"use client";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/redux-persist";
import { store } from "@/redux/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
