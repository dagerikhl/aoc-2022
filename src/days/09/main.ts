import { DayRunner } from "../../types/DayRunner.ts";
import { d, dn } from "../../utils/debug.ts";

interface Coords {
  x: number;
  y: number;
}

enum Dir {
  Up = "U",
  Right = "R",
  Down = "D",
  Left = "L",
}
enum DiagonalDir {
  UpRight = "UR",
  RightDown = "RD",
  DownLeft = "DL",
  LeftUp = "LU",
}

class Command {
  public dir: Dir;
  public steps: number;

  constructor(dir: string, steps: number) {
    this.dir = dir as Dir;
    this.steps = steps;
  }
}

class Node {
  public pos: Coords;
  public visited: Coords[];

  constructor(root: Coords) {
    this.pos = root;
    this.visited = [root];
  }

  public move(dir: Dir): void {
    let newPos: Coords;
    switch (dir) {
      case Dir.Up:
        newPos = { x: this.pos.x, y: this.pos.y + 1 };
        break;
      case Dir.Right:
        newPos = { x: this.pos.x + 1, y: this.pos.y };
        break;
      case Dir.Down:
        newPos = { x: this.pos.x, y: this.pos.y - 1 };
        break;
      case Dir.Left:
        newPos = { x: this.pos.x - 1, y: this.pos.y };
        break;
    }

    this.visited.push(newPos);
    this.pos = newPos;
  }

  public moveDiagonally(dir: DiagonalDir): void {
    let newPos: Coords;
    switch (dir) {
      case DiagonalDir.UpRight:
        newPos = { x: this.pos.x + 1, y: this.pos.y + 1 };
        break;
      case DiagonalDir.RightDown:
        newPos = { x: this.pos.x + 1, y: this.pos.y - 1 };
        break;
      case DiagonalDir.DownLeft:
        newPos = { x: this.pos.x - 1, y: this.pos.y - 1 };
        break;
      case DiagonalDir.LeftUp:
        newPos = { x: this.pos.x - 1, y: this.pos.y + 1 };
        break;
    }

    this.visited.push(newPos);
    this.pos = newPos;
  }

  public getUniqueVisits(): number {
    return new Set(this.visited.map(({ x, y }) => `${x}_${y}`)).size;
  }
}

const moveTailAfterHead = (head: Node, tail: Node): void => {
  if (Math.abs(head.pos.x - tail.pos.x) <= 1 && Math.abs(head.pos.y - tail.pos.y) <= 1) {
    return;
  }

  if (head.pos.y === tail.pos.y + 2 && head.pos.x === tail.pos.x) {
    tail.move(Dir.Up);
  } else if (head.pos.y === tail.pos.y && head.pos.x === tail.pos.x + 2) {
    tail.move(Dir.Right);
  } else if (head.pos.y === tail.pos.y - 2 && head.pos.x === tail.pos.x) {
    tail.move(Dir.Down);
  } else if (head.pos.y === tail.pos.y && head.pos.x === tail.pos.x - 2) {
    tail.move(Dir.Left);
  } else if (head.pos.y > tail.pos.y && head.pos.x > tail.pos.x) {
    dn("Tail moving in dir", DiagonalDir.UpRight);
    tail.moveDiagonally(DiagonalDir.UpRight);
  } else if (head.pos.y < tail.pos.y && head.pos.x > tail.pos.x) {
    dn("Tail moving in dir", DiagonalDir.RightDown);
    tail.moveDiagonally(DiagonalDir.RightDown);
  } else if (head.pos.y < tail.pos.y && head.pos.x < tail.pos.x) {
    dn("Tail moving in dir", DiagonalDir.DownLeft);
    tail.moveDiagonally(DiagonalDir.DownLeft);
  } else if (head.pos.y > tail.pos.y && head.pos.x < tail.pos.x) {
    dn("Tail moving in dir", DiagonalDir.LeftUp);
    tail.moveDiagonally(DiagonalDir.LeftUp);
  }
};

export const p1: DayRunner = async (input) => {
  dn("input", input);

  const parts = input.split("\r\n").map((row) => row.split(" "));

  dn("parts", parts);

  const commands = parts.map((part) => new Command(part[0], +part[1]));

  dn("commands", commands);

  const start: Coords = { x: 0, y: 0 };
  const head = new Node(start);
  const tail = new Node(start);

  for (const command of commands) {
    dn("  Tail pos", tail.pos);
    d(`== ${command.dir} ${command.steps} ==`);

    for (let i = 0; i < command.steps; i++) {
      head.move(command.dir);

      d("Step =>", i);
      moveTailAfterHead(head, tail);
    }
  }

  dn("head visits", head.visited);
  dn("head unique visits", head.getUniqueVisits());

  dn("tail visits", tail.visited);

  const uniqueTailVisits = tail.getUniqueVisits();

  return { uniqueTailVisits };
};

export const p2: DayRunner = async (input) => {
  dn("input", input);

  const parts = input.split("\r\n").map((row) => row.split(" "));

  dn("parts", parts);

  const commands = parts.map((part) => new Command(part[0], +part[1]));

  dn("commands", commands);

  const start: Coords = { x: 0, y: 0 };
  const knots: Node[] = [
    new Node(start),
    new Node(start),
    new Node(start),
    new Node(start),
    new Node(start),
    new Node(start),
    new Node(start),
    new Node(start),
    new Node(start),
    new Node(start),
  ];
  const head = knots[0];
  const tail = knots[knots.length - 1];

  for (const command of commands) {
    dn("  Tail pos", tail.pos);
    d(`== ${command.dir} ${command.steps} ==`);

    for (let i = 0; i < command.steps; i++) {
      head.move(command.dir);

      d("Step =>", i);
      for (let j = 1; j < knots.length; j++) {
        moveTailAfterHead(knots[j - 1], knots[j]);
      }
    }
  }

  dn("head visits", head.visited);
  dn("head unique visits", head.getUniqueVisits());

  dn("tail visits", tail.visited);

  const uniqueTailVisits = tail.getUniqueVisits();

  return { uniqueTailVisits };
};
