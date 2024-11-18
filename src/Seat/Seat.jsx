import "./Seat.css"

function Seat({ studentNumber }){
    if (studentNumber == 'none'){
        return (
            <div className="seat seat__none"></div>
        )
    }
    else if (studentNumber == '?'){
        return (
            <div className="seat seat__empty">{studentNumber}</div>
        )
    }
    else if (studentNumber == 14){
        return (
            <div className="seat seat__tatib">{studentNumber}</div>
        )
    }
    else if (studentNumber == 15){
        return (
            <div className="seat seat__it">{studentNumber}</div>
        )
    }
    else {
        return (
            <div className="seat">
                {
                    (studentNumber == '?')? studentNumber:
                        studentNumber.toString().padStart(2, '0')
                }
            </div>
        )
    }
}

export default Seat;