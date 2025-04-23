import { Track } from "@/entities/track";

type PlayDirection = "forward" | "backward";

interface PlaylistState {
  tracks: Track[];
  currentTrackIndex: number;
  direction: PlayDirection;
  isPlaying: boolean;
  isInitialized: boolean;
  audioControl: HTMLAudioElement | null;
  queue: Track[];
}

interface PlaylistActions {
  actions: {
    setTracks: (tracks: Track[]) => void;
    setCurrentTrackIndex: (index: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setDirection: (direction: PlayDirection) => void;
    setIsInitialized: (isInitialized: boolean) => void;
    setAudioControl: (audioControl: HTMLAudioElement | null) => void;
    pushTrackToQueue: (track: Track) => void;
    playTrackFromQueue: () => void;
  };
}

export interface PlaylistStore extends PlaylistState, PlaylistActions {}
