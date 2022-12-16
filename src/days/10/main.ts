import { DayRunner } from "../../types/DayRunner.ts";
import { dn, dns } from "../../utils/debug.ts";

class Command {
  public command: string;
  public arg?: number;
  public lifetime: number;
  public currentCycle = 0;

  constructor(command: string, arg?: number) {
    this.command = command ;
    this.arg = arg;

    switch (command) {
      case "addx":
        this.lifetime = 2;
        break;
      case "noop":
        this.lifetime = 1;
        break;
      default:
        throw new Error(`Unsupported command: ${command}`);
    }
  }

  public toString(): string {
    return `${this.command} ${this.arg ?? "-"} (${this.currentCycle}/${this.lifetime})`;
  }
}

interface Registers {
  X: number;
}

interface Cycle {
  start?: Registers;
  end?: Registers;
}

class Machine {
  public registers: Registers = { X: 1 };
  public currentCycle = 0;
  public currentCommand?: Command;
  public registerCycleList: Cycle[] = [];
  public isDone = false;
  public commandStack: Command[];

  constructor(commands: Command[]) {
    this.commandStack = commands;
  }

  public execute(): void {
    const cycle: Cycle = { start: { ...this.registers } };

    if (!this.currentCommand) {
      this.currentCommand = this.commandStack.pop();
    }

    switch (this.currentCommand!.command) {
      case "addx":
        if (this.currentCommand!.currentCycle === this.currentCommand!.lifetime - 1) {
          this.registers.X += this.currentCommand!.arg!;
        }
        break;
      case "noop":
        break;
    }

    this.currentCommand!.currentCycle++;

    if (this.currentCommand!.currentCycle === this.currentCommand!.lifetime) {
      this.currentCommand = undefined;
    }

    cycle.end = { ...this.registers };

    this.registerCycleList.push(cycle);

    if (!this.currentCommand && this.commandStack.length === 0) {
      this.isDone = true;
    }

    this.currentCycle++;
  }

  public toString(): string {
    return `\
Registers: ${JSON.stringify(this.registers)}
Current cycle: ${this.currentCycle}
#Cycles: ${this.registerCycleList.length}
Cycle: ${JSON.stringify(this.registerCycleList[this.currentCycle - 1])}
Current command: ${this.currentCommand?.toString() ?? "-"}
isDone? ${this.isDone ? "YES" : "NO"}
`;
  }
}

interface SignalStrength {
  registers: Registers;
  strength: number;
}

export const p1: DayRunner = async (input) => {
  dn("input", input);

  const parts = input.split("\r\n").map((row) => row.split(" "));

  dn("parts", parts);

  const commands = parts.map((part) => new Command(part[0], typeof part[1] !== "undefined" ? +part[1] : undefined));

  dn("commands", commands);

  const machine = new Machine(commands.reverse());

  const signalStrengths: Record<number, SignalStrength> = {};
  while (!machine.isDone) {
    machine.execute();
    dns("machine", machine);

    const currentCycle = machine.currentCycle;
    if (currentCycle === 20 || ((currentCycle - 20) % 40 === 0)) {
      signalStrengths[currentCycle] = { registers: machine.registerCycleList[machine.currentCycle - 1].start!, strength: machine.registerCycleList[machine.currentCycle - 1].start!.X * machine.currentCycle };
    }
  }

  dns("Final state", machine);

  dn("Cycles", machine.registerCycleList);

  dn("Signal strengths", signalStrengths);

  const totalSignalStrength = Object.values(signalStrengths).reduce((r, c) => r + c.strength, 0);

  return { totalSignalStrength };
};

export const p2: DayRunner = async (input) => {
};
