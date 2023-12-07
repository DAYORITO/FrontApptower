import { useNavigate } from 'react-router'
import './DropDownNav.css'


export const DropDownNav = ({ module, dropdownName = "#", id = 'id', icon = "fe fe-home fe-24", children }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <li className={`nav-item dropdown${isDropdownOpen ? ' show' : ''}`}>
        <a href={dropdownName} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link" onClick={toggleDropdown}>
          <i className={icon} id='fas'></i>
          <span className="item-text span">{module}</span>
        </a>
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

export const ListNav = ({ href, module, icon = "fe fe-home", id = 'process', onClick }) => {
    return (
        <li className="nav-item">
            <a className="nav-link" href={href || ''} onClick={onClick}>
                <i className={icon} id='fas'></i>
                <span className='item-text span'>{module}</span>
            </a>
        </li>
    )
}

// 


import React, { useState } from 'react'

export const DropDownList = ({ subprocess, href = '/#/admin/' }) => {
    return (
        <li className="nav-item">
            <a className="nav-link pl-3" href={href}><span className="ml-1 item-text span">{subprocess}</span></a>
        </li>)
}

