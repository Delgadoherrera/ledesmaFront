import * as React from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales } from "../../interfaces";
import { useSelector } from "react-redux";
import Select from "react-select"; // Importa React-Select
import ComboList from "../simple/ComboList";
import axios from "axios";

export default function MultipleSelect() {
  const [materiales, setMateriales] = React.useState<Materiales[]>([]); // Inicializado como un array vacío
  const [selectedMaterials, setSelectedMaterials] = React.useState<
    Materiales[]
  >([]);
  const [values, setValues] = React.useState({
    conversion: 0,
    precioPesos: 0,
    medida: "",
    unidades: 0,
  });

  const productService = new ProductServices();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  const materialResponse = new ProductServices();
  const options = materiales.map((material) => ({
    value: material.id, // Utiliza un identificador único
    label:
      material.descripcion +
      " " +
      (material.medida + material.unidadMedida.unidadMedida),
    material: material, // Almacena el objeto completo
    unidadMedida: material.unidadMedida.unidadMedida,
  }));

  React.useEffect(() => {
    materialResponse.ListarProductos().then((data) => {
      setMateriales(data);
      console.log("data", data);
    });
  }, [refresh]);
  const handleMaterialSelect = (selectedOption: any) => {
    console.log("handleMaterialSelect called with:", selectedOption);

    if (selectedOption) {
      const selectedMaterials = selectedOption.map(
        (option: any) => option.material
      );
      setSelectedMaterials(selectedMaterials);
    }
  };

  /*   const handleSend = async (data: any) => {
    console.log("sendEdit", "data", data, "id", id);
    try {
      const response = await axios.get(
        "https://api.bluelytics.com.ar/v2/latest"
      );
      const dolares = response.data;
      setValorDolar(dolares.blue.value_avg);
      const val = values.precioPesos / dolares.blue.value_avg;

      const datos = {
        conversion: val,
        precioPesos: values.precioPesos,
        medida: values.medida,
        unidades: values.unidades,
        medidaId: element.unidadMedida.id,
      };
      setValues({ ...values, conversion: val });
      try {
        const response = await productService.comprarMaterial(datos, id);
        console.log("Respuestasolicitud:", response);
        handleClose();
        response.status === 200 && limpiarFormulario();
      } catch (error) {
        console.error("Error al realiza:", error);
      }
    } catch (error) {
      console.error("Error al consultar Dólar Blue:", error);
    }
  };   */

  return (
    <div>
      <Select
        isMulti
        options={options}
        onChange={handleMaterialSelect}
        placeholder={"Buscar elementos"}
      />
      <ComboList
        elementCombo={selectedMaterials}
        setElementCombo={handleMaterialSelect}
      ></ComboList>
    </div>
  );
}
