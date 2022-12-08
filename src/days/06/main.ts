import { DayRunner } from "../../types/DayRunner.ts";

const checkIsMarker = (input: string[], targetLength: number): boolean => {
  return input.length === targetLength && !input.some((x) => input.filter((y) => x === y).length > 1);
};

export const p1: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("");

  d("parts:", parts);

  const targetLength = 4;

  let firstMarkerIndex = -1;
  for (let end = 0; end <= parts.length; end++) {
    const start = end - targetLength;

    const potentialMarker = parts.slice(Math.max(0, start), Math.min(parts.length, end));

    const isMarker = checkIsMarker(potentialMarker, targetLength);

    d("potentialMarker:", { r: [start, end], isMarker, potentialMarker });

    if (isMarker) {
      firstMarkerIndex = end;

      break;
    }
  }

  return { firstMarkerIndex };
};

export const p2: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("");

  d("parts:", parts);

  const targetLength = 14;

  let firstMarkerIndex = -1;
  for (let end = 0; end <= parts.length; end++) {
    const start = end - targetLength;

    const potentialMarker = parts.slice(Math.max(0, start), Math.min(parts.length, end));

    const isMarker = checkIsMarker(potentialMarker, targetLength);

    d("potentialMarker:", { r: [start, end], isMarker, potentialMarker });

    if (isMarker) {
      firstMarkerIndex = end;

      break;
    }
  }

  return { firstMarkerIndex };
};
