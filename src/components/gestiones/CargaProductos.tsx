import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { Productos as Materiales } from "../../interfaces/index";
import { useDispatch, useSelector } from "react-redux";
import { ProductServices } from "../../Services/ProductService";
import emptyImage from "../../assets/icons/image-svgrepo-com(1).svg";
import ImageCompressor from "image-compressor";

import {
  imageValue,
  refreshThis,
} from "../../features/dataReducer/dataReducer";
import {
  IonBadge,
  IonBreadcrumb,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonText,
  IonToast,
} from "@ionic/react";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { camera, checkmarkCircle, handRightOutline } from "ionicons/icons";
import { Image } from "react-bootstrap";
import { Button, Input, List, Select } from "antd";
import { ListItem } from "@mui/material";
import { StickyNote2 } from "@mui/icons-material";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

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
  const [categoria, setCategoria] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.",
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    dispatch(imageValue(image || 10));
    setImg(image.base64String ? image.base64String : "");
  };
  useEffect(() => {
    console.log("filesList", fileList);
  }, [fileList]);

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
    setType(null);
    setCategoria(null);
    setSelectedDescription(null);
    setImg("");
  };
  console.log("selectedType", selectedType);

  useEffect(() => {
    console.log("sELECTEDAGATA", selectedCategory);
    setSelectedType(null);
    setType(null);
  }, [selectedCategory]);

  const handleSend = async () => {
    /*     if (img === "") {
      return console.log("ingrese una imagen para continuar...");
    } */
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

    const compressImage = async (imageData: any) => {
      const imageCompressor = new ImageCompressor();
      const compressedImageBlob = await imageCompressor.compress(imageData, {
        quality: 0.6, // Ajusta la calidad de compresión según tus preferencias (0.1 a 1)
      });

      const compressedImage = URL.createObjectURL(compressedImageBlob);
      return compressedImage;
    };

    if (img !== "") {
      const compressedImage = await compressImage(img); // Llama a la función de compresión
      setImg(compressedImage); // Actualiza la imagen con la versión comprimida
    }
    const data = {
      descripcion: values.descripcion,
      medida: values.medida,
      unidadMedida: selectedDescription,
      img: img,
      detalle: selectedCategory,
      categoria: selectedCategory.value,
      categoriaId: selectedType,
      imagenes: fileList,
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
      response.status === 201 && limpiarFormulario();
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

  const uniqueDescriptions = costos
    ? [...new Set(costos.map((material) => material.descripcion))]
    : [];
  const uniqueDetails = [...new Set(items.map((material: any) => material))];
  return (
    <>
      <IonContent className="contentAltaProductoNoDiv">
        <div className="contentAltaProducto">
          <div className="badgetNavs">
            <IonBadge> Carga de productos</IonBadge>
          </div>
          <div>
            {img.length > 0 ? (
              <Image
                src={`data:image/jpeg;base64,${img}`}
                className="addPhotoPic"
                onClick={() => takePicture()}
              />
            ) : (
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Imagen"}
              </Upload>
            )}
            {/*       <IonIcon
              icon={camera}
              size="large"
              className="imageAddIcon"
            /> */}
          </div>
          <Select
            options={uniqueDescriptions.map((description: any) => ({
              value: description.id,
              label: description.detalle,
            }))}
            value={selectedCategory} // Usa el estado para el valor seleccionado
            onChange={(selectedOption: any) => {
              setSelectedCategory(selectedOption);
              setCategoria(uniqueDescriptions[selectedOption - 1]);
            }}
            placeholder={"Categorías"}
          />
          <Select
            value={selectedType}
            onChange={(selectedValue) => {
              setSelectedType(selectedValue);
              if (uniqueDetails !== null) {
                uniqueDetails
                  .filter(
                    (description: any) =>
                      description.categoria_id === selectedCategory
                  )
                  .map((description: any) =>
                    console.log("deski", description.descripcion)
                  );
              }
              setType(uniqueDetails[selectedValue - 1]);
            }}
            placeholder="Tipos"
          >
            {uniqueDetails
              .filter(
                (description: any) =>
                  description.categoria_id === selectedCategory
              )
              .map((description: any) => (
                <Select.Option key={description.id} value={description.id}>
                  {description.descripcion}
                </Select.Option>
              ))}
          </Select>
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
              console.log(selectedOption);
            }}
            placeholder={"Unidad"}
          />
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
          />{" "}
          <div className="createProductButton">
            <Button
              onClick={() => {
                setImg("");
                limpiarFormulario();
                setSelectedCategory(null);
                setSelectedType(null);
                setSelectedDescription(null);
                setImg("");
              }}
            >
              Limpiar
            </Button>
            <Button onClick={handleSend}>Registrar producto</Button>
          </div>
        </div>

        {alertMsg && (
          <IonToast
            isOpen={alertMsg}
            message={configAlert.message}
            onDidDismiss={() => setAlertMsg(false)}
            duration={5000}
          ></IonToast>
        )}

        {/*         <div className="imageNewPostProductContainer">
        <List className="listNewProduct">
              <ListItem>
                {img.length > 0 ? (
                  <Image
                    src={`data:image/jpeg;base64,${img}`}
                    className="addPhotoPic"
                  />
                ) : null}
              </ListItem>
            </List>
          <div className="rightContainerNewPostProduct">
       
            <ListItem>
              {categoria && (
                <IonText>
                  <IonIcon icon={checkmarkCircle} />
                  {categoria.detalle}
                </IonText>
              )}
            </ListItem>
            <ListItem>
              {type && (
                <IonText>
                  <IonIcon icon={checkmarkCircle} />
                  {type.descripcion}
                </IonText>
              )}
            </ListItem>
            <ListItem>
              {values.medida.length > 0
                ? selectedDescription && (
                    <IonText>
                      <IonIcon icon={checkmarkCircle} />
                      {values.medida} {selectedDescription}
                    </IonText>
                  )
                : null}
            </ListItem>
            <ListItem>
              {values.descripcion && (
                <IonText>
                  <IonIcon icon={checkmarkCircle} />
                  {values.descripcion}
                </IonText>
              )}
            </ListItem>
          </div>
        </div> */}
      </IonContent>
    </>
  );
}
