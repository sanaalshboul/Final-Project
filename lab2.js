
let isVulnerable = true;

const vulnBtn = document.getElementById("vuln-btn");
const fixedBtn = document.getElementById("fixed-btn");
let targetLine = document.getElementById("target-line");
const codeExplanation = document.getElementById("code-explanation");
const outputBox = document.getElementById("simulation-output");
const emailInput = document.getElementById("emailInput");
const codeSection = document.getElementById("code-display");

//------------------Activate Vulnerable Mood
vulnBtn.addEventListener("click", () => {
  isVulnerable = true;

 vulnBtn.classList.add("active-vuln");
 fixedBtn.classList.remove("active-fixed");

codeSection.innerHTML = `function handleEmailSubmit(emailInput) {
if (isVulnerable) { <span class="highlight-line vuln-line" id="target-line">let regex = /^([a-zA-Z0-9]+)+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/; </span> 
 let attackType = getAttackType(userInput);
 if (attackType === "heavy") {
  outputBox.innerHTML = \`<strong>CRITICAL:</strong> Heavy ReDoS Attack detected!.\`;
  outputBox.className = "output-box attack-success";   
  requestAnimationFrame(() => {
   setTimeout(() => {regex.test(userInput);},50);});
  return;
 }else if (attackType === "medium") {
       outputBox.innerHTML = \`<strong>WARNING:</strong> Medium ReDoS detected!\`;
       outputBox.className = "output-box attack-success";
       regex.test(userInput);
       return;
 }
 let isValid = regex.test(userInput);
 if (isValid) {
   outputBox.innerHTML = \`<strong>Valid Email:</strong> Normal email passed.\`;
   outputBox.className = "output-box attack-blocked";
 }else {
   outputBox.innerHTML = \`<strong>Invalid:</strong> Email format is incorrect.\`;
   outputBox.className = "output-box";
 }}};`

  targetLine = document.getElementById("target-line");

  targetLine.className = "highlight-line vuln-line";
  targetLine.innerText = "let regex = /^([a-zA-Z0-9]+)+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$/;";
  codeExplanation.innerHTML =
    `<strong>Why it fails:</strong><br>The regular expression has nested repetition which causes catastrophic backtracking on long inputs ,freezing execution.`;

  outputBox.innerHTML = "Waiting for action...";
  outputBox.className = "output-box";
  
  emailInput.value ="";
});


//-----------------Activate Fixed Mood
fixedBtn.addEventListener("click", () => {
  isVulnerable = false;

  fixedBtn.classList.add("active-fixed");
  vulnBtn.classList.remove("active-vuln");
  
 codeSection.innerHTML = `function handleEmailSubmit(userInput) { 
if (isVulnerable == false) { <span class="highlight-line fixed-line" id="target-line">let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$/; </span>
 const start = performance.now();
 const isValid = regex.test(userInput);
 const duration = performance.now() - start;
 let attackType = getAttackType(userInput);
 if (isValid) {
      outputBox.innerHTML = \` <strong>SECURE :</strong> Valid email accepted safely.\`;
      outputBox.className = "output-box attack-blocked";
 } else {
      if (attackType === "medium" || attackType == "heavy")
        outputBox.innerHTML = \` <strong>BLOCKED :</strong> Possible ReDoS Attack.\`;
   else
        outputBox.innerHTML = \` <strong>BLOCKED :</strong> Invalid format.\`;
   outputBox.className = "output-box attack-blocked";
 }}}`;

    targetLine = document.getElementById("target-line");

  targetLine.className = "highlight-line fixed-line";
  targetLine.innerText = "let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$/;";
  
  codeExplanation.innerHTML =`<strong>The Fix:</strong><br> Removing nested repetition avoids catastrophic backtracking so regex matching stays linear.`;

  outputBox.innerHTML = "Waiting for action...";
  outputBox.className = "output-box";
  
  emailInput.value ="";
});

// ----------------To activate the payload buttons
function runPayload(payloadName) {
  const yourEmail = document.getElementById("emailInput");

  if (payloadName == "Payload1") {
    yourEmail.value = "testEmail@gmail.com";
  } else if (payloadName == "Payload2") {
    yourEmail.value = "aaaaaaaaaaaaaaaaaaaaaaaaaa!"; 
  } else if (payloadName == "Payload3") {
    yourEmail.value =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"; 
  }
}

//--------------To determine the type of attack (Medium or Heavy)
function getAttackType(userInput) {
  if (userInput.length > 35) {
    return "heavy";
  } else if (userInput.length > 25) {
    return "medium";
  }
  return "none";
}

//-------------To handle the submit button
function handleEmailSubmit(event) {
  event.preventDefault();
  //const emailInput = document.getElementById("emailInput");
  const userInput = emailInput.value.trim();
  const outputBox = document.getElementById("simulation-output"); 

  outputBox.innerHTML = " ";
  outputBox.className = "output-box";
  
  let regex;
  
  //--Vulnerable Mode--
  if (isVulnerable) {
    regex = /^([a-zA-Z0-9]+)+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    let attackType = getAttackType(userInput);
    
    if (attackType === "heavy") {
      outputBox.innerHTML = ` <strong>CRITICAL :</strong> Heavy ReDoS Attack Successful! <br>Payload triggered vulnerability.`;
      outputBox.className = "output-box attack-success";
      
      requestAnimationFrame(() => {
        setTimeout(() => {
            regex.test(userInput);
        } , 50);
      });
      
      return;
    } 
    else if (attackType === "medium") {
      outputBox.innerHTML = ` <strong>WARNING :</strong> Medium ReDoS Payload detected!`;
      outputBox.className = "output-box attack-success";
      regex.test(userInput);
      return;
    }
    
    let isValid = regex.test(userInput);
    if (isValid) {
      outputBox.innerHTML = ` <strong>Valid Email :</strong> Normal email passed successfully.`;
      outputBox.className = "output-box attack-blocked";
    } 
    else {
      outputBox.innerHTML = ` <strong>Invalid :</strong> Email format is incorrect.`;
      outputBox.className = "output-box";
    }
  }
  //--Fixed Mode--
  else {
    regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    
    const start = performance.now();
    let isValid = regex.test(userInput);
    const duration = performance.now() - start;

    let attackType = getAttackType(userInput);
    
    if (isValid) {
      outputBox.innerHTML = ` <strong>SECURE :</strong> Valid email accepted safely.<br>Duration time : `+ duration;
      outputBox.className = "output-box attack-blocked";
    } else {
	 if (attackType === "medium" || attackType == "heavy")
            outputBox.innerHTML = ` <strong>BLOCKED :</strong> Possible ReDoS Attack blocked successfully.<br>Duration time : `+ duration;
         else
            outputBox.innerHTML = ` <strong>BLOCKED :</strong> Invalid format blocked successfully.<br>Duration time : `+ duration;

	outputBox.className = "output-box attack-blocked";
    }
  }
}

