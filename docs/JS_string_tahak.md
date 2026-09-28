
---

## 1. Tvorba a deklarace

```javascript
const jednoduché = 'Ahoj svet';
const dvojité = "Ahoj svet";

// Template literals (podporují proměnné a víceřádkový text)
const jmeno = "Petr";
const pozdrav = `Ahoj ${jmeno},
vítám tě!`;

```

---

## 2. Základní vlastnosti a přístup ke znakům

```javascript
const text = "JavaScript";

text.length;         // 10 (délka řetězce)
text[0];            // "J" (přístup přes index)
text.charAt(1);     // "a" (metoda pro přístup)
text.at(-1);        // "t" (poslední znak — podporuje záporné indexy!)

```

---

## 3. Hledání a kontrola obsahu

Všechny tyto metody vracejí `true`/`false` nebo pozici (case-sensitive):

| Metoda | Popis | Příklad | Výsledek |
| --- | --- | --- | --- |
| `includes(str)` | Obsahuje podřetězec? | `"Ahoj".includes("ho")` | `true` |
| `startsWith(str)` | Začíná na...? | `"Ahoj".startsWith("A")` | `true` |
| `endsWith(str)` | Končí na...? | `"Ahoj".endsWith("j")` | `true` |
| `indexOf(str)` | Index prvního výskytu | `"Ahoj".indexOf("o")` | `3` |
| `lastIndexOf(str)` | Index posledního výskytu | `"Ahoj Ahoj".lastIndexOf("A")` | `5` |

*(Pokud `indexOf` nic nenajde, vrátí `-1`.)*

---

## 4. Ořezávání a úprava výřezů (Substrings)

> **Důležité:** Všechny řetězce v JS jsou *immutable* (neměnné). Metody tedy vracejí **nový** řetězec a původní nemění.

```javascript
const str = "JavaScript";

// slice(start, end) — end se nepočítá
str.slice(0, 4);      // "Java"
str.slice(4);         // "Script" (od indexu 4 do konce)
str.slice(-6);        // "Script" (posledních 6 znaků)

// substring(start, end) — podobné jako slice, ale neumí záporné indexy
str.substring(0, 4);  // "Java"

```

---

## 5. Změna velikosti písmen a úprava mezí

```javascript
const txt = "  Ahoj Světe  ";

txt.toLowerCase();    // "  ahoj světe  "
txt.toUpperCase();    // "  AHOJ SVĚTE  "

txt.trim();           // "Ahoj Světe" (odstraní mezer na začátku a konci)
txt.trimStart();      // "Ahoj Světe  "
txt.trimEnd();        // "  Ahoj Světe"

```

---

## 6. Nahrazování a opakování

```javascript
const str = "Ahoj světe, světe!";

// Nahradí pouze první výskyt
str.replace("světe", "Lidé");     // "Ahoj Lidé, světe!"

// Nahradí všechny výskyty
str.replaceAll("světe", "Lidé");  // "Ahoj Lidé, Lidé!"

// Opakování řetězce
"ha".repeat(3);                   // "hahaha"

```

---

## 7. Převod na pole a spárování (Split & Join)

```javascript
const csv = "jablko,hruška,banán";

// Rozdělení podle oddělovače na pole
const ovocnePole = csv.split(","); // ["jablko", "hruška", "banán"]

// Rozdělení na jednotlivé znaky
"Ahoj".split("");                 // ["A", "h", "o", "j"]

// Spojení pole zpět na řetězec
ovocnePole.join(" - ");           // "jablko - hruška - banán"

```

---

## 8. Doplnění délky (Padding)

Skvělé pro formátování čísel, dat nebo časů (např. doplnění nuly do `09:05`):

```javascript
const hodina = "5";

hodina.padStart(2, "0"); // "05" (doplní zleva na délku 2)
hodina.padEnd(4, ".");   // "5..." (doplní zprava na délku 4)

```

---