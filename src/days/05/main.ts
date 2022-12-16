import { DayRunner } from "../../types/DayRunner.ts";
import { d } from "../../utils/debug.ts";

class Stack {
  public id: string;

  private stack: string[];

  constructor(id: string, stack: string[]) {
    this.id = id;
    this.stack = stack;
  }

  public pop(amount = 1, together?: boolean): string[] {
    const res: string[] = [];

    for (let i = 0; i < amount; i++) {
      if (this.stack.length === 0) {
        throw new Error("Tried to pop from an empty stack!");
      }

      res.push(this.stack.pop()!);
    }

    return together ? res.reverse() : res;
  }

  public push(items: string[]): void {
    this.stack.push(...items);
  }

  public insert(items: string[]): void {
    this.stack.unshift(...items);
  }

  public getTopItem(): string | undefined {
    if (this.stack.length === 0) {
      return undefined;
    }

    return this.stack[this.stack.length - 1];
  }

  public toString(): string {
    return `\
Stack ${this.id}:
${[...this.stack].reverse().map((x) => `[${x}]`).join("\n")}\
`;
  }
}

class Instruction {
  public amount: number;
  public from: string;
  public to: string;

  constructor(instruction: string) {
    const matches = instruction.match(/^move (\d+) from (\d+) to (\d+)$/);

    this.amount = +matches![1];
    this.from = matches![2];
    this.to = matches![3];
  }
}

export const p1: DayRunner = async (input) => {
  d("input:", input);

  const [stacksRaw, proceduresRaw] = input.split("\r\n\r\n");

  // Stacks

  d("stacksRaw:", stacksRaw);

  const stackRows = stacksRaw.split("\r\n");

  const stackIds = stackRows.pop()!.split("   ").map((x) => x.trim());

  d("stackIds:", stackIds);

  const stacks: Stack[] = stackIds.map((id) => new Stack(id, []));

  for (const row of stackRows) {
    let j = 0;
    for (let i = 0; i < row.length; i += 4) {
      const item = row[i + 1];

      if (item !== " ") {
        stacks[j].insert([item]);
      }

      j++;
    }
  }

  d("stacks:\n", stacks.map((s) => `${s}`).join("\n\n"));

  // Procedures

  d("proceduresRaw:", proceduresRaw);

  const procedures = proceduresRaw.split("\r\n").map((x) => new Instruction(x));

  d("procedures:", procedures);

  // Perform procedures

  for (let i = 0; i < procedures.length; i++) {
    const instruction = procedures[i];

    const fromStack = stacks.find((s) => s.id === instruction.from)!;
    const toStack = stacks.find((s) => s.id === instruction.to)!;

    toStack.push(fromStack.pop(instruction.amount));

    d("stacks:", `INSTRUCTION ${i + 1}\n`, stacks.map((s) => `${s}`).join("\n\n"));
  }

  d("final stacks:\n", stacks.map((s) => `${s}`).join("\n\n"));

  const topItems = stacks.map((s) => s.getTopItem()).join("");

  return { topItems };
};

export const p2: DayRunner = async (input) => {
  d("input:", input);

  const [stacksRaw, proceduresRaw] = input.split("\r\n\r\n");

  // Stacks

  d("stacksRaw:", stacksRaw);

  const stackRows = stacksRaw.split("\r\n");

  const stackIds = stackRows.pop()!.split("   ").map((x) => x.trim());

  d("stackIds:", stackIds);

  const stacks: Stack[] = stackIds.map((id) => new Stack(id, []));

  for (const row of stackRows) {
    let j = 0;
    for (let i = 0; i < row.length; i += 4) {
      const item = row[i + 1];

      if (item !== " ") {
        stacks[j].insert([item]);
      }

      j++;
    }
  }

  d("stacks:\n", stacks.map((s) => `${s}`).join("\n\n"));

  // Procedures

  d("proceduresRaw:", proceduresRaw);

  const procedures = proceduresRaw.split("\r\n").map((x) => new Instruction(x));

  d("procedures:", procedures);

  // Perform procedures

  for (let i = 0; i < procedures.length; i++) {
    const instruction = procedures[i];

    const fromStack = stacks.find((s) => s.id === instruction.from)!;
    const toStack = stacks.find((s) => s.id === instruction.to)!;

    toStack.push(fromStack.pop(instruction.amount, true));

    d("stacks:", `INSTRUCTION ${i + 1}\n`, stacks.map((s) => `${s}`).join("\n\n"));
  }

  d("final stacks:\n", stacks.map((s) => `${s}`).join("\n\n"));

  const topItems = stacks.map((s) => s.getTopItem()).join("");

  return { topItems };
};
