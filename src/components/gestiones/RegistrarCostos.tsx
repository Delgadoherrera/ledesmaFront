import * as React from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales, Costos } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
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
import { Input, Typography } from "@mui/material";
import { components } from "react-select";
import add from "../../assets/icons/add-circle-svgrepo-com(1).svg";
import { Button } from "react-bootstrap";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { InputText } from "primereact/inputtext";

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
      setCostos(data);
    });
  }, [refresh]);

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

 

  return (
    <div>
      <div className="comboBox">
        <div className="selectionCombo">
          {refreshSelect === true && (
            <>
              <Select
                options={uniqueDescriptions.map((description) => ({
                  value: description,
                  label: description,
                }))}
                onChange={(selectedOption: any) => {
                  setSelectedDescription(selectedOption.value);
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
                  setSelectedMeasure(selectedOption.value);
                }}
                placeholder={"Medida"}
              />
            </>
          )}
        </div>

        {selectedDescription && (
          <div className="inputValor">
            <IonBadge>Detalles:</IonBadge>
            <InputText
              value={materialQuantity}
              onChange={(e: any) => {
                setMaterialQuantity(e.target.value);
              }}
            />
          </div>
        )}
        {selectedDescription && (
          <div className="inputValor">
            <IonBadge>Fecha:</IonBadge>
            <InputText
              type="date"
              value={date}
              onChange={(e: any) => {
                setDate(e.target.value);
              }}
            />
          </div>
        )}
        {selectedDescription && (
          <div className="inputValor">
            <IonBadge>Valor: $</IonBadge>
            <Input
              type="number"
              value={materialValue}
              onChange={(e: any) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 1) {
                  setMaterialValue(value.toString());
                }
              }}
            />
          </div>
        )}
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

                if (alreadyExists) {
                  console.log("El elemento ya existe en la lista.");
                } else {
                  const materialWithPriceAndQuantity = {
                    material: selectedMaterial,
                    precio: materialValue,
                    cantidad: materialQuantity, // Agregar la propiedad "cantidad" requerida
                    detalle: selectedDescription, // Agregar la propiedad "detalle" si es necesario
                    fecha: date, // Agregar la propiedad "fecha" si es necesario
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
                }
              } else {
                console.log("No se encontró el elemento seleccionado.");
              }
            }
          }}
        >
          +
        </Button>
      </div>

      <CostosList elementCombo={elementCombo} setElementCombo={emptyList} />
    </div>
  );
}
