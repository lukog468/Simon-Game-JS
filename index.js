var buttonColors = ['green', 'red', 'blue', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        $(".header").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    level++;

    $(".header").text("Level " + level);
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

function playSound(name) {
    var audio = new Audio();
    audio.src = "./sounds/" + name + ".mp3";
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(
        function () {
            $("#" + currentColor).removeClass("pressed")
        }, 100);
}

$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    // console.log(userClickedPattern);
    ansCheck(userClickedPattern.length-1);
});

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}

function ansCheck(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) 
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            console.log(userClickedPattern);
            console.log(gamePattern);
            console.log('succeess');
            setTimeout(function(){nextSequence()},1000);
        }
    } 
    else 
    {
        console.log("wrong");
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $('.header').text('Game Over, Press any key to restart');
        $('.header').css("font-size","2rem");
        startOver();
    }
}