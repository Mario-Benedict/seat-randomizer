import { firstSeatList, secondSeatList, thirdSeatList, fourthSeatList, fifthSeatList } from "../constants/seat";

const shuffleArray = (array) => {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const initializeList = () => {
    const studentsDict = {};

    for (let i = 1; i <= 35; i++) {
        studentsDict[i] = { seat: [], priority: 0 };
    }

    const updateSeats = (seatList, seatNumber) => {
        for (let i of seatList) {
            if (studentsDict[i]) {
                studentsDict[i].seat.push(seatNumber);
                studentsDict[i].priority += 1;
            }
        }
    };

    updateSeats(firstSeatList, 1);
    updateSeats(secondSeatList, 2);
    updateSeats(thirdSeatList, 3);
    updateSeats(fourthSeatList, 4);
    updateSeats(fifthSeatList, 5);

    for (let i = 1; i <= 35; i++) {
        if (studentsDict[i].priority === 0) {
            delete studentsDict[i];
        }
    }

    return studentsDict;
}

const getRandomIndex = (list) => {
    let index;
    do {
        index = Math.floor(Math.random() * 8);
    } while (list.includes(index));

    return index;
};

export const generateSeat = () => {
    const studentsDict = initializeList();
    
    const seat = {};

    for (let i = 1; i <= 5; i++) {
        seat[`seat${i}`] = [];
    }

    let tempList = [];

    let itStudents = [22, 26, 34];

    const currentWeek = ((new Date() - new Date("2025-01-26")) / (1000 * 60 * 60 * 24 * 7));
    const itIndex = Math.round(currentWeek) % itStudents.length;
    const sieIT = itStudents[itIndex];

    const firstTatibIndex = getRandomIndex([0, 4, 5, 7]);
    const secondTatibIndex = getRandomIndex([0, 7]);

    delete studentsDict[sieIT];

    // seat 1

    for (let i in studentsDict) {
        if (studentsDict[i].seat.includes(1)) {
            tempList.push({ [i]: studentsDict[i] });
        }
    }

    shuffleArray(tempList);

    for (let i of tempList) {
        if (seat.seat1.length >= 8) break;
        
        let studentKey = Object.keys(i)[0];
        let priority = i[studentKey].priority;
        
        if (priority <= 3) {
            seat.seat1.push(i);
        }
    }

    for (let i of seat.seat1) {
        let studentKey = Object.keys(i)[0];
        delete studentsDict[studentKey];
    }

    tempList.filter((item) => !seat.seat1.includes(item)).forEach((i) => {
        let studentKey = Object.keys(i)[0];
        studentsDict[studentKey].priority -= 1;
    });

    tempList = [];

    // seat 2

    let topPriority = [];
    let blackList = [firstTatibIndex, 4, 5];

    for (let i in studentsDict) {
        if (studentsDict[i].priority < 2) {
            const index = getRandomIndex(blackList)
            blackList.push(index);
            topPriority.push({ [i]: { ...studentsDict[i], index } });
        }
    }

    topPriority.sort((a, b) => a[Object.keys(a)[0]].index - b[Object.keys(b)[0]].index);

    for (let i of topPriority) {
        delete studentsDict[Object.keys(i)[0]];
    }
    
    for (let i in studentsDict) {
        if (studentsDict[i].seat.includes(2)) {
            tempList.push({ [i]: studentsDict[i] });
        }
    }

    shuffleArray(tempList);

    for (let [i, value] of tempList.entries()) {
        if (seat.seat2.length >= 8) break;
        
        if (topPriority.length > 0 && i === topPriority[0][Object.keys(topPriority[0])[0]].index) {
            seat.seat2.push(topPriority.shift());
            continue;
        }

        if (i === firstTatibIndex) {
            seat.seat2.push({ [5]: { seat: [2], priority: 0 } });
            continue;
        } else if (i === 4) {
            seat.seat2.push({ [sieIT]: { seat: [2], priority: 0 } });
            continue
        } else if (i === 5) {
            seat.seat2.push({2: { seat: [2], priority: 0 }});
            continue;
        }

        let studentKey = Object.keys(value)[0];
        let priority = value[studentKey].priority;
        
        if (priority <= 2 ) {
            seat.seat2.push(value);
        }
    }

    for (let i of seat.seat2) {
        let studentKey = Object.keys(i)[0];
        delete studentsDict[studentKey];
    }

    tempList.filter((item) => !seat.seat2.includes(item)).forEach((i) => {
        let studentKey = Object.keys(i)[0];
        studentsDict[studentKey].priority -= 1;
    });

    // seat 3

    tempList = [];
    blackList = [];
    topPriority = [];

    blackList = [secondTatibIndex];

    for (let i in studentsDict) {
        if (studentsDict[i].priority < 2) {
            const index = getRandomIndex(blackList)
            blackList.push(index);
            topPriority.push({ [i]: { ...studentsDict[i], index } });
        }
    }

    topPriority.sort((a, b) => a[Object.keys(a)[0]].index - b[Object.keys(b)[0]].index);

    for (let i of topPriority) {
        delete studentsDict[Object.keys(i)[0]];
    }
    
    for (let i in studentsDict) {
        if (studentsDict[i].seat.includes(3)) {
            tempList.push({ [i]: studentsDict[i] });
        }
    }

    shuffleArray(tempList);
    
    for (let [i, value] of tempList.entries()) {
        if (seat.seat3.length >= 8) break;
        
        if (topPriority.length > 0 && i === topPriority[0][Object.keys(topPriority[0])[0]].index) {
            seat.seat3.push(topPriority.shift());
            continue;
        }

        if (i === secondTatibIndex) {
            seat.seat3.push({ [29]: { seat: [3], priority: 0 } });
            continue;
        }

        let studentKey = Object.keys(value)[0];
        let priority = value[studentKey].priority;
        
        if (priority <= 2 ) {
            seat.seat3.push(value);
        }
    }

    for (let i of seat.seat3) {
        let studentKey = Object.keys(i)[0];
        delete studentsDict[studentKey];
    }

    tempList.filter((item) => !seat.seat3.includes(item)).forEach((i) => {
        let studentKey = Object.keys(i)[0];
        studentsDict[studentKey].priority -= 1;
    });

    // seat 4

    tempList = [];
    blackList = [];
    topPriority = [];

    for (let i in studentsDict) {
        if (studentsDict[i].priority < 2) {
            const index = getRandomIndex(blackList);
            blackList.push(index);
            topPriority.push({ [i]: { ...studentsDict[i], index } });
        }
    }
    
    topPriority.sort((a, b) => a[Object.keys(a)[0]].index - b[Object.keys(b)[0]].index);

    for (let i of topPriority) {
        delete studentsDict[Object.keys(i)[0]];
    }

    for (let i of topPriority) {
        seat.seat4.push(i);
    }

    for (let i in studentsDict) {
        tempList.push({ [i]: studentsDict[i] });
    }

    shuffleArray(tempList);

    while(tempList.length > 0) {
        seat.seat5.push(tempList.shift());
    }

    return seat;
}
