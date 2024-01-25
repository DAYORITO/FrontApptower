import { Actions } from "../../../Components/Actions/Actions"
import { BigCard } from "../../../Components/BigCard/BigCard"
import { ButtonGoTo, DropdownExcel, SearchButton } from "../../../Components/Buttons/Buttons"
import { Card } from "../../../Components/Card/Card"
import { ContainerCard } from "../../../Components/ContainerCard/ContainerCard"
import { ContainerTable } from "../../../Components/ContainerTable/ContainerTable"
import { TablePerson } from "../../../Components/Tables/Tables"
import { useEffect, useState } from "react"

import { useFetch } from '../../../Hooks/useFetch'


import { filter } from "../../../Helpers/Helpers"
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

    const [showModal, setShowModal] = useState(false);

    const handleModal = (data) => {

        setIdTower(data.idTower)
        setTowerImg(data.towerImg)
        setTowerName(data.towerName)
        setStatus(data.status)

        setShowModal(true)

    }


    // Get Data

    const { data: towers, get: getTowers, loading } = useFetch(url)

    useEffect(() => {

        getTowers('towers')

    }, [])


    // Funtionality to search


    const [search, setSearch] = useState('');

    let towerList = filter(search, towers?.data?.towers, "towerName")


    const searcher = (e) => {

        setSearch(e.target.value)
        console.log(e.target.value)

    }

    console.log(towerList.length)


    return (
        <>
            <ContainerTable
                title='Bloques residenciales'
                buttonToGo={<ButtonGoTo value='Nuevo bloque' href='create' />}
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
                                    <Actions onClick={() => handleModal(tower)} accion='Editar bloque' icon="edit" />

                                </BigCard>
                            ))}

                    </ContainerCard>


                </TablePerson>

            </ContainerTable >

            {showModal &&
                createPortal(
                    <>
                        <ModalContainer ShowModal={setShowModal}>
                            <Modal
                                // onClick={UpdateApartment}
                                showModal={setShowModal}
                            // title={`Editar apartamento ${apartmentName}`}
                            >

                                <Uploader name="img" label="Foto del bloque" onChange={e => setTowerImg(e.target.files[0])} />

                                <Inputs name="Nombre del bloque" type={"text"}
                                    value={towerName} onChange={e => setTowerName(e.target.value)}></Inputs>

                                <InputsSelect id={"select"} options={statusList} name={"Estado"}
                                    value={status} onChange={e => setStatus(e.target.value)}
                                ></InputsSelect>

                                <Inputs type={"hidden"}
                                    value={idTower} onChange={e => setIdTower(e.target.value)}></Inputs>

                            </Modal>
                        </ModalContainer>
                    </>,
                    document.getElementById("modalRender")
                )}
        </>


    )
}
