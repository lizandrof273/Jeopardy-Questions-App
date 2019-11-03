/*These globals can be set by the user and if left like 
that it will know that the user did not choose to filter by
this*/
var questionDiff = 0;
var category = 0;
var yearBefore = 0, monthBefore = 0, dayBefore = 0, 
yearAfter = 0, monthAfter = 0, dayAfter = 0;

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
get a range. It is getting them from their input in the html page*/
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

    /*Deal with the dates*/
    if (yearBefore != 0) {
        /**notFirst is checking if it was the first thing the user added
        becasue then it should notify the rest of the categories by 
        switching it to true. It is different if it is first than 
        other postions, look at the top where it is defined for more detial*/
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
    if (url != "http://jservice.io/api/") {
        url = "http://jservice.io/api/";
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
        console.log(data[randIndex]);
    } else {
        question = "There was no question that matched your critera";
        answer = "Try making your parameters more broad, remember not every category has to be selected";
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