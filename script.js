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
        "question": "Which data structure is best for efficiently handling LRU (Least Recently Used) cache operations?", 
        "options": ["Stack", "Queue", "Doubly Linked List with HashMap", "Self-Balancing BST"], 
        "answer": "Doubly Linked List with HashMap" 
    },
    { 
        "question": "Which sorting algorithm is optimized for nearly sorted arrays?", 
        "options": ["MergeSort", "Timsort", "QuickSort", "HeapSort"], 
        "answer": "Timsort" 
    },
    { 
        "question": "Which algorithm efficiently finds articulation points in a graph?", 
        "options": ["Kruskal’s Algorithm", "Floyd-Warshall Algorithm", "Tarjan’s Algorithm", "Dijkstra’s Algorithm"], 
        "answer": "Tarjan’s Algorithm" 
    },
    { 
        "question": "Which algorithm provides an expected linear time complexity for finding the k-th smallest element?", 
        "options": ["QuickSelect", "HeapSort", "MergeSort", "Binary Search"], 
        "answer": "QuickSelect" 
    },
    { 
        "question": "Which graph algorithm is widely used in modern network routing protocols like OSPF?", 
        "options": ["Dijkstra’s Algorithm", "Kruskal’s Algorithm", "Floyd-Warshall Algorithm", "Bellman-Ford Algorithm"], 
        "answer": "Dijkstra’s Algorithm" 
    },
    { 
        "question": "Which algorithm efficiently finds the longest palindromic substring?", 
        "options": ["Manacher’s Algorithm", "KMP Algorithm", "Rabin-Karp Algorithm", "Z-Algorithm"], 
        "answer": "Manacher’s Algorithm" 
    },
    { 
        "question": "Which data structure is used for efficiently storing and processing range queries?", 
        "options": ["AVL Tree", "Fenwick Tree", "Segment Tree", "Trie"], 
        "answer": "Segment Tree" 
    },
    { 
        "question": "Which algorithm efficiently finds strongly connected components in a directed graph?", 
        "options": ["Dijkstra’s Algorithm", "Kosaraju’s Algorithm", "Kruskal’s Algorithm", "Bellman-Ford Algorithm"], 
        "answer": "Kosaraju’s Algorithm" 
    },
    { 
        "question": "Which hashing technique minimizes collisions in distributed systems?", 
        "options": ["Chaining", "Linear Probing", "Quadratic Probing", "Consistent Hashing"], 
        "answer": "Consistent Hashing" 
    },
    { 
        "question": "Which algorithm is used for finding the maximum flow in a network?", 
        "options": ["Dijkstra’s Algorithm", "Bellman-Ford Algorithm", "Ford-Fulkerson Algorithm", "Kruskal’s Algorithm"], 
        "answer": "Ford-Fulkerson Algorithm" 
    },
    { 
        "question": "Which algorithm efficiently finds Eulerian paths in a graph?", 
        "options": ["Floyd-Warshall Algorithm", "Kosaraju’s Algorithm", "Hierholzer’s Algorithm", "Prim’s Algorithm"], 
        "answer": "Hierholzer’s Algorithm" 
    },
    { 
        "question": "Which OOP principle allows dynamic method dispatch?", 
        "options": ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], 
        "answer": "Polymorphism" 
    },
    { 
        "question": "Which design pattern ensures that only one instance of a class exists?", 
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
        "question": "Which OOP principle is violated if a subclass changes expected behavior of a base class method?", 
        "options": ["Encapsulation", "Inheritance", "Polymorphism", "Liskov Substitution Principle"], 
        "answer": "Liskov Substitution Principle" 
    },
    { 
        "question": "Which constructor is called when an object is copied?", 
        "options": ["Default Constructor", "Parameterized Constructor", "Copy Constructor", "Move Constructor"], 
        "answer": "Copy Constructor" 
    },
    { 
        "question": "Which language feature in C++ ensures that a dynamically allocated object is properly deallocated?", 
        "options": ["Garbage Collection", "Smart Pointers", "Manual Deallocation", "Stack Allocation"], 
        "answer": "Smart Pointers" 
    },
    { 
        "question": "Which OOP concept allows restricting object instantiation to specific functions?", 
        "options": ["Factory Method Pattern", "Builder Pattern", "Adapter Pattern", "Decorator Pattern"], 
        "answer": "Factory Method Pattern" 
    },
    { 
        "question": "Which algorithm is used to detect a deadlock in an operating system?", 
        "options": ["Banker’s Algorithm", "Kruskal’s Algorithm", "Floyd-Warshall Algorithm", "Prim’s Algorithm"], 
        "answer": "Banker’s Algorithm" 
    },
    { 
        "question": "Which of the following is most efficient for solving the subset sum problem?", 
        "options": ["Greedy Algorithm", "Branch and Bound", "Dynamic Programming", "Brute Force"], 
        "answer": "Dynamic Programming" 
    },
    { 
        "question": "Which memory allocation strategy is used in garbage-collected languages like Java?", 
        "options": ["Reference Counting", "Mark and Sweep", "Stack Allocation", "Manual Memory Management"], 
        "answer": "Mark and Sweep" 
    },
    { 
        "question": "Which of the following algorithms is best suited for fast modular exponentiation?", 
        "options": ["Naive Multiplication", "Exponentiation by Squaring", "Floyd’s Algorithm", "Kruskal’s Algorithm"], 
        "answer": "Exponentiation by Squaring" 
    },
    { 
        "question": "Which OOP concept allows an object to be passed as an argument to a function that expects a different type?", 
        "options": ["Method Overloading", "Method Overriding", "Operator Overloading", "Type Conversion"], 
        "answer": "Type Conversion" 
    },
    { 
        "question": "Which algorithm is most efficient for detecting cycles in a directed graph?", 
        "options": ["BFS", "DFS with Back Edge Detection", "Dijkstra’s Algorithm", "Kruskal’s Algorithm"], 
        "answer": "DFS with Back Edge Detection" 
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
