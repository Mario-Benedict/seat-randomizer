import Seat from "./Seat"

// Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateSeat(rowNumber, femaleStudents, maleStudents, sieTatib, sieIT) {
    let resultRowSeats = [];

    if (rowNumber == 1 || rowNumber == 2) {
        if (rowNumber == 1) {
            for (let i = 0; i < 9; i++) {
                if (i % 2 === 0) resultRowSeats.push(maleStudents.shift());
                else resultRowSeats.push(femaleStudents.shift());
            }
        }
        else {
            for (let i = 0; i < 9; i++) {
                if (i < 6) {
                    if (i == 3) resultRowSeats.push(sieTatib);
                    else if (i == 4) resultRowSeats.push(sieIT);

                    else {
                        if (i % 2 == 0) resultRowSeats.push(maleStudents.shift());
                        else resultRowSeats.push(femaleStudents.shift());
                    }
                }
                else {
                    if (i % 2 == 0) resultRowSeats.push(femaleStudents.shift());
                    else resultRowSeats.push(maleStudents.shift());
                }
            }
        }
    }
    
    else if (rowNumber == 3 || rowNumber == 4) {
        for (let i = 0; i < 6; i++) {
            if (i % 2 == 0) resultRowSeats.push(maleStudents.shift());
            else resultRowSeats.push(femaleStudents.shift());
        }
    }

    else if (rowNumber == 5) {
        while (maleStudents.length > 0) {
            resultRowSeats.push(maleStudents.shift());
        }
    }

    return resultRowSeats;
}

function SeatLayout() {
    /*
        NOTE:
            Removed from list:
            14 = Grace  -> TATIB
            15 = Hansen -> IT
    */
    let femaleStudents = [1, 6, 7, 9, 10, 18, 19, 20, 22, 24, 26, 29, 30, 31];
    let maleStudents = [2, 3, 4, 5, 8, 11, 12, 13, 16, 17, 21, 23, 25, 27, 28, 32, 33, 34, 35];
    let sieTatib = 14;
    let sieIT = 15;

    shuffleArray(femaleStudents);
    shuffleArray(maleStudents);

    return (
        <div className="seat-layout-container">
            <div className="seat-row long">
                <Seat studentNumber="?" />
                {generateSeat(1, femaleStudents, maleStudents, sieTatib, sieIT).map((number) => (
                    <Seat key={number} studentNumber={number} />
                ))}
            </div>
            <div className="seat-row long">
                <Seat studentNumber="?" />
                {generateSeat(2, femaleStudents, maleStudents, sieTatib, sieIT).map((number) => (
                    <Seat key={number} studentNumber={number} />
                ))}
            </div>
            <div className="seat-row short">
                <Seat studentNumber="?" />
                {generateSeat(3, femaleStudents, maleStudents, sieTatib, sieIT).map((number) => (
                    <Seat key={number} studentNumber={number} />
                ))}
            </div>
            <div className="seat-row short">
                <Seat studentNumber="?" />
                {generateSeat(4, femaleStudents, maleStudents, sieTatib, sieIT).map((number) => (
                    <Seat key={number} studentNumber={number} />
                ))}
            </div>
            <div className="seat-row short">
                <Seat studentNumber="?" />
                <Seat studentNumber="?" />
                {generateSeat(5, femaleStudents, maleStudents, sieTatib, sieIT).map((number) => (
                    <Seat key={number} studentNumber={number} />
                ))}
            </div>
        </div>
    );
}

export default SeatLayout;