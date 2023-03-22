export const randomArrayInRange = (min, max, n) => Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);

export const getPossiblePoints = (gameBoard, point, flag) => {
   if((point - 10) >= 0 && gameBoard[point - 10] === gameBoard[point] && flag[point - 10] === 0) {
    flag[point - 10] = 1;
    return [point, ...getPossiblePoints(gameBoard, point - 10, flag)];
  }
  if((point + 10) <= 99 && gameBoard[point + 10] === gameBoard[point] && flag[point + 10] === 0) {
    flag[point + 10] = 1;
    return [point, ...getPossiblePoints(gameBoard, point + 10, flag)];
  }
  if(Math.floor((point + 1) / 10) === Math.floor((point) / 10) && gameBoard[point + 1] === gameBoard[point] && flag[point + 1] === 0) {
    flag[point + 1] = 1;
    return [point, ...getPossiblePoints(gameBoard, point + 1, flag)];
  }
  if(Math.floor((point - 1) / 10) === Math.floor((point) / 10) && gameBoard[point - 1] === gameBoard[point] && flag[point - 1] === 0) {
    flag[point - 1] = 1;
    return [point, ...getPossiblePoints(gameBoard, point -1, flag)];
  }
  return [point];
}
export const collapse = (gameBoard, point) => {
  const possiblePoints = getPossiblePoints(gameBoard, point, new Array(100).fill(0));
  if(possiblePoints.length === 1)
    return;
  possiblePoints.forEach((item) => gameBoard[item] = 0);
  const collapseVertically = (gameBoard) => {
    const result = [];
    for(let i = 0; i < 10; i ++) {
      let col = [];
      for(let j = 0; j < 10; j ++) {
        if(gameBoard[i + j * 10] !== 0)
          col.push(gameBoard[i + j * 10]);
      }
      while(col.length < 10)
      {
        col.push(0);
      }
      result.push(col);
    }
    return result.flat(1);
  }
  return collapseVertically(gameBoard);
}