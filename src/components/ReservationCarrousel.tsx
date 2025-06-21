

const reservations = [
    { date: '2023-12-06', location: 'Paris', name: 'Amber Loris', past: true },
    { date: '2023-12-08', location: 'Tokyo', name: 'Amber Loris', past: true },
    { date: '2023-12-13', location: 'London', name: 'Fedrick Kimper', today: true },
    { date: '2023-12-19', location: 'Bruxelles', name: 'Amber Loris', upcoming: true },
    { date: '2023-12-22', location: 'Berlin', name: 'Sam Duje', upcoming: true },
    { date: '2023-12-28', location: 'Tokyo', name: 'Fredrick Kimper', upcoming: true },{ date: '2023-12-19', location: 'Bruxelles', name: 'Amber Loris', upcoming: true },
    { date: '2023-12-22', location: 'Berlin', name: 'Sam Duje', upcoming: true },
    { date: '2023-12-28', location: 'Tokyo', name: 'Fredrick Kimper', upcoming: true },{ date: '2023-12-19', location: 'Bruxelles', name: 'Amber Loris', upcoming: true },
    { date: '2023-12-22', location: 'Berlin', name: 'Sam Duje', upcoming: true },
    { date: '2023-12-28', location: 'Tokyo', name: 'Fredrick Kimper', upcoming: true },{ date: '2023-12-19', location: 'Bruxelles', name: 'Amber Loris', upcoming: true },
    { date: '2023-12-22', location: 'Berlin', name: 'Sam Duje', upcoming: true },
    { date: '2023-12-28', location: 'Tokyo', name: 'Fredrick Kimper', upcoming: true },
];

const ReservationCarousel = () => {
    return (
        <div className="bg-white p-4 rounded shadow w-full ">
            <h2 className="font-bold mb-4">Calendar</h2>
            <div className="flex overflow-x-auto space-x-4">
                {reservations.map((reservation, index) => (
                    <div
                        key={index}
                        className={`flex-none w-40 p-4 rounded transition-all duration-300 ${
                            reservation.past ? 'bg-blue-200' :
                                reservation.today ? 'bg-purple-400' :
                                    'bg-blue-900'
                        } text-white`}
                    >
                        <div className="text-3xl font-bold">{new Date(reservation.date).getDate()}</div>
                        <div className="text-sm">{new Date(reservation.date).toLocaleString('default', { month: 'short' })}</div>
                        <div className="mt-2">{reservation.location}</div>
                        <div className="flex items-center mt-4">
                            <img
                                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                alt={reservation.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="ml-2">{reservation.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationCarousel;