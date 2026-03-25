// DOM Elements Declarations

const questionTitle = document.getElementById("question-title")
const buttonSpace = document.getElementById("button-space")
const currentQuestionNum = document.getElementById("question-num")
const buttonAnswers = document.querySelectorAll(".button-answer")
const submitButton = document.getElementById("submit-button")

// Global Variables Delcaration

let score = parseInt(sessionStorage.getItem("score")) || 0 // Dinamically updated score that will be displayed in the results page.
let questionNumber = 0 // Number of the question the user is facing.
const usedQuestionsArr =
  JSON.parse(sessionStorage.getItem("usedQuestionsArr")) || []
const usedAnswersArr =
  JSON.parse(sessionStorage.getItem("usedAnswersArr")) || []
let currentQuestion = {}
const questionsEasy = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
]

const questionsMedium = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What does the 'HTTP' protocol primarily define?",
    correct_answer: "How messages are formatted and transmitted over the web",
    incorrect_answers: [
      "How files are stored on a server",
      "How DNS resolves domain names",
      "How encryption keys are generated",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "Which data structure uses FIFO (First In, First Out)?",
    correct_answer: "Queue",
    incorrect_answers: ["Stack", "Tree", "Graph"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "In JavaScript, 'null' and 'undefined' are strictly equal (===).",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which sorting algorithm has the best average-case time complexity?",
    correct_answer: "Merge Sort",
    incorrect_answers: ["Bubble Sort", "Insertion Sort", "Selection Sort"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What does SQL stand for?",
    correct_answer: "Structured Query Language",
    incorrect_answers: [
      "Simple Query Language",
      "Sequential Query Logic",
      "Structured Question Language",
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "A compiler translates code line-by-line during execution.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What does DOM stand for in web development?",
    correct_answer: "Document Object Model",
    incorrect_answers: [
      "Data Object Model",
      "Digital Ordinance Model",
      "Document Oriented Method",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "Which HTTP status code means 'Not Found'?",
    correct_answer: "404",
    incorrect_answers: ["200", "500", "301"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "JavaScript is a statically typed language.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "Which of these is a JavaScript framework?",
    correct_answer: "React",
    incorrect_answers: ["Laravel", "Django", "Flask"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What does API stand for?",
    correct_answer: "Application Programming Interface",
    incorrect_answers: [
      "Applied Program Internet",
      "Advanced Programming Interaction",
      "Application Process Interface",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "Which method converts JSON data into a JavaScript object?",
    correct_answer: "JSON.parse()",
    incorrect_answers: [
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.toObject()",
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "CSS Flexbox is primarily used for layout and alignment.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "Which keyword is used to declare a constant in JavaScript?",
    correct_answer: "const",
    incorrect_answers: ["let", "var", "constant"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "Which HTML tag is used to include JavaScript?",
    correct_answer: "<script>",
    incorrect_answers: ["<js>", "<javascript>", "<code>"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question: "What does 'responsive design' mean?",
    correct_answer: "Design that adapts to different screen sizes and devices",
    incorrect_answers: [
      "Design that loads very quickly",
      "Design that responds to user clicks",
      "Design optimized only for mobile",
    ],
  },
]

const questionsHard = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "What is the time complexity of binary search?",
    correct_answer: "O(log n)",
    incorrect_answers: ["O(n)", "O(n log n)", "O(1)"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "Which layer of the OSI model is responsible for routing?",
    correct_answer: "Network Layer",
    incorrect_answers: ["Transport Layer", "Data Link Layer", "Session Layer"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "Which of the following is NOT a NoSQL database?",
    correct_answer: "PostgreSQL",
    incorrect_answers: ["MongoDB", "Cassandra", "Redis"],
  },
  {
    category: "Science: Computers",
    type: "hard",
    difficulty: "hard",
    question: "What is a race condition in programming?",
    correct_answer:
      "When the system's behavior depends on the sequence or timing of uncontrollable events",
    incorrect_answers: [
      "When two loops execute at the same speed",
      "When a program runs too fast for the CPU",
      "When threads are executed sequentially",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "What is the space complexity of a recursive function without tail call optimization?",
    correct_answer: "O(n)",
    incorrect_answers: ["O(1)", "O(log n)", "O(n log n)"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "Which HTTP method is idempotent?",
    correct_answer: "PUT",
    incorrect_answers: ["POST", "PATCH", "CONNECT"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "hard",
    question:
      "In JavaScript, closures allow a function to access variables from its outer scope even after the outer function has returned.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "What does ACID stand for in database systems?",
    correct_answer: "Atomicity, Consistency, Isolation, Durability",
    incorrect_answers: [
      "Accuracy, Consistency, Isolation, Durability",
      "Atomicity, Control, Integrity, Durability",
      "Atomicity, Consistency, Integration, Data",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "Which of these is a characteristic of a deadlock?",
    correct_answer: "Circular wait",
    incorrect_answers: [
      "Parallel execution",
      "Load balancing",
      "Memory caching",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "In Big-O notation, which algorithm is the most efficient for large datasets?",
    correct_answer: "O(log n)",
    incorrect_answers: ["O(n)", "O(n^2)", "O(2^n)"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "What is the purpose of a load balancer?",
    correct_answer: "Distribute network traffic across multiple servers",
    incorrect_answers: [
      "Encrypt network data",
      "Store database backups",
      "Compile source code",
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "hard",
    question: "A hash table guarantees O(1) lookup time in all cases.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "Which protocol is used to securely transfer files over the internet?",
    correct_answer: "SFTP",
    incorrect_answers: ["FTP", "HTTP", "SMTP"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "What does normalization in databases aim to achieve?",
    correct_answer: "Reduce redundancy and improve data integrity",
    incorrect_answers: [
      "Increase query speed by duplicating data",
      "Encrypt sensitive data",
      "Simplify UI design",
    ],
  },
]

const pulledQuestions = [] // Array domande già poste

const randomQuestionExtraction = function () {
  //funzione per randomizzare domande
  if (pulledQuestions.length === questionsEasy.length) {
    //se l'array pulled question è uguale a quello delle question vuol dire che le domande sono finite
    return null
  }
  let indiceRand
  let domandaScelta
  do {
    indiceRand = Math.floor(Math.random() * questionsEasy.length) //indice delle domande nell'array
    domandaScelta = questionsEasy[indiceRand]
  } while (pulledQuestions.includes(domandaScelta))
  pulledQuestions.push(domandaScelta)
  return domandaScelta
}

// Function to generate a random array to mix the possible answers' positions each time.

const getRandomQuestionOrder = (questionObj) => {
  const { type } = questionObj
  if (type === "multiple") {
    const positions = [0, 1, 2, 3]
    positions.sort(() => Math.random() - 0.5)

    return positions
  } else {
    const positions = [0, 1]
    positions.sort(() => Math.random() - 0.5)

    return positions
  }
}

// logica timer
let timerInterval = null

const startTimer = () => {
  const timer = document.querySelector(".timer")
  const progress = document.querySelector(".progress")

  let totalSec = 20
  let timeLeft = totalSec

  const circumference = 2 * Math.PI * 90
  progress.style.strokeDasharray = circumference
  timer.classList.add("timer-text")

  clearInterval(timerInterval)

  timer.innerHTML = `
    <p class="timer-words">SECONDS</p>
    <p class="timer-nums">${timeLeft}</p>
    <p class="timer-words">REMAINING</p>`
  progress.style.strokeDashoffset = 0

  timerInterval = setInterval(() => {
    --timeLeft
    timer.innerHTML = `
    <p class="timer-words">SECONDS</p>
    <p class="timer-nums">${timeLeft}</p>
    <p class="timer-words">REMAINING</p>`

    const offset = circumference - (timeLeft / totalSec) * circumference
    progress.style.strokeDashoffset = offset

    if (timeLeft <= 0) {
      clearInterval(timerInterval)

      progress.style.strokeDashoffset = circumference

      setTimeout(() => {
        checkAnswer(null, currentQuestion)
      }, 20)
    }
  }, 1000)
}

// Funzione to display the current question. It creates button elements which on their onclick attribute, fire the checkAnswer function to validate the answer.

const displayNextQuestion = (questionObj) => {
  currentQuestion = questionObj
  buttonSpace.innerHTML = ""
  if (questionNumber >= 10) {
    sessionStorage.setItem("score", score)
    sessionStorage.setItem("usedAnswersArr", JSON.stringify(usedAnswersArr))
    sessionStorage.setItem("usedQuestionsArr", JSON.stringify(usedQuestionsArr))
    questionTitle.innerText = `The Quiz is over.\n
    Go to your results!`
    buttonSpace.innerHTML = `
        <a href="../html/results.html">
        <button>Results</button>
        </a>
    `
    buttonSpace.classList.add("button-start")
    return
  }
  const { question, correct_answer, incorrect_answers } = questionObj
  const allAnswers = [...incorrect_answers, correct_answer]
  questionTitle.innerText = `${question}`
  questionNumber++
  currentQuestionNum.innerText = `QUESTION ${questionNumber}`
  getRandomQuestionOrder(questionObj).forEach((index) => {
    buttonSpace.innerHTML += `
    <button class="button-answer">
    ${allAnswers[index]}
    </button>
    `
  })
  const buttonAnswers = document.querySelectorAll(".button-answer")
  buttonAnswers.forEach((button) =>
    button.addEventListener("click", (e) => checkAnswer(e, questionObj)),
  )
  startTimer()
}

// Function to check if the answer is correct. If it is, updates score by 1.

const checkAnswer = (e, questionObj) => {
  clearInterval(timerInterval)

  const { question, correct_answer } = questionObj
  if (!e || !e.target) {
    usedAnswersArr.push(
      `You didn't answer the question ❌
      ${correct_answer} ✅`,
    )
    usedQuestionsArr.push(question)
    const nextQuestionObj = randomQuestionExtraction()
    currentQuestion = nextQuestionObj
    displayNextQuestion(nextQuestionObj)
    return
  }
  if (e.target.innerText && e.target.innerText === correct_answer) {
    score++
    usedAnswersArr.push(`Your answer: ${correct_answer} ✅`)
  } else {
    usedAnswersArr.push(
      `Your answer: ${e.target.innerText} ❌ - 
      Correct answer: ${correct_answer} ✅`,
    )
  }
  usedQuestionsArr.push(question)
  const nextQuestionObj = randomQuestionExtraction()
  currentQuestion = nextQuestionObj
  displayNextQuestion(nextQuestionObj)
}

// Function to display the results

const displayResults = () => {
  const correctPercentageP = document.getElementById(
    "percentage-correct-answers",
  )
  const resultMessage = document.getElementById("result-message")
  const wrongPercentageP = document.getElementById("percentage-wrong-answers")
  const correctAnswersP = document.getElementById("number-correct-answers")
  const wrongAnswersP = document.getElementById("number-wrong-answers")
  correctPercentageP.innerText = `${score.toFixed(1) * 10}%`
  wrongPercentageP.innerText = `${(10 - score).toFixed(1) * 10}%`
  correctAnswersP.innerText = `${score}/10 questions`
  wrongAnswersP.innerText = `${10 - score}/10 questions`
  if (score < 6) {
    resultMessage.innerHTML = `
    <h4>We're sorry!</h4>
    <p class="youPass">You didn't pass the exam this time.</p>
    <div class="certificate">
    <p>You can try again later!</p>
    <p>Check your email (including promotion / spam folder)</p>
    </div>
    `
  }
}

const resetForm = (e) => {
  e.preventDefault()
  const form = document.getElementById("feedback-form")
  submitButton.setAttribute("disabled", "true")
  submitButton.style.cursor = "not-allowed"
  form.reset()
}

if (submitButton) {
  submitButton.addEventListener("click", (e) => resetForm(e))
}

window.addEventListener("load", () => {
  if (document.getElementById("benchmark-body")) {
    displayNextQuestion(randomQuestionExtraction())
    return
  } else if (document.getElementById("results-body")) {
    const checkButton = document.getElementById("button-check")
    const checkSection = document.getElementById("check-section")
    const myChart = new Chart(document.getElementById("myDonutChart"), config) // Render del grafico
    displayResults()

    let answersVisible = false

    checkButton.addEventListener("click", () => {
      if (!answersVisible) {
        checkSection.innerHTML = ""

        usedQuestionsArr.forEach((ques, i) => {
          checkSection.innerHTML += `
        <div class="answer-check">  
          <p>${ques}</p>
          <p>${usedAnswersArr[i]}</p>
        </div>`
        })
        checkButton.innerText = "HIDE ANSWERS"
        checkSection.classList.remove("hidden")
        answersVisible = true
      } else {
        checkSection.classList.toggle("hidden")
        checkButton.innerText = "CHECK YOUR ANSWERS"
        answersVisible = false
      }
    })
    sessionStorage.clear()
    return
  } else if (document.getElementById("feedback-body")) {
    const formFeedback = document.getElementById("feedback-form")

    formFeedback.addEventListener("submit", function (e) {
      e.preventDefault()
      const feedbackValue = document.getElementById("feedback").value
      console.log("Feedback ricevuto:", feedbackValue)
      alert("Grazie! Il tuo feedback è stato registrato.")
      formFeedback.reset()

      votoStars = -1
      for (let s = 0; s < stars.length; s++) {
        stars[s].src = starVuota
      }
    })
  }
})

// 1. Configurazione dei dati
const data = {
  datasets: [
    {
      data: [(10 - score).toFixed(1) * 10, score.toFixed(1) * 10],
      backgroundColor: ["#D20094", "#00ffff"],
      hoverOffset: 1,
    },
  ],
}

const stars = document.getElementsByClassName("star")
const starVuota = "/assets/emptyStar.svg"
const starPiena = "/assets/star.svg"
let votoStars = -1

for (let i = 0; i < stars.length; i++) {
  stars[i].addEventListener("mouseenter", function () {
    if (votoStars !== -1) return
    for (let j = 0; j < stars.length; j++) {
      if (j <= i) {
        stars[j].src = starPiena
      } else {
        stars[j].src = starVuota
      }
    }
  })

  stars[i].addEventListener("mouseleave", function () {
    if (votoStars !== -1) return

    for (let k = 0; k < stars.length; k++) {
      if (k <= votoStars) {
        stars[k].src = starPiena
      } else {
        stars[k].src = starVuota
      }
    }
  })

  stars[i].addEventListener("click", function () {
    if (votoStars !== -1) return

    votoStars = i
    let voto = i + 1
    for (let s = 0; s < stars.length; s++) {
      stars[s].classList.remove("can-hover")
    }
    alert("Rating: " + voto)
  })
}
// 3. Inizializzazione del grafico con il plugin
const config = {
  type: "doughnut",
  data: data,
  options: {
    cutout: "70%",
  },
}

// form di feedback
