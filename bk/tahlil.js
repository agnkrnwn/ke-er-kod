let tahlilData = [];

// DOM elements
const tahlilContent = document.getElementById('tahlilContent');
const darkModeToggle = document.getElementById('darkModeToggle');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const arabicFontSize = document.getElementById('arabicFontSize');
const arabicFontSizeValue = document.getElementById('arabicFontSizeValue');
const showTitle = document.getElementById('showTitle');
const showArabic = document.getElementById('showArabic');
const showLatin = document.getElementById('showLatin');
const showTranslation = document.getElementById('showTranslation');
const arabicFont = document.getElementById('arabicFont');
const resetSettings = document.getElementById('resetSettings');

async function fetchTahlilData() {
    try {
        const response = await fetch('tahlil.json');
        tahlilData = await response.json();
        renderTahlilContent();
    } catch (error) {
        console.error('Error fetching tahlil data:', error);
    }
}

function createTahlilSection(section) {
    return `
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            ${localStorage.getItem('showTitle') === 'true' ? `<h2 class="text-xl font-semibold mb-4">${section.title}</h2>` : ''}
            <div class="space-y-4">
                ${localStorage.getItem('showArabic') === 'true' ? `
                <div>
                    <h3 class="font-medium text-gray-700 dark:text-gray-300">Arabic:</h3>
                    <p class="text-right arabic" style="font-family: var(--arabic-font); font-size: ${localStorage.getItem('arabicFontSize')}px">${section.arabic}</p>
                </div>
                ` : ''}
                ${localStorage.getItem('showLatin') === 'true' ? `
                <div>
                    <h3 class="font-medium text-gray-700 dark:text-gray-300">Latin:</h3>
                    <p class="italic text-gray-600 dark:text-gray-400">${section.latin}</p>
                </div>
                ` : ''}
                ${localStorage.getItem('showTranslation') === 'true' ? `
                <div>
                    <h3 class="font-medium text-gray-700 dark:text-gray-300">Translation:</h3>
                    <p class="text-gray-600 dark:text-gray-400">${section.translation}</p>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderTahlilContent() {
    tahlilContent.innerHTML = '';
    tahlilData.forEach(section => {
        tahlilContent.innerHTML += createTahlilSection(section);
    });
}

function updateSettings() {
    localStorage.setItem('arabicFontSize', arabicFontSize.value);
    localStorage.setItem('arabicFont', arabicFont.value);
    localStorage.setItem('showTitle', showTitle.checked);
    localStorage.setItem('showArabic', showArabic.checked);
    localStorage.setItem('showLatin', showLatin.checked);
    localStorage.setItem('showTranslation', showTranslation.checked);
    arabicFontSizeValue.textContent = `${arabicFontSize.value}px`;
    document.documentElement.style.setProperty('--arabic-font', `'${arabicFont.value}', Arial, sans-serif`);
    renderTahlilContent();
}

function resetToDefault() {
    arabicFontSize.value = 24;
    arabicFont.value = 'UthmanicHafs';
    showTitle.checked = true;
    showArabic.checked = true;
    showLatin.checked = true;
    showTranslation.checked = true;
    updateSettings();
}

function loadSettings() {
    arabicFontSize.value = localStorage.getItem('arabicFontSize') || 24;
    arabicFont.value = localStorage.getItem('arabicFont') || 'UthmanicHafs';
    showTitle.checked = localStorage.getItem('showTitle') !== 'false';
    showArabic.checked = localStorage.getItem('showArabic') !== 'false';
    showLatin.checked = localStorage.getItem('showLatin') !== 'false';
    showTranslation.checked = localStorage.getItem('showTranslation') !== 'false';
    document.documentElement.style.setProperty('--arabic-font', `'${arabicFont.value}', Arial, sans-serif`);
    updateSettings();
}

// Event Listeners
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    });
}

if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');
    });
}

if (closeSettings && settingsModal) {
    closeSettings.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
        settingsModal.classList.remove('flex');
    });
}

const settingsElements = [arabicFontSize, arabicFont, showTitle, showArabic, showLatin, showTranslation];
settingsElements.forEach(element => {
    if (element) {
        element.addEventListener('change', updateSettings);
    }
});

if (resetSettings) {
    resetSettings.addEventListener('click', resetToDefault);
}

// Initialize
function init() {
    // Check and set initial dark mode state
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    loadSettings();
    fetchTahlilData();
}

init();