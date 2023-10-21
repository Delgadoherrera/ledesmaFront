import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductServices } from "../../Services/ProductService";
import { Compras, Materiales } from "../../interfaces/index";
import { IonIcon, IonNote } from "@ionic/react";
import { menu, options, optionsOutline, optionsSharp } from "ionicons/icons";
import { Button } from "primereact/button";
import { Input, Menu, MenuItem, Select } from "@mui/material";
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
  const [search, setSearch] = React.useState("");
  const [filteredProducts, setFilteredProducts] =
    React.useState<Compras[]>(products);
  const [selectedMonth, setSelectedMonth] = React.useState("allYear"); // Estado para el mes seleccionado
  const [selectedYear, setSelectedYear] = React.useState("allYears");

  const handleYearChange = (event: any) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    filterProductsByMonth(selectedMonth, selectedYear);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    // Filtrar los productos en base al término de búsqueda
    const filtered = searchTerm
      ? products.filter(
          (product) =>
            product.catalogo_material.descripcion
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.idCompra
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      : products;

    setFilteredProducts(filtered); // Update the filtered products here
    setSelectedMonth("");
    calcularGastoDelMes();
  };
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
  const filterProductsByMonth = (month: any, year: any) => {
    if (month === "allYear" && year === "allYears") {
      // Si no se ha seleccionado un mes ni un año, muestra todos los productos
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product: any) => {
        const cotizacionDate = new Date(product.fecha);
        const cotizacionMonth = cotizacionDate.getMonth();
        const cotizacionYear = cotizacionDate.getFullYear();

        const isMonthMatch = month === "allYear" || cotizacionMonth === month;
        const isYearMatch =
          year === "allYears" || cotizacionYear === parseInt(year);

        return isMonthMatch && isYearMatch;
      });

      setFilteredProducts(filtered);
    }
  };
  // Manejar el cambio de mes seleccionado
  const handleMonthChange = (event: any) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    filterProductsByMonth(selectedMonth, selectedYear); // También pasa el año
  };

  const calcularGastoDelMes = () => {
    let totalExpense = 0;
    Array.isArray(filteredProducts) &&
      filteredProducts.forEach((product: any) => {
        // Verificar que precioPesos sea un número
        const price = parseFloat(product.precioPesos);
        if (!isNaN(price)) {
          totalExpense += price;
        }
      });

    // Formatear el número a dos decimales sin ceros a la izquierda
    return totalExpense.toFixed(2);
  };
  React.useEffect(() => {
    productService.ListarItemCosto().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
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
      <div className="search-container">
        <Input
          type="text"
          placeholder="Buscar en compras..."
          value={search}
          onChange={handleSearch}
        />
        {(selectedMonth === "allYear" && (
          <div className="containerGastoMes">
            <IonNote>Total: ${calcularGastoDelMes()}</IonNote>
          </div>
        )) ||
          (selectedMonth === "" && (
            <div className="containerGastoMes">
              <IonNote>Total: ${calcularGastoDelMes()}</IonNote>{" "}
            </div>
          ))}

        {selectedMonth !== "allYear" && selectedMonth !== "" ? (
          <div className="containerGastoMes">
            <IonNote>Total: ${calcularGastoDelMes()}</IonNote>{" "}
          </div>
        ) : null}
        <Select
          className="selectYearContainer"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Seleccionar año"
        >
          <MenuItem value="allYears">Todos los años</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
        </Select>
        <Select
          className="selectMonthContainer"
          value={selectedMonth}
          onChange={handleMonthChange}
          placeholder="Seleccionar mes"
        >
          <MenuItem value="allYear">Todos los meses</MenuItem>
          <MenuItem value={0}>Enero</MenuItem>
          <MenuItem value={1}>Febrero</MenuItem>
          <MenuItem value={2}>Marzo</MenuItem>
          <MenuItem value={3}>Abril</MenuItem>
          <MenuItem value={4}>Mayo</MenuItem>
          <MenuItem value={5}>Junio</MenuItem>
          <MenuItem value={6}>Julio</MenuItem>
          <MenuItem value={7}>Agosto</MenuItem>
          <MenuItem value={8}>Septiembre</MenuItem>
          <MenuItem value={9}>Octubre</MenuItem>
          <MenuItem value={10}>Noviembre</MenuItem>
          <MenuItem value={11}>Diciembre</MenuItem>

          {/* Agregar el resto de los meses */}
        </Select>
      </div>
      <TableContainer component={Paper} className="tableCompras">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>

              <TableCell>Costo</TableCell>
              <TableCell>Concepto</TableCell>

              <TableCell>Detalle</TableCell>
              <TableCell>Valor ARS</TableCell>

              {/*      <TableCell >
                <IonIcon icon={options}></IonIcon>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredProducts) &&
              filteredProducts.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.fecha}</TableCell>

                  <TableCell>{row.catalogo_costo.costo}</TableCell>
                  {/*                   <TableCell component="th" scope="row" >
                    {row.unidades}
                  </TableCell> */}

                  <TableCell>{row.catalogo_costo.concepto}</TableCell>

                  <TableCell>{row.detalle}</TableCell>

                  <TableCell onClick={() => console.log("clic on table")}>
                    {row.valor}
                  </TableCell>
                  {/*                   <TableCell >
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
