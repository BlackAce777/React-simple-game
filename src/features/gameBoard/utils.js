export const randomArrayInRange = (min, max, n) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

export const getPossiblePoints = (gameBoard, point) => {
  const queue = [];
  const result = [];
  const value = gameBoard[point];
  queue.push(point);
  result.push(point);
  while (queue.length > 0) {
    let cur = queue.pop();
    if (
      cur + 10 <= 99 &&
      gameBoard[cur + 10] === value &&
      result.indexOf(cur + 10) === -1
    ) {
      result.push(cur + 10);
      queue.push(cur + 10);
    }
    if (
      cur - 10 >= 0 &&
      gameBoard[cur - 10] === value &&
      result.indexOf(cur - 10) === -1
    ) {
      result.push(cur - 10);
      queue.push(cur - 10);
    }
    if (
      Math.floor((cur + 1) / 10) === Math.floor(cur / 10) &&
      gameBoard[cur + 1] === value &&
      result.indexOf(cur + 1) === -1
    ) {
      result.push(cur + 1);
      queue.push(cur + 1);
    }
    if (
      Math.floor((cur - 1) / 10) === Math.floor(cur / 10) &&
      gameBoard[cur - 1] === value &&
      result.indexOf(cur - 1) === -1
    ) {
      result.push(cur - 1);
      queue.push(cur - 1);
    }
  }
  return result;
};

export const collapse = (gameBoard, point) => {
  const possiblePoints = getPossiblePoints(gameBoard, point);
  if (possiblePoints.length === 1) return gameBoard;
  possiblePoints.forEach((item) => (gameBoard[item] = 0));
  const collapseVertically = (gameBoard) => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      let col = [];
      for (let j = 0; j < 10; j++) {
        if (gameBoard[i + j * 10] !== 0) col.push(gameBoard[i + j * 10]);
      }
      while (col.length < 10) {
        col.unshift(0);
      }
      for (let j = 0; j < 10; j++) result[i * 10 + j] = col[j];
    }
    return result;
  };
  const rotated = collapseVertically(gameBoard);
  const result = [];
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) result.push(rotated[i + j * 10]);
  return result;
};
