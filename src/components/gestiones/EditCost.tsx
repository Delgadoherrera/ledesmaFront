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
    costo: element.costo,
    concepto: element.concepto,
  });
  const productService = new ProductServices();
  const dispatch = useDispatch();
  const limpiarFormulario = () => {
    return setValues({
      costo: "",
      concepto: "",
    });
  };
  React.useEffect(() => {
    console.log("values", values);
  }, [values]);

  const handleSend = async (data: any) => {
    try {
      const response = await productService.EditarCosto(data, id);
      console.log("Respuesta de la solicitud:", response);
      handleClose();
      response.status === 200 && limpiarFormulario();
      response.status === 200 && dispatch(refreshThis(true));
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
        className="editCargaMaterialesContainer"
      >
        <TextField
          id="outlined-basic"
          label="costo"
          value={values.costo}
          variant="outlined"
          onChange={(e) => setValues({ ...values, costo: e.target.value })}
        />

        <TextField
          id="outlined-basic"
          label="concepto"
          value={values.concepto}
          variant="outlined"
          onChange={(e) => setValues({ ...values, concepto: e.target.value })}
        />

        <Button variant="outlined" onClick={() => handleSend(values)}>
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
