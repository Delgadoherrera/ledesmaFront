import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Input } from "antd";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Costos } from "../../interfaces/index";
import { useDispatch } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { IonBadge, IonToast } from "@ionic/react";
export default function CargaCostos() {
  const [values, setValues] = useState<Costos>({
    idCostoItem: 0,
    costo: "",
    id: 0,
    concepto: "",
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

    if (!values.costo) {
      errors.descripcion = "El costo es requerido.";
    }

    if (!values.concepto) {
      errors.concepto = "El concepto es requerido.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const limpiarFormulario = () => {
    setValues({
      id: 0,
      idCostoItem: null,
      costo: "",
      concepto: "",
    });
    setFormErrors({});
  };

  const handleSend = async () => {
    const data = {
      costo: values.costo,
      concepto: values.concepto,
    };
    if (validateForm()) {
      try {
        const response = await productService.AgregarGasto(data);
        console.log("Respuesta de la solicitud:", response);
        response.status === 201 &&
          setValues({
            id: 0,
            idCostoItem: null,
            costo: "",
            concepto: "",
          });
        dispatch(refreshThis(true));
        response.status === 201
          ? setConfigAlert({
              message: ` ${data.concepto} agregado con exito`,
            })
          : null;
        response.status === 201 && setAlertMsg(true);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  return (
    <div className="cargarCostosContainer">
      <IonBadge> Cargar costos</IonBadge>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="CargaMaterialesContainer"
      >
        <Input
          placeholder="Costo"
          value={values.costo}
          onChange={(e) => setValues({ ...values, costo: e.target.value })}
        />
        <Input
          placeholder="Concepto"
          value={values.concepto}
          onChange={(e) => setValues({ ...values, concepto: e.target.value })}
        />

        <Button onClick={handleSend}>Enviar</Button>
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
    </div>
  );
}
