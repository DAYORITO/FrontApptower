import React from 'react';
import "./RowNotificatios.css";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import moment from 'moment';

export const RowNotificactions = ({
  name,
  lastName,
  msg = "Aqui va el mensaje",
  date = "Hoy",
  status,
  icon = "message-circle",
  onclick
}) => {

  moment.locale('es');

  date = moment(date);



  return (

    <Link>
      <div className="list-group-item notification hoverable" onClick={onclick}>
        <div className="row">
          <div className="col-auto">
            <div className="circle mt-3">
              <span className={`fe fe-${icon} fe-24 text-muted`}></span>
            </div>

            {['Active', 'Activo'].includes(status)
              ? <span className="dot dot-md bg-success mr-1"></span>
              : status !== 'Inactivo'
                ? <span className="dot dot-md bg-info mr-1"></span>
                : <span className="dot dot-md bg-danger mr-1"></span>

            }

          </div>
          <div className="col">
            <small><strong>{name && `${name} ${lastName}`}</strong></small>
            <div className=" text-secondary small">{msg}</div>
            <small className="badge badge-light text-info">{date.format('MMMM Do')}</small>
          </div>
        </div>
      </div>
    </Link>

  );
}
