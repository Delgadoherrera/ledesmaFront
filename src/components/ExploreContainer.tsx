import { IonContent } from "@ionic/react";
import "./ExploreContainer.css";
import Stock from "./Stock";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  switch (name) {
    case "Catalogos":
      return (
        <IonContent>
          <Stock name={"Catalogos"} />
        </IonContent>
      );
      break;
    case "compras":
      return (
        <IonContent>
          <Stock name={"compras"} />
        </IonContent>
      );

      break;

    case "VentaProductos":
      return (
        <IonContent>
          <Stock name={"VentaProductos"} />
        </IonContent>
      );

      break;
    case "registrarCompraMaterial":
      return (
        <IonContent>
          <Stock name={"registrarCompraMaterial"} />
        </IonContent>
      );

      break;
    case "catalogoCostos":
      return (
        <IonContent>
          <Stock name={"catalogoCostos"} />
        </IonContent>
      );

      break;
      case "registrarCostos":
        return (
          <IonContent>
            <Stock name={"registrarCostos"} />
          </IonContent>
        );
  
        break;
        case "reportCostos":
          return (
            <IonContent>
              <Stock name={"reportCostos"} />
            </IonContent>
          );
    
          break;
    default:
      break;
  }
};


export default ExploreContainer;
