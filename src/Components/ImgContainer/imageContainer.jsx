import React from 'react';

const ImageContainer = ({ urls }) => { 
  return (
    <div className="container">
      <div className="row justify-content-center">
        {Array.isArray(urls) && urls[0] != null ? (
          urls.map((url, index) => (
            <div key={index} className="mb-3 mr-1 d-flex justify-content-center">
              <div className="d-flex border p-2" style={{ maxWidth: "200px", minWidth: "80px" }}>
                {url && url.endsWith('.jpg') || url.endsWith('.png') |url.endsWith('.jpeg') ? (
                  <div className="d-flex justify-content-center" style={{minWidth: "20px", width:"120px", height: "80px", minHeight:"10px" }}>
                    <img src={url} className="img-fluid img-thumbnail" alt={`evidencia ${index}`} style={{ maxHeight: '100px' }} />
                  </div>
                ) : (
                  <div className="pdf-icon d-flex flex-column align-items-center justify-content-center">
                    <i className="mt-4 fe fe-24 fe-file-text"></i>
                    <p>Archivo PDF</p>
                  </div>
                )}
                <div className="text-center">
                  <p className=""><strong>{`Evidencia ${index + 1}`}</strong></p>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                    Ver
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay archivos</p>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;





