// Event Listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#pw").addEventListener("click", displayPassword);
document.querySelector("#userBox").addEventListener("change", displayUsername);

// Functions
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    let url ="https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    try {
    let response = await fetch(url);
    try {
    let data = await response.json();
    //console.log(data);  
    document.querySelector("#city").textContent = data.city; 
    document.querySelector("#lat").textContent = data.latitude;   
    document.querySelector("#long").textContent = data.longitude;   
    } catch(parseError){
        console.log("Parse error " + parseError);
    }
    } catch(error) {
        console.log("Network error " + error);
    }
}



displayStates()
async function displayStates(){
    let url ="https://csumb.space/api/allStatesAPI.php";
    try {
    let response = await fetch(url);
    try {
    let data = await response.json();
    //console.log(data);

    for (let i of data){
    let optionElement = document.createElement("option");
    optionElement.textContent = i.state;
    optionElement.value= i.usps;
    document.querySelector("#state").append(optionElement);
    }
    } catch(parseError){
        console.log("Parse error " + parseError);
    }
    } catch(error) {
        console.log("Network error " + error);
    }
}

async function displayPassword(){
    let url ="https://csumb.space/api/suggestedPassword.php?length=8";
    try {
    let response = await fetch(url); 
    try {
    let data = await response.json();
    //console.log(data);  
    document.querySelector("#suggestedPW").textContent = data.password; 
    } catch(parseError){
        console.log("Parse error " + parseError);
    }
    } catch(error) {
        console.log("Network error " + error);
    }
}

async function displayUsername(){
    let userInput = document.querySelector("#userBox").value;
    let url ="https://csumb.space/api/usernamesAPI.php?username=" + userInput;
    try {
    let response = await fetch(url);
    try {
    let data = await response.json();

    console.log(data);  
    if(data.available == false){
    document.querySelector("#userName").textContent = "Username is already in use"; 
    }
    else {
    document.querySelector("#userName").textContent = "Username is not is use"; 
    }
    } catch(parseError){
        console.log("Parse error " + parseError);
    }
    } catch(error) {
        console.log("Network error " + error);
    }
}






