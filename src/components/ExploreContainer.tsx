import { IonContent } from "@ionic/react";
import "./ExploreContainer.css";
import Stock from "./Stock";
import { useDispatch, useSelector } from "react-redux";
import { menuSelectOpt } from "../features/dataReducer/dataReducer";



const ExploreContainer: React.FC<any> = () => {
  const name = useSelector(menuSelectOpt)
  console.log('name',name)
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

      case "categoriaProductos":
        return (
          <IonContent>
            <Stock name={"categoriaProductos"} />
          </IonContent>
        );
  
        break;
  

      
    default:
      break;
  }
};

export default ExploreContainer;
