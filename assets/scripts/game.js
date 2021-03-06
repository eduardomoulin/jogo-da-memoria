// techs representam as imagens que serão usadas no jogo
let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  moves: 0,

  techs: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    this.moves++;
    console.log(this.moves);
    document.getElementById(
      "res"
    ).innerHTML = `Voce precisou de ${this.moves} jogadas para ganhar!`;
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver() {
    //   retorna verdadeiro quando todas as cartas forem flipadas.
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  cards: null,

  createCardsFromTechs: function () {
    this.cards = [];
    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    });

    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromTech: function (tech) {
    return [
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
    ];
  },

  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    //   Para embaralhar pegando o ultimo elemento e se certificar que não vamos embaralhar elementos que já foram embaralhados.
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // invertendo valores
      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },
};
