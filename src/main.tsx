import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./sass/index.scss";
import { Provider } from "react-redux";
import store from "./store/appStore";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import esES from "antd/lib/locale/es_ES";
import { ConfigProvider } from "antd";

const container = document.getElementById("root");
const root = createRoot(container!);
defineCustomElements(window);

root.render(
  <Provider store={store}>
    <PrimeReactProvider>
      <ConfigProvider locale={esES}>
        <App />
      </ConfigProvider>
    </PrimeReactProvider>
  </Provider>
);
