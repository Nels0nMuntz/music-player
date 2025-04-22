import { create } from "zustand";
import { PlayerStore } from "../types/playerStore";

const playerStore = create<PlayerStore>()((set) => ({
  track: null,
  trackIndex: 0,
  list: [],
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isInitialized: false,
  isAllTracksPlayed: false,
  hasNext: true,
  hasPrevious: false,
  direction: "next",
  isWaitingForNewList: true,
  isListUpdated: false,
  canStartPlaying: false,
  actions: {
    setList: (value) => set({ list: value }),
    setTrack: (value) => set({ track: value }),
    setTrackIndex: (value) => set({ trackIndex: value }),
    setCurrentTime: (value) => set({ currentTime: value }),
    setDuration: (value) => set({ duration: value }),
    setIsPlaying: (value) => set({ isPlaying: value }),
    setIsInitialized: (value) => set({ isInitialized: value }),
    setHasNext: (value) => set({ hasNext: value }),
    setHasPrevious: (value) => set({ hasPrevious: value }),
    setDirection: (value) => set({ direction: value }),
    setIsWaitingForNewList: (value) => set({ isWaitingForNewList: value }),
    setIsListUpdated: (value) => set({ isListUpdated: value }),
    setCanStartPlaying: (value) => set({ canStartPlaying: value }),
    tooglePlaying: (track) => {
      set((state) => {
        if (track === state.track) {
          return { isPlaying: !state.isPlaying };
        }
        return {
          track: track,
          trackIndex: state.list.findIndex((item) => item.id === track.id),
          canStartPlaying: true,
          isPlaying: true,
        };
      });
    },
  },
}));

export const useTrack = () => playerStore((state) => state.track);
export const useTrackIndex = () => playerStore((state) => state.trackIndex);
export const useList = () => playerStore((state) => state.list);
export const useIsInitialized = () => playerStore((state) => state.isInitialized);
export const useCurrentTime = () => playerStore((state) => state.currentTime);
export const useDuration = () => playerStore((state) => state.duration);
export const useIsPlaying = () => playerStore((state) => state.isPlaying);
export const useHasNext = () => playerStore((state) => state.hasNext);
export const useHasPrevious = () => playerStore((state) => state.hasPrevious);
export const useDirection = () => playerStore((state) => state.direction);
export const useIsWaitingForNewList = () => playerStore((state) => state.isWaitingForNewList);
export const useIsListUpdated = () => playerStore((state) => state.isListUpdated);
export const useCanStartPlaying = () => playerStore((state) => state.canStartPlaying);
export const usePlayerActions = () => playerStore((state) => state.actions);
