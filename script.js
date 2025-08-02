document.addEventListener("DOMContentLoaded", () => {
  // 🧠 Step 1: Fruits/Emojis jo cards pe dikhana hai
  const emojis = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍒", "🍑", "🍍"];

  // 🧠 Step 2: Select HTML ke elements get karo
  const board = document.getElementById("game-board");
  const movesCount = document.getElementById("moves-count");
  const finalMoves = document.getElementById("final-moves");
  const message = document.getElementById("message");
  const restartBtn = document.getElementById("restart-button");
  const playAgainBtn = document.getElementById("play-again-button");

  // 🧠 Step 3: Game variables initialize karna

  let cards = []; //sab card k data yahan honga
  let flippedCards = []; //jo cards flip hue hain unka data only 2
  let moves = 0; // total kitne moves huye
  let matchedPairs = 0; // matched pairs ki count
  let allowFlip = true; // card ko flip karne ki permission

  // 🎮 Step 4: Game shuru karne wali function

  function startGame() {
    //game start hote sab reset ho jaye ge
    cards = [];
    flippedCards = [];
    moves = 0;
    matchedPairs = 0;
    allowFlip = true;
    movesCount.textContent = moves;
    message.classList.remove("show");
    board.innerHTML = "";

    let allCards = shuffle([...emojis, ...emojis]); // yaha hamne ak functio bnya he jis me ham sare imoji ko shuffle(jo ki hota refresh kerne per rearange in rendom type) is me ham hamere imoji ko dubble kekr ke store ker rahe he

    // is function me ham her card ke liye ak nya element banye ge

    allCards.forEach((emoji, index) => {
      const card = createCard(emoji, index); // ham yaha pe hamra element bana ne ka function call ker ke ge jis me ham imoji and index ko store er ege
      cards.push({
        emoji: emoji,
        element: card,
        flipped: false,
        matched: false,
      });
      board.appendChild(card);
    });
    console.log(cards);
  }
  // startGame();

  // 🃏 Step 5: shuffle(cards ko random order me karne ka logic) function ko create kerna

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // step 6: HTML me card bana na he createCard ye function ki halp se jo uper call hua he

  function createCard(emoji, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index; // card ka index store karne ke liye use dataset atribute me rakhe ge

    const front = document.createElement("div");
    front.className = "card-face card-front";
    front.textContent = emoji; // front side me emoji show karne ke liyes

    const back = document.createElement("div");
    back.className = "card-face card-back";

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => flipCard(index));
    return card;
  }

  // step 7: card flip hone pe kya ho ga

  function flipCard(index) {
    const card = cards[index];
    // console.log(card);

    // agar flip allowed nahi hai ya already flipped/matched hai toh kuch nahi karo
    if (!allowFlip || card.flipped || card.matched) return;
    card.flipped = true;
    card.element.classList.add("flipped");
    flippedCards.push(index);
    console.log(flippedCards);

    // jab 2 card flip ho jaye

    if (flippedCards.length === 2) {
      allowFlip = false;
      moves++;
      movesCount.textContent = moves;
      checkForMatch();
    }
  }

  // 🔍 Step 8: Check karo dono card match hue ya nahi
  function checkForMatch() {
    const [i1, i2] = flippedCards;
    const card1 = cards[i1];
    const card2 = cards[i2];
    if (card1.emoji === card2.emoji) {
      card1.matched = true;
      card2.matched = true;
      card1.element.classList.add("matched");
      card2.element.classList.add("matched");
      // console.log(cards);

      matchedPairs++;
      // console.log(flippedCards);
      flippedCards = [];
      allowFlip = true;
      if (matchedPairs === emojis.length) {
        endGame();
      }
    } else {
      // match nhi hua to vapis se flip ko back ker do
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        card1.element.classList.remove("flipped");
        card2.element.classList.remove("flipped");
        flippedCards = [];
        allowFlip = true;
      }, 800);
    }
  }
  // 🏁 Step 9: Game khatam hone pe message dikhao

  function endGame() {
    finalMoves.textContent = moves;
    message.classList.add("show");
  }
  // 🔁 Step 10: Buttons ka kaam
  restartBtn.addEventListener("click", startGame);
  playAgainBtn.addEventListener("click", startGame);
  // 💥 Start the game first time
  startGame();
});
