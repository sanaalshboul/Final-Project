// Current state of the application (vulnerable vs. fixed)
let isVulnerable = true;

// DOM elements
const vulnBtn = document.getElementById('vuln-btn');
const fixedBtn = document.getElementById('fixed-btn');
const targetLine = document.getElementById('target-line');
const codeExplanation = document.getElementById('code-explanation');
const outputBox = document.getElementById('simulation-output');

// Switch to Vulnerable Mode
vulnBtn.addEventListener('click', () => {
    isVulnerable = true;
    
    // Update button styles
    vulnBtn.classList.add('active-vuln');
    fixedBtn.classList.remove('active-fixed');
    
    // Update code snippet and explanation to the vulnerable version
    targetLine.className = 'highlight-line vuln-line';
    targetLine.innerText = '    // Vulnerable: eval(userInput);';
    codeExplanation.innerHTML = '<strong>Why it fails:</strong> The eval() function runs the input as code without any checks.';
    
    // Reset simulation output box
    outputBox.innerHTML = 'Waiting for action...';
    outputBox.className = 'output-box';
});

// Switch to Fixed Mode
fixedBtn.addEventListener('click', () => {
    isVulnerable = false;
    
    // Update button styles
    fixedBtn.classList.add('active-fixed');
    vulnBtn.classList.remove('active-vuln');
    
    // Update code snippet and explanation to the secure version
    targetLine.className = 'highlight-line fixed-line';
    targetLine.innerText = '    // Fixed: JSON.parse(userInput);';
    codeExplanation.innerHTML = '<strong>The Fix:</strong> We use JSON.parse() which only reads data, it cannot execute code.';
    
    // Reset simulation output box
    outputBox.innerHTML = 'Waiting for action...';
    outputBox.className = 'output-box';
});

// Payload simulation handler
// Triggered when the user clicks any payload button
function runPayload(payloadName) {
    if (isVulnerable) {
        // Attack succeeded (vulnerable state)
        outputBox.innerHTML = `⚠️ <strong>CRITICAL:</strong> Attack
