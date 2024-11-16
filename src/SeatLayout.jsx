import { useState } from 'react';
import Seat from "./Seat"

const femaleStudents_ori = [1, 6, 7, 9, 10, 18, 19, 20, 22, 24, 26, 29, 30, 31];
const maleStudents_ori = [2, 3, 4, 5, 8, 11, 12, 13, 16, 17, 21, 23, 25, 27, 28, 32, 33, 34, 35];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
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
            Yang dikeluarkan dari list:
            14 = Grace  -> TATIB
            15 = Hansen -> IT
    */
    let sieTatib = 14;
    let sieIT = 15;
    let [femaleStudents, setFemaleStudents] = useState([...femaleStudents_ori]); // unseated
    let [maleStudents, setMaleStudents] = useState([...maleStudents_ori]); // unseated

    function shuffleStudents() {
        setFemaleStudents(shuffleArray([...femaleStudents_ori]));
        setMaleStudents(shuffleArray([...maleStudents_ori]));
    }

    return (<>
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

        <button onClick={shuffleStudents}>Shuffle Students</button>
    </>);
}

export default SeatLayout;