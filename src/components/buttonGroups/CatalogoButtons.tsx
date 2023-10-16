import { IonButton, IonButtons, IonItem } from "@ionic/react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";

function FillExample({ tab }: { tab: (value: any) => void }) {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Stock disponible");

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
    tab(tabName);
  };

  return (
    <IonItem>
      <IonButtons>
        <IonButton
          className={selectedTab === "Stock disponible" ? "selectedTab" : ""}
          onClick={() => handleTabClick("Stock disponible")}
        >
          Listado de materiales
        </IonButton>
        <IonButton
          className={selectedTab === "Carga de materiales" ? "selectedTab" : ""}
          onClick={() => handleTabClick("Carga de materiales")}
        >
          Carga de materiales
        </IonButton>
        <IonButton
          className={selectedTab === "Combo de materiales" ? "selectedTab" : ""}
          onClick={() => handleTabClick("Combo de materiales")}
        >
          Combo de materiales
        </IonButton>
      </IonButtons>
    </IonItem>
  );
}

export default FillExample;
