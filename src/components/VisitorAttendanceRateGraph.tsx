import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Reservation {
    attendance: number;
    max_visitor: number;
}

const reservations: Reservation[] = [
    { attendance: 50, max_visitor: 100 },
    { attendance: 75, max_visitor: 100 },
    { attendance: 60, max_visitor: 80 },
    { attendance: 120, max_visitor: 150 },
    { attendance: 80, max_visitor: 100 },
];

const calculateAverageAttendanceRate = (reservations: Reservation[]): number => {
    const totalAttendance = reservations.reduce((sum, r) => sum + r.attendance, 0);
    const totalCapacity = reservations.reduce((sum, r) => sum + r.max_visitor, 0);
    return (totalAttendance / totalCapacity) * 100;
};

const VisitorAttendanceRate: React.FC = () => {
    const averageRate = calculateAverageAttendanceRate(reservations).toFixed(2);

    return (
        <div className="bg-white p-4 rounded shadow w-64">
            <h2 className="font-bold mb-4">Visitor attendance rate</h2>
            <CircularProgressbar
                value={parseFloat(averageRate)}
                text={`${averageRate}%`}
                styles={buildStyles({
                    textColor: "#333",
                    pathColor: "#c27aff",
                    trailColor: "#e0e7ff",
                })}
            />
        </div>
    );
};

export default VisitorAttendanceRate;