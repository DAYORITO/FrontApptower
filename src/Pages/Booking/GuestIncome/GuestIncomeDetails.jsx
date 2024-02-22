import React from 'react';
import { Details } from "../../../Components/Details/details"
import { InfoDetails } from '../../../Components/InfoDetails/InfoDetails';
import { Acordions } from '../../../Components/Acordions/Acordions';
import { DropdownInfo } from '../../../Components/DropdownInfo/DropdownInfo';
import { useFetch } from '../../../Hooks/useFetch';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from "react";
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ContainerModule } from '../../../Components/ContainerModule/ContainerModule';

const GuestIncomeDetails = () => {
    const { details } = useParams();
    const objeto = JSON.parse(decodeURIComponent(details));
    console.log(objeto, 'objeto');

  return (
    <>
      <Details>
        <ContainerModule title="Detalles del ingreso"
            icon='corner-up-right'
            A1='Datos del ingreso'
        
        />
        <InfoDetails>
            <Acordions>
                <DropdownInfo name="Datos del ingreso">
                    <ul>
                        <li>Apartamento: {objeto.asociatedApartment.apartmentName}</li>
                        <li>Visitante: {objeto.asociatedVisitor.name+" "+objeto.asociatedVisitor.lastname}</li>
                        <li>Fecha de ingreso: {objeto.startingDate}</li>
                        <li>Fecha de salida: {objeto.departureDate == null ? "Sin registrar" : objeto.departureDate}</li>
                        <li>observaciones: {objeto.observations}</li>
                        <li>Persona que permitio el acceso: {objeto.personAllowsAccess}</li>
                        
                    </ul>
                    
                    

                </DropdownInfo>

            </Acordions>
        </InfoDetails>
      </Details>
    </>
  );
};

export default GuestIncomeDetails;