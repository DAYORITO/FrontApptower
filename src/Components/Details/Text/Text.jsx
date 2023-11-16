/* eslint-disable react/prop-types */

const Style= {
  width: "100%",
  padding: "0.5rem",
}
const stylep = {
  wordBreak: "break-all",
}
export const Text = ({ title, children }) => {
  return (
    <div className="row my-1" style={Style}>
      <span className="badge badge-white bg-secondary-lighter mr-1">{title}</span>
      <p className="small mb-0 text-muted" style={stylep}>{children}</p>
    </div>

  )
}
