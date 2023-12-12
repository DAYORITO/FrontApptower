import React from 'react';
import Graphics from '../../Components/Graphics/Graphics';
import { LineChart } from '../../Components/graphics/LineChart';
import Circle from '../../Components/Graphics/Circle';
import Sumerize from '../../Components/Graphics/Sumerize';
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className='dashboardone'>
            <Graphics />
            <LineChart />
            <Circle />
            <Sumerize />
        </div>
    );
};

export default Dashboard;