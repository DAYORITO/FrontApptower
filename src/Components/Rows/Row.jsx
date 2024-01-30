/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import "./RowsStyle.css"

export const Row = ({

    file,
    to = "details",

    children,
    description,
    icon = "user",
    status,

    A1,
    A2,
    A3,
    A4,
    A5,
    A6,
    A7,
    A8,
    A9,
    A10,
    A11,
    A12,
    A13,
    A14,
    A15,
    A16,


    A1A2 = A1 + " " + A2

}) => {

    return (


        <tr class="file-list myRow">

            <Link to={to} style={{ textDecoration: 'none' }} >
                <td class="text-cA20 ">



                    <div class="circle circle-sm">

                        <span class={`fe fe-${icon} fe-24 text-muted`}></span>
                        {A16 != 0 ? <span className="badge text-white bg-danger mb-4">{A16}</span> : null}

                    </div>

                    {
                        status === 'Activo' || status === 'Active' ?
                            <span className="dot dot-md bg-success mr-1"></span> :
                            status === 'Pagada' ?
                                <span className="dot dot-md bg-success mr-1"></span> :
                                status === 'Por pagar' ?
                                    <span className="dot dot-md bg-danger mr-1"></span> :
                                    status === 'PA16iente' ?
                                        <span className="dot dot-md bg-warning mr-1"></span> :
                                        status === 'Inactivo' || status === 'Inactive' ?
                                            <span className="dot dot-md bg-danger mr-1"></span> :
                                            null
                    }

                </td>

                <th scope="row">
                    {A5 != null ? <td class="text-secondary">{A5}</td> : null}
                    {A1 != null ? <span>{A1A2}</span> : null} <br />
                    {A3 != null ? <span className="badge badge-light text-primary">{A3}</span> : null}
                    {A4 != null ? <span className="badge badge-light text-secondary">{A4}</span> : null}

                </th>

            </Link>


            {description != null ? <td class="text-secondary">{description}</td> : null}
            {A7 != null ? <td class="text-secondary">{A7}</td> : null}
            {A8 != null ? <td class="text-secondary">{A8}</td> : null}


            {A9 != null ?
                <td class="text-secondary">
                    <span className="badge badge-white text-secondary">{A8}</span>
                    <em class="badge badge-white text-muted">{A9}</em>
                    <br />
                    <span className="badge badge-white text-secondary">{A10}</span><em class="badge badge-white text-muted">{A11}</em>
                </td> : null}

            {A12 != null ?
                <td class="text-secondary">
                    <span className="badge badge-white text-secondary">{A13}</span>
                    <em class="badge badge-white text-muted">{A12}</em>
                    <br />
                    <span className="badge badge-white text-secondary">{A14}</span><em class="badge badge-white text-muted">{A15}</em>
                </td> : null}



            {A6 != null ? <td class="text-secondary">{A6}</td> : null}



            {file && <td className="text-secondary">
                <Link to={file}>
                    <span className='fe fe-download-cloud fe-16 text-muted'></span>
                </Link>
            </td>}



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

