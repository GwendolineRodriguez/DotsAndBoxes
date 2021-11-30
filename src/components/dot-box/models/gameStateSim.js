import cloneDeep from "lodash.clonedeep";

class GameStateSim {
  constructor(gridController, gameState) {
    this.player1 = cloneDeep(gameState.player1);
    this.player2 = cloneDeep(gameState.player2);
    this.maxScore = cloneDeep(gameState.maxScore);
    this.boxes = cloneDeep(gridController.boxes);
    this.boxesOwned = 0;
    this.chosenSideId = "";
    this.availableSides = cloneDeep(gridController.availableSides);
  }

  setActivePlayer(player) {
    if (player.isHuman) {
      this.activePlayer = this.player1;
      this.inActivePlayer = this.player2;
    } else {
      this.activePlayer = this.player2;
      this.inActivePlayer = this.player1;
    }
  }

  checkEndGame() {
    if (this.boxesOwned.toString() === this.maxScore) {
      this.gameOver = true;
    }
  }

  removeSideIdAvailability(sideId) {
    const index = this.availableSides.indexOf(sideId);
    if (index > -1) {
      this.availableSides.splice(index, 1);
    }
  }

  getAdjacentBoxes(sideId) {
    return this.boxes.filter((box) =>
      Object.keys(box.sideIds).includes(sideId)
    );
  }
}

export default GameStateSim;
