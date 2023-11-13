import * as React from "react";
1;
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function CargaMateriales({
  handleClose,
  id,
  element,
}: {
  handleClose: any;
  id: string;
  element: any;
}) {
  const [values, setValues] = React.useState({
    descripcion: element.descripcion,
    medida: element.medida,
    unidadMedida: element.unidadMedida.unidadMedida,
  });
  const productService = new ProductServices();
  const [selectedCategory, setSelectedCategory] = React.useState<any>(
    element.producto.categoria.detalle
  );
  const [categoria, setCategoria] = React.useState<any>(null);
  const [pickCategory, setPickCategory] = React.useState<any>([]);
  const [items, setItems] = React.useState<any>([]);
  const [selectedDescription, setSelectedDescription] = React.useState<any>(
    element.unidadMedida.unidadMedida
  );

  const dispatch = useDispatch();
  const limpiarFormulario = () => {
    return setValues({
      descripcion: "",
      medida: "",
      unidadMedida: "",
    });
  };
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  const [selectedType, setSelectedType] = React.useState<any>(
    element.producto.descripcion
  );
  const [type, setType] = React.useState<any>(null);

  React.useEffect(() => {}, [values]);

  console.log("editProduct:", element);

  const handleSend = async () => {
    console.log("categoria", categoria);
    console.log("categoriaId", element.producto.categoria.id);
    console.log("tipo", type);
    console.log("tipo", element.producto.id);
    console.log("unidadMedida", selectedDescription);
    console.log("medida", values.medida);
    console.log("descripcion", values.descripcion);

    const data = {
      newCategoria: categoria,
      oldCategoria: element.producto.id,
      newTipo: type,
      oldTipo: element.producto.id,
      unidadMedida: selectedDescription,
      medida: values.medida,
      descripcion: values.descripcion,
    };
    try {
      console.log('DATASEND',element.id)
      const response = await productService.EditarProducto(data, element.id);
      console.log("Respuesta de la solicitud:", response);
      handleClose();
      response.status === 200 && limpiarFormulario();
      response.status === 200 && dispatch(refreshThis(true));
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  React.useEffect(() => {
    productService.ListarCategoriaProductos().then((data: any) => {
      setPickCategory(data);
    });
  }, [refresh]);

  React.useEffect(() => {
    productService.ListarItemProducto().then((data: any) => {
      const filteredData = data.filter(
        (product: any) => product.estado !== "hide"
      );
      setItems(filteredData);
    });
  }, [refresh]);
  const uniqueDescriptions = [
    ...new Set(pickCategory.map((material: any) => material)),
  ];
  const uniqueDetails = [...new Set(items.map((material: any) => material))];
  console.log("pick Cat", pickCategory);
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="editCargaMaterialesContainer"
      >
        <Select
          options={uniqueDescriptions.map((description: any) => ({
            value: description.id,
            label: description.detalle,
          }))}
          value={selectedCategory} // Usa el estado para el valor seleccionado
          onChange={(selectedOption: any) => {
            setSelectedCategory(selectedOption);
            setCategoria(uniqueDescriptions[selectedOption - 1]);
          }}
          placeholder={"Categorías"}
        />

        <Select
          value={selectedType}
          onChange={(selectedValue) => {
            setSelectedType(selectedValue);
            uniqueDetails
              .filter((description: any) => {
                description.categoria_id === selectedCategory;
              })

              .map((description: any) =>
                console.log("deski", description.descripcion)
              );
            setType(uniqueDetails[selectedValue - 1]);
          }}
          placeholder="Tipos"
        >
          {uniqueDetails
            .filter(
              (description: any) =>
                description.categoria_id === selectedCategory
            )
            .map((description: any) => (
              <Select.Option key={description.id} value={description.id}>
                {description.descripcion}
              </Select.Option>
            ))}
        </Select>

        <Select
          options={[
            { value: "Lts", label: "Litros" },
            { value: "Kg", label: "Kilogramos" },
            { value: "Cm", label: "Centímetros" },
            { value: "Mts", label: "Metros" },
            { value: "Uni", label: "Unidades" },
            // Agrega más opciones según sea necesario
          ]}
          value={selectedDescription} // Usa el estado para el valor seleccionado
          onChange={(selectedOption: any) => {
            setSelectedDescription(selectedOption);
            console.log(selectedOption);
          }}
          placeholder={"Unidad"}
        />

        <Input
          addonBefore="Medida"
          id="outlined-basic"
          value={values.medida}
          placeholder="Medida"
          onChange={(e) => setValues({ ...values, medida: e.target.value })}
        />

        <TextArea
          id="outlined-basic"
          placeholder="Descripcion"
          value={values.descripcion}
          onChange={(e) =>
            setValues({ ...values, descripcion: e.target.value })
          }
        />

        <Button variant="outlined" onClick={() => handleSend()}>
          Enviar
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => {
            handleClose();
          }}
        >
          Cancelar
        </Button>
      </Box>
    </>
  );
}
