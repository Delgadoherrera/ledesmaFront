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
import { menu, options, optionsOutline, optionsSharp } from "ionicons/icons";
import { Button } from "primereact/button";
import { Menu, MenuItem } from "@mui/material";
import ModalList from "./Modals";

export default function BasicTable({
  closeModal,
}: {
  closeModal: (value: any) => void;
}) {
  const [products, setProducts] = React.useState<Materiales[]>([]); // Especifica el tipo Product[]
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showMopdal, setShowModal] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [element, setElement] = React.useState<Materiales | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("element", element);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const productService = new ProductServices();

  const handleAction = (e: any, action: any, element: Materiales) => {
    switch (action) {
      case "deleteMaterial":
        setElement(element); // Almacena el elemento a eliminar
        setShowModal(true);
        break;
      default:
        break;
    }
  };
  console.log("products", products);
  React.useEffect(() => {
    productService.ListarProductos().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <>
      {showMopdal && (
        <ModalList
          closeModal={setShowModal}
          action={todo}
          tittle="Eliminar material?"
          bodyReq={`eliminar?`}
          element={element}
        />
      )}

      <TableContainer component={Paper} className="tableMateriales">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>

              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Medida</TableCell>
              <TableCell align="right">Unidad medida</TableCell>
              <TableCell align="right">
                <IonIcon icon={options}></IonIcon>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) &&
              products.map((row,index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.descripcion}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.medida}</TableCell>
                  <TableCell
                    onClick={() => console.log("clic on table")}
                    align="right"
                  >
                    {row.unidadMedida}
                  </TableCell>
                  <TableCell align="right">
                    <Button>
                      <div>
                        <IonIcon
                          onClick={(e: any) => handleClick(e)}
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
                          <MenuItem onClick={handleClose}>Editar</MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setTodo("deleteMaterial");
                              handleAction(e, "deleteMaterial", row);
                            }}
                          >
                            Eliminar
                          </MenuItem>
                        </Menu>
                      </div>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
