/* eslint-disable react/prop-types */
import "./Detail.css";

export const Detail = ({ name, children }) => {
  return (
      <div className="row justify-content-center">
          <h2 className="h3 mb-4 page-title">{name}</h2>
          {children}
      </div>
  );
};
