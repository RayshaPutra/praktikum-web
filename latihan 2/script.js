const questions = [
    { question: "Negara terkecil di dunia adalah?", options: ["Nepal", "Bhutan", "Vatikan", "Brunei Darussalam."], correct: 2 },
    { question: "Apa nama pulau terbesar kedua di dunia?", options: ["Greenland", "Kalimantan", "Papua", "Madagaskar"], correct: 2 },
    { question: "Planet terbesar di tata surya adalah?", options: ["Bumi", "Mars", "Jupiter", "Venus"], correct: 2 },
    { question: "Negara mana yang berbatasan langsung dengan Indonesia di Pulau Papua?", options: ["Filipina", "Malaysia", "Timor Leste", "Papua Nugini"], correct: 3 },
    { question: "Juara liga Inggris musim ini adalah?", options: ["Asenal", "Liverpool", "Man.City", "Tottenham"], correct: 1 },
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById("start-screen").classList.add("d-none");
    document.getElementById("quiz-container").classList.remove("d-none");
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");
    const progressBar = document.getElementById("progress-bar");

    nextBtn.disabled = true;
    feedbackElement.textContent = "";
    optionsElement.innerHTML = "";

    const q = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${q.question}`;

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-option";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index, btn);
        optionsElement.appendChild(btn);
    });

    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function checkAnswer(selectedIndex, buttonElement) {
    const feedbackElement = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");
    const optionButtons = document.querySelectorAll(".btn-option");

    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === questions[currentQuestionIndex].correct) {
        buttonElement.classList.add("correct");
        feedbackElement.textContent = "✅ Jawaban Benar!";
        score++;
    } else {
        buttonElement.classList.add("incorrect");
        feedbackElement.textContent = "❌ Jawaban Salah!";
        // Tandai jawaban benar
        optionButtons[questions[currentQuestionIndex].correct].classList.add("correct");
    }

    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        showResult();
    } else {
        loadQuestion();
    }
}

function showResult() {
    document.getElementById("quiz-container").classList.add("d-none");
    document.getElementById("result-screen").classList.remove("d-none");

    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Skor Anda: ${score} dari ${questions.length}`;
}

function restartQuiz() {
    document.getElementById("result-screen").classList.add("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
}
