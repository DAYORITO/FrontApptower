import React from "react";
import { Details } from "../../Components/Details/details";
import { InfoDetails } from "../../Components/InfoDetails/InfoDetails";
import "./finesDetails.css";
import { useNavigate, useParams } from "react-router";
import ImageContainer from "../../Components/ImgContainer/imageContainer";

const FinesDetail = () => {
  const { details } = useParams();
  const objeto = JSON.parse(decodeURIComponent(details));
  console.log(objeto, "objeto");
  const navigate = useNavigate();
  return (
    <>
      <Details>
        <InfoDetails>
          <div className="header">
            <h3>Detalles de la Multa</h3>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
                if (regresar) regresar();
              }}
              class="btn btn-light"
            >
              Regresar
            </button>
          </div>
          <div className="divider"></div>
          <div className="body">
            <div>
              <p>
                <strong className="text-secondary">Tipo de multa: </strong>
                {objeto.fineType}
              </p>
              <p>
                <strong className="text-secondary">Apartamento:</strong>{" "}
                {objeto.apartment.apartmentName}
              </p>
              {/* <p><strong className='text-secondary'>Visitante: </strong>{objeto.asociatedVisitor.name+" "+objeto.asociatedVisitor.lastname}</p> */}
              <p>
                <strong className="text-secondary">Fecha de incidente: </strong>
                {(() => {
                  let startingDate = new Date(
                    objeto.incidentDate
                  ).toLocaleDateString("es-CO", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  return startingDate;
                })()}
              </p>
              <div className="header">
                <p>
                  <strong className="text-secondary">Fecha de salida: </strong>
                  {objeto.paymentDate == null
                    ? "Sin registrar"
                    : (() => {
                        let departureDate = new Date(
                          objeto.paymentDate
                        ).toLocaleDateString("es-CO", {
                          weekday: "long",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        });
                        return departureDate;
                      })()}
                </p>
              </div>
              <p>
                <strong className="text-secondary">Estado: </strong>
                {objeto.state}
              </p>
              <p>
                <strong className="text-secondary">Detalles: </strong>
                {objeto.details}
              </p>
              <p>
                <strong className="text-secondary">Valor: </strong>
                {objeto.amount}
              </p>
              <p>
                <strong className="text-secondary">
                  Fecha de creacion de multa
                </strong>
              </p>
              <p>
                <strong className="text-secondary">
                  Fecha de creacion de multa:{" "}
                </strong>
                {(() => {
                  let createdAt = new Date(objeto.createdAt).toLocaleDateString(
                    "es-CO",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  );
                  return createdAt;
                })()}
              </p>
                <p>
                    <strong className="text-secondary">
                    Responsable de la multa:
                    </strong>
                    {objeto.user.name+" "+objeto.user.lastName}
                </p>
            </div>
            <div className="containerImage">
              <p><strong>Evidencias</strong></p>
              <div className="fileContainer">
                <ImageContainer urls={objeto.evidenceFiles}></ImageContainer>
              </div>
              
              <p>Comprobante de pago</p>
              <div className="fileContainer">
                <ImageContainer urls={objeto.paymentproof}></ImageContainer>
              </div>
            </div>
          </div>
        </InfoDetails>
      </Details>
    </>
  );
};

export default FinesDetail;
