import React, { useEffect, useState } from 'react'

import { Details } from "../../../Components/Details/details"
import Inputs from '../../../Components/Inputs/Inputs'
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { statusList } from "../../../Hooks/consts.hooks"
import { TablePerson } from '../../../Components/Tables/Tables'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { ButtonGoTo, SearchButton } from "../../../Components/Buttons/Buttons"
import { DetailsActions } from "../../../Components/DetailsActions/DetailsActions"
import { useFetchget, useFetchgetById } from "../../../Hooks/useFetch"
import { Dropdownanchor, Dropdownanchor2 } from "../../../Components/DropDownAnchor/Dropdownanchor"
import { ContainerModule } from "../../../Components/ContainerModule/ContainerModule"
import { DropdownInfo } from "../../../Components/DropdownInfo/DropdownInfo"
import { Acordions } from "../../../Components/Acordions/Acordions"
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { NotificationsAlert } from "../../../Components/NotificationsAlert/NotificationsAlert"
import { ModalContainer, Modal } from "../../../Components/Modals/ModalTwo"

import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { format } from 'date-fns';

export const ResidentDetail = () => {

  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index) => {
    setToggleState(index)
  };

  return (


    <Details>

      <InfoDetails>


        {/* <ContainerModule name={`Residente`}  >

          <Dropdownanchor2 name={"Editar residente"} icon={"edit"} onClick={(e) => {
            e.preventDefault();
            handleModal(apartment);
          }} />



        </ContainerModule> */}

        <Acordions>

          <DropdownInfo name={"Informacion personal"} to1="/admin/owners/create">

            <Dropdownanchor name={"Emmanuel"} />
            <Dropdownanchor name={"Tabares Ortiz"} />
            <Dropdownanchor name={""} />
            <Dropdownanchor name={"Emmanuel"} />
            <Dropdownanchor name={"Emmanuel"} />
            <Dropdownanchor name={"Emmanuel"} />

          </DropdownInfo>



        </Acordions>
        <div class="col-auto back" >
          <Link to={"/admin/residents/"} type="button" class="btn btn-sm btn-secondary">Regresar</Link>
        </div>

      </InfoDetails>

      <ListsDetails>
        <NavDetails>

          <NavListDetails index={1} name={"Apartamentos"} toggleState={toggleState} onClick={() => toggleTab(1)} />

        </NavDetails>

        <TableDetails index={1} toggleState={toggleState} >

          <TablePerson>


            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />
            <RowNotificactions />


          </TablePerson>
        </TableDetails>




      </ListsDetails>
    </Details >)
}
