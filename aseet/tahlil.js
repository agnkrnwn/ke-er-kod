let tahlilData = [];
let currentTab = 'pendek';

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
const tabPendek = document.getElementById('tabPendek');
const tabPanjang = document.getElementById('tabPanjang');
const currentArabicFont = document.getElementById('currentArabicFont');


async function fetchTahlilData(type) {
    try {
        const response = await fetch(`/aseet/data/tahlil${type}.json`);
        tahlilData = await response.json();
        renderTahlilContent();
    } catch (error) {
        console.error(`Error fetching tahlil ${type} data:`, error);
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

function updateCurrentFontInfo() {
    const currentFont = localStorage.getItem('arabicFont') || 'UthmanicHafs';
    currentArabicFont.textContent = `Current font: ${currentFont}`;
}

function updateSettings() {
    localStorage.setItem('arabicFontSize', arabicFontSize.value);
    localStorage.setItem('arabicFont', arabicFont.value);
    localStorage.setItem('showTitle', showTitle.checked);
    localStorage.setItem('showArabic', showArabic.checked);
    localStorage.setItem('showLatin', showLatin.checked);
    localStorage.setItem('showTranslation', showTranslation.checked);
    arabicFontSizeValue.textContent = `Current size: ${arabicFontSize.value}px`;
    document.documentElement.style.setProperty('--arabic-font', `'${arabicFont.value}', Arial, sans-serif`);
    updateCurrentFontInfo();
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
    updateCurrentFontInfo();
    updateSettings();
}

function switchTab(tab) {
    if (currentTab !== tab) {
        currentTab = tab;
        const activeClass = 'bg-blue-500 text-white';
        const inactiveClass = 'bg-gray-300 text-gray-700';
        
        if (tab === 'pendek') {
            tabPendek.classList.remove(...inactiveClass.split(' '));
            tabPendek.classList.add(...activeClass.split(' '));
            tabPanjang.classList.remove(...activeClass.split(' '));
            tabPanjang.classList.add(...inactiveClass.split(' '));
        } else {
            tabPanjang.classList.remove(...inactiveClass.split(' '));
            tabPanjang.classList.add(...activeClass.split(' '));
            tabPendek.classList.remove(...activeClass.split(' '));
            tabPendek.classList.add(...inactiveClass.split(' '));
        }
    }
    
    fetchTahlilData(tab);
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

if (tabPendek) {
    tabPendek.addEventListener('click', () => switchTab('pendek'));
}

if (tabPanjang) {
    tabPanjang.addEventListener('click', () => switchTab('panjang'));
}

// Initialize
function init() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    loadSettings();
    switchTab('pendek'); // Start with Tahlil Pendek by default
}

// Tambahkan event listener untuk perubahan font
arabicFont.addEventListener('change', updateCurrentFontInfo);

// Panggil updateCurrentFontInfo saat inisialisasi
updateCurrentFontInfo();

init();