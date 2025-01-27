const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

// numero della domanda
let questionNumber = 0;

// punteggio esame
let examScore = 0;

const questionTitle = document.querySelector('#question');
const answersContainer = document.querySelector('#answers-ctn');
const showQuestionNumber = document.querySelector('#question-num');
const mainContainer = document.querySelector('main');

const displayQuestion = (count) => {
    questionTitle.innerText = '';
    const questionText = questions[count].question;
    questionTitle.innerText = questionText;
};

const displayAnswers = (count) => {
    answersContainer.innerHTML = '';
    console.log(`displayAnswers: ${count}`);
    const answers = questions[count].incorrect_answers;
    answers.push(questions[count].correct_answer);

    answers.sort(() => {return 0.5 - Math.random()});
    
    answers.forEach( answer => {
        const answerBtn = document.createElement('button');
        answerBtn.classList.add('answer-btn');

        if ( answer === questions[count].correct_answer ) {
            answerBtn.innerText = answer;
            answerBtn.value = 1;
        } else {
            answerBtn.innerText = answer;
            answerBtn.value = 0;
        };
        
        answersContainer.appendChild(answerBtn);
    });

    let answersBtns = document.querySelectorAll('.answer-btn');
    
    answersBtns.forEach( btn => {
        btn.addEventListener('click', () => {
            questionNumber++;
            examScore += parseInt(btn.value);
            console.log(questionNumber);
            console.log(btn.value);
            if ( questionNumber !== questions.length ) {
                displayQuestion(questionNumber);
                displayAnswers(questionNumber);
                displayQuestionNumber(questionNumber);
            } else {
                displayScore();
            };
            
            
            console.log(answersBtns);
        });
    });

    console.log(answersBtns);

};

const displayQuestionNumber = (count) => {
    count = count + 1;
    showQuestionNumber.innerText = `QUESTION ${count} / ${questions.length}`;
};

const displayScore = () => {
    mainContainer.innerHTML = '';
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    resultContainer.innerHTML = `<h2 class="result">Hai totalizzato ${examScore} punti!</h2>`;
    mainContainer.appendChild(resultContainer);
};

/*
const clearAnswers = () => {
    answersContainer.innerHTML = '';
}
*/



const countDownTimer = () => {

    let countDownDate = 0;

    countDownDate = new Date().getTime() + 10000;
            console.log(`scadenza timer ${countDownDate}`);

    // Update the count down every 1 second
    let x = setInterval(function() {

        let now = 0;
    // Get today's date and time
        now = new Date().getTime();
            console.log(`ora ${now}`);
        
            
        // Find the distance between now and the count down date
        let distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes and seconds
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="demo"
        document.getElementById('timer').innerText = `SECONDS ${seconds} REMAINING`;
            
        // If the count down is over, write some text 
        if (seconds === 0) {
            questionNumber++;
            //examScore += parseInt(btn.value);
            //console.log(questionNumber);
            //console.log(btn.value);
            if ( questionNumber !== questions.length ) {
                countDownTimer();
                displayQuestion(questionNumber);
                displayAnswers(questionNumber);
                displayQuestionNumber(questionNumber);
            } else {
                displayScore();
            };
        }
    },
    1000);
};

displayQuestion(questionNumber);
displayAnswers(questionNumber);
displayQuestionNumber(questionNumber);
countDownTimer();






/*
for ( let i = 0; i < questions.length; i++ ) {
    let question = questions[i].question; // domanda
    questionTitle.innerText = question;
    /*
    let answers = questions[i].incorrect_answers;
    answers.push(questions[i].correct_answer);

    console.log(question);
    console.log(answers);
    
}
*/
