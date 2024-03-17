import React from "react";
import "./RowNotificatios.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import moment from "moment";

export const RowNotificactions = ({
  to = "",
  type = "info",
  name,
  lastName,
  msg = "Aqui va el mensaje",
  date,
  status,
  icon = "message-circle",
  onclick,
  seen = true,
  isNotification = false,
  who,
  img,
  info,
  toOpen = false,
}) => {
  let personWho = who?.name + " " + who?.lastName + " ";

  moment.locale("es");

  to = to?.owner
    ? `/admin/owners/details/${to?.owner?.idOwner}`
    : to?.resident && to.fine
      ? `/admin/fines/details/${to.fine?.idFines}`
      : to?.guest_income && to?.resident
        ? `/admin/guest_income/details/${to.guest_income?.idGuest_income}`
        : to?.booking && to?.resident
          ? `/admin/booking/details/${to.booking.idbooking}`
          : to?.resident
            ? `/admin/resident/details/${to.resident.iduser}`
            : to?.apartment
              ? `/admin/apartments/details/${to.apartment.idApartment}`
              : to?.fine
                ? `/admin/fines/details/${to.fine?.idFines}`
                : to?.guest_income
                  ? `/admin/guest_income/details/${to.guest_income?.idGuest_income}`
                  : to?.space
                    ? `/admin/spaces/`
                    : to?.idrole == 2
                      ? `/admin/resident/details/${to.iduser}`
                      : to?.idrole == 1
                        ? `/admin/users/details/${to.iduser}`
                        : to?.idrole == 3
                          ? `/admin/watchman/details/${to.iduser}`
                          : to;

  const handleLinkClick = (event) => {
    event.preventDefault();
    window.open(to, "_blank");

    if (onclick) {
      onclick();
    }
  };
  return (
    <Link to={toOpen ? "" : to} onClick={onclick}>
      <div
        className={`list-group-item notification hoverable`}
        onClick={toOpen ? handleLinkClick : ""}
      >
        <div className="row">
          <div className="col-auto">
            <div className="circle circle-sm">
              {typeof img === "string" ? (
                img.endsWith(".jpg") ||
                  img.endsWith(".jpeg") ||
                  img.endsWith(".png") ? (
                  <img src={img} className="userImg" alt="User Logo" />
                ) : (
                  <i className="mt-4 fe fe-24 fe-file-text"></i>
                )
              ) : (
                <span class={`fe fe-${icon} fe-24 text-muted`}></span>
              )}
            </div>

            {["Active", "Activo"].includes(status) ? (
              <span className="dot dot-md bg-success mr-1"></span>
            ) : status === "Inactivo" ? (
              <span className="dot dot-md bg-danger mr-1"></span>
            ) : (
              <span className={`dot dot-md bg-${type} mr-1`}></span>
            )}
          </div>
          <div className="col">
            <small>
              <strong>{name && `${name} ${lastName}`}</strong>
            </small>
            <div className="text-secondary small">
              {who && <strong>{personWho}</strong>}
              {msg}
            </div>
            <small className={`badge badge-light text-${type}`}>
              {date ? moment(date).format("MMMM Do") : ""} {info && info}
            </small>
          </div>
        </div>

        {isNotification && (
          <div className="d-flex justify-content-end">
            {seen ? (
              <span className="fe fe-check-circle text-info"></span>
            ) : (
              <span className="fe fe-check text-secondary"></span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
