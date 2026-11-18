let isFixed = false;

function applyPayload(payloadValue) {
    const emailInput = document.getElementById("emailInput");
    emailInput.value = payloadValue;
    runValidation(payloadValue);
}

function handleEmailSubmit(event) {
    event.preventDefault();
    const emailValue = document.getElementById("emailInput").value;
    runValidation(emailValue);
}

function runValidation(input) {
    const resultBox = document.getElementById("simulationResult");
    
    const vulnerableRegex = /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
    const safeRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const activeRegex = isFixed ? safeRegex : vulnerableRegex;

    const startTime = performance.now();
    const isValid = activeRegex.test(input);
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    resultBox.innerHTML = `
        Mode: ${isFixed ? "Safe" : "Vulnerable"}<br>
        Input Length: ${input.length} chars<br>
        Execution Time: <span style="color: ${duration > 50 ? '#ff4d4d' : '#B9E4E8'};">${duration} ms</span>
    `;
}

function setMode(mode) {
    const vulBtn = document.getElementById("vulnerableModeBtn");
    const fixBtn = document.getElementById("fixedModeBtn");
    const codeDisplay = document.getElementById("codeDisplay");
    const explanationText = document.getElementById("whyItFailsText");
    const explanationTitle = document.querySelector(".why-fails-title");

    if (mode === 'fixed') {
        isFixed = true;
        fixBtn.classList.add("active");
        vulBtn.classList.remove("active");
        
        codeDisplay.textContent = `// Fixed Code (Safe Regex)\nconst safeRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n\nfunction validateEmail(email) {\n    return safeRegex.test(email);\n}`;
        
        explanationTitle.textContent = "How it's fixed:";
        explanationText.textContent = "The new regex avoids nested quantifiers and simply checks for characters separated by '@' and '.', eliminating the risk of catastrophic backtracking.";
    } else {
        isFixed = false;
        vulBtn.classList.add("active");
        fixBtn.classList.remove("active");
        
        codeDisplay.textContent = `// Vulnerable Code\nconst emailRegex = /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/;\n\nfunction validateEmail(email) {\n    return emailRegex.test(email);\n}`;
        
        explanationTitle.textContent = "Why it fails:";
        explanationText.textContent = "The regular expression uses nested quantifiers causing Catastrophic Backtracking when a long, almost-valid string is provided.";
    }
}