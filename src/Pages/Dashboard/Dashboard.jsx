import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './dashboard.css';

const Dashboard = () => {
    const [visitsData, setVisitsData] = useState({});
    const [sanctionedApartmentsData, setSanctionedApartmentsData] = useState({});
    // Agrega más estados para otras métricas si es necesario

    useEffect(() => {
        // Simulación de datos para las gráficas
        const mockVisitsData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [
                {
                    label: 'Cantidad de visitas',
                    data: [30, 40, 55, 25, 45, 60],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };
        setVisitsData(mockVisitsData);

        const mockSanctionedApartmentsData = {
            labels: ['Apartamento 1', 'Apartamento 2', 'Apartamento 3', 'Apartamento 4', 'Apartamento 5'],
            datasets: [
                {
                    label: 'Apartamentos sancionados',
                    data: [3, 2, 5, 1, 4],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
        setSanctionedApartmentsData(mockSanctionedApartmentsData);
    }, []);

    useEffect(() => {
        // Configurar gráficas
        if (visitsData.labels && visitsData.datasets) {
            const ctxVisits = document.getElementById('visitsChart');
            new Chart(ctxVisits, {
                type: 'bar',
                data: visitsData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        if (sanctionedApartmentsData.labels && sanctionedApartmentsData.datasets) {
            const ctxSanctionedApartments = document.getElementById('sanctionedApartmentsChart');
            new Chart(ctxSanctionedApartments, {
                type: 'bar',
                data: sanctionedApartmentsData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [visitsData, sanctionedApartmentsData]);

    return (
        <div className="dashboard">
            <div className="chart-container">
                <h2>Cantidad de visitas por mes</h2>
                <canvas id="visitsChart" width="400" height="200"></canvas>
            </div>
            <div className="chart-container">
                <h2>Top de apartamentos sancionados</h2>
                <canvas id="sanctionedApartmentsChart" width="400" height="200"></canvas>
            </div>
            {/* Agrega más gráficas según las necesidades */}
        </div>
    );
};

export default Dashboard;
