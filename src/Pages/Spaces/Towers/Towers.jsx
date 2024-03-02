import { Actions } from "../../../Components/Actions/Actions"
import { BigCard } from "../../../Components/BigCard/BigCard"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { useEffect, useState } from "react"

import { useAllowedPermissionsAndPrivileges, useFetch } from '../../../Hooks/useFetch'


import { usePaginator, filter, postRequest, useUserLogged } from '../../../Helpers/Helpers'
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo"
import { createPortal } from "react-dom"


import Inputs from '../../../Components/Inputs/Inputs'
import { statusList } from "../../../Hooks/consts.hooks"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { Uploader } from "../../../Components/Uploader/Uploader"

import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { Spinner } from "../../../Components/Spinner/Spinner"
import { idToPermissionName, idToPrivilegesName } from "../../../Hooks/permissionRols"

import Cookies from 'js-cookie'
import { Paginator } from "../../../Components/Paginator/Paginator"
import { set } from "date-fns"



export const Towers = () => {
    const token = Cookies.get('token');

    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Tower information

    const [towerImg, setTowerImg] = useState('');
    const [idTower, setIdTower] = useState('');
    const [towerName, setTowerName] = useState('');
    const [status, setStatus] = useState('');

    const [isEditTower, setIsEditTower] = useState(true);
    const [towerFormModal, setTowerFormModal] = useState(false);
    const [errorList, setErrorList] = useState([]);


    const openTowerModalForm = (data) => {

        setErrorList('')
        console.log(data)

        if (data == null) {

            setIsEditTower(false)
            setIdTower('')
            setTowerImg('')
            setTowerName('')
            setStatus('')


        } else {

            setIsEditTower(true)
            setIdTower(data.idTower)
            setTowerImg(data.towerImg)
            setTowerName(data.towerName)
            setStatus(data.status)

        }


        setTowerFormModal(true)

    }


    // Get Data

    const { data: towers, get: getTowers, loading } = useFetch(url)

    //Consulta Privilegios

    const allowedPermissions = useAllowedPermissionsAndPrivileges(idToPermissionName, idToPrivilegesName);


    useEffect(() => {

        getTowers('towers')

    }, [])


    // Funtionality to search


    const [search, setSearch] = useState('');

    let towerList = filter(search, towers?.data?.towers, "towerName")

    towerList = towerList.sort((a, b) => a.idTower - b.idTower);


    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }


    const updateTower = async (event) => {

        const data = {

            idTower: idTower,
            towerName: towerName,
            towerImg: towerImg,
            status: status

        }

        console.log("edit data", data)

        await postRequest(event, 'towers', 'PUT', setTowerFormModal, data, url, setErrorList, null, null)
        getTowers('towers')

    };

    const createTower = async (event) => {

        const data = {

            towerName: towerName,
            towerImg: towerImg,

        }

        await postRequest(event, 'towers', 'POST', setTowerFormModal, data, url, setErrorList, null, null, null)
        getTowers('towers')

    };


    //paginator

    const { totalPages, currentPage, nextPage, previousPage, filteredData: towerInfo } = usePaginator(towerList, 8);



    return (
        <>
            <ContainerTable
                title='Bloques residenciales'
                buttonToGo={
                    allowedPermissions['Apartamentos'] && allowedPermissions['Apartamentos'].includes('Crear')
                        ? <ButtonGoTo value='Nuevo bloque' onClick={() => openTowerModalForm(null)} />
                        : null
                }

                search={<SearchButton value={search} onChange={searcher} placeholder='Buscar bloque' />}
                showPaginator={<Paginator totalPages={totalPages} currentPage={currentPage} nextPage={nextPage} previousPage={previousPage} />}

            >


                <TablePerson>
                    <ContainerCard>

                        {loading ? <Spinner /> : towerList.length == 0 || currentPage >= totalPages ?

                            <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :


                            towerInfo()?.map(tower => (
                                <BigCard
                                    title={tower.towerName}
                                    img={tower.towerImg}
                                    A1={`Apartamentos: ${tower.apartments}`}
                                    status={tower.status}
                                    to={`/admin/apartments/${tower.idTower}`}

                                >
                                    <Actions href={`/admin/apartments/create/${tower.idTower}`} accion='Agregar apartamentos' icon="home" />
                                    <Actions onClick={() => openTowerModalForm(tower)} accion='Editar bloque' icon="edit" />

                                </BigCard>
                            ))}

                    </ContainerCard>


                </TablePerson>

            </ContainerTable >

            {towerFormModal &&
                createPortal(
                    <>
                        <ModalContainer showModal={setTowerFormModal}>
                            <Modal
                                onClick={isEditTower ? updateTower : createTower}
                                showModal={setTowerFormModal}
                                title={isEditTower ? `Editar ${towerName}` : 'Agregar torre'}
                            >

                                <Uploader name="img" label="Foto del bloque" onChange={e => setTowerImg(e.target.files[0])} />

                                <Inputs name="Nombre del bloque" type={"text"} identifier={"towerName"} errors={errorList}
                                    value={towerName} onChange={e => {
                                        setTowerName(e.target.value); setErrorList('')
                                            (e.target.value)
                                    }}></Inputs>

                                {

                                    isEditTower ?
                                        <>
                                            <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                                value={status} onChange={e => setStatus(e.target.value)}
                                            ></InputsSelect>

                                            <Inputs type={"hidden"}
                                                value={idTower} onChange={e => setIdTower(e.target.value)}></Inputs>
                                        </>
                                        : null
                                }


                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}


        </>


    )
}
