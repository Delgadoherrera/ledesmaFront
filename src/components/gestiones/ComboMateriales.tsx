import * as React from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  IonSelect,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

import ComboList from "../simple/ComboList";
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

export default function MultipleSelect() {
  const [materiales, setMateriales] = React.useState<Materiales[]>([]);
  const [resetSelects, setResetSelects] = React.useState(false);
  const productService = new ProductServices();
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);
  const [materialValue, setMaterialValue] = React.useState<string>("");
  const [materialQuantity, setMaterialQuantity] = React.useState<string>("");
  const [elementCombo, setElementCombo] = React.useState<
    Array<{ material: Materiales; precio: string; cantidad: string }>
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
    productService.ListarMateriales().then((data: Materiales[]) => {
      setMateriales(data);
    });
  }, [refresh]);

  // Obtener descripciones únicas
  const uniqueDescriptions = [
    ...new Set(materiales.map((material) => material.descripcion)),
  ];

  // Filtrar los materiales con la descripción seleccionada
  const filteredMaterials = materiales.filter(
    (material) => material.descripcion === selectedDescription
  );

  // Obtener las medidas únicas para la descripción seleccionada
  const uniqueMeasures = [
    ...new Set(filteredMaterials.map((material) => material.medida)),
  ];
  const unidadMedidaFilter = [
    ...new Set(
      filteredMaterials.map((material) => material.unidadMedida.unidadMedida)
    ),
  ];
  const handleRemoveItem = (itemToRemove: any) => {
    const updatedCombo = elementCombo.filter((item) => item !== itemToRemove);
    setElementCombo(updatedCombo);
  };
  const emptyList = (itemToRemove: any) => {
    setElementCombo([]);
  };
  React.useEffect(() => {
    if (refreshSelect === false) {
      setRefreshSelect(true);
    }
  }, [refreshSelect]);

  console.log("REFRESH SELECTS", refreshSelect);

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
                placeholder={"Buscar materiales"}
              />
              <Select
                options={filteredMaterials.map((material) => ({
                  value: material.medida,
                  label: `${material.medida} ${material.unidadMedida.unidadMedida}`,
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
            <IonBadge>Unidades:</IonBadge>
            <Input
              type="number"
              value={materialQuantity}
              onChange={(e: any) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 1) {
                  setMaterialQuantity(value.toString());
                }
              }}
            />
          </div>
        )}
        {selectedDescription && (
          <div className="inputValor">
            <IonBadge>Precio unidad: $</IonBadge>
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
              const selectedMaterial: any = materiales.find(
                (material) =>
                  material.descripcion === selectedDescription &&
                  material.medida === selectedMeasure
              );

              if (selectedMaterial) {
                // Verificar si el elemento ya existe en elementCombo
                const alreadyExists = elementCombo.find((item) => {
                  return (
                    item.material.descripcion === selectedDescription &&
                    item.material.medida === selectedMeasure
                  );
                });

                if (alreadyExists) {
                  console.log("El elemento ya existe en la lista.");
                } else {
                  const materialWithPriceAndQuantity = {
                    material: selectedMaterial,
                    precio: materialValue,
                    cantidad: materialQuantity,
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

      <ComboList
        elementCombo={elementCombo}
        setElementCombo={emptyList}
      />
    </div>
  );
}
