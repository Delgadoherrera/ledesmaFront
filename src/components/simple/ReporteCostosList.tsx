import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductServices } from "../../Services/ProductService";
import { Costos, Materiales } from "../../interfaces/index";
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import { Menu, MenuItem } from "@mui/material";
import ModalList from "./Modals";
import { useDispatch, useSelector } from "react-redux";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import CargaMateriales from "../gestiones/CargaMateriales";
import { Input } from "antd";
export default function BasicTable({
  closeModal,
}: {
  closeModal: (value: any) => void;
}) {
  const [products, setProducts] = React.useState<Costos[]>([]); // Especifica el tipo Product[]
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showMopdal, setShowModal] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [element, setElement] = React.useState<Costos | null>(null);
  const [configModal, setConfigModal] = React.useState({
    action: "",
    tittle: "",
    bodyReq: "",
    element: element,
  });
  const [search, setSearch] = React.useState("");
  const [filteredProducts, setFilteredProducts] =
    React.useState<Costos[]>(products);

  const dispatch = useDispatch();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );

  React.useEffect(() => {
    if (refresh === true) {
      dispatch(refreshThis(false));
    }
  }, [refresh]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    // Filtrar los productos en base al término de búsqueda
    const filtered = searchTerm
      ? products.filter((product) =>
          product.costo.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products;

    setFilteredProducts(filtered);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const productService = new ProductServices();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAction = (e: any, action: any, element: Costos) => {
    switch (action) {
      case "deleteCost":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Deseas eliminar este costo?",
          tittle: "Eliminar costo",
          action: "deleteCost",
        });

        break;
      case "editMaterial":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Editar costo?",
          tittle: "Editar costo",
          action: "editCost",
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
    productService.ListarCostos().then((data) => {
      const filteredData = data.filter(
        (product: any) => product.estado !== "hide"
      );

      setFilteredProducts(filteredData);
      setProducts(filteredData);
    });
  }, [refresh]);
  React.useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (anchorEl && !anchorEl.contains(e.target as Node)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [open, anchorEl]);
  return (
    <>
      {showMopdal && (
        <ModalList
          closeModal={setShowModal}
          action={configModal.action}
          tittle="Eliminar material?"
          bodyReq={`eliminar?`}
          element={element}
          configModal={configModal}
        />
      )}
      <div className="search-container-costos">
        <Input
          type="text"
          placeholder="Buscar costos..."
          value={search}
          onChange={handleSearch}
          className="searchCostos"
        />
      </div>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 && (
        <TableContainer component={Paper} className="tableMateriales">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Costo</TableCell>

                {/*               <TableCell>Unidad medida</TableCell>
                 */}
                <TableCell>Concepto</TableCell>
                <TableCell>
                  {/*                 <IonIcon icon={options}></IonIcon>
                   */}{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredProducts) &&
                filteredProducts.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.costo}</TableCell>
                    {/*                 <TableCell onClick={() => console.log("clic on table")}>
                    {row.unidadMedida.unidadMedida}
                  </TableCell> */}
                    <TableCell>{row.concepto}</TableCell>

                    <TableCell>
                      <div>
                        <IonIcon
                          size="small"
                          icon={menu}
                          onClick={(e: any) => {
                            handleClick(e);
                            setElement(row);
                            setConfigModal({
                              ...configModal,
                              element: row,
                            });
                          }}
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
                              setTodo("deleteCost");
                              setConfigModal({
                                ...configModal,
                                action: "deleteCost",
                              });
                              handleAction(e, "deleteCost", row);
                            }}
                          >
                            Eliminar
                          </MenuItem>
                        </Menu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
