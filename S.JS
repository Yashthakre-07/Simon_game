let game = [];
let user = [];
let started = false;
let level = 0;

let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        user = [];  // Reset the user sequence when the game starts
        game = [];  // Reset the game sequence as well
        level = 0;  // Reset the level to 0
        levelUp();
    }
});

function levelUp() {
    user = [];  // Reset user input for the new level
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);  // Use *4 to cover all buttons
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gamef(randbtn);
    game.push(randColor);  // Store the generated color sequence
}

function gamef(btn) {
    btn.classList.add("gamef");
    setTimeout(function () {
        btn.classList.remove("gamef");
    }, 250);
}

function userf(btn) {
    btn.classList.add("userf");  // Apply the 'userf' class to trigger the effect
    setTimeout(function () {
        btn.classList.remove("userf");
    }, 250);
}

function btnPress() {
    let btn = this;
    userf(btn);  // Trigger the flash effect with the userf function
    let userColor = btn.getAttribute("id");  // Get the color from the button's id
    user.push(userColor);  // Add the user's selected color to the user array
   
    ans(user.length - 1);  // Check user's answer with the current length
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function ans(idx) {
    if (user[idx] === game[idx]) {  // Compare user input to game sequence
        if (user.length === game.length) {
            // If user sequence matches game sequence, go to the next level
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game over: Show score and reset the game
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset() {
    started = false;
    game = [];
    user = [];
    level = 0;
}


