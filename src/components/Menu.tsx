import {
  IonContent,
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
} from "ionicons/icons";
import "./Menu.css";
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  /*  {
    title: "Cashflow",
    url: "/page/Cashflow",
    iosIcon: logoUsd,
    mdIcon: logoUsd,
  },
  {
    title: "Proveedores",
    url: "/page/Proveedores",
    iosIcon: mailOutline,
    mdIcon: person,
  },
  {
    title: "Clientes",
    url: "/page/Clientes",
    iosIcon: body,
    mdIcon: body,
  }, */
  {
    title: "Catalogos de materiales",
    url: "/page/Catalogos",
    iosIcon: hammer,
    mdIcon: hammer,
  },
  {
    title: "Reporte de compras",
    url: "/page/compras",
    iosIcon: logoUsd,
    mdIcon: logoUsd,
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

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>LEDESMA Cia.</IonListHeader>
          <IonNote>hola@usuario.com</IonNote>
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
};

export default Menu;
