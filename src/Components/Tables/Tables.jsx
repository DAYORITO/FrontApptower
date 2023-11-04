import './tableStyle.css'

export const TablePerson = ({ children }) => {

    return (
        <div className="table-responsive">
            <table className="table table-borderless table-striped my-4">

                {/* Children must be Components Thead and Tbody */}
                {children}

            </table>
        </div>
    )
}
