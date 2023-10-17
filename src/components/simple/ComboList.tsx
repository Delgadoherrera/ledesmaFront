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
import { IonButton, IonDatetime, IonIcon } from "@ionic/react";
import axios from "axios";
import {
  menu,
  options,
  optionsOutline,
  optionsSharp,
  refresh,
  remove,
} from "ionicons/icons";
import { Button } from "primereact/button";
import { Input, Menu, MenuItem } from "@mui/material";
import ModalList from "./Modals";
import { useDispatch, useSelector } from "react-redux";
import { refreshThis } from "../../features/dataReducer/dataReducer";

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
  const dispatch = useDispatch();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
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

  console.log("compra:", prices);

  React.useEffect(() => {
    productService.ListarProductos().then((data) => {
      setProducts(data);
    });
  }, [refresh]);

  const handleSend = async (materiales: any, prices: any) => {
    try {
      for (const materialId in prices) {
        console.log("materialIdmaterialId", materialId);
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

          console.log("PRICE FOR API", prices);

          console.log("MATERIAL", material);
          const response = await axios.get(
            "https://api.bluelytics.com.ar/v2/latest"
          );
          const dolares = response.data;
          setValorDolar(dolares.blue.value_avg);

          const val = price / dolares.blue.value_avg;

          console.log("VAL CONVERSION", val);

          try {
            const datos = {
              conversion: val,
              precioPesos: price,
              medida: material!.medida,
              unidades: 0,
              medidaId: 1,
              fechaCompra: date,
            };
            const response = await productService.comprarMaterial(
              datos,
              materialId
            );
            console.log("Respuestasolicitud:", response);
            handleClose();
            response.status === 200 && console.log("EXITOSO!");
          } catch (error) {
            console.error("Error al realiza:", error);
          }

          // Realizar la llamada a la API para enviar los datos

          /*   const response = await productService.comprarMaterial(
            price,
            materialId
          );
          console.log(
            `Llamada a la API para ID ${materialId} con precio ${price}:`,
            response
          );
 */
          // Puedes manejar la respuesta de la API aquí si es necesario
        }
      }

      // Resto de la lógica después de enviar todos los datos
    } catch (error) {
      console.error("Error al enviar datos a la API:", error);
    }
  };

  return (
    <>
      {/* u */}{" "}
      <TableContainer component={Paper} className="tableMateriales">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>

              <TableCell align="right">Descripción</TableCell>

              <TableCell align="right">Unidad medida</TableCell>

              <TableCell align="right">Medida</TableCell>
              <TableCell align="right">
                {/*                 <IonIcon icon={options}></IonIcon>
                 */}{" "}
              </TableCell>
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
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.descripcion}</TableCell>
                  <TableCell align="right">
                    {row.unidadMedida.unidadMedida}
                  </TableCell>
                  <TableCell align="right">{row.medida}</TableCell>
                  <TableCell align="right">
                    <input
                      min={1}
                      type="text"
                      value={
                        selectedMaterials.find(
                          (item) => item.material.id === row.id
                        )?.price || 0
                      }
                      onChange={(e) => {
                        const price = parseFloat(e.target.value) || 0;
                        const existingMaterialIndex =
                          selectedMaterials.findIndex(
                            (item) => item.material.id === row.id
                          );

                        if (existingMaterialIndex !== -1) {
                          const updatedMaterials = [...selectedMaterials];
                          updatedMaterials[existingMaterialIndex].price = price;
                          setSelectedMaterials(updatedMaterials);
                        } else {
                          setSelectedMaterials([
                            ...selectedMaterials,
                            { material: row, price: price },
                          ]);
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <input
          required
          type="date"
          onChange={(e: any) => setDate(e.target.value)}
        ></input>
        <IonButton
          onClick={(e) => {
            const prices = Object.fromEntries(
              selectedMaterials.map((item) => [item.material.id, item.price])
            );
            handleSend(selectedMaterials, prices);
          }}
        >
          Comprar
        </IonButton>
      </TableContainer>
    </>
  );
}
