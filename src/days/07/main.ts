import { DayRunner } from "../../types/DayRunner.ts";

const indent = (level: number): string => "  ".repeat(level);

class File {
  private name: string;
  private readonly size: number;
  public parent: Dir;

  public level: number;

  constructor(name: string, size: number, parent: Dir) {
    this.name = name;
    this.size = size;
    this.parent = parent;

    this.level = parent.level + 1;
  }

  public getSize(): number {
    return this.size;
  }

  public toString(): string {
    return `${indent(this.level)}- ${this.name} (file, size=${this.size}) (level=${this.level})`;
  }
}

class Dir {
  public name: string;
  private dirs: Dir[];
  private files: File[];
  public parent?: Dir;

  public level: number;

  constructor(name: string, dirs: Dir[], files: File[], parent?: Dir) {
    this.name = name;
    this.dirs = dirs;
    this.files = files;
    this.parent = parent;

    this.level = parent ? parent.level + 1 : 0;
  }

  public getSize(): number {
    return this.files.reduce((r, c) => r + c.getSize(), 0) + this.dirs.reduce((r, c) => r + c.getSize(), 0);
  }

  public getDirs(): Dir[] {
    return this.dirs;
  }

  public addDir(name: string): Dir {
    const existingDir = this.dirs.find((dir) => dir.name === name);
    if (existingDir) {
      return existingDir;
    }

    const newDir = new Dir(name, [], [], this);
    this.dirs.push(newDir);

    return newDir;
  }

  public addFile(file: File): void {
    this.files.push(file);
  }

  public toString(): string {
    return `\
${indent(this.level)}- ${this.name} (dir) (level=${this.level})${this.dirs.length > 0 ? "\n" : ""}\
${this.dirs.map((dir) => dir.toString()).join("\n")}${this.files.length > 0 ? "\n" : ""}\
${this.files.map((file) => file.toString()).join("\n")}\
`;
  }
}

class Command {
  public command: "cd" | "ls";
  public arg?: string;

  constructor(line: string) {
    const parts = line.replace(/^\$ /, "").split(" ");

    this.command = parts[0] as "cd" | "ls";
    this.arg = parts[1];
  }
}

const findDirsOfMaxSize = (root: Dir, maxSize: number): Dir[] => {
  let dirs: Dir[] = [];

  if (root.level === 0 && root.getSize() <= maxSize) {
    dirs.push(root);
  }

  for (const dir of root.getDirs()) {
    if (dir.getSize() <= maxSize) {
      dirs.push(dir);
    }

    dirs = [...dirs, ...findDirsOfMaxSize(dir, maxSize)];
  }

  return dirs;
};

export const p1: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n");

  d("parts:", parts);

  const root = new Dir("/", [], []);

  let command: Command | undefined;
  let currentDir: Dir = root;
  for (const line of parts) {
    if (line.startsWith("$")) {
      command = new Command(line);

      if (command.command === "cd") {
        if (command.arg === "/") {
          currentDir = root;
        } else if (command.arg === "..") {
          currentDir = currentDir.parent!;
        } else if (command.arg) {
          currentDir = currentDir.addDir(command.arg);
        }
      } else if (command.command === "ls") {
      }
    } else {
      const lineParts = line.split(" ");

      if (lineParts[0] === "dir") {
        currentDir.addDir(lineParts[1]);
      } else {
        currentDir.addFile(new File(lineParts[1], +lineParts[0], currentDir));
      }
    }
  }

  d("root:", root.toString());

  const rootSize = root.getSize();

  d("rootSize:", rootSize);

  const dirsOfMaxSize = findDirsOfMaxSize(root, 100000);

  const totalSize = dirsOfMaxSize.reduce((r, c) => r + c.getSize(), 0);

  return { totalSize };
};

const DISK_SIZE = 70000000;
const MIN_SIZE = 30000000;

const findDeletionCandidates = (root: Dir, minSize: number): Dir[] => {
  let dirs: Dir[] = [];

  if (root.level === 0 && root.getSize() > minSize) {
    dirs.push(root);
  }

  for (const dir of root.getDirs()) {
    if (dir.getSize() > minSize) {
      dirs.push(dir);
    }

    dirs = [...dirs, ...findDeletionCandidates(dir, minSize)];
  }

  return dirs;
};

const findSmallestDir = (dirs: Dir[]): Dir => dirs.sort((a, b) => a.getSize() - b.getSize())[0];

export const p2: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n");

  d("parts:", parts);

  const root = new Dir("/", [], []);

  let command: Command | undefined;
  let currentDir: Dir = root;
  for (const line of parts) {
    if (line.startsWith("$")) {
      command = new Command(line);

      if (command.command === "cd") {
        if (command.arg === "/") {
          currentDir = root;
        } else if (command.arg === "..") {
          currentDir = currentDir.parent!;
        } else if (command.arg) {
          currentDir = currentDir.addDir(command.arg);
        }
      } else if (command.command === "ls") {
      }
    } else {
      const lineParts = line.split(" ");

      if (lineParts[0] === "dir") {
        currentDir.addDir(lineParts[1]);
      } else {
        currentDir.addFile(new File(lineParts[1], +lineParts[0], currentDir));
      }
    }
  }

  d("root:", root.toString());

  const rootSize = root.getSize();

  d("rootSize:", rootSize);

  const unusedSpace = DISK_SIZE - rootSize;

  d("unusedSpace:", unusedSpace);

  const requiredSpaceToDelete = MIN_SIZE - unusedSpace;

  d("requiredSpaceToDelete:", requiredSpaceToDelete);

  const deletionCandidates = findDeletionCandidates(root, requiredSpaceToDelete);

  d("deletionCandidates:", deletionCandidates.map((dir) => dir.name));

  const smallestDir = findSmallestDir(deletionCandidates);

  d("smallestDir:", smallestDir);

  return { smallestDirSize: smallestDir.getSize() };
};
