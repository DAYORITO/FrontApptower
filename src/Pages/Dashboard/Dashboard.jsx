import { Details } from '../../Components/Details/details';
import { ContainerDashboard } from '../../Components/ContainerDashboard/ContainerDashboard';
import { ContentInfoDashboard } from '../../Components/ContentInfoDashboard/ContentInfoDashboard';
import './dashboard.css';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../Context/SocketContext';
import { Spinner } from '../../Components/Spinner/Spinner'

export const Dashboard = () => {

    const { dashboarsdData } = useContext(SocketContext);

    const [guestIncomes, setGuestIncomes] = useState([]);
    const [fines, setFines] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [parkingSpacesPrivate, setParkingSpacesPrivate] = useState([]);
    const [parkingSpacesPublic, setParkingSpacesPublic] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [guardShifts, setGuardShifts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (dashboarsdData?.length !== 0) {
            setGuestIncomes(dashboarsdData.guestIncomes);
            setFines(dashboarsdData.fines);
            setBookings(dashboarsdData.bookings);
            setApartments(dashboarsdData.apartments);
            setParkingSpacesPrivate(dashboarsdData.parkingSpacesPrivate);
            setParkingSpacesPublic(dashboarsdData.parkingSpacesPublic);
            setGuardShifts(dashboarsdData.guardShifts);
            setNotifications(dashboarsdData.notifications);
            setUsers(dashboarsdData.users);
            setIsLoading(false);
        }
    }, [dashboarsdData]);

    console.log(dashboarsdData, 'dashboarsdData')

    return (
        <Details>
            {isLoading ? <Spinner /> : (
                <>
                    <ContainerDashboard>

                        <ContentInfoDashboard
                            mt={true}
                            count={fines?.fines?.length}
                            dataLabel='Multas'
                            activeCount={`${fines?.paidFines?.length} Pagadas`}
                            neutralCount={`${fines?.finesToReview?.length} Por revisar`}
                            warningCount={`${fines?.pendingFines?.length} Pendientes`}
                            icon='file-plus'
                            to='/admin/fines'
                        />
                        <ContentInfoDashboard

                            mt={true}
                            count={bookings?.bookings?.length}
                            dataLabel='Reservas'
                            neutralCount={`${bookings?.bookingsApproved?.length} Aprobadas`}
                            inactiveCount={`${bookings?.bookingsCancelled?.length} Canceladas`}
                            warningCount={`${bookings?.bookingsToReview?.length} Por revisar`}
                            icon='calendar'
                            to='/admin/booking'

                        />

                        <ContentInfoDashboard
                            count={apartments?.apartments?.length}
                            dataLabel='Apartamentos'
                            neutralCount={`${apartments?.apartmentsActives?.length} Ocupados`}
                            warningCount={`${apartments?.apartmentsInActives?.length} Inactivos`}
                            to='/admin/apartments'
                        />
                        <ContentInfoDashboard
                            count={guestIncomes?.guestIncome?.length}
                            dataLabel='Ingresos'
                            neutralCount={`${guestIncomes?.inGuestIncome?.length} Sin marcar salida`}
                            icon='arrow-up-right'
                            to='/admin/guest_income'
                        />

                        <ContentInfoDashboard
                            count={parkingSpacesPrivate?.parkingSpacesPrivate?.length}
                            icon='map-pin'
                            dataLabel='Parqueaderos'
                            label='Parqueaderos privados'
                            neutralCount={`${parkingSpacesPrivate?.parkingSpacesPrivateActive?.length} Ocupados`}
                            activeCount={`${parkingSpacesPrivate?.parkingSpacesPrivateInactive?.length} Disponibles`}
                            to='/admin/parkingSpaces'

                        />

                        <ContentInfoDashboard
                            count={parkingSpacesPublic?.parkingSpacesPublic?.length}
                            icon='map-pin'
                            dataLabel='Parqueaderos'
                            label='Parqueaderos publicos'
                            activeCount={`${parkingSpacesPublic?.parkingSpacesPublicActive?.length} Disponibles`}
                            neutralCount={`${parkingSpacesPublic?.parkingSpacesPublicInactive?.length} Ocupados`}
                            to='/admin/parkingSpaces'
                        />

                        {/* <ContentInfoDashboard
                    dataLabel='Turnos'
                    activeCount=''
                    inactiveCount=''
                    warningCount=''
                    icon='shield'
                    to='/admin/guest_income'
                // count={ guardShift.length}


                /> */}
                        <ContentInfoDashboard
                            count={notifications?.notifications?.length}
                            dataLabel='Notificaciones'
                            neutralCount={`${notifications?.notificationsSees?.length} Vistas`}
                            warningCount={`${notifications?.notificationsNoSees?.length} No Vistas`}

                            icon='message-circle'
                        // size={8}

                        />

                        <ContentInfoDashboard
                            count={users?.users?.length}
                            dataLabel='Usuarios'
                            neutralCount={`${users?.usersActives?.length} Activos`}
                            warningCount={`${users?.usersInactives?.length} Inactivos`}

                            icon='message-circle'
                            to='/admin/users'

                        // size={8}

                        />
                    </ContainerDashboard>
                </>
            )}

        </Details>
    );
};

