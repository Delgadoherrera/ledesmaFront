import { IonButton, IonButtons, IonItem } from "@ionic/react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { component } from "../../features/dataReducer/dataReducer";

function FillExample({ tab }: { tab: (value: any) => void; }) {
  const dispatch = useDispatch();
  return (
    <IonItem>
      <IonButtons>
        <IonButton onClick={() => tab("Stock disponible")}>Listado</IonButton>
        <IonButton onClick={() => tab("Carga de materiales")}>
          Carga de materiales
        </IonButton>
      </IonButtons>
    </IonItem>
  );
}

export default FillExample;
