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
            { question: "Which keyword is used to inherit a class in Java?", options: ["extends", "implements", "inherits", "super"], answer: "extends" },
            { question: "What is polymorphism?", options: ["Having multiple methods with the same name but different behavior", "Writing only one function", "Overriding private variables", "None of the above"], answer: "Having multiple methods with the same name but different behavior" },
            { question: "Which OOP concept allows defining a method in a superclass and overriding it in a subclass?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"], answer: "Polymorphism" },
            { question: "What does the 'super' keyword do?", options: ["Refers to the parent class", "Creates a new instance", "Deletes an object", "None of the above"], answer: "Refers to the parent class" },
            { question: "Which concept allows restricting access to certain parts of an object?", options: ["Encapsulation", "Abstraction", "Polymorphism", "Inheritance"], answer: "Encapsulation" },
            { question: "Which keyword is used to define an interface in Java?", options: ["class", "interface", "implements", "extends"], answer: "interface" },
            { question: "What is an abstract class?", options: ["A class that cannot be instantiated", "A class that must have a constructor", "A class that must have only abstract methods", "None of the above"], answer: "A class that cannot be instantiated" },
            { question: "Which of the following allows multiple inheritance in Java?", options: ["Classes", "Interfaces", "Abstract classes", "Constructors"], answer: "Interfaces" },
            { question: "What is the purpose of method overriding?", options: ["To change the behavior of a method in a subclass", "To create a new method", "To overload a constructor", "To make a class abstract"], answer: "To change the behavior of a method in a subclass" },
            { question: "What is an object in Java?", options: ["An instance of a class", "A function", "A variable", "None of the above"], answer: "An instance of a class" },
            { question: "What is the default access modifier in Java?", options: ["private", "public", "protected", "package-private"], answer: "package-private" },
            { question: "What is the purpose of constructors in Java?", options: ["Initialize an object", "Destroy an object", "Define new variables", "None of the above"], answer: "Initialize an object" },
            { question: "Which class in Java is the superclass of all classes?", options: ["Object", "Main", "Super", "Base"], answer: "Object" },
            { question: "What is method overloading?", options: ["Defining multiple methods with the same name but different parameters", "Overriding a method in a subclass", "Creating a new class", "None of the above"], answer: "Defining multiple methods with the same name but different parameters" }
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
