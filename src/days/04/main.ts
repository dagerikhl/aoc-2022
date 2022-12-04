import { DayRunner } from "../../types/DayRunner.ts";

type Range = [number, number];

const checkContains = (a: Range, b: Range): boolean => {
  return a[0] >= b[0] && a[1] <= b[1];
};

export const p1: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n").map((x) => x.split(",").map<Range>((y) => y.split("-").map((z) => +z) as Range));

  d("parts:", parts);

  let count = 0;
  for (const pair of parts) {
    d("pair:", pair);

    if (checkContains(pair[0], pair[1]) || checkContains(pair[1], pair[0])) {
      count++;
    }
  }

  return { count };
};

const checkOverlap = (a: Range, b: Range): boolean => {
  const itemsA: number[] = [];
  for (let i = a[0]; i <= a[1]; i++) {
    itemsA.push(i);
  }
  const itemsB: number[] = [];
  for (let i = b[0]; i <= b[1]; i++) {
    itemsB.push(i);
  }

  return itemsA.some((x) => itemsB.includes(x));
};

export const p2: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n").map((x) => x.split(",").map<Range>((y) => y.split("-").map((z) => +z) as Range));

  d("parts:", parts);

  let count = 0;
  for (const pair of parts) {
    d("pair:", pair);

    if (checkOverlap(pair[0], pair[1]) || checkOverlap(pair[1], pair[0])) {
      count++;
    }
  }

  return { count };
};
