/* ==========================================================================
   🛸 SCRIPT-STUDENTS.JS - Studentská šablona (Galactic Border Control)
   ==========================================================================
   Tento soubor je připraven pro studenty. Vaším úkolem je doplnit logiku
   pro práci s řetězci a cookies podle pokynů a komentářů níže.
   
   ⚠️ PROPOJENÍ: Nezapomeňte v souboru index.html změnit připojení skriptu:
   <script src="script-students.js"></script>
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
    // Načtení dat z cookies (ÚROVEŇ 3)
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
   🔑 MODUL COOKIES - Přihlašování a statistiky (ÚROVEŇ 3)
   ========================================================================== */

/**
 * Načte cookies a naparsuje jméno důstojníka a počet odbavených
 */
function readSessionCookies() {
    // TODO 8: Načtěte kompletní řetězec cookies z dokumentu.
    // Nápověda syntaxe: const vsechnyCookies = document.cookie;
    const cookiesString = ""; // <--- DOPLŇTE ZDE

    // Pokud jsou cookies prázdné, ukončíme funkci
    if (!cookiesString) return;

    // TODO 9: Rozdělte řetězec cookies na pole jednotlivých cookie párů.
    // Cookies jsou v JS odděleny středníkem a mezerou "; ".
    // Nápověda syntaxe: const pole = retezec.split("; ");
    // Příklad: const cookiesArray = cookiesString.split("; ");
    const cookiesArray = []; // <--- DOPLŇTE ZDE

    // Procházení jednotlivých cookie párů
    for (let i = 0; i < cookiesArray.length; i++) {
        // TODO 10: Rozdělte konkrétní dvojici [klíč=hodnota] podle rovnítka "=".
        // Nápověda syntaxe: const dily = dvojice.split("=");
        const cookiePair = []; // <--- DOPLŇTE ZDE

        const key = cookiePair[0] ? cookiePair[0].trim() : "";
        const value = cookiePair[1] ? cookiePair[1].trim() : "";

        // TODO 11: Pokud je klíčem "officer_name", uložte dekódovanou hodnotu do globální proměnné currentOfficer.
        // Pokud je klíčem "processed_count", uložte ji (převedenou na číslo) do processedCount.
        // Nápověda syntaxe: globální proměnná = decodeURIComponent(hodnota); nebo parseInt(hodnota, 10);
        // Příklad:
        // if (key === "officer_name") { currentOfficer = decodeURIComponent(value); }

        // <--- DOPLŇTE ZDE podrobné if/else porovnání
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

    // TODO 12: Uložte jméno důstojníka do cookies ("officer_name") s platností na 1 den (max-age=86400).
    // Nezapomeňte hodnotu zakódovat pomocí encodeURIComponent() a nastavit SameSite=Strict pro moderní prohlížeče.
    // Nápověda syntaxe: document.cookie = "key=" + encodeURIComponent(value) + "; max-age=sekundy; path=/; SameSite=Strict";
    // Příklad: document.cookie = `officer_name=${encodeURIComponent(currentOfficer)}; max-age=${24*60*60}; path=/; SameSite=Strict`;

    // <--- DOPLŇTE ZDE zápis do document.cookie pro "officer_name"

    // TODO 13: Pokud v cookies ještě není zaznamenán "processed_count", uložte ho jako novou cookie s počáteční hodnotou processedCount (0).
    // Nápověda syntaxe: if (!document.cookie.includes("processed_count=")) { ... uložte processed_count ... }

    // <--- DOPLŇTE ZDE inicializační zápis "processed_count"

    updateOfficerUI();
    document.getElementById("officer-input").value = "";
}

/**
 * Inkrementuje počet odbavených, uloží do cookie a aktualizuje UI
 */
function recordDecision(decisionType) {
    processedCount++;

    // TODO 14: Uložte novou inkrementovanou hodnotu processedCount do cookie "processed_count".
    // Nápověda syntaxe: document.cookie = `processed_count=${processedCount}; max-age=86400; path=/; SameSite=Strict`;

    // <--- DOPLŇTE ZDE zápis aktualizované processed_count do cookie

    updateOfficerUI();

    alert(`Rozhodnutí zaznamenáno: SUBJEKT ${decisionType === "APPROVED" ? "SCHVÁLEN" : "UMÍSTĚN DO KARANTÉNY"}. Celkem odbaveno: ${processedCount}.`);

    // Reset tlačítek rozhodnutí
    document.getElementById("btn-approve").disabled = true;
    document.getElementById("btn-quarantine").disabled = true;
}

/**
 * Aktualizuje panel důstojníka v rozhraní (ponecháno kompletní)
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
 * Kompletní smazání statistik a cookies (Reset - ponecháno kompletní)
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
    // Načtení vstupních hodnot z HTML
    const rawPassport = document.getElementById("passport-input").value;
    const rawPlanet = document.getElementById("planet-input").value;
    const rawSecurity = document.getElementById("security-input").value;
    const rawMessage = document.getElementById("message-input").value;

    /* ----------------------------------------------------------------------
       🥉 ÚROVEŇ 1 – Očista Galaktického Pasu (Passport Sanitizer)
       ---------------------------------------------------------------------- */

    // TODO 1: Odstraňte náhodné mezery na začátku a na konci u rawPassport a rawPlanet.
    // Nápověda syntaxe: const ocistene = retezec.trim();
    // Příklad: const trimmedVal = rawValue.trim();
    const trimmedPassport = ""; // <--- DOPLŇTE ZDE
    const trimmedPlanet = "";   // <--- DOPLŇTE ZDE

    // TODO 2: Převeďte oba očištěné řetězce (trimmedPassport a trimmedPlanet) na VELKÁ PÍSMENA.
    // Nápověda syntaxe: const velka = retezec.toUpperCase();
    const upperPassport = ""; // <--- DOPLŇTE ZDE
    const upperPlanet = "";   // <--- DOPLŇTE ZDE

    // TODO 3: Pokud je kód pasu (upperPassport) kratší než 8 znaků, doplňte ho zleva nulami "0" na celkovou délku 8.
    // Nápověda syntaxe: const doplne = retezec.padStart(cilovaDelka, znakDoplneni);
    // Příklad: const padded = val.padStart(8, "0");
    const paddedPassport = ""; // <--- DOPLŇTE ZDE

    // TODO 4: Spojte očištěný a doplněný kód pasu s prefixem "GAL-" pomocí Template Literals.
    // Nápověda syntaxe: const spojene = `GAL-${paddedPassport}`;
    const finalPassportCode = ""; // <--- DOPLŇTE ZDE

    // Vložení očištěných hodnot Úrovně 1 zpět do HTML rozhraní
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

    // TODO 5: Implementujte bezpečnostní pravidla pomocí podmínek:
    // Pravidlo A: Pokud lowerSecurity obsahuje slovo "kyselina" nebo "zbran" (.includes()):
    //   -> securityStatus = "NEBEZPEČÍ — ZABLOKOVÁNO!";
    //   -> statusClass = "status-danger";
    //
    // Pravidlo B: Pokud planetární kód (upperPlanet) začíná na "EARTH" nebo "ZEM" (.startsWith()):
    //   -> securityStatus = "VSTUP POVOLEN — DIPLOMATICKÁ VÝSADA";
    //   -> statusClass = "status-safe";
    //
    // Pravidlo C: Pokud poznámka skeneru (rawSecurity oříznutá o mezery) končí vykřičníkem "!" (.endsWith()):
    //   -> securityStatus = "KARANTÉNA — PODROBNÁ PROHLÍDKA";
    //   -> statusClass = "status-warn";
    //
    // Nápověda syntaxe:
    // if (retezec.includes("hledane")) { ... }
    // else if (retezec.startsWith("ZACATEK")) { ... }
    // else if (retezec.endsWith("!")) { ... }

    // <--- DOPLŇTE ZDE kompletní if / else if / else strukturu pro vyhodnocení pravidel

    // Aktualizace UI pro Úroveň 2 (ponecháno pro správnou vizuální funkčnost)
    securityBox.textContent = securityStatus;
    securityBox.className = `status-box ${statusClass}`;


    /* ----------------------------------------------------------------------
       🥇 ÚROVEŇ 3 – Dekodér Mimozemské Depeše (Alien Translator)
       ---------------------------------------------------------------------- */

    let decodedMessage = rawMessage;

    // TODO 6: Nahraďte ve zprávě decodedMessage všechna slova "AHOJ" za "👾 GREETINGS" a "LIDÉ" za "BIOMASA".
    // Metoda .replace() nahrazuje jen první výskyt, vy musíte použít metodu pro nahrazení všech výskytů!
    // Nápověda syntaxe: retezec = retezec.replaceAll("stare", "nove");

    // <--- DOPLŇTE ZDE nahrazení slov "AHOJ" a "LIDÉ"

    // TODO 7: Vyřešte dekódování pozpátku, pokud zpráva začíná na "REV:".
    // 1. Zkontrolujte, zda zpráva začíná na "REV:" (.startsWith()).
    // 2. Pokud ano, odřízněte tento prefix (od indexu 4 dále) pomocí .slice() nebo .substring().
    // 3. Rozdělte zbylou zprávu na pole jednotlivých písmen (.split("")).
    // 4. Otočte pořadí prvků v poli (.reverse()).
    // 5. Spojte prvky pole zpět do jednoho řetězce (.join("")).
    // 6. Odstraňte všechny podtržítka "_" a mezery " " pomocí .replaceAll() pro získání čistého textu.
    // Nápověda syntaxe:
    // if (decodedMessage.startsWith("REV:")) {
    //     let encryptedPart = decodedMessage.slice(4);
    //     let reversedText = encryptedPart.split("").reverse().join("");
    //     decodedMessage = reversedText.replaceAll("_", "").replaceAll(" ", "");
    // }

    // <--- DOPLŇTE ZDE logiku pro reversní dešifrování

    // Spočítání délky zprávy pro stanovení poplatku za vízum (co znak, to 10 kreditů)
    const finalLength = decodedMessage.length;
    const visaFee = finalLength * 10;

    // Výstup Úrovně 3 do UI (ponecháno pro správnou funkčnost)
    const messageOutput = document.getElementById("output-message");
    messageOutput.textContent = decodedMessage !== "" ? decodedMessage : "[ŽÁDNÁ ZPRÁVA K DEKÓDOVÁNÍ]";
    document.getElementById("output-visa-fee").textContent = visaFee;


    /* ----------------------------------------------------------------------
       🔓 AKTIVACE ROZHODNUTÍ (ponecháno funkční pro ulehčení UI integrace)
       ---------------------------------------------------------------------- */

    // Povolíme rozhodnutí pouze pokud je provedena analýza a je někdo přihlášen
    if (currentOfficer !== "Host") {
        document.getElementById("btn-approve").disabled = false;
        document.getElementById("btn-quarantine").disabled = false;
    }
}


/* ==========================================================================
   💎 BONUSOVÉ FUNKCE (Ukažte, co umíte!)
   ========================================================================== */

/**
 * Vyhledá zadané slovo v dekódované depeši a vizuálně ho zvýrazní pomocí tagu <mark>
 */
function searchInMessage() {
    const searchInput = document.getElementById("search-input");
    const searchWord = searchInput.value.trim();
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

    // TODO BONUS 1: Vyhledejte index prvního výskytu zadaného slova v originalText (case-insensitive).
    // Nápověda syntaxe: const index = retezec.toLowerCase().indexOf(hledanySlovo.toLowerCase());
    const foundIndex = -1; // <--- DOPLŇTE ZDE

    if (foundIndex !== -1) {
        // TODO BONUS 2: Pokud bylo slovo nalezeno, nahraďte ho ve zprávě za "<mark>slovo</mark>"
        // a uložte do messageBox.innerHTML, aby prohlížeč interpretoval HTML tag <mark> pro zvýraznění.
        // Tip: Pro zachování původních velkých/malých písmen můžete použít regulární výraz nebo pokročilé řetězení.
        // Nápověda: const regex = new RegExp(`(${searchWord})`, "gi");
        // const highlighted = originalText.replace(regex, "<mark>$1</mark>");
        // messageBox.innerHTML = highlighted;

        // <--- DOPLŇTE ZDE vizuální zvýraznění a vypsání indexu do alertu
        alert(`Slovo "${searchWord}" bylo nalezeno na indexu ${foundIndex}!`);
    } else {
        messageBox.textContent = originalText; // Odstranění předchozího zvýraznění
        alert(`Slovo "${searchWord}" nebylo v depeši nalezeno.`);
    }
}
