import ReservationCarousel from './ReservationCarrousel.tsx';
import LastVisitsNotation from "./LastVisitsNotation.tsx";
import VisitorAttendanceRate from "./VisitorAttendanceRateGraph.tsx";


function Home() {
    return (
        <>
            <div className="flex flex-col justify-around gap-2 ">
                <ReservationCarousel/>
                <LastVisitsNotation/>
                <div className="flex items-center justify-start gap-2 ">
                    <VisitorAttendanceRate/>
                </div>
            </div>
        </>
    );

}

export default Home;