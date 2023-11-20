import "./Thead.css"

export const Thead = ({ children }) => {
    return (
        <thead className="bg-light">
            <tr>
                { children }
            </tr>
        </thead>
    )
}
