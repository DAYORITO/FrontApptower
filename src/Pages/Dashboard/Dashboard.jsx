import { Details } from '../../Components/Details/details';
import { ContainerDashboard } from '../../Components/ContainerDashboard/ContainerDashboard';
import { ContentInfoDashboard } from '../../Components/ContentInfoDashboard/ContentInfoDashboard';
import { Row } from '../../Components/Rows/Row'

import './dashboard.css';
import { RowNotificactions } from '../../Components/RowNotificacions/RowNotificactions';
import { Acordions } from '../../Components/Acordions/Acordions';
import { DropdownInfo } from '../../Components/DropdownInfo/DropdownInfo';

export const Dashboard = () => {


    const socket = io("http://localhost:3000/");

    socket.on('connect', () => {
        setIsConect(true);
    });

    socket.on('disconnect', () => {
        setIsConect(false);
    });

    socket.on('enviar-mensaje', () => {
        console.log('mensaje recibido')
    });

    return (

        <Details>

            <ContainerDashboard>

                {/* <div className="col-md-12 mb-4">
                    <h3>Accesos directos</h3>
                </div> */}
                <ContentInfoDashboard
                    module='Ingresos activos'
                    icon='arrow-up-right'
                    to='/admin/guest_income'
                />
                <ContentInfoDashboard
                    module='Multas inpuestas'
                    icon='dollar-sign'
                    to='/admin/fines'

                />
                <ContentInfoDashboard
                    module='Reservas pendientes'
                    icon='calendar'
                    to='/admin/booking'

                />
                <ContentInfoDashboard
                    module='Apartamentos desocupados'
                    to='/admin/apartments'

                />
                <ContentInfoDashboard
                    module='Turnos de hoy'
                    icon='shield'
                    to='/admin/guest_income'

                />
                <ContentInfoDashboard
                    module='Nuevas notificaciones'
                    icon='message-circle'
                />

                <Acordions>
                    <DropdownInfo name={'Ultimas reservas'}>
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />

                    </DropdownInfo>

                </Acordions>
                <Acordions>
                    <DropdownInfo name={'Ultimos usuarios registrados'}>
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />

                    </DropdownInfo>

                </Acordions>
                <Acordions>
                    <DropdownInfo name={'Reservas'}>
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />
                        <RowNotificactions />

                    </DropdownInfo>

                </Acordions>




                {/* <div class="col-md-6 col-xl-3 mb-4">
                    <div class="card shadow border-0">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-3 text-center">
                                    <span class="circle circle-sm bg-primary">
                                        <i class="fe fe-16 fe-shopping-cart text-white mb-0"></i>
                                    </span>
                                </div>
                                <div class="col pr-0">
                                    <p class="small text-muted mb-0">Orders</p>
                                    <span class="h3 mb-0">1,869</span>
                                    <span class="small text-success">+16.5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3 mb-4">
                    <div class="card shadow border-0">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-3 text-center">
                                    <span class="circle circle-sm bg-primary">
                                        <i class="fe fe-16 fe-filter text-white mb-0"></i>
                                    </span>
                                </div>
                                <div class="col">
                                    <p class="small text-muted mb-0">Conversion</p>
                                    <div class="row align-items-center no-gutters">
                                        <div class="col-auto">
                                            <span class="h3 mr-2 mb-0"> 86.6% </span>
                                        </div>
                                        <div class="col-md-12 col-lg">
                                            <div class="progress progress-sm mt-2" >
                                                <div class="progress-bar bg-success" role="progressbar" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3 mb-4">
                    <div class="card shadow border-0">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-3 text-center">
                                    <span class="circle circle-sm bg-primary">
                                        <i class="fe fe-16 fe-activity text-white mb-0"></i>
                                    </span>
                                </div>
                                <div class="col">
                                    <p class="small text-muted mb-0">AVG Orders</p>
                                    <span class="h3 mb-0">$80</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <h4 className='m-4'>Reservas</h4>

                <div class="col-md-12">
                    <div class="card shadow eq-card timeline">
                        <div class="card-header">
                            <h3 class="h6 mb-0 text-secondary">Ultimas reservas</h3>
                            <a class="float-right small text-muted" href="#!">Ver todo</a>
                        </div>
                        <div class="card-body" data-simplebar >

                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions />
                            <RowNotificactions /> */}

                {/* <div class="pb-3 timeline-item item-primary">
                                <div class="pl-5">
                                    <div class="mb-1 small"><strong>@Brown Asher</strong><span class="text-muted mx-2">Just create new layout Index, form, table</span><strong>Tiny Admin</strong></div>
                                    <p class="small text-muted">Creative Design <span class="badge badge-light">1h ago</span>
                                    </p>
                                </div>
                            </div>

                            <div class="pb-3 timeline-item item-success">
                                <div class="pl-5">
                                    <div class="mb-2 small"><strong>@Kelley Sonya</strong><span class="text-muted mx-2">has commented on</span><strong>Advanced table</strong></div>
                                    <div class="card d-inline-flex mb-2">
                                        <div class="card-body bg-light small py-2 px-3"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </div>
                                    </div>
                                    <p class="small text-muted">Back-End Development <span class="badge badge-light">1h ago</span>
                                    </p>
                                </div>
                            </div> */}
                {/* </div>
                    </div>
                </div>

                <h4 className='m-4'>Ultimos usuarios</h4>

                <div class="col-md-12">
                    <div class="card shadow mb-12">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="h6 mb-0 text-secondary">Ultimos usuarios registrados</h3>
                                </div>
                                <div class="col-auto">
                                    <a class="small text-muted" href="#!">View all</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body my-n2">

                            <RowNotificactions icon='user' />
                            <RowNotificactions icon='user' />
                            <RowNotificactions icon='user' />
                            <RowNotificactions icon='user' /> */}



                {/* <div class="row align-items-center my-2">
                                <div class="col">
                                    <strong>Paris</strong>
                                    <div class="my-0 text-muted small">France</div>
                                </div>
                                <div class="col-auto">
                                    <strong>+85%</strong>
                                </div>
                                <div class="col-3">
                                    <div class="progress" >
                                        <div class="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center my-2">
                                <div class="col">
                                    <strong>Amsterdam</strong>
                                    <div class="my-0 text-muted small">Netherlands</div>
                                </div>
                                <div class="col-auto">
                                    <strong>+75%</strong>
                                </div>
                                <div class="col-3">
                                    <div class="progress" >
                                        <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center my-2">
                                <div class="col">
                                    <strong>Venice</strong>
                                    <div class="my-0 text-muted small">Italy</div>
                                </div>
                                <div class="col-auto">
                                    <strong>+62%</strong>
                                </div>
                                <div class="col-3">
                                    <div class="progress" >
                                        <div class="progress-bar" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center my-2">
                                <div class="col">
                                    <strong>Barcelona</strong>
                                    <div class="my-0 text-muted small">Spain</div>
                                </div>
                                <div class="col-auto">
                                    <strong>+24%</strong>
                                </div>
                                <div class="col-3">
                                    <div class="progress" >
                                        <div class="progress-bar" role="progressbar" aria-valuenow="24" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center my-2">
                                <div class="col">
                                    <strong>Sydney</strong>
                                    <div class="my-0 text-muted small">Australia</div>
                                </div>
                                <div class="col-auto">
                                    <strong>+20%</strong>
                                </div>
                                <div class="col-3">
                                    <div class="progress" >
                                        <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div> */}
                {/* </div>
                    </div>
                </div> */}
            </ContainerDashboard>






        </Details >

    );
};

