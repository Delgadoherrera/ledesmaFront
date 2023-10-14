import * as React from "react";
1;
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { ProductServices } from "../../Services/ProductService";

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
    conversion: 0,
    precioPesos: 0,
    medida: "",
    unidadMedida: "",
  });

  const [valorDolar, setValorDolar] = React.useState(0);
  const productService = new ProductServices();

  console.log("elementelementelement", element);

  const limpiarFormulario = () => {
    return setValues({
      conversion: 0,
      precioPesos: 0,
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
          label="Precio en pesos "
          value={values.precioPesos}
          variant="outlined"
          onChange={(e) =>
            setValues({ ...values, precioPesos: parseFloat(e.target.value) })
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

        <Button variant="outlined" onClick={() => handleSend(values)}>
          Enviar
        </Button>
        {/*         <ButtonconsultarDolarBlue
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
