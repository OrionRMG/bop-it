let level = 0;
let speedScale = 2000;
let actions = ["bop-it", "click", "scroll-down", "scroll-up"];
let currentAction;
let timer;
let started = false;
let actionLock = false;
let highScore = 0;

function game(){


}

function nextAction(){
    actionLock = false;
    $("#main-box").removeClass("box-blue");
    $("#content").removeClass("bg-blue")
    let randNum = Math.floor(Math.random() * 4);
    currentAction = actions[randNum];
    switch (currentAction) {
        case "bop-it":
            $("#icon").attr("src", "images/bop-it.png");
            $("h1").text("Bop it!");
            break;

        case "click":
            $("#icon").attr("src", "images/click.png");
            $("h1").text("Click it!");
            break;
    
        case "scroll-down":
            $("#icon").attr("src", "images/scroll-down.png");
            $("h1").text("Scroll down!");
            break;

        case "scroll-up":
            $("#icon").attr("src", "images/scroll-up.png");
            $("h1").text("Scroll up!");
            break;

        default:
            break;
    }



    startTimer();

    level++;
}

//Spacebar handler
$(document).on("keydown", (e) =>{
    if (e.key === " " && started === false){
        $("#main-box").removeClass("box-failed");
        $("#content").removeClass("bg-failed")
        level = 0;
        started = true;
        nextAction();
    } else if (e.key === " " && started === true && actionLock === false){
        checkAction("bop-it");
    }
    else if (e.key === "r"){
        level = 0;
        started = false;
        $("#main-box").removeClass("box-failed");
        $("#content").removeClass("bg-failed")
        $("#icon").attr("src", "images/bop-it.png");
        $("h1").text("Bop it to start!");
        speedScale = 2000;
    }
});

//Click handler
$(document).on("click", () =>{
    if (started === true && actionLock === false){
        checkAction("click");
    }
});

//Scroll handler
$(document).on("mousewheel", (e) =>{
    if (started === true && actionLock === false){
        if (e.originalEvent.deltaY < 0){
            checkAction("scroll-up");
        } else {
            checkAction("scroll-down");
        }
    }
});

//Start the timer
function startTimer(){
    timer = setTimeout(() => {
        $("#main-box").addClass("box-failed");
        $("#content").addClass("bg-failed")
        $("h1").text(level);
        $("#icon").attr("src", "images/fail.png");
        started = false;
        checkHighScore();
    }, speedScale);
}

//Check an action
function checkAction(action){
    if (currentAction === action){
        clearTimeout(timer);
        actionLock = true;
        $("#main-box").addClass("box-blue");
        $("#content").addClass("bg-blue")
        setTimeout(() => {
            speedScale = speedScale * 0.9;
            nextAction();
        }, 500);
    } else {
        $("#main-box").addClass("box-failed");
        $("#content").addClass("bg-failed")
        $("h1").text(level);
        $("#icon").attr("src", "images/fail.png");
        speedScale = 2000;
        started = false;
        checkHighScore();
    }
}

function checkHighScore(){
    if (level > highScore){
        highScore = level;
        $("#high-score").text("High score: " + highScore);
    }
}