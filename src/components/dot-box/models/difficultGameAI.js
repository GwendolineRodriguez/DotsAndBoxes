import GameAI from "./gameAI";
import cloneDeep from "lodash.clonedeep";
import GameStateSim from "./gameStateSim";

class DifficultGameAI extends GameAI {
  constructor(gridController, gameState) {
    super(gridController);
    this.gameState = gameState;
  }

  chooseSideId() {
    const gameStateSim = new GameStateSim(this.gridController, this.gameState);
    gameStateSim.setActivePlayer(gameStateSim.player2);
    const bestSideIdperScore = this.getMiniMaxSideId(gameStateSim, 1, true);
    return bestSideIdperScore.sideId;
  }

  scoreEvaluation(state) {
    const scoreEval = state.player2.score - state.player1.score;
    const sideId = state.chosenSideId;
    return { scoreEval, sideId };
  }

  simulateChosenSide(gameState, sideId) {
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
    if (boxesCompleted && !gameState.gameOver) {
      gameState.nextTurnPlayer = gameState.activePlayer;
    } else {
      gameState.nextTurnPlayer = gameState.inActivePlayer;
    }
  }

  getMinScore(minScore, score) {
    if (minScore.scoreEval > score.scoreEval) {
      return score;
    }
    return minScore;
  }

  getMaxScore(maxScore, score) {
    if (maxScore.scoreEval < score.scoreEval) {
      return score;
    }
    return maxScore;
  }

  // getMiniMaxSideId(gameState, depth, maximizingPlayer) {
  //   if (depth === 0 || gameState.availableSides.length === 0) {
  //     return this.scoreEvaluation(gameState);
  //   }

  //   if (maximizingPlayer) {
  //     let maxScore = { scoreEval: -Infinity, sideId: "" };
  //     for (let sideId of gameState.availableSides) {
  //       let gameStatedeepCopy = cloneDeep(gameState);
  //       this.simulateChosenSide(gameStatedeepCopy, sideId);
  //       let score = this.getMiniMaxSideId(gameStatedeepCopy, depth - 1, false);
  //       maxScore = this.getMaxScore(maxScore, score);
  //     }
  //     return maxScore;
  //   } else {
  //     let minScore = { scoreEval: +Infinity, sideId: "" };
  //     for (let sideId of gameState.availableSides) {
  //       let gameStatedeepCopy = cloneDeep(gameState);
  //       this.simulateChosenSide(gameStatedeepCopy, sideId);
  //       let score = this.getMiniMaxSideId(gameStatedeepCopy, depth - 1, true);
  //       minScore = this.getMinScore(minScore, score);
  //     }
  //     return minScore;
  //   }
  // }

  getMiniMaxSideId(gameState, depth) {
    if (depth === 0 || gameState.availableSides.length === 0) {
      return this.scoreEvaluation(gameState);
    }

    let maxScore = { scoreEval: -Infinity, sideId: "" };
    for (let sideId of gameState.availableSides) {
      let gameStatedeepCopy = cloneDeep(gameState);
      this.simulateChosenSide(gameStatedeepCopy, sideId);
      let score = this.getMiniMaxSideId(gameStatedeepCopy, depth - 1, false);
      maxScore = this.getMaxScore(maxScore, score);
    }
    return maxScore;
  }
}

export default DifficultGameAI;
