import "../Rows/RowsStyle.css"

export const Table = ({ name, opc1, opc2, opc3, opc4, icon = 'shield', status }) => {
    return (


        <tbody className="containertablesf">
            <tr className="file-list myRow hi">
                <td className="text-center ">
                    <div className="circle circle-sm">
                        <span className={`fe fe-${icon} fe-24 text-muted`}></span>
                    </div>

                    {['Active', 'Activo'].includes(status)
                        ? <span className="dot dot-md bg-success mr-1"></span>
                        : <span className="dot dot-md bg-danger mr-1"></span>}

                </td>
                {opc1 != null ? <td className="text-secondary">{opc1}</td> : null}
                {opc2 != null ? <td className="text-secondary">{opc2}</td> : null}
                {opc3 != null ? <td className="text-secondary">{opc3}</td> : null}
                {opc4 != null ? <td className="text-secondary">{opc4}</td> : null}
            </tr>
        </tbody>

    )
}

export const ThInfo = ({ name }) => {
    return (
        <th className="text-muted " style={{ paddingLeft: '12px' }}  >{name}</th>
    )
}
