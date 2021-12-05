class GameController {
  constructor(gridController, gameState, gameAI, classes) {
    this.gridController = gridController;
    this.gameState = gameState;
    this.gameAI = gameAI;
    this.classes = classes;
  }

  chooseBoxSide(player, sideId) {
    const btn = document.getElementById(sideId);
    this.gridController.markBtnAsOwned(btn, player);
    const boxes = this.gridController.getAdjacentBoxes(sideId);
    let boxesCompleted = 0;
    boxes.forEach((box) => {
      box.sideIds[sideId] = player.name;
      let isCurrentBoxCompleted = this.gridController.boxIsCompleted(box);
      if (isCurrentBoxCompleted) {
        boxesCompleted++;
      }
      if (isCurrentBoxCompleted) {
        player.score++;
        this.gameState.boxesOwned++;
        box.owner = player.name;
        this.gridController.markBoxAsOwned(box, player);
        this.gameState.checkEndGame();
      }
    });
    this.checkIfAINeedsToPlay(player, boxesCompleted > 0);
  }

  checkIfAINeedsToPlay(player, boxesCompleted) {
    if (
      (player.isHuman && !boxesCompleted) ||
      (!player.isHuman && boxesCompleted && !this.gameState.gameOver)
    ) {
      let bestNextSideId = this.gameAI.chooseSideId();
      this.chooseBoxSide(this.gameState.player2, bestNextSideId);
    }
  }
}

export default GameController;
