console.log("Helloooo world");
/*gets question and puts choices in an array*/
var questionDiff = 0;
var category = "";
function changeDiff() {
    questionDiff = document.getElementById("selectbox").value;
}
function changeCat() {
   var getWholeForm = document.getElementById("form1");
   category = getWholeForm.elements["name"].value;
    console.log(category);
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