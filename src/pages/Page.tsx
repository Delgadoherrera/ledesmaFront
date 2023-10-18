import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";
import { add, menu } from "ionicons/icons";
import { isOpenMenu, openMenu } from "../features/dataReducer/dataReducer";
import { useDispatch, useSelector } from "react-redux";
const Page: React.FC = () => {
  const open = useSelector((isOpenMenu: any) => isOpenMenu.counter.openMenu);
  const dispatch = useDispatch();
  console.log("OPENMENU", open);
  const { name } = useParams<{ name: string }>();
  return (
    <IonPage>
      <IonFab slot="fixed" vertical="top" horizontal="center">
        <IonFabButton onClick={() => dispatch(openMenu(!open))} color={'white'} size="small">
          <IonIcon icon={menu}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/*             <IonMenuButton menu="first" autoHide={true}>
            </IonMenuButton> */}
          </IonButtons>
          {/*           <IonTitle>{name}</IonTitle>
           */}{" "}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
