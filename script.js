
"use strict";

// ========================================
// GEMENSAMMA FUNKTIONER
// ========================================

const $ = id => document.getElementById(id);

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function make(tag, text = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function parseHTML(code) {
  return new DOMParser().parseFromString(
    code, "text/html"
  );
}

function hasElement(code, selector) {
  return !!parseHTML(code).querySelector(selector);
}

function hasAttributes(code, selector, attrs) {
  const elements = [
    ...parseHTML(code).querySelectorAll(selector)
  ];

  return elements.some(element =>
    Object.entries(attrs).every(([name, value]) =>
      element.getAttribute(name) === value
    )
  );
}

function feedback(element, message, correct) {
  element.textContent = message;
  element.className =
    "feedback " + (correct ? "success" : "error");
}

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.hidden = section.id !== page;
  });

  document.querySelectorAll("[data-page]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });

  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

// ========================================
// AVSNITT 1 – KUNSKAPSFRÅGOR
// ========================================

// Format:
// [fråga, rätt svar, fel svar 1, fel svar 2, förklaring]

const quizStations = [
  {
    title: "HTML-grundstruktur",
    questions: [
      ["Var finns sidans synliga innehåll?",
        "body", "head", "title",
        "body innehåller sidans synliga innehåll."],
      ["Vilken deklaration används för HTML5?",
        "<!DOCTYPE html>", "<html5>", "<doctype>",
        "DOCTYPE anger dokumenttypen."],
      ["Var placeras title?",
        "head", "body", "footer",
        "title placeras i head."],
      ["Vad betyder lang='sv'?",
        "Svenska", "Svensk tid", "Svensk server",
        "lang anger språket."],
      ["Vad används UTF-8 till?",
        "Teckenkodning", "Bildstorlek", "Videospelning",
        "UTF-8 är en teckenkodning."]
    ]
  },
  {
    title: "Element och text",
    questions: [
      ["Vilket element skapar en paragraf?",
        "p", "h1", "span",
        "p används för paragrafer."],
      ["Vilken rubrik är högst i hierarkin?",
        "h1", "h6", "h3",
        "h1 är högsta rubriknivån."],
      ["Vilket element gör en radbrytning?",
        "br", "hr", "p",
        "br gör en radbrytning."],
      ["Vilket element är inline som standard?",
        "span", "div", "section",
        "span är ett inline-element."],
      ["Vad gör pre?",
        "Bevarar formatering", "Skapar bild", "Skapar länk",
        "pre bevarar bland annat mellanslag och radbrytningar."]
    ]
  },
  {
    title: "Semantisk HTML",
    questions: [
      ["Vilket element används för navigering?",
        "nav", "footer", "aside",
        "nav används för navigering."],
      ["Var ska sidans huvudinnehåll placeras?",
        "main", "header", "footer",
        "main innehåller huvudinnehållet."],
      ["Vilket element passar en fristående artikel?",
        "article", "span", "br",
        "article används för självständigt innehåll."],
      ["Vilket element används för sidoinnehåll?",
        "aside", "title", "meta",
        "aside innehåller relaterat sidoinnehåll."],
      ["Vilket element passar sidfoten?",
        "footer", "head", "section",
        "footer används för sidfot."]
    ]
  },
  {
    title: "Listor",
    questions: [
      ["Vilket element skapar en punktlista?",
        "ul", "ol", "dl",
        "ul skapar en oordnad lista."],
      ["Vilket element skapar en numrerad lista?",
        "ol", "ul", "li",
        "ol skapar en ordnad lista."],
      ["Vilket element används för en listpunkt?",
        "li", "dt", "dd",
        "li är ett listobjekt."],
      ["Vad betyder dt?",
        "Beskrivningsterm", "Listpunkt", "Tabellrad",
        "dt anger en term i en beskrivningslista."],
      ["Vad används dd till?",
        "Beskrivning", "Rubrik", "Länk",
        "dd anger en beskrivning."]
    ]
  },
  {
    title: "Länkar och attribut",
    questions: [
      ["Vilket attribut används i en länk?",
        "href", "src", "alt",
        "a använder href."],
      ["Vad betyder ../ i en sökväg?",
        "En mapp upp", "En mapp ner", "Extern sida",
        "../ går upp en mapp."],
      ["Hur länkar du till id='kontakt'?",
        'href="#kontakt"', 'href="kontakt"',
        'src="#kontakt"',
        "Ankarlänkar använder #."],
      ["Vilket attribut identifierar ett element?",
        "id", "src", "href",
        "id ger ett element en identifierare."],
      ["Vad är en relativ sökväg?",
        "En sökväg från aktuell plats",
        "Alltid en extern URL",
        "Alltid en fullständig webbadress",
        "Relativa sökvägar utgår från dokumentets plats."]
    ]
  },
  {
    title: "Bildformat",
    questions: [
      ["Vilket bildformat är vektorbaserat?",
        "SVG", "JPEG", "MP3",
        "SVG är ett vektorformat."],
      ["Vilket format stöder transparens?",
        "PNG", "JPEG", "MP3",
        "PNG stöder transparens."],
      ["Vilket är ett modernt bildformat?",
        "WebP", "TXT", "MP3",
        "WebP är ett bildformat."],
      ["Vilket element visar en bild?",
        "img", "image", "picturefile",
        "img används för bilder."],
      ["Vad används alt till?",
        "Textalternativ", "Bildstorlek", "Bildformat",
        "alt anger textalternativ för en bild."]
    ]
  },
  {
    title: "Responsiva bilder",
    questions: [
      ["Vad betyder DPR?",
        "Device Pixel Ratio", "Digital Page Resolution",
        "Data Picture Ratio",
        "DPR beskriver pixeltäthet."],
      ["Vad betyder 2x i srcset?",
        "Dubbel pixeltäthet", "Dubbel bredd i CSS",
        "Två bilder samtidigt",
        "2x är en densitetsbeskrivare."],
      ["Vad betyder 800w?",
        "Bildfilens bredd är 800 pixlar",
        "Bilden visas alltid 800 px bred",
        "800 procent",
        "w anger bildkandidatens bredd."],
      ["Vad betyder 100vw?",
        "Hela viewportens bredd", "100 pixlar",
        "Hela höjden",
        "vw är relaterat till viewportens bredd."],
      ["Vad gör sizes?",
        "Beskriver bildens visningsbredd",
        "Ändrar filformat",
        "Skapar alt-text",
        "sizes används tillsammans med w-descriptors."]
    ]
  },
  {
    title: "Formulär",
    questions: [
      ["Vilket element skapar ett formulär?",
        "form", "section", "article",
        "form används för formulär."],
      ["Vilken inputtyp döljer lösenord?",
        "password", "text", "email",
        "password maskerar tecknen."],
      ["Hur kopplas label till input?",
        "for och id", "src och alt", "href och name",
        "for ska matcha input-elementets id."],
      ["Vad används name till?",
        "Namn på formulärdata", "Fältets färg",
        "Fältets storlek",
        "name används som nyckel när data skickas."],
      ["Vilken inputtyp tillåter flera val?",
        "checkbox", "radio", "password",
        "Checkboxar kan väljas oberoende av varandra."]
    ]
  },
  {
    title: "GDPR",
    questions: [
      ["Vad innebär dataminimering?",
        "Samla bara nödvändiga uppgifter",
        "Samla in allt", "Lagra för alltid",
        "Samla bara in uppgifter som behövs."],
      ["Vilket är en personuppgift?",
        "En persons e-postadress",
        "En generell färgkod", "En HTML-tagg",
        "En e-postadress kan identifiera en person."],
      ["Hur ska samtycke kunna återkallas?",
        "Lika enkelt som det gavs",
        "Aldrig", "Bara genom brev",
        "Återkallande ska vara lika enkelt."],
      ["Vad är personuppgiftsbehandling?",
        "Att lagra namn", "Att skriva h1",
        "Att ändra bakgrundsfärg",
        "Lagring är behandling av personuppgifter."],
      ["Vad står GDPR för?",
        "General Data Protection Regulation",
        "Global Digital Privacy Rules",
        "General Document Program",
        "GDPR är EU:s dataskyddsförordning."]
    ]
  },
  {
    title: "Iframe och säkerhet",
    questions: [
      ["Vad gör iframe?",
        "Bäddar in ett dokument", "Skapar en lista",
        "Komprimerar bilder",
        "iframe används för inbäddat innehåll."],
      ["Varför ska iframe ha title?",
        "Tillgänglighet", "Snabbare internet",
        "Mindre filstorlek",
        "title beskriver det inbäddade innehållet."],
      ["Vad gör sandbox?",
        "Begränsar behörigheter",
        "Förstorar videon", "Tar bort HTML",
        "sandbox begränsar inbäddat innehåll."],
      ["Vad är phishing?",
        "Försök att lura till sig uppgifter",
        "Bildkomprimering", "HTML-validering",
        "Phishing är ett slags bedrägeri."],
      ["Vad är clickjacking?",
        "Vilseledande klickytor",
        "Ett bildformat", "En HTML-kommentar",
        "Clickjacking lurar användaren att klicka."]
    ]
  },
  {
    title: "Video och ljud",
    questions: [
      ["Vilket element spelar upp video?",
        "video", "movie", "media",
        "video används för videoinnehåll."],
      ["Vilket element spelar upp ljud?",
        "audio", "sound", "music",
        "audio används för ljud."],
      ["Vad gör controls?",
        "Visar uppspelningskontroller",
        "Tar bort ljudet", "Döljer filen",
        "controls visar spelarens kontroller."],
      ["Vilket element anger alternativa mediefiler?",
        "source", "link", "label",
        "source kan ange olika mediefiler."],
      ["Vilket är ett vanligt videoformat?",
        "MP4", "PNG", "SVG",
        "MP4 används ofta för video."]
    ]
  },
  {
    title: "Tillgänglighet",
    questions: [
      ["Varför används lang?",
        "Anger sidans språk", "Ändrar sidans färg",
        "Ändrar sidans bredd",
        "lang hjälper bland annat hjälpmedel."],
      ["Varför ska länkar ha tydlig text?",
        "För att beskriva vart de leder",
        "För att bli längre", "För att dölja adressen",
        "Beskrivande länktext förbättrar tillgängligheten."],
      ["Varför behövs rubrikhierarki?",
        "För att strukturera innehållet",
        "För att minska bildstorlek",
        "För att skapa formulär",
        "Rubriker gör innehållet lättare att navigera."],
      ["Vad används label till?",
        "Beskriva ett formulärfält",
        "Spela upp ljud", "Visa bild",
        "label ger formulärfält en etikett."],
      ["Var kan HTML valideras?",
        "validator.w3.org", "youtube.com",
        "maps.google.com",
        "W3C har en HTML-validator."]
    ]
  }
];

let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizSelected = null;
let quizAnswered = false;

quizStations.forEach((station, index) => {
  $("quizStation").add(
    new Option(`${index + 1}. ${station.title}`, index)
  );
});

$("quizStation").add(
  new Option("Blandat sluttest – 15 frågor", "all")
);

$("startQuiz").onclick = () => {
  const value = $("quizStation").value;

  if (value === "all") {
    const first = quizStations.map(
      station => shuffle(station.questions)[0]
    );

    const remaining = quizStations.flatMap(
      station => station.questions.filter(
        question => !first.includes(question)
      )
    );

    quizQuestions = shuffle([
      ...first,
      ...shuffle(remaining).slice(0, 3)
    ]);
  } else {
    quizQuestions = shuffle(
      quizStations[Number(value)].questions
    );
  }

  quizIndex = 0;
  quizScore = 0;

  $("quizBox").hidden = false;
  renderQuiz();
};

function renderQuiz() {
  quizSelected = null;
  quizAnswered = false;

  const question = quizQuestions[quizIndex];

  $("quizProgress").textContent =
    `Fråga ${quizIndex + 1} av ${quizQuestions.length}` +
    ` · Poäng: ${quizScore}`;

  $("quizBar").style.width =
    `${(quizIndex / quizQuestions.length) * 100}%`;

  $("quizQuestion").textContent = question[0];

  $("quizOptions").replaceChildren();

  shuffle([question[1], question[2], question[3]])
    .forEach(answer => {
      const button = make("button", answer);

      button.className = "option-button";

      button.onclick = () => {
        if (quizAnswered) return;

        quizSelected = answer;

        document.querySelectorAll(".option-button")
          .forEach(b => b.classList.remove("selected"));

        button.classList.add("selected");
      };

      $("quizOptions").append(button);
    });

  $("quizFeedback").textContent = "";
  $("checkQuiz").hidden = false;
  $("nextQuiz").hidden = true;
}

$("checkQuiz").onclick = () => {
  if (quizAnswered) return;

  if (quizSelected === null) {
    feedback(
      $("quizFeedback"),
      "Välj ett svar först.",
      false
    );
    return;
  }

  const question = quizQuestions[quizIndex];
  const correct = quizSelected === question[1];

  if (correct) quizScore++;

  feedback(
    $("quizFeedback"),
    correct
      ? "✓ Rätt! " + question[4]
      : "✗ Rätt svar: " + question[1] +
        ". " + question[4],
    correct
  );

  quizAnswered = true;
  $("checkQuiz").hidden = true;
  $("nextQuiz").hidden = false;

  document.querySelectorAll(".option-button")
    .forEach(button => button.disabled = true);

  $("nextQuiz").textContent =
    quizIndex === quizQuestions.length - 1
      ? "Visa resultat"
      : "Nästa fråga →";
};

$("nextQuiz").onclick = () => {
  quizIndex++;

  if (quizIndex < quizQuestions.length) {
    renderQuiz();
    return;
  }

  $("quizBar").style.width = "100%";

  $("quizProgress").textContent =
    `Resultat: ${quizScore} av ${quizQuestions.length}`;

  $("quizQuestion").textContent =
    "Stationen är klar!";

  $("quizOptions").replaceChildren();

  $("quizFeedback").textContent =
    "Du kan välja samma station och försöka igen.";

  $("nextQuiz").hidden = true;
  $("checkQuiz").hidden = true;
};

// ========================================
// AVSNITT 2 – SKRIV HTML-KOD
// ========================================

// Varje station har flera krav som kontrolleras.

const codeStations = [
  {
    title: "Grundstruktur",
    task:
      "Skapa ett HTML5-dokument med lang='sv', " +
      "title 'Min sida' och en h1 i body.",
    hint:
      "Använd DOCTYPE, html, head, title och body.",
    checks: [
      ["DOCTYPE", s =>
        /<!doctype\s+html\s*>/i.test(s)],
      ["Svenskt språk", s =>
        /<html\b[^>]*lang=["']sv["']/i.test(s)],
      ["title", s =>
        parseHTML(s).title === "Min sida"],
      ["h1 i body", s =>
        hasElement(s, "body h1") &&
        /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(s)],
      ["Avslutande body och html", s =>
        /<\/body\s*>\s*<\/html\s*>/i.test(s)]
    ]
  },
  {
    title: "Rubriker och paragrafer",
    task:
      "Skapa h1 med texten Min hobby, " +
      "h2 med Fotboll och två paragrafer.",
    hint:
      "Använd h1, h2 och p.",
    checks: [
      ["h1 Min hobby", s =>
        [...parseHTML(s).querySelectorAll("h1")]
          .some(e => e.textContent.trim() === "Min hobby")],
      ["h2 Fotboll", s =>
        [...parseHTML(s).querySelectorAll("h2")]
          .some(e => e.textContent.trim() === "Fotboll")],
      ["Två paragrafer", s =>
        parseHTML(s).querySelectorAll("p").length >= 2]
    ]
  },
  {
    title: "Listor",
    task:
      "Skapa en punktlista med tre punkter: " +
      "Äpple, Banan och Mango.",
    hint:
      "ul innehåller li.",
    checks: [
      ["Tre li i ul", s =>
        parseHTML(s).querySelectorAll("ul > li").length === 3],
      ["Rätt innehåll", s => {
        const items = [
          ...parseHTML(s).querySelectorAll("ul > li")
        ].map(e => e.textContent.trim());

        return ["Äpple", "Banan", "Mango"]
          .every(text => items.includes(text));
      }]
    ]
  },
  {
    title: "Semantisk struktur",
    task:
      "Skapa header med h1 och nav, " +
      "main med section och en footer.",
    hint:
      "Placera elementen inuti rätt förälder.",
    checks: [
      ["header med h1 och nav", s =>
        hasElement(s, "header h1") &&
        hasElement(s, "header nav")],
      ["main med section", s =>
        hasElement(s, "main section")],
      ["footer", s => hasElement(s, "footer")]
    ]
  },
  {
    title: "Relativa länkar",
    task:
      "Skapa en länk med texten Om oss " +
      "som leder till ../om.html.",
    hint:
      "Använd a och href.",
    checks: [
      ["Rätt länk", s =>
        [...parseHTML(s).querySelectorAll("a")]
          .some(e =>
            e.getAttribute("href") === "../om.html" &&
            e.textContent.trim() === "Om oss"
          )]
    ]
  },
  {
    title: "Interna länkar",
    task:
      "Skapa en länk med texten Kontakt " +
      "som leder till section med id='kontakt'.",
    hint:
      "Använd #kontakt i href.",
    checks: [
      ["Ankarlänk", s =>
        hasAttributes(s, "a", {href: "#kontakt"})],
      ["Målsektion", s =>
        hasAttributes(s, "section", {id: "kontakt"})]
    ]
  },
  {
    title: "Bilder",
    task:
      "Infoga bilden bilder/hund.jpg med " +
      "alt='En hund' och width='300'.",
    hint:
      "Använd img med tre attribut.",
    checks: [
      ["Bild med rätt attribut", s =>
        hasAttributes(s, "img", {
          src: "bilder/hund.jpg",
          alt: "En hund",
          width: "300"
        })]
    ]
  },
  {
    title: "Responsiva bilder",
    task:
      "Skapa img med src='liten.jpg', alt='Natur' " +
      "och srcset='liten.jpg 1x, stor.jpg 2x'.",
    hint:
      "Använd två x-descriptors i srcset.",
    checks: [
      ["src och alt", s =>
        hasAttributes(s, "img", {
          src: "liten.jpg",
          alt: "Natur"
        })],
      ["srcset med 1x och 2x", s => {
        const img = parseHTML(s).querySelector("img[srcset]");
        const value = img?.getAttribute("srcset") || "";

        return /liten\.jpg\s+1x/.test(value) &&
               /stor\.jpg\s+2x/.test(value);
      }]
    ]
  },
  {
    title: "Formulär",
    task:
      "Skapa ett form med label Namn: " +
      "kopplad till input type='text', " +
      "id='namn', name='namn' och en " +
      "submit-knapp med texten Skicka.",
    hint:
      "for och id måste matcha.",
    checks: [
      ["Label och input", s =>
        hasAttributes(s, "form label", {for: "namn"}) &&
        hasAttributes(s, "form input", {
          type: "text",
          id: "namn",
          name: "namn"
        })],
      ["Submit-knapp", s =>
        [...parseHTML(s).querySelectorAll(
          'form button[type="submit"]'
        )].some(e => e.textContent.trim() === "Skicka")]
    ]
  },
  {
    title: "Video och iframe",
    task:
      "Skapa video med controls och source " +
      "src='film.mp4' type='video/mp4'. " +
      "Skapa även iframe med src='info.html' " +
      "och title='Information'.",
    hint:
      "Använd video, source och iframe.",
    checks: [
      ["Video med controls", s =>
        hasElement(s, "video[controls]")],
      ["Rätt source", s =>
        hasAttributes(s, "video source", {
          src: "film.mp4",
          type: "video/mp4"
        })],
      ["Rätt iframe", s =>
        hasAttributes(s, "iframe", {
          src: "info.html",
          title: "Information"
        })]
    ]
  }
];

codeStations.forEach((station, index) => {
  $("codeStation").add(
    new Option(
      `${index + 1}. ${station.title}`,
      index
    )
  );
});

function renderCodeStation() {
  const station =
    codeStations[Number($("codeStation").value)];

  $("codeTitle").textContent = station.title;
  $("codeTask").textContent = station.task;
  $("codeHint").textContent = station.hint;
  $("codeHint").hidden = true;
  $("codeInput").value = "";
  $("codeFeedback").replaceChildren();
}

$("codeStation").onchange = renderCodeStation;

$("resetCode").onclick = () => {
  $("codeInput").value = "";
  $("codeFeedback").replaceChildren();
};

$("hintCode").onclick = () => {
  $("codeHint").hidden = !$("codeHint").hidden;
};

$("checkCode").onclick = () => {
  const station =
    codeStations[Number($("codeStation").value)];

  const code = $("codeInput").value.trim();
  const output = $("codeFeedback");

  output.replaceChildren();

  if (!code) {
    output.append(make("p", "Skriv kod först."));
    return;
  }

  let correct = 0;
  const list = make("ul");
  list.className = "result-list";

  station.checks.forEach(([name, test]) => {
    let passed = false;

    try {
      passed = test(code);
    } catch {
      passed = false;
    }

    if (passed) correct++;

    const item = make(
      "li",
      (passed ? "✓ " : "✗ ") + name
    );

    item.className = passed ? "success" : "error";
    list.append(item);
  });

  output.append(
    list,
    make(
      "p",
      `${correct} av ${station.checks.length} krav godkända.`
    )
  );

  if (correct === station.checks.length) {
    output.append(
      make("strong", "Bra jobbat! Alla krav är uppfyllda.")
    );
  } else {
    output.append(
      make("p", "Rätta koden och kontrollera igen.")
    );
  }
};

renderCodeStation();

// ========================================
// AVSNITT 3 – HITTA FELEN
// ========================================

// Kodrader lagras som text, inte som riktig HTML.
// Fel anger radnummer och förklaring.

const debugTasks = [
  {
    title: "Grundstruktur",
    task: "Markera tre felaktiga rader.",
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <title>Min sida</head>
</head>
<body>
  <h1>Välkommen</h2>
  <p>Detta är min hemsida.
</body>
</html>`,
    errors: {
      4: "title avslutas med </title>.",
      7: "h1 avslutas med </h1>.",
      8: "p behöver </p>."
    },
    hint: "Kontrollera avslutningstaggarna."
  },
  {
    title: "Indentering",
    task:
      "Markera tre felindenterade rader. " +
      "Använd två mellanslag per nivå.",
    code: `<body>
  <header>
  <h1>Min webbplats</h1>
  </header>
  <main>
    <section>
  <h2>Om mig</h2>
      <p>Jag gillar teknik.</p>
    </section>
  </main>
</body>`,
    errors: {
      3: "h1 ska ha fyra mellanslag.",
      7: "h2 ska ha sex mellanslag.",
      8: "p ska ha sex mellanslag."
    },
    hint: "Räkna nästlingsnivåerna."
  },
  {
    title: "Listor",
    task: "Markera tre felaktiga rader.",
    code: `<h2>Inköpslista</h2>
<ul>
  <li>Mjölk</li>
  <p>Bröd</p>
  <li>Ägg</li>
</ol>
<h2>Steg</h2>
<ol>
  <li>Starta datorn</li>
  <li>Öppna VS Code</li>
</ul>`,
    errors: {
      4: "Använd li, inte p.",
      6: "ul avslutas med </ul>.",
      11: "ol avslutas med </ol>."
    },
    hint: "Kontrollera li, ul och ol."
  },
  {
    title: "Semantiska element",
    task:
      "Markera tre olämpliga element för innehållet.",
    code: `<header>
  <h1>Nyhetssidan</h1>
</header>
<footer>
  <a href="index.html">Hem</a>
  <a href="om.html">Om oss</a>
</footer>
<aside>
  <h2>Dagens huvudnyhet</h2>
  <p>Här finns huvudnyheten.</p>
</aside>
<main>
  <p>Copyright 2026</p>
</main>`,
    errors: {
      4: "Använd nav för navigeringen.",
      8: "Huvudnyheten hör hemma i main.",
      12: "Copyright passar i footer."
    },
    hint: "Tänk på nav, main och footer."
  },
  {
    title: "Länkar",
    task: "Markera tre felaktiga rader.",
    code: `<nav>
  <a src="index.html">Hem</a>
  <a href="om.html">Om oss</a>
  <a href="kontakt">Kontakt</a>
</nav>
<section id="kontakt">
  <h2>Kontakt</h2>
</section>
<a href="..bilder/foto.jpg">Visa bild</a>`,
    errors: {
      2: "Länkar använder href.",
      4: "Använd #kontakt för id-länken.",
      9: "Sökvägen ska vara ../bilder/foto.jpg."
    },
    hint: "Kontrollera href, # och ../."
  },
  {
    title: "Bilder",
    task: "Markera tre felaktiga rader.",
    code: `<section>
  <h2>Mina bilder</h2>
  <img href="hund.jpg" alt="En hund">
  <img src="katt.jpg">
  <img src="logo.png" alt="Logotyp">
  <img src="skog.jpg" width="200px" height="100">
</section>`,
    errors: {
      3: "img använder src.",
      4: "alt-attribut saknas.",
      6: "width i HTML anges utan px."
    },
    hint: "Kontrollera src, alt och width."
  },
  {
    title: "Responsiva bilder",
    task: "Markera två felaktiga rader.",
    code: `<img
  src="bild-200.jpg"
  alt="Natur"
  srcset="bild-200.jpg 1w,
          bild-400.jpg 2x">
<img
  src="foto.jpg"
  alt="Landskap"
  srcset="liten.jpg 400w, stor.jpg 800w"
  size="100vw">`,
    errors: {
      4: "Blanda inte w och x i samma srcset.",
      10: "Attributet heter sizes."
    },
    hint: "Kontrollera srcset och sizes."
  },
  {
    title: "Formulär",
    task: "Markera fyra felaktiga rader.",
    code: `<form>
  <label for="namn">Namn:</label>
  <input type="text" id="person" name="namn">
  <label for="losenord">Lösenord:</label>
  <input type="text" id="losenord" name="losenord">
  <input type="radio" name="farg" value="rod"> Röd
  <input type="radio" name="val" value="bla"> Blå
  <button type="button">Skicka</button>
</form>`,
    errors: {
      3: "id ska matcha label: namn.",
      5: "Använd type='password'.",
      7: "Radioknapparna ska ha samma name.",
      8: "Använd type='submit'."
    },
    hint: "Kontrollera for/id, type och name."
  },
  {
    title: "Iframe",
    task: "Markera tre felaktiga rader.",
    code: `<section>
  <h2>Inbäddad video</h2>
  <iframe
    href="https://example.com/video"
    width="560"
    height="315"
    alt="Videospelare"
    sandbox="allow-script">
  </iframe>
</section>`,
    errors: {
      4: "iframe använder src.",
      7: "iframe ska ha title.",
      8: "Rätt token är allow-scripts."
    },
    hint: "Kontrollera src, title och sandbox."
  },
  {
    title: "Video och ljud",
    task: "Markera fyra felaktiga rader.",
    code: `<video width="640" controls>
  <source href="film.mp4" type="video/mp4">
  <source src="film.webm" type="video/webm">
</video>
<audio control>
  <source src="musik.mp3" type="audio/mpeg">
</video>
<video src="film.mp4" control></video>`,
    errors: {
      2: "source använder src.",
      5: "Attributet heter controls.",
      7: "audio avslutas med </audio>.",
      8: "Attributet heter controls."
    },
    hint: "Kontrollera src, controls och sluttaggar."
  },
  {
    title: "Tillgänglighet",
    task: "Markera fyra brister.",
    code: `<html lang="en">
<head>
  <title>Min svenska sida</title>
</head>
<body>
  <h1>Välkommen</h1>
  <h3>Om oss</h3>
  <a href="schema.html">Klicka här</a>
  <img src="hund.jpg">
  <p>Här är vår hund.</p>
</body>
</html>`,
    errors: {
      1: "Använd lang='sv' för svensk sida.",
      7: "Använd h2 efter h1.",
      8: "Skriv en beskrivande länktext.",
      9: "Bilden behöver alt-text."
    },
    hint: "Tänk på språk, rubriker, länkar och alt."
  },
  {
    title: "Blandad felsökning",
    task: "Markera fem felaktiga rader.",
    code: `<!DOCTYPE html>
<html lang="sv">
<head>
  <title>Min blogg</title>
</head>
<body>
  <main>
    <section>
      <h2>Mitt inlägg</h2>
      <img href="bild.jpg" alt="Min bild">
      <p>Välkommen!</h2>
      <a src="kontakt.html">Kontakt</a>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
      </ol>
      <iframe src="info.html" alt="Information"></iframe>
    </section>
  </main>
</body>
</html>`,
    errors: {
      10: "img använder src.",
      11: "p avslutas med </p>.",
      12: "a använder href.",
      16: "ul avslutas med </ul>.",
      17: "iframe använder title."
    },
    hint: "Kontrollera attribut och sluttaggar."
  }
];

let debugSelected = new Set();

debugTasks.forEach((task, index) => {
  $("debugStation").add(
    new Option(
      `${index + 1}. ${task.title}`,
      index
    )
  );
});

function renderDebug() {
  debugSelected.clear();

  const task =
    debugTasks[Number($("debugStation").value)];

  $("debugTitle").textContent = task.title;
  $("debugTask").textContent = task.task;
  $("debugHint").textContent = task.hint;
  $("debugHint").hidden = true;
  $("debugFeedback").replaceChildren();

  const container = $("debugLines");
  container.replaceChildren();

  task.code.split("\n").forEach((line, index) => {
    const number = index + 1;

    const button = make("button");
    button.className = "code-line";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");

    const numberSpan = make(
      "span",
      String(number).padStart(2, "0")
    );

    numberSpan.className = "line-number";

    button.append(
      numberSpan,
      document.createTextNode(line)
    );

    button.onclick = () => {
      if (debugSelected.has(number)) {
        debugSelected.delete(number);
      } else {
        debugSelected.add(number);
      }

      const selected = debugSelected.has(number);

      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));

      $("debugFeedback").replaceChildren();
      updateDebugCount();
    };

    container.append(button);
  });

  updateDebugCount();
}

function updateDebugCount() {
  $("debugCount").textContent =
    `Markerade rader: ${debugSelected.size}`;
}

$("debugStation").onchange = renderDebug;
$("resetDebug").onclick = renderDebug;

$("hintDebug").onclick = () => {
  $("debugHint").hidden = !$("debugHint").hidden;
};

$("nextDebug").onclick = () => {
  $("debugStation").selectedIndex =
    ($("debugStation").selectedIndex + 1) %
    debugTasks.length;

  renderDebug();
};

$("checkDebug").onclick = () => {
  const task =
    debugTasks[Number($("debugStation").value)];

  const correctLines =
    Object.keys(task.errors).map(Number);

  const found = correctLines.filter(
    line => debugSelected.has(line)
  );

  const missed = correctLines.filter(
    line => !debugSelected.has(line)
  );

  const extra = [...debugSelected].filter(
    line => !correctLines.includes(line)
  );

  const allCorrect =
    missed.length === 0 && extra.length === 0;

  const output = $("debugFeedback");
  output.replaceChildren();

  output.append(
    make(
      "h4",
      allCorrect
        ? "✓ Alla rätt!"
        : `Du hittade ${found.length} av ${correctLines.length} fel.`
    )
  );

  const list = make("ul");
  list.className = "result-list";

  found.forEach(line => {
    const item = make(
      "li",
      `✓ Rad ${line}: ${task.errors[line]}`
    );
    item.className = "success";
    list.append(item);
  });

  missed.forEach(line => {
    const item = make(
      "li",
      `Missad rad ${line}: ${task.errors[line]}`
    );
    item.className = "error";
    list.append(item);
  });

  extra.forEach(line => {
    const item = make(
      "li",
      `Rad ${line} var inte felaktig i denna uppgift.`
    );
    item.className = "error";
    list.append(item);
  });

  output.append(list);
};

renderDebug();

// ========================================
// AVSNITT 4 – HTML ESCAPE ROOM
// ========================================

// Åtta dörrar med tre olika uppgiftstyper:
// write = skriv kod
// fix = rätta trasig kod
// order = ordna kodrader

const escapeLevels = [
  {
    title: "Dörr 1 – Huvudrubriken",
    type: "write",
    task:
      "Skriv ett komplett h1-element med texten Välkommen.",
    hint:
      "Du behöver en öppnings- och avslutningstagg.",
    check(code) {
      return /^<h1>\s*Välkommen\s*<\/h1>$/i.test(
        code.trim()
      );
    },
    explanation:
      "Du skapade en korrekt huvudrubrik."
  },
  {
    title: "Dörr 2 – Kodordningen",
    type: "order",
    task:
      "Ordna kodraderna så att HTML-dokumentets " +
      "grundstruktur blir korrekt.",
    hint:
      "html omsluter head och body.",
    lines: [
      "<body>",
      "</html>",
      "<html>",
      "</body>",
      "<head>",
      "</head>"
    ],
    correct: [
      "<html>",
      "<head>",
      "</head>",
      "<body>",
      "</body>",
      "</html>"
    ],
    explanation:
      "Du placerade elementen i rätt ordning."
  },
  {
    title: "Dörr 3 – Den hemliga länken",
    type: "write",
    task:
      "Skapa en länk med texten Hem som leder till " +
      "../index.html.",
    hint:
      "Använd a, href och ../.",
    check(code) {
      return [...parseHTML(code).querySelectorAll("a")]
        .some(link =>
          link.getAttribute("href") === "../index.html" &&
          link.textContent.trim() === "Hem"
        );
    },
    explanation:
      "Du skapade en korrekt relativ länk."
  },
  {
    title: "Dörr 4 – Bildens identitet",
    type: "write",
    task:
      "Skapa ett img-element med src='bilder/hund.jpg' " +
      "och alt='En hund'.",
    hint:
      "Använd src och alt.",
    check(code) {
      return hasAttributes(code, "img", {
        src: "bilder/hund.jpg",
        alt: "En hund"
      });
    },
    explanation:
      "Bilden har både rätt sökväg och textalternativ."
  },
  {
    title: "Dörr 5 – Reparera formuläret",
    type: "fix",
    task:
      "Rätta formuläret så att label kopplas till input " +
      "och input har type='email'.",
    broken:
      '<label for="epost">E-post</label>\n' +
      '<input type="text" id="mail" name="epost">',
    hint:
      "for måste matcha id. Ändra också type.",
    check(code) {
      const doc = parseHTML(code);
      const label = doc.querySelector("label");
      const input = doc.querySelector("input");

      return !!(
        label &&
        input &&
        label.getAttribute("for") === input.id &&
        input.getAttribute("type") === "email" &&
        input.getAttribute("name") === "epost"
      );
    },
    explanation:
      "Du reparerade formuläret korrekt."
  },
  {
    title: "Dörr 6 – Den responsiva bilden",
    type: "write",
    task:
      "Skapa img med src='liten.jpg', alt='Natur' " +
      "och srcset med liten.jpg 1x och stor.jpg 2x.",
    hint:
      "Använd srcset med två x-descriptors.",
    check(code) {
      const img = parseHTML(code).querySelector("img");

      if (!img) return false;

      const srcset = img.getAttribute("srcset") || "";

      return (
        img.getAttribute("src") === "liten.jpg" &&
        img.getAttribute("alt") === "Natur" &&
        /liten\.jpg\s+1x/.test(srcset) &&
        /stor\.jpg\s+2x/.test(srcset)
      );
    },
    explanation:
      "Du använde srcset för olika pixeltätheter."
  },
  {
    title: "Dörr 7 – Säkerhetskontrollen",
    type: "fix",
    task:
      "Reparera iframe-koden. Den ska ha src, " +
      "title och sandbox='allow-scripts'.",
    broken:
      '<iframe href="info.html" ' +
      'alt="Information" ' +
      'sandbox="allow-script"></iframe>',
    hint:
      "Kontrollera src, title och sandbox.",
    check(code) {
      return hasAttributes(code, "iframe", {
        src: "info.html",
        title: "Information",
        sandbox: "allow-scripts"
      });
    },
    explanation:
      "Du reparerade iframe-elementet."
  },
  {
    title: "Dörr 8 – Slutportalen",
    type: "write",
    task:
      "Skapa en section med id='kontakt'. " +
      "Inuti ska det finnas h2 med texten Kontakt " +
      "och en länk till mailto:info@example.com " +
      "med texten Mejla oss.",
    hint:
      "Använd section, h2 och a med korrekt nästling.",
    check(code) {
      const section = parseHTML(code).querySelector(
        'section[id="kontakt"]'
      );

      if (!section) return false;

      const heading = section.querySelector("h2");
      const links = [...section.querySelectorAll("a")];

      return !!(
        heading &&
        heading.textContent.trim() === "Kontakt" &&
        links.some(link =>
          link.getAttribute("href") ===
            "mailto:info@example.com" &&
          link.textContent.trim() === "Mejla oss"
        )
      );
    },
    explanation:
      "Du klarade slututmaningen!"
  }
];

let escapeStep = 0;
let escapeSolved = false;
let escapeMistakes = 0;
let escapeOrder = [];

function renderEscapeSteps() {
  const container = $("escapeSteps");
  container.replaceChildren();

  for (let i = 0; i < 8; i++) {
    const step = make("div");
    step.className = "escape-step";

    if (i < escapeStep) {
      step.classList.add("done");
    } else if (i === escapeStep) {
      step.classList.add("current");
    }

    container.append(step);
  }
}

function updateDoor(open) {
  const door = $("escapeDoor");

  door.classList.toggle("open", open);

  $("doorLabel").textContent =
    `DÖRR ${escapeStep + 1}`;

  $("doorLock").textContent = open ? "🔓" : "🔒";

  $("doorStatus").textContent = open
    ? "Dörren är upplåst!"
    : "Lös uppgiften för att öppna dörren.";
}

function renderEscapeOrder() {
  const container = $("escapeOrderLines");
  container.replaceChildren();

  escapeOrder.forEach((line, index) => {
    const row = make("div");
    row.className = "order-row";

    const code = make("code", line);

    const up = make("button", "↑");
    const down = make("button", "↓");

    up.type = "button";
    down.type = "button";

    up.disabled = index === 0 || escapeSolved;
    down.disabled =
      index === escapeOrder.length - 1 || escapeSolved;

    up.onclick = () => {
      [
        escapeOrder[index - 1],
        escapeOrder[index]
      ] = [
        escapeOrder[index],
        escapeOrder[index - 1]
      ];

      renderEscapeOrder();
    };

    down.onclick = () => {
      [
        escapeOrder[index],
        escapeOrder[index + 1]
      ] = [
        escapeOrder[index + 1],
        escapeOrder[index]
      ];

      renderEscapeOrder();
    };

    row.append(code, up, down);
    container.append(row);
  });
}

function renderEscape() {
  const level = escapeLevels[escapeStep];

  escapeSolved = false;

  $("escapeProgress").textContent =
    `Dörr ${escapeStep + 1} av 8`;

  $("escapeMistakes").textContent =
    `Försök att rätta: ${escapeMistakes}`;

  $("escapeTitle").textContent = level.title;
  $("escapeTask").textContent = level.task;
  $("escapeHint").textContent = level.hint;
  $("escapeHint").hidden = true;

  $("escapeFeedback").textContent = "";

  $("escapeOrderArea").hidden = level.type !== "order";
  $("escapeEditorArea").hidden = level.type === "order";

  $("escapeInput").value =
    level.type === "fix" ? level.broken : "";

  $("escapeInput").disabled = false;

  $("checkEscape").hidden = false;
  $("hintEscape").hidden = false;
  $("nextEscape").hidden = true;

  if (level.type === "order") {
    escapeOrder = [...level.lines];
    renderEscapeOrder();
  }

  renderEscapeSteps();
  updateDoor(false);
}

$("checkEscape").onclick = () => {
  if (escapeSolved) return;

  const level = escapeLevels[escapeStep];

  let correct = false;

  if (level.type === "order") {
    correct =
      JSON.stringify(escapeOrder) ===
      JSON.stringify(level.correct);
  } else {
    const code = $("escapeInput").value.trim();

    if (!code) {
      feedback(
        $("escapeFeedback"),
        "Skriv kod först.",
        false
      );
      return;
    }

    try {
      correct = level.check(code);
    } catch {
      correct = false;
    }
  }

  if (!correct) {
    escapeMistakes++;

    $("escapeMistakes").textContent =
      `Försök att rätta: ${escapeMistakes}`;

    feedback(
      $("escapeFeedback"),
      "✗ Inte riktigt rätt. Kontrollera koden " +
      "och försök igen.",
      false
    );

    return;
  }

  escapeSolved = true;

  feedback(
    $("escapeFeedback"),
    "✓ Rätt! " + level.explanation,
    true
  );

  $("checkEscape").hidden = true;
  $("nextEscape").hidden = false;
  $("escapeInput").disabled = true;

  $("nextEscape").textContent =
    escapeStep === 7
      ? "Öppna slutportalen →"
      : "Öppna nästa dörr →";

  if (level.type === "order") {
    renderEscapeOrder();
  }

  updateDoor(true);
};

$("nextEscape").onclick = () => {
  if (!escapeSolved) return;

  if (escapeStep < 7) {
    escapeStep++;
    renderEscape();
  } else {
    finishEscape();
  }
};

function finishEscape() {
  $("escapeProgress").textContent =
    "8 av 8 dörrar upplåsta!";

  $("escapeTitle").textContent =
    "Grattis! Du lyckades fly!";

  $("escapeTask").textContent =
    "Du har klarat alla åtta HTML-utmaningarna.";

  $("escapeOrderArea").hidden = true;
  $("escapeEditorArea").hidden = true;

  $("checkEscape").hidden = true;
  $("nextEscape").hidden = true;
  $("hintEscape").hidden = true;

  $("doorLabel").textContent = "KLART!";
  $("doorLock").textContent = "🏆";
  $("doorStatus").textContent =
    "Alla dörrar är upplåsta.";

  $("escapeFeedback").textContent =
    "Bra jobbat! Du har tränat HTML-struktur, " +
    "länkar, bilder, formulär och säkerhet.";

  const container = $("escapeSteps");
  container.replaceChildren();

  for (let i = 0; i < 8; i++) {
    const step = make("div");
    step.className = "escape-step done";
    container.append(step);
  }
}

$("hintEscape").onclick = () => {
  $("escapeHint").hidden = !$("escapeHint").hidden;
};

$("restartEscape").onclick = () => {
  escapeStep = 0;
  escapeMistakes = 0;
  renderEscape();
};

renderEscape();
