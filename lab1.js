// Current state of the site (vulnerable vs. fixed)
let isVulnerable = true;

// Fetch HTML elements
const vulnBtn = document.getElementById('vuln-btn');
const fixedBtn = document.getElementById('fixed-btn');
const targetLine = document.getElementById('target-line');
const codeExplanation = document.getElementById('code-explanation');
const outputBox = document.getElementById('simulation-output');

// Handle switching to "Vulnerable" mode
vulnBtn.addEventListener('click', () => {
    isVulnerable = true;
    
    // Update button styles
    vulnBtn.classList.add('active-vuln');
    fixedBtn.classList.remove('active-fixed');
    
    // Update code snippet and explanation to the vulnerable version
    targetLine.className = 'highlight-line vuln-line';
    targetLine.innerText = '    // Vulnerable: eval(userInput);';
    codeExplanation.innerHTML = '<strong>Why it fails:</strong> The eval() function runs the input as code without any checks.';
    
    // Reset the output box
    outputBox.innerHTML = 'Waiting for action...';
    outputBox.className = 'output-box';
});

// Handle switching to "Fixed" mode
fixedBtn.addEventListener('click', () => {
    isVulnerable = false;
    
    // Update button styles
    fixedBtn.classList.add('active-fixed');
    vulnBtn.classList.remove('active-vuln');
    
    // Update code snippet and explanation to the secure version
    targetLine.className = 'highlight-line fixed-line';
    targetLine.innerText = '    // Fixed: JSON.parse(userInput);';
    codeExplanation.innerHTML = '<strong>The Fix:</strong> We use JSON.parse() which only reads data, it cannot execute code.';
    
    // Reset the output box
    outputBox.innerHTML = 'Waiting for action...';
    outputBox.className = 'output-box';
});

// Payload simulation function
// Triggered when the visitor clicks one of the payload buttons
function runPayload(payloadName) {
    if (isVulnerable) {
        // Attack succeeded (site is vulnerable)
        outputBox.innerHTML = `⚠️ <strong>CRITICAL:</strong> Attack successful! <br>Payload "${payloadName}" executed on the page.`;
        outputBox.className = 'output-box attack-success';
    } else {
        // Attack blocked (site is secured)
        outputBox.innerHTML = `🛡️ <strong>BLOCKED:</strong> Attack failed. <br>The fix correctly blocked "${payloadName}".`;
        outputBox.className = 'output-box attack-blocked';
    }
}
