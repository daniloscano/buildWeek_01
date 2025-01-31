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
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn\'t get modified?",
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

let questionNumber = 0;
let examScore = 0;

const headerCtn = document.querySelector('header');
const countDown = document.getElementById('timer');
const mainContainer = document.querySelector('main');
const questionTitle = document.querySelector('#question');
const timerProgressBar = document.querySelector('.progress');
const answersContainer = document.querySelector('#answers-ctn');
const showQuestionNumber = document.querySelector('#question-num');
const loader = document.querySelector('.progress-circle-prog');

let timer;

const startTimer = () => {
    let timeLeft = 30;
    countDown.innerHTML = `<p>SECONDS <span id="timer-span">${timeLeft}</span> REMAINING</p>`;
    loader.style.strokeDasharray = `${Math.floor(timeLeft * 15.46)} 999`;

    timer = setInterval(() => {
        timeLeft--;
        countDown.innerHTML = `<p>SECONDS <span id="timer-span">${timeLeft}</span> REMAINING</p>`;
        loader.style.strokeDasharray = `${Math.floor(timeLeft * 15.46)} 999`;

        if (timeLeft < 0 && questionNumber === questions.length -1) {
            clearInterval(timer);
            displayScore();
        } else if (timeLeft < 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
};

const displayQuestion = count => {
    answersContainer.innerHTML = '';
    questionTitle.innerText = questions[count].question;
    const answers = questions[count].incorrect_answers;
    answers.push(questions[count].correct_answer);

    answers.sort(() => {
        return 0.5 - Math.random();
    });

    answers.forEach(answer => {
        const answerBtn = document.createElement('button');
        answerBtn.classList.add('answer-btn');
        answerBtn.innerText = answer;
        answersContainer.appendChild(answerBtn);

        answerBtn.addEventListener('click', event => {
            let isCorrectAnswer = event.target.innerText === questions[questionNumber].correct_answer;
            let isLastQuestion = questionNumber + 1 === questions.length;

            if (isCorrectAnswer && !isLastQuestion) {
                examScore++;
                nextQuestion();
            } else if (!isCorrectAnswer && !isLastQuestion) {
                nextQuestion();
            } else if (isCorrectAnswer && isLastQuestion) {
                clearInterval(startTimer);
                examScore++;
                displayScore();
            } else if (!isCorrectAnswer && isLastQuestion) {
                clearInterval(startTimer);
                displayScore();
            };
        });
    });
    showQuestionNumber.innerHTML = `QUESTION ${questionNumber+1} / <span class="purple-text">${questions.length}</span>`;
};

const nextQuestion = () => {
    questionNumber++;
    clearInterval(timer);
    displayQuestion(questionNumber);
    startTimer();
};

const displayScore = () => {
    mainContainer.innerHTML = '';
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    resultContainer.innerHTML = `<h2 class="result">You gave the right answer to <span class="purple-text">${examScore}</span> 
    ${examScore === 1 ? 'question!' : 'questions!'}</h2>`;
    mainContainer.appendChild(resultContainer);
    showQuestionNumber.innerHTML = 'Quiz completed';
    timerProgressBar.innerHTML = '';
};

displayQuestion(questionNumber);
startTimer();