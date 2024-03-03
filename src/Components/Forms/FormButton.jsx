import React, { useState } from 'react';
import './FormContainer.css';
import { Link, useNavigate } from 'react-router-dom';

function FormButton({ name, funcion, disabled, backButton, to, onClick, bstyle }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleClick = async (e) => {
    setLoading(true);
    try {
      await onClick(e);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-end mt-2' style={{ width: '100%', position: 'sticky', top: 0, backgroundColor: 'white', bstyle }}>
        <div className="form-group mr-2">
          {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...
            </button>
          ) : (
            <input type="submit" value={name} disabled={disabled} className="btn btn-primary" onClick={handleClick} />
          )}
        </div>
        <div className="form-group">
          <Link to={to} onClick={handleBackButtonClick} className="btn btn-light ">{backButton}</Link>
        </div>
      </div>
    </>
  );
}

export default FormButton;