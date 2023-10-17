import * as React from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales } from "../../interfaces";
import { useSelector } from "react-redux";
import Select from "react-select";
import ComboList from "../simple/ComboList";
import { IonButton } from "@ionic/react";
import { Input } from "@mui/material";
import { components } from "react-select";

export default function MultipleSelect() {
  const [materiales, setMateriales] = React.useState<Materiales[]>([]);

  const productService = new ProductServices();
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);
  const [materialValue, setMaterialValue] = React.useState<string>("");
  const [elementCombo, setElementCombo] = React.useState<
    Array<{ material: Materiales; precio: string }>
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
  console.log("elementCombo", elementCombo);

  React.useEffect(() => {
    productService.ListarProductos().then((data: Materiales[]) => {
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

  return (
    <div>
      <div className="comboBox">
        <Select
          options={uniqueDescriptions.map((description) => ({
            value: description,
            label: description,
          }))}
          onChange={(selectedOption: any) => {
            setSelectedDescription(selectedOption.value);
            setSelectedMeasure(null);
          }}
          placeholder={"Buscar elementos"}
        />
        {selectedDescription && (
          <div>
            <Select
              options={unidadMedidaFilter.map((measure) => ({
                value: measure,
                label: measure,
              }))}
              onChange={(selectedOption: any) => {
                setSelectedMeasure(selectedOption.value);
                setSelectedUnit(
                  filteredMaterials.find(
                    (material) => material.medida === selectedOption.value
                  )?.unidad_medida
                );
              }}
              placeholder={"Unidad de medida"}
              value={unidadMedidaFilter.map((measure) => ({
                value: measure,
                label: measure,
              }))}
            />
          </div>
        )}
        {selectedDescription && (
          <div>
            <Select
              options={uniqueMeasures.map((measure) => ({
                value: measure,
                label: measure,
              }))}
              onChange={(selectedOption: any) => {
                setSelectedMeasure(selectedOption.value);
              }}
              placeholder={"Selecciona la medida"}
              noOptionsMessage="asd"
            />
          </div>
        )}

        {selectedDescription && (
          <div className="inputValor">
            $
            <Input
              type="number"
              value={materialValue}
              onChange={(e: any) => setMaterialValue(e.target.value!)}
            />
          </div>
        )}
        <IonButton
          onClick={() => {
            if (selectedDescription && selectedMeasure && materialValue) {
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
                  const materialWithPrice = {
                    material: selectedMaterial,
                    precio: materialValue,
                  };

                  // Agregar el nuevo material con precio al arreglo existente en lugar de reemplazarlo
                  setElementCombo([...elementCombo, materialWithPrice]);

                  // Limpiar los select y el valor de entrada
                  setSelectedDescription(null);
                  setSelectedMeasure(null);
                  setMaterialValue("");
                }
              } else {
                console.log("No se encontró el elemento seleccionado.");
              }
            }
          }}
        >
          +
        </IonButton>
      </div>

      <ComboList
        elementCombo={elementCombo}
        setElementCombo={setMateriales} // Puedes implementarlo según tus necesidades
      />
    </div>
  );
}
