import * as React from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales, Costos } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  IonSelect,
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
import { Box, Typography } from "@mui/material";
import { components } from "react-select";
import add from "../../assets/icons/add-circle-svgrepo-com(1).svg";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { InputText } from "primereact/inputtext";
import { Button, DatePicker, Select } from "antd";
import { Input } from "antd";
import moment from "moment";
import { addCircle } from "ionicons/icons";

export default function MultipleSelect() {
  const [materiales, setMateriales] = React.useState<Costos[]>([]);
  const [costos, setCostos] = React.useState<Costos[]>([]);
  const [resetSelects, setResetSelects] = React.useState(false);
  const productService = new ProductServices();
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);
  const [materialValue, setMaterialValue] = React.useState<string>("");
  const [materialQuantity, setMaterialQuantity] = React.useState<string>("");
  const [date, setDate] = React.useState("");
  const [details, setDetails] = React.useState<string>("");
  const [elementCombo, setElementCombo] = React.useState<
    Array<{ material: Costos; precio: string; cantidad: string }>
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
  const [refreshSelect, setRefreshSelect] = React.useState(true);

  React.useEffect(() => {
    productService.ListarCostos().then((data: any) => {
      const filteredData = data.filter(
        (product: any) => product.estado !== "hide"
      );
      console.log("DATACOSTOS", data);
      setCostos(filteredData);
    });
  }, [refresh]);

  console.log("DATEEE", date);
  // Obtener descripciones únicas
  const uniqueDescriptions = [
    ...new Set(costos.map((material) => material.costo)),
  ];

  // Filtrar los materiales con la descripción seleccionada
  const filteredMaterials = costos.filter(
    (material) => material.costo === selectedDescription
  );

  const emptyList = (itemToRemove: any) => {
    setElementCombo([]);
  };
  React.useEffect(() => {
    if (refreshSelect === false) {
      setRefreshSelect(true);
    }
  }, [refreshSelect]);

  const objetoFecha = Date.now();
  const nowDate = new Date(objetoFecha);
  const fechaHoy = nowDate.toLocaleDateString("en-ZA");
  const fechaOriginal = fechaHoy;

  return (
    <div>
      <Box className="RegistrarCostoBox">
        <div className="contentBadgeNav">
          <IonBadge>Registrar costos</IonBadge>
        </div>

        <div className="selectionCombo">
          {refreshSelect === true && (
            <>
              <Select
                options={uniqueDescriptions.map((description) => ({
                  value: description,
                  label: description,
                }))}
                onChange={(selectedOption: any) => {
                  setSelectedDescription(selectedOption);
                  setSelectedMeasure(null);
                }}
                placeholder={"Buscar costos"}
              />
              <Select
                options={filteredMaterials.map((material) => ({
                  value: material.concepto,
                  label: `${material.concepto}`,
                }))}
                onChange={(selectedOption: any) => {
                  setSelectedMeasure(selectedOption);
                }}
                placeholder={"Concepto"}
              />
            </>
          )}
          <div className="inputValor">
            <DatePicker
              onSelect={(e) => {
                const fechaOriginal = new Date(e.$d);
                const año = fechaOriginal.getFullYear();
                const mes = (fechaOriginal.getMonth() + 1)
                  .toString()
                  .padStart(2, "0"); // Agrega un 0 si es necesario
                const dia = fechaOriginal.getDate().toString().padStart(2, "0"); // Agrega un 0 si es necesario
                const fechaFormateada = `${año}-${mes}-${dia}`;
                setDate(fechaFormateada);
              }}
            />
          </div>
          <div className="inputValor">
            <Input
              value={materialQuantity}
              onChange={(e: any) => {
                setMaterialQuantity(e.target.value);
              }}
              placeholder="Detalle"
            />
          </div>

          <div className="inputValor">
            <Input
              type="number"
              placeholder="Valor"
              value={materialValue}
              onChange={(e: any) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 1) {
                  setMaterialValue(value.toString());
                }
              }}
            />
          </div>
          <Button
            onClick={() => {
              if (
                selectedDescription &&
                selectedMeasure &&
                materialValue &&
                materialQuantity
              ) {
                const selectedMaterial: any = costos.find(
                  (material) =>
                    material.costo === selectedDescription &&
                    material.concepto === selectedMeasure
                );

                if (selectedMaterial) {
                  // Verificar si el elemento ya existe en elementCombo
                  const alreadyExists = elementCombo.find((item) => {
                    return (
                      item.material.costo === selectedDescription &&
                      item.material.concepto === selectedMeasure
                    );
                  });

                  const materialWithPriceAndQuantity = {
                    material: selectedMaterial,
                    precio: materialValue,
                    cantidad: materialQuantity, // Agregar la propiedad "cantidad" requerida
                    detalle: selectedDescription, // Agregar la propiedad "detalle" si es necesario
                    fecha: date || fechaHoy, // Agregar la propiedad "fecha" si es necesario
                  };
                  // Agregar el nuevo material con precio y cantidad al arreglo existente en lugar de reemplazarlo
                  setElementCombo([
                    ...elementCombo,
                    materialWithPriceAndQuantity,
                  ]);

                  // Limpiar los selects y los valores de entrada
                  setSelectedDescription(null); // Restablecer selectedDescription a null
                  setSelectedMeasure(null); // Restablecer selectedMeasure a null
                  setMaterialValue("");
                  setMaterialQuantity("");
                  setRefreshSelect(false);
                } else {
                  console.log("No se encontró el elemento seleccionado.");
                }
              }
            }}
          >
            +
          </Button>
        </div>
      </Box>

      <CostosList elementCombo={elementCombo} setElementCombo={emptyList} />
    </div>
  );
}
