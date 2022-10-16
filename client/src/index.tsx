import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Store from "./store/store";

interface State {
  store: Store;
}

const store = new Store();

export const ContextStore = createContext<State>({
  store,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextStore.Provider value={{ store }}>
      <App />
    </ContextStore.Provider>
  </React.StrictMode>
);
