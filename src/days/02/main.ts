import { DayRunner } from "../../types/DayRunner.ts";

interface Round {
  opponentHand: string;
  yourHand: string;
  score: number;
}

const HAND_SCORE_MAP: Record<string, number> = {
  "X": 1,
  "Y": 2,
  "Z": 3,
};

const HAND_MAP: Record<string, string> = {
  "X": "A",
  "Y": "B",
  "Z": "C",
};

const WIN_MAP: Record<string, string> = {
  "X": "C",
  "Y": "A",
  "Z": "B",
};

const calculateScoreByHand = (o: string, y: string): number => {
  const handScore = HAND_SCORE_MAP[y];

  const isWin = WIN_MAP[y] === o;
  const isDraw = HAND_MAP[y] === o;

  let score = handScore;

  if (isWin) {
    score += 6;
  }
  if (isDraw) {
    score += 3;
  }

  return score;
};

export const p1: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n").map((x) => x.split(" "));

  d("parts:", parts);

  const rounds: Round[] = [];

  for (const round of parts) {
    rounds.push({
      opponentHand: round[0],
      yourHand: round[1],
      score: calculateScoreByHand(round[0], round[1]),
    });
  }

  d("rounds:", rounds);

  const totalScore = rounds.reduce((r, c) => r + c.score, 0);

  return { totalScore };
};

interface ResultRound {
  opponentHand: string;
  result: string;
  score: number;
}

const HAND_RESULT_MAP: Record<string, Record<string, string>> = {
  // Lose
  "X": {
    "A": "Z",
    "B": "X",
    "C": "Y",
  },
  // Draw
  "Y": {
    "A": "X",
    "B": "Y",
    "C": "Z",
  },
  // Win
  "Z": {
    "A": "Y",
    "B": "Z",
    "C": "X",
  },
};

const RESULT_MAP: Record<string, number> = {
  "X": 0,
  "Y": 3,
  "Z": 6,
};

const calculateScoreByResult = (o: string, r: string): number => {
  const yourHand = HAND_RESULT_MAP[r][o];

  const handScore = HAND_SCORE_MAP[yourHand];

  const result = RESULT_MAP[r];

  return handScore + result;
};

export const p2: DayRunner = async (input, d) => {
  d("input:", input);

  const parts = input.split("\r\n").map((x) => x.split(" "));

  d("parts:", parts);

  const rounds: ResultRound[] = [];

  for (const round of parts) {
    rounds.push({
      opponentHand: round[0],
      result: round[1],
      score: calculateScoreByResult(round[0], round[1]),
    });
  }

  d("rounds:", rounds);

  const totalScore = rounds.reduce((r, c) => r + c.score, 0);

  return { totalScore };
};
