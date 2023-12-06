import "./ModalTwo.css";

export const ModalContainerload = ({ children, ShowModaload }) => {
  return (
    <div className={`modal__container `} onClick={() => ShowModaload(false)}>
      {children}
    </div>
  );
};

export const Modaload = ({ title, children, showModal, onClick }) => {
  return (
    <div className="divModal__Container">
      <div
        id="verticalModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="verticalModalTitle"
      >
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
