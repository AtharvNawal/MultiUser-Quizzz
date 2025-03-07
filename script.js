document.getElementById("start-quiz-btn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Please enter your name.");
        return;
    }
    localStorage.setItem("currentUser", username);
    document.getElementById("user-login").style.display = "none";
    document.querySelector(".quiz-wrapper").style.display = "block";
    loadQuestion();
});

const quizData = [
    { question: "What is encapsulation in Java?", options: ["Hiding data implementation", "Using multiple classes", "Writing functions", "None of the above"], answer: "Hiding data implementation" },
    { question: "Which keyword is used to inherit a class in Java?", options: ["extends", "implements", "inherits", "super"], answer: "extends" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const timerEl = document.getElementById('time');
const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const restartBtn = document.querySelector('.restart-btn');

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }
    clearInterval(timerInterval);
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    startTimer();

    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}: ${currentQuiz.question}`;
    optionsEl.innerHTML = '';

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    const username = localStorage.getItem("currentUser");

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ user: username, score: score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    resultEl.innerHTML = `<strong>${username}'s Score:</strong> <span id="score">${score}</span> / ${quizData.length}`;
    resultEl.style.display = 'block';
    restartBtn.style.display = 'block';
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    questionEl.style.display = 'block';
    optionsEl.style.display = 'block';
    resultEl.style.display = 'none';
    restartBtn.style.display = 'none';
    loadQuestion();
});

loadQuestion();
