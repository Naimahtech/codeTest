//timer test.
var count = 60;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done';
    // or...
    alert("You're out of time!");
  }
}, 1000);

//for the game.






//code test2
var WWTBAM = WWTBAM || {};

WWTBAM.Game = function()
{	
	// Here's our array of questions in the following format :
	// [question, potential answers, answer, money]
	questions = [
	 {"quest":'Complete this phrase. As sick as a...',
	 "option1":'Penguin',
	 "option2":'Parrot',
	 "option3":'Puffin',
	 "option4":'Partridge',
	 "ans":'Parrot',
	 "award": 0
	},
	{"quest":"Which legal document states a person's wishes regarding the disposal of their property after death?",
	"option1":'Will',
	"option2":'Shall',
	"option3":'Would',
	"option4":'Should',
	"ans":'Will', 
	"award":100
     },
     {"quest":"Complete the title of the James Bond film The Man With The Golden...",
	"option1":'Gun',
	"option2":'Tooth',
	"option3":'Delicious',
	"option4":'Eagle',
	"ans":'Gun', 
	"award":100
     },
     {"quest":'Which of these fruits shares its name with something superior or desirable?',
	"option1":'Apricot',
	"option2":'Mango',
	"option3":'Delicious',
	"option4": 'Plum',
	"ans":'Plum', 
	"award":100
     },
     {"quest":'In which sport do two teams pull at the opposite ends of a rope?',
	"option1":'Ice hockey',
	"option2":'Basketball',
	"option3":'Tug of war',
	"option4":'Polo',
	"ans":'Tug of war', 
	"award":100
     }];
	  
// Here are out variables
// This will store the correct answer each time a question is asked
	 var correctAnswer;
	 var current = 0;
	// This is to output the question in the HTML
	var questionBox = document.getElementById('question');
	// Output the question number in here
	var questionNumber = document.getElementById('question-number');
	// This is the answers box, so we can output them inside
	var answers = document.getElementById('answers');
	// Restart button for if they go bust
	var restart = document.getElementById('restart');
	// This will show the amount of funds a player has
	var bank = 0;

	var next  = document.getElementById('next');
		// Fifty fifty button
	var fiftyFifty = document.getElementById('fifty-fifty');
	// Free Pass Button
	var freePass = document.getElementById('free-pass');
	// Lineline shared class
	var lifeLine = document.getElementById('lifeline');
	// This is our question counter so we can go through each
	Qnum = -1;
		// These are the functions we call initially
	function init()
	{
		// We start off by calling the nextQuestion() function to start the quiz	
		nextQuestion();
		
		// If the restart button is clicked then we call the reStart() function
		 
		restart.addEventListener('click', reStart);
		// Free pass functionality
		freePass.onclick =  function(){
		
			// Hide the button
			freePass.style.visibility = "hidden";
			
			// Jump to next question
			nextQuestion();
			
		} ;

	}

	// Here's our starting point, it's also the place we will come back to when we want to ask the next question
	/*
	function nextQuestion() {
	
		// Starting the question number off at 0, as arrays start at 0
		// If we're coming here for a second time it's going to add one onto the previous number 
		// so the 2nd time this function is called the Qnum would be 1 therefore asking the 2nd question from the array
		Qnum += 1;
		
		console.log("qnum is " + Qnum)
		
		// Find out the total length of the questions, we need to know when to stop
		var total = questions.length;
		
		// If the question number is lower than the total then we can ask that question
		if(Qnum < total) {
		
			// Ask the question and pass the question number onto the function
			askQuestion(Qnum);
			
		}
		
		// If they've answered every question then lucky them - they're a millionaire
		else {
			
			// Change balance to a million
			bank.innerHTML= "Balance : £1m" ;
			// We don't want to see a question so outputting a message instead
			questionBox.innerHTML ="You're a millionaire" ;
			// We don't want to see any answers here
			answers.style.visibility = "hidden";
			// We don't want to see a reset button here
			restart.style.visibility = "visible"; 
			// We don't want to see the question number here
			questionNumber.style.visibility = "hidden";
			//Hide the lifeline buttons
			lifeLine.style.visibility = "hidden";
			
		}
				
	}
	*/


		// This outputs the question so the user can answer notice the counterNum which gives us the correct question from the array
	function askQuestion(counterNum) {
		
		
		questionNumber.innerHTML=  'Question number ' + (counterNum + 1) ;
		var q = questions[counterNum];

		questionBox.textContent  =  q.quest; 
		 
		var opt1 = document.getElementById('one');
		var opt2 = document.getElementById('two');
		var opt3 = document.getElementById('three');
		var opt4 = document.getElementById('four');

		 opt1.textContent = q.option1;
		 opt2.textContent = q.option2;
		 opt3.textContent = q.option3;
		 opt4.textContent = q.option4;

		 
		// Taking the 4th element from the array(money) and outputting it
		bank.innerHTML="Balance : £" + questions.award;
		
		// Taking the answer from the array and storing it in global variable
		correctAnswer = questions[counterNum].ans;
		
		console.log("Answer is " + correctAnswer);
		
		// Remove spaces and change to lowercase
		 		
		// Once they click an answer we call the answerQuestion function 
		document.getElementById('opt').addEventListener('click', answerQuestion);
		
		// Fifty Fifty functionality
		fiftyFifty.addEventListener('click',function(){
		
			// Hide the button
			fiftyFifty.style.visibility = "hidden";
			
			// start a count as we only want to remove 2 answers
			fiftyFiftycount = 0;
			
			//Loop through each li and check what the answers are
            var elements = document.querySelectorAll("#answers li");


			Array.prototype.forEach.call(elements, function() {
			
				// If count is lower than 2 then we will remove 2 incorrect answers
				if(fiftyFiftycount < 2) {
				
					// If the li answer is NOT equal to the correct answer then we can remove it
					// If the li answer is NOT equal to the correct answer then we can remove it
					if(answers.innerHTML.getAttribute('data-answer').replace(/ /g,'').toLowerCase() != correctAnswer) {
					
						// Hide it
						this.style.visibility = "hidden";
						
						// Add one to the count!
						fiftyFiftycount += 1;
						
					}
					
				}
			 
				
			});
			
		});
		
	}

	// This function detects if they answered correctly
	function answerQuestion() {
		  
      // find selected answer
       
      var selector = document.querySelector('input[type=radio]:checked');
      var userAnswer =  selector.value;
      if (!selector) {
      	bank.innerHTML = "your balance is : 0";
      }
       
		 if (questions[current].ans == userAnswer ) {
		 	bank += 20000;
		 	 document.getElementById('bank').innerHTML = bank; 

		 }

		 
      
		
		// If it doesn't then they have lost and we need to reset the game
		else {
		
			// Tell them they've lost
			questionBox.innerHTML =  "Sorry you've lost your money" ;
			// Reset the bank balance
			bank.innerHTML= "Balance : £0";
			// We don't want to see any answers here
			answers.style.visibility = "hidden";
			// We do want to see a reset button here
			restart.style.visibility = "visible"; 
			// We don't want to see the question number here
			questionNumber.style.visibility = "hidden";
			//Show the lifeline buttons
			lifeLine.style.visibility = "hidden";

			 next.style.visibility = "hidden"; 
		}
				
	}
	
	// If they player fails the game they need to restart with this function
	function reStart() {
		
		// Reset the Qnum back to the beginning
		Qnum = -1;
		// Start the quiz off just as we did at the start calling the nextQuestion() function
		nextQuestion();
		// We need to see the answers again
		answers.style.visibility = "visible"; 
		// We don't want to see a reset button here 
		restart.style.visibility = "hidden";
		// We do want to see the question number here
		questionNumber.style.visibility = "visible"; 
		//Show the lifeline buttons
		lifeLine.style.visibility = "visible"; 
		// Show the button
		fiftyFifty.style.visibility = "visible"; 
		// Show the button
		freePass.style.visibility = "visible"; 
		
	}

	init();
};


// ON DOC READY
document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  new WWTBAM.Game();
});

