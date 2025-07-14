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

function generateSeat(rowNumber, students, sieKurkul, sieIT, sieLogistik) {
    const resultRowSeats = [];

    if (rowNumber <= 3) {
        for (let i = 0; i < 7; i++) {
            if (rowNumber === 1 && (i === 0 || i === 1)) resultRowSeats.push("?");
            else resultRowSeats.push(students.shift());
        }
    }

    else if (rowNumber == 4) {
        for (let i = 0; i < 8; i++) {
            resultRowSeats.push(students.shift());
        }
    }

    else if (rowNumber == 5) {
        let i = 0;
        while (students.length > 0 || i < 7) {
            if (i === 4) resultRowSeats.push(sieIT);
            else if (i === 5) resultRowSeats.push(sieKurkul);
            else if (i === 6) resultRowSeats.push(sieLogistik);
            else resultRowSeats.push(students.shift());
            i++;
        }
    }

    return resultRowSeats;
}

function getSieITName(sieIT) {
    if (sieIT == 4) return "Carissa";
    else if (sieIT == 34) return "Wilson";
    else if (sieIT == 35) return "Yonami";
    else return "?";
}

function getLogistikName(sieLogistik) {
    if (sieLogistik == 9) return "Evan";
    else if (sieLogistik == 13) return "Ivan";
    else if (sieLogistik == 15) return "Jeremy";
    else if (sieLogistik == 30) return "Steven";
    else return "?";
}

function SeatLayout() {
    let itStudents = [35, 34, 4];
    let logistikStudents = [9, 13, 15, 30]; 

    const sieKurkul = 17;

    const currentWeek = ((new Date() - new Date("2025-06-22")) / (1000 * 60 * 60 * 24 * 7));
    const itIndex = Math.round(currentWeek) % itStudents.length;
    const logistikIndex = Math.round(currentWeek) % logistikStudents.length;

    const sieIT = itStudents[itIndex];
    const sieLogistik = logistikStudents[logistikIndex];

    const students = Array.from({ length: 35 }, (_, i) => i + 1)
        .filter((number) => ![17, sieIT, sieLogistik].includes(number))

    shuffleArray(students);
    shuffleArray(students);
    shuffleArray(students);

    return (
        <div className="seat-layout-container">
            <div className="container">
                <div className="left">
                    <div className="seat-row">
                        <Seat studentNumber="?" />
                        {generateSeat(1, students, sieKurkul, sieIT, sieLogistik).map((number) => (
                            <Seat key={number} studentNumber={number} />
                        ))}
                    </div>
                    <div className="seat-row">
                        <Seat studentNumber="?" />
                        {generateSeat(2, students, sieKurkul, sieIT, sieLogistik).map((number) => (
                            <Seat key={number} studentNumber={number} />
                        ))}
                    </div>
                    
                    <div className="seat-row">
                        <Seat studentNumber="?" />
                        {generateSeat(3, students, sieKurkul, sieIT, sieLogistik).map((number) => (
                            <Seat key={number} studentNumber={number} isRecording={number.isRecording} />
                        ))}
                    </div>
                </div>
                <div className="right">
                    <div className="notes">
                        <p className="header">Notes:</p>
                        <div className="contents">
                            <p>Special Roles:</p>
                            <p className="kurkul">Sie Kurkul = 17 (Leonard)</p>
                            <p className="it">Sie IT = {sieIT} ({getSieITName(sieIT)})</p>
                            <p className="logistik">Sie Logistik = {sieLogistik} ({getLogistikName(sieLogistik)})</p>
                        </div>
                        <p>Refresh to regenerate!</p>
                    </div>
                </div>
            </div>
            <div className="seat-row">
                <Seat studentNumber="?" />
                {generateSeat(4, students, sieKurkul, sieIT, sieLogistik).map((number) => (
                    <Seat key={number} studentNumber={number} />
                ))}
                <Seat studentNumber="?" />
                <Seat studentNumber="?" />
            </div>
            <div className="seat-row">
                <Seat studentNumber="?" />
                {generateSeat(5, students, sieKurkul, sieIT, sieLogistik).map((number) => (
                    <Seat key={number} studentNumber={number} isRecording={number === sieIT} isLogistik={number === sieLogistik} />
                ))}
                <Seat studentNumber="?" />
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