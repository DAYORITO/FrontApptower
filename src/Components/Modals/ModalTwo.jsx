// import { MdClose } from 'react-icons/md';

import { io } from "socket.io-client";
import { RowNotificactions } from "../RowNotificacions/RowNotificactions";
import "./ModalTwo.css";
import { useEffect } from "react";

export const ModalContainer = ({ children, showModal }) => {
  return (
    <div className={`modal__container `} onClick={() => showModal(false)}>
      {children}
    </div>
  );
};

export const Modal = ({ title, children, showModal, onClick, onClickForDelete, buttonDelete = false }) => {
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
                onClick={() => showModal(false)}
              >
                Cerrar
              </button>
              {
                buttonDelete ?
                  <button type="button" onClick={onClickForDelete} className="btn mb-2 btn-danger">
                    Desagregar
                  </button> : null
              }
              <button type="button" onClick={onClick} className="btn mb-2 btn-primary">
                Guardar Cambios
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalNotifications = ({ children, showModal }) => {

  return (
    <div onClick={(e) => e.stopPropagation()} className="notifications-container">
      <div
        id="verticalModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="verticalModalTitle"
      >
        <div class="modal-header">
          <h5 class="modal-title" id="defaultModalLabel">Notificaciones</h5>
          <button onClick={() => showModal(false)} type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
          <div class="list-group list-group-flush my-n3">

            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />

            <RowNotificactions />
            


          </div>
        </div>
        <div class="modal-footer">
          <button onClick={() => showModal(false)} type="button" class="btn btn-secondary btn-block " data-dismiss="modal">Clear All</button>
        </div>
      </div>
    </div>


  );
};

{
  /* <div id="verticalModal" tabindex="-1" role="dialog" aria-labelledby="verticalModalTitle">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="verticalModalTitle">Modal title</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dui urna, cursus mollis cursus vitae, fringilla vel augue. In vitae dui ut ex fringilla consectetur. Sed vulputate ante arcu, non vehicula mauris porttitor quis. Praesent tempor varius orci sit amet sodales. Nullam feugiat condimentum posuere. Vivamus bibendum mattis mi, vitae placerat lorem sagittis nec. Proin ac magna iaculis, faucibus odio sit amet, volutpat felis. Proin eleifend suscipit eros, quis vulputate tellus condimentum eget. Maecenas eget dui velit. Aenean in maximus est, sit amet convallis tortor. In vel bibendum mauris, id rhoncus lectus. Suspendisse ullamcorper bibendum tellus a tincidunt. Donec feugiat dolor lectus, sed ullamcorper ante rutrum non. Mauris vestibulum, metus sit amet lobortis fringilla, dui est venenatis ligula, a euismod sem augue vel lorem. Nunc feugiat eget tortor vel tristique. Mauris lobortis efficitur ligula, et consectetur lectus maximus sed. </div>
                            <div className="modal-footer">
                              <button type="button" className="btn mb-2 btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" className="btn mb-2 btn-primary">Save changes</button>
                            </div>
                          </div>
                        </div>
                      </div> */
}

// export const Modal = ({ title, children, showModal}) => {
//   return (
//     <div onClick={(e) => e.stopPropagation()}>

//           <div className="">
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="card-title">{title}</h5>
// 				  <button
//             type="button"
//             classNameName="modal__close"
//             onClick={() => showModal(false)}
//           >
//             x
//           </button>
//                 </div>
//                 <div className="modal-body">
//                   {children}
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn mb-2 btn-secondary"
//                     onClick={() => showModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button type="button" className="btn mb-2 btn-primary">
//                     Save changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//       ;
//     </div>
//   );
// };

//
