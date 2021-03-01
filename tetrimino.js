const createMatrix = (width, height) => {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
};

const createPiece = (type) => {
  if (type === "T") {
    return [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];
  } else if (type === "O") {
    return [
      [2, 2],
      [2, 2],
    ];
  } else if (type === "L") {
    return [
      [3, 0, 0],
      [3, 0, 0],
      [3, 3, 0],
    ];
  } else if (type === "J") {
    return [
      [0, 0, 4],
      [0, 0, 4],
      [0, 4, 4],
    ];
  } else if (type === "I") {
    return [
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
    ];
  } else if (type === "S") {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ];
  } else if (type === "Z") {
    return [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ];
  }
};

const drawMatrix = (matrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colours[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
};
