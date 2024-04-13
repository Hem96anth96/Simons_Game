// Array to store the game pattern
var gamePattern = [];
userClickedPattern = [];

// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Variable to keep track of the current level
var level = 0;

// Function to generate the next color in the sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

// Function to play the sequence of colors
function playSequence() {
    level++;
    $("h1").text("Level " + level + ", press colours " + level + " times");
    var randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);

    // Play each color in the sequence with a delay
    gamePattern.forEach(function (color, index) {
        setTimeout(function () {
            playSequenceSound(color);
        }, 500 * index);
    });
}

// Function to play sound for each color
function playSequenceSound(color) {
    var audioSequence = new Audio("./sounds/" + color + ".mp3");
    audioSequence.play();

    $("#" + color)
        .animate({ opacity: 0.5 }, "fast")
        .delay(100)
        .animate({ opacity: 1 }, "fast");
}


// Event listener for button clicks
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); // Store the user's chosen color
    playSound(userChosenColour);
    
    // Check if the user has clicked the same number of times as the length of the gamePattern array
    if (userClickedPattern.length === gamePattern.length) {
        checkAnswer(); // If so, check the answer
    }
});


function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// Function to check if the player's input matches the sequence
function checkAnswer() {
    // Iterate through each element in userClickedPattern
    for (var i = 0; i < userClickedPattern.length; i++) {
        // Compare each color in userClickedPattern with the corresponding color in gamePattern
        if (userClickedPattern[i] !== gamePattern[i]) {
            // If any color doesn't match, game over
            $("h1").text("Game Over, Press PLAY to Restart");
            // Reset the game
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
            unhidePlay();
            return; // Exit the function early
        }
    }

    // If all colors match and the user has clicked the correct sequence
    // Proceed to the next level
    setTimeout(function () {
        nextLevel();
    }, 500);
}

// Function to proceed to the next level
function nextLevel() {
    $("h1").text("Level " + level + " done 🤟");
    userClickedPattern = []; // Reset the user's chosen colors
    setTimeout(function () {
        playSequence();
    }, 2000);
}

function hidePlay(){
$("#Play-button").addClass("hidePlay");

}

function unhidePlay(){
  $("#Play-button").removeClass("hidePlay");
  
  }
// Event listener for key press to start the game
$("#Play-button").on("click", function () {
  hidePlay();
  if (gamePattern.length === 0) {
      playSequence(); // Start the game sequence
  }
});
