import "./Thead.css"

export const Thead = ({ children }) => {
    return (
        <thead className="bg-white">
            <tr>
                { children }
            </tr>
        </thead>
    )
}
