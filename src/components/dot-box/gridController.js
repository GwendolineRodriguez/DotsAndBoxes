class GridController {
  constructor(boxNumber, classes) {
    const rootSqrt = Math.sqrt(boxNumber);
    const rowCount = rootSqrt * 2 + 1;
    this.classes = classes;
    this.boxes = this.generateBoxes(boxNumber);
    this.setupCssGrid(rowCount);
    this.sharedSides = this.getSharedSides();
  }

  get availableSides() {
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
    return [...new Set(allSides)];
  }

  markBtnAsOwned(btn, player) {
    btn.classList.add(player.color);
    btn.classList.remove(`${this.classes.selectable}`);
    btn.disabled = true;
    btn.tabIndex = -1;
  }

  markBoxAsOwned(box, player) {
    const boxElement = document.getElementById(box.id);
    boxElement.classList.add(player.color);
  }

  boxIsCompleted = (box) => !Object.values(box.sideIds).includes("");

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

  getAdjacentBoxes(sideId) {
    return this.boxes.filter((box) =>
      Object.keys(box.sideIds).includes(sideId)
    );
  }

  isBorder(sideId) {
    const commonBoxes = this.getAdjacentBoxes(sideId);

    if (commonBoxes.length === 1) return true;
    return false;
  }

  generateBoxes = (boxNumber) => {
    let boxes = [];
    let maxIdx = Math.sqrt(boxNumber);
    let row = 1;
    let col = 1;
    for (let x = 0; x < maxIdx; x++) {
      col = 1;
      for (let i = 0; i < maxIdx; i++) {
        boxes.push({
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
    return boxes;
  };

  setupCssGrid(rowCount) {
    const grid = document.getElementById(`${this.classes.dotboxGrid}`);
    let gridTempRow = "";
    for (let i = 1; i < rowCount; i += 2) {
      gridTempRow += "auto 1fr ";
    }
    gridTempRow += "auto";
    let gridTempCol = gridTempRow;
    grid.style["grid-template"] = `${gridTempRow} / ${gridTempCol}`;
  }
}

export default GridController;
