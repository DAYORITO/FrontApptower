/* eslint-disable react/prop-types */


export const Details = ({ children }) => {
  return (
    <div className='container-fluid'>
        <div className='card-body'>
            {children}
        </div>
    </div>
  )
}
