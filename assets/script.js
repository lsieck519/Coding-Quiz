
//creating variables that correspond with html elements 
var questionContainer = document.getElementById('question-container');
var introContainer = document.getElementById('intro-container');
var endContainer = document.getElementById('end-container');
var scoreContainer = document.getElementById('score-banner');
var formInitials = document.getElementById('initials-form');
var containerHighScores = document.getElementById('high-score-container');
var ViewHighScore = document.getElementById('view-high-scores');
var listHighScore = document.getElementById('high-score-list');
var correct = document.getElementById('correct');
var wrong = document.getElementById('wrong');

var question = document.getElementById('question');
var answerbuttons = document.getElementById('answer-buttons');
var timer = document.querySelector('#timer');
var score = 0;
var timeleft;
var gameover;
timer.innerText = 0;

//buttons
var btnStart = document.querySelector('#start-game');
var btnGoBack = document.querySelector('#go-back');
var btnClearScores = document.querySelector('#clear-high-scores');

//High Score Array
var HighScores = [];


var shuffledQuestions;
var QuestionIndex = 0;


// array of questions with answers 
var questions = [
  { q: 'What can arrays in JavaScript be used to store?', 
    a: 'd. all of the above', 
    choices: [{choice: 'a. numbers'}, {choice: 'b. booleans'}, {choice: 'c. strings'}, {choice: 'd. all of the above'}]
  },
  { q: 'Inside which HTML element do we put the JavaScript?', 
    a: 'c. <script>', 
    choices: [{choice: 'a. <header>'}, {choice: 'b. <java>'}, {choice: 'c. <script>'}, {choice: 'd. <style>'}]
  },
  { q: 'Which of the following type of variable is visible only within a function where it is defined?', 
    a: 'a. local variable', 
    choices: [{choice: 'a. local variable'}, {choice: 'b. global variable'}, {choice: 'c. function()'}, {choice: 'd. const'}]
  },
  { q: 'What syntax would call a function?', 
    a: 'd. function()', 
    choices: [{choice: 'a. !function'}, {choice: 'b. <function>'}, {choice: 'c. call()'}, {choice: 'd. function()'}]
  },
  { q: 'When did JavaScript first appear?', 
    a: 'a. 1995', 
    choices: [{choice: 'a. 1995'}, {choice: 'b. 1960'}, {choice: 'c. 2018'}, {choice: 'd. 2004'}]
  },
  { q: 'What does DOM stand for?', 
    a: 'b. Document Object Model', 
    choices: [{choice: 'a. Direction of Mode'}, {choice: 'b. Document Object Model'}, {choice: 'c. Domino'}, {choice: 'd. None of the Above'}]
  },
  { q: 'Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?', 
    a: 'b. split()', 
    choices: [{choice: 'a. replace()'}, {choice: 'b. split()'}, {choice: 'c. search()'}, {choice: 'd. =string'}]
  },
];




//Start game
var startGame = function() {
  introContainer.classList.add('hide');
  introContainer.classList.remove('show');
  questionContainer.classList.remove('hide');
  questionContainer.classList.add('show');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

//Start time at 30 
var setTime = function() {
    timeleft = 30; 
  
  var timercheck = setInterval(function() {
    timer.innerText = timeleft;
    timeleft--
  
    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        showScore()
        timer.innerText = 0
        clearInterval(timercheck)
    }
  
    }, 1000)
  }
  
//set next question for quiz
var setQuestion = function() {
  resetAnswers()
  displayQuestion(shuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
  while (answerbuttons.firstChild) {
      answerbuttons.removeChild(answerbuttons.firstChild)
  };
};

//display question information (including answer buttons)
var displayQuestion = function(index) {
  question.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement('button')
    answerbutton.innerText = index.choices[i].choice
    answerbutton.classList.add('btn')
    answerbutton.classList.add('answerbtn')
    answerbutton.addEventListener("click", answerCheck)
    answerbuttons.appendChild(answerbutton)
    }
  };

//confirm answer is correct
var answerCorrect = function() {
  if (correct.className = 'hide') {
    correct.classList.remove('hide')
    correct.classList.add('banner')
    wrong.classList.remove('banner')
    wrong.classList.add('hide')
    }
  }  
  
//confirm answer is incorrect
var answerWrong = function() {
  if (wrong.className = 'hide') {
    wrong.classList.remove('hide')
    wrong.classList.add('banner')
    correct.classList.remove('banner')
    correct.classList.add('hide')
  }
}

//check if answer is correct    
var answerCheck = function(event) {
  var selectedanswer = event.target
    if (shuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
      answerCorrect()
      score = score + 10
    } else {
      answerWrong()
      timeleft = timeleft - 10;
    };

//go to next question if available
QuestionIndex++
  if (shuffledQuestions.length > QuestionIndex + 1) {
    setQuestion()
  } else {
    gameover = 'true';
    showScore();
  }
}

//show total score at end of game
var showScore = function() {
  questionContainer.classList.add('hide');
  endContainer.classList.remove('hide');
  endContainer.classList.add('show');

  var scoreDisplay = document.createElement('p');
  scoreDisplay.innerText = ('Your final score is ' + score + '!');
  scoreContainer.appendChild(scoreDisplay);
}       

//create high score values
var createHighScore = function(event) { 
  event.preventDefault() 
  var initials = document.querySelector('#initials').value;
  if (!initials) {
    alert('Please enter your initials to continue');
    return;
  }

formInitials.reset();

var HighScore = {
  initials: initials,
  score: score
} 

//push and sort scores
HighScores.push(HighScore);
HighScores.sort((a, b) => {return b.score-a.score});

while (listHighScore.firstChild) {
 listHighScore.removeChild(listHighScore.firstChild)
}

//create elements in order of high scores
for (var i = 0; i < HighScores.length; i++) {
  var highscore = document.createElement('li');
  highscore.ClassName = 'high-score';
  highscore.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
  listHighScore.appendChild(highscore);
}

saveHighScore();
displayHighScores();
};

//save high score
var saveHighScore = function() {
  localStorage.setItem('HighScores', JSON.stringify(HighScores))     
};

//load values/ called on page load
var loadHighScore = function() {
  var LoadedHighScores = localStorage.getItem('HighScores')
  if (!LoadedHighScores) {
  return false;
  }

LoadedHighScores = JSON.parse(LoadedHighScores);
LoadedHighScores.sort((a, b) => {return b.score-a.score});


for (var i = 0; i < LoadedHighScores.length; i++) {
  var highscore = document.createElement('li');
  highscore.ClassName = 'high-score';
  highscore.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
  listHighScore.appendChild(highscore);
  HighScores.push(LoadedHighScores[i]); 
  }
}  

//if go back button is hit on high score page
var renderStartPage = function () {
  containerHighScores.classList.add('hide')
  containerHighScores.classList.remove('show')
  introContainer.classList.remove('hide')
  introContainer.classList.add('show')
  scoreContainer.removeChild(scoreContainer.lastChild)
  QuestionIndex = 0
  gameover = ""
  timer.textContent = 0 
  score = 0
  
  if (correct.className = 'show') {
    correct.classList.remove('show');
    correct.classList.add('hide')
  }  
  if (wrong.className = 'show') {
        wrong.classList.remove('show');
        wrong.classList.add('hide');
    }
  };

//display high scores
var displayHighScores = function() {
  containerHighScores.classList.remove('hide');
  containerHighScores.classList.add('show');
  gameover = 'true'

  if (endContainer.className = 'show') {
    endContainer.classList.remove('show');
    endContainer.classList.add('hide');
  }
  if (introContainer.className = 'show') {
    introContainer.classList.remove('show');
    introContainer.classList.add('hide');
  }
      
  if (questionContainer.className = 'show') {
    questionContainer.classList.remove('show');
    questionContainer.classList.add('hide');
  }

  if (correct.className = 'show') {
    correct.classList.remove('show');
    correct.classList.add('hide');
  }

  if (wrong.className = 'show') {
    wrong.classList.remove('show');
    wrong.classList.add('hide');
  }
}

//clears high scores
var clearScores = function() {
  HighScores = [];
  while (listHighScore.firstChild) {
    listHighScore.removeChild(listHighScore.firstChild);
  }
  localStorage.clear(HighScores);
} 

loadHighScore()

//event listeners for when a button is clicked
btnStart.addEventListener('click', startGame)
formInitials.addEventListener('submit', createHighScore)
ViewHighScore.addEventListener('click', displayHighScores)
btnGoBack.addEventListener('click', renderStartPage)
btnClearScores.addEventListener('click', clearScores)