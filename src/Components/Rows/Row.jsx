import "./RowsStyle.css"

export const Row = ({
    
    module = 'module name',
    name = 'name',
    lastName = 'last name',
    docType = 'ID',
    docNumber = '##########',
    phone = '##########',
    email = 'example@email.com',
    status = 'Active',
    rol,
    children

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

                {name + ' ' + lastName} <br />
                {/* {rol != null ? <span className="badge  text-success mr-2">{rol}</span> : null} */}
                <span className="badge badge-light text-secondary ">{docType}</span>
                <em class="text-muted ml-2">{docNumber}</em>

            </th>

            {rol != null ? <td class="text-secondary">{rol}</td> : null}
            <td class="text-muted">{phone}</td>
            <td class="text-muted">{email}</td>

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

