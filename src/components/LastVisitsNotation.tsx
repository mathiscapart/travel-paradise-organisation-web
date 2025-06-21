const visits = [
    {
        name: 'Amber Loris',
        img: 'https://i.pravatar.cc/150?img=1',
        town: 'Paris',
        date: '2024-12-20',
        notation: 3,
    },
    {
        name: 'Jen Affleck',
        img: 'https://i.pravatar.cc/150?img=2',
        town: 'Tokyo',
        date: '2024-12-20',
        notation: 4,
    },
    {
        name: 'Sam Duje',
        img: 'https://i.pravatar.cc/150?img=3',
        town: 'London',
        date: '2024-12-20',
        notation: 2,
    },
    {
        name: 'Fedrick Kimper',
        img: 'https://i.pravatar.cc/150?img=4',
        town: 'Rome',
        date: '2024-12-20',
        notation: 5,
    },
    {
        name: 'Chris Nolan',
        img: 'https://i.pravatar.cc/150?img=5',
        town: 'Berlin',
        date: '2024-12-20',
        notation: 4,
    },
];

const LastVisits = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4">Last visits</h2>
            <div className="flex justify-around overflow-x-auto space-x-4">
                {visits.map((visit, index) => (
                    <div key={index} className="flex  flex-col rounded ">
                        <div className="text-lg font-bold">{visit.town}</div>
                        <div className="text-sm">{new Date(visit.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                        <div className="flex items-center mt-2">
                            <img
                                src={visit.img}
                                alt={visit.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="ml-2">{visit.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastVisits;