const questions = [
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What does CPU stand for?',
        correct_answer: 'Central Processing Unit',
        incorrect_answers: [
            'Central Process Unit',
            'Computer Personal Unit',
            'Central Processor Unit',
        ],
    },
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
        correct_answer: 'Final',
        incorrect_answers: ['Static', 'Private', 'Public'],
    },
    {
        category: 'Science: Computers',
        type: 'boolean',
        difficulty: 'easy',
        question: 'The logo for Snapchat is a Bell.',
        correct_answer: 'False',
        incorrect_answers: ['True'],
    },
    {
        category: 'Science: Computers',
        type: 'boolean',
        difficulty: 'easy',
        question:
            'Pointers were not used in the original C programming language; they were added later on in C++.',
        correct_answer: 'False',
        incorrect_answers: ['True'],
    },
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question:
            'What is the most preferred image format used for logos in the Wikimedia database?',
        correct_answer: '.svg',
        incorrect_answers: ['.png', '.jpeg', '.gif'],
    },
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question: 'In web design, what does CSS stand for?',
        correct_answer: 'Cascading Style Sheet',
        incorrect_answers: [
            'Counter Strike: Source',
            'Corrective Style Sheet',
            'Computer Style Sheet',
        ],
    },
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question:
            'What is the code name for the mobile operating system Android 7.0?',
        correct_answer: 'Nougat',
        incorrect_answers: ['Ice Cream Sandwich', 'Jelly Bean', 'Marshmallow'],
    },
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question: 'On Twitter, what is the character limit for a Tweet?',
        correct_answer: '140',
        incorrect_answers: ['120', '160', '100'],
    },
    {
        category: 'Science: Computers',
        type: 'boolean',
        difficulty: 'easy',
        question: 'Linux was first created as an alternative to Windows XP.',
        correct_answer: 'False',
        incorrect_answers: ['True'],
    },
    {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question:
            'Which programming language shares its name with an island in Indonesia?',
        correct_answer: 'Java',
        incorrect_answers: ['Python', 'C', 'Jakarta'],
    },
];

// numero della domanda
let questionNumber = 0;

// punteggio esame
let examScore = 0;

const headerCtn = document.querySelector('header');
const countDown = document.getElementById('timer');
const mainContainer = document.querySelector('main');
const questionTitle = document.querySelector('#question');
const timerProgressBar = document.querySelector('.progress');
const answersContainer = document.querySelector('#answers-ctn');
const showQuestionNumber = document.querySelector('#question-num');

const displayQuestion = count => {
    questionTitle.innerText = '';
    const questionText = questions[count].question;
    questionTitle.innerText = questionText;
};

const displayAnswers = count => {
    answersContainer.innerHTML = '';
    console.log(`displayAnswers: ${count}`);
    const answers = questions[count].incorrect_answers;
    answers.push(questions[count].correct_answer);

    answers.sort(() => {
        return 0.5 - Math.random();
    });

    answers.forEach(answer => {
        const answerBtn = document.createElement('button');
        answerBtn.classList.add('answer-btn');

        if (answer === questions[count].correct_answer) {
            answerBtn.innerText = answer;
            answerBtn.value = 1;
        } else {
            answerBtn.innerText = answer;
            answerBtn.value = 0;
        }

        answersContainer.appendChild(answerBtn);
    });

    let answersBtns = document.querySelectorAll('.answer-btn');

    answersBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            questionNumber++;
            examScore += parseInt(btn.value);
            console.log(questionNumber);
            console.log(btn.value);
            if (questionNumber !== questions.length) {
                // timer
                clearInterval(timer);
                startTimer();
                // progress bar timer
                clearInterval(timerPB);
                progressBarTimer();
                //
                displayQuestion(questionNumber);
                displayAnswers(questionNumber);
                displayQuestionNumber(questionNumber);
            } else {
                //
                clearInterval(timer);
                clearInterval(timerPB);
                timerProgressBar.classList.add('hidden');
                showQuestionNumber.innerHTML = 'Quiz completato.';
                setInterval(displayScore(), 500);
                //
            }

            console.log(answersBtns);
        });
    });

    console.log(answersBtns);
};

const displayQuestionNumber = count => {
    count = count + 1;
    showQuestionNumber.innerHTML = `QUESTION ${count} / <span class="question-num-span">${questions.length}</span>`;
};

const displayScore = () => {
    mainContainer.innerHTML = '';
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    resultContainer.innerHTML = `<h2 class="result">Hai totalizzato ${examScore} ${
        examScore === 1 ? 'punto!' : 'punti!'
    }</h2>`;
    mainContainer.appendChild(resultContainer);
};

// TIMER
let timer;

const startTimer = () => {
    const tick = () => {
        // in each call, print remaining time to UI
        countDown.innerHTML = `<p>SECONDS <span id="timer-span">${time}</span> REMAINING</p>`;

        // when it reaches 0, start again, unless user is out of questions
        if (questionNumber === questions.length - 1 && time < 0) {
            clearInterval(timer);
            timerProgressBar.classList.add('hidden');
            showQuestionNumber.innerHTML = 'Quiz completato.';
            setInterval(displayScore(), 500);
        } else if (time < 0) {
            clearInterval(timer);
            startTimer();
            questionNumber++;
            displayQuestion(questionNumber);
            displayAnswers(questionNumber);
            displayQuestionNumber(questionNumber);
        }

        // decrease 1s
        time--;
    };

    // setting the time to 30s
    let time = 30;

    // call timer every second
    tick();
    timer = setInterval(tick, 1000);

    /* To clear the timer 
    we need the timer variable,
    therefore we need to return it
    before we can use it with the 
    clearInterval function */
    return timer;
};

// PROGRESS BAR TIMER
const progressBar = (progressVal, totalPercentageVal = 100) => {
    let strokeVal = (4.64 * 100) / totalPercentageVal;
    let x = document.querySelector('.progress-circle-prog');
    x.style.strokeDasharray = progressVal * strokeVal + ' 999';
};

let timerPB;

const progressBarTimer = () => {
    const tick = () => {
        // function with starting and final value
        progressBar(timePB, 30);

        if (questionNumber === questions.length - 1 && timePB > 30) {
            clearInterval(timer);
            timerProgressBar.classList.add('hidden');
            showQuestionNumber.innerHTML = 'Quiz completato.';
            setInterval(displayScore(), 500);
        } else if (timePB > 30) {
            clearInterval(timerPB);
            progressBarTimer();
            questionNumber++;
            displayQuestion(questionNumber);
            displayAnswers(questionNumber);
            displayQuestionNumber(questionNumber);
        }

        // increase 1s
        timePB++;
    };

    // starting value
    let timePB = 0;

    // call timer every second
    tick();
    timerPB = setInterval(tick, 1000);

    return timerPB;
};

///////////////////////////////////////////////

displayQuestion(questionNumber);
displayAnswers(questionNumber);
displayQuestionNumber(questionNumber);
startTimer();
progressBarTimer();
