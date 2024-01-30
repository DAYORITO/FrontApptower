import React, { useState, useEffect } from 'react';
import "./Uploader.css";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const Uploader = ({ label, formatos = ".png, .jpg, .pdf", name, onChange, validate, fileUrl }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [fileError, setFileError] = useState(null);

    useEffect(() => {
        if (validate && !file) {
            setFileError("El archivo es requerido*");
        } else {
            setFileError(null);
        }
    }, [file, validate]);

    useEffect(() => {
        if (fileUrl) {
            fetch(fileUrl)
                .then(response => response.blob())
                .then(blob => {
                    setFile(URL.createObjectURL(blob));
                    setFileName(fileUrl.split('/').pop());
                });
        }
    }, [fileUrl]);
    const handleFileChange = (e) => {
        setFile(null);
        setFileName(null);

        if (!e.target.files[0]) {
            setFileError("El archivo es requerido*");
            return;
        }

        setFileName(e.target.files[0].name);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(new Blob([reader.result]));
        };
        reader.readAsArrayBuffer(e.target.files[0]);

        if (onChange) {
            onChange(e);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFileName(null);
        setFileError(null);
    };

    return (
        <div className="card-body" id="uploader">
            <label>{label}</label>
            <div className="dropzone bg-light rounded-lg" id="tinydash-dropzone">
                <div className="dz-message needsclick">
                    {!file && (
                        <div className="circle circle-lg bg-primary">
                            <i className="fe fe-upload fe-24 text-white" />
                            <input type="file" name={name} aria-label="Archivo" onChange={handleFileChange} accept={formatos} />
                        </div>
                    )}
                </div>
                {file && (
                    <div className="preview" style={{ textAlign: 'center' }}>
                        {typeof file === 'string' && fileName.endsWith('.pdf') ? (
                            <div style={{ width: '300px', height: '110px', overflow: 'auto', margin: 'auto' }}>
                                <Document file={file}>
                                    <Page pageNumber={1} width={300} height={100} />
                                </Document>
                            </div>
                        ) : fileName.endsWith('.pdf') ? (
                            <div style={{ width: '300px', height: '110px', overflow: 'auto', margin: 'auto' }}>
                                <Document file={new Blob([file], { type: 'application/pdf' })}>
                                    <Page pageNumber={1} width={300} height={100} />
                                </Document>
                            </div>
                        ) : (
                            <img src={URL.createObjectURL(new Blob([file]))} alt="preview" width="60%" height="5%" />
                        )}
                        <div className="file-name">{fileName}</div>
                        <button
                            onClick={handleRemoveFile}
                            style={{
                                background: '#8990B6',
                                color: '#fff',
                                padding: '5px 6px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                )}

            </div>
            {fileError && <div className="error-message" style={{ color: 'red', fontSize: '9px', paddingTop: '1.4px' }}>{fileError}</div>}

        </div>
    );
};
