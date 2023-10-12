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
    default:
      break;
  }
};

export default ExploreContainer;
