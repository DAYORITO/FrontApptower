/* eslint-disable react/prop-types */

export const NavTab = ({ children }) => {
  return (
    <ul className="nav nav-tabs pl-5" id="myTab" role="tablist">
      <li className="nav-item">
        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Todo</a>
      </li>
      {children}
    </ul>


  )
}
