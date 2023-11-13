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
import { IonBadge, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import { Menu, MenuItem } from "@mui/material";
import ModalList from "./Modals";
import { useDispatch, useSelector } from "react-redux";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { Avatar, Input, List } from "antd";
import { VerifiedUserOutlined } from "@mui/icons-material";
import Listas from "./Listas";

export default function BasicTable({
  closeModal,
}: {
  closeModal: (value: any) => void;
}) {
  const [products, setProducts] = React.useState<any[]>([]);
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
  const [filteredProducts, setFilteredProducts] = React.useState<any[]>([]);
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
          product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAction = (e: any, action: any, element: Materiales) => {
    switch (action) {
      case "deleteMaterial":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Deseas eliminar este producto?",
          tittle: "Eliminar Producto",
          action: "deleteProduct",
        });

        break;
      case "editProduct":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Editar producto?",
          tittle: "Editar Producto",
          action: "editProduct",
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

      case "deleteProduct":
        setShowModal(true);
        setConfigModal({
          ...configModal,
          bodyReq: "Eliminar producto?",
          tittle: "Eliminar producto",
          action: "deleteProduct",
        });
      default:
        break;
    }
  };
  React.useEffect(() => {
    productService.ListarProductos().then((data: any) => {
      const filteredData = data.filter(
        (product: any) => product.descripcion !== "hide"
      );

      setFilteredProducts(filteredData);
      setProducts(filteredData);
    });
  }, [refresh]);

  Array.isArray(filteredProducts) && filteredProducts.map((row, index) => {});
  return (
    <>
      <>
        {showMopdal && (
          <ModalList
            closeModal={() => {
              setShowModal(false);
              handleClose();
              setConfigModal({
                action: "",
                tittle: "",
                bodyReq: "",
                element: null,
              });
            }}
            action={todo}
            tittle="Eliminar material?"
            bodyReq={`eliminar?`}
            element={element}
            configModal={configModal}
          />
        )}
        <div className="reportProductosContent">
          <IonBadge> Reporte de productos</IonBadge>
          <div className="search-container">
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          <Listas></Listas>

          {/*     {Array.isArray(filteredProducts) && filteredProducts.length > 0 && (
            <TableContainer component={Paper} className="tableProductos">
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <div className="imagenesContainerProductsList">
                            {row.imagenes.map((imagen, index) => (
                              <Avatar
                                shape="square"
                                size={{
                                  xs: 24,
                                  sm: 32,
                                  md: 40,
                                  lg: 64,
                                  xl: 80,
                                  xxl: 100,
                                }}
                                icon={<VerifiedUserOutlined />}
                                key={index}
                                src={imagen.blobImage}
                                className="imgListProduct"
                                alt={`Imagen ${index}`}
                              />
                            ))}
                          </div>
                        </TableCell>

                        <TableCell>{row.descripcion}</TableCell>
      
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
                                setElement(row);
                                setConfigModal({
                                  ...configModal,
                                  element: row,
                                });
                                // Establece `anchorEl` en el elemento que activa el menú
                                setAnchorEl(e.currentTarget);
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
                                  setTodo("editProduct");
                                  setConfigModal({
                                    ...configModal,
                                    action: "editProduct",
                                  });
                                  handleAction(e, "editProduct", row);
                                  // Cierra el menú después de seleccionar la opción
                                  handleClose();
                                }}
                              >
                                Editar
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  setTodo("deleteProduct");
                                  setConfigModal({
                                    ...configModal,
                                    action: "deleteProduct",
                                  });
                                  handleAction(e, "deleteProduct", row);
                                  // Cierra el menú después de seleccionar la opción
                                  handleClose();
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
          )} */}
        </div>
      </>
    </>
  );
}
