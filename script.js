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
    { name: "Slope", embed: `<iframe src='https://slopegame.lol/play/slope' width='800' height='600' frameborder='0' allowfullscreen></iframe>` },
    { name: "Run 3", embed: `<iframe src='https://player03.com/run/3/beta' width='800' height='600' frameborder='0' allowfullscreen></iframe>` },
    { name: "Cookie Clicker", embed: `<iframe src='https://cookieclicker.ee' width='800' height='600' frameborder='0' allowfullscreen></iframe>` }
  ];

  content.innerHTML = `
    <h2>Games</h2>
    <div id="game-list"></div>
    <div id="game-frame" style="margin-top:20px;"></div>
  `;

  const list = document.getElementById("game-list");

  games.forEach(g => {
    const btn = document.createElement("button");
    btn.textContent = g.name;
    btn.addEventListener("click", () => showGame(g.embed));
    list.appendChild(btn);
  });
}

function showGame(embedHTML) {
  const frame = document.getElementById("game-frame");
  frame.innerHTML = embedHTML;
}

// Load home section first
loadSection("home");
