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
        "question": "Which data structure provides the most efficient implementation for an LRU cache?", 
        "options": ["Stack", "Queue", "Doubly Linked List with HashMap", "Self-Balancing BST"], 
        "answer": "Doubly Linked List with HashMap" 
    },
    { 
        "question": "Which sorting algorithm is optimal for sorting a dataset containing multiple small sorted subarrays?", 
        "options": ["MergeSort", "Timsort", "QuickSort", "HeapSort"], 
        "answer": "Timsort" 
    },
    { 
        "question": "Which algorithm is most efficient for finding bridges in a graph?", 
        "options": ["Kosaraju’s Algorithm", "Floyd-Warshall Algorithm", "Tarjan’s Algorithm", "Dijkstra’s Algorithm"], 
        "answer": "Tarjan’s Algorithm" 
    },
    { 
        "question": "Which of the following algorithms provides the best expected runtime for the selection problem (finding the k-th smallest element)?", 
        "options": ["QuickSelect", "HeapSort", "MergeSort", "Binary Search"], 
        "answer": "QuickSelect" 
    },
    { 
        "question": "Which graph algorithm is used in modern network routing protocols like OSPF?", 
        "options": ["Dijkstra’s Algorithm", "Kruskal’s Algorithm", "Floyd-Warshall Algorithm", "Bellman-Ford Algorithm"], 
        "answer": "Dijkstra’s Algorithm" 
    },
    { 
        "question": "Which algorithm is most efficient for finding the longest palindromic substring in a given string?", 
        "options": ["Manacher’s Algorithm", "KMP Algorithm", "Rabin-Karp Algorithm", "Z-Algorithm"], 
        "answer": "Manacher’s Algorithm" 
    },
    { 
        "question": "Which type of tree is used in implementing dynamic segment trees?", 
        "options": ["AVL Tree", "Fenwick Tree", "Binary Indexed Tree", "Persistent Segment Tree"], 
        "answer": "Persistent Segment Tree" 
    },
    { 
        "question": "Which data structure provides the most efficient solution for answering range minimum queries?", 
        "options": ["Segment Tree", "Fenwick Tree", "Heap", "Hash Table"], 
        "answer": "Segment Tree" 
    },
    { 
        "question": "Which data structure allows efficient substring search using preprocessing?", 
        "options": ["Trie", "Suffix Tree", "Hash Table", "Fenwick Tree"], 
        "answer": "Suffix Tree" 
    },
    { 
        "question": "Which hashing technique ensures a minimal number of collisions when distributing data across multiple servers?", 
        "options": ["Linear Probing", "Quadratic Probing", "Chaining", "Consistent Hashing"], 
        "answer": "Consistent Hashing" 
    },
    { 
        "question": "Which OOP principle ensures that a derived class can modify the behavior of a base class method?", 
        "options": ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], 
        "answer": "Polymorphism" 
    },
    { 
        "question": "Which design pattern is used to ensure only one instance of a class exists?", 
        "options": ["Factory Pattern", "Singleton Pattern", "Observer Pattern", "Prototype Pattern"], 
        "answer": "Singleton Pattern" 
    },
    { 
        "question": "Which C++ feature allows multiple classes to inherit from more than one base class?", 
        "options": ["Multilevel Inheritance", "Multiple Inheritance", "Hybrid Inheritance", "Hierarchical Inheritance"], 
        "answer": "Multiple Inheritance" 
    },
    { 
        "question": "Which keyword in C++ prevents a class from being inherited?", 
        "options": ["sealed", "final", "static", "const"], 
        "answer": "final" 
    },
    { 
        "question": "Which OOP concept is violated if a subclass has too many overridden methods?", 
        "options": ["Encapsulation", "Inheritance", "Polymorphism", "Liskov Substitution Principle"], 
        "answer": "Liskov Substitution Principle" 
    },
    { 
        "question": "Which type of constructor is called when an object is copied?", 
        "options": ["Default Constructor", "Parameterized Constructor", "Copy Constructor", "Move Constructor"], 
        "answer": "Copy Constructor" 
    },
    { 
        "question": "Which memory management technique is used in languages like Java to prevent memory leaks?", 
        "options": ["Reference Counting", "Garbage Collection", "Stack Allocation", "Manual Deallocation"], 
        "answer": "Garbage Collection" 
    },
    { 
        "question": "Which OOP concept ensures that a class can only be instantiated through a specific function?", 
        "options": ["Factory Method Pattern", "Builder Pattern", "Adapter Pattern", "Decorator Pattern"], 
        "answer": "Factory Method Pattern" 
    },
    { 
        "question": "Which of the following algorithms is best suited for detecting a deadlock in an operating system?", 
        "options": ["Banker’s Algorithm", "Kruskal’s Algorithm", "Floyd-Warshall Algorithm", "Prim’s Algorithm"], 
        "answer": "Banker’s Algorithm" 
    },
    { 
        "question": "Which of the following allows an object to be passed as an argument to a function that expects a different type?", 
        "options": ["Method Overloading", "Method Overriding", "Operator Overloading", "Type Conversion"], 
        "answer": "Type Conversion" 
    }
]


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
