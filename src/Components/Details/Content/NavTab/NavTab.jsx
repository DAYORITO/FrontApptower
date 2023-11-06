
/* eslint-disable react/prop-types */
export const NavTab = ({ children }) => {
  return (
    <div className="table-responsive">
      <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
        {children}
      </ul>
    </div>
  )
}
