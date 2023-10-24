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
import { IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import { Input, Menu, MenuItem } from "@mui/material";
import ModalList from "./Modals";
import { useDispatch, useSelector } from "react-redux";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import CargaProductos from "../gestiones/CargaProductos";
import { Image } from "react-bootstrap";

export default function BasicTable({
  closeModal,
}: {
  closeModal: (value: any) => void;
}) {
  const [products, setProducts] = React.useState<any[]>([]); // Especifica el tipo Product[]
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showMopdal, setShowModal] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [element, setElement] = React.useState<any | null>(null);
  const [configModal, setConfigModal] = React.useState({
    action: "",
    tittle: "",
    bodyReq: "",
    element: element,
  });
  const [search, setSearch] = React.useState("");
  const [filteredProducts, setFilteredProducts] =
    React.useState<any[]>(products);

  const dispatch = useDispatch();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );

  React.useEffect(() => {
    if (refresh === true) {
      dispatch(refreshThis(false));
    }
  }, [refresh]);

  console.log("REFRESH", refresh);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    // Filtrar los productos en base al término de búsqueda
    const filtered = searchTerm
      ? products.filter((product) =>
          product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products;

    setFilteredProducts(filtered);
  };

  console.log("element", element);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const productService = new ProductServices();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAction = (e: any, action: any, element: Materiales) => {
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
    productService.ListarProductos().then((data) => {
      setFilteredProducts(data);
      setProducts(data);
    });
  }, [refresh]);
  React.useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (anchorEl && !anchorEl.contains(e.target as Node)) {
        handleClose();
      }
    };
    console.log("filteredProductsfilteredProducts", filteredProducts);
    if (open) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [open, anchorEl]);

  Array.isArray(filteredProducts) &&
    filteredProducts.map((row, index) => {
      console.log("ROW", row);
    });
  return (
    <>
      {/*       <CargaProductos />
       */}{" "}
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
      <div className="search-container">
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 && (
        <TableContainer component={Paper} className="tableMateriales">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Medida</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Tipo</TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredProducts) &&
                filteredProducts.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <img
                        src={`data:image/jpeg;base64,${row.imagenes[0].blobImage}`}
                        className="imgListProduct"
                      ></img>
                    </TableCell>

                    <TableCell>{row.descripcion}</TableCell>
                    {/*                 <TableCell onClick={() => console.log("clic on table")}>
                    {row.unidadMedida.unidadMedida}
                  </TableCell> */}
                    <TableCell>
                      {row.medida} {row.unidadMedida.unidadMedida}
                    </TableCell>
                    <TableCell>{row.producto.categoria.detalle}</TableCell>
                    <TableCell>{row.producto.descripcion}</TableCell>

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
