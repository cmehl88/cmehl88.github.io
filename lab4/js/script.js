// Event Listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#pw").addEventListener("click", displayPassword);
document.querySelector("#userBox").addEventListener("change", displayUsername);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#form").addEventListener("click", submitForm);

// Functions
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data);
            if (data == false) {
                document.querySelector("#city").textContent = "Zip code not found";
                document.querySelector("#city").style.backgroundColor = "red";
                document.querySelector("#lat").textContent = "";
                document.querySelector("#long").textContent = "";
            } else {
                document.querySelector("#city").textContent = data.city;
                document.querySelector("#lat").textContent = data.latitude;
                document.querySelector("#long").textContent = data.longitude;
            }
        } catch (parseError) {
            console.log("Parse error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
}

displayStates()
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            //console.log(data);

            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.state;
                optionElement.value = i.usps;
                document.querySelector("#state").append(optionElement);
            }
        } catch (parseError) {
            console.log("Parse error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
}

async function displayPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            //console.log(data);  
            document.querySelector("#suggestedPW").textContent = "Suggested Password: " + data.password;
        } catch (parseError) {
            console.log("Parse error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
}

async function displayUsername() {
    let userInput = document.querySelector("#userBox").value;
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + userInput;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();

            console.log(data);
            if (data.available == false) {
                document.querySelector("#userName").textContent = "Username is already in use";
                document.querySelector("#userName").style.backgroundColor = "red";
            }
            else {
                document.querySelector("#userName").textContent = "Username is not is use";
                document.querySelector("#userName").style.backgroundColor = "green";
            }
        } catch (parseError) {
            console.log("Parse error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
}

async function displayCounties() {
    let stateCode = document.querySelector("#state").value;
    let url = "https://csumb.space/api/countyListAPI.php?state=" + stateCode;

    try {
        let response = await fetch(url);
        let data = await response.json();
        let countySelect = document.querySelector("#county");
        countySelect.innerHTML = ""; // clear previous counties from the list

        for (let c of data) { // Get all the options for that statecode
            let option = document.createElement("option");
            option.textContent = c.county;
            option.value = c.county;
            countySelect.append(option);
        }
    } catch (error) {
        console.log("Network error", error);
    }
}

function submitForm() {
    // Clear input incase of resubmitting
    document.querySelector("#complete").textContent = "";
    document.querySelector("#error1").textContent = "";
    document.querySelector("#error2").textContent = "";
    document.querySelector("#error1").style.backgroundColor = "transparent";
    document.querySelector("#error2").style.backgroundColor = "transparent";
    document.querySelector("#userName").style.backgroundColor = "transparent";

    // Get variables
    let username = document.querySelector("#userBox").value;
    let password = document.querySelector("#pw").value;
    let passwordAgain = document.querySelector("#pw2").value;
    let counter = 0;

    // Error Checking
    if (username.length < 3) {
        document.querySelector("#userName").textContent = "Username needs to have at least three characters";
        document.querySelector("#userName").style.backgroundColor = "red";
        counter++;
    }

    if (password.length < 6) {
        document.querySelector("#error1").textContent = "  Error, Password needs to have at least six characters";
        document.querySelector("#error1").style.backgroundColor = "red";
        counter++;
    }

    if (password != passwordAgain) {
        document.querySelector("#error2").textContent = "Passwords need to match";
        document.querySelector("#error2").style.backgroundColor = "red";
        counter++;
    }

    if (counter > 0) {
        document.querySelector("#complete").textContent = "Form Incomplete";
        document.querySelector("#complete").style.backgroundColor = "red";

    }
    else {
        document.querySelector("#complete").textContent = "Form Completed!";
        document.querySelector("#complete").style.backgroundColor = "green";
    }
}

