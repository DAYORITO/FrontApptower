import './DropDownNav.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



export const DropDownNav = ({
  module,
  dropdownName = "#",
  id = 'id',
  icon = "fe fe-home fe-24",
  isNavClosed,
  children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isNavClosed) {
      setDropdownOpen(false);
    }
  }, [isNavClosed]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <li className={`nav-item dropdown${isDropdownOpen ? ' show' : ''}`}>
      <Link to={dropdownName} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link" onClick={toggleDropdown}>
        <i className={icon} id='fas'></i>
        <span className="item-text span">{module}</span>
      </Link>
      <ul className={`collapse list-unstyled pl-4 w-100${isDropdownOpen ? ' show' : ''}`} id={id}>
        {children}
      </ul>
    </li>
  );
};

//   export const DropDownNav = ({ module, dropdownName = "#", id = 'id', icon = "fe fe-home fe-24", children }) => {
//     const [isDropdownOpen, setDropdownOpen] = useState(false);

//     const toggleDropdown = () => {
//       setDropdownOpen(!isDropdownOpen);
//     };

//     return (
//       <li className={`nav-item dropdown${isDropdownOpen ? ' show' : ''}`}>
//         <div className="dropdown-toggle nav-link" onClick={toggleDropdown}>
//           <i className={icon}></i>
//           <span className="item-text span">{module}</span>
//         </div>
//         <ul className={`collapse list-unstyled${isDropdownOpen ? ' show' : ''} dropdown-menu dropdown-menu-left`} id={id}>
//           {children}
//         </ul>
//       </li>
//     );
//   };

export const ListNav = ({ href, module, icon = "fe fe-home", id = 'process', onClick, A1 = 0,
}) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
      <Link className="nav-link" to={href} onClick={onClick}>
        <div>
          <i className={icon} id='fas'></i>
          {A1 != 0 ? <p className="badge text-white bg-danger mb-4">{A1}</p> : null}

          <span className='item-text span'>{module}</span>

        </div>


      </Link>
    </li>
  )
}

// 


export const DropDownList = ({ subprocess, href = '/admin/' }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link pl-3" to={href}><span className="ml-1 item-text span">{subprocess}</span></Link>
    </li>)
}

