import "./RowsStyle.css"

export const Row = ({

    module = 'module name',
    name,
    lastName,
    namerole,
    docType,
    docNumber,
    phone,
    email,
    status = 'Active',
    rol,
    children,
    descripcion

}) => {

    return (

        <tr class="file-list">

            <td class="text-center ">
                <div class="circle circle-sm bg-light">
                    <span class="fe fe-user fe-16 text-muted"></span>
                </div>

                {(status == 'Active') ? <span class="dot dot-md bg-success mr-1"></span> : <span class="dot dot-md bg-danger mr-1"></span>}


            </td>
            <th scope="row">

                {name != null & name != null ? name + ' ' + lastName : null} <br />
                {/* {rol != null ? <span className="badge  text-success mr-2">{rol}</span> : null} */}
                {docType != null ? <span className="badge badge-light text-secondary ">{docType}</span> : null}
                {docNumber != null ? <em class="text-muted ml-2">{docNumber}</em> : null}

            </th>
            {namerole != null ? <td class="text-secondary">{namerole}</td> : null}
            {rol != null ? <td class="text-secondary">{rol}</td> : null}
            {email != null ? <td class="text-secondary">{email}</td> : null}
            {phone != null ? <td class="text-secondary">{phone}</td> : null}
            {descripcion != null ? <td class="text-secondary">{descripcion}</td> : null}

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

