import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  settings,
  bookmarkOutline,
  heartOutline,
  hammer,
  mailOutline,
  mailSharp,
  body,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  person,
  logoUsd,
  menu,
  chevronForwardCircle,
  globe,
  colorPalette,
  arrowBack,
  add,
} from "ionicons/icons";
import "./Menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usd from "../assets/icons/dolar-svgrepo-com.svg";
import { openMenu } from "../features/dataReducer/dataReducer";
import catalogue from "../assets/icons/catalogue-catalog-svgrepo-com.svg";
import reportCompra from "../assets/icons/register-svgrepo-com.svg";
import calculate from "../assets/icons/calculator-svgrepo-com.svg";
import carpinteria from "../assets/icons/carpenter-svgrepo-com.svg";
import costos from "../assets/icons/cost-per-unit-industry-svgrepo-com.svg";
import cash from "../assets/icons/cash-register-solid-svgrepo-com.svg";
import report from "../assets/icons/report-svgrepo-com.svg";
import BannerInicio from './simple/BannerInicio'

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Categoria de prooductos",
    url: "/page/categoriaProductos",
    iosIcon: logoUsd,
    mdIcon: logoUsd,
  },
  /*   {
    title: "Proveedores",
    url: "/page/Proveedores",
    iosIcon: mailOutline,
    mdIcon: person,
  }, */

  {
    title: "Productos",
    url: "/page/VentaProductos",
    iosIcon: carpinteria,
    mdIcon: carpinteria,
  },
  {
    title: "Catálogo de costos",
    url: "/page/catalogoCostos",
    iosIcon: costos,
    mdIcon: costos,
  },
  {
    title: "Registrar costos",
    url: "/page/registrarCostos",
    iosIcon: cash,
    mdIcon: cash,
  },
  {
    title: "Reporte de costos",
    url: "/page/reportCostos",
    iosIcon: report,
    mdIcon: report,
  },

  {
    title: "Catalogo de materiales",
    url: "/page/Catalogos",
    iosIcon: catalogue,
    mdIcon: catalogue,
  },

  {
    title: "Registrar compra de materiales",
    url: "/page/registrarCompraMaterial",
    iosIcon: calculate,
    mdIcon: calculate,
  },
  {
    title: "Reporte de compras",
    url: "/page/compras",
    iosIcon: reportCompra,
    mdIcon: reportCompra,
  },
  /*   {
    title: "Configuración",
    url: "/page/Configuración",
    iosIcon: settings,
    mdIcon: settings,
  },

  {
    title: "Papelera",
    url: "/page/Papelera",
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  }, */
];

const labels = [,/* "Maria", "Marta", "Cerralima", "Selalima", "Conlamina" */];

const Menu: React.FC = () => {
  const location = useLocation();
  const open = useSelector((isOpenMenu: any) => isOpenMenu.counter.openMenu);
  const dispatch = useDispatch();
  return (

    <>
    <BannerInicio/>
    <IonMenu contentId="main" type="overlay" menuId="first" hidden={open}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>LEDESMA Cia.</IonListHeader>
          {/*           <IonNote>hola@usuario.com</IonNote>
           */}{" "}
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          {/*           <IonListHeader>Próximas entregas:</IonListHeader>
           */}{" "}
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
    </>

};

export default Menu;
