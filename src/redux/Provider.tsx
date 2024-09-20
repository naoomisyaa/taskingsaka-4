'use client';

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* PersistGate memastikan state dipulihkan sebelum rendering */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default Providers;
