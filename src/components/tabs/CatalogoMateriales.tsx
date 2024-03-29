import { IonButton, IonButtons, IonItem } from "@ionic/react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CatalogoButtons from "../buttonGroups/CatalogoButtons";
import CargaMateriales from "../gestiones/CargaMateriales";
import ProductList from "../simple/ProductList";
import { useState } from "react";
import ComboMateriales from "../gestiones/ComboMateriales";
function FillExample() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Stock disponible");

  const a = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <CatalogoButtons tab={setTab} />
      {tab === "Carga de materiales" && <CargaMateriales />}
      {tab === "Stock disponible" && <ProductList closeModal={a} />}
{/*       {tab === "Combo de materiales" && (
        <>
       <ComboMateriales closeModal={a} />
        </>
      )} */}
    </>
  );
}

export default FillExample;
