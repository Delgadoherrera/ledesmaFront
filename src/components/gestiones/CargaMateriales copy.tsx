import * as React from "react";
1;
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { ButtonBase } from "@mui/material";
import { IonBreadcrumb, IonHeader, IonItem } from "@ionic/react";
import { ProductServices } from "../../Services/ProductService";

export default function CargaMateriales() {
  const [values, setValues] = React.useState({
    descripcion: "",
    medida: "",
    unidadMedida: "",
  });
  const productService = new ProductServices();

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
    try {
      const response = await productService.AgregarProducto(data);
      console.log("Respuesta de la solicitud:", response);
      response.status === 200 && limpiarFormulario();
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
          variant="outlined"
          onChange={(e) =>
            setValues({ ...values, descripcion: e.target.value })
          }
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.unidadMedida}
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
              onChange={(e) => setValues({ ...values, medida: e.target.value })}
            />
          </>
        )}
    
      </Box>
      <div>
          <Button variant="outlined" onClick={() => handleSend(values)}>
            Enviar
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => {
              limpiarFormulario();
            }}
          >
            Cancelar
          </Button>
        </div>
    </>
  );
}
