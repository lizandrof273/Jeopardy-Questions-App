/*gets question and puts choices in an array*/
var questionDiff = 0;
var category = "";
var yearBefore = 0, monthBefore = 0, dayBefore = 0, 
yearAfter = 0, monthAfter = 0, dayAfter = 0;
var question = "";
var answer = "";
var notFirst = false; 
var url = "http://jservice.io/api/";
//getting difficultly user selected
function changeDiff() {
    questionDiff = document.getElementById("selectDiff").value;
}
/*This function I am getting what the user selected and
putting into a global for later use*/
function changeCat() {
    category = document.getElementById("selectCat").value;
}
/*These below are getting the date for the dates 
the user wants. They can pick both to before and after to 
get a range*/
function changeYearBefore() {
    yearBefore = document.getElementById("selectyearbefore").value;
    console.log(yearBefore);
}
function changeMonthBefore() {
    monthBefore = document.getElementById("selectmonthbefore").value;
    console.log(monthBefore);
}
function changeDayBefore() {
    dayBefore = document.getElementById("selectdaybefore").value;
    console.log(dayBefore);
}
function changeYearAfter() {
    yearAfter = document.getElementById("selectyearafter").value;
    console.log(yearAfter);
}
function changeMonthAfter() {
    monthAfter = document.getElementById("selectmonthafter").value;
    console.log(monthAfter);
}
function changeDayAfter() {
    dayAfter = document.getElementById("selectdayafter").value;
    console.log(dayAfter);
}

/*It needs to decide which url it will pull from then it is being
called after the submit button to get a new question is being 
clicked in the html page*/
function getQuestion() {
    typeOfQuestion()
    fetch(url)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        console.log(url)
        console.log(data.length)
        cleanUp(data)
    })
    /** typeOfQuestion()
    fetch(url)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        if (data.length = 0) {
            question = "There was no question that matched your critera"
            answer = "Try making your parameters more broad, remember not every category has to be selected"
        } else {
            var randIndex = chooseIndex(data.length)
            var timeOut = 0;
            // if any are empty do process again until none of them are like this
            /*while (data[randIndex].question == "" || data[randIndex].answer == "" || timeOut > 20) {
                randIndex = chooseIndex(data.length)
                timeOut++;
            }**/
            /*console.log(url)
            console.log(data)
            question = data[randIndex].question;
            answer = data[randIndex].answer;
            console.log(data[randIndex])
        }
        outputQ()
    }) */ 
}

/*This function looks at the amount of different questions we have to
display and then picks and index between 0 and size - 1. This is
used to easily grab this data*/
function chooseIndex(choices) {
    var index = Math.floor(Math.random() * choices);
    return index;
}

/*This function is responsible for creating the url for the api,
first it resets the url, then it looks through what the user has given 
and builds something following those parameters*/
function typeOfQuestion() {
    /**resets to make sure the last url does not affect this one
    we reset notFirst which checks if it is the first part being
    added and the url*/
    reset()
    //checks if category was selcted and assigns to the url
    if (category != 0) {
        if (!notFirst) {
            url = url + "clues?category=" + category;
            notFirst = true;
        } else {
            url = url + "&category=" + category;
        }
    } 

    /*Deal with the dates*/
    if (yearBefore != 0) {
        if (!notFirst) {
            url = url + "clues?min_date=" + yearBefore;
            notFirst = true;
        } else {
            url = url + "&min_date=" + yearBefore;
        }
        if(monthBefore != 0) {
            url = url + "-" + monthBefore;
            if(dayBefore != 0) {
                url = url + "-" + dayBefore;
            } 
        } 
    } 
    if (yearAfter != 0) {
        if (!notFirst) {
            url = url + "clues?min_date=" + yearAfter;
            notFirst = true;
        } else {
            url = url + "&min_date=" + yearAfter;
        }
        if(monthAfter != 0) {
            url = url + "-" + monthAfter;
            notFirst = true;
            if(dayAfter != 0) {
                url = url + "-" + dayAfter;
            } 
        } 
    } 

    /*deals with the difficulty*/
    if (questionDiff != 0) {
        if (!notFirst) {
            url = url + "clues?=value" + questionDiff;
            notFirst = true;
        } else {
            url = url + "&value=" + questionDiff;
        }
    }

    /**If nothing is selected then it shall return
    a random url question.*/ 
    if (!notFirst) {
        url =  url + "random";
    }
}

/*This function makes sure we are not building off 
of the previous url, it is called from typeOfQuestions*/
function reset() {
    if (url != "http://jservice.io/api/") {
        url = "http://jservice.io/api/";
        notFirst = false;
    }
}

function cleanUp(data) {
    if (data.length != 0) {
        var timeOut = 0;
        var randIndex = chooseIndex(data.length);
        while (data[randIndex].question == "" || data[randIndex].answer == "" || timeOut > 20) {
            randIndex = chooseIndex(data.length)
            timeOut++;
        }
        timeOut = 0;
        question = data[randIndex].question;
        answer = data[randIndex].answer;
        console.log(data[randIndex]);
    } else {
        question = "There was no question that matched your critera";
        answer = "Try making your parameters more broad, remember not every category has to be selected";
    }
    outputQ()
}

/*These are writing to the website to be display the question
This is being called from getQuestion*/
function outputQ() {
    document.getElementById("insertQuestionTitle").innerHTML = "Your Question:";
    document.getElementById("insertQuestion").innerHTML = question;
    document.getElementById("insertAnswerTitle").innerHTML = "Answer:";
    document.getElementById("insertAnswer").innerHTML = answer;
    //document.getElementById("note").innerHTML = "Some data may be missing from API";
}