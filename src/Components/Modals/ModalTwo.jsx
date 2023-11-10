// import { MdClose } from 'react-icons/md';

import "./ModalTwo.css";

export const ModalContainer = ({ children, ShowModal }) => {
  return (
    <div className={`modal__container `} onClick={() => ShowModal(false)}>
      {children}
    </div>
  );
};

export const Modal = ({ title, children, showModal }) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div class="">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="card-title">{title}</h5>
              <button
                type="button"
                className="modal__close"
                onClick={() => showModal(false)}
              >
                x
              </button>
            </div>
            <div class="modal-body">{children}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn mb-2 btn-secondary"
                onClick={() => showModal(false)}
              >
                Close
              </button>
              <button type="button" class="btn mb-2 btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// export const Modal = ({ title, children, showModal}) => {
//   return (
//     <div onClick={(e) => e.stopPropagation()}>
     
//           <div class="">
//             <div class="modal-dialog">
//               <div class="modal-content">
//                 <div class="modal-header">
//                   <h5 class="card-title">{title}</h5>
// 				  <button
//             type="button"
//             className="modal__close"
//             onClick={() => showModal(false)}
//           >
//             x
//           </button>
//                 </div>
//                 <div class="modal-body">
//                   {children}
//                 </div>
//                 <div class="modal-footer">
//                   <button
//                     type="button"
//                     class="btn mb-2 btn-secondary"
//                     onClick={() => showModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button type="button" class="btn mb-2 btn-primary">
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

// {title && (
// 	<div className="modal__header">
// 	  <h2 className="modal__title">{title}</h2>
// 	</div>
//   )}
//   <div className={`modal__content ${props?.className}`}>{children}</div>
 {/* <button className="modal__close" onClick={() => showModal(false)}>
        
      </button>
      {title && (
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
        </div>
      )}
      <div className={`modal__content ${props?.className}`}>{children}</div>
	   */}