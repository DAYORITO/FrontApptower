import React from 'react';

const ImageContainer = ({ urls }) => {
//   console.log("Urls", urls);
//   console.log("Urls type", typeof(urls));
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        {Array.isArray(urls) && urls[0] != null ? (
          urls.map((url, index) => (
            <div key={index} className="mb-3 mr-1 d-flex justify-content-center">
              <div className="card" style={{ maxWidth: "300px" }}>
                {url && url.endsWith('.jpg') || url.endsWith('.png') |url.endsWith('.jpeg') ? (
                  <div className="d-flex justify-content-center" style={{ width: "200px", height: "100px" }}>
                    <img src={url} className="card-img-top" alt={`evidencia ${index}`} style={{ maxHeight: '100px' }} />
                  </div>
                ) : (
                  <div className="pdf-icon d-flex flex-column align-items-center justify-content-center">
                    <i className="mt-4 fe fe-24 fe-file-text"></i>
                    <p>Archivo PDF</p>
                  </div>
                )}
                <div className="card-body text-center">
                  <h5 className="card-title">{`Evidencia ${index + 1}`}</h5>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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





