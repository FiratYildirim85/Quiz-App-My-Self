let questions = [
    {
        "question": "wie heißt die Hautstadt von Italien",
        "answer_1": "Madrid",
        "answer_2": "Istanbul",
        "answer_3": "Rom",
        "answer_4": "Berlin",
        "right_answer": "3"
    },
    {
        "question": "wieviele Follower hat einfach Bloblo",
        "answer_1": "0",
        "answer_2": "1000000",
        "answer_3": "39",
        "answer_4": "1",
        "right_answer": "3"
    },
    {
        "question": "welches Tier ist gerne Bananen",
        "answer_1": "Affe",
        "answer_2": "Biene",
        "answer_3": "Tieger",
        "answer_4": "Löwe",
        "right_answer": "1"
    },
    {
        "question": "welches ist das Gefährlichste Lebewesen",
        "answer_1": "der Tiger",
        "answer_2": "der Hai",
        "answer_3": "die Schlange",
        "answer_4": "der Mensch",
        "right_answer": "4"
    },
    {
        "question": "Woher ist der Eifelturm",
        "answer_1": "New York",
        "answer_2": "Müchen",
        "answer_3": "Paris",
        "answer_4": "Barcelona",
        "right_answer": "3"
    }
];

let rightQuestions = 0;                                                     // Globale Variable für richtige Antwort
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');                                                    // Globale Variable


// erste Funktion wenn Bildschirm ladet
function init() {
    document.getElementById('all-questions').innerHTML = questions.length;   // 1 von 5 Fragen.hier bestimmen wird die Länge der Fragen.Also 5
    showQuestion();                                                          // wir wollen gleich zu Anfang das alles in Show Question angezeigt wird
}


// Fragen zeigen
function showQuestion() {

    if(currentQuestion >= questions.length) {                               // damit nach der 5ten Frage es nicht weitergeht
         //TODO: Show End Screen
         document.getElementById('endScreen').style = '';
         document.getElementById('questionBody').style = 'display: none';

         document.getElementById('amount-of-questions').innerHTML = questions.length; 
         document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
         document.getElementById('header-image').src = 'img/winner.png';



    } else {

        let percent = (currentQuestion +1) / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progress-bar').innerHTML = `${percent} %`;
        document.getElementById('progress-bar').style = `width: ${percent}%;`;

    let question = questions[currentQuestion];                              // neue Variable question die sich vom JSON die 0te Stelle (currentquestion) rausholt. 

    document.getElementById('question-number').innerHTML = currentQuestion + 1; // ...Frage so und so von 5 Fragen

    document.getElementById('questiontext').innerHTML = question['question']; //question = 0te Stelle und davon 'question'. Also die Frage
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}


// Antworten (richtig und falsch)
function answer(selection) {                  // selection ist entweder answer_1 answer_2 answer_3 answer_4
    let question = questions[currentQuestion];
    console.log('selected answer is', selection)
    let selectedQuestionNumber = selection.slice(-1)  // in dieser Variable (selectedQuestionNumber) wird der letzte Buchstabe von dieser Variablen (selection) gespeichert. selection steht für answer_1 answer_2 usw
    console.log('selectedQuestionNumber is', selectedQuestionNumber);
    console.log('current question is', question['right_answer']);

    let idOfRightAnswer = `answer_${question['right_answer']}`;


    if (selectedQuestionNumber == question['right_answer']) {  // richtige Frage beantwortet //selectedQuestionNumber (die letzte Zahl der Variablen selection) ist == 3 ?
        document.getElementById(selection).parentNode.classList.add('bg-success');  // bg-success ist von Bootstrap eine Klasse die den Hintergrund grün macht. parent.Node bedeutet das Übergeordnete Elemet! Also die übergeordnete DIV
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');   // bg-danger ist von Bootstrap eine Klasse die den Hintergrund rot macht
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); // wenn die falsch Antwort angeklickt wird dann wird die richtige Antwort auch gleich grün angezeigt
        AUDIO_FAIL.play();
    }
   document.getElementById('next-button').disabled = false;                        //aktiviert den nächste Frage Button
}


//nächste Frage
function nextQuestion(){
    currentQuestion++;                                          // erhöht currentQuestion um +1
    document.getElementById('next-button').disabled = true;     //deaktiviert den nächste Frage Button 
    resetAnswerButtons();
    showQuestion();                                             // sagt das wir die nächste Frage AUCH angeigen wollen
    
}
    
// löscht für die nächste Frage die Klassen bg_danger und bg_success
function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame(){
    document.getElementById('header-image').src = 'img/quiz-app.webp';
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
    rightQuestions = 0;                                                     
    currentQuestion = 0; 
    init();

}