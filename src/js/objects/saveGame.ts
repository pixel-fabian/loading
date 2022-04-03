export default class SaveGame {
  private aHighscores = [0, 0, 0, 0, 0];

  constructor() {
    this.load();
  }

  addItem(newScore) {
    const lowestScore = Math.min(...this.aHighscores);

    if (newScore > lowestScore) {
      const index = this.aHighscores.indexOf(lowestScore);
      this.aHighscores[index] = newScore;
      this.aHighscores = this.aHighscores.sort((a, b) => {
        return b - a;
      });
    }

    this.save();
  }

  getItems() {
    return this.aHighscores;
  }

  save() {
    localStorage.setItem('highscores', JSON.stringify(this.aHighscores));
  }

  load() {
    if (JSON.parse(localStorage.getItem('highscores'))) {
      this.aHighscores = JSON.parse(localStorage.getItem('highscores'));
    }
  }
}
