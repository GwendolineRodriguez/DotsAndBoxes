import GameAI from "./gameAI";
import cloneDeep from "lodash.clonedeep";
import GameStateSim from "./gameStateSim";

class DifficultGameAI extends GameAI {
  constructor(gridController, gameState) {
    super(gridController);
    this.gameState = gameState;
    this.maxDepth = 3;
  }

  chooseSideId() {
    const gameStateSim = new GameStateSim(this.gridController, this.gameState);
    gameStateSim.setActivePlayer(gameStateSim.player2);
    const bestSideIdperScore = this.getMiniMaxSideId(
      gameStateSim,
      this.maxDepth
    );
    return bestSideIdperScore;
  }

  simulateChosenSide(gameStateOrigin, sideId) {
    let gameState = cloneDeep(gameStateOrigin);
    gameState.chosenSideId = sideId;
    const boxes = gameState.getAdjacentBoxes(sideId);
    let boxesCompleted = 0;
    boxes.forEach((box) => {
      box.sideIds[sideId] = gameState.activePlayer.name;
      gameState.removeSideIdAvailability(sideId);
      let isCurrentBoxCompleted = this.gridController.boxIsCompleted(box);
      if (isCurrentBoxCompleted) {
        boxesCompleted++;
      }
      if (isCurrentBoxCompleted) {
        gameState.activePlayer.score++;
        gameState.boxesOwned++;
        box.owner = gameState.activePlayer.name;
        gameState.checkEndGame();
      }
    });
    if (boxesCompleted === 0 && !gameState.gameOver) {
      gameState.setActivePlayer(gameState.inActivePlayer);
    }
    return gameState;
  }

  getMinScore = (minScore, score) => (minScore > score ? score : minScore);

  getMaxScore = (maxScore, score) => (maxScore < score ? score : maxScore);

  getMiniMaxSideId(gameState, depth) {
    if (depth === 0 || gameState.availableSides.length === 0) {
      return gameState.player2.score - gameState.player1.score;
    }

    if (gameState.player2 === gameState.activePlayer) {
      let maxScore = -Infinity;
      let chooseSideId = "";
      for (let sideId of gameState.availableSides) {
        let newGameState = this.simulateChosenSide(gameState, sideId);
        let score = this.getMiniMaxSideId(newGameState, depth - 1);
        if (score > maxScore) {
          chooseSideId = sideId;
          maxScore = this.getMaxScore(maxScore, score);
        }
      }
      if (depth === this.maxDepth) return chooseSideId;
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let sideId of gameState.availableSides) {
        let newGameState = this.simulateChosenSide(gameState, sideId);
        let score = this.getMiniMaxSideId(newGameState, depth - 1);
        minScore = this.getMinScore(minScore, score);
      }
      return minScore;
    }
  }
}

export default DifficultGameAI;
