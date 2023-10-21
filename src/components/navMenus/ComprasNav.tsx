import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CatButtons from "../buttonGroups/CatalogoButtons";
import { useIonViewWillEnter } from "@ionic/react";

function ButtonGroup({ tabSelected }: { tabSelected: (value: any) => void }) {
  useIonViewWillEnter(()=> tabSelected('compras'))

  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
{/*       <Tab
        eventKey="catalogo"
        title="Compras"
        onEnter={() => tabSelected("compras")}
      ></Tab> */}
      {/*       <Tab
        eventKey="Resumenes"
        title="Dashboard"
        onEnter={() => tabSelected("Dashboard")}
      ></Tab> */}
    </Tabs>
  );
}

export default ButtonGroup;
