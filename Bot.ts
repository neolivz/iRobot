export const Direction = {
  North: "North",
  East: "East",
  West: "West",
  South: "South"
};
export function Bot() {
  let x = undefined;
  let y = undefined;
  let direction = undefined;
  const validate = (x, y, direction) => {
    if (x === undefined || y === undefined || direction === undefined) {
      return false;
    }
    if (x < 0 || x > 4 || y < 0 || y > 4) {
      return false;
    }
    if (Direction[direction] === undefined) {
      return false;
    }
    return true;
  };
  const place = (newX, newY, newDirection) => {
    if (validate(newX, newY, newDirection)) {
      x = newX;
      y = newY;
      direction = newDirection;
      return true;
    } else {
      // invalid placement
      return false;
    }
  };

  const move = () => {
    if (direction === Direction.North) {
      return place(x - 1, y, direction);
    } else if (direction === Direction.South) {
      return place(x + 1, y, direction);
    } else if (direction === Direction.East) {
      return place(x, y + 1, direction);
    } else if (direction === Direction.West) {
      return place(x, y - 1, direction);
    }
    return false;
  };

  const left = () => {
    if (direction === Direction.North) {
      return place(x, y, Direction.West);
    } else if (direction === Direction.West) {
      return place(x, y, Direction.South);
    } else if (direction === Direction.South) {
      return place(x, y, Direction.East);
    } else if (direction === Direction.East) {
      return place(x, y, Direction.North);
    }
    return false;
  };

  const right = () => {
    if (direction === Direction.North) {
      return place(x, y, Direction.East);
    } else if (direction === Direction.East) {
      return place(x, y, Direction.South);
    } else if (direction === Direction.South) {
      return place(x, y, Direction.West);
    } else if (direction === Direction.West) {
      return place(x, y, Direction.North);
    }
    return false;
  };

  const report = () => {
    return { x, y, direction };
  };

  return {
    move,
    left,
    right,
    report,
    place
  };
}
