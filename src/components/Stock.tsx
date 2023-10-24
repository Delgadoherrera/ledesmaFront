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
import { menuSelectOpt } from "../features/dataReducer/dataReducer";
import CargarProductos from "./gestiones/CargaProductos";
import CategoriasList from "./simple/ProductList";
import VentaProductList from "./simple/VentaProductList";
const ExploreContainer: React.FC<any> = () => {
  const name = useSelector(menuSelectOpt);
  const [tabSelected, setTabSelected] = useState("");

  console.log("namedenames", name);
  useEffect(() => {
    console.log("tab selected", tabSelected);
  }, [tabSelected, name]);

  const a = (a: any) => {
    console.log("a", a);
  };

  return (
    <>
      {name === "Cargar materiales" && <CatalogoMateriales />}

      {name === "Compra de materiales" && <ComboMateriales />}

      {name === "Alta producto" && <CargarProductos />}

      {name === "Reporte de compras" && (
        <>
          <ComprasNav tabSelected={a} />
          <ComprasList closeModal={a} />
        </>
      )}

      {name === "Cargar costos" && (
        <>
          <CatalogoCostosButtons tab={a} />
          <CargaGastos />
          <ReporteCostosList closeModal={a} />
        </>
      )}

      {name === "Registrar costos" && <RegistrarCostos />}

      {name === "Reporte de costos" && <ListaReportes closeModal={a} />}

      {name === "Categorias y tipos" && <CargaCategorias />}

      {name === "Reporte de productos" && <VentaProductList closeModal={a} />}
    </>
  );
};

export default ExploreContainer;
