import { IonContent } from "@ionic/react";
import StockNav from "./navMenus/StockNav";
import { useDispatch, useSelector } from "react-redux";
import CargaMateriales from "./gestiones/CargaMateriales";
import { useEffect, useState } from "react";
import CatalogoMateriales from "./tabs/CatalogoMateriales";
import ComprasNav from "./navMenus/ComprasNav";
import ComprasList from "./simple/ComprasList";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [tabSelected, setTabSelected] = useState("catalogo de materiales");

  console.log("namedenames", name);
  useEffect(() => {
    console.log("tab selected", tabSelected);
  }, [tabSelected]);

  const a = (a: any) => {
    console.log("a", a);
  };

  return (
    <>
      {name === "Catalogos" && (
        <>
          {name === "Catalogos" && <StockNav tabSelected={setTabSelected} />}
          {tabSelected === "catalogo de materiales" && <CatalogoMateriales />}
        </>
      )}

      {name === "compras" && (
        <>
          {name === "compras" && <ComprasNav tabSelected={setTabSelected} />}
          {tabSelected === "compras" && <ComprasList closeModal={a} />}
        </>
      )}
      
    </>
  );
};

export default ExploreContainer;
