// test line to see if its actually building
const content = document.getElementById("content");

function updateHeader(section) {
  const icon = document.getElementById("page-icon");
  const name = document.getElementById("page-name");

  // Update icon + label based on section
  icon.src = `icons/pageicons/${section}.png`;
  name.textContent = section.charAt(0).toUpperCase() + section.slice(1);
}

function loadSection(section) {
  updateHeader(section);

  switch (section) {
    case "home":
      content.innerHTML = `
        <h2>5166 Gamez</h2>
        <p>this site is wip please let me add more stuff</p>
      `;
      break;

    case "games":
      loadGames();
      break;

    case "changelogs":
      loadChangelogs();
      break;

    case "contact":
      content.innerHTML = `
        <h2>Contact Us</h2>
        <p>Fill out the form below to suggest a game:</p>
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSfTl_4-B2gHmKEfpPzcFmRuFvSs_BfqOgZidXwgy8iGI4q8Iw/viewform?embedded=true" 
          width="640" 
          height="834" 
          frameborder="0" 
          marginheight="0" 
          marginwidth="0"
          style="border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.2); max-width: 90vw;">
          Loading…
        </iframe>
      `;
      break;

    default:
      loadSection("home");
  }
}

async function loadChangelogs() {
  content.innerHTML = `
    <h2>Changelogs</h2>
    <div id="changelog-list" style="display: flex; flex-direction: column; gap: 20px;"></div>
  `;

  const list = document.getElementById("changelog-list");

  try {
    // Fetch list of changelogs (you'll maintain a simple index file)
    const response = await fetch("changelogs/index.json");
    const files = await response.json(); // e.g. ["v0.1.0.json", "v0.2.0.json"]

    for (const file of files.reverse()) { // newest first
      const logData = await fetch(`changelogs/${file}`).then(r => r.json());
      renderChangelog(list, logData);
    }
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p>Failed to load changelogs.</p>`;
  }
}

function renderChangelog(list, log) {
  const container = document.createElement("div");
  container.className = "changelog-block";
  container.style.cssText = `
    background: var(--panel-bg, #1a1a1a);
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    overflow-y: auto;
    max-height: 250px;
  `;

  const header = document.createElement("h3");
  header.textContent = `${log.name} [${log.version}] - ${log.date}`;
  header.style.marginBottom = "10px";
  header.style.color = "var(--accent, #00c6ff)";

  const body = document.createElement("div");
  log.changes.forEach(section => {
    const secTitle = document.createElement("p");
    secTitle.textContent = `- ${section.title}:`;
    secTitle.style.fontWeight = "bold";
    body.appendChild(secTitle);

    const ul = document.createElement("ul");
    section.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    body.appendChild(ul);
  });

  container.appendChild(header);
  container.appendChild(body);
  list.appendChild(container);
}

function loadGames() {
  const games = [
  //  { name: "Slope", src: "https://kdata1.com/2020/05/slope" },
    { name: "bonk.io", src: "https://bonk.io" },
    { name: "Run 3", src: "https://lekug.github.io/tn6pS9dCf37xAhkJv" },
    { name: "Cookie Clicker", src: "https://advanced-channeler.02.gz-associates.com/?t=tmm-cookieclicker" },
    { name: "Drift Boss", src: "https://www.hoodamath.com/mobile/games/drift-boss/game.html" },
    { name: "Four Colors Multiplayer", src: "https://html5.gamedistribution.com/rvvASMiM/f2520bae00624e93a4f4614732fa259e/index.html?gd_sdk_referrer_url=https://en.onlygames.io/games/card/four-colors-multiplayer.html&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2VuLm9ubHlnYW1lcy5pby9nYW1lcy9jYXJkL2ZvdXItY29sb3JzLW11bHRpcGxheWVyLmh0bWwiLCJwYXJlbnREb21haW4iOiJlbi5vbmx5Z2FtZXMuaW8iLCJ0b3BEb21haW4iOiJlbi5vbmx5Z2FtZXMuaW8iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xNyJ9" } // probably get a smaller link for this 
  ];

  content.innerHTML = `
    <h2>Games</h2>
    <div id="game-list"></div>
  `;

  const list = document.getElementById("game-list");

  games.forEach(g => {
    const btn = document.createElement("button");
    btn.textContent = g.name;
    btn.addEventListener("click", () => openGamePage(g));
    list.appendChild(btn);
  });
}

function openGamePage(game) {
  content.innerHTML = `
    <div class="game-page">
      <button id="back-button">← Back</button>
      <h2>${game.name}</h2>
      <div class="game-container">
        <iframe src="${game.src}" width="1920" height="1080" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;

  // back button logic
  const backBtn = document.getElementById("back-button");
  backBtn.addEventListener("click", () => loadSection("games"));
}

function showGame(embedHTML) {
  const frame = document.getElementById("game-frame");
  frame.innerHTML = embedHTML;

  const iframe = frame.querySelector("iframe");
  if (iframe) {
    iframe.addEventListener("error", () => {
      frame.innerHTML = "<p>Sorry, this game couldn't load.</p>";
    });
  }
}

function changeTheme(theme) {
  const link = document.getElementById('theme-link');
  link.href = `themes/${theme}.css`;
  localStorage.setItem('theme', theme); // save preference
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'dark';
  changeTheme(saved);
});

function toggleThemeMenu() {
  const menu = document.getElementById("theme-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Collapse/Expand header
function toggleHeader() {
  const header = document.getElementById("main-header");
  const arrow = document.getElementById("arrow-icon");
  const toggleBtn = document.getElementById("toggle-header-btn");

  const hidden = header.classList.toggle("hidden");
  arrow.classList.toggle("rotated", hidden);

  // Adjust button position slightly when collapsed
  toggleBtn.style.top = hidden ? "10px" : "70px";
}

loadSection("home");
