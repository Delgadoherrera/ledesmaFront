import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Productos as Materiales } from "../../interfaces/index";
import { useDispatch } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import { imageValue, refreshThis } from "../../features/dataReducer/dataReducer";
import { IonBreadcrumb, IonIcon, IonToast } from "@ionic/react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
export default function CargaMateriales() {
  const [values, setValues] = useState<Materiales>({
    descripcion: "",
    medida: "",
    unidadMedida: "",
    id: null,
    nombre: "",
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [alertMsg, setAlertMsg] = useState(false);
  const [configAlert, setConfigAlert] = React.useState({
    message: `${values.descripcion} agregado con éxito!`,
  });
  const productService = new ProductServices();
  const dispatch = useDispatch();
  
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    dispatch(imageValue(image || 10));
  };
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
      nombre:"",
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
        const response = await productService.AgregarProducto(data);
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
            <IonBreadcrumb className="imageAddIcon" onClick={() => takePicture()}>
        <IonIcon icon={camera} size="large" />
        Adjuntar imagen
      </IonBreadcrumb>
      <TextField
        label="Nombre"
        variant="outlined"
        value={values.nombre}
        onChange={(e) => setValues({ ...values, nombre: e.target.value })}
        error={!!formErrors.nombre}
        helperText={formErrors.nombre}
      />
      <TextField
        label="Descripción"
        variant="outlined"
        value={values.descripcion}
        onChange={(e) => setValues({ ...values, descripcion: e.target.value })}
        error={!!formErrors.descripcion}
        helperText={formErrors.descripcion}
      />
      <FormControl variant="outlined">
        <InputLabel id="unidadMedida-label">Unidad de medida</InputLabel>
        <Select
          labelId="unidadMedida-label"
          id="unidadMedida"
          value={values.unidadMedida}
          label="Unidad de medida"
          onChange={(e) =>
            setValues({ ...values, unidadMedida: e.target.value })
          }
          error={!!formErrors.unidadMedida}
        >
          <MenuItem value={"Lts"}>Litros</MenuItem>
          <MenuItem value={"Kg"}>Kilogramos</MenuItem>
          <MenuItem value={"Cm"}>Centímetros</MenuItem>
          <MenuItem value={"Mts"}>Metros</MenuItem>
          <MenuItem value={"Uni"}>Unidades</MenuItem>
        </Select>
        <div style={{ color: "red" }}>{formErrors.unidadMedida}</div>
      </FormControl>
      <TextField
        label="Medida"
        variant="outlined"
        value={values.medida}
        onChange={(e) => setValues({ ...values, medida: e.target.value })}
        error={!!formErrors.medida}
        helperText={formErrors.medida}
      />

      <Button variant="contained" color="primary" onClick={handleSend}>
        Enviar
      </Button>
      <Button variant="outlined" color="secondary" onClick={limpiarFormulario}>
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
