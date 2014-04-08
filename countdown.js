// calculates remaining time and writes to DOM
function setTime() {
    var currentTime = Date.now();

    console.log(currentTime);
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
    var countdownId = "#countdown", // selector for element
        countdownNode = document.querySelector(countdownId), // get element
        countdownData = countdownNode.getAttribute("data-count-date"), // get the time and date as UTC formatted string
        countdownTime = setUTC(countdownData);

    console.log(countdownTime);

    // check that element exists
    if (typeof countdownNode == "object") {
        var refreshCountdown = window.setInterval(setTime, 1);
        clearInterval(refreshCountdown);
    }
}

// run main function when window loads
window.onload = countdown;