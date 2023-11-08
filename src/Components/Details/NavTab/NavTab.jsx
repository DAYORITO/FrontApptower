
/* eslint-disable react/prop-types */
export const NavTab = ({ children }) => {
  return (
      <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
        {children}
      </ul>
  )
}
