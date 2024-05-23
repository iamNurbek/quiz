(function () {
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const progressBar = document.getElementById('progress-bar'); // Progress bar element
  let currentSlide = 0;

  const myQuestions = [
    {
      question: 'Who invented JavaScript?',
      answers: {
        a: 'Douglas Crockford',
        b: 'Sheryl Sandberg',
        c: 'Brendan Eich',
      },
      correctAnswer: 'c',
    },
    {
      question: 'Which one of these is a JavaScript package manager?',
      answers: {
        a: 'Node.js',
        b: 'TypeScript',
        c: 'npm',
      },
      correctAnswer: 'c',
    },
    {
      question: 'Which tool can you use to ensure code quality?',
      answers: {
        a: 'Angular',
        b: 'jQuery',
        c: 'RequireJS',
        d: 'ESLint',
      },
      correctAnswer: 'd',
    },
  ];

  function buildQuiz() {
    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];
      for (let letter in currentQuestion.answers) {
        answers.push(
          `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
        );
      }
      output.push(
        `<div class="slide">
                    <div class="question">${currentQuestion.question}</div>
                    <div class="answers">${answers.join('')}</div>
                </div>`
      );
    });
    quizContainer.innerHTML = output.join('');
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = 'lightgreen';
      } else {
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    } else {
      previousButton.style.display = 'inline-block';
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    } else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }

    updateProgressBar(); // Update progress bar whenever a slide is shown
  }

  function updateProgressBar() {
    const totalQuestions = myQuestions.length;
    const currentProgress = ((currentSlide + 1) / totalQuestions) * 100;
    progressBar.style.width = `${currentProgress}%`;
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  buildQuiz();
  showSlide(currentSlide);
  submitButton.addEventListener('click', showResults);
  document
    .getElementById('previous')
    .addEventListener('click', showPreviousSlide);
  document.getElementById('next').addEventListener('click', showNextSlide);
})();
