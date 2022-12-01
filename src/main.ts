import { p1 as d01p1, p2 as d01p2 } from "./days/01/main.ts";
import { DayRunner } from "./types/DayRunner.ts";

const DAY_MAP: Record<string, Record<string, DayRunner>> = {
  "01": {
    "1": d01p1,
    "2": d01p2,
  },
};

if (!/^\d{2}$/.test(Deno.args[0])) {
  throw new Error("Day must be given as an arg with two digits: `deno run src/main.ts 01 1`");
}

if (!/^\d$/.test(Deno.args[1])) {
  throw new Error("Part must be given as an arg with one digit: `deno run src/main.ts 01 1`");
}

await DAY_MAP[Deno.args[0]][Deno.args[1]](Deno.args.includes("t"));
