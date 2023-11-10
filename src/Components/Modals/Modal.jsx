

function ModalContainer({onClose}) {
  return (
    <>
      <div class="card shadow">
        <div class="card-body">
          <p class="card-title">
            <strong>Default Modal</strong>
          </p>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            class="btn mb-2 btn-primary"
          >
            {" "}
            Launch demo modal{" "}
          </button>
          {/* <!-- Modal --> */}
          <div
            class="modal fade"
            id="defaultModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="defaultModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="defaultModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  dui urna, cursus mollis cursus vitae, fringilla vel augue. In
                  vitae dui ut ex fringilla consectetur. Sed vulputate ante
                  arcu, non vehicula mauris porttitor quis. Praesent tempor
                  varius orci sit amet sodales. Nullam feugiat condimentum
                  posuere. Vivamus bibendum mattis mi, vitae placerat lorem
                  sagittis nec. Proin ac magna iaculis, faucibus odio sit amet,
                  volutpat felis. Proin eleifend suscipit eros, quis vulputate
                  tellus condimentum eget. Maecenas eget dui velit. Aenean in
                  maximus est, sit amet convallis tortor. In vel bibendum
                  mauris, id rhoncus lectus. Suspendisse ullamcorper bibendum
                  tellus a tincidunt. Donec feugiat dolor lectus, sed
                  ullamcorper ante rutrum non. Mauris vestibulum, metus sit amet
                  lobortis fringilla, dui est venenatis ligula, a euismod sem
                  augue vel lorem. Nunc feugiat eget tortor vel tristique.
                  Mauris lobortis efficitur ligula, et consectetur lectus
                  maximus sed.{" "}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn mb-2 btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button type="button" class="btn mb-2 btn-primary" >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalContainer;
