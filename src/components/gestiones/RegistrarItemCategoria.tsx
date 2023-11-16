import * as React from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales, Costos } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Select, Tag } from "antd";
import {
  IonHeader,
  IonSelect,
  IonTitle,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

import CostosList from "../simple/CostosList";
import {
  IonBadge,
  IonBreadcrumb,
  IonButton,
  IonIcon,
  IonNote,
} from "@ionic/react";
import { Typography } from "@mui/material";
import { components } from "react-select";
import add from "../../assets/icons/add-circle-svgrepo-com(1).svg";
import { Button } from "antd";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { InputText } from "primereact/inputtext";
import { DatePicker } from "antd";
import { Input } from "antd";
import CategoriasList from "../simple/CategoriasList";
import { Header } from "antd/es/layout/layout";

export default function MultipleSelect({
  limpiarFormulario,
}: {
  limpiarFormulario: (value: any) => void;
}) {
  const [materiales, setMateriales] = React.useState<any[]>([]);
  const [costos, setCostos] = React.useState<any[]>([]);
  const [resetSelects, setResetSelects] = React.useState(false);
  const productService = new ProductServices();
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);
  const [materialValue, setMaterialValue] = React.useState<string>("");
  const [materialQuantity, setMaterialQuantity] = React.useState<string>("");
  const [date, setDate] = React.useState("");
  const [details, setDetails] = React.useState<string>("");
  const [elementCombo, setElementCombo] = React.useState<
    Array<{ material: any; precio: string; cantidad: string }>
  >([]);
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  const [selectedDescription, setSelectedDescription] = React.useState<
    string | null
  >(null);
  const [selectedMeasure, setSelectedMeasure] = React.useState<string | null>(
    null
  );
  const dispatch = useDispatch();
  const sendCategory = async () => {
    try {
      const data = {
        detalle: selectedMeasure,
        descripcion: materialQuantity,
        categoria: selectedDescription,
      };

      const response = await productService.AgregarItemCategoriaProducto(data);
      setSelectedDescription(null); // Restablecer selectedDescription a null
      setSelectedMeasure(null); // Restablecer selectedMeasure a null
      setMaterialValue("");
      setMaterialQuantity("");
      response.status === 201 && dispatch(refreshThis(true));
      response.status === 201 && setSelectedDescription(null);
    } catch (error) {
      console.error("Error al realiza:", error);
    }
  };

  React.useEffect(() => {
    productService.ListarCategoriaProductos().then((data: any) => {
      const filteredData = data.filter(
        (product: any) => product.estado !== "hide"
      );
      setCostos(filteredData);
    });
  }, [refresh]);

  // Obtener descripciones únicas
  const uniqueDescriptions = [
    ...new Set(costos.map((material) => material.detalle)),
  ];

  // Filtrar los materiales con la descripción seleccionada
  const filteredMaterials = costos.filter(
    (material) => material.costo === selectedDescription
  );

  const emptyList = (itemToRemove: any) => {
    setElementCombo([]);
  };

  return (
    <div className="CargaTipoItemContent">
      <>
        <IonTitle>
          <Tag>Carga tipo de producto</Tag>
        </IonTitle>
        <Select
          options={uniqueDescriptions.map((description) => ({
            value: description,
            label: description,
          }))}
          onChange={(selectedOption: any) => {
            setSelectedDescription(selectedOption);
          }}
          placeholder={"Categoria"}
          className="inputSelect"
          value={selectedDescription}
        />

        {/*           <Select
                options={filteredMaterials.map((material) => ({
                  value: material.concepto,
                  label: `${material.concepto}`,
                }))}
                onChange={(selectedOption: any) => {
                  setSelectedMeasure(selectedOption.value);
                }}
                placeholder={"Concepto"}
              /> */}
        <Input
          placeholder="Tipo de item:"
          onChange={(e: any) => {
            console.log("selectedmeasure", e.target.value);

            setSelectedMeasure(e.target.value);
          }}
          value={selectedMeasure ? selectedMeasure : ""}
        ></Input>
      </>

      <Button onClick={() => sendCategory()}>Cargar tipo de producto</Button>
      <Button
        onClick={() => {
          setSelectedDescription(null); // Restablecer selectedDescription a null
          setSelectedMeasure(null); // Restablecer selectedMeasure a null
          setMaterialValue("");
          setMaterialQuantity("");
        }}
      >
        Limpiar
      </Button>

      <CategoriasList elementCombo={elementCombo} setElementCombo={emptyList} />
    </div>
  );
}
