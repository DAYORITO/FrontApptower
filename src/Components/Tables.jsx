import { RowsOwner } from './Rows'
import './MyCss/tableStyle.css'
export const TablePerson = () => {
    return (
        <div className="table-responsive">
            <table className="table table-borderless table-striped my-4">
                <thead>
                    <tr>
                        <th></th>
                        <th className="w-50">Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <RowsOwner name='Emmanuel' lastName='Tabares' docType='CC' docNumber='1007235456' email='emanuel_tabares@hotmail.com' phone='3218298707' ></RowsOwner>
                    <RowsOwner name='Juan Fernando' lastName='Tabares' docType='CE' docNumber='43051788' email='jsampayo@gmail.com' phone='300845456' ></RowsOwner>
                    <RowsOwner name='Alejandra' lastName='Tabares' docType='CC' docNumber='1007235456' email='alejandra2115@gmail.com' phone='314754899' status='Inactive' ></RowsOwner>
                    <RowsOwner name='Fernando' lastName='Tabares' docType='CC' docNumber='15456004' email='ftabares56@hotmail.com' phone='312789456' ></RowsOwner>
                    <RowsOwner name='Fernando' lastName='Tabares' docType='CC' docNumber='15456004' email='ftabares56@hotmail.com' phone='312789456' ></RowsOwner>
                    <RowsOwner name='Fernando' lastName='Tabares' docType='CC' docNumber='15456004' email='ftabares56@hotmail.com' phone='312789456' ></RowsOwner>
                    <RowsOwner name='Fernando' lastName='Tabares' docType='CC' docNumber='15456004' email='ftabares56@hotmail.com' phone='312789456' ></RowsOwner>
                </tbody>
            </table>
        </div>
    )
}
