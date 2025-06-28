import "./Seat.css";
import PropTypes from "prop-types";
function Seat({ studentNumber, isRecording, isLogistik }) {
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
    else if (studentNumber == 17){
        return (
            <div className="seat seat__kurkul">{studentNumber.toString().padStart(2, '0')}</div>
        )
    }
    else if (isRecording){
        return (
            <div className="seat seat__it">{studentNumber.toString().padStart(2, '0')}</div>
        )
    } else if (isLogistik) {
        return (
            <div className="seat seat__logistik">{studentNumber.toString().padStart(2, '0')}</div>
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

Seat.propTypes = {
    studentNumber: PropTypes.number,
    isRecording: PropTypes.bool,
    isLogistik: PropTypes.bool
};

export default Seat;