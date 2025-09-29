document.querySelector("#submit").addEventListener("click",submit);

function submit() {
    let totalScore = 0;
    let userAnswer1 = document.querySelector("#q1Text").value;
    let attempts = localStorage.getItem("quizAttempts");

    if (!attempts) {
        attempts = 0; // if no value yet
    }
    attempts++;
    localStorage.setItem("quizAttempts", attempts);

    if(userAnswer1 == "Wardell"){
        document.querySelector("#q1").style.backgroundColor = "green";
        totalScore += 20;
        document.querySelector("#image1").textContent = "✅";
    }else{
        document.querySelector("#q1").style.backgroundColor = "red";
        document.querySelector("#image1").textContent = "❌";
    }

    let userAnswer2 = document.querySelector("input[name=q1]:checked").value;
    if(userAnswer2=="Warriors"){
        document.querySelector("#q2").style.backgroundColor = "green";
        totalScore += 20;
        document.querySelector("#image2").textContent = "✅";
    }else{
        document.querySelector("#q2").style.backgroundColor = "red";
        document.querySelector("#image2").textContent = "❌";
    }

    let userAnswer3 = document.querySelector("#food").value;
    if(userAnswer3=="Popcorn"){
        document.querySelector("#q3").style.backgroundColor = "green";
        totalScore += 20;
        document.querySelector("#image3").textContent = "✅";
    }else{
        document.querySelector("#q3").style.backgroundColor = "red";
        document.querySelector("#image3").textContent = "❌";
    }

    let userAnswer4 = document.querySelector("#numThrees").value;
    if(userAnswer4==13){
        document.querySelector("#q4").style.backgroundColor = "green";
        totalScore += 20;
        document.querySelector("#image4").textContent = "✅";
    }else{
        document.querySelector("#q4").style.backgroundColor = "red";
        document.querySelector("#image4").textContent = "❌";
    }

    if(document.querySelector("#b").checked&&document.querySelector("#c").checked&&!document.querySelector("#a").checked&&!document.querySelector("#d").checked){
        document.querySelector("#q5").style.backgroundColor = "green";
        totalScore += 20;
        document.querySelector("#image5").textContent = "✅";
    }else{
        document.querySelector("#q5").style.backgroundColor = "red";
        document.querySelector("#image5").textContent = "❌";
    }

    document.querySelector("h2").removeAttribute('hidden');
    document.querySelector("h2").textContent = "Total Score: " + totalScore;

    // If 80 or above display the message
    if (totalScore >= 80) {
        document.querySelector("h2").textContent = "Total Score: " + totalScore + ", Congrats on 80 or Above!";
    }
    document.querySelector("#attempts").textContent = "Total Quiz Attempts: " + attempts;
}