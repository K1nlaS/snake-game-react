// Misc
import { useState, useRef, useEffect } from 'react';
import { useInterval } from '../../utils/useInterval';
import { snakeConstatns } from '../../utils/snake-game-constants';

// Styled Components
import { SNAKE_CONTAINER } from './snake-game.styles';

const SnakeGame = () => {

  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(snakeConstatns.SNAKE_START);
  const [food, setFood] = useState(snakeConstatns.FOOD_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setSnake(snakeConstatns.SNAKE_START);
    setFood(snakeConstatns.FOOD_START);
    setDir([0, -1]);
    setSpeed(snakeConstatns.SPEED);
    setGameOver(false);
  };

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = (e) => {
    const { keyCode } = e;
    const up = snakeConstatns.DIRECTIONS[38];
    const down = snakeConstatns.DIRECTIONS[40];
    const left = snakeConstatns.DIRECTIONS[37];
    const right = snakeConstatns.DIRECTIONS[39];

    if (!(keyCode >= 37 && keyCode <= 40)) return;

    if ((dir[0] === up[0] && dir[1] === up[1]) || (dir[0] === down[0] && dir[1] === down[1])) {
      if (snakeConstatns.DIRECTIONS[keyCode][0] === left[0] && snakeConstatns.DIRECTIONS[keyCode][1] === left[1]) {
        setDir(snakeConstatns.DIRECTIONS[keyCode]);
      }

      if (snakeConstatns.DIRECTIONS[keyCode][0] === right[0] && snakeConstatns.DIRECTIONS[keyCode][1] === right[1]) {
        setDir(snakeConstatns.DIRECTIONS[keyCode]);
      }
    }

    if ((dir[0] === left[0] && dir[1] === left[1]) || (dir[0] === right[0] && dir[1] === right[1])) {
      if (snakeConstatns.DIRECTIONS[keyCode][0] === down[0] && snakeConstatns.DIRECTIONS[keyCode][1] === down[1]) {
        setDir(snakeConstatns.DIRECTIONS[keyCode]);
      }

      if (snakeConstatns.DIRECTIONS[keyCode][0] === up[0] && snakeConstatns.DIRECTIONS[keyCode][1] === up[1]) {
        setDir(snakeConstatns.DIRECTIONS[keyCode]);
      }
    }

  };

  const createFood = () => {
    return food.map((_, i) => Math.floor(Math.random() * snakeConstatns.CANVAS_SIZE[i] / snakeConstatns.SCALE));
  };

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * snakeConstatns.SCALE >= snakeConstatns.CANVAS_SIZE[0]
      || piece[0] < 0
      || piece[1] * snakeConstatns.SCALE >= snakeConstatns.CANVAS_SIZE[1]
      || piece[1] < 0
    ) {
      return true;
    }

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
  };

  const checkFoodCollision = (newSnake) => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newApple = createFood();
      while (checkCollision(newApple, newSnake)) {
        newApple = createFood();
      }
      setFood(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);

    if (checkCollision(newSnakeHead)) endGame();
    if (!checkFoodCollision(snakeCopy)) snakeCopy.pop();

    setSnake(snakeCopy);
  };

  useInterval(() => gameLoop(), speed);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.setTransform(snakeConstatns.SCALE, 0, 0, snakeConstatns.SCALE, 0, 0);
    ctx.clearRect(0, 0, snakeConstatns.CANVAS_SIZE[0], snakeConstatns.CANVAS_SIZE[1]);
    ctx.fillStyle = "pink";

    snake.map(([x, y]) => ctx.fillRect(x, y, 1, 1));

    ctx.fillStyle = "cyan";
    ctx.fillRect(food[0], food[1], 1, 1);

  }, [snake, food, gameOver]);

  return (
    <SNAKE_CONTAINER role="button" tabIndex="0" onKeyDown={moveSnake}>
      <canvas
        ref={canvasRef}
        width={`${snakeConstatns.CANVAS_SIZE[0]}px`}
        height={`${snakeConstatns.CANVAS_SIZE[1]}px`}
      />

      {gameOver && <div>GAME OVER</div>}

      <button onClick={startGame}>Start Game</button>
    </SNAKE_CONTAINER>
  );
};

export default SnakeGame;