import React, { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    // Filtrar solo los archivos con extensiones permitidas
    const validFiles = selectedFiles.filter((file) => {
      const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
      const extension = file.name.split('.').pop().toLowerCase();
      return allowedExtensions.includes(extension);
    });
    setFiles([...files, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    // Eliminar el archivo del estado
    const updatedFiles = files.filter((file, i) => i !== index);
    setFiles(updatedFiles);
  };

  const renderFilePreviews = () => {
    if (files.length === 0) {
      return (
        <div className="default-message">
          <p>Seleccione un archivo</p>
        </div>
      );
    } else {
      return (
        <div className="preview-container">
          {files.map((file, index) => (
            <div key={index} className="file-preview">
              <span>{file.name}</span>
              <button onClick={() => handleRemoveFile(index)}>Eliminar</button>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        multiple
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      {renderFilePreviews()}
    </div>
  );
};

export default FileUploader;




