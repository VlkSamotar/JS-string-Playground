Tady je podrobný popis aplikace **Galactic Border Control (Galaktická imigrační kontrola)**. Téma čerpá z populárních sci-fi her typu *Papers, Please* nebo *Starfield*, což je pro 13letá decka hodně atraktivní.

---

## 🎯 K čemu aplikace slouží

Aplikace simuluje terminál důstojníka vesmírné imigrační kontroly na orbitalní stanici. Úkolem studenta je naprogramovat logiku v JavaScriptu, která:

1. Vyčistí a naformátuje poškozená data z galaktického pasu mimozemšťana.
2. Zkontroluje bezpečnostní pravidla a povolení k vstupu.
3. Přeloží depeši z mimozemského jazyka do lidské řeči.

Děti si na ní formou „kontroly dokladů“ vyzkouší reálnou práci s datovým typem String — ořezávání, změny velikosti písmen, vyhledávání podřetězců a parsování unikátních kódů.

---

## 🛠️ Jak aplikace funguje (3 hlavní moduly)

### Modul 1: Formátování Galaktického Pasu (Passport Sanitizer)

Mimozemšťané často zadávají své pasy s chybami, mezerami nebo v malých písmenách (např. `"  xorg-alpha-9  "`).

* **Vstup:** Textové pole s neupraveným ID pasu a druhým polem pro domovskou planetu.
* **Výstup:** Oficiální kód pasu ve formátu `GAL-XORG-ALPHA-9` a vytvořená zkrácená šifra.
* **Logika pod kapotou:**
1. `.trim()` – Odstraní náhodné mezery na začátku a na konci.
2. `.toUpperCase()` – Převod celého pasu na velká písmena pro oficiální registr.
3. `.padStart(12, "0")` – Pokud je číslo pasu příliš krátké, doplní zleva nuly.
4. `template literals` – Spojení prefixu `GAL-` s očštěným textem.



### Modul 2: Bezpečnostní Skener a Karanténa (Security Check)

Terminál prověří, zda návštěvník nepředstavuje riziko pro stanici.

* **Vstup:** Textové pole s poznámkou z detektoru (např. `"Pevné tělo, vysoký obsah kyseliny, pozor na slizy"`).
* **Výstup:** Bezpečnostní status: `NEBEZPEČÍ / VSTUP POVOLEN / KARANTÉNA`.
* **Logika pod kapotou:**
1. `.includes("kyselina")` – Pokud text obsahuje slovo "kyselina", systém automaticky zamkne doplňkový modul a vypíše varování.
2. `.startsWith("EARTH")` – Ověření, zda kód domovské planety začíná na "EARTH" (Zemšťané mají přednostní vstup).
3. `.endsWith("!")` – Pokud zpráva z detektoru končí vykřičníkem, vyhodnotí se jako prioritní poplach.



### Modul 3: Dekodér Mimozemské Depeše (Alien Translator)

Mimozemšťané mluví šifrovaně: buď píší slova pozpátku, nebo používají divná náhradní slova.

* **Vstup:** Zachycená zpráva v mimozemském jazyce.
* **Výstup:** Čitelný překlad pro pozemského důstojníka.
* **Logika pod kapotou:**
1. `.replaceAll("AHOJ", "👾 GREETINGS")` – Nahrazení vybraných slov univerzálním galaktickým pozdravem.
2. `.split("").reverse().join("")` – Otočení textu pozpátku pro dekódování tajemných zpráv.
3. `.length` – Spočítání znaků pro výpočet poplatku za vízum (co znak, to 10 galaktických kreditů).



---

## 📋 Přehled procvičovaných metod v JS

| Operace v aplikaci | JS metoda / vlastnost | Praktický příklad v kódu |
| --- | --- | --- |
| Oříznutí mezer v pasu | `.trim()` | `inputPas.trim()` |
| Velká písmena dokladu | `.toUpperCase()` | `pas.toUpperCase()` |
| Hledání zakázaných látek | `.includes()` | `poznámka.includes("nebezpečí")` |
| Kontrola kódu planety | `.startsWith()` | `planeta.startsWith("MARS")` |
| Získání Sektoru (první 3 zn.) | `.slice()` / `.substring()` | `pas.slice(0, 3)` |
| Úprava protokolu | `.replaceAll()` | `zpravy.replaceAll("LIDÉ", "BIOMASA")` |
| Výpočet poplatku za vízum | `.length` | `zprava.length * 10` |

---

## 💡 Proč je tento koncept pro výuku ideální?

1. **Jasný příběh:** Děti nemají pocit, že dělají matematický cvičení, ale hrají si na operátora na sci-fi základně.
2. **Možnost vizuálního blbnutí:** V CSS se dá snadno nastavit tmavé pozadí, zelené nebo neonově modré písmo (retro sci-fi monitor) a pár emoji (👽, 🛸, 🚀, ☣️).
3. **Přirozená gradace:**
* *Jednoduché:* Oříznout text a dát velká písmena.
* *Střední:* Prohledat text přes `includes` a změnit výstupní barvu textu.
* *Těžší:* Rozsekat kód pasu na sektory pomocí `slice` a spočítat celkové vízum.