import './tableStyle.css'

export const TablePerson = ({ children, id }) => {

    return (
        <div className="table" id={id} ><br />
            <table className="table table-borderless table-striped my-2" >

                {/* Children must be Components Thead and Tbody */}
                {children}

            </table>
        </div>
    )
}
