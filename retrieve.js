console.log("Helloooo world");

/*gets question and puts choices in an array*/
var questionDiff = 0;
var category = "";
var yearBefore = 0, monthBefore = 0, dayBefore = 0, 
yearAfter = 0, monthAfter = 0, dayAfter = 0;
//getting difficultly user selected
function changeDiff() {
    questionDiff = document.getElementById("selectbox").value;
}
/*This function I am getting what the user selected and
putting into a global for later use*/
function changeCat() {
   var getWholeForm = document.getElementById("form1");
   category = getWholeForm.elements["name"].value;
    console.log(category);
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

function getQuestion() {
    var stuff = fetch("http://jservice.io/api/clues")
    .then(res => {
          return res.json();
    });
    console.log(stuff);
}

/*const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
console.log(choices);*/
/*let storeQuestion = [];
fetch("/api/clues")
    .then(res => {
        console.log(res);
        return Response.json();
    }).then(loadedQuestions => {
        console.log(loadedQuestions);
    });
*/