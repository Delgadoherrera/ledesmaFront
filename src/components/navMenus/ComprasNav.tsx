import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CatButtons from "../buttonGroups/CatalogoButtons";

function ButtonGroup({ tabSelected }: { tabSelected: (value: any) => void }) {
  tabSelected("compras")
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab
        eventKey="catalogo"
        title="Compras"
        onEnter={() => tabSelected("compras")}
      ></Tab>
      {/*   <Tab
        eventKey="Otros"
        title="Otras pestañas"
        onEnter={() => tabSelected("Otras pestañas")}
      ></Tab> */}
    </Tabs>
  );
}

export default ButtonGroup;
