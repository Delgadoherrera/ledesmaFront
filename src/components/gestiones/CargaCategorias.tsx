import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { IonToast } from "@ionic/react";
import RegistrarItemCategoria from "../gestiones/RegistrarItemCategoria";
export default function Cargadetalles() {
  const [values, setValues] = useState<any>({
    detalle: "",
    descripcion: "",
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [alertMsg, setAlertMsg] = useState(false);
  const [configAlert, setConfigAlert] = React.useState({
    message: `${values.descripcion} agregado con éxito!`,
  });
  const productService = new ProductServices();
  const dispatch = useDispatch();
  const validateForm = () => {
    const errors: any = {};

    if (!values.detalle) {
      errors.descripcion = "La categoria es requerida.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const limpiarFormulario = () => {
    setValues({
      detalle: "",
      descripcion: "",
    });
    setFormErrors({});
  };

  const handleSend = async () => {
    const data = {
      detalle: values.detalle,
      descripcion: values.descripcion,
    };
    if (validateForm()) {
      try {
        const response = await productService.AgregarCategoriaProducto(data);
        console.log("Respuesta de la solicitud:", response);
        response.status === 201 &&
          setValues({
            detalle: "",
            descripcion: "",
          });
        dispatch(refreshThis(true));
        response.status === 201
          ? setConfigAlert({
              message: ` ${data.descripcion} agregado con exito`,
            })
          : null;
        response.status === 201 && setAlertMsg(true);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  return (
    <>
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
          label="Categoria de producto"
          variant="outlined"
          value={values.detalle}
          onChange={(e) => setValues({ ...values, detalle: e.target.value })}
          error={!!formErrors.detalle}
          helperText={formErrors.detalle}
        />
        {/*     <TextField
          label="Tipo de producto"
          variant="outlined"
          value={values.descripcion}
          onChange={(e) =>
            setValues({ ...values, descripcion: e.target.value })
          }
          error={!!formErrors.descripcion}
          helperText={formErrors.descripcion}
        />
 */}
        <Button onClick={handleSend}>Cargar categoria</Button>
        <Button onClick={limpiarFormulario}>Limpiar</Button>
        {alertMsg && (
          <IonToast
            isOpen={alertMsg}
            message={configAlert.message}
            onDidDismiss={() => setAlertMsg(false)}
            duration={5000}
          ></IonToast>
        )}
      </Box>
      <RegistrarItemCategoria />
    </>
  );
}
