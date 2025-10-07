const content = document.getElementById("content");

function loadSection(section) {
  switch (section) {
    case "home":
      content.innerHTML = `
        <h2>Welcome!</h2>
        <p>Pick a game and start playing instantly.</p>
      `;
      break;

    case "games":
      loadGames();
      break;

    case "news":
      content.innerHTML = `
        <h2>Game News</h2>
        <p>We'll post updates and announcements here soon!</p>
      `;
      break;

    case "contact":
      content.innerHTML = `
        <h2>Contact Us</h2>
        <p>Email: 5166-gamez@gmail.com</p>
      `;
      break;

    default:
      loadSection("home");
  }
}

function loadGames() {
  const games = [
    { name: "Slope", src: "https://kdata1.com/2020/05/slope" },
    { name: "Run 3", src: "https://lekug.github.io/tn6pS9dCf37xAhkJv" },
    { name: "Cookie Clicker", src: "https://advanced-channeler.02.gz-associates.com" }
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
      <button id="back-button">← Back to Games</button>
      <h2>${game.name}</h2>
      <div class="game-container">
        <iframe src="${game.src}" width="900" height="600" frameborder="0" allowfullscreen></iframe>
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
  const body = document.body;
  const selector = document.getElementById("theme-selector");

  if (theme === "light") {
    body.classList.add("light-theme");
    selector.value = "light";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-theme");
    selector.value = "dark";
    localStorage.setItem("theme", "dark");
  }
}

// Load saved theme on startup
(function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  changeTheme(savedTheme);
})();

loadSection("home");
