import React from 'react';
import "./RowNotificatios.css";
import { Link } from 'react-router-dom';

export const RowNotificactions = ({
  name = "Nombre",
  lastName = "Apellido",
  msg = "Aqui va el mensaje",
  date = "Hoy",
  status = "Active",
  icon = "message-circle"
}) => {
  return (

    <Link to={"details"}>
      <div className="list-group-item notification">
        <div className="row">
          <div className="col-auto">
            <div className="circle circle-sm mt-3">
              <span className={`fe fe-${icon} fe-24 text-muted`}></span>
            </div>

            {['Active', 'Activo'].includes(status)
              ? <span className="dot dot-md bg-success mr-1"></span>
              : <span className="dot dot-md bg-danger mr-1"></span>}

          </div>
          <div className="col">
            <small><strong>{`${name} ${lastName}`}</strong></small>
            <div className="my-0 text-muted small">{msg}</div>
            <small className="badge badge-light text-muted">{date}</small>
          </div>
        </div>
      </div>  
    </Link>

  );
}
