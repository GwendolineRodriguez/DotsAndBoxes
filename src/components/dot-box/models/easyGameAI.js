import GameAI from "./gameAI";

class EasyGameAI extends GameAI {
  constructor(gridController) {
    super(gridController);
  }

  chooseSideId() {
    return this.getNextClosingSideBoxOrRandom();
  }
}

export default EasyGameAI;
