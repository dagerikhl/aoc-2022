import { DayRunner } from "../../types/DayRunner.ts";

const getPriorityOfLetter = (letter: string): number => {
  if (/^[a-z]$/.test(letter)) {
    return letter.charCodeAt(0) - 96;
  } else {
    return letter.charCodeAt(0) - 65 + 27;
  }
};

export const p1: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n").map((x) => {
    const middle = x.length / 2;

    return [x.slice(0, middle), x.slice(middle)];
  });

  d("parts:", parts);

  const commonItems = parts.map(([a, b]) => a.split("").find((x) => b.includes(x))!);

  d("commonItems:", commonItems);

  const priorities = commonItems.map(getPriorityOfLetter);

  d("priorities:", priorities);

  const sum = priorities.reduce((r, c) => r + c, 0);

  return { sum };
};

export const p2: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n").reduce<string[][]>((r, c, i, o) => {
    if (i % 3 === 2) {
      r.push([o[i - 2], o[i - 1], o[i]]);
    }

    return r;
  }, []);

  d("parts:", parts);

  const badges = parts.map((x) => x[0].split("").find((y) => x[1].includes(y) && x[2].includes(y))!);

  d("badges:", badges);

  const priorities = badges.map(getPriorityOfLetter);

  d("priorities:", priorities);

  const sum = priorities.reduce((r, c) => r + c, 0);

  return { sum };
};
