function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomBoolean() {
    return Math.random() >= 0.5;
}
var timer = document.getElementById("timer")
let seconds;
let tens;
function startTimer() {
    tens++;
    if (tens <= 9) {
    }
    if (tens > 9) {
    }
    if (tens > 99) {
        seconds++;
        tens = 0;
    }

    if (seconds > 9) {
        // appendSeconds.innerHTML = seconds;
    }
    timer.innerHTML = seconds + ":" + tens;
}
let Interval;
function start() {
    tens = 0;
    seconds = 0;
    Interval = setInterval(startTimer, 10);
}
function currenttime() {
    return seconds + ":" + tens;
}
function stopTimer() {
    clearInterval(Interval);
}

/* 
    [
        {
            mario: 1,
            timetaken: 0:10
        },
        {
            mario: 2,
            timetaken: 0:20
        }
    ]
*/
// convert array into csv
const convertArrayObjectToCSV = (array) => {
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const columnnames = [
        'mario',
        'timetaken'
    ]
    let result = '';
    result += columnnames.join(columnDelimiter);
    result += lineDelimiter;
    array.forEach(item => {
        /* get the first value of obj item */
        let firstvalue = Object.values(item)[0].mario;
        let secondvalue = Object.values(item)[0].timetaken;
        console.log('firstvalue', firstvalue);
        console.log('secondvalue', secondvalue);
        result += firstvalue + columnDelimiter;
        result += secondvalue + columnDelimiter;
        result += lineDelimiter;
    });
    console.log('result', result);
    return result;

};
// download csv
const downloadCSV = (array) => {
    const link = document.createElement('a');
    let csv = convertArrayObjectToCSV(array);
    console.log('csv', csv);
    if (csv == null) return;
    const filename = filenamefn() + '.csv';
    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
};


function filenamefn() {
    var d = new Date();
    var n = d.getTime();
    return n;
}
export {
    getRandomArbitrary, generateRandomBoolean, startTimer, stopTimer, start, currenttime, downloadCSV
};

