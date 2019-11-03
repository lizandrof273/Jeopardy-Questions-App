/*These globals can be set by the user and if left like 
that it will know that the user did not choose to filter by
this*/
var questionDiff = 0;
var category = 0;
var yearBefore = 0, monthBefore = 0, dayBefore = 0, yearBeforeHold = 0, monthBeforeHold = 0, dayBeforeHold = 0,
yearAfter = 0, monthAfter= 0, dayAfter = 0, yearAfterHold = 0, monthAfterHold = 0, dayAfterHold = 0
year = 0, month = 0, day = 0;

/**These two will later be filled with the data
 from the url with user prefernce to eventualy 
 displayed in the html*/
var question = "";
var answer = "";

/**notFirst will be used to know if it was the first 
thing the user added so I can add to the url correctly, 
if there is something else in it then I know to and an 
& instead of just start it. 
This also tells me if left false that the user did not 
select anything so then I will proceed to just use the
random url*/
var notFirst = false; 

// This url will be added on to depending on what user wants
var url = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/";

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
get a range. or now slect that exact year.
It is getting them from their input in the html page*/
function changeYearBefore() {
    yearBefore = document.getElementById("selectyearbefore").value;
}
function changeMonthBefore() {
    monthBefore = document.getElementById("selectmonthbefore").value;
}
function changeDayBefore() {
    dayBefore = document.getElementById("selectdaybefore").value;
}
function changeYearAfter() {
    yearAfter = document.getElementById("selectyearafter").value;
}
function changeMonthAfter() {
    monthAfter = document.getElementById("selectmonthafter").value;
}
function changeDayAfter() {
    dayAfter = document.getElementById("selectdayafter").value;
}
function changeYear() {
    year = document.getElementById("selectyear").value;
}
function changeMonth() {
    month = document.getElementById("selectmonth").value;
}
function changeDay() {
    day = document.getElementById("selectday").value;
}

/*This function is being called when the button is
clicked to search for a question. It needs to decide 
which url it will pull from, this is done at the 
start when  typeOfQuestion() is called. Then it fetches 
the json data. Then after it calls cleanUp to make sure 
the question is not empty and there is a question like that. It will
then pull the question and answer then call output when ready*/
function getQuestion() {
    typeOfQuestion()
    fetch(url)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        cleanUp(data)
    })
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
        url = url + "clues?category=" + category;
        notFirst = true;
    } 

    /*Deal with the dates in the url*/

    /*Here if the year, which is the specific date that the user is
    looking for is filled, we should ignore id anything is filled 
    in the after and before so we make those equal to the specific date 
    the user wants, it does not matter if they did not fill out the 
    month and day we can sort by just the whole year for example. Becuase 
    we set those to year it will go through the process of setting yearBefore
    and yearAfter with one date which will means it will be that specific date 
    becuase 2018-2018 is still 2018. If it is not selected then it will
    just go through normally and check if there is any in between dates*/
    if (year != 0) {
        // hold var are to change back to orignal, below is better explaition
        yearAfterHold = yearAfter;
        yearBefore = yearBefore;
        monthBefore = monthBeforeHold;
        monthAfter = monthAfterHold;
        dayBefore = dayBeforeHold;
        dayAfter = dayAfterHold;
        yearAfter = year;
        yearBefore = year;
        monthAfter = month;
        monthBefore = month; 
        dayAfter = day;
        dayBefore = day;
    } 
    if (yearBefore != 0) {
         /**notFirst is checking if it was the first thing the user added
        becasue then it should notify the rest of the categories by 
        switching it to true. It is different if it is first than 
        other postions, look at the top where it is defined for more detial*/
        if (!notFirst) {
            url = url + "clues?max_date=" + yearBefore;
            notFirst = true;
        } else {
            url = url + "&max_date=" + yearBefore;
        }
        if(monthBefore != 0) {
            url = url + "-" + monthBefore;
        } 
        /**else is needed bc user could have not selected these but something needs to  
        be put into it fot it to function */
        else {
            url = url + "-12";
        }
        if(dayBefore != 0) {
            url = url + "-" + dayBefore;
        } else {
            url = url + "-31";
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
        } else {
            url = url + "-01";
        }
        if(dayAfter != 0) {
            url = url + "-" + dayAfter;
        } else {
            url = url + "-01";
        }
    }
 
    /*This is needed becuase I cannot leave the before and
    after varaibles to be the year if it is one becuase if I do
    a bug happens where although the year is no longer there the 
    before and after keep it and it has difffrent values then the
    user has selected on the screen unless picked again after 
    the fact, this bug took me awhile to find and confused me with
    the logs changing randomly when the year had been set to any and 
    it had never eneted to change the year again*/
    if (year != 0) {
        yearBefore = yearBeforeHold;
        yearAfter = yearBeforeHold;
        monthAfter = monthAfterHold;
        monthBefore = monthBeforeHold;
        dayAfter = dayAfterHold;
        dayBefore = dayBeforeHold;
    }
    /*deals with the difficulty in the same ways as the others*/
    if (questionDiff != 0) {
        if (!notFirst) {
            url = url + "clues?=value" + questionDiff;
            notFirst = true;
        } else {
            url = url + "&value=" + questionDiff;
        }
    }
    /**If nothing is selected then it shall return
    a random url question. notFirst knows the user
    did not have input becuase if there was noFirst after 
    going through all of it there was none. */ 
    if (!notFirst) {
        url =  url + "random";
    }
}

/*This function makes sure we are not building off 
of the previous url, it is called from typeOfQuestions 
and also resets notFirst*/
function reset() {
    if (url != "https://cors-anywhere.herokuapp.com/http://jservice.io/api/") {
        url = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/";
        notFirst = false;
    }
}

/**
 * cleanUp takes data from where we pull from the url 
 * provided from going through typeOfQuestion() and then 
 * processed by getQuestion() , which is what calls cleanUp.
 * It takes the Json data given from getQuestion and first
 * checks that it is not empty. If it is empty it will tell 
 * user to be more broad. If it is not empty then it goes on
 * to check that the label for answer and question is not left 
 * out, then after it has a working question and answer it will
 * call outputQ that will then post to the webpage for the user 
 * to see the result
 * @param {} data 
 */
function cleanUp(data) {
    if (data.length != 0) {
        var timeOut = 0;
        //chooses out of the options randomly so it is not the same ones over again
        var randIndex = chooseIndex(data.length);
        //males sure that the field is not empty
        while (data[randIndex].question == "" || data[randIndex].answer == "" || timeOut > 20) {
            randIndex = chooseIndex(data.length)
            timeOut++;
        }
        timeOut = 0;
        question = data[randIndex].question;
        answer = data[randIndex].answer;
    } else {
        question = "There was no question that matched your critera,Try making your parameters more broad, remember not every category has to be selected";
        answer = "Note: If searching by date, make sure their was a show aired that date, or fill in less specifically, for example if you fill in the year and month it will search all the shows that month for that year instead of looking for one day specifically";
    }
    outputQ()
}

/*This function looks at the amount of different questions we have to
display and then picks and index between 0 and size - 1. This is
used to easily grab this data*/
function chooseIndex(choices) {
    var index = Math.floor(Math.random() * choices);
    return index;
}

/*These are writing to the website to be display the question
This is being called from cleanUP*/
function outputQ() {
    document.getElementById("insertQuestionTitle").innerHTML = "Your Question:";
    document.getElementById("insertQuestion").innerHTML = question;
    document.getElementById("insertAnswerTitle").innerHTML = "Answer:";
    document.getElementById("insertAnswer").innerHTML = answer;
}