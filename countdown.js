// calculates remaining time and writes to DOM
function setTime(editNode, countTo) {
    var currentTime = Date.now(),
        remainingTime,
        remainingHours,
        remainingMinutes,
        remainingSeconds;

    remainingTime = countTo - currentTime;
    remainingHours = (remainingTime / 3600000).toFixed(0); // 60 * 60 * 1000
    remainingMinutes = (remainingTime % 3600000 / 60000).toFixed(0);
    remainingSeconds = (remainingTime % 60000 / 1000).toFixed(0);

    editNode.innerHTML = remainingHours + ' hours ' + remainingMinutes + ' minutes ' + remainingSeconds + ' seconds ';
}

// takes string in UTC format and returns date object
function setUTC(dateString) {
    // set default values for UTC arguments
    var dateArray = [1901, 0, 0, 0, 0, 0, 0],
        utcDate,
        stringSplit,
        separator = ',';


    stringSplit = dateString.split(separator);

    // loop over array
    for (var i = 0; i < stringSplit.length; i++) {
        // asign to date array
        dateArray[i] = stringSplit[i]
    };

    // create and set date object
    utcDate = new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5], dateArray[6]));

    return utcDate;
}

// main function
function countdown() {
    var countdownId,
        countdownNode,
        countdownData,
        countdownTime;

    countdownId = "#countdown", // selector for element
    countdownNode = document.querySelector(countdownId), // get element
    countdownData = countdownNode.getAttribute("data-count-date"), // get the time and date as UTC formatted string
    countdownTime = setUTC(countdownData); // use data to create Date object

    // check that element exists
    if (typeof countdownNode == "object") {

        // display time immediately
        setTime(countdownTime);

        // update time once per second
        setInterval(function() {
            setTime(countdownNode, countdownTime);
        }, 1000);
    }
}

// run main function when window loads
window.onload = countdown;