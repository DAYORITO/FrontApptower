import './tableStyle.css'

export const TablePerson = ({ children, id }) => {

    return (
        <div className="row table-responsive" id={id}>
            <table className="table table-borderless" >
                {/* Children must be Components Thead and Tbody */}
                {children}

            </table>
        </div>
    )
}
