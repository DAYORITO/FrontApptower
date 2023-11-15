
const style = {
  width: "70%",
  padding: "0 1% 0 1%",
  border: ''
};


export const ActionHeader = () => {
  return (
    <div className="row justify-content-center">
      <div className="d-flex flex-row justify-content-center" style={style}>
        <button className="circle btn btn-secondary fe fe-arrow-left m-2"></button>
        <button className="circle btn btn-warning fe fe-edit m-2 text-white"></button>
      </div>
    </div>
  );
};
