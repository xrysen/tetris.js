let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

const playerDrop = () => {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    checkForLines();
    updateScore();
  }
  dropCounter = 0;
};

const playerMove = (direction) => {
  player.pos.x += direction;
  if (collide(arena, player)) {
    player.pos.x -= direction;
  }
};

const playerRotate = (direction) => {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, direction);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -direction);
      player.pos.x = pos;
      return;
    }
  }
};

const playerReset = () => {
  const pieces = "ILJOTSZ";
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);

  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
  }
}

const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
  score: 0, 
  lineCount: 0,
  level: 0,
};