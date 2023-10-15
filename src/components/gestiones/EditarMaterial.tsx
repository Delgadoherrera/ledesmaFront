import * as React from "react";
1;
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import { refreshThis } from "../../features/dataReducer/dataReducer";

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
  const dispatch = useDispatch();
  console.log("elementelementelement", element);
  const limpiarFormulario = () => {
    return setValues({
      descripcion: "",
      medida: "",
      unidadMedida: "",
    });
  };
  React.useEffect(() => {
    console.log("values", values);
  }, [values]);

  const handleSend = async (data: any) => {
    console.log("sendEdit", "data", data, "id", id);
    try {
      const response = await productService.editarMaterial(data, id);
      console.log("Respuesta de la solicitud:", response);
      handleClose();
      response.status === 200 && limpiarFormulario();
      response.status === 200 && dispatch(refreshThis(true))
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <>
      <b> Carga de materiales</b>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="CargaMaterialesContainer"
      >
        <TextField
          id="outlined-basic"
          label="Descripcion"
          value={values.descripcion}
          variant="outlined"
          onChange={(e) =>
            setValues({ ...values, descripcion: e.target.value })
          }
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.unidadMedida}
          onSelect={() => console.log("seleccionado ")}
          label="Age"
          onChange={(e) =>
            setValues({ ...values, unidadMedida: e.target.value })
          }
        >
          <MenuItem value={"Lts"}>Litros</MenuItem>
          <MenuItem value={"Kg"}>Kg</MenuItem>
          <MenuItem value={"Cm"}>Cm</MenuItem>
          <MenuItem value={"Mts"}>Mts</MenuItem>
        </Select>

        {values.unidadMedida === "Mts" && (
          <>
            <TextField
              id="outlined-basic"
              label="Medida"
              variant="outlined"
              value={values.medida}
              onChange={(e) => setValues({ ...values, medida: e.target.value })}
            />
          </>
        )}

        {values.unidadMedida === "Cm" && (
          <>
            <TextField
              id="outlined-basic"
              label="Medida"
              variant="outlined"
              value={values.medida}
              onChange={(e) => setValues({ ...values, medida: e.target.value })}
            />
          </>
        )}

        {values.unidadMedida === "Lts" && (
          <>
            <TextField
              id="outlined-basic"
              label="Medida"
              variant="outlined"
              value={values.medida}
              onChange={(e) => setValues({ ...values, medida: e.target.value })}
            />
          </>
        )}

        {values.unidadMedida === "Kg" && (
          <>
            <TextField
              id="outlined-basic"
              label="Medida"
              variant="outlined"
              value={values.medida}
              onChange={(e) => setValues({ ...values, medida: e.target.value })}
            />
          </>
        )}

        <Button variant="outlined" onClick={() => handleSend(values)}>
          Enviar
        </Button>
        {/*         <Button
          variant="outlined"
          onClick={(e) => {
            limpiarFormulario();
          }}
        >
          Limpiar
        </Button> */}
      </Box>
    </>
  );
}
