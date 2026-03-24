// DOM Elements Declarations

const questionTitle = document.getElementById("question-title")
const buttonSpace = document.getElementById("button-space")
const currentQuestionNum = document.getElementById("question-num")
const buttonAnswers = document.querySelectorAll(".button-answer")
const checkButton = document.getElementById("check-button")
const checkSection = document.getElementById("check-section")

// Global Variables Delcaration

let score = parseInt(sessionStorage.getItem("score")) || 0 // Dinamically updated score that will be displayed in the results page.
let questionNumber = 0 // Number of the question the user is facing.
const usedQuestionsArr =
  JSON.parse(sessionStorage.getItem("usedQuestionsArr")) || []
const usedAnswersArr =
  JSON.parse(sessionStorage.getItem("usedAnswersArr")) || []
let currentQuestion = {}
const questions = [
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

const pulledQuestions = [] // Array domande già poste

const randomQuestionExtraction = function () {
  //funzione per randomizzare domande
  if (pulledQuestions.length === questions.length) {
    //se l'array pulled question è uguale a quello delle question vuol dire che le domande sono finite
    console.log("Hai risposto a tutte le domande!")
    return null
  }
  let indiceRand
  let domandaScelta
  do {
    indiceRand = Math.floor(Math.random() * questions.length) //indice delle domande nell'array
    domandaScelta = questions[indiceRand]
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

  clearInterval(timerInterval)

  timer.textContent = timeLeft
  progress.style.strokeDashoffset = 0

  timerInterval = setInterval(() => {
    --timeLeft
    timer.textContent = " remaining " + timeLeft + "seconds"

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
    console.log(usedAnswersArr, usedQuestionsArr)
    return
  }
  if (e.target.innertext && e.target.innerText === correct_answer) {
    score++
    usedAnswersArr.push(`${correct_answer} ✅`)
  } else {
    usedAnswersArr.push(`${e.target.innerText} ❌
      ${correct_answer} ✅`)
  }
  usedQuestionsArr.push(question)
  const nextQuestionObj = randomQuestionExtraction()
  currentQuestion = nextQuestionObj
  displayNextQuestion(nextQuestionObj)
  console.log(usedAnswersArr, usedQuestionsArr)
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

window.addEventListener("load", () => {
  if (document.getElementById("benchmark-body")) {
    displayNextQuestion(randomQuestionExtraction())
    return
  } else if (document.getElementById("results-body")) {
    displayResults()
    checkButton.addEventListener("click", () => {
      checkButton.setAttribute("disabled", "true")
      usedQuestionsArr.forEach((ques, i) => {
        checkSection.innerHTML += `
    <div class="answer-check">  
      <p>${ques}</p>
      <p>${usedAnswersArr[i]}</p>
    </div> 
       `
      })
    })
    sessionStorage.clear()
    return
  }
})

// 1. Configurazione dei dati
const data = {
  datasets: [
    {
      label: "Mio Dataset",
      data: [(10 - score).toFixed(1) * 10, score.toFixed(1) * 10],
      backgroundColor: ["#ff6384", "#36a2eb"],
      hoverOffset: 4,
    },
  ],
}

// 2. Plugin personalizzato per il testo centrale
const centerTextPlugin = {
  id: "result-message",
  beforeDraw(chart) {
    const {
      ctx,
      chartArea: { top, width, height },
    } = chart
    ctx.save()

    // Configurazione font
    ctx.font = "bold 20px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Testo e posizionamento
    const text = ""
    const x = width / 2
    const y = height / 2 + top

    ctx.fillText(text, x, y)
    ctx.restore()
  },
}

// 3. Inizializzazione del grafico con il plugin
const config = {
  type: "doughnut",
  data: data,
  plugins: [centerTextPlugin], // Registro del plugin
}

// Render del grafico
const myChart = new Chart(document.getElementById("myDonutChart"), config)

// form di feedback

const formFeedback = document.getElementById("feedback-form")

formFeedback.addEventListener("submit", function (e) {
  e.preventDefault()
  const feedbackValue = document.getElementById("feedback").value
  console.log("Feedback ricevuto:", feedbackValue)
  alert("Grazie! Il tuo feedback è stato registrato.")
  formFeedback.reset()
})
