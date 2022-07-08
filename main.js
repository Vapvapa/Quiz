/* Собираем в переменные варианты ответа */
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

/* Переменная для всех ответов */
const optionElements = document.querySelectorAll('.option');

/* Переменная для вопроса */
const question = document.getElementById('question');

/* Переменная для номера вопроса и номер всех вопросов */
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'), // Количество всех вопросов в модальном окне
    btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Вы проснулись. Что вам снилось?',
        options: [
            'Мрак кромешный',
            'То же, что и вчера',
            'Error: please improve your code + [...]',
            '*что-то неадекватное*'
        ],
        rightAnswer: 2
    },
    {
        question: 'Вы пришли с работы/учёбы. Чем займётесь в первую очередь?',
        options: [
            'if (amIAtHome) { takeMyLaptop(coding0, coding1, conding2); }',
            'После тяжёлого дня нужно восстановить силы - посмотрю, что осталось в холодильнике',
            'Самое время начинать тусить! Позвоню подруге/другу!',
            'Оххх, наконец-то я могу зависнуть за игрой/сериалом...'
        ],
        rightAnswer: 0
    },
    {
        question: 'Вы собрались лечь спать. Что скажете родным?',
        options: [
            'Спокойной ночи!',
            'А зачем что-то говорить?...',
            'Сладких снов :)',
            'Process finished with code 0'
        ],
        rightAnswer: 3
    }
]

numberOfAllQuestion.innerHTML = questions.length; // Выводим количество вопросов
const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // Выводим сам вопрос

    // Отправляем ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

const completedAnswers = []; // Массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false; // Проверка одинаковых вопросов

    if( indexOfPage == questions.length ) {
        quizOver(); // Функция конца викторины
    } else {
        if ( completedAnswers.length > 0 ) {
            completedAnswers.forEach(item => {
                if ( item == randomNumber ) {
                    hitDublicate = true;
                }
            });
            if ( hitDublicate ) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if ( completedAnswers.length == 0 ) {
            indexOfQuestion = randomNumber;
            load();
        }
    }

    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if ( el.target.dataset.id == questions[indexOfQuestion].rightAnswer ) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for ( option of optionElements ) {
    option.addEventListener('click', e => checkAnswer(e));
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if ( item.dataset.id == questions[indexOfQuestion].rightAnswer ) {
            item.classList.add('correct');
        }
    })
};

// Удаление всех классов со всех ответов
const enabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if ( !optionElements[0].classList.contains('disabled') ) {
        alert('Никита, не халтурь! Выбери один из вариантов ответа!');
    } else {
        randomQuestion();
        enabledOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML =questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})