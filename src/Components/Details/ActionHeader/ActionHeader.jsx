
const style = {
  width: "70%",
  padding: "0% 5% 0 5%",
  margin: '0 0 0 0',
  border: ''
};


export const ActionHeader = () => {
  return (
    <div className="row justify-content-center">
      <div className="d-flex flex-row" style={style}>
        <button className="btn btn-warning btn-block m-2 mb-3 text-white">Editar</button>
        <button className="btn btn-secondary btn-block m-2 mb-3">Regresar</button>
      </div>
    </div>
  );
};
