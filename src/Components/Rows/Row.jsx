/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import "./RowsStyle.css"

export const Row = ({

    module,
    name,
    lastName,
    namerole,
    docType,
    docNumber,
    phone,
    email,
    status,
    rol,
    children,
    descripcion,
    icon = "user",
    op1,
    op2,
    op3,
    op4,
    op5,
    op6,
    file,
    to = "details",
    start,
    end,
    address,
    tel,
    corr


}) => {

    return (


        <tr class="file-list myRow">

            <Link to={to} style={{ textDecoration: 'none' }} >
                <td class="text-center ">
                    <div class="circle circle-sm">
                        <span class={`fe fe-${icon} fe-24 text-muted`}></span>
                    </div>

                    {
                        status === 'Activo' || status === 'Active' ?
                            <span className="dot dot-md bg-success mr-1"></span> :
                            status === 'Pagada' ?
                                <span className="dot dot-md bg-success mr-1"></span> :
                                status === 'Por pagar' ?
                                    <span className="dot dot-md bg-danger mr-1"></span> :
                                    status === 'Pendiente' ?
                                        <span className="dot dot-md bg-warning mr-1"></span> :
                                        status === 'Inactivo' || status === 'Inactive' ?
                                            <span className="dot dot-md bg-danger mr-1"></span> :
                                            null
                    }

                </td>

                <th scope="row">
                    {namerole != null ? <td class="text-secondary">{namerole}</td> : null}
                    {start != null ? <td class="text-secondary">{start}</td> : null}
                    {end != null ? <td class="text-secondary">{end}</td> : null}
                    {name != null & name != null ? name + ' ' + lastName : null} <br />
                    {op6 != null ? <span className="badge badge-light text-primary">{op6}</span> : null}


                    {docType != null ? <span className="badge badge-light text-secondary">{docType}</span> : null}
                    {docNumber != null ? <span class="badge badge-white text-secondary">{docNumber}</span> : null}


                </th>

            </Link>

            {rol != null ? <td class="text-secondary">{rol}</td> : null}
            {address != null ? <td class="text-secondary">{address}</td> : null}

            {tel != null ? <td class="text-secondary">{tel}</td> : null}
            {corr != null ? <td class="text-secondary">{corr}</td> : null}




            {email != null ? <td class="text-secondary"> <span className="badge badge-white text-secondary">Correo</span><em class="text-muted ml-2">{email}</em><br />
                <span className="badge badge-white text-secondary">Telefono</span><em class="text-muted ml-2">{phone}</em>
            </td> : null}
            {phone != null ? <td class="text-secondary"></td> : null}


            {descripcion != null ? <td class="text-secondary">{descripcion}</td> : null}


            {file && <td className="text-secondary"><Link to={file}>
                <span className='fe fe-download-cloud fe-16 text-muted'></span>
            </Link></td>}


            {op1 != null ? <td class="text-secondary">{op1}</td> : null}
            {op2 != null ? <td class="text-secondary">{op2}</td> : null}
            {op3 != null ? <td class="text-secondary">{op3}</td> : null}
            {op4 != null ? <td class="text-secondary">{op4}</td> : null}
            {op5 != null ? <td class="text-secondary">{op5}</td> : null}


            <td>

                <button type="button" class="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="text-muted sr-only">Action</span>
                </button>

                <div class="dropdown-menu m-2">

                    {/* Children must be Actions Components */}

                    {children}

                </div>

            </td>
        </tr>
    )
}

