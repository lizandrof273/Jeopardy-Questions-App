let storeQuestion = [];
fetch("/api/clues")
    .then(res => {
        console.log(res);
        return Response.json();
    }).then(loadedQuestions => {
        console.log(loadedQuestions);
    });
