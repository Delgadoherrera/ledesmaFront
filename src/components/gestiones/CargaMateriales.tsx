import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Materiales } from "../../interfaces/index";

import { ProductServices } from "../../Services/ProductService";

export default function CargaMateriales() {
  const [values, setValues] = useState<Materiales>({
    descripcion: "",
    medida: "",
    unidadMedida: "",
    id: 0,
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const productService = new ProductServices();

  const validateForm = () => {
    const errors: any = {};

    if (!values.descripcion) {
      errors.descripcion = "La descripción es requerida.";
    }

    if (!values.unidadMedida) {
      errors.unidadMedida = "La unidad de medida es requerida.";
    }

    if (values.unidadMedida === "Mts" && !values.medida) {
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
      id: 0,
    });
    setFormErrors({});
  };

  const handleSend = async () => {
    if (validateForm()) {
      try {
        const response = await productService.AgregarProducto(values);
        console.log("Respuesta de la solicitud:", response);
        response.status === 200 && limpiarFormulario();
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
      <Typography variant="h6">Carga de materiales</Typography>
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
          <MenuItem value={"Kg"}>Kg</MenuItem>
          <MenuItem value={"Cm"}>Cm</MenuItem>
          <MenuItem value={"Mts"}>Mts</MenuItem>
        </Select>
        <div style={{ color: "red" }}>{formErrors.unidadMedida}</div>
      </FormControl>
      {values.unidadMedida === "Mts" && (
        <TextField
          label="Medida"
          variant="outlined"
          value={values.medida}
          onChange={(e) => setValues({ ...values, medida: e.target.value })}
          error={!!formErrors.medida}
          helperText={formErrors.medida}
        />
      )}
            {values.unidadMedida === "Lts" && (
        <TextField
          label="Medida"
          variant="outlined"
          value={values.medida}
          onChange={(e) => setValues({ ...values, medida: e.target.value })}
          error={!!formErrors.medida}
          helperText={formErrors.medida}
        />
      )}
      {values.unidadMedida === "Kg" && (
        <TextField
          label="Medida"
          variant="outlined"
          value={values.medida}
          onChange={(e) => setValues({ ...values, medida: e.target.value })}
          error={!!formErrors.medida}
          helperText={formErrors.medida}
        />
      )}
            {values.unidadMedida === "Cm" && (
        <TextField
          label="Medida"
          variant="outlined"
          value={values.medida}
          onChange={(e) => setValues({ ...values, medida: e.target.value })}
          error={!!formErrors.medida}
          helperText={formErrors.medida}
        />
      )}
      
      <Button variant="contained" color="primary" onClick={handleSend}>
        Enviar
      </Button>
      <Button variant="outlined" color="secondary" onClick={limpiarFormulario}>
        Limpiar
      </Button>
    </Box>
  );
}
