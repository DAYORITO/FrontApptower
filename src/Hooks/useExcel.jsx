import { useState } from "react";

export const useExcel = (url) => {
    const [loading, setLoading] = useState(false);

    const downloadExcelFile = async (requestData) => {
        try {
            setLoading(true);

            const response = await fetch(url + 'excel', {
                method: 'POST', // Puedes usar el método HTTP que necesites
                headers: {
                    'Content-Type': 'application/json' // Ajusta el tipo de contenido según tus necesidades
                },
                body: JSON.stringify(requestData) // Convierte los datos a formato JSON si es necesario
            });

            if (!response.ok) {
                throw new Error('Error al descargar el archivo');
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'datos.xlsx';
            document.body.appendChild(link);
            link.click();
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
