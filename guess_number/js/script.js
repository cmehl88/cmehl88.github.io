document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global variables
let randomNumber;
let attempts = 0;
let totalWins = 0;
let totalLoses = 0;
let attemptsLeft = 7;

initializeGame();
function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: " + randomNumber);
    attempts = 0; // have to reset the attempts

    // hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    // showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();        // adding focus to textbox
    playerGuess.value = "";     // clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";  // clearing the feedback

    // clearing previous guesses
    document.querySelector("#guesses").textContent = "";
    // Update the total wins and loses
    document.querySelector("#Wins").textContent = totalWins;
    document.querySelector("#Loses").textContent = totalLoses;
    document.querySelector("#AttsLeft").textContent = attemptsLeft;
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Out of Bounds!!! Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    attemptsLeft--;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "lightgreen";
        feedback.style.backgroundColor = "darkgreen";
        totalWins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! Random Number was " + randomNumber;
            feedback.style.color = "red";
            feedback.style.backgroundColor = "Black"
            totalLoses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
            feedback.style.backgroundColor = "red"
        } else {
            feedback.textContent = "Guess was low";
            feedback.style.backgroundColor = "blue"
        }
    }    
    document.querySelector("#AttsLeft").textContent = attemptsLeft;
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    // Update the wins and loses
    document.querySelector("#Wins").textContent =  totalWins;
    document.querySelector("#Loses").textContent = totalLoses;
    guessBtn.style.display = "none";   // hides Guess button
    resetBtn.style.display = "inline"; // shows Reset button
    attemptsLeft = 7;
}