import { Debug } from "./types/Debug.ts";

const day = Deno.args[0];

if (!/^\d{2}$/.test(day)) {
  throw new Error("Day must be given as an arg with two digits: `deno run src/main.ts 01 1`");
}

const part = Deno.args[1];

if (!/^\d$/.test(part)) {
  throw new Error("Part must be given as an arg with one digit: `deno run src/main.ts 01 1`");
}

const useDebugLogs = Deno.args.includes("d");
const debug: Debug = useDebugLogs
  ? (...args: any[]) => {
    console.log(...args);
  }
  : () => {
  };
const useTestInput = Deno.args.includes("t");

const input = (await Deno.readTextFile(`./src/days/${day}/input${useTestInput ? ".test" : ""}.txt`)).trim();
const solution = await (await import(`./days/${day}/main.ts`))[`p${part}`](
  input,
  debug,
);

console.log("\n === SOLUTION === \n");
console.log(solution);
console.log("\n === SOLUTION === \n");
