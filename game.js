var buttonColors = ['red','blue','green','yellow'];
var gamePatter = [];
var userClickPatter = [];

var started = false;
var level = 0;
console.log('first level',level)



$(document).keypress(function(){
    if(!started){
        $('#level-title').text('Level' + level);
        nextSequence();
        started = true;
    }
});



$('.btn').click(function() {
    var userChooseColor = $(this).attr('id')
    userClickPatter.push(userChooseColor);
    playSound(userChooseColor);
    animatePress(userChooseColor);

    checkAnswer(userClickPatter.length-1);
})




function checkAnswer(currentLevel){
    if(gamePatter[currentLevel] === userClickPatter[currentLevel]){
        console.log('success');

        if(userClickPatter.length === gamePatter.length){
            setTimeout(function (){
                nextSequence();
            },1000)
        }
    }
    else{
        var score = level -1 
        
        console.log('Wrong');
        playSound("wrong");
        $('body').addClass('game-over')
        $('#level-title').text('Game Over, Press Any Key To Restart. Score = ' + score)
        setTimeout(function (){
            $('body').removeClass('game-over');
        },200);

        startOver();
    }
}


function nextSequence(){
    userClickPatter = [];

    level = level + 1;

    $('#level-title').text('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePatter.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}


function playSound(name){
    var audio = new Audio('sounds/' + name +".mp3");
    audio.play();

}


function animatePress(currentColor){
    $('#'+ currentColor ).addClass("pressed") ;
    setTimeout(function (){
        $('#'+ currentColor ) .removeClass ("pressed" );
    },100);
}


function startOver(){
    level = 0;
    gamePatter = [];
    started = false;
}




