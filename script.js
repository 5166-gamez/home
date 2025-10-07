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
        <p>Email: example@example.com</p>
      `;
      break;

    default:
      loadSection("home");
  }
}

function loadGames() {
  // Array of your embedded games
  const games = [
    {
      name: "Slope",
      embed: `<iframe src="https://slopegame.lol/play/slope" width="800" height="600" frameborder="0" allowfullscreen></iframe>`
    },
    {
      name: "Run 3",
      embed: `<iframe src="https://player03.com/run/3/beta" width="800" height="600" frameborder="0" allowfullscreen></iframe>`
    },
    {
      name: "Cookie Clicker",
      embed: `<iframe src="https://cookieclicker.ee" width="800" height="600" frameborder="0" allowfullscreen></iframe>`
    }
  ];

  // Build a grid of game buttons
  content.innerHTML = `
    <h2>Games</h2>
    <div id="game-list">
      ${games.map(g => `<button onclick="showGame(\`${g.embed}\`)">${g.name}</button>`).join("")}
    </div>
    <div id="game-frame" style="margin-top:20px;"></div>
  `;
}

function showGame(embedHTML) {
  const frame = document.getElementById("game-frame");
  frame.innerHTML = embedHTML;
}

// Load home section first
loadSection("home");
