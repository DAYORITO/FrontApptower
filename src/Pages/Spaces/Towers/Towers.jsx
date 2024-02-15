import { Actions } from "../../../Components/Actions/Actions"
import { BigCard } from "../../../Components/BigCard/BigCard"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { useEffect, useState } from "react"

import { useFetch } from '../../../Hooks/useFetch'


import { filter, postRequest, putRequest } from "../../../Helpers/Helpers"
import { Modal, ModalContainer } from "../../../Components/Modals/ModalTwo"
import { createPortal } from "react-dom"


import Inputs from '../../../Components/Inputs/Inputs'
import { statusList } from "../../../Hooks/consts.hooks"
import InputsSelect from "../../../Components/Inputs/InputsSelect"
import { Uploader } from "../../../Components/Uploader/Uploader"

import dataNotFoundImg from "../../../assets/dataNotFound.jpg"
import { Spinner } from "../../../Components/Spinner/Spinner"




export const Towers = () => {


    const url = "http://localhost:3000/api/"
    // const url = "https://apptowerbackend.onrender.com/api/"

    // Tower information

    const [towerImg, setTowerImg] = useState('');
    const [idTower, setIdTower] = useState('');
    const [towerName, setTowerName] = useState('');
    const [status, setStatus] = useState('');

    const [isEditTower, setIsEditTower] = useState(true);
    const [towerFormModal, setTowerFormModal] = useState(false);

    const openTowerModalForm = (data) => {

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

        await postRequest(event, 'towers', 'PUT', setTowerFormModal, data, url)

        getTowers('towers')

    };

    const createTower = async (event) => {

        const data = {

            towerName: towerName,
            towerImg: towerImg,

        }

        console.log("edit data", data)

        await postRequest(event, 'towers', 'POST', {}, data, url)
        setTowerFormModal(false)
        getTowers('towers')

    };


    return (
        <>
            <ContainerTable
                title='Bloques residenciales'
                buttonToGo={<ButtonGoTo value='Nuevo bloque' onClick={() => openTowerModalForm(null)} />}
                search={<SearchButton value={search} onChange={searcher} placeholder='Buscar bloque' />} >


                <TablePerson>
                    <ContainerCard>

                        {loading ? <Spinner /> : towerList.length == 0 ?

                            <img className='dontFountData' src={dataNotFoundImg} alt="" srcset="" /> :


                            towerList?.map(tower => (
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

                                <Inputs name="Nombre del bloque" type={"text"}
                                    value={towerName} onChange={e => setTowerName(e.target.value)}></Inputs>

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
