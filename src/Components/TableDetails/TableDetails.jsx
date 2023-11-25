import "./TableDetails.css"

export const TableDetails = ({ children, toggleState, index }) => {
  return (

    <div className={toggleState === index ? "tableDetails-active" : "tableDetails"}>

      {children}
      
    </div>

  )
}
