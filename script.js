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
        "question": "Which data structure is best suited for LRU cache implementation?", 
        "options": ["Stack", "Queue", "Linked List", "HashMap with Doubly Linked List"], 
        "answer": "HashMap with Doubly Linked List" 
    },
    { 
        "question": "Which sorting algorithm is best for small datasets with mostly sorted elements?", 
        "options": ["Insertion Sort", "MergeSort", "HeapSort", "QuickSort"], 
        "answer": "Insertion Sort" 
    },
    { 
        "question": "Which algorithm is used for cycle detection in a graph?", 
        "options": ["Dijkstra’s Algorithm", "Floyd’s Cycle Detection", "Bellman-Ford Algorithm", "Prim’s Algorithm"], 
        "answer": "Floyd’s Cycle Detection" 
    },
    { 
        "question": "What is the best case time complexity of MergeSort?", 
        "options": ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"], 
        "answer": "O(n log n)" 
    },
    { 
        "question": "Which algorithm is best for finding the median of a stream of numbers?", 
        "options": ["MergeSort", "Heap-based approach", "QuickSort", "Counting Sort"], 
        "answer": "Heap-based approach" 
    },
    { 
        "question": "Which data structure is best suited for implementing an undo feature?", 
        "options": ["Queue", "Stack", "Heap", "Linked List"], 
        "answer": "Stack" 
    },
    { 
        "question": "Which algorithm finds the shortest path in a weighted graph with negative weights?", 
        "options": ["Dijkstra’s Algorithm", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm", "Kruskal’s Algorithm"], 
        "answer": "Bellman-Ford Algorithm" 
    },
    { 
        "question": "Which technique is used to efficiently store sparse matrices?", 
        "options": ["2D Arrays", "Linked List", "Hash Table", "Compressed Sparse Row (CSR)"], 
        "answer": "Compressed Sparse Row (CSR)" 
    },
    { 
        "question": "Which searching algorithm is best for an infinite sorted list?", 
        "options": ["Binary Search", "Exponential Search", "Interpolation Search", "Linear Search"], 
        "answer": "Exponential Search" 
    },
    { 
        "question": "Which algorithm efficiently finds strongly connected components in a graph?", 
        "options": ["Kruskal’s Algorithm", "Dijkstra’s Algorithm", "Kosaraju’s Algorithm", "Bellman-Ford Algorithm"], 
        "answer": "Kosaraju’s Algorithm" 
    },
    { 
        "question": "Which algorithm is best for detecting a cycle in an undirected graph?", 
        "options": ["DFS with parent tracking", "BFS", "Dijkstra’s Algorithm", "Floyd’s Cycle Detection"], 
        "answer": "DFS with parent tracking" 
    },
    { 
        "question": "Which data structure is best for implementing a priority queue?", 
        "options": ["Stack", "Queue", "Heap", "Hash Table"], 
        "answer": "Heap" 
    },
    { 
        "question": "Which algorithm efficiently finds the articulation points in a graph?", 
        "options": ["Dijkstra’s Algorithm", "Tarjan’s Algorithm", "Floyd-Warshall Algorithm", "Kruskal’s Algorithm"], 
        "answer": "Tarjan’s Algorithm" 
    },
    { 
        "question": "Which algorithm is most efficient for finding the minimum spanning tree?", 
        "options": ["Bellman-Ford Algorithm", "Dijkstra’s Algorithm", "Prim’s Algorithm", "Floyd-Warshall Algorithm"], 
        "answer": "Prim’s Algorithm" 
    },
    { 
        "question": "Which algorithm is best suited for counting the number of inversions in an array?", 
        "options": ["MergeSort", "QuickSort", "HeapSort", "Radix Sort"], 
        "answer": "MergeSort" 
    },
    { 
        "question": "Which algorithm is most efficient for detecting bridges in a graph?", 
        "options": ["Floyd-Warshall Algorithm", "Kosaraju’s Algorithm", "Tarjan’s Algorithm", "Bellman-Ford Algorithm"], 
        "answer": "Tarjan’s Algorithm" 
    },
    { 
        "question": "Which hashing technique provides the best performance for dynamic distributed systems?", 
        "options": ["Chaining", "Linear Probing", "Consistent Hashing", "Quadratic Probing"], 
        "answer": "Consistent Hashing" 
    },
    { 
        "question": "Which searching algorithm is most efficient for a nearly sorted array?", 
        "options": ["Binary Search", "Jump Search", "Exponential Search", "Ternary Search"], 
        "answer": "Jump Search" 
    },
    { 
        "question": "Which data structure is used in the implementation of a Trie?", 
        "options": ["Hash Table", "Graph", "Linked List", "Tree"], 
        "answer": "Tree" 
    },
    { 
        "question": "Which algorithm efficiently finds the longest common subsequence (LCS)?", 
        "options": ["Knuth-Morris-Pratt (KMP)", "Rabin-Karp", "Dynamic Programming", "Greedy Algorithm"], 
        "answer": "Dynamic Programming" 
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
