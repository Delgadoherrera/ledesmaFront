import {
  IonApp,
  IonBadge,
  IonBreadcrumb,
  IonChip,
  IonContent,
  IonLabel,
  IonNote,
  IonRouterOutlet,
  IonSpinner,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import MenuAnt from "./components/MenuAntd";
import ExploreContainer from "./components/Stock";
import { Header } from "antd/es/layout/layout";
import LedesmaLogo from "./assets/icons/e2617862-caa8-4f65-a61c-319d6c474b85.png";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { menuSelectOpt } from "./features/dataReducer/dataReducer";

setupIonicReact();

const App: React.FC = () => {
  const isDarkMode = false; // Siempre en modo claro
  const name = useSelector(menuSelectOpt);

  console.log("namenamename", name);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/*               <img className="LedesmaLogo" src={LedesmaLogo}></img>
       */}
      <IonApp
        className={isDarkMode ? "dark-theme" : "light-theme"}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <IonReactRouter>
          <MenuAnt />

          <IonContent>
            <Header className="headerMain">
              <IonBadge>
                Ledesma Cia {">"}
                {/*     {name} */}
                Trabajadores de la madera{"> "}
                {name}
              </IonBadge>
            </Header>

            <ExploreContainer />
          </IonContent>

          {/*             <Menu />
           */}
          {/*             <IonRouterOutlet id="main">
                         <Route path="/" exact={true}>
                <Redirect to="/page/Catalogos" />
              </Route>
              <Route path="/page/:name" exact={true}>
                <Page />
              </Route> 
            </IonRouterOutlet> */}
        </IonReactRouter>
      </IonApp>
    </LocalizationProvider>
  );
};

export default App;
