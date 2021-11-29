class GameAI {
  constructor(gridController) {
    this.gridController = gridController;
  }

  chooseSideId() {
    return this.getRandomSideId();
  }

  getNextClosingSideBox() {
    for (let box of this.gridController.boxes) {
      let owned = 0;
      let unOwnedSide = "";
      for (let side of Object.entries(box.sideIds)) {
        if (side[1] !== "") {
          owned++;
        } else {
          unOwnedSide = side[0];
        }
      }
      if (owned === 3) {
        return unOwnedSide;
      }
    }
    return null;
  }

  getNextClosingSideBoxOrRandom() {
    let closingSideBox = this.getNextClosingSideBox();
    if (closingSideBox) {
      return closingSideBox;
    }
    return this.getRandomSideId();
  }

  getRandomSideId() {
    const availableSides = this.gridController.availableSides;
    const i = Math.floor(Math.random() * availableSides.length);

    if (!this.isThirdSide(availableSides[i])) {
      return availableSides[i];
    }
    let sideId = this.tryGetNonThirdSideId(availableSides, i);
    return sideId;
  }

  tryGetNonThirdSideId(availableSides, i) {
    for (let sideId of availableSides) {
      if (!this.isThirdSide(sideId)) {
        return sideId;
      }
    }
    return availableSides[i];
  }

  isThirdSide(sideId) {
    const boxes = this.gridController.getAdjacentBoxes(sideId);
    for (let box of boxes) {
      let ownedSideIds = 0;
      for (let sideOwner of Object.values(box.sideIds)) {
        if (sideOwner != "") {
          ownedSideIds++;
        }
      }
      if (ownedSideIds === 2) return true;
    }
    return false;
  }
}

export default GameAI;
