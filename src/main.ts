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
const testInputArg = Deno.args.find((arg) => /^t\d?$/.test(arg));
const testInputNumber = testInputArg ? (testInputArg === "t" ? "" : testInputArg.substring(1)) : undefined;

const inputRaw =
  (await Deno.readTextFile(`./src/days/${day}/input${testInputArg ? `.test${testInputNumber}` : ""}.txt`));
const input = inputRaw.substring(0, inputRaw.length - 1 - 1);
const solution = await (await import(`./days/${day}/main.ts`))[`p${part}`](
  input,
  debug,
);

console.log("\n === SOLUTION === \n");
console.log(solution);
console.log("\n === SOLUTION === \n");
