import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonBase } from "@mui/material";
import { IonItem } from "@ionic/react";
import { ProductServices } from "../../Services/ProductService";
import EditMaterial from "../gestiones/EditarMaterial";
import CompraMateriales from "../gestiones/CompraMateriales";
import { refreshThis } from "../../features/dataReducer/dataReducer";
import { useDispatch } from "react-redux";
import EditCost from "../gestiones/EditCost";
import EditProduct from "../gestiones/EditProduct";
import { Modal } from "antd";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalList({
  closeModal,
  action,
  tittle,
  bodyReq,
  element,
  configModal,
}: {
  closeModal: (value: any) => void;
  configModal: any;
  action: string;
  tittle: string;
  bodyReq: string;
  element: any;
}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    closeModal(false);
    setOpen(false);
  };
  const materials = new ProductServices();
  const dispatch = useDispatch();

  console.log("ELEMENT MODAL", action);

  const handleActions = async (j: any) => {
    if (j === "accept") {
      switch (action) {
        case "deleteMaterial":
          console.log("deleteMaterial:", element, "action:", action);
          try {
            const response = materials.eliminarMaterial(element.id);
            console.log("response", response);
            dispatch(refreshThis(true));
            closeModal(false);
          } catch (err) {
            console.log("err", err);
          }
          break;
        case "deleteCost":
          console.log("deleteCost:", element, "action:", action);
          try {
            const response = materials.EliminarCosto(element.id);
            console.log("response", response);
            dispatch(refreshThis(true));
            closeModal(false);
          } catch (err) {
            console.log("err", err);
          }
          break;

        case "deleteProduct":
          console.log("deleteProduct:", element, "action:", action);
          try {
            const response = await materials.EliminarProducto(element.id);
            console.log("RESPONSE", response);
            response.status === 200 && dispatch(refreshThis(true));
            closeModal(false);
          } catch (err) {
            console.log("err", err);
          }
          break;

        default:
          break;
      }
    }
  };
  return (
    <div>
      <Modal
        title=""
        open={open}
        onOk={handleActions}
        onCancel={handleClose}
        footer={null}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {configModal.tittle}
        </Typography>
        {configModal.action === "editMaterial" && (
          <EditMaterial
            id={configModal.element.id}
            handleClose={handleClose}
            element={element}
          />
        )}

        {configModal.action === "buyMaterial" && (
          <CompraMateriales
            id={configModal.element.id}
            handleClose={handleClose}
            element={element}
          />
        )}

        {configModal.action === "editCost" && (
          <EditCost
            id={configModal.element.id}
            handleClose={handleClose}
            element={element}
          />
        )}
        {configModal.action === "editProduct" && (
          <EditProduct
            id={element.id}
            handleClose={handleClose}
            element={element}
          />
        )}
        {configModal.action === "deleteMaterial" && (
          <>
            <Button onClick={(e) => handleActions("accept")}>Aceptar</Button>

            <Button onClick={() => closeModal(false)}>Cancelar</Button>
          </>
        )}

        {configModal.action === "deleteMaterial" ||
          (configModal.action === "deleteCost" && (
            <>
              <Button onClick={(e) => handleActions("accept")}>Aceptar</Button>

              <Button onClick={() => closeModal(false)}>Cancelar</Button>
            </>
          ))}

        {configModal.action === "deleteProduct" && (
          <>
            <Button onClick={(e) => handleActions("accept")}>Aceptar</Button>

            <Button onClick={() => closeModal(false)}>Cancelar</Button>
          </>
        )}
      </Modal>
    </div>
  );
}
