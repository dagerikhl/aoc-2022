import { DayRunner } from "../../types/DayRunner.ts";
import { d } from "../../utils/debug.ts";

type Indices = [number, number];
interface Coordinates {
  x: number;
  y: number;
}

const indicesToCoordinates = (indices: Indices): Coordinates => ({ x: indices[1], y: indices[0] });
const coordinatesToIndices = (coordinates: Coordinates): Indices => [coordinates.y, coordinates.x];

class Tree {
  public map: Map;
  public height: number;
  public coordinates: Coordinates;

  constructor(map: Map, height: number, coordinates: Coordinates) {
    this.map = map;
    this.height = height;
    this.coordinates = coordinates;
  }

  public isVisibleFromTop(): boolean {
    const isEdge = this.coordinates.y === 0;
    const coordinatesToCheck = Array.from({ length: this.coordinates.y }).map((_, i) => i);
    const treesInLine = this.map.trees.filter((tree) =>
      tree.height >= this.height && tree.coordinates.x === this.coordinates.x &&
      coordinatesToCheck.includes(tree.coordinates.y)
    );

    return isEdge || treesInLine.length === 0;
  }

  public isVisibleFromRight(): boolean {
    const isEdge = this.coordinates.x === this.map.width - 1;
    const coordinatesToCheck = Array.from({ length: this.map.width - this.coordinates.x }).map((_, i) =>
      this.map.width - i
    );
    const treesInLine = this.map.trees.filter((tree) =>
      tree.height >= this.height && tree.coordinates.y === this.coordinates.y &&
      coordinatesToCheck.includes(tree.coordinates.x)
    );

    return isEdge || treesInLine.length === 0;
  }

  public isVisibleFromBottom(): boolean {
    const isEdge = this.coordinates.y === this.map.height - 1;
    const coordinatesToCheck = Array.from({ length: this.map.height - this.coordinates.y }).map((_, i) =>
      this.map.height - i
    );
    const treesInLine = this.map.trees.filter((tree) =>
      tree.height >= this.height && tree.coordinates.x === this.coordinates.x &&
      coordinatesToCheck.includes(tree.coordinates.y)
    );

    return isEdge || treesInLine.length === 0;
  }

  public isVisibleFromLeft(): boolean {
    const isEdge = this.coordinates.x === 0;
    const coordinatesToCheck = Array.from({ length: this.coordinates.x }).map((_, i) => i);
    const treesInLine = this.map.trees.filter((tree) =>
      tree.height >= this.height && tree.coordinates.y === this.coordinates.y &&
      coordinatesToCheck.includes(tree.coordinates.x)
    );

    return isEdge || treesInLine.length === 0;
  }

  public countVisibleTreesTop(): number {
    const isEdge = this.coordinates.y === 0;

    if (isEdge) {
      return 0;
    }

    let count = 0;

    const coordinatesToCheck = Array.from({ length: this.coordinates.y }).map((_, i) => this.coordinates.y - i - 1);

    for (const y of coordinatesToCheck) {
      const tree = this.map.trees.find((t) => t.coordinates.x === this.coordinates.x && t.coordinates.y === y)!;

      if (tree.height < this.height) {
        count++;
      } else {
        count++;
        break;
      }
    }

    return count;
  }

  public countVisibleTreesRight(): number {
    const isEdge = this.coordinates.x === this.map.width - 1;

    if (isEdge) {
      return 0;
    }

    let count = 0;

    const coordinatesToCheck = Array.from({ length: this.map.width - this.coordinates.x - 1 }).map((_, i) =>
      this.coordinates.x + 1 + i
    );

    for (const x of coordinatesToCheck) {
      const tree = this.map.trees.find((t) => t.coordinates.y === this.coordinates.y && t.coordinates.x === x)!;

      if (tree.height < this.height) {
        count++;
      } else {
        count++;
        break;
      }
    }

    return count;
  }

  public countVisibleTreesBottom(): number {
    const isEdge = this.coordinates.y === this.map.height - 1;

    if (isEdge) {
      return 0;
    }

    let count = 0;

    const coordinatesToCheck = Array.from({ length: this.map.height - this.coordinates.y - 1 }).map((_, i) =>
      this.coordinates.y + 1 + i
    );

    for (const y of coordinatesToCheck) {
      const tree = this.map.trees.find((t) => t.coordinates.x === this.coordinates.x && t.coordinates.y === y)!;

      if (tree.height < this.height) {
        count++;
      } else {
        count++;
        break;
      }
    }

    return count;
  }

  public countVisibleTreesLeft(): number {
    const isEdge = this.coordinates.x === 0;

    if (isEdge) {
      return 0;
    }

    let count = 0;

    const coordinatesToCheck = Array.from({ length: this.coordinates.x }).map((_, i) => this.coordinates.x - i - 1);

    for (const x of coordinatesToCheck) {
      const tree = this.map.trees.find((t) => t.coordinates.y === this.coordinates.y && t.coordinates.x === x)!;

      if (tree.height < this.height) {
        count++;
      } else {
        count++;
        break;
      }
    }

    return count;
  }

  public getScenicScore(): number {
    return [
      this.countVisibleTreesTop(),
      this.countVisibleTreesRight(),
      this.countVisibleTreesBottom(),
      this.countVisibleTreesLeft(),
    ].reduce((r, c) => r * c, 1);
  }

  public isVisible(): boolean {
    return this.isVisibleFromTop() || this.isVisibleFromRight() || this.isVisibleFromBottom() ||
      this.isVisibleFromLeft();
  }

  public toString(): string {
    return `[${this.coordinates.x},${this.coordinates.y}]: ${this.height}`;
  }
}

class Map {
  public height: number;
  public width: number;
  public trees: Tree[];

  constructor(treeHeights: number[][]) {
    this.height = treeHeights.length;
    this.width = treeHeights[0].length;
    this.trees = treeHeights.flatMap((treeRow, i) =>
      treeRow.map((treeHeight, j) => new Tree(this, treeHeight, indicesToCoordinates([i, j])))
    );
  }

  public toString(): string {
    const printMap: string[][] = Array.from({ length: this.height }).map(() => Array.from({ length: this.width }));

    for (const tree of this.trees) {
      const [i, j] = coordinatesToIndices(tree.coordinates);
      printMap[i][j] = `${tree.height}`;
    }

    return `\n${printMap.map((row) => row.join("")).join("\n")}`;
  }
}

export const p1: DayRunner = async (input) => {
  d("input:", input);

  const parts = input.split("\r\n").map((row) => row.split("").map((t) => +t));

  d("parts:", parts);

  const map = new Map(parts);

  d("map:", map.toString());
  d("map trees:", map.trees.map((tree) => tree.toString()).join("\n"));

  const testTree = map.trees.find((tree) => tree.coordinates.x === 3 && tree.coordinates.y === 3)!;

  d("testTree", {
    top: testTree.isVisibleFromTop(),
    right: testTree.isVisibleFromRight(),
    bottom: testTree.isVisibleFromBottom(),
    left: testTree.isVisibleFromLeft(),
  });

  const visibleTrees = map.trees.filter((tree) => tree.isVisible());

  const count = visibleTrees.length;

  return { count };
};

export const p2: DayRunner = async (input) => {
  d("input:", input);

  const parts = input.split("\r\n").map((row) => row.split("").map((t) => +t));

  d("parts:", parts);

  const map = new Map(parts);

  d("map:", map.toString());
  d("map trees:", map.trees.map((tree) => tree.toString()).join("\n"));

  const testTree = map.trees.find((tree) => tree.coordinates.x === 2 && tree.coordinates.y === 3)!;

  d("testTree", {
    score: testTree.getScenicScore(),
    top: testTree.countVisibleTreesTop(),
    right: testTree.countVisibleTreesRight(),
    bottom: testTree.countVisibleTreesBottom(),
    left: testTree.countVisibleTreesLeft(),
  });

  const scenicScores = map.trees.map((tree) => tree.getScenicScore());

  d("scenicScores:", scenicScores);

  const topScore = Math.max(...scenicScores);

  return { topScore };
};
