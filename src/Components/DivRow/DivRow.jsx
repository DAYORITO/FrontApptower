import "./DivRow.css"

export const DivRow = ({children}) => {
  return (
    <div className="row" id="myRow">
        {children}
    </div>
  )
}
