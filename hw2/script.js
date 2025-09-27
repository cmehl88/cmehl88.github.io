// === Event Listeners ===
document.querySelector("#spinBtn").addEventListener("click", spinning);
document.querySelector("#resetBtn").addEventListener("click", resetGame);
document.querySelector("#moneyInput").addEventListener("keypress", addMoneyOnEnter);

// === Global Vars ===
const symbols = ["🍒", "🍋", "💎"]; // 0 is cherry, 1 is pear, 2 is diamond
let totalMoney = 0;
let spinAmount = 0; // how much each spin is
let bannerTimeout; // Global banner timeout for displaying win/losses

// === Functions ===
function spinning() {

    // Errors
    const errorBox = document.getElementById("anyErrors");
    errorBox.textContent = ""; // clear previous errors
    clearTimeout(bannerTimeout); // cancel any previous timeout

    // Get the user input
    spinAmount = parseInt(document.querySelector("#spinInput").value);

    // Make sure its a number and above 0
    if (isNaN(spinAmount) || spinAmount <= 0) {
        errorBox.textContent = "Please enter a valid spin amount.";
        return;
    }

    // make sure you have enough money to spin 
    if (totalMoney < spinAmount) {
        errorBox.textContent = "Not enough money! Go find an ATM to keep playing!";
        return;
    }

    // Generate random numbers
    const num1 = Math.floor(Math.random() * 3);
    const num2 = Math.floor(Math.random() * 3);
    const num3 = Math.floor(Math.random() * 3);

    // Update reels
    document.getElementById("reel1").textContent = symbols[num1];
    document.getElementById("reel2").textContent = symbols[num2];
    document.getElementById("reel3").textContent = symbols[num3];

    // next call the win or loss function to continue
    winOrLoss(num1, num2, num3);
}

function winOrLoss(num1, num2, num3) {
    const banner = document.getElementById("winBanner"); // same banner div
    const errorBox = document.getElementById("anyErrors"); 

    // Clear any old messages
    errorBox.textContent = "";
    banner.style.display = "none";
    clearTimeout(bannerTimeout); // cancel any previous timeout

    if (num1 === num2 && num2 === num3) {
        // win case
        totalMoney += spinAmount * 3; // if you win its times 3 to the spin amount

        // !!BANNER IDEAS AND GIFS FROM GIPHY.COM and W3SCHOOLS.COM!! 
        banner.innerHTML = `
            💎<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWFpNHNhY3FoajBwcHM4eWFwYjRsN3dkNzVjdGt3cHdhY2Nhb21ydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1qgdfBl0FRZ4dM7YzU/giphy.webp" alt="diamond">
            💎 YOU WIN 💎 
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWFpNHNhY3FoajBwcHM4eWFwYjRsN3dkNzVjdGt3cHdhY2Nhb21ydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1qgdfBl0FRZ4dM7YzU/giphy.webp" alt="diamond">
        💎`;

        banner.style.color = "#46eafc"; // ice blue
        banner.style.textShadow = "0 0 20px #00faff, 0 0 40px #00faff";
        banner.style.display = "block";

        // Update money display
        document.getElementById("theMoney").textContent = totalMoney;

        // Hide banner after 5 seconds
        setTimeout(() => {
            banner.style.display = "none";
        }, 6000);

    } else {
        // lost case
        totalMoney -= spinAmount; // Remove that spin's cost from the users money

        // !!BANNER IDEAS AND GIFS FROM GIPHY.COM and W3SCHOOLS.COM!! 
        banner.innerHTML = `
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDVucDc3OXMxYnE5aWZkM3M5dWdqOWJ4NWdvbDYwNjUwb2tmN2U1cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6k9LX2KCVFQRsdmDkr/giphy.gif" alt="lose-left">
            ❌ YOU LOSE ❌
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHNjYTE4YWViYzVsajU4NjFyeWh1eWl1YXZrMXh5cjB0OXhscTNhNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6UBl6P4Ey0zkqbnO/giphy.gif" alt="lose-right">
        `;

        banner.style.color = "red";
        banner.style.textShadow = "0 0 20px #ff0000, 0 0 40px #aa0000";
        banner.style.display = "block";

        // Update the money displayed
        document.getElementById("theMoney").textContent = totalMoney;

        // Hide banner after 5s
        setTimeout(() => {
            banner.style.display = "none";
        }, 2500);
    }
}

// Reset everything
function resetGame() {
    totalMoney = 0;
    spinAmount = 0;
    document.getElementById("theMoney").textContent = totalMoney;
    document.querySelector("#moneyInput").value = "";
    document.querySelector("#spinInput").value = "";
}

// When you press enter the money amount shows up at "Your Money"
// w3schools helped with this enter key part.
function addMoneyOnEnter(e) {
    if (e.key === "Enter") {
        const moneyInput = document.getElementById("moneyInput");
        let moneyEntered = parseInt(moneyInput.value); // needs to be a number

        // if theres an error post it
        if (!isNaN(moneyEntered) && moneyEntered > 0) {
            totalMoney += moneyEntered;
            document.getElementById("theMoney").textContent = totalMoney;
            moneyInput.value = ""; // clear the input
        } else {
            document.getElementById("anyErrors").textContent = "Please enter a valid money amount.";
        }
    }
}
