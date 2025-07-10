document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const reviewBtn = document.getElementById('review-btn');
    const themeBtn = document.getElementById('theme-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackElement = document.getElementById('feedback');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const currentScoreElement = document.getElementById('current-score');
    const finalScoreElement = document.getElementById('final-score');
    const maxScoreElement = document.getElementById('max-score');
    const correctAnswersElement = document.getElementById('correct-answers');
    const wrongAnswersElement = document.getElementById('wrong-answers');
    const timeTakenElement = document.getElementById('time-taken');
    const performanceMessageElement = document.getElementById('performance-message');
    const timerElement = document.getElementById('time');
    const progressBar = document.getElementById('progress-bar');
    const difficultyBadge = document.getElementById('difficulty-badge');
    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');
    const questionCountSlider = document.getElementById('question-count');
    const countValue = document.getElementById('count-value');
    const confirmationModal = document.getElementById('confirmation-modal');
    const cancelSubmitBtn = document.getElementById('cancel-submit');
    const confirmSubmitBtn = document.getElementById('confirm-submit');
    const remainingQuestionsElement = document.getElementById('remaining-questions');
    const quizContainer = document.querySelector('.quiz-container');

    // Quiz variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 60;
    let questions = [];
    let selectedOption = null;
    let userAnswers = [];
    let startTime;
    let endTime;

    // Quiz questions database
    const quizQuestions = [
        // JavaScript Questions
        {
            question: "What does 'DOM' stand for in JavaScript?",
            options: [
                "Document Object Model",
                "Data Object Management",
                "Digital Output Module",
                "Display Object Manager"
            ],
            correctAnswer: 0,
            explanation: "DOM stands for Document Object Model, which represents the structure of a web page.",
            category: "javascript",
            difficulty: "easy"
        },
        {
            question: "Which method is used to add an element to the end of an array?",
            options: [
                "push()",
                "pop()",
                "shift()",
                "unshift()"
            ],
            correctAnswer: 0,
            explanation: "The push() method adds one or more elements to the end of an array.",
            category: "javascript",
            difficulty: "easy"
        },
        {
            question: "What will 'typeof null' return in JavaScript?",
            options: [
                "'null'",
                "'undefined'",
                "'object'",
                "'number'"
            ],
            correctAnswer: 2,
            explanation: "This is a known quirk in JavaScript - typeof null returns 'object'.",
            category: "javascript",
            difficulty: "medium"
        },
        {
            question: "Which keyword is used to declare a variable in JavaScript that cannot be reassigned?",
            options: [
                "var",
                "let",
                "const",
                "static"
            ],
            correctAnswer: 2,
            explanation: "The const keyword declares a block-scoped variable that cannot be reassigned.",
            category: "javascript",
            difficulty: "easy"
        },
        {
            question: "What does the '=== operator' in JavaScript check for?",
            options: [
                "Value equality only",
                "Value and type equality",
                "Reference equality",
                "Approximate equality"
            ],
            correctAnswer: 1,
            explanation: "The '===' operator checks for both value and type equality (strict equality).",
            category: "javascript",
            difficulty: "medium"
        },
        {
            question: "Which method converts a JSON string to a JavaScript object?",
            options: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.toObject()",
                "JSON.convert()"
            ],
            correctAnswer: 0,
            explanation: "JSON.parse() converts a JSON string into a JavaScript object.",
            category: "javascript",
            difficulty: "medium"
        },
        {
            question: "What is the purpose of the 'this' keyword in JavaScript?",
            options: [
                "Refers to the current function",
                "Refers to the parent function",
                "Refers to the global object",
                "Refers to the object it belongs to"
            ],
            correctAnswer: 3,
            explanation: "The 'this' keyword refers to the object it belongs to, with its value determined by how a function is called.",
            category: "javascript",
            difficulty: "hard"
        },
        {
            question: "Which of these is NOT a JavaScript framework or library?",
            options: [
                "React",
                "Angular",
                "Vue",
                "Flask"
            ],
            correctAnswer: 3,
            explanation: "Flask is a Python web framework, not a JavaScript library.",
            category: "javascript",
            difficulty: "easy"
        },
        {
            question: "What does the 'async' keyword do when used before a function?",
            options: [
                "Makes the function synchronous",
                "Allows the use of 'await' inside the function",
                "Prevents the function from returning a promise",
                "Speeds up the function execution"
            ],
            correctAnswer: 1,
            explanation: "The async keyword makes a function return a promise and allows the use of await inside it.",
            category: "javascript",
            difficulty: "hard"
        },
        {
            question: "Which event occurs when a user clicks on an HTML element?",
            options: [
                "onchange",
                "onhover",
                "onclick",
                "onload"
            ],
            correctAnswer: 2,
            explanation: "The onclick event occurs when the user clicks on an element.",
            category: "javascript",
            difficulty: "easy"
        },
        // HTML Questions
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language"
            ],
            correctAnswer: 0,
            explanation: "HTML stands for Hyper Text Markup Language, the standard markup language for web pages.",
            category: "html",
            difficulty: "easy"
        },
        {
            question: "Which HTML element is used for the largest heading?",
            options: [
                "<heading>",
                "<h1>",
                "<head>",
                "<h6>"
            ],
            correctAnswer: 1,
            explanation: "<h1> is used for the most important heading (largest size) in HTML.",
            category: "html",
            difficulty: "easy"
        },
        // CSS Questions
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            correctAnswer: 2,
            explanation: "CSS stands for Cascading Style Sheets, used for styling web pages.",
            category: "css",
            difficulty: "easy"
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            options: [
                "text-color",
                "font-color",
                "color",
                "text-style"
            ],
            correctAnswer: 2,
            explanation: "The 'color' property is used to set the color of the text.",
            category: "css",
            difficulty: "easy"
        },
        // Web Development Questions
        {
            question: "What is the purpose of the alt attribute in image tags?",
            options: [
                "To provide alternative text for screen readers",
                "To add a title to the image",
                "To link to a larger version of the image",
                "To specify the image source"
            ],
            correctAnswer: 0,
            explanation: "The alt attribute provides alternative text for screen readers and when images can't be displayed.",
            category: "web",
            difficulty: "easy"
        }
    ];

    // Initialize the quiz
    function initQuiz() {
        // Reset quiz variables
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 60;
        selectedOption = null;
        userAnswers = [];
        
        // Get quiz settings
        const category = categorySelect.value;
        const difficulty = difficultySelect.value;
        const questionCount = parseInt(questionCountSlider.value);
        
        // Filter questions based on settings
        let filteredQuestions = [...quizQuestions];
        
        if (category !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.category === category);
        }
        
        if (difficulty !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
        }
        
        // Shuffle and select questions
        questions = shuffleArray(filteredQuestions).slice(0, questionCount);
        totalQuestionsElement.textContent = questions.length;
        currentScoreElement.textContent = score;
        
        // Show quiz screen
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        resultScreen.classList.add('hidden');
        
        // Start timer
        startTime = new Date();
        startTimer();
        
        // Load first question
        loadQuestion();
    }

    // Shuffle array function
    function shuffleArray(array) {
        return array.sort(() => 0.5 - Math.random());
    }

    // Load a question
    function loadQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        
        questionText.textContent = currentQuestion.question;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        
        // Update progress bar
        progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
        
        // Set difficulty badge
        difficultyBadge.textContent = currentQuestion.difficulty;
        difficultyBadge.className = 'difficulty-badge ' + currentQuestion.difficulty;
        
        // Show/hide previous button
        prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
        
        // Show submit button if last question
        submitBtn.classList.toggle('hidden', currentQuestionIndex !== questions.length - 1);
        
        // Create option buttons
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            
            // Add option prefix (A, B, C, D)
            const prefix = document.createElement('span');
            prefix.classList.add('option-prefix');
            prefix.textContent = String.fromCharCode(65 + index) + '. ';
            
            const optionText = document.createElement('span');
            optionText.textContent = option;
            
            button.appendChild(prefix);
            button.appendChild(optionText);
            
            button.dataset.index = index;
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
            
            // If we're reviewing and this was the selected answer, mark it
            if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].userAnswer === index) {
                button.classList.add('selected');
            }
        });
    }

    // Reset question state
    function resetState() {
        nextBtn.classList.add('hidden');
        feedbackElement.classList.add('hidden');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    // Select an option
    function selectOption(e) {
        if (nextBtn.classList.contains('hidden')) {
            const selectedButton = e.target.closest('.option-btn');
            const selectedAnswer = parseInt(selectedButton.dataset.index);
            const currentQuestion = questions[currentQuestionIndex];
            
            // Disable all options
            Array.from(optionsContainer.children).forEach(button => {
                button.disabled = true;
            });
            
            // Store user's answer
            userAnswers[currentQuestionIndex] = {
                question: currentQuestion.question,
                userAnswer: selectedAnswer,
                correctAnswer: currentQuestion.correctAnswer,
                options: currentQuestion.options,
                explanation: currentQuestion.explanation,
                difficulty: currentQuestion.difficulty
            };
            
            // Check if correct
            const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
            
            // Apply styles
            if (isCorrect) {
                selectedButton.classList.add('correct');
                score++;
                currentScoreElement.textContent = score;
                showFeedback("Correct! " + currentQuestion.explanation, true);
            } else {
                selectedButton.classList.add('incorrect');
                // Highlight correct answer
                Array.from(optionsContainer.children)[currentQuestion.correctAnswer].classList.add('correct');
                showFeedback("Incorrect. " + currentQuestion.explanation, false);
            }
            
            // Show next button (unless it's the last question)
            if (currentQuestionIndex < questions.length - 1) {
                nextBtn.classList.remove('hidden');
            }
            
            selectedOption = selectedAnswer;
        }
    }

    // Show feedback
    function showFeedback(message, isCorrect) {
        const feedbackIcon = feedbackElement.querySelector('#feedback-icon');
        const feedbackText = feedbackElement.querySelector('#feedback-text');
        
        feedbackIcon.className = isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle';
        feedbackText.textContent = message;
        
        feedbackElement.classList.remove('hidden');
        feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        // Animate feedback
        feedbackElement.style.animation = 'fadeIn 0.3s ease';
    }

    // Move to next question
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }

    // Move to previous question
    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }

    // End the quiz
    function endQuiz() {
        clearInterval(timer);
        endTime = new Date();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        
        // Calculate results
        const correctAnswers = score;
        const wrongAnswers = questions.length - score;
        const percentage = (score / questions.length) * 100;
        
        // Update result screen
        finalScoreElement.textContent = score;
        maxScoreElement.textContent = questions.length;
        correctAnswersElement.textContent = correctAnswers;
        wrongAnswersElement.textContent = wrongAnswers;
        timeTakenElement.textContent = timeTaken;
        
        // Update performance chart
        document.querySelector('.correct-bar').style.width = `${percentage}%`;
        document.querySelector('.wrong-bar').style.width = `${100 - percentage}%`;
        
        // Performance message
        let message = "";
        if (percentage >= 80) {
            message = "🎉 Excellent work! You're a coding expert!";
        } else if (percentage >= 60) {
            message = "👍 Good job! You have a solid understanding of these concepts.";
        } else if (percentage >= 40) {
            message = "👏 Not bad! Keep practicing to improve your skills.";
        } else {
            message = "💪 Keep learning! Everyone starts somewhere. Review your answers to improve.";
        }
        
        performanceMessageElement.textContent = message;
    }

    // Start timer
    function startTimer() {
        timerElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 10) {
                timerElement.style.color = 'var(--incorrect-color)';
                timerElement.style.animation = 'pulse 1s infinite';
            }
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    // Show confirmation modal
    function showConfirmationModal() {
        const remaining = questions.length - currentQuestionIndex - 1;
        remainingQuestionsElement.textContent = remaining;
        confirmationModal.classList.add('show');
    }

    // Hide confirmation modal
    function hideConfirmationModal() {
        confirmationModal.classList.remove('show');
    }

    // Setup review screen
    function setupReviewScreen() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        
        // Create review screen HTML
        const reviewHTML = `
            <div id="review-screen" class="screen">
                <div class="review-header">
                    <h2><i class="fas fa-list"></i> Review Your Answers</h2>
                    <button id="back-to-results" class="btn secondary">
                        <i class="fas fa-arrow-left"></i> Back to Results
                    </button>
                </div>
                
                <div class="review-container">
                    ${questions.map((question, index) => {
                        const userAnswer = userAnswers[index];
                        const isCorrect = userAnswer.userAnswer === question.correctAnswer;
                        
                        return `
                            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                                <div class="review-question">
                                    <span class="review-number">${index + 1}.</span>
                                    <h3>${question.question}</h3>
                                    <span class="review-status">
                                        ${isCorrect ? 
                                            '<i class="fas fa-check-circle"></i> Correct' : 
                                            '<i class="fas fa-times-circle"></i> Incorrect'}
                                    </span>
                                    <span class="review-difficulty ${question.difficulty}">
                                        ${question.difficulty}
                                    </span>
                                </div>
                                
                                <div class="review-answers">
                                    <div class="user-answer">
                                        <h4>Your Answer:</h4>
                                        <p>${question.options[userAnswer.userAnswer]}</p>
                                    </div>
                                    
                                    ${!isCorrect ? `
                                        <div class="correct-answer">
                                            <h4>Correct Answer:</h4>
                                            <p>${question.options[question.correctAnswer]}</p>
                                        </div>
                                    ` : ''}
                                    
                                    <div class="explanation">
                                        <h4>Explanation:</h4>
                                        <p>${question.explanation}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        // Insert review screen
        quizContainer.insertAdjacentHTML('beforeend', reviewHTML);
        
        // Add event listener for back button
        document.getElementById('back-to-results').addEventListener('click', () => {
            document.getElementById('review-screen').remove();
            resultScreen.classList.remove('hidden');
        });
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Update icon
        themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
    }

    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // Update question count display
    function updateQuestionCount() {
        countValue.textContent = questionCountSlider.value;
    }

    // Event listeners
    startBtn.addEventListener('click', initQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    submitBtn.addEventListener('click', showConfirmationModal);
    restartBtn.addEventListener('click', initQuiz);
    reviewBtn.addEventListener('click', setupReviewScreen);
    themeBtn.addEventListener('click', toggleTheme);
    cancelSubmitBtn.addEventListener('click', hideConfirmationModal);
    confirmSubmitBtn.addEventListener('click', () => {
        hideConfirmationModal();
        endQuiz();
    });
    questionCountSlider.addEventListener('input', updateQuestionCount);

    // Initialize
    initTheme();
    updateQuestionCount();


    
});