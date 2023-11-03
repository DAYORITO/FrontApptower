

const IngresoRow = ({ data }) => {
    return (
      <tr>
        <td>{data.visitante}</td>
        <td>{data.autoriza}</td>
        <td>{data.vehiculo}</td>
        <td>{data.fecha}</td>
        <td>{data.estado}</td>
      </tr>
    );
  };

export default IngresoRow;