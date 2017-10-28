window.onload = function() {


};

var clockRunning = false;

//  Our game object.
var game = {

  correctCount: 0,
  incorrectCount: 0,
  questionNumber: 0,
  theChoice: "",

  time: 30,
  lap: 1,

  reset: function() {

    game.time = 30;
    game.lap = 1;

    $("#display").text(game.timeConverter(game.time))

  },

  start: function() {

      if (!clockRunning) {
        game.intervalId = setInterval(function(){game.count();}, 1000);
        clockRunning = true;
        
      }

  },
  stop: function() {

    clockRunning = false;
    clearInterval(game.intervalId);

  },
  count: function() {

    game.time--;

    if (game.time < 0) {
      this.reset();
      return;
    }

    var currentTime = game.timeConverter(game.time);
    $("#display").text(currentTime);
  },

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  },

  questions: [
    {
      question: "What is the square root of life?",
      answer: "6.48074",
      correct: false,

      choiceA: "42",
      choiceB: "6.48074",
      choiceC: "There is no square root of life.",
      choiceD: "420",
    },
    {
      question: "If a man named Tin Can can kick a tin can, what can Tin Can kick, man?",
      answer: "Tin can",
      correct: false,

      choiceA: "Tin can",
      choiceB: "Tin can't",
      choiceC: "Tintin's the man",
      choiceD: "42?",
    },
    {
      question: "What are the colors of the rainbow?",
      answer: "Roy G Biv",
      correct: false,

      choiceA: "Red, blue, green",
      choiceB: "I am colorblind",
      choiceC: "I have no hands",
      choiceD: "Roy G Biv",
    },
    {
      question: "What's up?",
      answer: "The sky",
      correct: false,

      choiceA: "the ceiling",
      choiceB: "the sky",
      choiceC: "the moon",
      choiceD: "the sun",
    },
    {
      question: "What's down?",
      answer: "the sky",
      correct: false,

      choiceA: "the sky",
      choiceB: "the ground",
      choiceC: "town",
      choiceD: "groundpound",
    },
    {
      question: "Are you tired of this quiz yet?",
      answer: "No! I love it!",
      correct: false,

      choiceA: "Yes.",
      choiceB: "A little bit.",
      choiceC: "I kinda like it.",
      choiceD: "No! I love it!",
    },
    {
      question: "Is this the last question?",
      answer: "Yes",
      correct: false,

      choiceA: "Yes",
      choiceB: "No",
      choiceC: "None of the above",
      choiceD: "All of the above",
    }
  ],
  answerIt: function() {
    // Doesn't work, but I'd try to log the answer and
    // store it in a variable.
    game.theChoice = $("input:radio:checked").val();
    console.log(game.theChoice);
  },
  checkIt: function() {
    // If the variable is correct, increase correct guesses live
    // and change the question
    // If false, increase incorrect guesses, and change the question
    $("#answerButton").on("click", function() {
      if (game.questions[game.questionNumber].answer === game.theChoice){
        game.correctCount++;
        game.questionNumber++;
      } else if (game.questions[game.questionNumber].answer !== game.theChoice){
        game.incorrectCount++;
        game.questionNumber++;
      }
    })
  },
  initialize: function() {
    $("#triviaQuestion").text(game.questions[game.questionNumber].question)
    $("#first").text(game.questions[game.questionNumber].choiceA)
    $("#second").text(game.questions[game.questionNumber].choiceB)
    $("#third").text(game.questions[game.questionNumber].choiceC)
    $("#fourth").text(game.questions[game.questionNumber].choiceD)
  }
};

window.onload = function() {
  game.initialize();
  // Timer not implemented yet.
  $("#lap").click(game.recordLap);
  $("#stop").click(game.stop);
  $("#reset").click(game.reset);
  $("#start").click(game.start);

};

$("#answerButton").on("click", function() {
  // get and store answer in variable
  game.answerIt();
  // check that variable and increment values based on that
  game.checkIt();
  // load new question based on values incremented previously
  game.initialize();

})


//$("#answerButton").click($("#display").text("hey"));
// Initialize Question
// window.onload = function() {
//   game.initialize();
// }

// $("#answerButton").on("click", function(){
//   $("#triviaQuestion").text(game.questions[game.questionNumber].question)
//   $("#first").text(game.questions[game.questionNumber].choiceA)
//   $("#second").text(game.questions[game.questionNumber].choiceB)
//   $("#third").text(game.questions[game.questionNumber].choiceC)
//   $("#fourth").text(game.questions[game.questionNumber].choiceD)
  
  //game.questionNumber++;
// })