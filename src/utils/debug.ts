import { Debug } from "../types/Debug.ts";

export const debugConfig: { useDebug: boolean } = { useDebug: false };

export const d: Debug = (...args) => {
  if (!debugConfig.useDebug) {
    return;
  }

  console.log(...args);
};

export const dn: Debug = (name, ...args) => {
  if (!debugConfig.useDebug) {
    return;
  }

  console.log(`${name}:`);
  console.log(...args);
};

export const ds: Debug = (...args) => {
  if (!debugConfig.useDebug) {
    return;
  }

  console.log(...args.map((arg) => arg.toString()));
};

export const dns: Debug = (name, ...args) => {
  if (!debugConfig.useDebug) {
    return;
  }

  console.log(`${name}:`);
  console.log(...args.map((arg) => arg.toString()));
};
