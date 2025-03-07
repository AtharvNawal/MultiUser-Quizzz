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
    { 
        question: "Which sorting algorithm is best for nearly sorted data?", 
        options: ["QuickSort", "MergeSort", "Timsort", "HeapSort"], 
        answer: "Timsort" 
    },
    { 
        question: "What data structure is used in Dijkstra’s algorithm?", 
        options: ["Stack", "Queue", "Priority Queue", "Hash Table"], 
        answer: "Priority Queue" 
    },
    { 
        question: "Which algorithm finds the shortest path in an unweighted graph?", 
        options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Breadth-First Search", "Depth-First Search"], 
        answer: "Breadth-First Search" 
    },
    { 
        question: "Which technique is used to handle large datasets when sorting?", 
        options: ["MergeSort", "External Sorting", "QuickSort", "Counting Sort"], 
        answer: "External Sorting" 
    },
    { 
        question: "What is the worst-case time complexity of QuickSort?", 
        options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], 
        answer: "O(n^2)" 
    },
    { 
        question: "Which algorithm is best suited for finding the top K elements in a large dataset?", 
        options: ["MergeSort", "HeapSort", "QuickSort", "Radix Sort"], 
        answer: "HeapSort" 
    },
    { 
        question: "Which hashing technique minimizes collisions?", 
        options: ["Chaining", "Linear Probing", "Quadratic Probing", "Consistent Hashing"], 
        answer: "Consistent Hashing" 
    },
    { 
        question: "Which data structure is used to efficiently find the K-th largest element?", 
        options: ["Binary Search Tree", "Min-Heap", "Max-Heap", "Hash Table"], 
        answer: "Min-Heap" 
    },
    { 
        question: "Which algorithm works best for uniformly distributed sorted data?", 
        options: ["Binary Search", "Interpolation Search", "Exponential Search", "Linear Search"], 
        answer: "Interpolation Search" 
    },
    { 
        question: "Which quantum algorithm can factor large numbers efficiently?", 
        options: ["Grover’s Algorithm", "Shor’s Algorithm", "Simon's Algorithm", "Deutsch-Jozsa Algorithm"], 
        answer: "Shor’s Algorithm" 
    }
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
