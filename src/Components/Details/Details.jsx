/* eslint-disable react/prop-types */

import './Details.css'

const style ={
  backgroundColor: '#fff',
  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.09)',
  borderRadius: '10px',

  margin: '0 3% 0 3%',
}

export const Details = ({ children }) => {
  return (
        <div className='card-body mt-5' style={style}>
            {children}
        </div>
  )
}
