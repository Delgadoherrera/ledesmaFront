import React, { useState } from "react";
import { Button, Modal } from "antd";
import {
  dialogAdvText,
  dialogText,
  openAdv,
  showDialogAdv,
} from "../../features/dataReducer/dataReducer";
import { useDispatch, useSelector } from "react-redux";

const Dialog: any = () => {
  const showDialog = useSelector(openAdv);
  const [isModalOpen, setIsModalOpen] = useState(showDialog);
  const dispatch = useDispatch();
  const message = useSelector(dialogAdvText);

  console.log("shwodialog", showDialog);
  const showModal = () => {
    dispatch(showDialogAdv(false));
  };

  const handleOk = () => {
    dispatch(showDialogAdv(false));
  };

  const handleCancel = () => {
    dispatch(showDialogAdv(false));
  };

  return (
    <>
      <Modal
        title="Ups..."
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p> {message}..</p>
      </Modal>
    </>
  );
};

export default Dialog;
