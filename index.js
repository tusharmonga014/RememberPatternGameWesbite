var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern;
var level;
var gameGoingOn = false;
var userPatternClickNumber;    //tells the no of colour user has to press currently

function animateButton(buttonColour, clickedByUser = false) {
    if (clickedByUser) {
        $("#" + buttonColour).addClass("pressed");
        setTimeout(function () {
            $("#" + buttonColour).removeClass("pressed");
        }, 100);
    }
    else
        $("#" + buttonColour).fadeOut(100).fadeIn(100);    //verify
}

function playButton(buttonColour) {
    var aud = new Audio("sounds/" + buttonColour + ".mp3");
    aud.play();
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern[level - 1] = randomChosenColour;    //storing the game pattern, at level->1, game colour->0th, so level-1
    playButton(randomChosenColour);
    animateButton(randomChosenColour);
}

function updateLevel() {
    level++;
    $("#level-title").text("Level " + level);
}

function startGame() {
    level = 0;
    gameGoingOn = true;
    gamePattern = [];
    updateLevel();
    setTimeout(function () {
        nextSequence();
    }, 500);
    userPatternClickNumber = 0;
}

function gameOver() {
    gameGoingOn = false;
    $("body").addClass("game-over");
    var aud = new Audio("sounds/wrong.mp3");
    aud.play();
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 800);
    $("#level-title").text("Game Over, Click Any Where to Restart");
}

$("body").click(function () {
    if (!gameGoingOn) {
        console.log("started");
        startGame();
    }
});

$(".btn").click(function (e) {
    e.stopImmediatePropagation();    // DOUBT-----------------------------------------------------------------------
    if (gameGoingOn) {
        var userChosenColour = $(this).attr("id");
        playButton(userChosenColour);
        animateButton(userChosenColour, true);    //true for Clicked By User
        if (userChosenColour === gamePattern[userPatternClickNumber]) {
            userPatternClickNumber++;
            if (userPatternClickNumber == gamePattern.length) {       //user has completed pattern till now 
                updateLevel();
                userPatternClickNumber = 0;
                setTimeout(function () {
                    nextSequence();
                }, 500);
            }
        }
        else {
            gameOver();
        }
    }
});
