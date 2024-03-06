// import { MdClose } from 'react-icons/md';

import { io } from "socket.io-client";
import { RowNotificactions } from "../RowNotificacions/RowNotificactions";
import "./ModalTwo.css";
import { useEffect, useState } from "react";
import { NotificationsAlert } from "../NotificationsAlert/NotificationsAlert";
import { useAllowedPermissionsAndPrivileges } from "../../Hooks/useFetch";
import { idToPermissionName, idToPrivilegesName } from "../../Hooks/permissionRols";

export const ModalContainer = ({ children, showModal }) => {
  return (
    <div className={`modal__container `} onClick={() => showModal(false)}>
      {children}
    </div>
  );
};

export const Modal = ({ title, showSave = true, children, showModal, onClick, onClickClose, onClickForDelete, buttonDelete = false }) => {

  const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    try {
      await onClick(e);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div onClick={(e) => e.stopPropagation()} className="divModal__Container">
      <div
        id="verticalModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="verticalModalTitle"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="verticalModalTitle">
                {title}
              </h5>
              <button
                type="button"
                className="modal__close"
                onClick={() => showModal(false)}
              >
                <i className="fe fe-16 fe-x"></i>
              </button>
            </div>
            <div className="modal-body" style={{ overflow: 'hidden', overflowY: "auto", maxHeight: "30rem" }}>
              {children}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn mb-2 btn-secondary"
                onClick={() => { showModal(false); }}
              >
                Cerrar
              </button>


              {

                allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Listar') ?
                  onClickForDelete ?
                    <button type="button" onClick={onClickForDelete} className="btn mb-2 btn-danger">
                      Desagregar
                    </button> : null
                  : null

              }
              {
                showSave ?
                  loading ? (
                    <button className="btn mb-2 btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...
                    </button>
                  ) : (
                    <button type="button" onClick={handleClick} className="btn mb-2 btn-primary">
                      Guardar Cambios
                    </button>
                  ) : null
              }



            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export const ModalNotifications = ({ showModal, userId, children }) => {


  return (
    <div onClick={(e) => e.stopPropagation()} className="notifications-container">
      <div
        id="verticalModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="verticalModalTitle"
      >
        <div className="modal-header notifications-modal">
          <h5 className="modal-title" id="defaultModalLabel">Notificaciones</h5>
          <button onClick={() => showModal(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body notifications-modal-body">
          <div className="list-group list-group-flush my-n3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};




export const ModalImg = ({ img, title, showModal }) => {


  return (

      <div className="modal-content-img">
        <div className="modal-header">
          <h5 className="modal-title" id="verticalModalTitle">
            {title}
          </h5>
          <button
            type="button"
            className="modal__close"
            onClick={() => showModal(false)}
          >
            <i className="fe fe-16 fe-x"></i>
          </button>
        </div>
        <div className="modal-body" style={{ overflow: 'hidden', overflowY: "auto", maxHeight: "30rem" }}>
          <img src={img}></img>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn mb-2 btn-secondary"
            onClick={() => { showModal(false); }}
          >
            Cerrar
          </button>

        </div>
      </div>
  );
};
