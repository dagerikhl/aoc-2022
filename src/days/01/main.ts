import { DayRunner } from "../../types/DayRunner.ts";

export const p1: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.trim().split("\r\n\r\n").map((x) => x.split("\r\n").map((y) => +y));

  d("parts:", parts);

  const maxes = parts.map((x) => x.reduce((r, c) => r + c, 0));

  d("maxes:", maxes);

  let elf = 0;
  let calories = 0;
  for (let i = 0; i < maxes.length; i++) {
    const m = maxes[i];

    if (m > calories) {
      calories = m;
      elf = i + 1;
    }
  }

  return ({ elf, calories });
};

export const p2: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.trim().split("\r\n\r\n").map((x) => x.split("\r\n").map((y) => +y));

  d("parts:", parts);

  const maxes = parts.map((x) => x.reduce((r, c) => r + c, 0));

  d("maxes:", maxes);

  const elfMap = maxes.map((x, i) => ({ elf: i + 1, max: x }));

  d("elfMap:", elfMap);

  const sortedElves = elfMap.sort((a, b) => b.max - a.max);

  d("sortedElves:", sortedElves);

  const topThreeElves = sortedElves.slice(0, 3);

  d("topThreeElves:", topThreeElves)

  const totalCalories = topThreeElves.reduce((r, c) => r + c.max, 0);

  return { totalCalories };
};
