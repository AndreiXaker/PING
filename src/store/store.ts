import {create} from 'zustand'

interface GameState {
  coinSymbol: string;
  betAmount: number;
  setCoinSymbol: (s: string) => void;
  setBetAmount: (a: number) => void;
  betLimits : Record<string, string[]>;
  setBetLimits: (limits: Record<string, string[]>) => void;
}

export const useGameStore = create<GameState>((set) => ({
  coinSymbol: '',    
  betAmount: 0,      
  setCoinSymbol: (s) => set({ coinSymbol: s }),
  setBetAmount: (a) => set({ betAmount: a }),
  betLimits: {},
  setBetLimits: (limits) => set({ betLimits: limits })
}));