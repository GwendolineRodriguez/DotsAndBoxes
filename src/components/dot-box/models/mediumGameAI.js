import GameAI from "./gameAI";

class MediumGameAI extends GameAI {
  constructor(gridController) {
    super(gridController);
  }

  chooseSideId() {
    return this.getNextClosingSideBoxAndDoubleCross();
  }

  getNextClosingSideBoxAndDoubleCross() {
    for (let side of this.gridController.sharedSides) {
      if (side[1] !== "") continue;
      const boxes = this.gridController.getAdjacentBoxes(side[0]);
      let ownedSides = 0;
      let borderSides = [];
      for (let box of boxes) {
        for (let side of Object.entries(box.sideIds)) {
          if (this.gridController.isBorder(side[0]) && side[1] === "")
            borderSides.push(side);
          if (side[1] !== "") ownedSides++;
        }
        if (ownedSides === 1 || ownedSides === 4) break;
      }
      if (ownedSides === 5 && borderSides.length === 1) {
        return borderSides[0][0];
      }
    }
    return this.getNextClosingSideBoxOrRandom();
  }
}

export default MediumGameAI;
