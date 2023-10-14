import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductServices } from "../../Services/ProductService";
import { Compras } from "../../interfaces/index";
import { IonIcon } from "@ionic/react";
import { menu, options, optionsOutline, optionsSharp } from "ionicons/icons";
import { Button } from "primereact/button";
import { Menu, MenuItem } from "@mui/material";
import ModalList from "./Modals";
import axios from "axios";

export default function BasicTable({
  closeModal,
}: {
  closeModal: (value: any) => void;
}) {
  const [products, setProducts] = React.useState<Compras[]>([]); // Especifica el tipo Product[]
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showMopdal, setShowModal] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [element, setElement] = React.useState<Compras | null>(null);
  const [configModal, setConfigModal] = React.useState({
    action: "",
    tittle: "",
    bodyReq: "",
    element: element,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("element", element);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const productService = new ProductServices();

  const handleAction = (e: any, action: any, element: Compras) => {
    switch (action) {
      case "deleteMaterial":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Deseas eliminar este material?",
          tittle: "Eliminar material",
          action: "deleteMaterial",
        });

        break;
      case "editMaterial":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Editar material?",
          tittle: "Editar material",
          action: "editMaterial",
        });

        break;
      case "buyMaterial":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Comprar material?",
          tittle: "Comprar material",
          action: "buyMaterial",
        });
      default:
        break;
    }
  };
  React.useEffect(() => {
    productService.ListarCompras().then((data) => {
      console.log("data", data);
      setProducts(data);
    });
  }, []);

  console.log("COMPRAS REALIZADAS:", products);
  return (
    <>
      {showMopdal && (
        <ModalList
          closeModal={setShowModal}
          action={todo}
          tittle="Eliminar material?"
          bodyReq={`eliminar?`}
          element={element}
          configModal={configModal}
        />
      )}

      <TableContainer component={Paper} className="tableCompras">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Unidad Medida</TableCell>
              <TableCell align="right">Medida</TableCell>
              <TableCell align="right">Id Material</TableCell>
              <TableCell align="right">idCompra</TableCell>
              <TableCell align="right">DOLARES</TableCell>
              <TableCell align="right">PESOS</TableCell>
              {/*      <TableCell align="right">
                <IonIcon icon={options}></IonIcon>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) &&
              products.map((row, index) => (
                <TableRow
                  key={row.idCompra}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.catalogo_material.descripcion}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {row.cotizacion.fechaCotizacion}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {row.unidadMedida.unidadMedida}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {row.medida}
                  </TableCell>
                  <TableCell align="right">{row.idMaterial}</TableCell>

                  <TableCell align="right">{row.idCompra}</TableCell>
                  <TableCell align="right">
                    {row.cotizacion.conversion}
                  </TableCell>
                  <TableCell
                    onClick={() => console.log("clic on table")}
                    align="right"
                  >
                    {row.precioPesos}
                  </TableCell>
                  {/*                   <TableCell align="right">
                    <Button>
                      <div>
                        <IonIcon
                          onClick={(e: any) => {
                            handleClick(e);
                            setElement(row);
                            setConfigModal({fecha
                              ...configModal,
                              element: row,
                            });fecha
                          }}
                          icon={menu}
                        ></IonIcon>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={(e) => {
                              setTodo("editMaterial");
                              setConfigModal({
                                ...configModal,
                                action: "editMaterial",
                              });
                              handleAction(e, "editMaterial", row);
                            }}
                          >
                            Editar
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setTodo("buyMaterial");
                              setConfigModal({
                                ...configModal,
                                action: "buyMaterial",
                              });
                              handleAction(e, "buyMaterial", row);
                            }}
                          >
                            Comprar
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setTodo("deleteMaterial");
                              setConfigModal({
                                ...configModal,
                                action: "deleteMaterial",
                              });
                              handleAction(e, "deleteMaterial", row);
                            }}
                          >
                            Eliminar
                          </MenuItem>
                        </Menu>
                      </div>
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
