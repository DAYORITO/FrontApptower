import "./MyCss/RowsStyle.css"
const RowsOwner = ({
    module = 'owner',
    name = 'Owner name',
    lastName = 'last name owner',
    docType = 'CC',
    docNumber = '123456788',
    phone = '3218298888',
    email = 'example@email.com',
    status = 'Active'

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
                { name + ' ' + lastName } <br />
                <span className="badge badge-light text-muted">{ docType }</span>
                <em class="text-muted ml-2">{ docNumber }</em>
            </th>
            <td class="text-muted">{ phone }</td>
            <td class="text-muted">{ email }</td>
            <td>

                <button type="button" class="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="text-muted sr-only">Action</span>
                </button>
                <div class="dropdown-menu m-2">
                    <a class="dropdown-item" href="#"><i class="fe fe-edit fe-12 mr-4"></i>Edit { module } </a>
                    <a class="dropdown-item" href="#"><i class="fe fe-user-plus fe-12 mr-4"></i>Assing spaces</a>
        
                </div>

            </td>
        </tr>
    )
}

export {RowsOwner}