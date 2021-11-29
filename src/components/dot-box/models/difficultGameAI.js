import GameAI from "./gameAI";

class DifficultGameAI extends GameAI {
  constructor(gridController) {
    super(gridController);
  }

  chooseSideId() {
    return this.getMiniMaxSideId(this.getAvailableSides(), 2, true);
  }

  evaluateScore(availableSides) {
    // what is score of player 1 plays the missing sideId ?
  }

  getMiniMaxSideId(gameState, depth, maximizingPlayer) {
    if (depth === 0 || gameState.availableSides.length === 0) {
      // rerurn {aiscore: 3, sideId: r1c1}
      return this.evaluateScore(gameState);
    }

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let side of availableSides) {
        // gameState
        // with availablesSides
        // this.boxes
        // update owner in boxes to be able to avaluate scores
        availableSides.remove(side);
        let newEval = this.getMiniMaxSideId(availableSides, depth - 1, false);
        maxEval = Math.max(maxEval, newEval);
      }
      return maxEval;
    } else {
      let minEval = +Infinity;
      for (let side of availableSides) {
        availableSides.remove(side);
        let newEval = this.getMiniMaxSideId(availableSides, depth - 1, true);
        minEval = Math.min(maxEval, newEval);
      }
      return minEval;
    }
  }
}

export default DifficultGameAI;
