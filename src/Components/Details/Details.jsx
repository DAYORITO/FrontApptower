/* eslint-disable react/prop-types */

import './Details.css'


export const Details = ({ children }) => {
  return (
    <div id='formContainer' className="card shadow"   >
      <div className='row details'>

        {children}

      </div>
    </div>
  )
}
