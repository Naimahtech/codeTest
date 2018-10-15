var count = 150;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done';
    // or...
    alert("You're out of time!");
    main.style.visibility = "hidden";
      	begin.style.visibility = "visible";
        bank.innerHTML ="Balance : #0"  ;
  }
}, 1000);

var questions = [
	 {"quest":'Complete this phrase. As sick as a...',
	 "option1":'Penguin',
	 "option2":'Parrot',
	 "option3":'Puffin',
	 "option4":'Partridge',
	 "answer": '2',
	 
	},
	{"quest":"Which legal document states a person's wishes regarding the disposal of their property after death?",
	"option1":'Will',
	"option2":'Shall',
	"option3":'Would',
	"option4":'Should',
	"answer":'1', 
	      },
     {"quest":"Complete the title of the James Bond film The Man With The Golden...",
	"option1":'Gun',
	"option2":'Tooth',
	"option3":'Delicious',
	"option4":'Eagle',
	"answer":'1', 
	      },
     {"quest":'Which of these fruits shares its name with something superior or desirable?',
	"option1":'Apricot',
	"option2":'Mango',
	"option3":'Delicious',
	"option4": 'Plum',
	"answer":'4', 
	 
     },
     {"quest":'In which sport do two teams pull at the opposite ends of a rope?',
	"option1":'Ice hockey',
	"option2":'Basketball',
	"option3":'Tug of war',
	"option4":'Polo',
	"answer":"3", 
	 
     }];
	  
     var current = 0;
	 var total = questions.length;
	 var award = 0;
	 var correctAnswer;

        // This is to output the question in the HTML
        
        var questionNumber = document.getElementById('question-number');
	    var questionBox = document.getElementById('question');
	    var next  = document.getElementById('next');
	   var one = document.getElementById('one');
		var two = document.getElementById('two');
		var three = document.getElementById('three');
		var four = document.getElementById('four');
		var freePass = document.getElementById('free-pass');
		var begin = document.getElementById('begin');
        var main = document.getElementById('main');

		function askQuestion(counterNum) {
         var q = questions[counterNum];
         questionNumber.innerHTML =  'Question number ' + (counterNum + 1) ;
         questionBox.textContent = q.quest; 
         one.textContent = q.option1;
		 two.textContent = q.option2;
		 three.textContent = q.option3;
		 four.textContent = q.option4;
		  begin.style.visibility = "hidden";
		};
		 

		function  nextQuestion() {
			// body...
			// find selected answer
       
      var selectedOption  = document.querySelector('input[type=radio]:checked');
      if (!selectedOption) {
        alert('please, select an option');
      }

      var userAnswer =  selectedOption.value;
        correctAnswer = questions[current].answer;
       

      if ( correctAnswer == userAnswer ) {
      	 award += 100000;
      	 document.getElementById('bank').innerHTML = "your balance is:" + award; 
         current++;
      }
      if (correctAnswer !== userAnswer) {
      	window.alert("Sorry, you got the answer wrong and you've lost your money. " + "The correct answer is option :" +correctAnswer  );
      	main.style.visibility = "hidden";
      	begin.style.visibility = "visible";
        bank.innerHTML ="Balance : #0"  ;
        return;
      }
      selectedOption.checked = false;
		current++;
		if (current == total) {
        bank.html("Balance : #1m");
			// We don't want to see a question so outputting a message instead
			questionBox.innerHTML ="You're a millionaire" ;
			// We don't want to see any answers here
			//answers.hide();
			// We don't want to see a reset button here
			//restart.show();
			// We don't want to see the question number here
			questionNumber.style.visibility = "hidden";
			//Hide the lifeline buttons
			lifeLine.style.visibility = "hidden";
		}

         askQuestion(current); 
		}


 askQuestion(current);

 function pass() {
 	current++;
 	askQuestion(current); 
 	freePass.style.visibility = "hidden";

 }

 function again() {
 	// body...
 	location.reload(); 
 }
 function fifty() {

 	// body...
 	two.style.visibility = "hidden";
 	four.style.visibility = "hidden";
    document.getElementById('fifty-fifty').style.visibility = "hidden";

 }