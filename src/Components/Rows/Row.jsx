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
    status = 'Activo',
    rol,
    children,
    descripcion,
    icon,
    op1,
    op2,
    op3,
    op4,
    op5,
    op6,
    file

}) => {

    return (


        <tr class="file-list">

            <Link to={"details"} style={{ textDecoration: 'none' }} >
                {/* <a href=""> */}
                <td class="text-center ">
                    <div class="circle circle-sm bg-light">
                        <span class={icon ? icon : 'fe fe-user fe-16 text-muted'}></span>
                    </div>

                    {['Active', 'Activo'].includes(status)
                        ? <span className="dot dot-md bg-success mr-1"></span>
                        : <span className="dot dot-md bg-danger mr-1"></span>}

                </td>

                <th scope="row">
                    {namerole != null ? <td class="text-secondary">{namerole}</td> : null}
                    {name != null & name != null ? name + ' ' + lastName : null} <br />
                    {docType != null ? <span className="badge badge-light text-secondary">{docType}</span> : null}
                    {docNumber != null ? <em class="text-muted ml-2">{docNumber}</em> : null}


                </th>

            </Link>

            {rol != null ? <td class="text-secondary">{rol}</td> : null}
            {email != null ? <td class="text-secondary">{email}</td> : null}
            {phone != null ? <td class="text-secondary">{phone}</td> : null}
            {descripcion != null ? <td class="text-secondary">{descripcion}</td> : null}


            {file && <td className="text-secondary"><a href={file}>
                <span className='fe fe-download-cloud fe-16 text-muted'></span>
            </a></td>}


            {op1 != null ? <td class="text-secondary">{op1}</td> : null}
            {op2 != null ? <td class="text-secondary">{op2}</td> : null}
            {op3 != null ? <td class="text-secondary">{op3}</td> : null}
            {op4 != null ? <td class="text-secondary">{op4}</td> : null}
            {op5 != null ? <td class="text-secondary">{op5}</td> : null}
            {op6 != null ? <td class="text-secondary">{op6}</td> : null}

            {/* <a href=""> */}

            {/* </a> */}

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

