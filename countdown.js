function accountForBST(future) {
    var currentlyBST,
        futureBST,
        sumBST,
        milliDate,
        adjustMilliseconds;

    // check if current date is BST
    currentlyBST = isBSTinEffect(new Date());

    // check if countdown date is BST
    futureBST = isBSTinEffect(future);

    // check if BST is going to change
    /*********************************

		This gives the "truth table":

		Now   | Future | return
		-----------------------
		0     |  1     |  -1
		1     |  0     |   1
		0     |  0     |   0
		1     |  1     |   0

    **********************************/
    sumBST = currentlyBST + (futureBST * (-1));

    // +/- 1 hour in milliseconds
    adjustMilliseconds = sumBST * 3600000;

    // convert the future date to milliseconds
    milliDate = future.getTime();

    // add or subtract an hour to/form future date
    milliDate += adjustMilliseconds;
    future.setTime(milliDate);

    // return adjusted future date
    return future;
}

/*
  A function that determines whether BST is currently in effect in London,
  based on the date on the user's PC, but regardless of whether the user
  is in London, or somewhere else. BST runs between the last Sunday of
  March, and the last Sunday of October, with a varying date each year.
*/
function isBSTinEffect(countTo) {
    var d = countTo;

    // Loop over the 31 days of March for the current year
    for (var i = 31; i > 0; i--) {
        var tmp = new Date(d.getFullYear(), 2, i);

        // If it's Sunday
        if (tmp.getDay() == 0) {
            // last Sunday of March
            lSoM = tmp;

            // And stop the loop
            break;
        }
    }

    // Loop over the 31 days of October for the current year
    for (var i = 31; i > 0; i--) {
        var tmp = new Date(d.getFullYear(), 9, i);

        // If it's Sunday
        if (tmp.getDay() == 0) {
            // last Sunday of October
            lSoO = tmp;

            // And stop the loop
            break;
        }
    }

    // 0 = DST off (GMT)
    // 1 = DST on  (BST)
    if (d < lSoM || d > lSoO) return 0;
    else return 1;
}


// calculates remaining time and writes to DOM
function setTime(editNode, countTo) {
    var currentTime = Date.now(),
        remainingTime,
        remainingHours,
        remainingMinutes,
        remainingSeconds;

    remainingTime = countTo - currentTime; // get time difference in milliseconds
    remainingHours = (remainingTime / 3600000).toFixed(0); // 60 * 60 * 1000
    remainingMinutes = ((remainingTime % 3600000) / 60000).toFixed(0);
    remainingSeconds = ((remainingTime % 60000) / 1000).toFixed(0);

    editNode.innerHTML = remainingHours + ' hours ' + remainingMinutes + ' minutes ' + remainingSeconds + ' seconds ';
}

// takes string in UTC format and returns date object
function setUTC(dateString) {
    // set default values for UTC arguments
    var dateArray,
        utcDate,
        stringSplit,
        separator;

    separator = ',';
    // Set defaults
    dateArray = [1901, 0, 0, 0, 0, 0, 0];
    // comma separate string
    stringSplit = dateString.split(separator);

    // loop over array
    for (var i = 0; i < stringSplit.length; i++) {
        // asign to date array
        dateArray[i] = stringSplit[i]
    };

    // create and set date object	year		month				date 		hours 			minutes  	seconds 	  millseconds
    utcDate = new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3] - 1, dateArray[4], dateArray[5], dateArray[6]));

    // adjust for BST
    utcDate = accountForBST(utcDate);

    return utcDate;
}

// main function
function countdown() {
    var countdownId,
        countdownNode,
        countdownData,
        countdownTime;

    countdownId = "#countdown"; // selector for element
    countdownNode = document.querySelector(countdownId); // get element
    countdownData = countdownNode.getAttribute("data-count-date"); // get the time and date as UTC formatted string
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