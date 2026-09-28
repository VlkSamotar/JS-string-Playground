/* ==========================================================================
   🛸 SCRIPT.JS - Referenční řešení pro lektory (Galactic Border Control)
   ========================================================================== */

// Spustit po načtení dokumentu
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

// Globální stav aplikace
let currentOfficer = "Host";
let processedCount = 0;

/**
 * Inicializace aplikace a načtení dat z cookies
 */
function initApp() {
    // Načtení dat z cookies
    readSessionCookies();
    updateOfficerUI();

    // Přihlašovací posluchače
    document.getElementById("btn-login").addEventListener("click", loginOfficer);
    document.getElementById("btn-reset").addEventListener("click", resetSession);

    // Hlavní posuzovací posluchač
    document.getElementById("btn-analyze").addEventListener("click", analyzeSubject);

    // Posluchače pro rozhodovací tlačítka
    document.getElementById("btn-approve").addEventListener("click", () => recordDecision("APPROVED"));
    document.getElementById("btn-quarantine").addEventListener("click", () => recordDecision("QUARANTINED"));

    // Bonus: Vyhledávání v depeši
    document.getElementById("btn-search").addEventListener("click", searchInMessage);
}


/* ==========================================================================
   🔑 MODUL COOKIES - Přihlašování a statistiky
   ========================================================================== */

/**
 * Načte cookies a naparsuje jméno důstojníka a počet odbavených
 */
function readSessionCookies() {
    const cookiesString = document.cookie;

    // Pokud nejsou žádné cookies, končíme
    if (!cookiesString) return;

    // Rozdělíme řetězec cookies podle středníku a mezery
    const cookiesArray = cookiesString.split("; ");

    for (let i = 0; i < cookiesArray.length; i++) {
        const cookiePair = cookiesArray[i].split("=");
        const key = cookiePair[0].trim();
        const value = cookiePair[1] ? cookiePair[1].trim() : "";

        if (key === "officer_name") {
            currentOfficer = decodeURIComponent(value);
        } else if (key === "processed_count") {
            processedCount = parseInt(value, 10) || 0;
        }
    }
}

/**
 * Uloží jméno důstojníka do cookie s expirací 1 den
 */
function loginOfficer() {
    const nameInput = document.getElementById("officer-input").value.trim();

    if (nameInput === "") {
        alert("Zadejte platné jméno důstojníka!");
        return;
    }

    currentOfficer = nameInput;

    // Uložení do cookies (Služba na 1 den, SameSite=Strict pro bezpečné uložení dle moderních standardů)
    document.cookie = `officer_name=${encodeURIComponent(currentOfficer)}; max-age=${24 * 60 * 60}; path=/; SameSite=Strict`;

    // Pokud processed_count ještě v cookie není, uložíme nulu
    if (!document.cookie.includes("processed_count=")) {
        document.cookie = `processed_count=${processedCount}; max-age=${24 * 60 * 60}; path=/; SameSite=Strict`;
    }

    updateOfficerUI();
    document.getElementById("officer-input").value = "";
}

/**
 * Aktualizuje panel důstojníka v rozhraní
 */
function updateOfficerUI() {
    const display = document.getElementById("officer-display");
    if (currentOfficer !== "Host") {
        display.innerHTML = `👮 Aktivní důstojník: <strong class="highlight">${currentOfficer}</strong> | 📈 Odbaveno subjektů: <strong class="highlight">${processedCount}</strong>`;
    } else {
        display.innerHTML = `<span class="blink">⚠️ NENÍ PŘIHLÁŠEN ŽÁDNÝ DŮSTOJNÍK! Přihlaste se pro ukládání statistik.</span>`;
    }
}

/**
 * Inkrementuje počet odbavených, uloží do cookie a aktualizuje UI
 */
function recordDecision(decisionType) {
    processedCount++;

    // Uložení do cookie
    document.cookie = `processed_count=${processedCount}; max-age=${24 * 60 * 60}; path=/; SameSite=Strict`;

    updateOfficerUI();

    alert(`Rozhodnutí zaznamenáno: SUBJEKT ${decisionType === "APPROVED" ? "SCHVÁLEN" : "UMÍSTĚN DO KARANTÉNY"}. Celkem odbaveno: ${processedCount}.`);

    // Reset tlačítek rozhodnutí
    document.getElementById("btn-approve").disabled = true;
    document.getElementById("btn-quarantine").disabled = true;
}

/**
 * Kompletní smazání statistik a cookies (Reset)
 */
function resetSession() {
    if (confirm("Opravdu chcete vymazat záznamy a přihlášení důstojníka?")) {
        // Expirace v minulosti vymaže cookies
        document.cookie = "officer_name=; max-age=0; path=/; SameSite=Strict";
        document.cookie = "processed_count=; max-age=0; path=/; SameSite=Strict";

        currentOfficer = "Host";
        processedCount = 0;

        updateOfficerUI();
        alert("Záznamy byly úspěšně vymazány.");
    }
}


/* ==========================================================================
   ⚡ HLAVNÍ POSUZOVACÍ LOGIKA (STRINGS PLAYGROUND)
   ========================================================================== */

function analyzeSubject() {
    // Načtení vstupních hodnot
    const rawPassport = document.getElementById("passport-input").value;
    const rawPlanet = document.getElementById("planet-input").value;
    const rawSecurity = document.getElementById("security-input").value;
    const rawMessage = document.getElementById("message-input").value;

    /* ----------------------------------------------------------------------
       🥉 ÚROVEŇ 1 – Očista Galaktického Pasu (Passport Sanitizer)
       ---------------------------------------------------------------------- */

    // 1. Oříznutí mezer na začátku a konci
    const trimmedPassport = rawPassport.trim();
    const trimmedPlanet = rawPlanet.trim();

    // 2. Převod na velká písmena
    const upperPassport = trimmedPassport.toUpperCase();
    const upperPlanet = trimmedPlanet.toUpperCase();

    // 3. Doplnění nul zleva na délku 8 znaků, pokud je kratší
    const paddedPassport = upperPassport.padStart(8, "0");

    // 4. Spojení s prefixem GAL- pomocí šablony (Template Literals)
    const finalPassportCode = `GAL-${paddedPassport}`;

    // Výstup Úrovně 1 do UI
    document.getElementById("output-passport").textContent = finalPassportCode;
    document.getElementById("output-planet").textContent = upperPlanet !== "" ? upperPlanet : "NEZNÁMÁ PLANETA";


    /* ----------------------------------------------------------------------
       🥈 ÚROVEŇ 2 – Bezpečnostní Skener a Karanténa (Security Check)
       ---------------------------------------------------------------------- */

    const securityBox = document.getElementById("output-security");
    let securityStatus = "VSTUP POVOLEN";
    let statusClass = "status-safe";

    // Převedení poznámky na malá písmena pro case-insensitive vyhledávání rizikových slov
    const lowerSecurity = rawSecurity.toLowerCase();

    // Kontrola nebezpečných slov přes .includes()
    if (lowerSecurity.includes("kyselina") || lowerSecurity.includes("zbran")) {
        securityStatus = "NEBEZPEČÍ — ZABLOKOVÁNO!";
        statusClass = "status-danger";
    }
    // Kontrola diplomatické výsady ze Země přes .startsWith()
    else if (upperPlanet.startsWith("EARTH") || upperPlanet.startsWith("ZEM")) {
        securityStatus = "VSTUP POVOLEN — DIPLOMATICKÁ VÝSADA";
        statusClass = "status-safe";
    }
    // Kontrola prioritního poplachu přes .endsWith() (vykřičník na konci poznámky)
    else if (rawSecurity.trim().endsWith("!")) {
        securityStatus = "KARANTÉNA — PODROBNÁ PROHLÍDKA";
        statusClass = "status-warn";
    }

    // Aktualizace UI pro Úroveň 2
    securityBox.textContent = securityStatus;
    securityBox.className = `status-box ${statusClass}`;


    /* ----------------------------------------------------------------------
       🥇 ÚROVEŇ 3 – Dekodér Mimozemské Depeše (Alien Translator)
       ---------------------------------------------------------------------- */

    let decodedMessage = rawMessage;

    // 1. Nahrazení vybraných slov (.replaceAll())
    decodedMessage = decodedMessage.replaceAll("AHOJ", "👾 GREETINGS");
    decodedMessage = decodedMessage.replaceAll("LIDÉ", "BIOMASA");

    // 2. Kontrola a dešifrování zprávy pozpátku (pokud začíná na "REV:")
    if (decodedMessage.startsWith("REV:")) {
        // Získání textu za "REV:" pomocí .slice() nebo .substring()
        const encryptedPart = decodedMessage.slice(4);

        // Otočení textu pozpátku
        const reversedText = encryptedPart.split("").reverse().join("");

        // Odstranění mezer nebo podtržítek pro vyčištění (podtržítka se často používají ve vesmírném kódu)
        decodedMessage = reversedText.replaceAll(" ", "").replaceAll("_", "");
    }

    // 3. Výpočet délky a poplatku za vízum (.length)
    const finalLength = decodedMessage.length;
    const visaFee = finalLength * 10;

    // Výstup Úrovně 3 do UI
    const messageOutput = document.getElementById("output-message");
    messageOutput.textContent = decodedMessage !== "" ? decodedMessage : "[ŽÁDNÁ ZPRÁVA K DEKÓDOVÁNÍ]";
    document.getElementById("output-visa-fee").textContent = visaFee;


    /* ----------------------------------------------------------------------
       🔓 AKTIVACE ROZHODNUTÍ
       ---------------------------------------------------------------------- */

    // Povolíme rozhodnutí pouze pokud je validně provedena analýza a je někdo přihlášen
    if (currentOfficer !== "Host") {
        document.getElementById("btn-approve").disabled = false;
        document.getElementById("btn-quarantine").disabled = false;
    } else {
        // Upozornění, že data jsou analyzována, ale rozhodnutí se neuloží bez přihlášení
        console.log("Analýza hotova. Pro uložení do statistik se přihlaste.");
    }
}


/* ==========================================================================
   💎 BONUSOVÉ FUNKCE
   ========================================================================== */

/**
 * Vyhledá zadané slovo v dekódované depeši a vizuálně ho zvýrazní pomocí tagu <mark>
 */
function searchInMessage() {
    const searchWord = document.getElementById("search-input").value.trim();
    const messageBox = document.getElementById("output-message");
    const originalText = messageBox.textContent;

    if (originalText === "-" || originalText === "[ŽÁDNÁ ZPRÁVA K DEKÓDOVÁNÍ]") {
        alert("Nejprve proveďte analýzu subjektu s depeší!");
        return;
    }

    if (searchWord === "") {
        alert("Zadejte slovo pro vyhledání!");
        return;
    }

    // Vyhledání indexu prvního výskytu pomocí .indexOf()
    const foundIndex = originalText.toLowerCase().indexOf(searchWord.toLowerCase());

    if (foundIndex !== -1) {
        // Slovo bylo nalezeno
        // Pro přesné zvýraznění zachovávající původní velikost písmen použijeme nahrazení
        // Vytvoříme regulární výraz s příznakem 'gi' pro globální case-insensitive vyhledání
        const regex = new RegExp(`(${escapeRegExp(searchWord)})`, "gi");
        const highlightedText = originalText.replace(regex, "<mark>$1</mark>");

        messageBox.innerHTML = highlightedText;
        alert(`Slovo "${searchWord}" bylo nalezeno na indexu ${foundIndex}!`);
    } else {
        // Slovo nebylo nalezeno
        messageBox.textContent = originalText; // Odstraní případné předchozí zvýraznění
        alert(`Slovo "${searchWord}" nebylo v depeši nalezeno.`);
    }
}

/**
 * Pomocná funkce pro bezpečné escape znaků v RegExp
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
