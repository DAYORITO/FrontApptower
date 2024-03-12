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
                            count={fines?.fines?.length}
                            dataLabel='Multas'

                            activeCount={fines?.paidFines?.length !== 0 ? `${fines?.paidFines?.length} Pagadas` : null}
                            neutralCount={fines?.finesToReview?.length !== 0 ? `${fines?.finesToReview?.length} Por revisar` : null}
                            warningCount={fines?.pendingFines?.length !== 0 ? `${fines?.pendingFines?.length} Pendientes` : null}

                            // warningCount={`${fines?.pendingFines?.length} Pendientes`}
                            icon='file-plus'
                            to='/admin/fines'
                        />
                        <ContentInfoDashboard

                            mt={true}
                            count={bookings?.bookings?.length}
                            dataLabel='Reservas'
                            neutralCount={bookings?.bookingsApproved?.length !== 0 ? `${bookings?.bookingsApproved?.length} Aprobadas` : null}
                            inactiveCount={bookings?.bookingsCancelled?.length !== 0 ? `${bookings?.bookingsCancelled?.length} Canceladas` : null}
                            warningCount={bookings?.bookingsToReview?.length !== 0 ? `${bookings?.bookingsToReview?.length} Por revisar` : null}
                            icon='calendar'
                            to='/admin/booking'

                        />

                        <ContentInfoDashboard
                            count={apartments?.apartments?.length}
                            dataLabel='Apartamentos'
                            neutralCount={apartments?.apartmentsActives?.length !== 0 ? `${apartments?.apartmentsActives?.length} Ocupados` : null}
                            warningCount={apartments?.apartmentsInActives?.length !== 0 ? `${apartments?.apartmentsInActives?.length} Inactivos` : null}
                            to='/admin/apartments'
                        />
                        <ContentInfoDashboard
                            count={guestIncomes?.guestIncome?.length}
                            dataLabel='Ingresos'
                            neutralCount={guestIncomes?.inGuestIncome?.length !== 0 ? `${guestIncomes?.inGuestIncome?.length} Sin marcar salida` : null}
                            icon='arrow-up-right'
                            to='/admin/guest_income'
                        />

                        <ContentInfoDashboard
                            count={parkingSpacesPrivate?.parkingSpacesPrivate?.length}
                            icon='map-pin'
                            dataLabel='Parqueaderos'
                            label='Parqueaderos privados'
                            neutralCount={parkingSpacesPrivate?.parkingSpacesPrivateActive?.length !== 0 ? `${parkingSpacesPrivate?.parkingSpacesPrivateActive?.length} Ocupados` : null}
                            activeCount={parkingSpacesPrivate?.parkingSpacesPrivateInactive?.length !== 0 ? `${parkingSpacesPrivate?.parkingSpacesPrivateInactive?.length} Disponibles` : null}
                            to='/admin/parkingSpaces'

                        />

                        <ContentInfoDashboard
                            count={parkingSpacesPublic?.parkingSpacesPublic?.length}
                            icon='map-pin'
                            dataLabel='Parqueaderos'
                            label='Parqueaderos publicos'
                            activeCount={parkingSpacesPublic?.parkingSpacesPublicActive?.length !== 0 ? `${parkingSpacesPublic?.parkingSpacesPublicActive?.length} Disponibles` : null}
                            neutralCount={parkingSpacesPublic?.parkingSpacesPublicInactive?.length !== 0 ? `${parkingSpacesPublic?.parkingSpacesPublicInactive?.length} Ocupados` : null}
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
                            neutralCount={notifications?.notificationsSees?.length !== 0 ? `${notifications?.notificationsSees?.length} Vistas` : null}
                            warningCount={notifications?.notificationsNoSees?.length !== 0 ? `${notifications?.notificationsNoSees?.length} No Vistas` : null}

                            icon='message-circle'
                        // size={8}

                        />

                        <ContentInfoDashboard
                            count={users?.users?.length}
                            dataLabel='Usuarios'
                            neutralCount={users?.usersActives?.length !== 0 ? `${users?.usersActives?.length} Activos` : null}
                            warningCount={users?.usersInactives?.length !== 0 ? `${users?.usersInactives?.length} Inactivos` : null}

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
