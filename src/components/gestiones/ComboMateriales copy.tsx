import * as React from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales } from "../../interfaces";
import { useSelector } from "react-redux";
import Select from "react-select";
import ComboList from "../simple/ComboList";
import axios from "axios";
import { IonButton } from "@ionic/react";

export default function MultipleSelect() {
  const [materiales, setMateriales] = React.useState<Materiales[]>([]);
  const [selectedDescription, setSelectedDescription] = React.useState<
    string | null
  >(null);
  const [selectedMeasure, setSelectedMeasure] = React.useState<string | null>(
    null
  );
  const productService = new ProductServices();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  const [elementCombo, setElementCombo] = React.useState<Materiales[]>([]);
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);

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
  console.log("unidadMedidaFilter", unidadMedidaFilter);

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
              options={uniqueMeasures.map((measure) => ({
                value: measure,
                label: measure,
              }))}
              onChange={(selectedOption: any) => {
                setSelectedMeasure(selectedOption.value);
              }}
              placeholder={"Selecciona la medida"}
            />
          </div>
        )}
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
        <IonButton
          onClick={() => {
            if (selectedDescription && selectedMeasure) {
              const selectedMaterial: any = materiales.find(
                (material) =>
                  material.descripcion === selectedDescription &&
                  material.medida === selectedMeasure
              );

              if (selectedMaterial) {
                // Agregar el nuevo material al arreglo existente en lugar de reemplazarlo
                setElementCombo([...elementCombo, selectedMaterial]);
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
