# Galactic Border Control (Galaktická imigrační kontrola) 🛸

Atraktivní, interaktivní výukový playground na téma **práce s textovými řetězci (String) a soubory cookies v JavaScriptu** inspirovaný sci-fi hrami jako *Papers, Please*. 

Aplikace simuluje terminál důstojníka hraniční kontroly na orbitální stanici *ORBIT-9*. Úkolem studenta je zprovoznit tři hlavní logické moduly, které se starají o sanitaci galaktických pasů, vyhodnocování bezpečnosti subjektů podle poznámek ze senzorů a dekódování tajných mimozemských depeší. Projekt navíc ukazuje praktickou práci se stavovými cookies (ukládání jména důstojníka a počtu odbavených subjektů), což studentům demonstruje, jak se v cookies pracuje s velkým textovým řetězcem.

---

## 🥉 Skladba obtížnosti cvičení

Projekt je didakticky rozdělen do tří zřetelných úrovní, aby umožnil hladký průběh výuky s přirozenou gradací:

### 🥉 Úroveň 1: Očista Galaktického Pasu (Základní)
* **Cíl:** Zvládnout ořezávání, změnu velikosti písmen a základní formátování řetězce.
* **Úkoly:**
  * Ořezat náhodné mezery ze vstupu pomocí `.trim()`.
  * Převést ID pasu a název planety na velká písmena pomocí `.toUpperCase()`.
  * Pokud je kód pasu příliš krátký, doplnit ho zleva nulami na celkovou délku 8 znaků přes `.padStart(8, "0")`.
  * Spojit očištěný kód s prefixem `"GAL-"` pomocí šablonových literálů (Template Literals).

### 🥈 Úroveň 2: Bezpečnostní Skener a Karanténa (Pokročilá)
* **Cíl:** Práce s metodami vyhledávání podřetězců a větvení kódu (podmínky `if`/`else`).
* **Úkoly:**
  * Ověřit, zda poznámka detektoru obsahuje rizikové výrazy `"kyselina"` nebo `"zbran"` pomocí `.includes()`.
  * Ověřit, zda kód domovské planety začíná na `"EARTH"` nebo `"ZEM"` pomocí `.startsWith()` pro udělení diplomatické výsady.
  * Zjistit, zda poznámka končí prioritním vykřičníkem `!` přes `.endsWith()`.
  * Dynamicky přepnout vizuální styl bezpečnostního boxu (statusy `NEBEZPEČÍ`, `KARANTÉNA`, `VSTUP POVOLEN`).

### 🥇 Úroveň 3: Dekodér Mimozemské Depeše a Cookies (Komplexní)
* **Cíl:** Práce s pokročilejšími metodami (nahrazování, dělení, obracení pole) a parsování cookies.
* **Úkoly:**
  * Nahradit vybraná šifrovaná slova (např. `"AHOJ"` za `"👾 GREETINGS"` a `"LIDÉ"` za `"BIOMASA"`) přes `.replaceAll()`.
  * Dešifrovat zprávy zaslané pozpátku (začínající na `"REV:"`) pomocí kombinace `.slice()`, `.split()`, `.reverse()` a `.join()`.
  * Spočítat vízový poplatek na základě délky finální zprávy přes vlastnost `.length`.
  * Přečíst textový řetězec `document.cookie` a pomocí metod `.split("; ")` a `.split("=")` zrekonstruovat jméno přihlášeného důstojníka a statistiku odbavených subjektů.

### 💎 Bonus pro mistry
* Implementovat vyhledávač slov v depeši s využitím `.indexOf()`. Pokud je slovo nalezeno, nahradit ho v depeši za zvýrazněný HTML tag `<mark>` a vrátit index nalezení.

---

## 🧩 Struktura projektu

Projekt má plochou, přehlednou strukturu ideální pro okamžité použití ve výuce:

```text
JS-string-Playground/
├── docs/                    # Podklady k lekci a metodické pokyny
│   ├── JS_string_tahak.md    # Přehledný tahák metod pro studenty
│   └── vesmirna_imigracni_kontrola.md # Detailní specifikace herního světa
├── index.html                # Hlavní rozhraní s kompletním zadáním v hlavičce
├── styles.css                # Imersivní retro sci-fi CRT styl rozhraní
├── script.js                 # Plně funkční vzorové řešení (pro lektory)
├── script-students.js        # Studentská šablona s označenými TODO a nápovědou
├── LICENSE                   # Oficiální MIT licence (Jakub Březa, 2026)
└── README.md                 # Tento didaktický průvodce
```

---

## 🚀 Jak projekt použít

1. **Příprava studentů:**
   * Seznamte studenty s metodami pro práci s řetězci v JS (využijte připravený tahák `.docs/JS_string_tahak.md`).
   * Vysvětlete jim podstatu cookies jako velkého textového řetězce, který ukládá prohlížeč.

2. **Propojení studentského kódu:**
   * Otevřete `index.html` a na řádku ~166 přepojte skript ze vzorového řešení na studentské:
     ```html
     <!-- Změňte "script.js" na "script-students.js" -->
     <script src="script-students.js"></script>
     ```

3. **Spuštění:**
   * Otevřete soubor `index.html` přímo v libovolném moderním prohlížeči (např. přes doplněk Live Server ve VS Code, nebo poklikáním na soubor).
   * **Upozornění k cookies:** Většina moderních prohlížečů z bezpečnostních důvodů blokuje zápis cookies při otevírání HTML souboru přes protokol `file://`. Pro plnou funkčnost modulu Cookies doporučujeme aplikaci spouštět na lokálním webovém serveru (Live Server, http-server, python `-m http.server` atd.).

4. **Vypracování:**
   * Studenti postupují podle komentářů `// TODO 1` až `// TODO 14` a `// TODO BONUS` v souboru `script-students.js`. U každého úkolu mají k dispozici nápovědu syntaxe a názorný zakomentovaný příklad.

---

## 🎯 Co si student osvojí

* Odstraňování bílých znaků z uživatelských vstupů (`.trim()`).
* Práci s velikostí písmen (`.toUpperCase()`, `.toLowerCase()`).
* Doplnění formátovaných kódů a časů na pevnou délku (`.padStart()`).
* Vyhledávání v textu, kontrolu začátků a konců (`.includes()`, `.startsWith()`, `.endsWith()`).
* Bezpečné a přehledné skládání textů pomocí Template Literals.
* Extrakci částí textu (`.slice()`) a převod na pole a zpět (`.split()`, `.reverse()`, `.join()`).
* Základní mechaniku ukládání stavu na webu pomocí `document.cookie` a jeho zpětnou analýzu jako textového řetězce.

---

## ⚙️ Použité technologie / Požadavky

* **HTML5** (sémantická struktura rozhraní)
* **CSS3** (responzivní CSS Grid, animace CRT blikání, sci-fi neonové filtry)
* **Vanilla JavaScript** (ES6+ standardy, žádné externí knihovny ani frameworky)
* **Kompatibilita:** Libovolný moderní webový prohlížeč (Chrome, Firefox, Edge, Safari) se spuštěným lokálním serverem pro cookies.

---

## 📜 Licence

Tento projekt je chráněn licencí **MIT**. Kompletní znění naleznete v souboru `LICENSE`.  
Copyright (c) 2026 Jakub Březa.

---

## ✉️ Autor

Vytvořeno v rámci metodických materiálů pro výuku programování.  
[**VlkSamotar.cz**](https://vlksamotar.cz) | Informatika | Trading | Elektrotechnika
