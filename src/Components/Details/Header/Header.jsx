/* eslint-disable react/prop-types */

const style= {
    marginLeft: '0',
    marginRight: '0',
}

export const Header = ({ children }) => {
    return (
        <div className="row mb-4" style={style}>
            {children}
        </div>
    )
}
