import { useState } from "react";

export const useExcel = (url) => {

    const [loading, setLoading] = useState(false);

    const downloadExcelFile = async () => {
        try {
            setLoading(true);

            // Realizar la solicitud GET para descargar el archivo Excel
            const response = await fetch(url + 'excel');
            if (!response.ok) {
                throw new Error('Error al descargar el archivo');
            }

            // Convertir la respuesta a un Blob
            const blob = await response.blob();

            // Crear un objeto URL para el Blob
            const blobUrl = URL.createObjectURL(blob);

            // Crear un enlace <a> temporal
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'datos.xlsx'; // Nombre del archivo a descargar
            document.body.appendChild(link);

            // Hacer clic en el enlace para iniciar la descarga
            link.click();

            // Eliminar el enlace y liberar el objeto URL
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        } finally {
            setLoading(false);
        }
    };

    return { downloadExcelFile, loading };
};