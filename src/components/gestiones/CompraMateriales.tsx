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
    unidades: 0,
  });

  const [valorDolar, setValorDolar] = React.useState(0);
  const productService = new ProductServices();

  console.log("elementelementelement", element);

  const limpiarFormulario = () => {
    return setValues({
      conversion: 0,
      precioPesos: 0,
      medida: "",
      unidades: 0,
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
        className="editCargaMaterialesContainer"
      >
        <TextField
          id="outlined-basic"
          label="Precio en pesos "
          value={values.precioPesos}
          variant="outlined"
          onChange={(e) => {
            const inputValue = parseFloat(e.target.value);
            if (!isNaN(inputValue)) {
              setValues({ ...values, precioPesos: inputValue });
            } else {
              // Puedes manejar la entrada inválida aquí, como mostrar un mensaje de error.
              // Por ejemplo:
              // setValues({ ...values, precioPesos: 0 }); // O algún otro valor predeterminado
            }
          }}
        />

        <>
          <TextField
            id="outlined-basic"
            type="number"
            label={`Unidades`}
            variant="outlined"
            onChange={(e) =>
              setValues({ ...values, unidades: parseInt(e.target.value) })
            }
          />
        </>

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
