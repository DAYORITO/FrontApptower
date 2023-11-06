/* eslint-disable react/prop-types */

export const Form = ({children}) => {
  
  return (
    <div className="container">

      <div className="table-responsive">
          { children }
      </div>
    </div>
  )
}
