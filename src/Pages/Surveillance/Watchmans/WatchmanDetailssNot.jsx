import React, { useEffect, useState } from 'react'
import { Details } from "../../../Components/Details/details"
import { TablePerson } from '../../../Components/Tables/Tables'
import { TableDetails } from "../../../Components/TableDetails/TableDetails"
import { NavDetails } from "../../../Components/NavDetails/NavDetails"
import { NavListDetails } from "../../../Components/NavListDetails/NavListDetails"
import { ListsDetails } from "../../../Components/ListsDetails/ListsDetails"
import { InfoDetails } from "../../../Components/InfoDetails/InfoDetails"
import { SearchButton } from "../../../Components/Buttons/Buttons"
import { useFetchgetById } from "../../../Hooks/useFetch"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import './Watchman.css'
import { Thead } from '../../../Components/Thead/Thead'
import { Table, ThInfo } from '../../../Components/Table/Table'


export const WatchmanDetails = (props) => {



    // 1. Start Get apartment information by id

    const { idwatchman } = useParams();
    console.log(idwatchman, "idwatchman")
    const { data: watchman, error, load } = useFetchgetById('watchman', idwatchman);




    console.log()
    const [idWatchman, setIdwatchman] = useState("");
    const [name, setName] = useState('');
    const [lastname, setwatchmanLastname] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [document, setDocument] = useState('');
    const [status, setStatus] = useState('');
    const [dateOfbirth, setDateOfbirth] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');





    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    const [age, setAge] = useState(null);

    useEffect(() => {
        if (watchman && watchman.watchman) {
            setDateOfbirth(watchman.watchman.dateOfbirth);
            setAge(calculateAge(watchman.watchman.dateOfbirth));

        }
    }, [watchman]);



    const [guardshifts, setGuardshifts] = useState([]);

    const fetchGuardshifsforwatchman = async () => {
        // const response = await fetch(`https://apptowerbackend.onrender.com/api/guardshifts/${idwatchman}`);

        const response = await fetch(`https://apptowerbackend.onrender.com/api/guardshifts/${idwatchman}`);
        const data = await response.json();
        setGuardshifts(data.shifts, 'Data watchman');
        console.log(data.shifts, "guardshifts")
    }



    useEffect(() => {
        fetchGuardshifsforwatchman();
    }
        , []);

    useEffect(() => {

        if (watchman && watchman.watchman) {
            setIdwatchman(watchman.watchman.idwatchman);
            setName(watchman.watchman.namewatchman);
            setwatchmanLastname(watchman.watchman.lastnamewatchman);
            setDocumentType(watchman.watchman.documentType);
            setDocument(watchman.watchman.document);
            setStatus(watchman.watchman.state);
            setDateOfbirth(watchman.watchman.dateOfbirth);
            setEmail(watchman.watchman.email);
            setPhone(watchman.watchman.phone);



        }
    }, [watchman])



    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index)
    };






    const [searchDate, setSearchDate] = useState(null);

    const [filteredShifts, setFilteredShifts] = useState([]);

    const handleSearch = (event) => {
        const date = event.target.value;
        setSearchDate(date);
    };


    useEffect(() => {
        if (searchDate) {
            const filtered = guardshifts.filter(shift => {
                const shiftDate = new Date(shift.start);
                const searchDateObj = new Date(searchDate);
                searchDateObj.setUTCHours(0, 0, 0, 0);

                return shiftDate.getUTCFullYear() === searchDateObj.getUTCFullYear() &&
                    shiftDate.getUTCMonth() === searchDateObj.getUTCMonth() &&
                    shiftDate.getUTCDate() === searchDateObj.getUTCDate();
            });
            setFilteredShifts(filtered);
        } else {
            setFilteredShifts(guardshifts);
        }
    }, [searchDate, guardshifts]);



    return (
        <>
            <Details>

                <InfoDetails>

                    {load ? (
                        <p>Cargando información...</p>
                    ) : (
                        <div className='container-icons-custom472'>
                            <div className="circlecon-unique">
                                <span className='fe fe-shield text-muted fe-32 custom-icons'></span>
                                {['Active', 'Activo'].includes(status)
                                    ? <span className="dot dot-md bg-success mr-1"></span>
                                    : <span className="dot dot-md bg-danger mr-1"></span>}
                            </div>
                            <div className='info-vs-custom'>
                                <h2 className="custom-heading">Vigilante</h2>
                                {name != null & name != null ? name + ' ' + lastname : null} <br />
                                {documentType != null ? <span className="badge badge-light text-secondary">{documentType}</span> : null}
                                {document != null ? <em class="text-muted ml-2">{document}</em> : null}

                                <br />
                                <div className='container-i'>
                                    <br /><p className="custom-paragraph text-muted ml-2 "><strong>Correo: </strong> {email ? email : ''} </p>
                                    <p className="custom-paragraph text-muted ml-2"><strong>Teléfono: </strong>{phone ? phone : ''}</p>
                                    <p className="custom-paragraph text-muted ml-2 "><strong>Edad: </strong> {age ? age : ''}</p>

                                </div>

                                <Link to="/admin/watchman/" className="btn btn-sm btn-secondary bnt">Regresar</Link>
                            </div>

                        </div>

                    )}




                </InfoDetails>

                <ListsDetails>
                    <NavDetails>

                        <NavListDetails index={1} name={"Turnos"} toggleState={toggleState} onClick={() => toggleTab(1)} />
                        {/* <NavListDetails index={2} name={"Ingresos"} toggleState={toggleState} onClick={() => toggleTab(1)} /> */}

                    </NavDetails>

                    <input type="date" name="" className='dateShifts' onChange={handleSearch} />




                    <TableDetails index={1} toggleState={toggleState} >

                        <TablePerson>



                            <Thead>
                                <ThInfo />
                                <ThInfo name='Fecha' />
                                <ThInfo name='Hora inicio' />
                                <ThInfo name='Hora fin' />
                            </Thead>

                            {filteredShifts.sort((a, b) => new Date(a.start) - new Date(b.start)).slice(-1).map(shift => {
                                const startDate = new Date(shift.start);
                                const endDate = new Date(shift.end);

                                const date = startDate.toLocaleDateString(undefined, { timeZone: 'UTC' });
                                const startTime = startDate.toLocaleTimeString();
                                const endTime = endDate.toLocaleTimeString();

                                return (
                                    <Table key={idWatchman} opc1={date} opc2={startTime} opc3={endTime} status={status} />
                                );
                            })}


                        </TablePerson>
                    </TableDetails>


                </ListsDetails>
            </Details >
        </>
    )
}
