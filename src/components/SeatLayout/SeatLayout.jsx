import "./SeatLayout.css"
import Seat from "../Seat/Seat"
import { generateSeat } from "../../helper/generateSeat";

// Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getSieITName(sieIT) {
    if (sieIT === 22) return "Reynaldi";
    else if (sieIT === 26) return "Shallom";
    else if (sieIT === 34) return "Wilson";
    else return "?";
}

function getTatibName(sieTatib) {
    if (sieTatib === 5) return "Claudia";
    else if (sieTatib === 29) return "Stephen";
    return "?";
}

function SeatLayout() {
    /*
        NOTE:
            Removed from list:
            5, 29 = Claudia, Stephen -> Tatib
            22, 26, 34 = Reynaldi, Shallom, Wilson -> IT
    */

    const students = [1, 3, 4, 6, 8, 9, 10, 12, 13, 14, 16, 18, 19, 20, 21, 23, 24, 27, 28, 30, 31, 33];
    const frontSeatStudents = [7, 11, 15, 25, 32, 17, 35];
    let itStudents = [22, 26, 34];
    let tatibStudents = [5, 29];

    const currentWeek = ((new Date() - new Date("2025-01-26")) / (1000 * 60 * 60 * 24 * 7));

    const itIndex = Math.round(currentWeek) % itStudents.length;

    const sieIT = itStudents[itIndex];

    for (const itStudent of itStudents) {
        if (itStudent != sieIT) {
            frontSeatStudents.push(itStudent);
        }
    }
    
    shuffleArray(students);
    shuffleArray(frontSeatStudents);

    const seat = generateSeat();

    // const studentsList = generateList();

    return (
        <div className="seat-layout-container">
            <div className="container">
                <div className="left">
                    <div className="seat-row">
                        <Seat studentNumber="none" />
                        {Array.from({ length: 3}).map((_, index) => {
                            return <Seat key={index} studentNumber="?" />
                        })}
                        {seat.seat5.map((obj) => {
                            return <Seat key={Object.keys(obj)[0]} studentNumber={Object.keys(obj)[0]} />
                        })}
                    </div>
                    <div className="seat-row">
                        <Seat studentNumber="none" />
                        {seat.seat4.map((obj) => {
                            return <Seat key={Object.keys(obj)[0]} studentNumber={Object.keys(obj)[0]} />
                        })}
                    </div>
                </div>
                <div className="right">
                    <div className="notes">
                        <p className="header">Notes:</p>
                        <div className="contents">
                            <p>Special Roles:</p>
                            <p className="kurkul">Sie Kurkul = 02 (Beben)</p>
                            <p className="it">Sie IT = {sieIT} ({getSieITName(sieIT)})</p>
                            {tatibStudents.sort().reverse().map((tatibStudent, index) => (
                                <p key={index} className="tatib">Sie Tatib = ({tatibStudent.toString().padStart(2, '0')}) ({getTatibName(tatibStudent)})</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="seat-row">
                <Seat studentNumber="?" />
                {seat.seat3.map((obj) => {
                    return <Seat
                        key={Object.keys(obj)[0]}
                        studentNumber={Object.keys(obj)[0]}
                        isRecording={Object.keys(obj)[0] === sieIT} />
                })}

                {Array.from({ length: 3}).map((_, index) => {
                    return <Seat key={index} studentNumber="?" />
                })}
            </div>
            <div className="seat-row">
                <Seat studentNumber="?" />
                
                {seat.seat2.map((obj) => {
                    return <Seat key={Object.keys(obj)[0]}
                        studentNumber={Object.keys(obj)[0]}
                        isRecording={Object.keys(obj)[0] == sieIT} />
                })}

                {Array.from({ length: 3}).map((_, index) => {
                    return <Seat key={index} studentNumber="?" />
                })}

            </div>
            <div className="seat-row">
                <Seat studentNumber="none" />
                {seat.seat1.map((obj) => {
                    return <Seat
                        key={Object.keys(obj)[0]}
                        studentNumber={Object.keys(obj)[0]}
                        isRecording={Object.keys(obj)[0] === sieIT} />
                })}

                <Seat studentNumber="?" />
            </div>

            <div className="seat-row">
                <Seat studentNumber="none" />
                <div className="lecturer-seat">Lecturer Seat</div>
            </div>
        </div>
    );
}

export default SeatLayout;