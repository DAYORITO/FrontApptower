import React from 'react';

const ImageContainer = ({ urls, name = 'Evidencia' }) => {
  console.log("aqui urls", urls);
  return (
    <div className="container">
      <div className="row justify-content-center">
        {Array.isArray(urls) && urls[0] != null ? (
          urls?.map((url, index) => (
            <div key={index} className="w-100">
<<<<<<< HEAD
              <div className="d-flex border">
=======
              <div className="d-flex border mb-3">
>>>>>>> 81e68fbc7a787132c94c2365618ebec02abb7a13
                {url && (url?.endsWith('.jpg') || url?.endsWith('.png') || url?.endsWith('.jpeg')) ? (
                  <div className="pdf-icon d-flex flex-column align-items-center justify-content-center">
                    <img src={url} className="img-fluid img-thumbnail" alt={`${name} ${index}`} style={{ maxHeight: '20vh' }} />
                  </div>
                ) : (
                  <div className="pdf-icon d-flex flex-column align-items-center justify-content-center">
                    <i className="mt-4 fe fe-24 fe-file-text"></i>
                    <p>Archivo PDF</p>
                  </div>
                )}
                <div className="d-flex w-100 justify-content-center align-items-center ml-2">
                  <div className="text-center">
                    <p className="mb-0"><strong>{`${name} ${index + 1}`}</strong></p>
                  </div>
                  <div className="text-center">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="btn ml-3 btn-sm btn-primary">Ver</a>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
