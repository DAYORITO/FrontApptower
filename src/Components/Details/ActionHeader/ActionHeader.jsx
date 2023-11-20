
const style = {
  width: "70%",
  padding: "0% 5% 0 5%",
  margin: '0 0 0 0',
  border: ''
};

const stylerow = {
  marginLeft: "0",
  marginRight: "0"
}
export const ActionHeader = () => {
  return (
    <div className="row justify-content-center" style={stylerow}>
      <div className="d-flex " style={style}>
        <button className="btn btn-warning btn-block m-2 mb-3 text-white">Editar</button>
        <button className="btn btn-secondary btn-block m-2 mb-3">Regresar</button>
      </div>
    </div>
  );
};
