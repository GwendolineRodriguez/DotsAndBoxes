class DotBoxGame {
  constructor(boxNumber) {
    this.boxes = this.generateBoxes(boxNumber);
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

  getRandomSideId = () => {
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
    return availableSides[i];
  };

  boxIsCompleted = (box) => !Object.values(box.sideIds).includes("");

  markBtnAsOwned = (btn, player, selectableClass) => {
    btn.classList.add(player.color);
    btn.classList.remove(selectableClass);
    btn.disabled = true;
    btn.tabIndex = -1;
  };

  markBoxAsOwned = (box, player) => {
    const boxElement = document.getElementById(box.id);
    boxElement.classList.add(player.color);
  };
}

export default DotBoxGame;
