import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Select as Twek } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Productos as Materiales } from "../../interfaces/index";
import { useDispatch, useSelector } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import {
  imageValue,
  refreshThis,
} from "../../features/dataReducer/dataReducer";
import { IonBreadcrumb, IonIcon, IonToast } from "@ionic/react";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import { Image } from "react-bootstrap";
import Select from "react-select";
import { Input } from "antd";

export default function CargaMateriales() {
  const [values, setValues] = useState<Materiales>({
    descripcion: "",
    medida: "",
    unidadMedida: "",
    id: null,
    nombre: "",
    img: "",
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [alertMsg, setAlertMsg] = useState(false);
  const [img, setImg] = React.useState<string>("");
  const [costos, setCostos] = React.useState<any>([]);
  const [configAlert, setConfigAlert] = React.useState({
    message: `${values.descripcion} agregado con éxito!`,
  });
  const [selectedDescription, setSelectedDescription] = React.useState<any>([]);
  const productService = new ProductServices();
  const dispatch = useDispatch();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
  const [selectedType, setSelectedType] = React.useState<any>(null);
  const [items, setItems] = React.useState<any>([]);
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    dispatch(imageValue(image || 10));
    setImg(image.base64String ? image.base64String : "");
  };

  const validateForm = () => {
    const errors: any = {};

    if (!values.descripcion) {
      errors.descripcion = "La descripción es requerida.";
    }
    if (!values.nombre) {
      errors.nombre = "El nombre es requerido.";
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
      nombre: "",
      img: "",
    });
    setFormErrors({});
  };
  console.log("selectedDescriptionselectedDescription", selectedDescription);

  const handleSend = async () => {
    if (img === "") {
      return console.log("ingrese una imagen para continuar...");
    }
    if (values.descripcion.length < 1) {
      return console.log("ingrese una descripcion para continuar...");
    }
    if (values.medida.length < 1) {
      return console.log("ingrese una medida para continuar...");
    }
    if (selectedDescription.length < 1) {
      return console.log("ingrese una unidad de medida para el producto...");
    }

    if (selectedCategory == null) {
      return console.log("ingrese una categoria de producto...");
    }
    const data = {
      descripcion: values.descripcion,
      medida: values.medida,
      unidadMedida: values.unidadMedida,
      img: img,
      detalle: selectedDescription,
      categoria: selectedCategory.value,
    };
    try {
      const response = await productService.AgregarProducto(data);
      response.status === 201 &&
        setValues({
          descripcion: "",
          medida: "",
          unidadMedida: "",
          id: null,
          nombre: "",
          img: "",
        });
      dispatch(refreshThis(true));
      response.status === 201
        ? setConfigAlert({
            message: ` ${data.descripcion} agregado con exito`,
          })
        : null;
      response.status === 201 && setSelectedCategory(null);
      response.status === 201 && setSelectedType(null);
      response.status === 201 && setSelectedDescription(null);

      response.status === 201 && setAlertMsg(true);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  React.useEffect(() => {
    productService.ListarCategoriaProductos().then((data: any) => {
      setCostos(data);
    });
  }, [refresh]);
  React.useEffect(() => {
    productService.ListarItemProducto().then((data: any) => {
      const filteredData = data.filter(
        (product: any) => product.estado !== "hide"
      );
      setItems(filteredData);
    });
  }, [refresh]);

  const uniqueDescriptions = [
    ...new Set(costos.map((material: any) => material)),
  ];

  const uniqueDetails = [...new Set(items.map((material: any) => material))];

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="controlPanelAddProduct"
      >
        <Button className="imageAddIcon" onClick={() => takePicture()}>
          <IonIcon icon={camera} size="large" />
        </Button>
        <Select
          options={uniqueDescriptions.map((description: any) => ({
            value: description.id,
            label: description.detalle,
          }))}
          value={selectedCategory} // Usa el estado para el valor seleccionado
          onChange={(selectedOption: any) => {
            setSelectedCategory(selectedOption);
          }}
          placeholder={"Categorías"}
        />
        <Select
          options={uniqueDetails
            .filter(
              (description: any) =>
                description.categoria_id === selectedCategory?.value
            )
            .map((description: any) => ({
              value: description.categoria_id,
              label: description.descripcion,
            }))}
          value={selectedType} // Usa el estado para el valor seleccionado
          onChange={(selectedOption: any) => {
            setSelectedType(selectedOption);
          }}
          placeholder={"Tipos"}
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
          value={selectedDescription} // Usa el estado para el valor seleccionado
          onChange={(selectedOption: any) => {
            setSelectedDescription(selectedOption);
          }}
          placeholder={"Unid. Medida"}
        />
        {/*         <Input
          value={values.nombre}
          onChange={(e) => setValues({ ...values, nombre: e.target.value })}
          placeholder="Producto"
          allowClear
        /> */}
        <Input
          allowClear
          placeholder="Medida"
          value={values.medida}
          onChange={(e) => setValues({ ...values, medida: e.target.value })}
        />
        <Input
          allowClear
          placeholder="Descripción"
          value={values.descripcion}
          onChange={(e) =>
            setValues({ ...values, descripcion: e.target.value })
          }
        />

        {alertMsg && (
          <IonToast
            isOpen={alertMsg}
            message={configAlert.message}
            onDidDismiss={() => setAlertMsg(false)}
            duration={5000}
          ></IonToast>
        )}
        {img.length > 0 ? (
          <Image
            src={`data:image/jpeg;base64,${img}`}
            className="addPhotoPic"
          ></Image>
        ) : null}
      </Box>
      <div className="containerButtonsProducts">
        <Button variant="contained" color="primary" onClick={handleSend}>
          Registrar producto
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setImg("");
            limpiarFormulario();
            setSelectedCategory(null);
            setSelectedType(null);
            setSelectedDescription(null);
          }}
        >
          Limpiar
        </Button>
      </div>
    </>
  );
}
