import GameAI from "./gameAI";

class EasyGameAI extends GameAI {
  constructor(gridController) {
    super(gridController);
  }

  chooseSideId() {
    return this.getNextClosingSideBoxOrRandom();
  }

  getNextClosingSideBoxOrRandom() {
    let closingSideBox = this.getNextClosingSideBox();
    if (closingSideBox) {
      return closingSideBox;
    }
    return this.getRandomSideId();
  }
}

export default EasyGameAI;
