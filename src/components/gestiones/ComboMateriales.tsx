import * as React from "react";
import { useState } from "react";
import { ProductServices } from "../../Services/ProductService";
import { Materiales } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  IonSelect,
  IonText,
  IonTitle,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

import ComboList from "../simple/ComboList";
import {
  IonBadge,
  IonBreadcrumb,
  IonButton,
  IonIcon,
  IonNote,
} from "@ionic/react";
import { Typography } from "@mui/material";
import { components } from "react-select";
import add from "../../assets/icons/add-circle-svgrepo-com(1).svg";
import {
  dialogAdvText,
  dialogText,
  refreshThis,
  showDialogAdv,
} from "../../features/dataReducer/dataReducer";
import { Badge, Button, DatePicker, Input, Select, Tag } from "antd";
import {
  addCircle,
  addCircleOutline,
  addCircleSharp,
  addOutline,
} from "ionicons/icons";
import { addIcons } from "ionicons";
import { AddAPhoto, VoiceChat } from "@mui/icons-material";
import Icon from "@ant-design/icons/lib/components/Icon";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import Dialog from "../simple/DialogAdv";
import dayjs from "dayjs";

export default function MultipleSelect() {
  const [materiales, setMateriales] = useState<Materiales[]>([]);
  const [resetSelects, setResetSelects] = useState(false);
  const productService = new ProductServices();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [materialValue, setMaterialValue] = useState<string>("");
  const [materialQuantity, setMaterialQuantity] = useState<string>("");
  const [elementCombo, setElementCombo] = useState<
    Array<{ material: Materiales; precio: string; cantidad: string }>
  >([]);
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );
  const [selectedMeasure, setSelectedMeasure] = useState<string | null>(null);
  const [refreshSelect, setRefreshSelect] = useState(true);
  const [dialog, setShowDialog] = useState(false);
  const [campoFaltante, setCampoFaltante] = useState<string | null>(null);
  const [date, setDate] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (campoFaltante !== null) {
      dispatch(showDialogAdv(true));
      dispatch(dialogText(`Falta completar el campo: ${campoFaltante}`));
    }
  }, [campoFaltante]);
  const handleAddMaterial = () => {
    if (
      selectedDescription &&
      selectedMeasure &&
      materialValue &&
      materialQuantity
    ) {
      const selectedMaterial: any = materiales.find(
        (material) =>
          material.descripcion === selectedDescription &&
          material.medida === selectedMeasure
      );

      if (selectedMaterial) {
        // Verificar si el elemento ya existe en elementCombo
        const alreadyExists = elementCombo.find((item) => {
          return (
            item.material.descripcion === selectedDescription &&
            item.material.medida === selectedMeasure
          );
        });

        if (alreadyExists) {
          console.log("El elemento ya existe en la lista.");
        } else {
          const materialWithPriceAndQuantity = {
            material: selectedMaterial,
            precio: materialValue,
            cantidad: materialQuantity,
          };

          // Agregar el nuevo material con precio y cantidad al arreglo existente en lugar de reemplazarlo
          setElementCombo([...elementCombo, materialWithPriceAndQuantity]);

          // Limpiar los selects y los valores de entrada
          setSelectedDescription(null);
          setSelectedMeasure(null);
          setMaterialValue("");
          setMaterialQuantity("");
          setRefreshSelect(false);
        }
      } else {
        console.log("No se encontró el elemento seleccionado.");
      }
    } else {
      if (!selectedDescription) {
        setCampoFaltante("Material");
      } else if (!selectedMeasure) {
        setCampoFaltante("Medida");
      } else if (!materialQuantity) {
        setCampoFaltante("Unidades");
      } else if (!materialValue) {
        setCampoFaltante("Precio unidad");
      }
      dispatch(showDialogAdv(true));
    }
  };

  React.useEffect(() => {
    productService.ListarMateriales().then((data: Materiales[]) => {
      setMateriales(data);
    });
  }, [refresh]);

  // Obtener descripciones únicas
  const uniqueDescriptions = materiales
    ? [...new Set(materiales.map((material) => material.descripcion))]
    : [];

  // Filtrar los materiales con la descripción seleccionada
  const filteredMaterials = selectedDescription
    ? materiales.filter(
        (material) => material.descripcion === selectedDescription
      )
    : [];

  // Obtener las medidas únicas para la descripción seleccionada
  const uniqueMeasures = filteredMaterials
    ? [...new Set(filteredMaterials.map((material) => material.medida))]
    : [];
  const unidadMedidaFilter = [
    ...new Set(
      filteredMaterials.map((material) => material.unidadMedida.unidadMedida)
    ),
  ];
  const handleRemoveItem = (itemToRemove: any) => {
    const updatedCombo = elementCombo.filter((item) => item !== itemToRemove);
    setElementCombo(updatedCombo);
  };
  const emptyList = (itemToRemove: any) => {
    setElementCombo([]);
  };
  React.useEffect(() => {
    if (refreshSelect === false) {
      setRefreshSelect(true);
    }
  }, [refreshSelect]);
  const objetoFecha = Date.now();
  const nowDate = new Date(objetoFecha);
  const fechaHoy = nowDate.toLocaleDateString("en-ZA");
  const fechaOriginal = fechaHoy;

  function cambiarFormatoFecha(fecha: any) {
    // Divide la cadena de fecha en partes usando el carácter "/"
    const partesFecha = fecha.split("/");

    // Une las partes de la fecha con el carácter "-"
    const fechaFormateada = partesFecha.join("-");

    return fechaFormateada;
  }
  const fechaFormateada = cambiarFormatoFecha(fechaOriginal);
  const dateFormat = "YYYY/MM/DD";

  return (
    <div className="compraMaterialesContent">
      <IonTitle>
      <Tag> Compra de materiales</Tag>

      </IonTitle>
      <div className="compraMaterialesNav">
        {refreshSelect === true && (
          <>
            <Select
              options={uniqueDescriptions.map((description) => ({
                value: description,
                label: description,
              }))}
              onChange={(selectedOption: any) => {
                console.log("selectedOption", selectedOption);
                setSelectedDescription(selectedOption);
                setSelectedMeasure(null);
              }}
              placeholder={"Material"}
            />
            <Select
              options={filteredMaterials.map((material) => ({
                value: material.medida,
                label: `${material.medida} ${material.unidadMedida.unidadMedida}`,
              }))}
              onChange={(selectedOption: any) => {
                setSelectedMeasure(selectedOption);
              }}
              value={selectedMeasure}
              placeholder={"Medida"}
            />
          </>
        )}

        <Badge>
          Unidades
          <Input
            type="number"
            value={materialQuantity}
            onChange={(e: any) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 1) {
                setMaterialQuantity(value.toString());
              }
            }}
          />
        </Badge>
        <Badge>
          Precio unidad
          <Input
            type="number"
            value={materialValue}
            onChange={(e: any) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 1) {
                setMaterialValue(value.toString());
              }
            }}
          />
        </Badge>
        <IonNote>Fecha de compra</IonNote>

        <DatePicker
          defaultValue={dayjs(fechaHoy, dateFormat)}
          onChange={(e) => {
            console.log("FECHA EJEMPLO", e);
            const fechaOriginal = new Date(e.$d);
            const año = fechaOriginal.getFullYear();
            const mes = (fechaOriginal.getMonth() + 1)
              .toString()
              .padStart(2, "0"); // Agrega un 0 si es necesario
            const dia = fechaOriginal.getDate().toString().padStart(2, "0"); // Agrega un 0 si es necesario
            const fechaFormateada = `${año}-${mes}-${dia}`;
            console.log("fechaOriginal", fechaFormateada);
            setDate(fechaFormateada);
          }}
        ></DatePicker>
        <Button  onClick={handleAddMaterial} icon={<PlusOutlined />}></Button>

        <ComboList elementCombo={elementCombo} setElementCombo={emptyList} />
      </div>
    </div>
  );
}
