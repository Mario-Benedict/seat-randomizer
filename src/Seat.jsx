
function Seat({ key, studentNumber }){
    return (<>
        <div className="seat">
            {
                (studentNumber == '?')? studentNumber:
                    studentNumber.toString().padStart(2, '0')
            }
        </div>
    </>)
}

export default Seat;