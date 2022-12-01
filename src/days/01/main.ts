import { DayRunner } from "../../types/DayRunner.ts";

export const p1: DayRunner = async (t) => {
  const input = await Deno.readTextFile(`./src/days/01/input${t ? ".test" : ""}.txt`);

  // console.log(input);

  const parts = input.trim().split("\r\n\r\n").map((x) => x.split("\r\n").map((y) => +y));

  // console.log(parts);

  const maxes = parts.map((x) => x.reduce((r, c) => r + c, 0));

  // console.log(maxes);

  let elf = 0;
  let calories = 0;
  for (let i = 0; i < maxes.length; i++) {
    const m = maxes[i];

    if (m > calories) {
      calories = m;
      elf = i + 1;
    }
  }

  console.log({ elf, calories });
};

export const p2: DayRunner = async (t) => {
  const input = await Deno.readTextFile(`./src/days/01/input${t ? ".test" : ""}.txt`);

  // console.log(input);

  const parts = input.trim().split("\r\n\r\n").map((x) => x.split("\r\n").map((y) => +y));

  // console.log(parts);

  const maxes = parts.map((x) => x.reduce((r, c) => r + c, 0));

  // console.log(maxes);

  let elf = 0;
  let calories = 0;
  for (let i = 0; i < maxes.length; i++) {
    const m = maxes[i];

    if (m > calories) {
      calories = m;
      elf = i + 1;
    }
  }

  console.log({ elf, calories });
};
