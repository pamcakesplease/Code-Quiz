
let questions = [ 
	{ 
		prompt: `What does CSS stand for?`, 
		options: [ 
			"Cascading Style Sheet", 
			"Creative Style Source", 
			"Cascade Source Script", 
			"Color and Styles", 
		], 
		answer: "Cascading Style Sheet", 
	}, 

	{ 
		prompt: `What is an array?`, 
		options: [ 
			"A variable", 
			"A function", 
			"A list of variables", 
			"A script source", 
		], 
		answer: "A list of variables", 
	}, 

	{ 
		prompt: `What is bootstrap?`, 
		options: [ 
			"A javascript term", 
			"A CSS framework", 
			"A function", 
			"A label", 
		], 
		answer: "A CSS framework", 
	}, 

	{ 
		prompt: `In JavaScript, which 
				of the following is 
				a logical operator?`, 
		options: ["|", "&&", "%", "/"], 
		answer: "&&", 
	}, 

	{ 
		prompt: `What is a media query used for?`, 
		options: [ 
			"To match a devices display size", 
			"To search for something", 
			"To display a video", 
			"To resize a picture", 
		], 
		answer: "To match a devices display size", 
	}, 
]; 



let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 


let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 



function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 
function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 


function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 10; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 


function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 


function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 

function saveHighscore() { 
	let name = nameEl.value.trim(); 
	if (name !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			name: name, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 


function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 
nameEl.onkeyup = checkForEnter; 


submitBtn.onclick = saveHighscore; 

startBtn.onclick = quizStart;
