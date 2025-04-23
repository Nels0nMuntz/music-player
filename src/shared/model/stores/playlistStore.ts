import { create } from "zustand";
import { PlaylistStore } from "../types/playlistStore";

const playlistStore = create<PlaylistStore>()((set) => ({
  tracks: [],
  currentTrackIndex: -1,
  isPlaying: false,
  direction: "forward",
  isInitialized: false,
  audioControl: null,
  queue: [],
  actions: {
    setTracks: (tracks) => {
      set({ tracks: tracks.filter((track) => !!track.audioFile) });
    },
    setCurrentTrackIndex: (index) => set({ currentTrackIndex: index }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setDirection: (direction) => set({ direction }),
    setIsInitialized: (isInitialized) => set({ isInitialized }),
    setAudioControl: (audioControl) => set({ audioControl }),
    pushTrackToQueue: (track) => {
      set((state) => ({
        queue: [...state.queue, track],
      }));
    },
    playTrackFromQueue: () => {
      set((state) => {
        const trackFromQueue = state.queue[0];
        if (!trackFromQueue) return state;
        const trackIndex = state.tracks.findIndex((track) => track.id === trackFromQueue.id);
        if (trackIndex < 0) return { queue: [] };
        return {
          currentTrackIndex: trackIndex,
          queue: [],
        };
      });
    },
  },
}));

export const usePlaylistTracks = () => playlistStore((state) => state.tracks);
export const usePlaylistCurrentTrackIndex = () => playlistStore((state) => state.currentTrackIndex);
export const usePlaylistIsPlaying = () => playlistStore((state) => state.isPlaying);
export const usePlaylistDirection = () => playlistStore((state) => state.direction);
export const usePlaylistIsInitialized = () => playlistStore((state) => state.isInitialized);
export const usePlaylistAudioControl = () => playlistStore((state) => state.audioControl);
export const usePlaylistQueue = () => playlistStore((state) => state.queue);
export const usePlaylistActions = () => playlistStore((state) => state.actions);
