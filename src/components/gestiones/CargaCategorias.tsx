import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import {
  IonBadge,
  IonContent,
  IonItem,
  IonTitle,
  IonToast,
} from "@ionic/react";
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
      <IonContent className="contentCategoriasYTipos">

      <div className="contentCargaCategoriaProducto">
          <IonTitle>
            {" "}
            <IonBadge>Carga de categorias</IonBadge>
          </IonTitle>
          <Input
            value={values.detalle}
            onChange={(e) => setValues({ ...values, detalle: e.target.value })}
            placeholder="Categoria de producto"
          />
          <Button onClick={handleSend}>Aceptar</Button>
          <Button onClick={limpiarFormulario}>Limpiar</Button>
        </div>
        {alertMsg && (
          <IonToast
            isOpen={alertMsg}
            message={configAlert.message}
            onDidDismiss={() => setAlertMsg(false)}
            duration={5000}
          ></IonToast>
        )}
        <RegistrarItemCategoria limpiarFormulario={() => "a"} />

      </IonContent>
    </>
  );
}
