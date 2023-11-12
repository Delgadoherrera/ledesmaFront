import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Materiales } from "../../interfaces/index";
import { useDispatch } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { IonToast } from "@ionic/react";
import { Button, Input, Select } from "antd";
export default function CargaMateriales() {
  const [values, setValues] = useState<Materiales>({
    descripcion: "",
    medida: "",
    unidadMedida: "",
    id: null,
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

    if (!values.descripcion) {
      errors.descripcion = "La descripción es requerida.";
    }

    if (!values.unidadMedida) {
      errors.unidadMedida = "La unidad de medida es requerida.";
    }

    if (!values.medida) {
      errors.medida = "La medida es requerida.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const limpiarFormulario = () => {
    setValues({
      descripcion: "",
      medida: "",
      unidadMedida: "",
      id: null,
    });
    setFormErrors({});
  };

  const handleSend = async () => {
    const data = {
      descripcion: values.descripcion,
      medida: values.medida,
      unidadMedida: values.unidadMedida,
    };
    if (validateForm()) {
      try {
        const response = await productService.AgregarMaterial(data);
        console.log("Respuesta de la solicitud:", response);
        response.status === 201 &&
          setValues({
            descripcion: "",
            medida: "",
            unidadMedida: "",
            id: null,
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
        placeholder="Descripción"
        value={values.descripcion}
        onChange={(e) => setValues({ ...values, descripcion: e.target.value })}
      />
      <Select
        options={[
          { value: "Lts", label: "Litros" },
          { value: "Kg", label: "Kilogramos" },
          { value: "Cm", label: "Centímetros" },
          { value: "Mts", label: "Metros" },
          { value: "Uni", label: "Unidades" },
          // Agrega más opciones según sea necesario
        ]}
        onChange={(e) => setValues({ ...values, unidadMedida: e })}
        placeholder={"Unidad de medida"}
      />
      <Input
        placeholder="Medida"
        value={values.medida}
        onChange={(e) => setValues({ ...values, medida: e.target.value })}
      />

      <Button color="primary" onClick={handleSend}>
        Enviar
      </Button>
      <Button color="secondary" onClick={limpiarFormulario}>
        Limpiar
      </Button>
      {alertMsg && (
        <IonToast
          isOpen={alertMsg}
          message={configAlert.message}
          onDidDismiss={() => setAlertMsg(false)}
          duration={5000}
        ></IonToast>
      )}
    </Box>
  );
}
