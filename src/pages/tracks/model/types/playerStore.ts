import { Track } from "@/entities/track";

interface PlayerState {
  track: Track | null;
  trackIndex: number;
  list: Track[];
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isInitialized: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  direction: "next" | "previous";
  isWaitingForNewList: boolean;
  isListUpdated: boolean;
  canStartPlaying: boolean;
}

interface PlayerActions {
  actions: {
    setTrack: (value: Track | null) => void;
    setTrackIndex: (value: number) => void;
    setList: (value: Track[]) => void;
    setCurrentTime: (value: number) => void;
    setDuration: (value: number) => void;
    setIsPlaying: (value: boolean) => void;
    setIsInitialized: (value: boolean) => void;
    setHasNext: (value: boolean) => void;
    setHasPrevious: (value: boolean) => void;
    setDirection: (value: "next" | "previous") => void;
    setIsWaitingForNewList: (value: boolean) => void;
    setIsListUpdated: (value: boolean) => void;
    setCanStartPlaying: (value: boolean) => void;
    replaceTrack: (value: Track) => void;
  };
}

export interface PlayerStore extends PlayerState, PlayerActions {}
