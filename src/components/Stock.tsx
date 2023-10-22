import { IonContent } from "@ionic/react";
import StockNav from "./navMenus/StockNav";
import { useDispatch, useSelector } from "react-redux";
import CargaMateriales from "./gestiones/CargaMateriales";
import { useEffect, useState } from "react";
import CatalogoMateriales from "./tabs/CatalogoMateriales";
import ComprasNav from "./navMenus/ComprasNav";
import ComprasList from "./simple/ComprasList";
import CatalogoProductos from "./tabs/CatalogoProductos";
import ComboMateriales from "./gestiones/ComboMateriales";
import CargaGastos from "./gestiones/CargaGastos";
import RegistrarCostos from "./gestiones/RegistrarCostos";
import ListaReportes from "./simple/ReportesList";
import CatalogoCostosButtons from "./buttonGroups/CatalogoCostosButtons";
import ReporteCostosList from "./simple/ReporteCostosList";
import CargaCategorias from "./gestiones/CargaCategorias";

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
      {name === "VentaProductos" && (
        <>
          {name === "VentaProductos" && <CatalogoProductos />}
          {tabSelected === "VentaProductos" && <CatalogoProductos />}
        </>
      )}
      {name === "registrarCompraMaterial" && (
        <>
          {name === "registrarCompraMaterial" && <ComboMateriales />}
          {tabSelected === "registrarCompraMaterial" && <ComboMateriales />}
        </>
      )}

      {name === "catalogoCostos" && (
        <>
          {name === "catalogoCostos" && (
            <CatalogoCostosButtons tab={setTabSelected} />
          )}
          {name === "catalogoCostos" && <CargaGastos />}
          {name === "catalogoCostos" && <ReporteCostosList />}

          {tabSelected === "catalogoCostos" && <CargaGastos />}
        </>
      )}

      {name === "registrarCostos" && (
        <>
          {name === "registrarCostos" && <RegistrarCostos />}
          {tabSelected === "registrarCostos" && <RegistrarCostos />}
        </>
      )}

      {name === "reportCostos" && (
        <>
          {name === "reportCostos" && <ListaReportes closeModal={a} />}
          {tabSelected === "reportCostos" && <ListaReportes closeModal={a} />}
        </>
      )}

      {name === "categoriaProductos" && (
        <>
          {name === "categoriaProductos" && <CargaCategorias />}
          {tabSelected === "categoriaProductos" && <CargaCategorias />}
        </>
      )}
    </>
  );
};

export default ExploreContainer;
