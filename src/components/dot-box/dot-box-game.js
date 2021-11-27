class DotBoxGame {
  constructor(boxNumber, difficulty) {
    this.boxes = this.generateBoxes(boxNumber);
    this.difficulty = difficulty;
    this.sharedSides = this.getSharedSides();
  }

  getSharedSides() {
    let sharedSides = [];
    for (let box of this.boxes) {
      for (let side of Object.entries(box.sideIds)) {
        if (!this.isBorder(side[0])) {
          sharedSides.push(side);
        }
      }
    }
    return [...new Set(sharedSides)];
  }

  generateBoxes = (boxNumber) => {
    this.boxes = [];
    let maxIdx = Math.sqrt(boxNumber);
    let row = 1;
    let col = 1;
    for (let x = 0; x < maxIdx; x++) {
      col = 1;
      for (let i = 0; i < maxIdx; i++) {
        this.boxes.push({
          id: `r${row + 1}Content${i + 1}`,
          owner: "",
          sideIds: {
            [`r${row}c${col + 1}`]: "",
            [`r${row + 1}c${col}`]: "",
            [`r${row + 1}c${col + 2}`]: "",
            [`r${row + 2}c${col + 1}`]: "",
          },
        });
        col += 2;
      }
      row += 2;
    }
    return this.boxes;
  };

  chooseSideId() {
    switch (this.difficulty) {
      case "easy":
        return this.getNextClosingSideBoxOrRandom();
      case "medium":
        return this.getNextClosingSideBoxAvoidDoubleCross();
      case "difficult":
        return this.getMinMaxSideId();
      default:
        return this.getNextClosingSideBoxOrRandom();
    }
  }

  getMinMaxSideId() {
    return this.getRandomSideId();
  }

  getAdjacentBoxes(sideId) {
    return this.boxes.filter((box) =>
      Object.keys(box.sideIds).includes(sideId)
    );
  }

  isBorder(sideId) {
    const boxes = this.getAdjacentBoxes(sideId);

    if (boxes.length === 1) return true;
    return false;
  }

  getNextClosingSideBoxAvoidDoubleCross() {
    for (let side of this.sharedSides) {
      if (side[1] !== "") continue;
      const boxes = this.getAdjacentBoxes(side[0]);
      let ownedSides = 0;
      let borderSides = [];
      for (let box of boxes) {
        for (let side of Object.entries(box.sideIds)) {
          if (this.isBorder(side[0]) && side[1] === "") borderSides.push(side);
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

  getNextClosingSideBoxOrRandom() {
    let closingSideBox = this.getNextClosingSideBox();
    if (closingSideBox) {
      return closingSideBox;
    }
    return this.getRandomSideId();
  }

  getNextClosingSideBox() {
    for (let box of this.boxes) {
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

  getRandomSideId() {
    const allSides = this.boxes.reduce((allSideIds, box) => {
      return [
        ...allSideIds,
        ...Object.entries(box.sideIds)
          .filter((side) => {
            return side[1] === "";
          })
          .map((obj) => obj[0]),
      ];
    }, []);
    const availableSides = [...new Set(allSides)];
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
    const boxes = this.getAdjacentBoxes(sideId);
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

  boxIsCompleted = (box) => !Object.values(box.sideIds).includes("");

  markBtnAsOwned(btn, player, selectableClass) {
    btn.classList.add(player.color);
    btn.classList.remove(selectableClass);
    btn.disabled = true;
    btn.tabIndex = -1;
  }

  markBoxAsOwned(box, player) {
    const boxElement = document.getElementById(box.id);
    boxElement.classList.add(player.color);
  }
}

export default DotBoxGame;
