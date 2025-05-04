import { atom } from "jotai";
import { useRef } from "react";

export const defaultPlayer = {
  'x': {
    'name': 'Player 1',
    'symbol': 'x',
    'active': true,
    'turnLog': [],
    'winner': false
  },
  'o': {
    'name': 'Player 2',
    'symbol': 'o',
    'active': false,
    'turnLog': [],
    'winner': false
  },
  'draw': false
}

export const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ];
  
export const gameBoardAtom = atom([...initialGameBoard.map(v => [...v])]);
export const gameLogAtom = atom({'x':{...defaultPlayer.x},'o':{...defaultPlayer.o},'draw':false});
export const isEditingAtom = atom(false);
export const maxRoundAtom = atom(5);
export const gameStartedAtom = atom(false);
export const gameStartUseRefAtom = atom(null);
export const cannotStartAtom = atom(false);
export const roundWinnerAtom = atom([]);