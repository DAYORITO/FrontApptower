/* eslint-disable react/prop-types */

import './Details.css'


export const Details = ({ children }) => {
  return (
        <div id='formContainer' className="card shadow"   >
            {children}
        </div>
  )
}
