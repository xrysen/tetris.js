const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
let playing = false;
let paused = false;

context.scale(20, 20);

const checkForLines = () => {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; y--) {
    for (let x = 0; x < arena[y].length; x++) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y++;
    player.score += rowCount * 10;
    rowCount *= 2;
  }
};

const collide = (arena, player) => {
  const m = player.matrix;
  const o = player.pos;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
};

const draw = () => {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.pos);
};

const merge = (arena, player) => {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
};

const rotate = (matrix, direction) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < y; x++) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  if (direction > 0) {
    matrix.forEach((row) => row.reverse());
  } else {
    matrix.reverse();
  }
};

const update = (time = 0) => {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval && !paused) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
};

const colours = [
  null,
  "#DC2F31",
  "#E0843B",
  "#E9E635",
  "#8DE543",
  "#1C921A",
  "#4DBCD7",
  "#4744D9",
];

const arena = createMatrix(12, 20);

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.key === "ArrowLeft") {
    playerMove(-1);
  } else if (event.key === "ArrowRight") {
    playerMove(1);
  } else if (event.key === "ArrowDown") {
    playerDrop();
  } else if (event.key === "ArrowUp") {
    playerRotate(1);
  }
});

const updateScore = () => {
  document.getElementById("score").innerText = "Score: " + player.score;
};

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");

startButton.addEventListener("click", () => {
  console.log("click")
  playing = true;
  playerReset();
  update();
});

pauseButton.addEventListener("click", () => {
  console.log("click");
  if (playing && paused) {
    paused = false;
  } else if (playing && !paused) {
    paused = true;
  }
})

if (playing) {
  playerReset();
  update();
}
