import { TablePerson } from '../../../Components/Tables/Tables'
import { ContainerTable } from '../../../Components/ContainerTable/ContainerTable'
import './User.css'

export const ModifyProfile = () => {
    return (
        <>
            <ContainerTable title='Modificar perfil'>
                <TablePerson>
                    <div className="container-profile">
                        <div class="circle circle-large bg-light circlecon">
                            <span class='fe fe-user text-muted custom-icon'></span>
                        </div>
                        <div className="information-user">
                            <div className="user-detail">
                                <span>Nombre:</span>
                                <span>Alfonso Gonzalez</span>
                            </div>
                            <div className="user-detail">
                                <span>Apellido:</span>
                                <span>Gonzalez</span>
                            </div>
                            <div className="user-detail">
                                <span>Correo:</span>
                                <span>alfonso@gmail.com</span>
                            </div>

                        </div>
                        <div className="buttons-profile " >
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-secondary">Regresar</button>
                        </div>
                    </div>
                </TablePerson>
            </ContainerTable>
        </>
    )
}