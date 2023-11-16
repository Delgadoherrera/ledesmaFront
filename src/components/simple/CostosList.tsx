import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductServices } from "../../Services/ProductService";
import { Materiales } from "../../interfaces/index";
import {
  IonAlert,
  IonBadge,
  IonButton,
  IonDatetime,
  IonIcon,
  IonToast,
} from "@ionic/react";
import axios from "axios";
import {
  menu,
  options,
  optionsOutline,
  optionsSharp,
  refresh,
  remove,
} from "ionicons/icons";
import { Alert, AlertTitle, Input, Menu, MenuItem } from "@mui/material";
import ModalList from "./Modals";
import { useDispatch, useSelector } from "react-redux";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { InputText } from "primereact/inputtext";
import { Button } from "antd";

export default function BasicTable({
  elementCombo,
  setElementCombo,
}: {
  elementCombo: any;
  setElementCombo: any;
}) {
  const [products, setProducts] = React.useState<Materiales[]>([]); // Especifica el tipo Product[]
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showMopdal, setShowModal] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [element, setElement] = React.useState<Materiales | null>(null);
  const [configModal, setConfigModal] = React.useState({
    action: "",
    tittle: "",
    bodyReq: "",
    element: element,
  });
  const [search, setSearch] = React.useState("");
  const [valorDolar, setValorDolar] = React.useState(0);
  const [filteredProducts, setFilteredProducts] =
    React.useState<Materiales[]>(products);
  const [prices, setPrices] = React.useState<{ [materialId: number]: number }>(
    {}
  );
  const [selectedMaterials, setSelectedMaterials] = React.useState<
    { material: Materiales; price: number }[]
  >([]);
  const [date, setDate] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);
  const dispatch = useDispatch();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  const [configAlert, setConfigAlert] = React.useState({
    trigger: "present-alert",
    header: "Alert",
    subHeader: "Important message",
    message: "This is an alert!",
    buttons: ["OK"],
  });
  React.useEffect(() => {
    if (refresh === true) {
      dispatch(refreshThis(false));
    }
  }, [refresh]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const productService = new ProductServices();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  console.log('elementComboelementComboelementCombo',elementCombo)

  React.useEffect(() => {
  }, [alertMsg, configAlert, trigger]);

  React.useEffect(() => {
    productService.ListarCostos().then((data) => {
      setProducts(data);
    });
  }, [refresh]);

  const handleSend = async (materiales: any, prices: any) => {
    console.log("COSTOS", materiales);
    try {
      for (const materialId in prices) {
        const material = products.find(
          (item: any) => item.id === parseInt(materialId, 10)
        );
        if (prices.hasOwnProperty(materialId)) {
          const price = prices[materialId];
          if (price === 0) {
            return alert(
              "Compra no realizada, falta cargar precio:" +
                material?.descripcion
            );
          }
          const quantity = elementCombo.find(
            (item: any) => item.material.id === parseInt(materialId, 10)
          )?.cantidad;

          if (quantity === "") {
            setConfigAlert({
              trigger: "present-alert",
              header: "Cantidad de unidades",
              subHeader: "",
              message: "Ingrese cantidad de unidades",
              buttons: ["OK"],
            });
            return setAlertMsg(true);
          }

          const response = await axios.get(
            "https://api.bluelytics.com.ar/v2/latest"
          );
          const dolares = response.data;
          setValorDolar(dolares.blue.value_avg);

          const val = price / dolares.blue.value_avg;

          try {
            const datos = {
              fecha: fechaFormateada,
              valor: price,
              detalle: quantity,
              idCosto: materialId,
            };
            const response = await productService.ConcretarCosto(datos);
            console.log("Respuestasolicitud:", response);
            handleClose();
            response.status === 200 && setElementCombo([]);
            if (response.status === 200) {
              setConfigAlert({
                trigger: "present-alert",
                header: "Compra realizada",
                subHeader: "",
                message: "Proceso realizado correctamente.",
                buttons: ["OK"],
              });
              setAlertMsg(true);

              // Agregar un temporizador para cambiar setAlertMsg a false después de 7 segundos
              setTimeout(() => {
                setAlertMsg(false);
              }, 4000); // 7000 milisegundos = 7 segundos
            }
          } catch (error) {
            console.error("Error al realiza:", error);
          }
        }
      }

      // Resto de la lógica después de enviar todos los datos
    } catch (error) {
      console.error("Error al enviar datos a la API:", error);
    }
  };

  function cambiarFormatoFecha(fecha: any) {
    // Divide la cadena de fecha en partes usando el carácter "/"
    const partesFecha = fecha.split("/");

    // Une las partes de la fecha con el carácter "-"
    const fechaFormateada = partesFecha.join("-");

    return fechaFormateada;
  }

  const objetoFecha = Date.now();
  const nowDate = new Date(objetoFecha);
  const fechaHoy = nowDate.toLocaleDateString("en-ZA");
  const fechaOriginal = fechaHoy;
  const fechaFormateada = cambiarFormatoFecha(fechaOriginal);

  return (
    <>
    
      {/*     <div>
        <IonBadge>Fecha de compra:</IonBadge>
        <InputText
          required
          defaultValue={fechaFormateada}
          type="date"
          onChange={(e: any) => setDate(e.target.value)}
        ></InputText>
      </div> */}

      <TableContainer component={Paper} className="tableMateriales">
      {elementCombo.length > 0 ? (
          <div className="comboBoxBottom">
            <Button
            className="buyButton"
              id="present-alert"
              onClick={(e) => {
                const prices = Object.fromEntries(
                  elementCombo.map((item: any) => [
                    item.material.id,
                    item.precio,
                    item.fecha,
                  ])
                );
                return handleSend(selectedMaterials, prices);
              }}
            >
              Guardar lista 
            </Button>
          </div>
        ) : null}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell> Costo</TableCell>
              <TableCell> Concepto</TableCell>
              <TableCell> Detalle</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(elementCombo) &&
              elementCombo.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.fecha}
                  </TableCell>

                  <TableCell>{row.material.costo}</TableCell>
                  <TableCell>{row.material.concepto}</TableCell>
                  <TableCell>{row.cantidad}</TableCell>
                  <TableCell> {row.precio}</TableCell>

                  <TableCell>
                    <div key={index}>
                      <button onClick={() => setElementCombo(row)}>
                        <IonIcon icon={remove}></IonIcon>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
  
      </TableContainer>
      {alertMsg && (
        <Alert severity="success">
          <AlertTitle>Registros creados.</AlertTitle>
          Registros creados con éxito.
          <strong>Podrás ver el reporte en el reporte costos.</strong>
        </Alert>
      )}
    </>
  );
}
