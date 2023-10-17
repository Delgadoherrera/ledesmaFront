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
  const [filteredProducts, setFilteredProducts] =
    React.useState<Materiales[]>(products);
  const [setMaterial, setSetMaterial] = React.useState<Materiales[]>([]);

  const dispatch = useDispatch();
  const materialResponse = new ProductServices();
  const refresh = useSelector(
    (refreshThis: any) => refreshThis.counter.refreshThis
  );
  React.useEffect(() => {
    if (refresh === true) {
      dispatch(refreshThis(false));
    }
  }, [refresh]);
  console.log("elementCombo", elementCombo);
  React.useEffect(() => {
    materialResponse.ListarProductos().then((data) => {
      console.log("MATERIALES", data);
      setSetMaterial(data);
    });
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
  // Función para obtener elementos con descripciones duplicadas
  const findDuplicateDescriptions = (elementCombo: any, setMaterials: any) => {
    const descriptionsSetMaterials = setMaterials.map((material: any) =>
      material.descripcion.toLowerCase()
    );
    const duplicateDescriptions = elementCombo.filter((element: any) =>
      descriptionsSetMaterials.includes(element.descripcion.toLowerCase())
    );
    return duplicateDescriptions;
  };

  // Llamada a la función para encontrar descripciones duplicadas
  const duplicateDescriptions = findDuplicateDescriptions(
    setMaterial,
    elementCombo
  );

  // Ahora, duplicateDescriptions contiene los elementos con descripciones duplicadas
  console.log("Elementos con descripciones duplicadas:", duplicateDescriptions);

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
      <div className="tittleComboDeMiMaterialesContainer"> Mi combo</div>
      <TableContainer component={Paper} className="tableMateriales">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>

              <TableCell align="right">Descripción</TableCell>

              <TableCell align="right">Unidad medida</TableCell>

              <TableCell align="right">Medida</TableCell>
              <TableCell align="right">

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
                  <TableCell
                    onClick={() => console.log("clic on table")}
                    align="right"
                  >
                    {row.unidadMedida.unidadMedida}
                  </TableCell>
                  <TableCell align="right">{row.medida}</TableCell>

                  <TableCell align="right">
                    <div>
                      <IonIcon
                        size="small"
                        icon={remove}
                        onClick={(e: any) => {
                          /*                           handleClick(e);
                           */ setElementCombo(row);
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
    </>
  );
}
