import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CatButtons from "../buttonGroups/CatalogoButtons";

function ButtonGroup({ tabSelected }: { tabSelected: (value: any) => void }) {
  tabSelected("catalogo de materiales");

  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab
        eventKey="catalogo"
        title="Catálogo de materiales"
        onEnter={() => tabSelected("catalogo de materiales")}
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
