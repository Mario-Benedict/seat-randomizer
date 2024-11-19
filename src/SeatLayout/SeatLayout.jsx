import "./SeatLayout.css"
import Seat from "../Seat/Seat"

// Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateSeat(rowNumber, students, frontSeatStudents, sieKurkul, sieIT) {
    const resultRowSeats = [];

    if (rowNumber == 1 || rowNumber == 2 || rowNumber == 3) {
        for (let i = 0; i < 6; i++) {
            if (rowNumber == 1 && i == 0) resultRowSeats.push("?");
            else resultRowSeats.push(students.shift());
        }
    }

    else if (rowNumber == 4) {
        for (let i = 0; i < 9; i++) {
            if (i < 4) resultRowSeats.push(frontSeatStudents.shift());
            else resultRowSeats.push(students.shift());
        }
    }

    else if (rowNumber == 5) {
        let i = 0;

        while (frontSeatStudents.length > 0) {
            if (i == 4) resultRowSeats.push(sieKurkul); 
            else if (i == 3) resultRowSeats.push(sieIT);
            else resultRowSeats.push(frontSeatStudents.shift());
            i++;
        }

        while (students.length > 0) {
            resultRowSeats.push(students.shift());
        }
    }

    return resultRowSeats;
}

function getSieITName(sieIT) {
    if (sieIT == 17) return "Leonard";
    else if (sieIT == 22) return "Reynaldi";
    else if (sieIT == 32) return "Fernandes";
    else return "?";
}

function SeatLayout() {
    /*
        NOTE:
            Removed from list:
            5 = Claudia  -> Kurkul
            17, 22, 32 = Leonard, Reynaldi, Fernandes -> IT
    */

    const students = [1, 3, 4, 6, 8, 9, 10, 12, 13, 14, 16, 18, 19, 20, 21, 23, 24, 27, 28, 29, 30, 31, 33];
    const frontSeatStudents = [2, 7, 11, 15, 25, 26, 34, 35];
    let itStudents = [17, 22,32];

    const sieKurkul = 5;
    const sieIT = itStudents[Math.floor(Math.random() * itStudents.length)];

    for (const itStudent of itStudents) {
        if (itStudent != sieIT) {
            frontSeatStudents.push(itStudent);
        }
    }
    
    shuffleArray(students);
    shuffleArray(frontSeatStudents);

    return (
        <div className="seat-layout-container">
            <div className="container">
                <div className="left">
                    <div className="seat-row">
                        <Seat studentNumber="?" />
                        <Seat studentNumber="?" />
                        {generateSeat(1, students, frontSeatStudents, sieKurkul, sieIT).map((number) => (
                            <Seat key={number} studentNumber={number} />
                        ))}
                    </div>
                    <div className="seat-row">
                        <Seat studentNumber="?" />
                        <Seat studentNumber="?" />
                        {generateSeat(2, students, frontSeatStudents, sieKurkul, sieIT).map((number) => (
                            <Seat key={number} studentNumber={number} />
                        ))}
                    </div>
                    
                    <div className="seat-row">
                        <Seat studentNumber="?" /> 
                        <Seat studentNumber="?" />
                        {generateSeat(3, students, frontSeatStudents, sieKurkul, sieIT).map((number) => (
                            <Seat key={number} studentNumber={number} isRecording={number.isRecording} />
                        ))}
                    </div>
                </div>
                <div className="right">
                    <div className="notes">
                        <p className="header">Notes:</p>
                        <div className="contents">
                            <p>Special Roles:</p>
                            <p className="kurkul">Sie Kurkul = 05 (Claudia)</p>
                            <p className="it">Sie IT = {sieIT} ({getSieITName(sieIT)})</p>
                        </div>
                        <p>Refresh to regenerate!</p>
                    </div>
                </div>
            </div>
            <div className="seat-row">
                <Seat studentNumber="?" />
                <Seat studentNumber="?" />
                {generateSeat(4, students, frontSeatStudents, sieKurkul, sieIT).map((number) => (
                    <Seat key={number} studentNumber={number} />
                ))}
            </div>
            <div className="seat-row">
                <Seat studentNumber="?" />
                <Seat studentNumber="?" />
                {generateSeat(5, students, frontSeatStudents, sieKurkul, sieIT).map((number) => (
                    <Seat key={number} studentNumber={number} isRecording={number == sieIT} />
                ))}
            </div>

            <div className="seat-row">
                <Seat studentNumber="none" />
                <div className="lecturer-seat">Lecturer Seat</div>
            </div>
        </div>
    );
}

export default SeatLayout;