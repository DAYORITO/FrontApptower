import { Actions } from "../../../Components/Actions/Actions"
import { BigCard } from "../../../Components/BigCard/BigCard"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import Cookies from 'js-cookie'
import { idToPermissionName, idToPrivilegesName } from '../../../Hooks/permissionRols'
import { useEffect, useState } from "react"

import { useFetch, useFetchget } from '../../../Hooks/useFetch'
import { RowNotificactions } from "../../../Components/RowNotificacions/RowNotificactions"
import { Row } from "../../../Components/Rows/Row"


import { filter } from "../../../Helpers/Helpers"



export const Towers = () => {





    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"


    // Get Data

    const { data: towers, get: getTowers } = useFetch(url)

    useEffect(() => {

        getTowers('towers')

    }, [])


    // Funtionality to search


    const [search, setSearch] = useState('');

    let towerList = filter(search, towers?.data?.towers, "towerName")


    // towerList = towerList.sort((a, b) => a.idApartment - b.idApartment);

    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }

    console.log(towerList)




    return (
        <>
            <ContainerTable
                title='Bloques residenciales'
                buttonToGo={<ButtonGoTo value='Nuevo bloque' href='create' />}
                search={<SearchButton value={search} onChange={searcher} placeholder='Buscar bloque' />} >


                    <TablePerson>
                        <ContainerCard>

                            {towerList?.map(tower => (
                                <BigCard
                                    title={tower.towerName}
                                    img={tower.towerImg}
                                    A1={`Apartamentos: ${tower.apartments}`}
                                    status={tower.status}
                                    to={`/admin/apartments/`}

                                >
                                    <Actions href={`/admin/apartments/create/${tower.idTower}`} accion='Agregar apartamentos' icon="home" />
                                </BigCard>
                            ))}

                        </ContainerCard>


                    </TablePerson>

                </ContainerTable >

        </>
    )
}
