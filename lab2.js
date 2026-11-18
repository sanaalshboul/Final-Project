// حالة الموقع الحالية (هل هو مصاب أم تم إصلاحه؟)
let isVulnerable = true;

// جلب عناصر الـ HTML
const vulnBtn = document.getElementById('vuln-btn');
const fixedBtn = document.getElementById('fixed-btn');
const targetLine = document.getElementById('target-line');
const codeExplanation = document.getElementById('code-explanation');
const outputBox = document.getElementById('simulation-output');

// عند الضغط على زر التبديل إلى "Vulnerable"
vulnBtn.addEventListener('click', () => {
    isVulnerable = true;
    
    // تغيير ألوان الأزرار
    vulnBtn.classList.add('active-vuln');
    fixedBtn.classList.remove('active-fixed');
    
    // تغيير الكود والشرح للنسخة المصابة
    targetLine.className = 'highlight-line vuln-line';
    targetLine.innerText = '    // Vulnerable: eval(userInput);';
    codeExplanation.innerHTML = '<strong>Why it fails:</strong> The eval() function runs the input as code without any checks.';
    
    // إعادة تعيين مربع النتيجة
    outputBox.innerHTML = 'Waiting for action...';
    outputBox.className = 'output-box';
});

// عند الضغط على زر التبديل إلى "Fixed"
fixedBtn.addEventListener('click', () => {
    isVulnerable = false;
    
    // تغيير ألوان الأزرار
    fixedBtn.classList.add('active-fixed');
    vulnBtn.classList.remove('active-vuln');
    
    // تغيير الكود والشرح للنسخة الآمنة
    targetLine.className = 'highlight-line fixed-line';
    targetLine.innerText = '    // Fixed: JSON.parse(userInput);';
    codeExplanation.innerHTML = '<strong>The Fix:</strong> We use JSON.parse() which only reads data, it cannot execute code.';
    
    // إعادة تعيين مربع النتيجة
    outputBox.innerHTML = 'Waiting for action...';
    outputBox.className = 'output-box';
});

// وظيفة محاكاة الحمولات (Payload Simulation)
// يتم استدعاؤها عندما يضغط الزائر على أحد أزرار الـ Payload
function runPayload(payloadName) {
    if (isVulnerable) {
        // حالة الهجوم الناجح (الموقع مصاب)
        outputBox.innerHTML = `⚠️ <strong>CRITICAL:</strong> Attack successful! <br>Payload "${payloadName}" executed on the page.`;
        outputBox.className = 'output-box attack-success';
    } else {
        // حالة الهجوم الفاشل (الموقع محمي)
        outputBox.innerHTML = `🛡️ <strong>BLOCKED:</strong> Attack failed. <br>The fix correctly blocked "${payloadName}".`;
        outputBox.className = 'output-box attack-blocked';
    }
}