import './tableStyle.css'

export const TablePerson = ({ children }) => {

    return (
        <div className="table-responsive" ><br />
            <table className="table table-borderless table-striped my-9" >

                {/* Children must be Components Thead and Tbody */}
                {children}

            </table>
        </div>
    )
}
